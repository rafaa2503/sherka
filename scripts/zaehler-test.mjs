import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:5188", { waitUntil: "networkidle" });
const vorher = await p.evaluate(() => [...document.querySelectorAll(".zahl-wert")].map(e => e.textContent));
await p.evaluate(() => document.getElementById("zahlen").scrollIntoView({ block: "center" }));
const proben = [];
for (let i = 0; i < 8; i++) {
  await p.waitForTimeout(140);
  proben.push(await p.evaluate(() => [...document.querySelectorAll(".zahl-wert")].map(e => e.textContent).join(" | ")));
}
console.log("vor dem Scrollen:", JSON.stringify(vorher));
proben.forEach((s, i) => console.log(`${(i + 1) * 140}ms:`, s));
await b.close();
