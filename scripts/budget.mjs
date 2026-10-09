import { readFile, readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import path from "node:path";

/* Budgetprüfung nach dem Build. Bricht mit Exit-Code 1 ab, wenn etwas
   überschritten ist. So geht ein zu schwerer Build gar nicht erst live.

   Grenzen (Plan V2):
     Einstiegs-JS (Entry plus statische Imports)  max. 30 KB gzip
     JS gesamt                                    max. 60 KB gzip
     CSS gesamt                                   max. 15 KB gzip
     HTML pro Sprache                             max. 30 KB gzip
     Schriften beim ersten Laden (latin)          max. 75 KB
     Bilder der Referenzen                        max. 80 KB je Datei
     Fremde Hosts in Skripten, Styles, Bildern    0
   Dazu: h1 als Text im HTML, Sprache, hreflang, CSP-Hash passt. */

const DIST = "dist";
const KB = 1024;
const fehler = [];
const zeilen = [];

const gz = (buf) => gzipSync(buf, { level: 9 }).length;
const lies = (p) => readFile(path.join(DIST, p));
const kb = (n) => `${(n / KB).toFixed(1)} KB`;

function pruefe(name, wert, grenze, einheit = kb) {
  const ok = wert <= grenze;
  zeilen.push(`${ok ? "ok  " : "ZU  "} ${name.padEnd(34)} ${einheit(wert).padStart(9)}  (max. ${einheit(grenze)})`);
  if (!ok) fehler.push(`${name}: ${einheit(wert)} statt max. ${einheit(grenze)}`);
}

// ---------- JavaScript ----------
const manifest = JSON.parse(await lies(".vite/manifest.json"));
const entry = Object.values(manifest).find((m) => m.isEntry);
const gesehen = new Set();
let einstieg = 0;
async function sammle(m) {
  if (!m || gesehen.has(m.file)) return;
  gesehen.add(m.file);
  einstieg += gz(await lies(m.file));
  for (const imp of m.imports ?? []) await sammle(manifest[imp]);
}
await sammle(entry);
pruefe("Einstiegs-JS (gzip)", einstieg, 30 * KB);

const assets = await readdir(path.join(DIST, "assets"));
let jsGesamt = 0;
let cssGesamt = 0;
for (const f of assets) {
  if (f.endsWith(".js")) jsGesamt += gz(await lies(`assets/${f}`));
  if (f.endsWith(".css")) cssGesamt += gz(await lies(`assets/${f}`));
}
pruefe("JS gesamt (gzip)", jsGesamt, 60 * KB);
pruefe("CSS gesamt (gzip)", cssGesamt, 15 * KB);

// ---------- Schriften ----------
let schrift = 0;
for (const f of assets) {
  if (/^inter-latin-wght-normal.*.woff2$/.test(f)) schrift += (await stat(path.join(DIST, "assets", f))).size;
}
pruefe("Schriften erstes Laden", schrift, 75 * KB);

// ---------- Bilder ----------
const shots = await readdir(path.join(DIST, "shots")).catch(() => []);
let groesstes = 0;
let groesstesName = "";
for (const f of shots) {
  const s = (await stat(path.join(DIST, "shots", f))).size;
  if (s > groesstes) [groesstes, groesstesName] = [s, f];
}
if (shots.length) pruefe(`Grösstes Bild (${groesstesName})`, groesstes, 80 * KB);

// ---------- HTML ----------
const seiten = { de: "index.html", fr: "fr/index.html" };
const vorlage = (await lies("index.html")).toString();
for (const [sprache, datei] of Object.entries(seiten)) {
  const html = (await lies(datei)).toString();
  pruefe(`HTML ${sprache} (gzip)`, gz(Buffer.from(html)), 30 * KB);

  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1Text = h1 ? h1[1].replace(/<[^>]+>/g, "").trim() : "";
  if (!h1Text) fehler.push(`${datei}: kein h1 mit Text im vorgerenderten HTML`);
  else zeilen.push(`ok   h1 ${sprache}: ${h1Text.replace(/\s+/g, " ")}`);

  const lang = sprache === "fr" ? "fr-CH" : "de-CH";
  if (!html.includes(`<html lang="${lang}">`)) fehler.push(`${datei}: <html lang="${lang}"> fehlt`);
  for (const h of ["de-CH", "fr-CH", "x-default"]) {
    if (!html.includes(`hreflang="${h}"`)) fehler.push(`${datei}: hreflang ${h} fehlt`);
  }

  // Fremde Hosts in allem, was der Browser beim Laden holt.
  const holt = [...html.matchAll(/<(script|link|img|source|video|iframe)\b[^>]*?\b(src|href)="([^"]+)"/g)]
    .filter((m) => !(m[1] === "link" && /rel="(canonical|alternate)"/.test(m[0])))
    .map((m) => m[3])
    .filter((u) => /^https?:\/\//.test(u) && !u.startsWith("https://sherka.ch"));
  if (holt.length) fehler.push(`${datei}: lädt von fremden Hosts: ${holt.join(", ")}`);
}

// ---------- CSP ----------
const ht = (await lies(".htaccess")).toString();
for (const m of vorlage.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
  const h = createHash("sha256").update(m[1]).digest("base64");
  if (!ht.includes(`'sha256-${h}'`)) fehler.push("CSP-Hash des Inline-Skripts fehlt in .htaccess");
}

console.log("Budget Sherka V2\n");
for (const z of zeilen) console.log("  " + z);
if (fehler.length) {
  console.log("\nNICHT IM BUDGET:");
  for (const f of fehler) console.log("  x " + f);
  process.exit(1);
}
console.log("\nAlles im Budget.");
