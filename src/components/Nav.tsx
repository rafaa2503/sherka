import { useEffect, useState } from "react";
import { SPRACHEN, useSprache, type Sprache } from "../i18n";
import "./Nav.css";

type Thema = "hell" | "dunkel";
const SPEICHER = "sherka:thema";

/* Dunkel ist der Standard. Gelesen wird nur die eigene Wahl des Besuchers,
   nie die Systemeinstellung. */
function gespeichertesThema(): Thema {
  try {
    return window.localStorage.getItem(SPEICHER) === "hell" ? "hell" : "dunkel";
  } catch {
    return "dunkel";
  }
}

const LINKS = ["bau", "arbeiten", "leistungen", "ablauf", "person"] as const;

/* Am Computer eine schwebende Pille, am Handy eine schmale Leiste mit
   Vollbildmenue, das sich als Kreis vom Knopf aus oeffnet. */
export function Nav() {
  const { t, sprache, setzeSprache } = useSprache();
  const [thema, setThema] = useState<Thema>(gespeichertesThema);
  const [offen, setOffen] = useState(false);
  const istDunkel = thema === "dunkel";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", thema);
    try {
      window.localStorage.setItem(SPEICHER, thema);
    } catch {
      /* Speicher gesperrt: die Wahl gilt nur fuer diesen Besuch. */
    }
  }, [thema]);

  useEffect(() => {
    if (!offen) return;
    const taste = (e: KeyboardEvent) => e.key === "Escape" && setOffen(false);
    document.addEventListener("keydown", taste);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", taste);
      document.documentElement.style.overflow = "";
    };
  }, [offen]);

  return (
    <header className="nav flaeche-dunkel">
      <div className="nav-leiste">
        <div className="pille pille-marke">
          <a className="marke" href="#oben">
            Sherka
          </a>
        </div>

        <nav className="pille nav-links" aria-label="Navigation">
          {LINKS.map((k) => (
            <a key={k} href={`#${k}`}>
              {t.nav[k]}
            </a>
          ))}
        </nav>

        <div className="pille nav-werkzeuge">
          <div className="sprachwahl" role="group" aria-label={t.nav.sprache}>
            {SPRACHEN.map((s: Sprache) => (
              <button key={s} type="button" onClick={() => setzeSprache(s)} aria-pressed={sprache === s} lang={s}>
                {s.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="thema-knopf"
            type="button"
            onClick={() => setThema(istDunkel ? "hell" : "dunkel")}
            aria-label={istDunkel ? t.nav.themaHell : t.nav.themaDunkel}
          >
            {istDunkel ? "☀" : "☾"}
          </button>
          <a className="knopf knopf-voll nav-cta" href="#kontakt">
            {t.nav.anfragen}
          </a>
          <button
            className="menue-knopf"
            type="button"
            aria-expanded={offen}
            aria-controls="vollmenue"
            onClick={() => setOffen(!offen)}
          >
            <span className="menue-strich" aria-hidden="true" />
            <span className="nur-lesen">{offen ? t.nav.menueZu : t.nav.menue}</span>
          </button>
        </div>
      </div>

      <div id="vollmenue" className={offen ? "vollmenue vollmenue-offen" : "vollmenue"} inert={!offen}>
        <nav aria-label="Navigation">
          {LINKS.map((k, i) => (
            <a key={k} href={`#${k}`} onClick={() => setOffen(false)} style={{ transitionDelay: `${120 + i * 50}ms` }}>
              {t.nav[k]}
            </a>
          ))}
        </nav>
        <a className="knopf knopf-voll" href="#kontakt" onClick={() => setOffen(false)}>
          {t.nav.anfragen}
        </a>
      </div>
    </header>
  );
}
