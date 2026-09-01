import { useEffect, useRef, useState } from "react";
import { useSprache } from "../i18n";
import { MessFehler, miss, type Fehlerart, type Messung, type Stufe } from "../lib/psi";
import { Zahl } from "./Zahl";
import "./Tempocheck.css";

type Zustand =
  | { art: "bereit" }
  | { art: "misst" }
  | { art: "fertig"; messung: Messung }
  | { art: "fehler"; fehlerart: Fehlerart };

const farbe: Record<Stufe, string> = {
  gut: "var(--gut)",
  mittel: "var(--mittel)",
  schlecht: "var(--schlecht)",
};

export function Tempocheck({ aufAnfrage }: { aufAnfrage: (domain: string) => void }) {
  const { t } = useSprache();
  const [eingabe, setEingabe] = useState("");
  const [zustand, setZustand] = useState<Zustand>({ art: "bereit" });
  const abbruch = useRef<AbortController | null>(null);

  useEffect(() => () => abbruch.current?.abort(), []);

  async function messen(e: React.FormEvent) {
    e.preventDefault();
    abbruch.current?.abort();
    const ctl = new AbortController();
    abbruch.current = ctl;
    setZustand({ art: "misst" });
    try {
      const messung = await miss(eingabe, ctl.signal);
      setZustand({ art: "fertig", messung });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setZustand({
        art: "fehler",
        fehlerart: err instanceof MessFehler ? err.art : "allgemein",
      });
    }
  }

  const stufenWort: Record<Stufe, string> = {
    gut: t.tempo.stufeGut,
    mittel: t.tempo.stufeMittel,
    schlecht: t.tempo.stufeSchlecht,
  };

  const fehlerText: Record<Fehlerart, string> = {
    url: t.tempo.fehlerUrl,
    "nicht-erreichbar": t.tempo.fehlerNichtErreichbar,
    kontingent: t.tempo.fehlerKontingent,
    allgemein: t.tempo.fehlerAllgemein,
  };

  const m = zustand.art === "fertig" ? zustand.messung : null;

  return (
    <div className="tempo">
      <form className="tempo-form" onSubmit={messen} noValidate>
        <label className="tempo-label" htmlFor="tempo-url">
          {t.tempo.label}
        </label>
        <div className="tempo-zeile">
          <input
            id="tempo-url"
            className="tempo-input"
            type="text"
            inputMode="url"
            autoComplete="url"
            spellCheck={false}
            placeholder={t.tempo.platzhalter}
            value={eingabe}
            onChange={(e) => setEingabe(e.target.value)}
            aria-describedby={zustand.art === "fehler" ? "tempo-fehler" : undefined}
            aria-invalid={zustand.art === "fehler" || undefined}
          />
          <button className="knopf knopf-voll" type="submit" disabled={zustand.art === "misst"}>
            {zustand.art === "misst" ? t.tempo.laeuft : t.tempo.knopf}
          </button>
        </div>
      </form>

      {/* Ergebnisse und Fehler landen im selben Live-Bereich, sonst merkt
          ein Screenreader nicht, dass ueberhaupt etwas passiert ist. */}
      <div className="tempo-ausgabe" aria-live="polite" aria-busy={zustand.art === "misst"}>
        {zustand.art === "misst" && (
          <div className="tempo-laeuft">
            <div className="tempo-balken" role="presentation">
              <span />
            </div>
            <p className="leise">{t.tempo.laeuftHinweis}</p>
          </div>
        )}

        {zustand.art === "fehler" && (
          <div className="tempo-fehler" id="tempo-fehler">
            <p>{fehlerText[zustand.fehlerart]}</p>
            <p className="leise">{t.tempo.fehlerHinweis}</p>
          </div>
        )}

        {m && (
          <div className="tempo-ergebnis">
            <p className="tempo-urteil" style={{ color: farbe[m.gesamt] }}>
              {m.gesamt === "gut"
                ? t.tempo.urteilGut
                : m.gesamt === "mittel"
                  ? t.tempo.urteilMittel.replace("{lcp}", (m.lcp.wert / 1000).toFixed(1))
                  : t.tempo.urteilSchlecht}
            </p>

            <dl className="tempo-werte">
              <div className="tempo-wert">
                <dt>{t.tempo.lcpLabel}</dt>
                <dd style={{ color: farbe[m.lcp.stufe] }}>
                  <Zahl bis={m.lcp.wert / 1000} stellen={1} /> s
                  {/* Farbe ist nie die einzige Information. */}
                  <span className="tempo-stufe">{stufenWort[m.lcp.stufe]}</span>
                </dd>
              </div>
              <div className="tempo-wert">
                <dt>{t.tempo.clsLabel}</dt>
                <dd style={{ color: farbe[m.cls.stufe] }}>
                  <Zahl bis={m.cls.wert} stellen={2} />
                  <span className="tempo-stufe">{stufenWort[m.cls.stufe]}</span>
                </dd>
              </div>
              <div className="tempo-wert">
                <dt>{t.tempo.scoreLabel}</dt>
                <dd>
                  <Zahl bis={m.score} stellen={0} />
                  <span className="tempo-stufe">/ 100</span>
                </dd>
              </div>
            </dl>

            <p className="tempo-quelle leise">
              {m.domain}. {m.ausFelddaten ? t.tempo.feldDaten : t.tempo.laborDaten}
            </p>

            <div className="tempo-weiter">
              <p>{m.gesamt === "gut" ? t.tempo.weiterGut : t.tempo.weiterSchlecht}</p>
              <div className="tempo-knoepfe">
                <button className="knopf knopf-voll" type="button" onClick={() => aufAnfrage(m.domain)}>
                  {t.tempo.weiterKnopf}
                </button>
                <button
                  className="knopf knopf-leer"
                  type="button"
                  onClick={() => {
                    setEingabe("");
                    setZustand({ art: "bereit" });
                  }}
                >
                  {t.tempo.nochmal}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <noscript>
        <p className="tempo-fehler">{t.tempo.ohneJs}</p>
      </noscript>
    </div>
  );
}
