import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 6 });
await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
await p.waitForTimeout(2600);
await p.mouse.move(700, 450);
for (let i = 0; i < 8; i++) { await p.mouse.wheel(0, 300); await p.waitForTimeout(40); }
// Eng auf die Figur zoomen.
const box = await p.evaluate(() => { const r = document.querySelector(".laeufer").getBoundingClientRect(); return { x: Math.max(0, r.x - 14), y: r.y - 10, w: 72, h: 62 }; });
await p.screenshot({ path: "ansichten/x-laeufer.png", clip: { x: box.x, y: box.y, width: box.w, height: box.h } });
await b.close();
