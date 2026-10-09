import { useSprache } from "./lib/sprache";
import { useAuftritt } from "./lib/bewegung";
import { Kopf } from "./abschnitte/Kopf";
import { Hero } from "./abschnitte/Hero";
import { Arbeiten, Intro } from "./abschnitte/Arbeiten";
import { Entstehung } from "./abschnitte/Entstehung";
import { Ablauf, Faq, UeberMich, Vorteile } from "./abschnitte/Abschnitte";
import { Kontakt } from "./abschnitte/Kontakt";
import { Aktionsleiste, Fuss } from "./abschnitte/Rahmen";

/* Sherka V2 im Stil einer Apple-Produktseite: Laptop mit echter Kundenseite,
   Arbeiten als Karussell, "So entsteht" auf dunkler Bühne, Vorteile als
   Kacheln, Ablauf, Über mich, Fragen, Kontakt. */

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
        <Intro />
        <Arbeiten />
        <Entstehung />
        <Vorteile />
        <Ablauf />
        <UeberMich />
        <Faq />
        <Kontakt />
      </main>
      <Fuss />
      <Aktionsleiste />
    </>
  );
}
