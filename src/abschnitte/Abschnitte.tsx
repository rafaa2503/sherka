import { useSprache } from "../lib/sprache";
import { PORTRAET_1120, PORTRAET_560, PORTRAET_DA } from "../data/portraet";
import "./Abschnitte.css";

/* Drei Vorteile der Website als ganze Sätze, Leistungen, Ablauf, die Person und Fragen. */

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
            <li key={k.gross} className={`bento-kachel auftritt bento-${i + 1}`} style={{ "--i": i } as React.CSSProperties}>
              <p className="bento-gross">{k.gross}</p>
              {k.text && <p className="bento-text">{k.text}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Leistungen() {
  const { t } = useSprache();
  return (
    <section className="sektion" id="leistungen" aria-labelledby="leistungen-titel">
      <div className="shell-breit">
        <h2 id="leistungen-titel" className="auftritt abschnitt-titel">
          {t.leistungen.titel}
        </h2>
        <ul className="leist">
          {t.leistungen.liste.map((l, i) => (
            <li key={l.was} className="leist-punkt auftritt" style={{ "--i": i } as React.CSSProperties}>
              <h3>{l.was}</h3>
              <p className="leise">{l.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Ohne Porträt erscheint nur der Text, nie ein Platzhalter (data/portraet.ts). */
export function Person() {
  const { t } = useSprache();
  return (
    <section className="sektion" id="person" aria-labelledby="person-titel">
      <div className="shell-breit">
        <h2 id="person-titel" className="auftritt abschnitt-titel">
          {t.person.titel}
        </h2>
        <div className={PORTRAET_DA ? "person auftritt" : "person person-ohne-bild auftritt"}>
          {PORTRAET_DA && (
            <img
              className="person-bild"
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
          <p className="person-text">{t.person.text}</p>
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
              <h3>{s.was}</h3>
              <p className="leise">{s.text}</p>
            </li>
          ))}
        </ol>
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
