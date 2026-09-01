import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SprachProvider } from "./i18n";
import App from "./App";
import "./styles/base.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SprachProvider>
      <App />
    </SprachProvider>
  </StrictMode>,
);
