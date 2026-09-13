import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5188", { waitUntil: "domcontentloaded" });
const r = await p.evaluate(async () => {
  const el = () => document.querySelectorAll(".hero-satz .fallblatt span[aria-hidden]");
  const t0 = performance.now();
  const ziel = ["Ihre Website soll etwas können.", "Nicht nur da sein."];
  let start = 0;
  const proben = [];
  for (let i = 0; i < 140; i++) {
    const w = [...el()].map(e => e.textContent);
    const gleich = w.length === 2 && w[0] === ziel[0] && w[1] === ziel[1];
    if (!start && w.length === 2 && !gleich) start = performance.now();
    if (i % 8 === 0) proben.push(Math.round(performance.now() - t0) + ": " + (w[0] || "").slice(0, 18));
    if (start && gleich) return { startNach: Math.round(start - t0), fertigNach: Math.round(performance.now() - t0), dauer: Math.round(performance.now() - start), proben: proben.slice(0, 8) };
    await new Promise(r => setTimeout(r, 40));
  }
  return { fehler: "timeout", proben: proben.slice(0, 10) };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
