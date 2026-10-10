import { useEffect, useRef, useState } from "react";
import { useSprache } from "../lib/sprache";
import { fuelle } from "../lib/typo";
import { stufe, useScrollFortschritt } from "../lib/bewegung";
import { projekte } from "../data/projekte";
import "./Hero.css";

/* Der Anfang in drei Spalten: ein Viertel Text, die Hälfte das Gerät, ein
   Viertel Auswahl.

   Links steht, was Sherka macht, mit genau einem Knopf. In der Mitte steht ein
   Laptop als echtes 3D-Objekt (Bildschirm und Tastaturfläche sind zwei Ebenen
   im Raum), davor ein Handy, dahinter das Licht des Bildschirms. Rechts wählt
   man, welche der vier Kundenseiten im Gerät läuft; darunter steht die in
   diesem Browser gemessene Ladezeit dieser Seite.

   Regeln aus den Skills: Titel höchstens zwei Zeilen, Text unter 20 Wörtern,
   ein Knopf, alles im ersten Bildschirm, nichts Erfundenes im Gerät, am Handy
   normaler Fluss ohne feste Höhe. Ohne Bewegung steht alles fertig da. */

const WECHSEL_MS = 4500;

function zahl(sek: number, sprache: string) {
  return sek.toFixed(2).replace(".", ",") + (sprache === "fr" ? " s" : " s");
}

function handyBild(bild: string) {
  return bild.replace(/\.webp$/, "-mobile.webp");
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
      /* ohne Messung bleibt die Anzeige beim Platzhalter */
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

export function Hero() {
  const { t, sprache } = useSprache();
  const h = t.hero;
  const abschnitt = useRef<HTMLElement>(null);
  useScrollFortschritt(abschnitt, abschnitt, "raus");
  useNeigung(abschnitt);
  const messung = useMessung();

  const [aktiv, setAktiv] = useState(0);
  // Der Wechsel läuft von selbst, bis jemand selbst wählt. Er ruht, solange
  // der Zeiger auf der Auswahl liegt oder der Anfang nicht im Bild ist.
  const [laeuft, setLaeuft] = useState(false);
  const [ruht, setRuht] = useState(false);
  const [imBild, setImBild] = useState(true);

  useEffect(() => {
    if (stufe() === "voll") setLaeuft(true);
    const a = abschnitt.current;
    if (!a || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setImBild(e.isIntersecting), { threshold: 0.4 });
    io.observe(a);
    return () => io.disconnect();
  }, []);

  const wechselt = laeuft && !ruht && imBild;
  useEffect(() => {
    if (!wechselt) return;
    const id = setTimeout(() => setAktiv((a) => (a + 1) % projekte.length), WECHSEL_MS);
    return () => clearTimeout(id);
  }, [wechselt, aktiv]);

  const waehle = (i: number) => {
    setAktiv(i);
    setLaeuft(false);
  };

  const woerter = h.titel.split(" ");

  return (
    <section className="hero buehne-dunkel" id="oben" aria-labelledby="hero-titel" ref={abschnitt}>
      <div className="hero-raster">
        <div className="hero-text">
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
          <div className="hero-knoepfe hero-ein" id="hero-knoepfe">
            <a className="knopf knopf-voll" href="#kontakt">
              {h.cta}
            </a>
          </div>
        </div>

        <div className="hero-geraet">
          <div className="szene">
            <div className="hero-schein" aria-hidden="true">
              {projekte.map((p, i) => (
                <img
                  key={p.domain}
                  className={i === aktiv ? "an" : ""}
                  src={p.bild}
                  alt=""
                  width={p.bildBreite}
                  height={p.bildHoehe}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))}
            </div>

            <div className="laptop">
              <div className="laptop-deckel">
                <div className="laptop-rahmen">
                  <span className="laptop-kamera" aria-hidden="true" />
                  <div className="schirm">
                    {projekte.map((p, i) => (
                      <img
                        key={p.domain}
                        className={i === aktiv ? "an" : ""}
                        src={p.bild}
                        alt={i === aktiv ? fuelle(h.laptopAlt, { domain: p.domain }) : ""}
                        aria-hidden={i === aktiv ? undefined : true}
                        width={p.bildBreite}
                        height={p.bildHoehe}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "low"}
                        decoding="async"
                      />
                    ))}
                    <span className="laptop-glanz" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="laptop-deck" aria-hidden="true">
                <span className="laptop-tasten" />
                <span className="laptop-pad" />
              </div>
            </div>

            <div className="handy">
              <div className="handy-rahmen">
                <span className="handy-insel" aria-hidden="true" />
                <div className="schirm schirm-handy">
                  {projekte.map((p, i) => (
                    <img
                      key={p.domain}
                      className={i === aktiv ? "an" : ""}
                      src={handyBild(p.bild)}
                      alt={i === aktiv ? fuelle(h.handyAlt, { domain: p.domain }) : ""}
                      aria-hidden={i === aktiv ? undefined : true}
                      width={275}
                      height={597}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-wahl hero-ein">
          <p className="wahl-titel" id="wahl-titel">
            {h.wahlTitel}
          </p>
          <ul
            className="wahl-liste"
            aria-labelledby="wahl-titel"
            onPointerEnter={() => setRuht(true)}
            onPointerLeave={() => setRuht(false)}
            onFocus={() => setRuht(true)}
            onBlur={() => setRuht(false)}
          >
            {projekte.map((p, i) => (
              <li key={p.domain}>
                <button
                  type="button"
                  className={`wahl-knopf${i === aktiv ? " wahl-an" : ""}${i === aktiv && wechselt ? " wahl-lauf" : ""}`}
                  aria-pressed={i === aktiv}
                  aria-label={fuelle(h.zeigen, { domain: p.domain })}
                  onClick={() => waehle(i)}
                >
                  <span className="wahl-domain" translate="no">
                    {p.domain}
                  </span>
                  <span className="wahl-was">{p.text[sprache].was}</span>
                  <span className="wahl-balken" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mess" role="group" aria-label={h.messTitel}>
            <span className="mess-titel">{h.messTitel}</span>
            <span className="mess-label">{messung?.art === "fcp" ? h.messFcp : h.messLcp}</span>
            <strong className="mess-wert">{messung ? zahl(messung.wert, sprache) : "…"}</strong>
            <span className="mess-balken" aria-hidden="true">
              <span
                style={{
                  "--anteil": messung ? Math.min(1, messung.wert / (messung.art === "fcp" ? 1.8 : 2.5)) : 0,
                } as React.CSSProperties}
              />
            </span>
            <span className="mess-hinweis">{messung?.art === "fcp" ? h.messRichtFcp : h.messRichtLcp}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
