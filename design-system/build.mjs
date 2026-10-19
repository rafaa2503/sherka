// node design-system/build.mjs  ->  index.html + DESIGN.md (+ tokens.css)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  brand, primitives, roles, fonts, type, space, layout, breakpoints, radius, border, shadow, motion, principles,
} from "./tokens.mjs";
import { cssVars, json, jsTheme, tailwind, designMd, hex, runContrast, componentTokens } from "./exports.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(dir, p), "utf8");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------- guard: contrast must pass ----------
const contrast = runContrast();
const failed = contrast.filter((c) => !c.pass);
if (failed.length) {
  console.error("Contrast failures:", failed);
  process.exit(1);
}

// ---------- logo from /logo ----------
const lockup = readFileSync(join(dir, "../logo/lockup-dark.svg"), "utf8");
const paths = [...lockup.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
const iconD = paths[0].replace(/\.0\b/g, "");
const wordD = paths[1];
const dot = lockup.match(/<circle[^>]*>/) ? lockup.match(/<circle cx="([\d.]+)" cy="(-?[\d.]+)" r="([\d.]+)"/) : null;
const iconOnly = readFileSync(join(dir, "../logo/icon-dark.svg"), "utf8");
const dotCx = dot ? dot[1] : "416.9", dotCy = dot ? dot[2] : "-11", dotR = dot ? dot[3] : "11";
const wm = lockup.match(/<g id="wordmark" transform="([^"]+)"/)[1];

const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<defs>
<g id="logo-g"><path d="${iconD}" fill="currentColor"/><g transform="${wm}"><path d="${wordD}" fill="currentColor"/><circle cx="${dotCx}" cy="${dotCy}" r="${dotR}" fill="var(--sk-brand-dot)"/></g></g>
<symbol id="mark" viewBox="244 196 46 120"><path d="${iconD}" fill="currentColor"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
<symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></symbol>
<symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M4 20h16"/></symbol>
<symbol id="i-print" viewBox="0 0 24 24"><path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/></symbol>
<symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></symbol>
<symbol id="i-alert" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/></symbol>
<symbol id="i-chev" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></symbol>
</defs></svg>`;
const logo = (cls = "logo") => `<svg class="${cls}" viewBox="240 194 544 124" role="img" aria-label="Sherka"><use href="#logo-g"/></svg>`;
const ic = (n, cls = "") => `<svg class="i ${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const mark = (cls = "") => `<svg class="${cls}" viewBox="244 196 46 120" aria-hidden="true"><use href="#mark"/></svg>`;

// ---------- helpers ----------
const code = (id, text, label) => `<div class="code"><div class="code-head"><span class="t-over muted">${esc(label)}</span><button class="copy" type="button" data-copy-target="${id}" data-label="${esc(label)}">${ic("copy")}Copy</button></div><pre id="${id}"><code>${esc(text)}</code></pre></div>`;

const swatch = (name, value, desc, bg) =>
  `<button type="button" class="swatch" data-copy="${value}" aria-label="Copy ${name} ${value}"><span class="chip" style="background:${bg || value}"></span><span class="meta"><b>${name}</b><span class="t-code">${value}</span>${desc ? `<span class="use">${esc(desc)}</span>` : ""}</span></button>`;

const sec = (id, n, title, lede, inner) => `
<section class="sec" id="${id}" aria-labelledby="${id}-h">
  <div class="sec-head">
    <p class="t-over"><span>${n}</span><span>${esc(title)}</span></p>
    <h2 class="t-h1" id="${id}-h">${esc(lede[0])}</h2>
    <p class="lede t-lg">${esc(lede[1])}</p>
  </div>
  ${inner}
</section>`;

const sub = (title, text) => `<div class="sub"><h3>${esc(title)}</h3>${text ? `<p class="t-sm">${esc(text)}</p>` : ""}</div>`;

const panelPair = (render) =>
  `<div class="pair">${["light", "dark"]
    .map(
      (t) => `<div class="panel" data-theme="${t}"><div class="panel-label t-over"><span>${t === "light" ? "Light" : "Dark"}</span><span>fixed theme</span></div><div class="panel-body">${render(t)}</div></div>`,
    )
    .join("")}</div>`;

const st = (label, inner) => `<div><span class="state-label t-over">${label}</span>${inner}</div>`;

// ---------- component showcases ----------
const buttons = (t) => `
${st("Variants", `<div class="row"><button class="btn btn-primary" type="button">Erstgespräch anfragen</button><button class="btn btn-secondary" type="button">Arbeiten ansehen</button><button class="btn btn-ghost" type="button">Anrufen</button><a class="btn-link" href="#buttons-${t}" onclick="return false">Mehr erfahren${ic("arrow")}</a></div>`)}
${st("Sizes", `<div class="row"><button class="btn btn-primary btn-sm" type="button">Klein 36</button><button class="btn btn-primary" type="button">Mittel 48</button><button class="btn btn-primary btn-lg" type="button">Gross 56</button></div>`)}
${st("Primary states", `<div class="row"><button class="btn btn-primary" type="button">Default</button><button class="btn btn-primary is-hover" type="button">Hover</button><button class="btn btn-primary is-active" type="button">Pressed</button><button class="btn btn-primary is-focus" type="button">Focus</button><button class="btn btn-primary is-disabled" type="button" disabled>Disabled</button><button class="btn btn-primary" type="button" aria-busy="true"><span class="spin"></span>Wird gesendet</button></div>`)}
${st("Secondary states", `<div class="row"><button class="btn btn-secondary" type="button">Default</button><button class="btn btn-secondary is-hover" type="button">Hover</button><button class="btn btn-secondary is-focus" type="button">Focus</button><button class="btn btn-secondary is-disabled" type="button" disabled>Disabled</button></div>`)}
${st("With icon", `<div class="row"><button class="btn btn-primary" type="button">${ic("phone")}Anrufen</button><button class="btn btn-secondary" type="button">Weiter${ic("arrow")}</button><button class="btn-icon" type="button" aria-label="Menü">${ic("menu")}</button></div>`)}`;

