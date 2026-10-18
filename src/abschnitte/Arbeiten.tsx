import { useEffect, useRef, useState } from "react";
import { useSprache } from "../lib/sprache";
import { fuelle } from "../lib/typo";
import { projekte } from "../data/projekte";
import { IconPfeil } from "./Icons";
import "./Arbeiten.css";

/* Einleitung im Apple-Satz und die Arbeiten als Karussell mit grossen
   Kacheln, wie die Produktreihen auf apple.com. Wischen am Handy, Pfeile am
   Computer, Scroll-Snap statt Skript-Animation. */

export function Intro() {
  const { t } = useSprache();
  return (
    <section className="intro" aria-label={t.intro.stark}>
      <div className="shell">
        <p className="zweiklang intro-satz auftritt">
          <strong>{t.intro.stark}</strong> {t.intro.rest}
        </p>
      </div>
    </section>
  );
}

export function Arbeiten() {
  const { t, sprache } = useSprache();
  const spur = useRef<HTMLUListElement>(null);
  const [anfang, setAnfang] = useState(true);
  const [ende, setEnde] = useState(false);

  useEffect(() => {
    const el = spur.current;
    if (!el) return;
    const pruefe = () => {
      setAnfang(el.scrollLeft < 8);
      setEnde(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    };
    pruefe();
    el.addEventListener("scroll", pruefe, { passive: true });
    addEventListener("resize", pruefe);
    return () => {
      el.removeEventListener("scroll", pruefe);
      removeEventListener("resize", pruefe);
    };
  }, []);

  const blaettern = (richtung: 1 | -1) => {
    const el = spur.current;
    const karte = el?.querySelector<HTMLElement>(".kachel");
    if (!el || !karte) return;
    el.scrollBy({ left: richtung * (karte.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <section className="sektion arbeiten" id="arbeiten" aria-labelledby="arbeiten-titel">
      <div className="shell-breit arbeiten-kopf auftritt">
        <h2 id="arbeiten-titel">{t.arbeiten.titel}</h2>
      </div>

      <ul className="karussell" ref={spur}>
        {projekte.map((p, i) => (
          <li className="kachel auftritt" key={p.domain} style={{ "--i": i } as React.CSSProperties}>
            <div className="kachel-bild">
              <img
                src={p.bild}
                alt={fuelle(t.arbeiten.bildAlt, { domain: p.domain })}
                width={p.bildBreite}
                height={p.bildHoehe}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="kachel-text">
              <h3 translate="no">{p.domain}</h3>
              <p className="kachel-was">{p.text[sprache].was}</p>
              {p.url ? (
                <a className="pfeillink" href={p.url} target="_blank" rel="noopener noreferrer">
                  {t.arbeiten.oeffnen}
                </a>
              ) : (
                <p className="kachel-bald">{t.arbeiten.bald}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="shell-breit karussell-steuerung">
        <button type="button" className="rund-knopf" onClick={() => blaettern(-1)} disabled={anfang} aria-label={t.arbeiten.zurueck}>
          <IconPfeil className="pfeil-links" />
        </button>
        <button type="button" className="rund-knopf" onClick={() => blaettern(1)} disabled={ende} aria-label={t.arbeiten.weiter}>
          <IconPfeil />
        </button>
      </div>
    </section>
  );
}
