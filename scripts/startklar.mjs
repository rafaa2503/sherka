import { readFile, access } from "node:fs/promises";
import { lookup } from "node:dns/promises";

/* Startprüfung vor dem Livegang von V2. Scheitert, solange Platzhalter,
   verbotene Wörter oder fehlende Voraussetzungen da sind. Eine erfundene
   Angabe oder ein halbes Impressum sind keine Schönheitsfehler.

   Aufruf: npm run build && npm run startklar */

const fehler = [];
const hinweise = [];
const lies = (p) => readFile(p, "utf8").catch(() => "");
const gibtEs = (p) => access(p).then(() => true).catch(() => false);

// 1. Rechtsseiten ohne Platzhalter
const recht = await lies("src/inhalt/recht.ts");
const luecken = [...new Set(recht.match(/\[[^\]\n]{2,90}\]/g) ?? [])];
if (luecken.length) fehler.push(`Rechtsseiten: ${luecken.length} Platzhalter offen, z. B. ${luecken.slice(0, 3).join(", ")}`);

// 2. Verbotene Wörter im sichtbaren Text der fertigen Seiten
const seiten = ["dist/index.html", "dist/fr/index.html", "dist/impressum/index.html", "dist/datenschutz/index.html", "dist/fr/mentions-legales/index.html", "dist/fr/protection-des-donnees/index.html"];
const VERBOTEN = [
  [/\bBern\b(?!-)/, "Bern (nur Ort Biel/Bienne)"],
  [/\bBerne\b/, "Berne"],
  [/Seeland/, "Seeland"],
  [/\bSBB\b|\bCFF\b/, "SBB"],
  [/gmail/i, "Gmail-Adresse"],
  [/[—–]/, "Gedankenstrich"],
  [/ß/, "ß statt ss"],
  [/Fixpreis|Preis|Zusatzkosten|Tarif|\bprix\b|\bfrais\b|CHF/i, "Preisthema"],
];
for (const s of seiten) {
  const html = await lies(s);
  if (!html) {
    fehler.push(`${s} fehlt. Zuerst npm run build.`);
    continue;
  }
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ");
  for (const [muster, name] of VERBOTEN) {
    const m = text.match(muster);
    if (m) fehler.push(`${s}: ${name} gefunden ("${text.slice(Math.max(0, m.index - 30), m.index + 30).replace(/\s+/g, " ").trim()}")`);
  }
}

// 3. Teilen-Bilder
for (const og of ["public/og-de.png", "public/og-fr.png"]) {
  if (!(await gibtEs(og))) fehler.push(`${og} fehlt (node scripts/og.mjs).`);
}

// 4. Domain und Mail
try {
  await lookup("sherka.ch");
} catch {
  fehler.push("sherka.ch löst nicht auf. Domain registrieren und DNS einrichten, sonst kommen keine Mails an info@sherka.ch.");
}

// 5. Porträt
const portraet = await lies("src/data/portraet.ts");
if (/PORTRAET_DA\s*=\s*false/.test(portraet)) hinweise.push("Kein Porträt: Über mich erscheint ohne Bild (erlaubt, aber schwächer).");

// 6. Aussagen, die Raffa bestätigen muss
const projekte = await lies("src/data/projekte.ts");
const block = projekte.match(/BESTAETIGEN = \[([\s\S]*?)\];/);
if (block) for (const m of block[1].matchAll(/"([^"]+)"/g)) hinweise.push(`Bestätigen: ${m[1]}`);

// 7. Französisch abgenommen?
const fr = await lies("src/inhalt/fr.ts");
if (!/ROMANDE_ABGENOMMEN/.test(fr)) fehler.push("Französisch noch nicht von einer Romande abgenommen (danach in fr.ts den Kommentar ROMANDE_ABGENOMMEN mit Datum setzen).");

if (hinweise.length) {
  console.log("Hinweise:");
  for (const h of hinweise) console.log("  - " + h);
  console.log("");
}
if (fehler.length) {
  console.log("NOCH NICHT STARTKLAR:");
  for (const f of fehler) console.log("  x " + f);
  process.exit(1);
}
console.log("Startklar.");