const tags = () => `
${st("Variants", `<div class="row"><span class="tag">Neutral</span><span class="tag tag-outline">Outline</span><span class="tag tag-accent">Akzent</span><span class="tag tag-solid">Solid</span><span class="tag tag-success"><span class="dot"></span>Online</span><span class="tag tag-danger"><span class="dot"></span>Fehler</span></div>`)}
${st("Projekt-Status", `<div class="row"><span class="tag tag-outline">Konzept</span><span class="tag tag-accent">Entwurf wartet auf Freigabe</span><span class="tag tag-success"><span class="dot"></span>Live</span></div>`)}
${st("Branchen", `<div class="row"><span class="tag">Restaurant</span><span class="tag">Zahnarztpraxis</span><span class="tag">Coiffeur</span><span class="tag">Handwerk</span></div>`)}
${st("Removable", `<div class="row"><span class="tag tag-outline">Biel/Bienne<button type="button" aria-label="Biel/Bienne entfernen">${ic("x")}</button></span><span class="tag tag-outline">Bern<button type="button" aria-label="Bern entfernen">${ic("x")}</button></span></div>`)}`;

const inputs = (t) => `
${st("Default", `<div class="field"><label for="n-${t}">Name</label><input class="input" id="n-${t}" type="text" placeholder="Vor- und Nachname" autocomplete="off"><span class="hint">So dürfen wir Sie ansprechen.</span></div>`)}
${st("Focus", `<div class="field"><label for="f-${t}">Firma <span class="opt">(optional)</span></label><input class="input is-focus" id="f-${t}" type="text" value="Salon Aeschbacher"></div>`)}
${st("Error", `<div class="field"><label for="e-${t}">E-Mail oder Telefon</label><input class="input is-error" id="e-${t}" type="text" value="info@salon-aeschbacher" aria-invalid="true" aria-describedby="e-${t}-m"><span class="err" id="e-${t}-m">${ic("alert")}Die E-Mail-Adresse ist unvollständig. Bitte ergänzen Sie die Endung.</span></div>`)}
${st("Disabled", `<div class="field"><label for="d-${t}">Kundennummer</label><input class="input" id="d-${t}" type="text" value="Wird nach dem Gespräch vergeben" disabled></div>`)}
${st("Select", `<div class="field"><label for="s-${t}">Anliegen</label><div class="select-wrap"><select class="select" id="s-${t}"><option>Neue Website</option><option>Bestehende Seite erneuern</option><option>Tool statt Excel-Listen</option><option>Noch unsicher</option></select>${ic("chev")}</div></div>`)}
${st("Textarea", `<div class="field"><label for="t-${t}">Kurzbeschreibung <span class="opt">(optional)</span></label><textarea class="textarea" id="t-${t}" placeholder="Was machen Sie, und was soll die Website leisten?"></textarea></div>`)}
${st("Choice", `<div class="field"><span class="lbl">Zeitrahmen</span><label class="check"><input type="radio" name="z-${t}" checked><span>Sofort</span></label><label class="check"><input type="radio" name="z-${t}"><span>In den nächsten Monaten</span></label><label class="check"><input type="checkbox" checked><span>Rückruf statt E-Mail</span></label><label class="switch"><input type="checkbox" checked><span>Newsletter</span></label></div>`)}`;

const cards = () => `
${st("Service card", `<div class="card"><span class="t-over idx">01</span><h3 class="t-h3">Website bauen</h3><p>Konzept, Entwurf und Umsetzung. Online geht die Seite erst nach Ihrer Freigabe.</p><a class="btn-link" href="#" onclick="return false">Details${ic("arrow")}</a></div>`)}
${st("Interactive hover", `<a class="card is-hover" href="#" onclick="return false"><span class="t-over idx">02</span><h3 class="t-h3">Website betreuen</h3><p>Um die Technik kümmern wir uns, nicht Sie.</p></a>`)}
${st("Inverse", `<div class="card card-inverse"><span class="t-over idx">Erstgespräch</span><h3 class="t-h3">Kostenlos und unverbindlich.</h3><p>Antwort innert eines Werktags.</p></div>`)}
${st("Project card", `<div class="card card-media"><div class="thumb">${mark()}</div><div class="body"><div class="row"><span class="tag tag-outline">Restaurant</span><span class="tag tag-outline">Biel/Bienne</span></div><h3 class="t-h4">Projekttitel</h3><span class="t-code muted">beispiel.ch</span></div></div>`)}`;

const data = () => `
${st("Table (Beispieldaten)", `<div class="tbl-box"><table class="tbl"><thead><tr><th>Seite</th><th class="num">Ladezeit</th><th>Status</th></tr></thead><tbody><tr><td>Startseite</td><td class="num">1,4 s</td><td><span class="tag tag-success"><span class="dot"></span>Gut</span></td></tr><tr><td>Leistungen</td><td class="num">2,1 s</td><td><span class="tag tag-success"><span class="dot"></span>Gut</span></td></tr><tr><td>Kontakt</td><td class="num">3,2 s</td><td><span class="tag tag-danger"><span class="dot"></span>Zu langsam</span></td></tr></tbody></table></div>`)}
${st("Stats", `<div class="stats"><div class="stat"><b>1</b><span>Werktag bis zur Antwort</span></div><div class="stat"><b>3</b><span>Schritte bis zur Freigabe</span></div></div>`)}
${st("Progress (Beispieldaten)", `<div class="bar"><div class="bar-head"><span>Projektstand</span><span class="t-code">2 von 3</span></div><div class="bar-track" role="progressbar" aria-valuenow="2" aria-valuemin="0" aria-valuemax="3" aria-label="Projektstand"><div class="bar-fill" style="width:66.6%"></div></div></div>`)}`;

