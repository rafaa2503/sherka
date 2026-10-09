import { useEffect, useRef, useState } from "react";
import { useSprache } from "../lib/sprache";
import { stufe, useScrollFortschritt } from "../lib/bewegung";
import "./Hero.css";

/* Anfang wie eine dunkle Apple-Produktseite. Der Satz steht sofort da, darunter
   schaut das Produkt herein: echte Kundenseiten auf Laptop und Handy, mit dem
   Licht des Bildschirms im Raum. Um das Gerät schweben drei Karten, die zeigen,
   was dahinter steckt: Code, die in diesem Browser gemessene Ladezeit dieser
   Seite und der Build mit seinen Grenzen.

   Beim Scrollen bleibt die Bühne stehen: der Text tritt zurück, das Gerät
   fährt in die Mitte und richtet den Bildschirm auf, das Handy kommt herein,
   die Karten lösen sich in die Tiefe. Mit feinem Zeiger neigt sich die ganze
   Szene leicht zur Maus (echtes 3D, die Karten liegen davor).
   Ohne Bewegung steht alles fertig da. */

const CODE = [
  ["<", "section", ' class="', "hero", '">'],
  ["  <", "h1", ">", "Marokkanische Küche", ""],
  ["      in Biel</", "h1", ">", "", ""],
  ["  <", "a", ' href="', "/fr/", '">FR</a>'],
  ["</", "section", ">", "", ""],
] as const;

function zahl(sek: number, sprache: string) {
  return sek.toFixed(2).replace(".", ",") + (sprache === "fr" ? " s" : " s");
}

/** Misst, wann der grösste Inhalt dieser Seite sichtbar war (LCP). Safari kennt
    LCP nicht, dort der erste Inhalt (FCP). Beides im Browser des Besuchers. */
function useMessung() {
  const [m, setM] = useState<{ wert: number; art: "lcp" | "fcp" } | null>(null);
  useEffect(() => {
    let lcp = 0;
    let po: PerformanceObserver | undefined;
    try {
      if (PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")) {
        po = new PerformanceObserver((l) => {
          for (const e of l.getEntries()) lcp = e.startTime;
        });
        po.observe({ type: "largest-contentful-paint", buffered: true });
      }
    } catch {
      /* ohne Messung bleibt die Karte beim Strich */
    }
    const fertig = () =>
      setTimeout(() => {
        po?.disconnect();
        if (lcp > 0) return setM({ wert: lcp / 1000, art: "lcp" });
        const fcp = performance.getEntriesByName("first-contentful-paint")[0];
        if (fcp) setM({ wert: fcp.startTime / 1000, art: "fcp" });
      }, 250);
    if (document.readyState === "complete") fertig();
    else addEventListener("load", fertig, { once: true });
    return () => po?.disconnect();
  }, []);
  return m;
}

/** Neigt die Szene zur Maus. Weich nachgeführt, jederzeit unterbrechbar. */
function useNeigung(ziel: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const z = ziel.current;
    if (!z || stufe() !== "voll" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let sollX = 0;
    let sollY = 0;
    let istX = 0;
    let istY = 0;
    let takt = 0;
    const schritt = () => {
      istX += (sollX - istX) * 0.08;
      istY += (sollY - istY) * 0.08;
      z.style.setProperty("--nx", istX.toFixed(4));
      z.style.setProperty("--ny", istY.toFixed(4));
      takt = Math.abs(sollX - istX) + Math.abs(sollY - istY) > 0.001 ? requestAnimationFrame(schritt) : 0;
    };
    const bewege = (e: PointerEvent) => {
      sollX = (e.clientX / innerWidth) * 2 - 1;
      sollY = (e.clientY / innerHeight) * 2 - 1;
      if (!takt) takt = requestAnimationFrame(schritt);
    };
    const weg = () => {
      sollX = 0;
      sollY = 0;
      if (!takt) takt = requestAnimationFrame(schritt);
    };
    addEventListener("pointermove", bewege, { passive: true });
    document.documentElement.addEventListener("pointerleave", weg);
    return () => {
      removeEventListener("pointermove", bewege);
      document.documentElement.removeEventListener("pointerleave", weg);
      cancelAnimationFrame(takt);
    };
  }, []);
}

