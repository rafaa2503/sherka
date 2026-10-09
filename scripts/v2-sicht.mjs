import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

/* Aufnahmen auf den Geraeten, fuer die die Seite gebaut ist: Laptop und Handy.
   Aufruf: node scripts/v2-sicht.mjs */
const URL = process.env.URL ?? "http://localhost:5188";
await mkdir("ansichten", { recursive: true });
const b = await chromium.launch();

const geraete = [
  { n: "laptop", vp: { width: 1366, height: 768 }, mobil: false },
  { n: "handy", vp: { width: 390, height: 844 }, mobil: true },
];

for (const g of geraete) {
  const p = await b.newPage({ viewport: g.vp, isMobile: g.mobil, hasTouch: g.mobil, deviceScaleFactor: 1 });
  const fehler = [];
  p.on("console", (m) => m.type() === "error" && !m.text().includes("404") && fehler.push(m.text()));
  p.on("pageerror", (e) => fehler.push("PAGEERROR " + e.message));
  await p.goto(URL, { waitUntil: "load" });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `ansichten/v2-${g.n}-0-hero.png` });

  const stellen = [
    ["1-blatt", () => window.innerHeight * 0.55],
    ["2-bau-start", () => document.querySelector("#bau").getBoundingClientRect().top + scrollY],
    ["3-bau-mitte", () => document.querySelector("#bau").getBoundingClientRect().top + scrollY + 1700],
    ["4-arbeiten", () => document.querySelector("#arbeiten").getBoundingClientRect().top + scrollY + 200],
    ["4b-arbeiten", () => document.querySelector("#arbeiten").getBoundingClientRect().top + scrollY + 1300],
    ["4c-leistungen", () => document.querySelector("#leistungen").getBoundingClientRect().top + scrollY - 60],
    ["5-ablauf", () => document.querySelector("#ablauf").getBoundingClientRect().top + scrollY + 100],
    ["5b-faq", () => document.querySelector("#faq").getBoundingClientRect().top + scrollY - 60],
    ["5c-person", () => document.querySelector("#person").getBoundingClientRect().top + scrollY - 60],
    ["6-kontakt", () => document.querySelector("#kontakt").getBoundingClientRect().top + scrollY - 40],
    ["7-ende", () => document.documentElement.scrollHeight],
  ];
  for (const [name, fn] of stellen) {
    const y = await p.evaluate(`(${fn.toString()})()`);
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(1300);
    await p.screenshot({ path: `ansichten/v2-${g.n}-${name}.png` });
  }
  const ueberlauf = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log(g.n, "ueberlaufX:", ueberlauf, "fehler:", JSON.stringify(fehler));

  if (g.mobil) {
    await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(500);
    await p.click(".menue-knopf");
    await p.waitForTimeout(1100);
    await p.screenshot({ path: `ansichten/v2-handy-menue.png` });
  }
  await p.close();
}
await b.close();
