# Sherka

Studio-Website. Vite + React + TypeScript, statischer Build, kein Backend.

## Vor dem ersten Start

```bash
npm install
cp .env.example .env.local
```

Dann `.env.local` ausfüllen. Beide Werte sind Pflicht, sonst fehlen zwei Kernfunktionen:

| Variable | Wofür | Ohne den Wert passiert |
|---|---|---|
| `VITE_PSI_KEY` | Tempocheck | Google antwortet mit 429, die Messung schlägt immer fehl |
| `VITE_FORMSPREE` | Anfrageformular | Formular zeigt Erfolg, verschickt aber nichts |

Die Anleitung für den Google-Schlüssel steht in `.env.example`. Kostenlos, ohne Kreditkarte, dauert etwa fünf Minuten.

## Entwickeln

```bash
npm run dev
```

## Bauen

```bash
npm run build
```

## Aufbau

```
src/
  styles/tokens.css      alle Farben und Masse, nirgends sonst Hex-Werte
  styles/base.css        Grundlayout, Schriften, drei Layoutmuster
  i18n/                  de.ts und fr.ts, eigener Provider ohne Bibliothek
  lib/psi.ts             PageSpeed Insights, Schwellen und Fehlerfaelle
  data/projekte.ts       die vier Referenzen, ein Objekt pro Projekt
  components/            Nav, Tempocheck, Anfrage, Zahl
  App.tsx                alle Sektionen
public/
  impressum.html         statisch, ohne JavaScript
  datenschutz.html       statisch, ohne JavaScript
```

## Bewusste Entscheidungen

**Kein GSAP, kein Lenis.** Nach dem Wegfall von Pin und Scrub blieb ein Zähler übrig. Rund 110 KB dafür zu laden wäre auf einer Seite, die mit Ladezeit argumentiert, nicht zu rechtfertigen. Die einzige Animation mit Erzählfunktion steht in `components/Zahl.tsx` und benutzt `requestAnimationFrame`.

**Kein react-hook-form, kein zod.** Rund 25 KB für fünf Felder. Die Prüfung steht in `components/Anfrage.tsx` und ist zwanzig Zeilen lang.

**`preact/compat` statt React.** Alias in `vite.config.ts`, identischer Code, rund 40 KB weniger. Damit liegt das JS-Bundle bei etwa 20 KB gzip statt 72 KB.

**`font-stretch`, nicht `font-variation-settings`.** Archivo wird über `wdth.css` geladen, nicht über `index.css`. `index.css` liefert nur die Gewichtsachse, dann bliebe das ganze Breitensystem der Typografie wirkungslos.

**Farbe nur für Daten.** Die Seite hat keine Markenfarbe. Grün, Gelb und Rot erscheinen ausschliesslich im Tempocheck-Ergebnis. Jedes Messergebnis trägt zusätzlich ein Wort, damit Farbe nie die einzige Information ist.

## Sicherheit

Kein Backend, keine Secrets im Code. Der PSI-Schlüssel darf öffentlich sein, solange er in der Google Cloud Console per Verweis-URL auf die eigene Domain beschränkt ist. Die Formularprüfung läuft im Browser und ist umgehbar. Das ist bei einem Kontaktformular vertretbar, weil der schlimmste Fall Spam ist. Deshalb: keine Dateiuploads, keine sensiblen Felder.

Sicherheits-Header und Content-Security-Policy stehen in `vercel.json`.

## Offen vor dem Livegang

- [ ] `VITE_PSI_KEY` und `VITE_FORMSPREE` setzen
- [ ] Bildschirmfotos der vier Referenzen nach `public/shots/`, dann `bild` in `src/data/projekte.ts` setzen
- [ ] Porträtfoto für "Wer das baut"
- [ ] Impressum und Datenschutz vervollständigen, die Hinweisblöcke löschen
- [ ] Kundenstimmen von der Zahnarztpraxis und von Bledi
- [ ] Open-Graph-Bild nach `public/og.png` (1200x630)
- [ ] Domain `sherka.ch` verbinden
- [ ] Lighthouse mobil prüfen
