import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
const r = await p.evaluate(() => {
  const txt = document.body.innerText.replace(/\s+/g, " ").trim();
  return {
    woerter: txt.split(" ").length,
    sektionen: document.querySelectorAll("main section").length,
    ueberschriften: document.querySelectorAll("h1,h2,h3").length,
    bloecke: document.querySelectorAll("main li, main .reihe, main .tafel-zeile, main .projekt").length,
  };
});
console.log(JSON.stringify(r));
await b.close();
