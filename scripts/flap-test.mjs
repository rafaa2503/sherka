import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5188", { waitUntil: "domcontentloaded" });
const r = await p.evaluate(async () => {
  const ziel = ["Websites, die", "etwas können."];
  const start = performance.now();
  const proben = [];
  for (let i = 0; i < 60; i++) {
    const zeilen = [...document.querySelectorAll(".hero-zeile .fallblatt span[aria-hidden]")].map(e => e.textContent);
    if (i % 10 === 0) proben.push(Math.round(performance.now() - start) + "ms: " + JSON.stringify(zeilen));
    if (zeilen.length === 2 && zeilen[0] === ziel[0] && zeilen[1] === ziel[1]) {
      return { fertigNach: Math.round(performance.now() - start) + "ms", proben };
    }
    await new Promise(r => setTimeout(r, 100));
  }
  return { fertigNach: "NIE (6s)", proben };
});
console.log(r.fertigNach);
r.proben.forEach(x => console.log(" ", x));
await b.close();
