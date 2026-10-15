import { chromium } from "playwright";
import { readFile } from "node:fs/promises";

/* Erzeugt die Teilen-Bilder public/og-de.png und public/og-fr.png (1200x630),
   die WhatsApp, LinkedIn und Google beim Teilen eines Links zeigen.
   Inhalt: das Logo (Zeichen und Wortmarke "sherka.") und der Titel der Seite.
   Schrift ist Inter aus node_modules, wie auf der Seite.
   Aufruf: node scripts/og.mjs */

// Als data:-URL eingebettet: eine Seite aus setContent darf keine file:-Schriften laden.
const alsData = async (datei, typ) => `data:${typ};base64,${(await readFile(datei)).toString("base64")}`;
const schrift = await alsData("node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", "font/woff2");

// Das Zeichen aus public/favicon.svg, ohne den Hintergrund.
const zeichen = `<svg viewBox="0 0 512 512" width="150" height="150" aria-hidden="true"><g transform="translate(-39 0)"><path d="M286.0 96.0A120.0 80.0 0 0 0 286.0 256.0ZM226.0 256.0A120.0 80.0 0 0 1 226.0 416.0Z" fill="#F0F1F3"/><circle cx="392" cy="384" r="32" fill="#FFA51E"/></g></svg>`;

const TEXTE = {
  de: "Mehr Kunden. Weniger Aufwand.",
  fr: "Plus de clients. Moins d'efforts.",
};

const b = await chromium.launch();
for (const [sprache, titel] of Object.entries(TEXTE)) {
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.setContent(`<!doctype html><html lang="${sprache}"><head><style>
    @font-face { font-family: I; src: url(${schrift}) format("woff2"); font-weight: 100 900; }
    * { box-sizing: border-box; margin: 0; }
    body { width: 1200px; height: 630px; background: #14131C; color: #F0F1F3; font-family: I, sans-serif;
           display: grid; place-content: center; justify-items: center; gap: 44px; }
    .marke { display: flex; align-items: center; gap: 26px; }
    .wort { font-size: 128px; font-weight: 700; letter-spacing: -0.045em; line-height: 1; }
    .punkt { color: #FFA51E; }
    p { font-size: 46px; font-weight: 600; letter-spacing: -0.025em; color: #A8ABB2; }
  </style></head><body>
    <div class="marke">${zeichen}<span class="wort">sherka<span class="punkt">.</span></span></div>
    <p>${titel}</p>
  </body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(200);
  await p.screenshot({ path: `public/og-${sprache}.png` });
  await p.close();
  console.log(`public/og-${sprache}.png`);
}
await b.close();