/** Wie weit das Gerät nach oben fahren muss, um am Ende mittig zu stehen. */
function useHub(sticky: React.RefObject<HTMLElement | null>, buehne: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const s = sticky.current;
    const b = buehne.current;
    if (!s || !b || stufe() === "aus") return;
    const kopf = 52;
    const rechne = () => {
      const hoehe = s.clientHeight;
      const oben = b.offsetTop;
      const h = b.offsetHeight;
      const ziel = kopf + Math.max(16, (hoehe - kopf - h) / 2);
      s.style.setProperty("--hub", `${Math.min(0, Math.round(ziel - oben))}px`);
    };
    rechne();
    const ro = new ResizeObserver(rechne);
    ro.observe(s);
    ro.observe(b);
    return () => ro.disconnect();
  }, []);
}

export function Hero() {
  const { t, sprache } = useSprache();
  const h = t.hero;
  const abschnitt = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const buehne = useRef<HTMLDivElement>(null);
  useScrollFortschritt(abschnitt, sticky);
  useNeigung(sticky);
  useHub(sticky, buehne);
  const messung = useMessung();

  const woerter = h.titel.split(" ");

  return (
    <section className="hero buehne-dunkel" id="oben" aria-labelledby="hero-titel" ref={abschnitt}>
      <span className="hero-marke-leiste" id="hero-knoepfe" aria-hidden="true" />
      <div className="hero-sticky" ref={sticky}>
        <div className="shell hero-text">
          <p className="hero-marke hero-ein">{h.marke}</p>
          <h1 id="hero-titel">
            {woerter.map((w, i) => (
              <span key={i}>
                <span className="hero-wort" style={{ "--i": i } as React.CSSProperties}>
                  {w}
                </span>
                {i < woerter.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="hero-unter hero-ein">{h.unter}</p>
          <div className="hero-knoepfe hero-ein">
            <a className="knopf knopf-voll" href="#kontakt">
              {h.cta}
            </a>
            <a className="pfeillink" href="#arbeiten">
              {h.cta2}
            </a>
          </div>
        </div>

        <div className="hero-buehne" ref={buehne}>
          <div className="szene">
            <img className="hero-schein" src="/shots/bledi-bienne.ch.webp" alt="" aria-hidden="true" width={1240} height={775} decoding="async" />

            <div className="laptop">
              <div className="laptop-deckel">
                <div className="laptop-rahmen">
                  <span className="laptop-kamera" aria-hidden="true" />
                  <img
                    src="/shots/bledi-bienne.ch.webp"
                    alt={h.laptopAlt}
                    width={1240}
                    height={775}
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span className="laptop-glanz" aria-hidden="true" />
                </div>
              </div>
              <div className="laptop-boden" aria-hidden="true">
                <span />
              </div>
            </div>

            <div className="handy">
              <div className="handy-rahmen">
                <span className="handy-insel" aria-hidden="true" />
                <img
                  src="/shots/bern-zahnarzt-team.ch-mobile.webp"
                  alt={h.handyAlt}
                  width={275}
                  height={597}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="karte karte-code" aria-hidden="true">
              <span className="karte-kopf">
                <i />
                <i />
                <i />
                <span>hero.html</span>
              </span>
              <pre>
                {CODE.map(([a, tag, b, wert, c], i) => (
                  <span className="kz" style={{ "--n": i } as React.CSSProperties} key={i}>
                    {a}
                    <em className="c-k">{tag}</em>
                    {b}
                    <em className={b.includes("=") ? "c-s" : ""}>{wert}</em>
                    {c}
                  </span>
                ))}
              </pre>
            </div>

            <div className="karte karte-mess" role="group" aria-label={h.messTitel}>
              <span className="km-titel">{h.messTitel}</span>
              <span className="km-label">{messung?.art === "fcp" ? h.messFcp : h.messLcp}</span>
              <strong className="km-wert">{messung ? zahl(messung.wert, sprache) : "…"}</strong>
              <span className="km-balken" aria-hidden="true">
                <span
                  style={{
                    "--anteil": messung ? Math.min(1, messung.wert / (messung.art === "fcp" ? 1.8 : 2.5)) : 0,
                  } as React.CSSProperties}
                />
              </span>
              <span className="km-hinweis">
                {messung?.art === "fcp" ? h.messRichtFcp : h.messRichtLcp}
              </span>
            </div>

            <div className="karte karte-build" aria-hidden="true">
              <span className="kb-zeile kb-befehl" style={{ "--n": 0 } as React.CSSProperties}>
                $ npm run build
              </span>
              {h.build.map((z, i) => (
                <span className="kb-zeile" style={{ "--n": i + 1 } as React.CSSProperties} key={i}>
                  <b>✓</b> {z}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
