import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const modus of ["dark", "light"]) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, colorScheme: modus });
  await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
  await p.waitForTimeout(2800);
  const r = await p.evaluate(() => {
    const bahn = document.querySelector(".hero-bahn");
    const kacheln = [...bahn.children];
    return {
      kachelnGesamt: kacheln.length,
      sichtbar: kacheln.filter(k => getComputedStyle(k).display !== "none").length,
      seitlichScrollbar: bahn.scrollWidth > bahn.clientWidth + 2,
      kachelBreite: Math.round(kacheln[0].getBoundingClientRect().width),
      seitenUeberlauf: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });
  console.log(modus, JSON.stringify(r));
  await p.screenshot({ path: `ansichten/handy-${modus}.png` });
  await p.close();
}
await b.close();
