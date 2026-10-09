import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
/* Prueft Version 1: Schrift, Ueberlauf, Sprachwechsel, Thema, Aufnahmen. */
const URL = process.env.URL ?? "http://localhost:5188";
await mkdir("ansichten", { recursive: true });
const b = await chromium.launch();
for (const [name, vp, mobil] of [["desktop", { width: 1440, height: 900 }, false], ["handy", { width: 375, height: 700 }, true]]) {
  const p = await b.newPage({ viewport: vp, isMobile: mobil, hasTouch: mobil, deviceScaleFactor: 1 });
  const fehler = [];
  p.on("console", (m) => m.type() === "error" && fehler.push(m.text()));
  p.on("pageerror", (e) => fehler.push("PAGEERROR " + e.message));
  await p.goto(URL, { waitUntil: "networkidle" });
  const erster = await p.evaluate(() => {
    const cta = document.querySelector(".hero-knoepfe .knopf-voll").getBoundingClientRect();
    return { ctaUnten: Math.round(cta.bottom), vh: innerHeight, ueberlaufX: document.documentElement.scrollWidth > innerWidth, thema: document.documentElement.dataset.theme, h1: document.querySelector("h1").textContent };
  });
  console.log(name, "anfang", JSON.stringify(erster));
  await p.screenshot({ path: `ansichten/v1-${name}-hell-oben.png` });
  await p.screenshot({ path: `ansichten/v1-${name}-hell-ganz.png`, fullPage: true });
  // Franzoesisch
  await p.click('button[lang="fr"]');
  await p.waitForTimeout(300);
  console.log(name, "fr h1:", await p.textContent("h1"), "| h2s:", (await p.$$eval("h2", (e) => e.map((x) => x.textContent))).join(" / "));
  // Dunkel
  await p.click(".thema-knopf");
  await p.waitForTimeout(300);
  console.log(name, "thema:", await p.evaluate(() => document.documentElement.dataset.theme));
  await p.screenshot({ path: `ansichten/v1-${name}-dunkel-fr-ganz.png`, fullPage: true });
  const ueberlauf = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log(name, "ueberlaufX nach FR/dunkel:", ueberlauf, "fehler:", JSON.stringify(fehler));
  await p.close();
}
await b.close();
