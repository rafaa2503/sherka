import sharp from "sharp";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/* Desktop-Aufnahmen auf ein einheitliches 16:10 legen und mit der
   Grundfarbe auffuellen, damit nichts beschnitten wird und das Raster
   trotzdem gleichmaessig bleibt.

   Direkt ueberschreiben statt loeschen und umbenennen: der Dev-Server
   haelt die Dateien offen, unlink scheitert dann mit EBUSY. */

const ORDNER = "public/shots";
const BREITE = 1240;
const HOEHE = Math.round((BREITE * 10) / 16);

const dateien = (await readdir(ORDNER)).filter((f) => f.endsWith(".webp") && !f.includes("-mobile"));
const bericht = [];

for (const datei of dateien) {
  const p = path.join(ORDNER, datei);
  const roh = await readFile(p);
  const vorher = await sharp(roh).metadata();
  if (vorher.height === HOEHE) { bericht.push({ datei, status: "schon passend" }); continue; }

  const neu = await sharp(roh)
    .resize({ width: BREITE, height: HOEHE, fit: "contain", background: { r: 20, g: 20, b: 23 } })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  await writeFile(p, neu);
  bericht.push({ datei, vorher: `${vorher.width}x${vorher.height}`, nachher: `${BREITE}x${HOEHE}`, kb: Math.round(neu.length / 1024) });
}
console.table(bericht);
