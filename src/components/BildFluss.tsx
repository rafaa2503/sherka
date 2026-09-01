import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Texture, Vec2 } from "ogl";
import "./BildFluss.css";

/* Bildschirmfoto mit WebGL-Verzerrung.

   Das <img> bleibt immer im Markup: es traegt den Alt-Text, es ist das,
   was Suchmaschinen und Screenreader sehen, und es ist sichtbar, solange
   die Textur noch laedt. Der Canvas legt sich erst darueber, wenn er
   wirklich zeichnen kann. Faellt WebGL aus, bleibt einfach das Bild.

   Der Effekt: eine Welle, die vom Zeiger ausgeht, plus ein leichter
   Farbversatz an den Flanken. Beides faehrt beim Verlassen wieder auf
   null zurueck, es bleibt also nichts stehen. */

const VERT = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uBild;
uniform vec2 uMaus;
uniform float uZeit;
uniform float uStaerke;

void main() {
  vec2 uv = vUv;

  float d = distance(uv, uMaus);
  // Ringwelle, die vom Zeiger nach aussen laeuft und mit dem Abstand abklingt.
  float welle = sin(d * 26.0 - uZeit * 3.4) * exp(-d * 5.5);
  vec2 versatz = normalize(uv - uMaus + 0.0001) * welle * 0.028 * uStaerke;

  // Farbversatz: die Kanaele werden unterschiedlich weit geschoben.
  float r = texture2D(uBild, uv + versatz * 1.25).r;
  float g = texture2D(uBild, uv + versatz).g;
  float b = texture2D(uBild, uv + versatz * 0.75).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}`;

export function BildFluss({
  src,
  alt,
  breite,
  hoehe,
}: {
  src: string;
  alt: string;
  breite: number;
  hoehe: number;
}) {
  const halter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = halter.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(devicePixelRatio, 2) });
    } catch {
      return;
    }

    const gl = renderer.gl;
    const textur = new Texture(gl, { generateMipmaps: false });

    const programm = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uBild: { value: textur },
        uMaus: { value: new Vec2(0.5, 0.5) },
        uZeit: { value: 0 },
        uStaerke: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: programm });

    let raf = 0;
    let bereit = false;
    let laeuft = false;
    const ziel = { x: 0.5, y: 0.5, staerke: 0 };

    const bild = new Image();
    bild.crossOrigin = "anonymous";
    bild.decoding = "async";
    bild.src = src;

    bild.onload = () => {
      textur.image = bild;
      bereit = true;
      // Erst jetzt einhaengen, damit nie ein leerer Canvas ueber dem Bild liegt.
      gl.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
      el.appendChild(gl.canvas);
      el.classList.add("fluss-an");
      messen();
      an();
    };

    const messen = () => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      renderer.setSize(r.width, r.height);
    };

    const ro = new ResizeObserver(messen);
    ro.observe(el);

    const bewegen = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ziel.x = (e.clientX - r.left) / r.width;
      ziel.y = 1 - (e.clientY - r.top) / r.height;
    };
    const rein = () => {
      ziel.staerke = 1;
    };
    const raus = () => {
      ziel.staerke = 0;
    };

    el.addEventListener("pointermove", bewegen);
    el.addEventListener("pointerenter", rein);
    el.addEventListener("pointerleave", raus);

    const schleife = (t: number) => {
      const m = programm.uniforms.uMaus.value as Vec2;
      m.x += (ziel.x - m.x) * 0.1;
      m.y += (ziel.y - m.y) * 0.1;
      const s = programm.uniforms.uStaerke;
      s.value += (ziel.staerke - s.value) * 0.07;
      programm.uniforms.uZeit.value = t * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(schleife);
    };

    const an = () => {
      if (!raf && bereit && laeuft) raf = requestAnimationFrame(schleife);
    };
    const aus = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // Nur rechnen, solange das Bild im Sichtfeld ist.
    const io = new IntersectionObserver(([e]) => {
      laeuft = e.isIntersecting;
      laeuft ? an() : aus();
    });
    io.observe(el);

    return () => {
      aus();
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", bewegen);
      el.removeEventListener("pointerenter", rein);
      el.removeEventListener("pointerleave", raus);
      el.classList.remove("fluss-an");
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src]);

  return (
    <div className="fluss" ref={halter}>
      <img src={src} alt={alt} width={breite} height={hoehe} loading="lazy" decoding="async" />
    </div>
  );
}