const navigation = () => `
${st("Top bar", `<nav class="navbar" aria-label="Beispiel"><a href="#" onclick="return false" aria-label="Sherka">${logo()}</a><ul><li><a href="#" onclick="return false" aria-current="page">Leistungen</a></li><li><a href="#" onclick="return false">Arbeiten</a></li><li><a href="#" onclick="return false">Ablauf</a></li></ul><a class="btn btn-primary btn-sm" href="#" onclick="return false">Erstgespräch</a></nav>`)}
${st("Tabs", `<div class="tabs" role="tablist" aria-label="Beispiel"><a href="#" onclick="return false" aria-current="page">Alle</a><a href="#" onclick="return false">Restaurant</a><a href="#" onclick="return false">Praxis</a><a href="#" onclick="return false">Handwerk</a></div>`)}
${st("Breadcrumb", `<ol class="crumbs" aria-label="Pfad"><li><a href="#" onclick="return false">Start</a></li><li><a href="#" onclick="return false">Arbeiten</a></li><li aria-current="page">Zahnarztpraxis Bern</li></ol>`)}
${st("Pagination", `<div class="pager"><a href="#" onclick="return false" aria-label="Zurück">${ic("arrow", "flip")}</a><a href="#" onclick="return false" aria-current="page">1</a><a href="#" onclick="return false">2</a><a href="#" onclick="return false">3</a><a href="#" onclick="return false" aria-label="Weiter">${ic("arrow")}</a></div>`)}`;

const componentSection = [
  ["Buttons", "btn", "Three variants, three sizes, six states. Primary is amber with ink text in both themes.", buttons],
  ["Tags", "tag", "Pill shaped, 28px. Status tags always include a word.", tags],
  ["Inputs", "input", "48px fields, labels above, errors in words and colour.", inputs],
  ["Cards", "card", "Flat surface, 1px line, radius 16. Hover moves the border to text colour.", cards],
  ["Data", "data", "Tables, stat blocks and progress. Numbers are tabular.", data],
  ["Navigation", "nav", "Top bar, tabs, breadcrumb, pagination.", navigation],
]
  .map(([title, id, text, fn]) => `${sub(title, text)}<div id="comp-${id}"></div>${panelPair(fn)}`)
  .join("\n");

// ---------- patterns ----------
function shot(name) {
  const p = join(dir, "../public/shots", name + ".webp");
  if (!existsSync(p)) return `<div class="thumb">${mark()}</div>`;
  return `<div class="shot"><img src="data:image/webp;base64,${readFileSync(p).toString("base64")}" alt="Screenshot ${name}" loading="lazy" width="1280" height="800"></div>`;
}
const siteNav = (active) => `<div class="site-nav">${logo()}<ul>${["Leistungen", "Arbeiten", "Ablauf", "Kontakt"].map((l) => `<li><a href="#" onclick="return false"${l === active ? ' aria-current="page"' : ""}>${l}</a></li>`).join("")}</ul><a class="btn btn-primary btn-sm btn-nav" href="#" onclick="return false">Erstgespräch</a></div>`;
const screen = (url, cap, inner) => `<figure class="screen" data-theme-follow><div class="screen-bar"><span class="screen-url t-code">${url}</span><span class="screen-cap t-over">${cap}</span></div><div class="screen-body">${inner}</div></figure>`;
const footer = `<div class="s-footer t-sm"><span>Sherka, Biel/Bienne</span><span class="t-code">+41 78 745 00 47</span><span class="t-code">info@sherka.ch</span></div>`;

const homepage = screen("sherka.ch", "01 Startseite", `
${siteNav("")}
<div class="s-hero"><svg class="deco" viewBox="244 196 46 120" aria-hidden="true"><use href="#mark"/></svg>
<p class="t-over muted">Webdesign für kleine Betriebe</p>
<h2 class="t-display">Mehr Kunden. Weniger Aufwand.</h2>
<p class="t-lg">Wir bauen Websites für Salons, Praxen, Restaurants und Handwerker, die Anfragen bringen. Und wir betreuen sie danach.</p>
<div class="row"><a class="btn btn-primary btn-lg" href="#" onclick="return false">Erstgespräch anfragen</a><a class="btn btn-secondary btn-lg" href="#" onclick="return false">${ic("phone")}Anrufen</a></div>
<p class="t-cap s-hint">Kostenlos und unverbindlich. Antwort innert eines Werktags.</p></div>
<ol class="s-steps"><li><span class="t-over n">01</span><h3 class="t-h4">Konzept</h3><p class="t-sm">Wir erstellen es aus den Angaben zu Ihrem Betrieb.</p></li><li><span class="t-over n">02</span><h3 class="t-h4">Erster Entwurf</h3><p class="t-sm">Sie sehen ihn und kommentieren direkt.</p></li><li><span class="t-over n">03</span><h3 class="t-h4">Freigabe</h3><p class="t-sm">Die Arbeit startet erst nach Ihrer Zustimmung. Online geht nichts ohne Sie.</p></li></ol>
${footer}`);

const services = screen("sherka.ch/leistungen", "02 Leistungen", `
${siteNav("Leistungen")}
<div class="s-pad"><div class="s-title"><p class="t-over muted">Leistungen</p><h2 class="t-h1">Eine Website, die sich für Sie lohnt.</h2><p class="t-lg muted" style="max-width:52ch">Von Technik müssen Sie nichts verstehen. Wir kümmern uns darum.</p></div>
<div class="s-strip">
<div class="card"><span class="t-over idx">01</span><h3 class="t-h3">Website bauen</h3><p>Für Salons, Praxen, Restaurants und Handwerker. Mit Konzept, Entwurf und Freigabe.</p><ul class="rule-list t-sm"><li>Domain läuft auf Ihren Namen</li><li>Kontaktformular, Telefon, WhatsApp</li><li>Schnell auf dem Handy</li></ul></div>
<div class="card"><span class="t-over idx">02</span><h3 class="t-h3">Website betreuen</h3><p>Änderungen, Updates und Technik übernehmen wir. Sie arbeiten in Ihrem Betrieb.</p><ul class="rule-list t-sm"><li>Texte und Bilder aktualisieren</li><li>Sicherheit und Updates</li><li>Ein Ansprechpartner</li></ul></div>
<div class="card card-inverse"><span class="t-over idx">03</span><h3 class="t-h3">Seite erneuern</h3><p>Ihre Website ist veraltet? Wir prüfen sie und sagen Ihnen offen, was sich lohnt.</p><a class="btn-link" style="border-color:currentColor;color:inherit" href="#" onclick="return false">Erstgespräch${ic("arrow")}</a></div>
</div></div>
${footer}`);

