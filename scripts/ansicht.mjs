import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

/* Nimmt die laufende Seite in echt auf. Gebraucht, weil das eingebaute
   Vorschaufenster keine Frames zeichnet: dort laufen CSS-Transitions nie
   los und Lazy-Bilder laden nie.

   Aufruf: npm run ansicht            (Desktop und Handy)
           npm run ansicht -- ganz    (zusaetzlich die ganze Seite) */

const URL = process.env.URL ?? "http://localhost:5188";
const ZIEL = "ansichten";
const ganz = process.argv.includes("ganz");

await mkdir(ZIEL, { recursive: true });

const browser = await chromium.launch();

const geraete = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, mobil: false },
  { name: "handy", viewport: { width: 390, height: 844 }, mobil: true },
];

for (const g of geraete) {
  const seite = await browser.newPage({
    viewport: g.viewport,
    deviceScaleFactor: 2,
    isMobile: g.mobil,
    hasTouch: g.mobil,
    colorScheme: "dark",
  });

  const fehler = [];
  seite.on("console", (m) => m.type() === "error" && fehler.push(m.text()));
  seite.on("pageerror", (e) => fehler.push("PAGEERROR: " + e.message));

  await seite.goto(URL, { waitUntil: "networkidle" });

  // Alles einmal durchscrollen, damit Lazy-Bilder laden und jede
  // Enthuellung ausgeloest wird.
  await seite.evaluate(async () => {
    const schritt = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += schritt) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 700));
  });

  await seite.screenshot({ path: `${ZIEL}/${g.name}-hero.png` });

  if (ganz) {
    await seite.screenshot({ path: `${ZIEL}/${g.name}-ganz.png`, fullPage: true });
  }

  // Nachweise sammeln, die im Vorschaufenster nicht messbar waren.
  const befund = await seite.evaluate(() => {
    const bilder = [...document.querySelectorAll("img")];
    const versteckt = [...document.querySelectorAll('[data-auf="aus"]')];
    const de = document.documentElement;
    return {
      bilderGeladen: `${bilder.filter((i) => i.complete && i.naturalWidth > 0).length}/${bilder.length}`,
      nochVersteckt: versteckt.length,
      horizontalerUeberlauf: de.scrollWidth > de.clientWidth,
      shader: !!document.querySelector(".nebel canvas"),
      seitenhoehe: de.scrollHeight,
    };
  });

  console.log(g.name, JSON.stringify(befund), fehler.length ? `FEHLER: ${fehler.join(" | ")}` : "keine Fehler");
  await seite.close();
}

await browser.close();
console.log(`Ansichten in ${ZIEL}/`);
