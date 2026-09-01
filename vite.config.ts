import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* preact/compat statt React: identischer Code, rund 40 KB weniger im Bundle.
   Auf einer Seite, die mit Ladezeit argumentiert, ist das keine Spielerei,
   sondern die Voraussetzung dafuer, den eigenen Tempocheck zu bestehen. */

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
});
