import sharp from "sharp";
import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

/* Wandelt die Roh-Screenshots aus public/ in optimierte WebP um.
   Aufruf: npm run bilder
   Die Rohdateien bleiben liegen und werden am Ende aus public/ entfernt,
   damit nicht 2 MB PNG mit ins Deployment wandern. */

const QUELLE = "public";
const ZIEL = "public/shots";

// Rohname -> Zielname. Zielname entspricht der Domain in data/projekte.ts.
const ZUORDNUNG = {
  "bledi-bienne.ch.png": "bledi-bienne.ch",
  "bledi-bienne.ch-mobile.png": "bledi-bienne.ch-mobile",
  "bern-zahnarzt-team.ch.png": "bern-zahnarzt-team.ch",
  "bern-zahnarzt-team.ch-mobile.png": "bern-zahnarzt-team.ch-mobile",
  "kamil.png": "kamil-energy.ch",
  "kamil-mobile.png": "kamil-energy.ch-mobile",
  "takabul.ch.png": "takabul.ch",
  "takabul.ch-mobile.png": "takabul.ch-mobile",
};

// Breite in der Darstellung ist maximal 620 CSS-Pixel, also reichen
// 1240 fuer scharfe Kanten auf Retina. Alles darueber ist verschenkt.
const BREITE_DESKTOP = 1240;
const BREITE_MOBIL = 560;

await mkdir(ZIEL, { recursive: true });

const dateien = await readdir(QUELLE);
const verarbeitet = [];

for (const datei of dateien) {
  const ziel = ZUORDNUNG[datei];
  if (!ziel) continue;

  const quellPfad = path.join(QUELLE, datei);
  const istMobil = ziel.endsWith("-mobile");
  const breite = istMobil ? BREITE_MOBIL : BREITE_DESKTOP;

  const bild = sharp(quellPfad);
  const meta = await bild.metadata();

  const zielPfad = path.join(ZIEL, `${ziel}.webp`);
  const info = await bild
    .resize({ width: Math.min(breite, meta.width ?? breite), withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(zielPfad);

  verarbeitet.push({
    datei: `${ziel}.webp`,
    vorher: `${Math.round((meta.size ?? 0) / 1024)} KB`,
    nachher: `${Math.round(info.size / 1024)} KB`,
    masse: `${info.width}x${info.height}`,
  });
}

console.table(verarbeitet);

// Rohdateien aus public/ raeumen, damit sie nicht mit ausgeliefert werden.
for (const datei of Object.keys(ZUORDNUNG)) {
  await rm(path.join(QUELLE, datei), { force: true });
}
console.log("Rohdateien aus public/ entfernt.");
