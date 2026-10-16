import { chromium } from "playwright";
/* Sucht in allen Überschriften Wörter, die über zwei Zeilen umbrechen. */
const BASIS = process.env.BASIS || "http://localhost:4173";
const b = await chromium.launch();
let fehler = 0;
for (const pfad of ["/", "/fr/"]) for (const w of [320, 360, 390, 430, 600, 768, 900, 940, 1024, 1100, 1280, 1366, 1600]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(BASIS + pfad); await p.waitForTimeout(400);
  const kaputt = await p.evaluate(() => {
    const out = [];
    for (const h of document.querySelectorAll("h1, h2, h3")) {
      const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
      for (let n; (n = walker.nextNode()); ) {
        const re = /\S+/g; let m;
        while ((m = re.exec(n.data))) {
          const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
          const tops = new Set([...r.getClientRects()].map((x) => Math.round(x.top)));
          if (tops.size > 1) out.push(`${h.id || h.tagName}: "${m[0]}"`);
        }
      }
    }
    return out;
  });
  if (kaputt.length) { fehler += kaputt.length; console.log(pfad, w, kaputt.join(", ")); }
  await p.close();
}
console.log(fehler ? `${fehler} getrennte Wörter` : "Kein Wort getrennt");
await b.close();