const projects = [
  ["bledi-bienne.ch", "Restaurant", "Biel/Bienne"],
  ["bern-zahnarzt-team.ch", "Zahnarztpraxis", "Bern"],
  ["takabul.ch", "Events", "Ticketshop"],
  ["kamil-energy.ch", "Unternehmen", "Trading"],
];
const portfolio = screen("sherka.ch/arbeiten", "03 Arbeiten", `
${siteNav("Arbeiten")}
<div class="s-pad"><div class="s-title"><p class="t-over muted">Arbeiten</p><h2 class="t-h1">Glauben Sie uns nichts. Öffnen Sie die Seiten.</h2></div>
<div class="tabs" style="margin-bottom:32px"><a href="#" onclick="return false" aria-current="page">Alle</a><a href="#" onclick="return false">Gastro</a><a href="#" onclick="return false">Praxis</a><a href="#" onclick="return false">Andere</a></div>
<div class="grid g2">${projects
  .map(
    ([u, a, b]) =>
      `<a class="card card-media" href="#" onclick="return false">${shot(u)}<div class="body"><div class="row"><span class="tag tag-outline">${a}</span><span class="tag tag-outline">${b}</span></div><span class="t-h4">${u}</span><span class="btn-link" style="width:fit-content">Seite öffnen${ic("arrow")}</span></div></a>`,
  )
  .join("")}</div></div>
${footer}`);

const contact = screen("sherka.ch/#kontakt", "04 Kontakt", `
${siteNav("Kontakt")}
<div class="s-pad"><div class="s-title"><p class="t-over muted">Erstgespräch</p><h2 class="t-h1">Stellen Sie uns Ihr Unternehmen vor.</h2><p class="t-lg muted" style="max-width:52ch">Kostenlos und unverbindlich. Wir antworten innert eines Werktags.</p></div>
<div class="form-grid"><form class="form-fields" data-demo novalidate>
<div class="field"><label for="p-an">Anliegen</label><div class="select-wrap"><select class="select" id="p-an"><option>Neue Website</option><option>Bestehende Seite erneuern</option><option>Tool statt Excel-Listen</option><option>Noch unsicher</option></select>${ic("chev")}</div></div>
<div class="field"><label for="p-fi">Firma <span class="opt">(optional)</span></label><input class="input" id="p-fi" type="text" placeholder="z. B. Schreinerei Muster AG"></div>
<div class="field"><span class="lbl">Zeitrahmen</span><label class="check"><input type="radio" name="p-z" checked><span>Sofort</span></label><label class="check"><input type="radio" name="p-z"><span>In den nächsten Monaten</span></label><label class="check"><input type="radio" name="p-z"><span>Ich schaue nur</span></label></div>
<div class="field"><label for="p-ku">Kurzbeschreibung <span class="opt">(optional)</span></label><textarea class="textarea" id="p-ku" placeholder="Was machen Sie, und was soll die Website leisten?"></textarea><span class="hint">Bitte senden Sie keine Gesundheits- oder Patientendaten.</span></div>
<div class="field"><label for="p-na">Name</label><input class="input" id="p-na" type="text"></div>
<div class="field"><label for="p-ko">E-Mail oder Telefon</label><input class="input" id="p-ko" type="text"></div>
<div class="row"><button class="btn btn-primary btn-lg" type="submit">Erstgespräch anfragen</button></div></form>
<ul class="contact-aside"><li><span class="t-over muted">Telefon und WhatsApp</span><span class="t-h4 t-code">+41 78 745 00 47</span></li><li><span class="t-over muted">E-Mail</span><span class="t-h4">info@sherka.ch</span></li><li><span class="t-over muted">Ort</span><span class="t-h4">Biel/Bienne</span></li><li><span class="t-over muted">Antwort</span><span class="t-h4">Innert eines Werktags</span></li></ul></div></div>
${footer}`);

const patterns = `${sub("Homepage", "Proof first: promise, cost of the next step, then the three steps.")}${homepage}
${sub("Services", "Three offers, one inverse card to draw the eye to the enquiry. No prices are shown because none are published yet.")}${services}
${sub("Portfolio", "Real projects, linked. Tags say who it is for, not what technology it uses.")}${portfolio}
${sub("Contact", "Exactly the fields of the live form. Direct channels sit beside the form, not below it.")}${contact}`;

