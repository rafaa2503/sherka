import { chromium } from "playwright";
import { readFile } from "node:fs/promises";

/* Erzeugt die Teilen-Bilder public/og-de.png und public/og-fr.png (1200x630).
   Inhalt: die Überschrift der Bautafel und eine echte Kundenseite im
   Baugespann. Schrift ist Archivo aus node_modules, damit das Bild genauso
   aussieht wie die Seite.
   Aufruf: node scripts/og.mjs */

// Als data:-URL eingebettet: eine Seite aus setContent darf keine file:-Schriften laden.
const alsData = async (datei, typ) => `data:${typ};base64,${(await readFile(datei)).toString("base64")}`;
const schrift = await alsData("node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2", "font/woff2");
const mono = await alsData("node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2", "font/woff2");
const bild = await alsData("public/shots/bledi-bienne.ch.webp", "image/webp");

const TEXTE = {
  de: { oben: "Hier entsteht", unten: "Ihre Website.", zeile: "Sherka, Webentwicklung in Biel/Bienne" },
  fr: { oben: "Ici se construit", unten: "votre site web.", zeile: "Sherka, développement web à Bienne" },
};

const b = await chromium.launch();
for (const [sprache, t] of Object.entries(TEXTE)) {
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.setContent(`<!doctype html><html lang="${sprache}"><head><style>
    @font-face { font-family: A; src: url(${schrift}) format("woff2"); font-weight: 100 900; }
    @font-face { font-family: M; src: url(${mono}) format("woff2"); }
    * { box-sizing: border-box; margin: 0; }
    body { width: 1200px; height: 630px; background: #16181c; color: #eaecef; font-family: A, sans-serif; display: grid; grid-template-columns: 560px 1fr; align-items: center; padding: 0 64px; gap: 40px; }
    h1 { font-size: 76px; font-weight: 620; letter-spacing: -0.025em; line-height: 1.04; }
    p { margin-top: 28px; font-size: 26px; color: #a8abb2; }
    .bg { position: relative; padding: 26px; }
    .l { position: absolute; background: #f0a23a; }
    .o, .u { left: 4px; right: 4px; height: 3px; } .o { top: 25px; } .u { bottom: 25px; }
    .li, .r { top: 4px; bottom: 4px; width: 3px; } .li { left: 25px; } .r { right: 25px; }
    .m { position: absolute; top: -4px; left: 34px; font-family: M; font-size: 15px; color: #a8abb2; }
    img { display: block; width: 100%; aspect-ratio: 1240/775; object-fit: cover; object-position: top; }
  </style></head><body>
    <div><h1>${t.oben}<br>${t.unten}</h1><p>${t.zeile}</p></div>
    <div class="bg"><span class="l o"></span><span class="l u"></span><span class="l li"></span><span class="l r"></span><span class="m">1240 × 775</span><img src="${bild}" alt=""></div>
  </body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(200);
  await p.screenshot({ path: `public/og-${sprache}.png` });
  await p.close();
  console.log(`public/og-${sprache}.png`);
}
await b.close();
