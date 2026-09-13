import { readFile, access } from "node:fs/promises";

/* Startprüfung. Laeuft vor dem Livegang und scheitert, solange noch
   Platzhalter drin sind.

   Der Sinn: eine erfundene Kundenstimme unter echtem Namen oder ein
   halbes Impressum sind keine Schoenheitsfehler. Das eine ist
   irrefuehrende Werbung, das andere in der Schweiz eine Pflichtverletzung.
   Beides darf nicht daran haengen, dass jemand daran denkt.

   Aufruf: npm run startklar */

const fehler = [];
const warnung = [];

const lies = (p) => readFile(p, "utf8").catch(() => "");
const gibtEs = (p) => access(p).then(() => true).catch(() => false);

// 1. Kundenstimmen freigegeben?
for (const sprache of ["de", "fr"]) {
  const inhalt = await lies(`src/i18n/${sprache}.ts`);
  if (/platzhalter:\s*true/.test(inhalt)) {
    fehler.push(`${sprache}.ts: Kundenstimmen stehen noch auf platzhalter: true. Erst freigeben lassen, dann auf false setzen.`);
  }
}

// 2. Rechtsseiten vollstaendig?
for (const [datei, name] of [["public/impressum.html", "Impressum"], ["public/datenschutz.html", "Datenschutz"]]) {
  const inhalt = await lies(datei);
  if (!inhalt) { fehler.push(`${name} fehlt (${datei}).`); continue; }
  if (inhalt.includes("class=\"offen\"")) fehler.push(`${name}: der Hinweisblock steht noch drin, die Seite ist unvollstaendig.`);
  const luecken = inhalt.match(/\[[^\]]{2,60}\]/g);
  if (luecken) fehler.push(`${name}: ${luecken.length} Platzhalter offen, z.B. ${luecken[0]}`);
}

// 3. Formularziel gesetzt?
const env = (await lies(".env.local")) + (await lies(".env"));
if (!/VITE_FORMSPREE=\S+/.test(env)) {
  fehler.push("VITE_FORMSPREE ist leer. Das Formular meldet Erfolg, verschickt aber nichts.");
}

// 4. Portraet vorhanden?
if (!(await gibtEs("public/portraet/raffa-1120.webp"))) {
  warnung.push("Portraet fehlt. Datei nach roh/ legen und npm run portraet ausfuehren.");
}

// 5. Open-Graph-Bild vorhanden?
if (!(await gibtEs("public/og.png"))) {
  warnung.push("og.png fehlt. Ohne das zeigt WhatsApp beim Teilen nur einen grauen Kasten.");
}

if (warnung.length) {
  console.log("Hinweise:");
  warnung.forEach((w) => console.log("  - " + w));
  console.log("");
}

if (fehler.length) {
  console.log("NOCH NICHT STARTKLAR:");
  fehler.forEach((f) => console.log("  x " + f));
  process.exit(1);
}

console.log("Startklar. Alle Pflichtpunkte erfuellt.");
