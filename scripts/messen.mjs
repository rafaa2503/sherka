/* Misst die Referenzseiten über die PageSpeed-Insights-API von Google
   (simuliertes Mittelklasse-Handy, Labormessung) und schreibt Ergebnis und
   Datum nach src/data/messungen.json. Keine Ersatzwerte: schlägt eine
   Messung fehl, fehlt der Eintrag und die Seite zeigt die Zeile nicht. */
import { writeFile } from "node:fs/promises";
const seiten = ["bledi-bienne.ch", "bern-zahnarzt-team.ch", "kamil-energy.ch", "takabul.ch", "teemarclub.com"];
const key = process.env.PSI_KEY ? `&key=${process.env.PSI_KEY}` : "";
const ergebnis = {};
for (const s of seiten) {
  const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent("https://" + s)}&strategy=mobile&category=performance${key}`;
  try {
    const r = await fetch(url);
    const j = await r.json();
    if (!r.ok) { console.log(s, "FEHLER", r.status, j.error?.message?.slice(0, 90)); continue; }
    const lcp = j.lighthouseResult.audits["largest-contentful-paint"].numericValue;
    const score = Math.round(j.lighthouseResult.categories.performance.score * 100);
    ergebnis[s] = { lcpSekunden: Math.round(lcp / 100) / 10, score, datum: new Date().toISOString().slice(0, 10), quelle: "PageSpeed Insights, mobil, Labor" };
    console.log(s, ergebnis[s]);
  } catch (e) { console.log(s, "FEHLER", e.message); }
}
await writeFile("src/data/messungen.json", JSON.stringify(ergebnis, null, 2) + "\n");
