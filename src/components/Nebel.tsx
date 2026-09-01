import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

/* Fliessender Rauch hinter dem Hero, wie in den Referenzen.
   OGL statt three.js: rund 25 KB statt 130 KB, und mehr als einen
   Vollbild-Shader braucht diese Seite nicht.

   Kosten sind bewusst begrenzt:
   - laeuft erst nach dem ersten Anstrich, damit LCP unberuehrt bleibt
   - pausiert, sobald der Hero aus dem Bild ist
   - aus bei prefers-reduced-motion und auf Zeigergeraeten ohne Maus
   - dpr auf 1.5 gedeckelt, sonst rechnet ein Retina-Display sich tot */

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
uniform float uZeit;
uniform vec2 uAufloesung;
uniform vec2 uMaus;

// Klassisches Simplex-artiges Rauschen, gefaltet zu weichem Nebel.
vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  const float K1 = 0.366025404;
  const float K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 p = (gl_FragCoord.xy * 2.0 - uAufloesung) / min(uAufloesung.x, uAufloesung.y);

  float t = uZeit * 0.045;

  // Domain warping: Rauschen, das sich selbst verzerrt. Daher die
  // schlierenartige Bewegung statt eines gleichfoermigen Flimmerns.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.15 * t),
                fbm(p + 3.0 * q + vec2(8.3, 2.8) + 0.126 * t));

  float f = fbm(p + 2.4 * r);

  // Der Zeiger zieht den Nebel leicht zu sich. Sehr dezent, damit es
  // sich wie Materie anfuehlt und nicht wie ein Spielzeug.
  float d = distance(uv, uMaus);
  float zug = smoothstep(0.55, 0.0, d) * 0.28;

  float helligkeit = smoothstep(-0.15, 0.85, f) + zug;

  // Nur Weiss in unterschiedlicher Dichte. Keine Markenfarbe, sonst
  // kollidiert der Hintergrund mit den Ampelfarben des Tempochecks.
  vec3 farbe = vec3(helligkeit);

  // Nach unten und zu den Raendern ausblenden, damit die Schrift
  // ueberall auf ruhigem Grund sitzt.
  float vignette = smoothstep(1.15, 0.15, length(p) * 0.72);
  float unten = smoothstep(0.0, 0.55, uv.y);

  float a = helligkeit * vignette * unten * 0.42;
  gl_FragColor = vec4(farbe, a);
}`;

export function Nebel() {
  const halter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = halter.current;
    if (!el) return;

    const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const grobeZeiger = window.matchMedia("(pointer: coarse)").matches;
    if (reduziert || grobeZeiger) return;

    let renderer: Renderer | null = null;
    let raf = 0;
    let laeuft = true;
    let abgeraeumt = false;

    // Erst nach dem ersten Anstrich starten. So faellt der Shader nicht
    // in die LCP-Messung und die Ueberschrift ist zuerst da.
    const start = () => {
      if (abgeraeumt) return;

      renderer = new Renderer({ alpha: true, antialias: false, dpr: Math.min(devicePixelRatio, 1.5) });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      el.appendChild(gl.canvas);
      gl.canvas.style.cssText = "width:100%;height:100%;display:block";

      const programm = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uZeit: { value: 0 },
          uAufloesung: { value: new Vec2(1, 1) },
          uMaus: { value: new Vec2(0.5, 0.6) },
        },
        transparent: true,
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: programm });

      const messen = () => {
        const r = el.getBoundingClientRect();
        renderer!.setSize(r.width, r.height);
        programm.uniforms.uAufloesung.value.set(gl.drawingBufferWidth, gl.drawingBufferHeight);
      };
      messen();

      const ro = new ResizeObserver(messen);
      ro.observe(el);

      // Zielwert plus Interpolation, damit der Nebel dem Zeiger traege
      // folgt statt zu springen.
      const ziel = { x: 0.5, y: 0.6 };
      const aufMaus = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ziel.x = (e.clientX - r.left) / r.width;
        ziel.y = 1 - (e.clientY - r.top) / r.height;
      };
      window.addEventListener("pointermove", aufMaus, { passive: true });

      // Ausserhalb des Bildes nicht weiterrechnen.
      const io = new IntersectionObserver(([e]) => {
        laeuft = e.isIntersecting;
        if (laeuft && !raf) raf = requestAnimationFrame(schleife);
      });
      io.observe(el);

      const schleife = (t: number) => {
        raf = 0;
        if (!laeuft || abgeraeumt) return;
        const m = programm.uniforms.uMaus.value as Vec2;
        m.x += (ziel.x - m.x) * 0.045;
        m.y += (ziel.y - m.y) * 0.045;
        programm.uniforms.uZeit.value = t * 0.001;
        renderer!.render({ scene: mesh });
        raf = requestAnimationFrame(schleife);
      };
      raf = requestAnimationFrame(schleife);

      aufraeumen = () => {
        abgeraeumt = true;
        laeuft = false;
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", aufMaus);
        gl.canvas.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    let aufraeumen = () => {
      abgeraeumt = true;
    };

    const id = requestAnimationFrame(() => requestAnimationFrame(start));

    return () => {
      cancelAnimationFrame(id);
      aufraeumen();
    };
  }, []);

  return <div className="nebel" ref={halter} aria-hidden="true" />;
}
