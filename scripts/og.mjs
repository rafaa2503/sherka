import { chromium } from "playwright";
import { readFile } from "node:fs/promises";

/* Erzeugt die Teilen-Bilder public/og-de.png und public/og-fr.png (1200x630),
   die WhatsApp, LinkedIn und Google beim Teilen eines Links zeigen.
   Inhalt: das Logo (logo/lockup-dark.svg) und der Titel der Seite.
   Schrift ist Inter aus node_modules, wie auf der Seite.
   Aufruf: node scripts/og.mjs */

// Als data:-URL eingebettet: eine Seite aus setContent darf keine file:-Schriften laden.
const alsData = async (datei, typ) => `data:${typ};base64,${(await readFile(datei)).toString("base64")}`;
const schrift = await alsData("node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", "font/woff2");

// Das Logo aus logo/lockup-dark.svg (offizielle Logo-Datei), ohne Hintergrund.
const lockup = (await readFile("logo/lockup-dark.svg", "utf8")).replace(/<rect[^>]*\/>/, "");
const logo = `data:image/svg+xml;base64,${Buffer.from(lockup).toString("base64")}`;

const TEXTE = {
  de: "Mehr Kunden. Weniger Aufwand.",
  fr: "Plus de clients. Moins de tracas.",
};

const b = await chromium.launch();
for (const [sprache, titel] of Object.entries(TEXTE)) {
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.setContent(`<!doctype html><html lang="${sprache}"><head><style>
    @font-face { font-family: I; src: url(${schrift}) format("woff2"); font-weight: 100 900; }
    * { box-sizing: border-box; margin: 0; }
    body { width: 1200px; height: 630px; background: #14131C; color: #F0F1F3; font-family: I, sans-serif;
           display: grid; place-content: center; justify-items: center; gap: 44px; }
    .logo { width: 920px; height: 460px; margin: -150px 0 -170px; }
    p { font-size: 46px; font-weight: 600; letter-spacing: -0.025em; color: #A8ABB2; }
  </style></head><body>
    <img class="logo" src="${logo}" alt="">
    <p>${titel}</p>
  </body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(200);
  await p.screenshot({ path: `public/og-${sprache}.png` });
  await p.close();
  console.log(`public/og-${sprache}.png`);
}
await b.close();
