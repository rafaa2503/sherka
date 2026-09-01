import { useEffect, useState } from "react";
import { SPRACHEN, useSprache, type Sprache } from "../i18n";
import { Magnet } from "./Magnet";
import "./Nav.css";

export function Nav() {
  const { t, sprache, setzeSprache } = useSprache();
  const [gescrollt, setGescrollt] = useState(false);

  // Die Leiste ist im Hero unsichtbar und legt sich erst dahinter, wenn
  // Inhalt darunter durchlaeuft. Ohne das schneidet sie den Shader an.
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
          <a href="#ablauf">{t.nav.ablauf}</a>
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

          <Magnet className="knopf knopf-leer nav-cta" href="#kontakt" staerke={0.22}>
            {t.nav.anfragen}
          </Magnet>
        </div>
      </div>
    </header>
  );
}
