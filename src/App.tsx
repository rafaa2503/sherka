import { useSprache } from "./lib/sprache";
import { useAuftritt } from "./lib/bewegung";
import { Kopf } from "./abschnitte/Kopf";
import { Hero } from "./abschnitte/Hero";
import { Arbeiten, Intro } from "./abschnitte/Arbeiten";
import { Ablauf, Faq, Vorteile } from "./abschnitte/Abschnitte";
import { Kontakt } from "./abschnitte/Kontakt";
import { Aktionsleiste, Fuss } from "./abschnitte/Rahmen";

/* Die Seite folgt einer Verkaufslinie (plans/texte-marketing.md): Versprechen
   (Hero), Beweis (Kundenseiten), Problem (Intro), Unterschied ("Wer baut, bleibt"
   mit der Person), Weg (Ablauf), Einwände
   (Fragen), Handlung (Kontakt). */

export default function App() {
  const { t } = useSprache();
  useAuftritt();
  return (
    <>
      <a className="springlink" href="#inhalt">
        {t.kopf.zumInhalt}
      </a>
      <Kopf />
      <main id="inhalt">
        <Hero />
        <Arbeiten />
        <Intro />
        <Vorteile />
        <Ablauf />
        <Faq />
        <Kontakt />
      </main>
      <Fuss />
      <Aktionsleiste />
    </>
  );
}
