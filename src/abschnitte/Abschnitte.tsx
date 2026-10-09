import { useSprache } from "../lib/sprache";
import { PORTRAET_1120, PORTRAET_560, PORTRAET_DA } from "../data/portraet";
import "./Abschnitte.css";

/* Die ruhigen Abschnitte: Hauswartung, Ablauf, Über mich, Fragen.
   Kein Effekt, nur Schrift, Abstand und eine Linie, wo sie ordnet. */

export function Hauswartung() {
  const { t } = useSprache();
  const h = t.hauswartung;
  return (
    <section className="sektion" id="hauswartung" aria-labelledby="hauswartung-titel">
      <div className="shell zwei-spalten">
        <div className="sektion-kopf klebt">
          <h2 id="hauswartung-titel">{h.titel}</h2>
          <p>{h.text}</p>
        </div>
        <div className="stapel-gross">
          <dl className="haus-liste">
            {h.zeilen.map((z) => (
              <div key={z.was}>
                <dt>{z.was}</dt>
                <dd>{z.text}</dd>
              </div>
            ))}
          </dl>
          <div className="stapel">
            <h3>{h.leistungenTitel}</h3>
            <ul className="leist-liste">
              {h.leistungen.map((l) => (
                <li key={l.was}>
                  <strong>{l.was}</strong>
                  <span className="leise">{l.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Ablauf() {
  const { t } = useSprache();
  return (
    <section className="sektion" id="ablauf" aria-labelledby="ablauf-titel">
      <div className="shell">
        <div className="sektion-kopf">
          <h2 id="ablauf-titel">{t.ablauf.titel}</h2>
        </div>
        {/* Eine echte Reihenfolge, deshalb hier Nummern. */}
        <ol className="abl">
          {t.ablauf.schritte.map((s, i) => (
            <li key={s.was} className="abl-schritt">
              <span className="abl-nr mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="abl-zeit mono">{s.zeit}</span>
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
        <div className="stapel">
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
    <section className="sektion" id="faq" aria-labelledby="faq-titel">
      <div className="shell zwei-spalten">
        <div className="sektion-kopf klebt">
          <h2 id="faq-titel">{t.faq.titel}</h2>
        </div>
        <ul className="faq">
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