// ---------- overview, principles ----------
const overview = `
<div class="hero">
  <h1 class="t-display">Bold. Premium. Trustworthy.</h1>
  <p class="lede t-lg">Sherka builds and maintains websites for small businesses across Switzerland, so they win more customers and spend less time on it. This system is how that promise looks, reads and behaves. Version ${brand.version}.</p>
  <dl class="facts"><div><dt class="t-over">Palette</dt><dd>Ink, bone, one amber</dd></div><div><dt class="t-over">Type</dt><dd>Archivo, JetBrains Mono</dd></div><div><dt class="t-over">Themes</dt><dd>Dark native, light equal</dd></div><div><dt class="t-over">Language</dt><dd>German, Sie-form</dd></div></dl>
</div>
${sub("Logo", "Two half-ellipses and the word. The amber dot is the only coloured part. All logo files live in /logo.")}
<div class="pair">
  <div class="logo-panel" data-theme="dark">${logo()}</div>
  <div class="logo-panel" data-theme="light">${logo()}</div>
</div>
<div class="grid g3" style="margin-top:24px">
  <div class="prose"><h3 class="t-h4">Clear space</h3><p class="t-sm muted">Keep free space equal to the height of the letter h around the lockup.</p></div>
  <div class="prose"><h3 class="t-h4">Minimum size</h3><p class="t-sm muted">24px high on screen, 8mm in print. Below that use the mark alone.</p></div>
  <div class="prose"><h3 class="t-h4">Never</h3><p class="t-sm muted">Recolour the dot, add effects, stretch, outline or place it on busy images.</p></div>
</div>
${sub("What it must not feel like")}
<ul class="rule-list prose"><li>A generic AI-generated website: no gradient hero, no glass cards, no purple.</li><li>A cheap template: no stock icons in circles, no centred everything.</li><li>A tech startup: no emoji, no hype words, no dashboards-as-decoration.</li></ul>`;

const principlesHtml = `<ol class="principles">${principles.map(([t, d]) => `<li><h3>${esc(t)}</h3><p>${esc(d)}</p></li>`).join("")}</ol>
${sub("Rules that follow", "Applied in every component and pattern.")}
<div class="grid g2"><ul class="rule-list prose"><li>No gradients, anywhere.</li><li>No emoji. Use the icon set or words.</li><li>Colour never carries meaning alone.</li></ul><ul class="rule-list prose"><li>Real numbers, real projects, real contact details only.</li><li>Dark and light are tested separately.</li><li>If it does not help the visitor decide, remove it.</li></ul></div>`;

// ---------- colour ----------
const primGroups = ["ink", "bone", "amber", "green", "red"];
const colorHtml = `
${sub("Primitives", "Click any swatch to copy its hex. Product code uses roles, not primitives.")}
${primGroups.map((g) => `<div class="swatch-grid" style="margin-bottom:16px">${Object.entries(primitives).filter(([k]) => k.startsWith(g + "-")).map(([k, v]) => swatch(k, v)).join("")}</div>`).join("")}
${sub("Roles", "Identical names in both themes. Each block stays in its own theme regardless of the page toggle.")}
<div class="themes-pair">
${["light", "dark"].map((t) => `<div class="theme-block" data-theme="${t}"><header><h3 class="t-h4">${t === "light" ? "Light" : "Dark"}</h3><span class="t-over muted">${t}</span></header><div class="swatch-grid">${Object.entries(roles).map(([r, d]) => swatch(r, hex(r, t), d.desc)).join("")}</div></div>`).join("")}
</div>
${sub("Contrast", "Computed at build time from the values above. The build fails if any pair drops below its minimum.")}
<div class="tbl-wrap"><table class="doc"><thead><tr><th>Theme</th><th>Pair</th><th>Ratio</th><th>Minimum</th><th>Result</th></tr></thead><tbody>${contrast.map((c) => `<tr><td>${c.theme}</td><td>${c.fg} on ${c.bg}</td><td class="mono">${c.ratio.toFixed(2)}:1</td><td class="mono">${c.min}:1</td><td class="pass">${c.pass ? "Pass" : "Fail"}</td></tr>`).join("")}</tbody></table></div>
${sub("Usage")}
<ul class="rule-list prose"><li>Ground and text carry about 90 percent of any screen. Amber is a signal, not a theme.</li><li>Amber fill always carries ink text. On light, amber is never text; use <code class="t-code">accent-text</code>.</li><li>Success and danger are always paired with a word or icon.</li><li>Charts: use accent, success, danger and text-muted until a data palette exists (see Known Gaps).</li></ul>`;

// ---------- typography ----------
const typeRows = Object.entries(type)
  .map(([k, t]) => {
    const fam = t.family === "mono" ? "var(--sk-font-mono)" : "var(--sk-font-sans)";
    const cls = { display: "t-display", h1: "t-h1", h2: "t-h2", h3: "t-h3", h4: "t-h4", "body-lg": "t-lg", body: "", "body-sm": "t-sm", caption: "t-cap", label: "t-label", overline: "t-over", code: "t-code" }[k];
    const sample = { display: "Mehr Kunden.", h1: "Websites, die Kunden bringen", h2: "Eine Website, die sich lohnt", h3: "Website bauen und betreuen", h4: "Konzept, Entwurf, Freigabe", "body-lg": "Wir bauen Websites für Salons, Praxen, Restaurants und Handwerker, die Anfragen bringen.", body: "Um die Technik kümmern wir uns, nicht Sie. Das Erstgespräch ist kostenlos und unverbindlich.", "body-sm": "Antwort innert eines Werktags. Die Domain läuft auf Ihren Namen.", caption: "Bitte senden Sie keine Gesundheits- oder Patientendaten.", label: "Erstgespräch anfragen", overline: "Webdesign für kleine Betriebe", code: "--sk-accent: #FFA51E;" }[k];
    return `<div class="scale-row"><div class="k"><b class="t-code">${k}</b><span class="t-code muted">${t.size}<br>${t.weight} / ${t.line} / ${t.track}${t.stretch !== "100%" ? " / w" + t.stretch : ""}</span></div><div class="sample ${cls}" style="font-family:${fam.replace(/"/g, "'")}">${sample}</div></div>`;
  })
  .join("");
