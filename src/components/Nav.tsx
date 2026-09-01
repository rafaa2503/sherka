import { useEffect, useState } from "react";
import { SPRACHEN, useSprache, type Sprache } from "../i18n";
import "./Nav.css";

type Thema = "hell" | "dunkel";
const SPEICHER = "sherka:thema";

function gespeichertesThema(): Thema | null {
  if (typeof window === "undefined") return null;
  const g = window.localStorage.getItem(SPEICHER);
  return g === "hell" || g === "dunkel" ? g : null;
}

export function Nav() {
  const { t, sprache, setzeSprache } = useSprache();
  const [gescrollt, setGescrollt] = useState(false);
  const [thema, setThema] = useState<Thema | null>(gespeichertesThema);

  // Ohne gespeicherte Wahl gilt die Systemeinstellung.
  const istDunkel =
    thema === "dunkel" ||
    (thema === null &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const wurzel = document.documentElement;
    if (thema === null) {
      wurzel.removeAttribute("data-theme");
      window.localStorage.removeItem(SPEICHER);
    } else {
      wurzel.setAttribute("data-theme", thema);
      window.localStorage.setItem(SPEICHER, thema);
    }
  }, [thema]);

  useEffect(() => {
    const marke = document.getElementById("oben");
    if (!marke) return;
    const io = new IntersectionObserver(([e]) => setGescrollt(!e.isIntersecting), {
      rootMargin: "-80px 0px 0px 0px",
    });
    io.observe(marke);
    return () => io.disconnect();
  }, []);

  return (
    <header className={gescrollt ? "nav nav-fest" : "nav"}>
      <div className="shell nav-inhalt">
        <a className="marke" href="#oben">
          Sherka
        </a>

        <nav className="nav-links" aria-label="Navigation">
          <a href="#arbeiten">{t.nav.arbeiten}</a>
          <a href="#leistungen">{t.nav.leistungen}</a>
          <a href="#ablauf">{t.nav.ablauf}</a>
          <a href="#person">{t.nav.person}</a>
        </nav>

        <div className="nav-werkzeuge">
          <div className="sprachwahl" role="group" aria-label={t.nav.sprache}>
            {SPRACHEN.map((s: Sprache) => (
              <button
                key={s}
                type="button"
                onClick={() => setzeSprache(s)}
                aria-pressed={sprache === s}
                lang={s}
              >
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

          <a className="knopf knopf-leer nav-cta" href="#kontakt">
            <span>{t.nav.anfragen}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
