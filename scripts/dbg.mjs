import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
await p.waitForTimeout(2600);
const r = await p.evaluate(async () => {
  const l = document.querySelector(".laeufer");
  let saetze = 0;
  const obs = new MutationObserver(() => saetze++);
  obs.observe(l, { attributes: true, attributeFilter: ["data-laeuft"] });
  const start = l.getBoundingClientRect().left;
  for (let i = 0; i < 10; i++) { window.scrollBy(0, 120); await new Promise(r => setTimeout(r, 60)); }
  const ende = l.getBoundingClientRect().left;
  obs.disconnect();
  return { attributAenderungen: saetze, xVorher: Math.round(start), xNachher: Math.round(ende), reduziert: matchMedia("(prefers-reduced-motion: reduce)").matches };
});
console.log(JSON.stringify(r));
await b.close();
