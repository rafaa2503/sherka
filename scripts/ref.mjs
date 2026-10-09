import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const url = process.argv[2];
const name = process.argv[3] ?? "ref";
await mkdir("ansichten/ref", { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(4000);
const h = await p.evaluate(() => document.documentElement.scrollHeight);
console.log("hoehe", h);
const n = Math.min(9, Math.ceil(h / 700));
for (let i = 0; i < n; i++) {
  await p.evaluate((y) => window.scrollTo(0, y), i * 700);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `ansichten/ref/${name}-${i}.png` });
}
console.log(await p.evaluate(() => document.body.innerText.slice(0, 2500)));
await b.close();