const typeHtml = `
<div class="specimen"><div class="aa" aria-hidden="true">Aa</div><div class="grid g2"><div><h3 class="t-h3">Archivo</h3><p class="muted t-sm">Variable, weight 100-900, width 62-125. Headlines run wide and heavy, text runs normal.</p></div><div><h3 class="t-h3" style="font-family:var(--sk-font-mono);font-stretch:100%">JetBrains Mono</h3><p class="muted t-sm">Overlines, numbers in tables, tokens and code.</p></div></div>
<p class="alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 ÄÖÜ äöü éèà CHF '</p></div>
${sub("Width as hierarchy", "The same word at three widths. Wider means louder.")}
<div class="grid g3">${[75, 100, 125].map((w) => `<div class="width-row"><span class="t-code muted">font-stretch ${w}%</span><span style="font-size:2.25rem;font-weight:800;font-stretch:${w}%;letter-spacing:-0.03em;line-height:1">Sherka</span></div>`).join("")}</div>
${sub("Scale", "Click a code export below for the exact values. Sizes with clamp() are fluid, no jumps at breakpoints.")}
<div>${typeRows}</div>
${sub("Rules")}
<ul class="rule-list prose"><li>Headlines: text-wrap balance. Body: text-wrap pretty. Reading measure ${layout.measure}.</li><li>Never below 15px for text people must read. Captions 13px are for hints only.</li><li>Overlines are always mono, uppercase, tracked 0.12em.</li><li>Numbers in tables and prices use tabular figures.</li><li>One display style per page.</li></ul>`;

// ---------- spacing ----------
const spacingHtml = `
${sub("Scale", "Base unit 4px. Pick from the scale, never invent a value.")}
<div>${Object.entries(space).map(([k, v]) => `<div class="space-row"><span class="t-code">space-${k}</span><span class="t-code muted">${v}</span><span class="space-bar" style="width:${v}"></span></div>`).join("")}</div>
${sub("Layout")}
<div class="tbl-wrap"><table class="doc"><thead><tr><th>Token</th><th>Value</th></tr></thead><tbody>${Object.entries(layout).map(([k, v]) => `<tr><td class="mono">${k}</td><td class="mono">${v}</td></tr>`).join("")}</tbody></table></div>
<div class="demo-box" style="margin-top:24px"><span class="t-over muted">12-column grid, desktop</span><div class="layout-demo">${"<span></span>".repeat(12)}</div></div>
${sub("Breakpoints")}
<div class="tbl-wrap"><table class="doc"><thead><tr><th>Name</th><th>Min width</th><th>Change</th></tr></thead><tbody>${[["sm", "Single column, 4-column grid, gutters 20px"], ["md", "Two-column cards, tabs inline"], ["lg", "12-column grid, gutters 32px, desktop navigation"], ["xl", "Container reaches " + layout["container-max"]]].map(([k, d]) => `<tr><td class="mono">${k}</td><td class="mono">${breakpoints[k]}</td><td>${d}</td></tr>`).join("")}</tbody></table></div>
${sub("Rules")}
<ul class="rule-list prose"><li>Inside components use space 3 to 5. Between sections use ${layout["section-y-mobile"]} on mobile and ${layout["section-y-desktop"]} on desktop.</li><li>Left aligned by default. Centre only single short statements.</li><li>Touch targets are at least 44 by 44px.</li></ul>`;

// ---------- shape ----------
const shapeHtml = `
${sub("Radius", "Small and decisive. Round only what is meant to be tapped or tagged.")}
<div class="shape-row">${Object.entries(radius).map(([k, v]) => `<div class="shape"><i style="border-radius:${v}"></i><div><b class="t-code">${k}</b><br><span class="t-code muted">${v}</span></div></div>`).join("")}</div>
<ul class="rule-list prose" style="margin-top:24px"><li><b>md</b> buttons and inputs. <b>lg</b> cards and panels. <b>full</b> tags. <b>sm</b> images and code.</li><li>Borders: hairline ${border.hairline} for structure, strong ${border.strong} for emphasis and secondary buttons.</li><li>The logo mark (two half-ellipses) may appear once per page as a large decorative shape in amber. Never tile it.</li></ul>
${sub("Elevation", "Flat first. Depth comes from surface roles and lines. Shadows only for hover and overlays.")}
${panelPair((t) => `<div class="card"><span class="t-over muted">Level 0</span><h3 class="t-h4">Flat</h3><p>Surface plus 1px line.</p></div><div class="card" style="box-shadow:var(--sk-shadow-raised)"><span class="t-over muted">raised</span><h3 class="t-h4">Hover, dropdown</h3><p class="t-code" style="font-size:.75rem;overflow-wrap:anywhere">${esc(shadow.raised[t])}</p></div><div class="card" style="box-shadow:var(--sk-shadow-overlay)"><span class="t-over muted">overlay</span><h3 class="t-h4">Dialog, menu</h3><p class="t-code" style="font-size:.75rem;overflow-wrap:anywhere">${esc(shadow.overlay[t])}</p></div>`)}`;

// ---------- motion ----------
function curve(c) {
  const [x1, y1, x2, y2] = c.match(/-?[\d.]+/g).map(Number);
  const S = 200, P = 40;
  const X = (v) => P + v * S, Y = (v) => P + S - v * S;
  return `<svg class="curve" viewBox="0 0 280 280" role="img" aria-label="Easing curve ${esc(c)}"><line x1="${P}" y1="${P + S}" x2="${P + S}" y2="${P + S}"/><line x1="${P}" y1="${P}" x2="${P}" y2="${P + S}"/><path d="M${X(0)} ${Y(0)} C ${X(x1)} ${Y(y1)}, ${X(x2)} ${Y(y2)}, ${X(1)} ${Y(1)}"/></svg>`;
}
const motionHtml = `
${sub("Tokens")}
<div class="tbl-wrap"><table class="doc"><thead><tr><th>Token</th><th>Value</th><th>Use</th></tr></thead><tbody>
${[["dur-fast", motion.duration.fast, "Press, hover colour"], ["dur-base", motion.duration.base, "Most transitions"], ["dur-slow", motion.duration.slow, "Panels and menus"], ["dur-reveal", motion.duration.reveal, "Scroll reveal, once"], ["ease-standard", motion.easing.standard, "Enter and move"], ["ease-exit", motion.easing.exit, "Leave"]].map(([k, v, u]) => `<tr><td class="mono">${k}</td><td class="mono">${v}</td><td>${u}</td></tr>`).join("")}
</tbody></table></div>
${sub("Easing")}
<div class="grid g2"><figure><figcaption class="t-code muted" style="margin-bottom:8px">ease-standard</figcaption>${curve(motion.easing.standard)}</figure><figure><figcaption class="t-code muted" style="margin-bottom:8px">ease-exit</figcaption>${curve(motion.easing.exit)}</figure></div>
${sub("Duration", "Play to compare. Honours reduced motion.")}
<div class="motion-demo" id="md"><div style="margin-bottom:16px"><button class="btn btn-secondary btn-sm motion-play" type="button" data-play="md">Play</button></div>
${Object.entries(motion.duration).map(([k, v]) => `<div class="motion-row"><span class="t-code">${k} ${v}</span><div class="motion-track"><span class="motion-ball" style="transition:transform var(--sk-dur-${k}) var(--sk-ease-standard)"></span></div></div>`).join("")}</div>
${sub("Rules")}
<ul class="rule-list prose"><li>Animate transform, opacity and colour. Nothing else.</li><li>No parallax, no scroll-jacking, no looping decoration.</li><li>Reveal on scroll once, 600ms, 24px travel at most.</li><li>prefers-reduced-motion: all transitions drop to 0.01ms.</li></ul>`;

