import "./styles/base.css";
import { hydrate } from "preact";
import App from "./App";
import { SprachProvider, spracheAusPfad } from "./lib/sprache";
import "./abschnitte/Recht.css";

/* Das HTML steht schon vorgerendert da. hydrate hängt nur die Logik an,
   ohne den Inhalt neu aufzubauen. */

const wurzel = document.getElementById("app");
if (wurzel) {
  hydrate(
    <SprachProvider sprache={spracheAusPfad(location.pathname)}>
      <App />
    </SprachProvider>,
    wurzel,
  );
}
