import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark" });
await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
await p.waitForTimeout(2600);   // Vorhang abwarten
const oben = await p.evaluate(() => {
  const h = document.querySelector(".hero-kopf");
  return { heroOpacity: getComputedStyle(h).opacity, vorhangWeg: !document.querySelector(".vorhang"), scrollY: Math.round(scrollY) };
});
console.log("oben:", JSON.stringify(oben));
await p.screenshot({ path: "ansichten/x-hero-neu.png" });

// Runterscrollen und wieder hoch, danach muss der Hero zurueck sein.
await p.evaluate(async () => {
  const s = window.innerHeight * 0.7;
  for (let y = 0; y < document.body.scrollHeight; y += s) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 180)); }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 900));
});
const zurueck = await p.evaluate(() => getComputedStyle(document.querySelector(".hero-kopf")).opacity);
console.log("nach dem Zurueckscrollen, hero opacity:", zurueck);

const el = await p.$(".aussage-sektion");
await el.scrollIntoViewIfNeeded();
await p.waitForTimeout(900);
await el.screenshot({ path: "ansichten/x-aussage.png" });
await b.close();
