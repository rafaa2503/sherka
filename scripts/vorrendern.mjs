import { readFile, writeFile, mkdir, readdir, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { pathToFileURL } from "node:url";

/* Vorrendern nach dem Build.

   1. dist/index.html (vom Browser-Build, mit den richtigen Asset-Namen) ist
      die Vorlage.
   2. dist-ssr/entry-server.js rendert jede Seite zu HTML.
   3. Pro Seite werden Sprache, Titel, Beschreibung, kanonische Adresse,
      Sprachvarianten, Open Graph und strukturierte Daten eingesetzt.
   4. Rechtsseiten und 404 bekommen kein JavaScript.
   5. Header (.htaccess für Infomaniak, _headers für Cloudflare Pages) samt
      CSP-Hash des Inline-Skripts, Weiterleitungen, sitemap.xml, robots.txt.

   Aufruf: Teil von npm run build. */

const DIST = "dist";
const DOMAIN = "https://sherka.ch";
const VORSCHAU = process.env.SHERKA_VORSCHAU === "1";

const vorlage = await readFile(path.join(DIST, "index.html"), "utf8");
const server = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Die eine Schrift, die im ersten Bild gebraucht wird, früh laden.
const assets = await readdir(path.join(DIST, "assets"));
const schriftDatei = assets.find((f) => /^inter-latin-wght-normal.*.woff2$/.test(f));

function kopfHtml(k) {
  const zeilen = [
    `<title>${esc(k.titel)}</title>`,
    `<meta name="description" content="${esc(k.beschreibung)}" />`,
  ];
  if (k.robots || VORSCHAU) zeilen.push(`<meta name="robots" content="${VORSCHAU ? "noindex, nofollow" : k.robots}" />`);
  if (!k.pfad.endsWith(".html")) zeilen.push(`<link rel="canonical" href="${DOMAIN}${k.pfad}" />`);
  for (const a of k.alternativen) zeilen.push(`<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`);
  zeilen.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Sherka" />`,
    `<meta property="og:title" content="${esc(k.ogTitel)}" />`,
    `<meta property="og:description" content="${esc(k.beschreibung)}" />`,
    `<meta property="og:url" content="${DOMAIN}${k.pfad}" />`,
    `<meta property="og:image" content="${k.ogBild}" />`,
    `<meta property="og:locale" content="${k.lang.replace("-", "_")}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  );
  // Kein preload: auf Mac und iPhone wird die Systemschrift genutzt, Inter nur
  // als Ersatz auf anderen Systemen. Ein preload würde sie überall laden.
  void schriftDatei;
  if (k.jsonld) zeilen.push(`<script type="application/ld+json">${k.jsonld.replace(/</g, "\\u003c")}</script>`);
  return zeilen.join("\n    ");
}

function seite({ html, kopf }, { mitJs }) {
  let s = vorlage
    .replace(/<html lang="[^"]*">/, `<html lang="${kopf.lang}">`)
    .replace("<!--kopf-->", kopfHtml(kopf))
    .replace("<!--app-->", html);
  if (!mitJs) {
    s = s.replace(/\s*<script type="module"[^>]*><\/script>/g, "").replace(/\s*<link rel="modulepreload"[^>]*>/g, "");
  }
  return s;
}

async function schreibe(pfad, inhalt) {
  const datei = pfad.endsWith(".html") ? path.join(DIST, pfad) : path.join(DIST, pfad, "index.html");
  await mkdir(path.dirname(datei), { recursive: true });
  await writeFile(datei, inhalt);
  return datei;
}

const geschrieben = [];
for (const sprache of ["de", "fr"]) {
  const start = server.renderStart(sprache);
  geschrieben.push(await schreibe(start.kopf.pfad, seite(start, { mitJs: true })));
  for (const art of ["impressum", "datenschutz"]) {
    const r = server.renderRecht(sprache, art);
    geschrieben.push(await schreibe(r.kopf.pfad, seite(r, { mitJs: false })));
  }
}
const nf = server.render404();
geschrieben.push(await schreibe("404.html", seite(nf, { mitJs: false })));

// Alte Rechtsseiten aus V1 entfernen, sie werden weitergeleitet.
for (const alt of ["impressum.html", "datenschutz.html", "recht.css"]) await rm(path.join(DIST, alt), { force: true });

// ---------- Sicherheit ----------

const inline = [...vorlage.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const hashes = inline.map((code) => `'sha256-${createHash("sha256").update(code).digest("base64")}'`);

const REFERENZEN = ["https://bern-zahnarzt-team.ch", "https://kamil-energy.ch", "https://takabul.ch"];
const csp = [
  "default-src 'none'",
  `script-src 'self' ${hashes.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "manifest-src 'self'",
  "connect-src 'self'",
  `frame-src ${REFERENZEN.join(" ")}`,
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Zuerst nur melden, nicht blockieren. Scharf schalten mit SHERKA_CSP_SCHARF=1.
const cspName = process.env.SHERKA_CSP_SCHARF === "1" ? "Content-Security-Policy" : "Content-Security-Policy-Report-Only";

const header = {
  [cspName]: csp,
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  // Kein Cross-Origin-Opener-Policy: Gemessen hielt der Header den Aufbau der
  // Seite online rund zwei Sekunden auf (Prozesswechsel im Browser), und eine
  // reine Infoseite ohne Pop-ups gewinnt damit nichts.
};

const weiterleitungen = [
  ["/impressum.html", "/impressum/"],
  ["/datenschutz.html", "/datenschutz/"],
  ["/index.html", "/"],
  ["/de/", "/"],
  ["/fr", "/fr/"],
];

// Cloudflare Pages (Vorschau)
const cfHeader = ["/*", ...Object.entries(header).map(([k, v]) => `  ${k}: ${v}`)];
if (VORSCHAU) cfHeader.push("  X-Robots-Tag: noindex, nofollow");
cfHeader.push("", "/assets/*", "  Cache-Control: public, max-age=31536000, immutable");
await writeFile(path.join(DIST, "_headers"), cfHeader.join("\n") + "\n");
await writeFile(path.join(DIST, "_redirects"), weiterleitungen.map(([a, b]) => `${a} ${b} 301`).join("\n") + "\n");

// Vercel (Vorschau). Vercel liest vercel.json VOR dem Build, die Datei muss
// also im Repo liegen. Sie wird hier aus derselben Quelle erzeugt; weicht die
// eingecheckte Fassung ab, bricht der Build auf Vercel ab, statt mit alten
// Headern auszuliefern (so entstand in V1 die CSP, die das Theme-Skript sperrte).
const vercelSoll = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  framework: "vite",
  buildCommand: "npm run build",
  outputDirectory: "dist",
  trailingSlash: true,
  redirects: weiterleitungen
    .filter(([a]) => !["/index.html", "/fr"].includes(a))
    .map(([source, destination]) => ({ source, destination, permanent: true })),
  headers: [
    { source: "/(.*)", headers: Object.entries(header).map(([key, value]) => ({ key, value })) },
    { source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  ],
};
// Vercel schreibt die Datei beim Hochladen um (eine Zeile, zusätzliche Felder
// wie name und version). Verglichen wird deshalb der Inhalt unserer Felder.
const vercelIst = JSON.parse(await readFile("vercel.json", "utf8").catch(() => "{}"));
const abweichend = Object.keys(vercelSoll).filter((k) => JSON.stringify(vercelIst[k]) !== JSON.stringify(vercelSoll[k]));
if (abweichend.length) {
  if (process.env.VERCEL) {
    console.error(`vercel.json ist veraltet (${abweichend.join(", ")}). Lokal "npm run build" ausführen und die Datei einchecken.`);
    process.exit(1);
  }
  await writeFile("vercel.json", JSON.stringify(vercelSoll, null, 2) + "\n");
  console.log("vercel.json neu geschrieben (bitte einchecken).");
}
// Auf Vercel gibt es kein PHP: der Formular-Endpunkt würde dort als Textdatei
// ausgeliefert. Er gehört nur auf Infomaniak.
if (process.env.VERCEL) await rm(path.join(DIST, "api"), { recursive: true, force: true });

// Infomaniak (Apache)
const ht = [
  "# Erzeugt von scripts/vorrendern.mjs. Nicht von Hand ändern.",
  "Options -Indexes",
  "ErrorDocument 404 /404.html",
  "",
  "RewriteEngine On",
  "RewriteCond %{HTTPS} off",
  "RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]",
  "RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]",
  "RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]",
  ...weiterleitungen.map(([a, b]) => `RewriteRule ^${a.slice(1).replace(/\./g, "\\.")}$ ${b} [L,R=301]`),
  "",
  "<IfModule mod_headers.c>",
  ...Object.entries(header).map(([k, v]) => `  Header always set ${k} "${v.replace(/"/g, '\\"')}"`),
  '  <FilesMatch "\\.html$">',
  '    Header set Cache-Control "no-cache"',
  "  </FilesMatch>",
  "</IfModule>",
  "",
  '<IfModule mod_expires.c>',
  "  ExpiresActive On",
  '  ExpiresByType font/woff2 "access plus 1 year"',
  "</IfModule>",
  '<If "%{REQUEST_URI} =~ m#^/assets/#">',
  '  Header set Cache-Control "public, max-age=31536000, immutable"',
  "</If>",
];
await writeFile(path.join(DIST, ".htaccess"), ht.join("\n") + "\n");

// ---------- Suchmaschinen ----------

const heute = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${["/", "/fr/"]
  .map(
    (p) => `  <url>
    <loc>${DOMAIN}${p}</loc>
    <lastmod>${heute}</lastmod>
    <xhtml:link rel="alternate" hreflang="de-CH" href="${DOMAIN}/" />
    <xhtml:link rel="alternate" hreflang="fr-CH" href="${DOMAIN}/fr/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/" />
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap);
await writeFile(
  path.join(DIST, "robots.txt"),
  VORSCHAU ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`,
);

await rm("dist-ssr", { recursive: true, force: true });

console.log("Vorgerendert:");
for (const g of geschrieben) console.log("  " + g);
console.log(`CSP (${cspName}) mit ${hashes.length} Hash(es).${VORSCHAU ? " Vorschau-Build: noindex." : ""}`);
