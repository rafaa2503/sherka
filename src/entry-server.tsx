import { renderToString } from "preact-render-to-string";
import App from "./App";
import { Recht, NichtGefunden, type RechtSeite } from "./abschnitte/Recht";
import { SprachProvider, WOERTER, type Sprache } from "./lib/sprache";
import { kopfDaten } from "./lib/kopf";

/* Wird nur beim Build benutzt (scripts/vorrendern.mjs). Liefert für jede
   Seite das HTML des Inhalts und die Kopfdaten. Hier darf nichts window
   oder document lesen. */

export function renderStart(sprache: Sprache) {
  return {
    html: renderToString(
      <SprachProvider sprache={sprache}>
        <App />
      </SprachProvider>,
    ),
    kopf: kopfDaten(sprache, "start"),
  };
}

export function renderRecht(sprache: Sprache, seite: RechtSeite) {
  return {
    html: renderToString(
      <SprachProvider sprache={sprache}>
        <Recht seite={seite} />
      </SprachProvider>,
    ),
    kopf: kopfDaten(sprache, seite),
  };
}

export function render404() {
  return {
    html: renderToString(
      <SprachProvider sprache="de">
        <NichtGefunden />
      </SprachProvider>,
    ),
    kopf: kopfDaten("de", "404"),
  };
}

export { WOERTER };
