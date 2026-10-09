import { STARTPFAD, useSprache } from "../lib/sprache";
import { DATENSCHUTZ, IMPRESSUM } from "../inhalt/recht";
import { typoFr } from "../lib/typo";
import { Fuss } from "./Rahmen";
import "./Recht.css";

/* Rechtsseiten und 404: vorgerendert, ohne JavaScript ausgeliefert. */

export type RechtSeite = "impressum" | "datenschutz";

function Schlicht({ children }: { children: React.ReactNode }) {
  const { sprache } = useSprache();
  return (
    <>
      <header className="recht-kopf">
        <div className="shell">
          <a className="kopf-marke" href={STARTPFAD[sprache]} translate="no">
            Sherka
          </a>
        </div>
      </header>
      <main className="shell recht" id="inhalt">
        {children}
      </main>
      <Fuss />
    </>
  );
}

export function Recht({ seite }: { seite: RechtSeite }) {
  const { sprache } = useSprache();
  const roh = (seite === "impressum" ? IMPRESSUM : DATENSCHUTZ)[sprache];
  const text = sprache === "fr" ? typoFr(roh) : roh;
  return (
    <Schlicht>
      <h1>{text.titel}</h1>
      <p className="leise">{text.stand}</p>
      {text.bloecke.map((b) => (
        <section key={b.titel}>
          <h2>{b.titel}</h2>
          {b.absaetze.map((a) => (
            <p key={a}>{a}</p>
          ))}
        </section>
      ))}
    </Schlicht>
  );
}

export function NichtGefunden() {
  const { t } = useSprache();
  return (
    <Schlicht>
      <h1>{t.nichtGefunden.titel}</h1>
      <p>{t.nichtGefunden.text}</p>
      <p className="recht-links">
        <a className="textlink" href="/">
          {t.nichtGefunden.zurueck}
        </a>
        <a className="textlink" href="/fr/" lang="fr">
          Vers la page d’accueil
        </a>
      </p>
    </Schlicht>
  );
}