// ---------- imagery ----------
const imageryHtml = `
<div class="placeholder">
  <div><span class="tag tag-outline">Placeholder</span></div>
  <p class="t-lg" style="max-width:60ch">No reference images were supplied, so no style is locked. When references arrive, each one becomes a numbered style in this format.</p>
  <div class="grid g3">
    <div><div class="placeholder-slot t-over">Style 01 reference</div></div>
    <div class="prose"><h3 class="t-h4">Style rules table</h3><p class="t-sm muted">Subject, light, colour, composition, lens, texture, avoid.</p></div>
    <div class="prose"><h3 class="t-h4">Copy-paste prompt</h3><p class="t-sm muted">One subject sentence plus a fixed style block.</p></div>
  </div>
  ${code("img-ph", "[One sentence describing the subject.]\n\n[FIXED STYLE BLOCK for Style 01, written once and never edited per image]", "Prompt format")}
</div>
${sub("Constraints that already hold")}
<ul class="rule-list prose"><li>No gradients, cartoon illustration or emoji.</li><li>No handshake, laptop-on-desk or stock-team clichés. Real Swiss small-business subjects.</li><li>Ink and bone tonality, at most one amber accent in frame.</li><li>Photographs of people only with their consent.</li></ul>`;

// ---------- token exports ----------
const exportsData = [
  ["css", "CSS variables", cssVars(), "tokens.css"],
  ["tw", "Tailwind", tailwind(), "tailwind.config.js"],
  ["json", "JSON", json(), "tokens.json"],
  ["js", "JS theme", jsTheme(), "theme.js"],
];
const exportsHtml = `<div data-tabs><div class="tabs-ex" role="tablist" aria-label="Export format">${exportsData.map(([id, label], i) => `<button class="tab-btn" role="tab" id="tab-${id}" aria-controls="pane-${id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" type="button">${label}</button>`).join("")}</div>
${exportsData.map(([id, label, text, file], i) => `<div class="tab-pane" role="tabpanel" id="pane-${id}" aria-labelledby="tab-${id}" data-title="${label}"${i ? " hidden" : ""}>${code("code-" + id, text, file)}</div>`).join("")}</div>`;

