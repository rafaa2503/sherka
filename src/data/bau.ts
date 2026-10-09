/* Inhalt der Bau-Sequenz. Ein erfundenes Beispiel (Coiffeursalon "Lumen"),
   ausdruecklich als Beispiel gekennzeichnet, kein Kundenprojekt. Der Code
   ist so, wie er in einer echten Seite stuende, gekuerzt auf das Wesentliche. */

export type CodeBlock = { sprache: "html" | "css" | "ts"; datei: string; zeilen: string[] };

export const code: CodeBlock[] = [
  {
    sprache: "html",
    datei: "index.html",
    zeilen: [
      "<header>",
      '  <a href="/" class="logo">Salon Lumen</a>',
      '  <nav aria-label="Hauptmenü">…</nav>',
      "</header>",
      "<main>",
      "  <h1>Termin buchen, ohne anzurufen.</h1>",
      "  <p>Wählen Sie eine Zeit …</p>",
      '  <ul class="zeiten">…</ul>',
      '  <button type="submit">Termin anfragen</button>',
      "</main>",
    ],
  },
  {
    sprache: "css",
    datei: "gestaltung.css",
    zeilen: [
      ":root {",
      "  --tinte: #14161A;",
      "  --akzent: oklch(0.62 0.12 190);",
      "  --radius: 14px;",
      "}",
      "h1 {",
      "  font-size: clamp(2rem, 5vw, 4rem);",
      "  letter-spacing: -0.03em;",
      "}",
      ".zeit[aria-pressed='true'] {",
      "  background: var(--akzent);",
      "}",
    ],
  },
  {
    sprache: "ts",
    datei: "anfrage.ts",
    zeilen: [
      'form.addEventListener("submit", async (e) => {',
      "  e.preventDefault();",
      "  if (!istGueltig(daten)) return zeigeFehler();",
      "",
      "  const r = await fetch(ZIEL, {",
      '    method: "POST",',
      "    body: daten,",
      "  });",
      "  r.ok ? zeigeErfolg() : zeigeFehler();",
      "});",
    ],
  },
  {
    sprache: "html",
    datei: "head.html",
    zeilen: [
      '<html lang="de-CH">',
      '<link rel="alternate" hreflang="fr-CH"',
      '      href="/fr/">',
      '<script type="application/ld+json">',
      "{",
      '  "@type": "HairSalon",',
      '  "name": "Salon Lumen",',
      '  "openingHours": "Tu-Fr 09:00-18:00"',
      "}",
      "</script>",
    ],
  },
];

export const vorschau = {
  name: "Salon Lumen",
  links: { de: ["Leistungen", "Preise", "Kontakt"], fr: ["Prestations", "Tarifs", "Contact"] },
  titel: { de: "Termin buchen, ohne anzurufen.", fr: "Réserver, sans téléphoner." },
  text: {
    de: "Wählen Sie eine Zeit. Wir bestätigen per E-Mail.",
    fr: "Choisissez un horaire. Nous confirmons par e-mail.",
  },
  zeiten: ["Di 10:00", "Di 14:30", "Mi 09:00"],
  knopf: { de: "Termin anfragen", fr: "Demander un rendez-vous" },
  erfolg: { de: "Anfrage gesendet", fr: "Demande envoyée" },
};

/* Minimale Faerbung in einem Durchgang, damit keine Regel in bereits
   gesetzte Markierungen greift. Kein Parser. */
const MUSTER: Record<CodeBlock["sprache"], RegExp> = {
  ts: /("[^"]*")|(\b(?:const|await|async|return|if)\b)/g,
  css: /(#[0-9A-Fa-f]{3,8}|oklch\([^)]*\))|(--[\w-]+)/g,
  html: /("[^"]*")|(&lt;\/?[a-zA-Z0-9]+)/g,
};
const KLASSE: Record<CodeBlock["sprache"], [string, string]> = {
  ts: ["s", "k"],
  css: ["s", "v"],
  html: ["s", "k"],
};

export function faerbe(zeile: string, sprache: CodeBlock["sprache"]): string {
  const esc = zeile.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const [k1, k2] = KLASSE[sprache];
  return esc.replace(MUSTER[sprache], (_m, a?: string, b?: string) =>
    a ? `<i class="c-${k1}">${a}</i>` : `<i class="c-${k2}">${b}</i>`,
  );
}
