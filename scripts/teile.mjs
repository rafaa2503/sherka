import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
await mkdir("ansichten", { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark" });
await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
await p.evaluate(async () => {
  const s = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += s) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); }
});
// Gezielt die neuen Abschnitte aufnehmen.
for (const [name, sel] of [["laufband", ".laufband"], ["zahlen", "#zahlen"], ["branchen", "#branchen"], ["projekte", "#arbeiten"]]) {
  const el = await p.$(sel);
  if (!el) { console.log(name, "FEHLT"); continue; }
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  await el.screenshot({ path: `ansichten/x-${name}.png` });
  console.log(name, "ok");
}
await b.close();