// ---------- voice ----------
const voicePairs = [
  ["Erstgespräch anfragen", "Jetzt kostenlos durchstarten!", "A verb, a clear next step, no hype, no exclamation mark."],
  ["Antwort innert eines Werktags.", "Wir melden uns schnellstmöglich bei Ihnen.", "A promise with a number beats an intention."],
  ["Die Domain läuft auf Ihren Namen.", "Wir bieten ganzheitliche, massgeschneiderte Lösungen.", "Concrete fact against filler."],
  ["Die E-Mail-Adresse ist unvollständig. Bitte ergänzen Sie die Endung.", "Fehler: Ungültige Eingabe!", "Say what happened and what to do, without blame."],
];
const voiceHtml = `
<div class="grid g3"><div class="prose"><h3 class="t-h4">Sie-form, always</h3><p class="t-sm muted">Formal and warm. The tone of a trusted craftsperson, not a salesperson.</p></div><div class="prose"><h3 class="t-h4">Short and direct</h3><p class="t-sm muted">One idea per sentence. Verbs first on buttons. Cut every word that does not help a decision.</p></div><div class="prose"><h3 class="t-h4">Honest</h3><p class="t-sm muted">No invented numbers, clients or quotes. If something is not known, say what is known.</p></div></div>
${sub("Say this, not that", "German examples. English notes explain the rule.")}
<div class="dd">${voicePairs.map(([a, b, w]) => `<div><div class="do"><b class="t-over">Do</b><br><q>${esc(a)}</q></div><div class="dont"><b class="t-over">Don't</b><br><q>${esc(b)}</q></div><p class="why">${esc(w)}</p></div>`).join("")}</div>
${sub("Microcopy")}
<div class="tbl-wrap"><table class="doc"><thead><tr><th>Moment</th><th>Copy</th></tr></thead><tbody>
<tr><td>Primary action</td><td>Erstgespräch anfragen</td></tr>
<tr><td>Phone and chat</td><td>Anrufen / WhatsApp</td></tr>
<tr><td>Cost reassurance</td><td>Kostenlos und unverbindlich. Antwort innert eines Werktags.</td></tr>
<tr><td>Form loading</td><td>Wird gesendet</td></tr>
<tr><td>Form success</td><td>Danke. Wir melden uns innert eines Werktags.</td></tr>
<tr><td>Form error</td><td>Das hat nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns an: +41 78 745 00 47.</td></tr>
<tr><td>Empty state</td><td>Noch keine Projekte. Das erste entsteht gerade.</td></tr>
<tr><td>Sensitive data hint</td><td>Bitte senden Sie keine Gesundheits- oder Patientendaten.</td></tr>
</tbody></table></div>
${sub("Writing rules")}
<div class="tbl-wrap"><table class="doc"><thead><tr><th>Rule</th><th>Example</th></tr></thead><tbody>
<tr><td>Swiss spelling, no ß</td><td>Strasse, gross, schliessen</td></tr>
<tr><td>Quotation marks</td><td>„Beispiel“ (low-high), « » in French</td></tr>
<tr><td>Currency</td><td>CHF 1'200 (apostrophe as thousands separator)</td></tr>
<tr><td>Date</td><td>17. Oktober 2026</td></tr>
<tr><td>Phone</td><td>+41 78 745 00 47</td></tr>
<tr><td>Forbidden words</td><td>innovativ, ganzheitlich, massgeschneidert, nahtlos, Synergie, Rundum-sorglos</td></tr>
<tr><td>Punctuation</td><td>No exclamation marks. No emoji. No dashes as pauses; use a full stop.</td></tr>
</tbody></table></div>`;

// ---------- assemble ----------
const nav = [
  ["overview", "Overview"], ["principles", "Principles"], ["color", "Color"], ["typography", "Typography"], ["spacing", "Spacing"], ["shape", "Shape"], ["motion", "Motion"], ["components", "Components"], ["patterns", "Patterns"], ["imagery", "Imagery"], ["tokens", "Token exports"], ["voice", "Voice & tone"],
];
const lede = {
  overview: ["A dark, precise, Swiss-built identity.", "The system for a web design agency that wants small businesses to trust it at first sight."],
  principles: ["Five rules that settle most arguments.", "When a decision is unclear, the one that follows more of these wins."],
  color: ["Ink and bone, with one amber signal.", "Two complete themes, tested for contrast, derived from the logo."],
  typography: ["Large, tight, wide where it matters.", "Archivo for words, JetBrains Mono for data."],
  spacing: ["A 4px grid and a calm rhythm.", "Generous between sections, tight inside components."],
  shape: ["Small radii, hard lines, flat surfaces.", "Round only what is meant to be tapped."],
  motion: ["Quick, quiet, never decorative.", "Motion confirms an action. It never performs."],
  components: ["Every component, light and dark, side by side.", "Each panel keeps its own theme, whatever the page toggle says."],
  patterns: ["Four screens for a real agency.", "Homepage, services, portfolio and contact, in German, following the page theme."],
  imagery: ["Locked image styles, once references exist.", "A placeholder until example images are supplied."],
  tokens: ["Copy the tokens. Nothing is typed twice.", "CSS variables, Tailwind config, JSON and a JS theme object, generated from one source."],
  voice: ["Plain German, formal, honest.", "How Sherka sounds in buttons, errors and pages."],
};
const bodies = { overview, principles: principlesHtml, color: colorHtml, typography: typeHtml, spacing: spacingHtml, shape: shapeHtml, motion: motionHtml, components: componentSection, patterns, imagery: imageryHtml, tokens: exportsHtml, voice: voiceHtml };

const md = designMd();
const css = cssVars();
const favicon = "data:image/svg+xml;base64," + Buffer.from(readFileSync(join(dir, "../logo/favicon.svg"), "utf8")).toString("base64");

const html = `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="dark light">
<title>Sherka Design System</title>
<meta name="description" content="${esc(brand.description)}">
<link rel="icon" href="${favicon}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script>try{var t=localStorage.getItem("sherka-ds-theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){}</script>
<style>
${css}

${read("site.css")}
html[data-theme="dark"] .ic-moon, html[data-theme="light"] .ic-sun { display: none; }
svg.flip { transform: scaleX(-1); }
</style>
</head>
<body>
${sprite}
<a class="sr" href="#main">Skip to content</a>
<div class="scrim" id="scrim"></div>
<aside class="side" data-theme="dark" aria-label="Sections">
  <div class="side-brand">${logo()}<p class="t-over muted">Design System ${brand.version}</p></div>
  <nav>${nav.map(([id, label], i) => `<a href="#${id}"><span>${String(i + 1).padStart(2, "0")}</span>${label}</a>`).join("")}</nav>
  <div class="side-foot t-cap muted">Biel/Bienne. Built for sherka.ch.</div>
</aside>
<div class="page">
  <header class="top">
    <button class="btn-icon menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false">${ic("menu")}</button>
    <span class="name">Sherka Design System</span>
    <span class="grow"></span>
    <button class="btn btn-secondary btn-sm top-btn" id="dl-design" type="button">${ic("download")}<span class="btn-label">Download DESIGN.md</span></button>
    <button class="btn btn-secondary btn-sm top-btn" id="print-spec" type="button">${ic("print")}<span class="btn-label">Print spec sheet</span></button>
    <button class="btn-icon" id="theme-toggle" type="button" aria-pressed="true" aria-label="Switch to light theme">${ic("sun", "ic-sun")}${ic("moon", "ic-moon")}</button>
  </header>
  <main class="main" id="main">
    <div class="print-cover"><b>Sherka Design System</b><p class="t-code">Version ${brand.version}. Generated ${new Date().toISOString().slice(0, 10)}.</p></div>
    ${nav.map(([id, label], i) => sec(id, String(i + 1).padStart(2, "0"), label, lede[id], bodies[id])).join("\n")}
  </main>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script type="text/plain" id="design-md">${md.replace(/<\/script/gi, "<\\/script")}</script>
<script>
${read("site.js")}
</script>
</body>
</html>
`;

writeFileSync(join(dir, "index.html"), html);
writeFileSync(join(dir, "DESIGN.md"), md);
writeFileSync(join(dir, "tokens.css"), css + "\n");
console.log("built index.html", (html.length / 1024).toFixed(0) + " KB, DESIGN.md", md.length, "bytes");
