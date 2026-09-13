import sharp from "sharp";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/* Bereitet das Portraet auf.

   Ablauf: Datei nach `roh/` legen (jpg, png, heic oder webp), dann
   `npm run portraet`. Alles Weitere passiert hier.

   Was gemacht wird:
   - Zuschnitt auf 4:5, weil der Rahmen auf der Seite dieses Verhaeltnis
     hat. Der Schwerpunkt liegt oben, damit der Kopf nicht abgeschnitten
     wird, wenn das Bild hochformatig ist.
   - Leichte Tonwertkorrektur: das Ausgangsbild ist warm und kontrastarm
     im Schatten. Die Seite ist kuehl, also wird die Waerme etwas
     zurueckgenommen und die Tiefen angehoben, sonst saeuft die dunkle
     Seite des Gesichts vor dunklem Grund ab.
   - Zwei Groessen fuer srcset, dazu ein winziges unscharfes Vorschaubild
     als Data-URI, damit beim Laden kein Loch entsteht. */

const QUELLE = "roh";
const ZIEL = "public/portraet";
const GROESSEN = [560, 1120];

await mkdir(ZIEL, { recursive: true });
await mkdir(QUELLE, { recursive: true });

const dateien = (await readdir(QUELLE)).filter((f) => /\.(jpe?g|png|webp|heic|avif)$/i.test(f));

if (dateien.length === 0) {
  console.log(`Nichts in ${QUELLE}/ gefunden.`);
  console.log("Leg das Portraet dort ab und starte nochmal: npm run portraet");
  process.exit(0);
}

const quelle = path.join(QUELLE, dateien[0]);
const roh = await readFile(quelle);
const meta = await sharp(roh).metadata();

const bericht = [];

for (const breite of GROESSEN) {
  const hoehe = Math.round((breite * 5) / 4);
  const daten = await sharp(roh)
    .rotate() // EXIF-Ausrichtung anwenden, sonst liegt das Handybild quer
    .resize({ width: breite, height: hoehe, fit: "cover", position: sharp.strategy.attention })
    .modulate({ saturation: 0.92, brightness: 1.03 })
    .linear(1.06, -8) // Tiefen anheben, Kontrast leicht straffen
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 84, effort: 6 })
    .toBuffer();

  const name = `raffa-${breite}.webp`;
  await writeFile(path.join(ZIEL, name), daten);
  bericht.push({ datei: name, masse: `${breite}x${hoehe}`, kb: Math.round(daten.length / 1024) });
}

// Unscharfes Vorschaubild als Data-URI, wird direkt ins Markup gelegt.
const winzig = await sharp(roh)
  .rotate()
  .resize({ width: 20, height: 25, fit: "cover", position: sharp.strategy.attention })
  .blur(1.2)
  .webp({ quality: 40 })
  .toBuffer();

await writeFile(
  path.join(ZIEL, "vorschau.txt"),
  `data:image/webp;base64,${winzig.toString("base64")}`,
);

console.log(`Quelle: ${dateien[0]} (${meta.width}x${meta.height})`);
console.table(bericht);
console.log(`Vorschau-URI in ${ZIEL}/vorschau.txt`);
