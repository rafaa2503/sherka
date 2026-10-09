import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const fehler = [];
p.on("console", (m) => m.type() === "error" && fehler.push(m.text()));
p.on("pageerror", (e) => fehler.push("PAGEERROR " + e.message));
await p.goto("http://localhost:5188", { waitUntil: "load" });
await p.waitForTimeout(2500);
await p.screenshot({ path: "ansichten/bau-hero.png" });
const oben = await p.evaluate(() => document.querySelector("#bau").getBoundingClientRect().top + scrollY);
for (const [i, d] of [0, 700, 1500, 2300, 3000].entries()) {
  await p.evaluate((y) => window.scrollTo(0, y), oben + d);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `ansichten/bau-${i}.png` });
}
console.log("fehler", JSON.stringify(fehler));
await b.close();
