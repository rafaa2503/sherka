import { useSprache } from "../lib/sprache";
import { PORTRAET_1120, PORTRAET_560, PORTRAET_DA } from "../data/portraet";
import "./Abschnitte.css";

/* Vorteile als Kacheln (Bento wie auf apple.com), Ablauf, Über mich, Fragen. */

export function Vorteile() {
  const { t } = useSprache();
  const v = t.vorteile;
  return (
    <section className="sektion" id="vorteile" aria-labelledby="vorteile-titel">
      <div className="shell-breit">
        <h2 id="vorteile-titel" className="auftritt abschnitt-titel">
          {v.titel}
        </h2>
        <ul className="bento">
          {v.kacheln.map((k, i) => (
            <li key={k.gross} className={`bento-kachel auftritt bento-${i + 1}`} style={{ "--i": i % 3 } as React.CSSProperties}>
              <p className="bento-gross">{k.gross}</p>
              <p className="bento-text">{k.text}</p>
            </li>
          ))}
        </ul>

        <div className="leistungen auftritt">
          <h3>{v.leistungenTitel}</h3>
          <ul>
            {v.leistungen.map((l) => (
              <li key={l.was} className="zweiklang">
                <strong>{l.was}</strong> {l.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Ablauf() {
  const { t } = useSprache();
  return (
    <section className="sektion ablauf" id="ablauf" aria-labelledby="ablauf-titel">
      <div className="shell-breit">
        <h2 id="ablauf-titel" className="auftritt abschnitt-titel">
          {t.ablauf.titel}
        </h2>
        {/* Eine echte Reihenfolge, deshalb hier Nummern. */}
        <ol className="abl">
          {t.ablauf.schritte.map((s, i) => (
            <li key={s.was} className="abl-schritt auftritt" style={{ "--i": i } as React.CSSProperties}>
              <span className="abl-nr" aria-hidden="true">
                {i + 1}
              </span>
              <span className="abl-zeit">{s.zeit}</span>
              <h3>{s.was}</h3>
              <p className="leise">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function UeberMich() {
  const { t } = useSprache();
  return (
    <section className="sektion" id="person" aria-labelledby="person-titel">
      <div className={PORTRAET_DA ? "shell person" : "shell person person-ohne-bild"}>
        {PORTRAET_DA && (
          <img
            className="person-bild auftritt"
            src={PORTRAET_1120}
            srcSet={`${PORTRAET_560} 560w, ${PORTRAET_1120} 1120w`}
            sizes="(min-width: 900px) 320px, 70vw"
            alt={t.person.fotoAlt}
            width={560}
            height={700}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="person-text-block auftritt">
          <h2 id="person-titel">{t.person.titel}</h2>
          <p className="person-text">{t.person.text}</p>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useSprache();
  return (
    <section className="sektion faq-sektion" id="faq" aria-labelledby="faq-titel">
      <div className="shell">
        <h2 id="faq-titel" className="auftritt abschnitt-titel">
          {t.faq.titel}
        </h2>
        <ul className="faq auftritt">
          {t.faq.liste.map((e) => (
            <li key={e.frage}>
              <details>
                <summary>
                  <span>{e.frage}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p>{e.antwort}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
