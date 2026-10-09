import { useEffect, useRef, useState } from "react";
import { useSprache } from "../lib/sprache";
import { fuelle } from "../lib/typo";
import { projekte, type Projekt } from "../data/projekte";
import messungen from "../data/messungen.json";
import { IconCheck, IconPfeilAus, IconX } from "./Icons";
import "./Abnahme.css";

/* Abnahme: vier echte Seiten als Prüfblätter. Das Bild steht in einem
   Planrahmen mit den echten Massen der Aufnahme. Die Live-Ansicht lädt die
   fremde Seite erst nach einem Klick, in einer Sandbox ohne Formulare, und
   fängt das Scrollen nicht ein, solange sie nicht geöffnet ist. */

type Messung = { lcpSekunden: number; datum: string };
const gemessen = messungen as Record<string, Messung | undefined>;

export function Abnahme() {
  const { t } = useSprache();
  return (
    <section className="sektion" id="abnahme" aria-labelledby="abnahme-titel">
      <div className="shell">
        <div className="sektion-kopf">
          <h2 id="abnahme-titel">{t.abnahme.titel}</h2>
          <p>{t.abnahme.text}</p>
        </div>
        <ol className="blaetter">
          {projekte.map((p, i) => (
            <Blatt key={p.domain} p={p} erstes={i === 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Blatt({ p, erstes }: { p: Projekt; erstes: boolean }) {
  const { t, sprache } = useSprache();
  const [live, setLive] = useState(false);
  const m = gemessen[p.domain];
  const text = p.text[sprache];
  const datum = m
    ? new Intl.DateTimeFormat(sprache === "fr" ? "fr-CH" : "de-CH", { dateStyle: "long" }).format(new Date(m.datum))
    : "";

  return (
    <li className="blatt">
      <div className="blatt-plan">
        <span className="blatt-mass mono" aria-hidden="true">
          {p.bildBreite} × {p.bildHoehe}
        </span>
        <div className="blatt-rahmen">
          {live ? (
            <LiveRahmen url={p.url} titel={p.domain} schliessen={() => setLive(false)} zuText={t.abnahme.liveZu} />
          ) : (
            <img
              src={p.bild}
              alt={fuelle(t.abnahme.bildAlt, { domain: p.domain })}
              width={p.bildBreite}
              height={p.bildHoehe}
              loading={erstes ? "eager" : "lazy"}
              decoding="async"
            />
          )}
        </div>
      </div>

      <div className="blatt-daten">
        <h3 className="mono" translate="no">
          {p.domain}
        </h3>
        <dl>
          <div>
            <dt>{t.abnahme.betrieb}</dt>
            <dd>{text.was}</dd>
          </div>
          <div>
            <dt>{t.abnahme.domain}</dt>
            <dd>{p.domainBei === "kunde" ? t.abnahme.domainKunde : t.abnahme.domainSherka}</dd>
          </div>
          {m && (
            <div>
              <dt>{t.abnahme.ladezeit}</dt>
              <dd>
                <span className="mono">{String(m.lcpSekunden)} s</span>{" "}
                <span className="leise">
                  {t.abnahme.gemessen} {datum}
                </span>
              </dd>
            </div>
          )}
        </dl>

        <p className="blatt-pruef-titel">{t.abnahme.pruefpunkte}</p>
        <ul className="blatt-pruef">
          {text.pruefpunkte.map((pp) => (
            <li key={pp}>
              <IconCheck />
              <span>{pp}</span>
            </li>
          ))}
        </ul>

        <div className="blatt-links">
          <a className="textlink" href={p.url} target="_blank" rel="noopener noreferrer">
            {t.abnahme.oeffnen}
            <IconPfeilAus className="blatt-icon" />
          </a>
          {p.einbettbar && !live && (
            <button className="blatt-live" type="button" onClick={() => setLive(true)} title={t.abnahme.liveHinweis}>
              {t.abnahme.live}
            </button>
          )}
        </div>
        {p.einbettbar && !live && <p className="blatt-hinweis">{t.abnahme.liveHinweis}</p>}
      </div>
    </li>
  );
}

const BREITE = 1240;

function LiveRahmen({ url, titel, schliessen, zuText }: { url: string; titel: string; schliessen: () => void; zuText: string }) {
  const kasten = useRef<HTMLDivElement>(null);
  const zu = useRef<HTMLButtonElement>(null);
  const [massstab, setMassstab] = useState(0.5);
  const [hoehe, setHoehe] = useState(775);

  useEffect(() => {
    const el = kasten.current;
    if (!el) return;
    const messen = () => {
      const s = el.clientWidth / BREITE;
      setMassstab(s);
      setHoehe(el.clientHeight / s);
    };
    messen();
    const ro = new ResizeObserver(messen);
    ro.observe(el);
    zu.current?.focus();
    return () => ro.disconnect();
  }, []);

  return (
    <div className="live" ref={kasten}>
      <iframe
        src={url}
        title={titel}
        sandbox="allow-scripts allow-same-origin allow-popups"
        referrerPolicy="no-referrer"
        loading="lazy"
        style={{ width: BREITE, height: hoehe, transform: `scale(${massstab})` }}
      />
      <button className="live-zu" type="button" onClick={schliessen} ref={zu}>
        <IconX />
        <span className="nur-lesen">{zuText}</span>
      </button>
    </div>
  );
}
