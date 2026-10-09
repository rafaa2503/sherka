import { useSprache } from "./lib/sprache";
import { Kopf } from "./abschnitte/Kopf";
import { Bautafel } from "./abschnitte/Bautafel";
import { Abnahme } from "./abschnitte/Abnahme";
import { Ablauf, Faq, Hauswartung, UeberMich } from "./abschnitte/Abschnitte";
import { Kontakt } from "./abschnitte/Kontakt";
import { Aktionsleiste, Fuss } from "./abschnitte/Rahmen";

/* Sherka V2, Etappe a. Reihenfolge: Bautafel, Abnahme (echte Arbeiten),
   Hauswartung, Ablauf, Über mich, Fragen, Kontakt. Kein Abschnitt hält das
   Scrollen fest. */

export default function App() {
  const { t } = useSprache();
  return (
    <>
      <a className="springlink" href="#inhalt">
        {t.kopf.zumInhalt}
      </a>
      <Kopf />
      <main id="inhalt">
        <Bautafel />
        <Abnahme />
        <Hauswartung />
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
