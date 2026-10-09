import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* preact/compat statt React: identischer Code, rund 40 KB weniger im Bundle.
   Gebaut wird zweimal: einmal für den Browser, einmal (--ssr) für das
   Vorrendern in scripts/vorrendern.mjs. */

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
  ssr: {
    noExternal: true,
  },
  build: {
    manifest: true,
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
});
