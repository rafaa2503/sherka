import { chromium } from "playwright";
import sharp from "sharp";
/* Nimmt die vier Referenzseiten frisch auf, 1240x775, ohne Rand.
   Aufruf: node scripts/aufnahmen.mjs */
const seiten = ["bledi-bienne.ch", "bern-zahnarzt-team.ch", "kamil-energy.ch", "takabul.ch"];
const b = await chromium.launch();
for (const s of seiten) {
  const p = await b.newPage({ viewport: { width: 1240, height: 775 }, deviceScaleFactor: 1 });
  try {
    await p.goto(`https://${s}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await p.waitForTimeout(4000);
    const png = await p.screenshot();
    await sharp(png).webp({ quality: 82, effort: 6 }).toFile(`public/shots/${s}.webp`);
    console.log("ok", s);
  } catch (e) { console.log("FEHLER", s, e.message.slice(0, 80)); }
  await p.close();
}
await b.close();
