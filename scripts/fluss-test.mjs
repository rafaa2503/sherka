import { chromium } from "playwright";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "dark" });
await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
await p.evaluate(async () => {
  const s = window.innerHeight * 0.7;
  for (let y = 0; y < document.body.scrollHeight; y += s) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 220)); }
});
const el = await p.$("#arbeiten");
await el.scrollIntoViewIfNeeded();
// Zeiger auf das erste Bild, damit die Verzerrung sichtbar wird.
const box = await (await p.$(".projekt-bild")).boundingBox();
await p.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.45);
await p.waitForTimeout(900);
await el.screenshot({ path: "ansichten/x-fluss.png" });
const info = await p.evaluate(() => ({
  canvas: document.querySelectorAll(".fluss canvas").length,
  flussAn: document.querySelectorAll(".fluss-an").length,
}));
console.log(JSON.stringify(info));
await b.close();
