import { chromium } from "playwright";
const b = await chromium.launch();
for (const [name, vp, mobil] of [["desktop", { width: 1440, height: 900 }, false], ["handy", { width: 390, height: 844 }, true]]) {
  const p = await b.newPage({ viewport: vp, isMobile: mobil, hasTouch: mobil });
  await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
  await p.evaluate(async () => {
    const s = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += s) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 260)); }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 1600));
  });
  const befund = await p.evaluate(() => {
    const schlimm = [];
    for (const el of document.querySelectorAll("main *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cs = getComputedStyle(el);
      const unsichtbar = parseFloat(cs.opacity) < 0.05;
      const beschnitten = cs.clipPath !== "none" && /inset\((?:9[0-9]|100)/.test(cs.clipPath);
      const verschoben = cs.transform !== "none" && Math.abs(new DOMMatrix(cs.transform).m42) > 40;
      if (unsichtbar || beschnitten || verschoben) {
        schlimm.push((el.tagName + "." + (typeof el.className === "string" ? el.className.split(" ")[0] : "")).slice(0, 40)
          + (unsichtbar ? " opacity0" : "") + (beschnitten ? " clipped" : "") + (verschoben ? " verschoben" : ""));
      }
    }
    return { haengengeblieben: [...new Set(schlimm)].slice(0, 12), anzahl: schlimm.length };
  });
  console.log(name, JSON.stringify(befund));
  await p.close();
}
await b.close();
