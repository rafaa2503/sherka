import { useEffect, useState } from "react";
import { STARTPFAD, useSprache } from "../lib/sprache";
import { aktuellesThema, setzeThema, type Thema } from "../lib/thema";
import { IconListe, IconMond, IconSonne, IconX } from "./Icons";
import "./Kopf.css";

/* Dünne Glasleiste wie auf apple.com (bei reduzierter Transparenz deckend). Der Sprachwechsel ist ein echter Link auf die
   andere Fassung der Seite. Am Handy klappt ein Menü von oben auf. */

const LINKS = [
  ["arbeiten", "#arbeiten"],
  ["vorteile", "#vorteile"],
  ["ablauf", "#ablauf"],
  ["faq", "#faq"],
] as const;

export function Kopf() {
  const { t, sprache } = useSprache();
  const [thema, setThemaState] = useState<Thema>("hell");
  const [offen, setOffen] = useState(false);
  const [gescrollt, setGescrollt] = useState(false);
  const [ueberDunkel, setUeberDunkel] = useState(false);
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

  // Über einer dunklen Bühne wird die Leiste selbst dunkel, wie auf apple.com.
  useEffect(() => {
    const dunkle = document.querySelectorAll(".buehne-dunkel");
    if (!dunkle.length || typeof IntersectionObserver === "undefined") return;
    const sichtbar = new Set<Element>();
    const io = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) e.isIntersecting ? sichtbar.add(e.target) : sichtbar.delete(e.target);
        setUeberDunkel(sichtbar.size > 0);
      },
      { rootMargin: "0px 0px -96% 0px" },
    );
    dunkle.forEach((d) => io.observe(d));
    return () => io.disconnect();
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
    <header className={`kopf${gescrollt ? " kopf-linie" : ""}${ueberDunkel ? " buehne-dunkel kopf-dunkel" : ""}`}>
      <div className="kopf-innen">
        <a className="kopf-marke" href={STARTPFAD[sprache]} translate="no" aria-label="Sherka">
          sherka<span className="marke-punkt">.</span>
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
