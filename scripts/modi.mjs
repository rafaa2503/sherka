import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const modus of ["dark", "light"]) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: modus });
  const fehler = [];
  p.on("pageerror", (e) => fehler.push(e.message));
  await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
  await p.waitForTimeout(4200);
  const info = await p.evaluate(() => {
    const h = document.querySelector(".hero-satz");
    return {
      grund: getComputedStyle(document.body).backgroundColor,
      satz: h.innerText.replace(/\s+/g, " ").trim(),
      serife: getComputedStyle(h).fontFamily.split(",")[0],
      groesse: getComputedStyle(h).fontSize,
      gewicht: getComputedStyle(h).fontWeight,
      navPunkte: [...document.querySelectorAll(".nav-links a")].map(a => a.textContent),
      bilderImHero: document.querySelectorAll(".hero img").length,
    };
  });
  console.log(modus, JSON.stringify(info), fehler.length ? "FEHLER " + fehler[0] : "");
  await p.screenshot({ path: `ansichten/hero-${modus}.png` });
  await p.close();
}
await b.close();
