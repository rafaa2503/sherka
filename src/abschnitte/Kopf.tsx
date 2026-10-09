import { useEffect, useState } from "react";
import { STARTPFAD, useSprache } from "../lib/sprache";
import { aktuellesThema, setzeThema, type Thema } from "../lib/thema";
import { IconListe, IconMond, IconSonne, IconX } from "./Icons";
import "./Kopf.css";

/* Deckende Leiste, kein Glas. Der Sprachwechsel ist ein echter Link auf die
   andere Fassung der Seite. Am Handy klappt ein Menü von oben auf. */

const LINKS = [
  ["abnahme", "#abnahme"],
  ["hauswartung", "#hauswartung"],
  ["ablauf", "#ablauf"],
  ["person", "#person"],
  ["faq", "#faq"],
] as const;

export function Kopf() {
  const { t, sprache } = useSprache();
  const [thema, setThemaState] = useState<Thema>("dunkel");
  const [offen, setOffen] = useState(false);
  const [gescrollt, setGescrollt] = useState(false);
  const andere = sprache === "de" ? "fr" : "de";

  // Das Thema steht schon im DOM (Inline-Skript im head). Erst danach lesen,
  // sonst passt das vorgerenderte HTML nicht zum ersten Zeichnen.
  useEffect(() => setThemaState(aktuellesThema()), []);

  useEffect(() => {
    const pruefe = () => setGescrollt(window.scrollY > 8);
    pruefe();
    window.addEventListener("scroll", pruefe, { passive: true });
    return () => window.removeEventListener("scroll", pruefe);
  }, []);

  useEffect(() => {
    if (!offen) return;
    const taste = (e: KeyboardEvent) => e.key === "Escape" && setOffen(false);
    document.addEventListener("keydown", taste);
    return () => document.removeEventListener("keydown", taste);
  }, [offen]);

  const wechsleThema = () => {
    const neu: Thema = thema === "dunkel" ? "hell" : "dunkel";
    setzeThema(neu);
    setThemaState(neu);
  };

  return (
    <header className={gescrollt ? "kopf kopf-linie" : "kopf"}>
      <div className="shell kopf-innen">
        <a className="kopf-marke" href={STARTPFAD[sprache]} translate="no">
          Sherka
        </a>

        <nav className="kopf-nav" aria-label={t.kopf.navLabel}>
          {LINKS.map(([k, href]) => (
            <a key={k} href={href}>
              {t.kopf.links[k]}
            </a>
          ))}
        </nav>

        <div className="kopf-werkzeuge">
          <a
            className="kopf-sprache"
            href={STARTPFAD[andere]}
            hrefLang={andere}
            lang={andere}
            aria-label={t.kopf.andereSprache}
          >
            <span className="kopf-sprache-lang">{t.kopf.andereSprache}</span>
            <span className="kopf-sprache-kurz" aria-hidden="true">
              {t.kopf.andereSpracheKurz}
            </span>
          </a>
          <button
            className="kopf-thema"
            type="button"
            onClick={wechsleThema}
            aria-label={thema === "dunkel" ? t.kopf.themaHell : t.kopf.themaDunkel}
          >
            {/* Beide Icons im HTML, das CSS zeigt das passende. So stimmt das
                Icon schon beim ersten Zeichnen, auch im hellen Modus. */}
            <IconSonne className="icon-im-dunkel" />
            <IconMond className="icon-im-hell" />
          </button>
          <a className="knopf knopf-voll kopf-cta" href="#kontakt">
            {t.kopf.anfragen}
          </a>
          <button
            className="kopf-menue-knopf"
            type="button"
            aria-expanded={offen}
            aria-controls="kopf-menue"
            onClick={() => setOffen(!offen)}
          >
            {offen ? <IconX /> : <IconListe />}
            <span className="nur-lesen">{offen ? t.kopf.menueZu : t.kopf.menue}</span>
          </button>
        </div>
      </div>

      <div id="kopf-menue" className={offen ? "kopf-menue kopf-menue-offen" : "kopf-menue"} inert={!offen}>
        <nav aria-label={t.kopf.navLabel}>
          {LINKS.map(([k, href]) => (
            <a key={k} href={href} onClick={() => setOffen(false)}>
              {t.kopf.links[k]}
            </a>
          ))}
        </nav>
        <a className="knopf knopf-voll" href="#kontakt" onClick={() => setOffen(false)}>
          {t.kopf.anfragen}
        </a>
      </div>
    </header>
  );
}
