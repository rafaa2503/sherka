import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

/* Prüfmatrix Sherka V2 gegen die gebaute Seite (npm run build, npm run preview).
   Aufruf:  BASIS_URL=http://localhost:4173 node scripts/pruefen.mjs
   Ausgabe: ansichten/pruefen/bericht.json und Aufnahmen. Exit 1 bei Fehlern.

   Was nur auf echten Geräten geht (Safari iOS, altes iPad, Android), steht in
   der Geräte-Checkliste im Plan und wird hier nicht vorgetäuscht. */

const BASIS = process.env.BASIS_URL ?? "http://localhost:4173";
const AUS = "ansichten/pruefen";
await mkdir(AUS, { recursive: true });

const ergebnisse = [];
const fall = (id, bereich, ok, detail = "") => {
  ergebnisse.push({ id, bereich, ok, detail });
  console.log(`${ok ? "ok  " : "FEHL"} ${id.padEnd(5)} ${bereich.padEnd(46)} ${detail}`);
};

const GERAETE = [
  { n: "320", vp: { width: 320, height: 640 }, mobil: true },
  { n: "390", vp: { width: 390, height: 844 }, mobil: true },
  { n: "ipad", vp: { width: 810, height: 1080 }, mobil: true },
  { n: "1280", vp: { width: 1280, height: 720 }, mobil: false },
  { n: "1366", vp: { width: 1366, height: 768 }, mobil: false },
];
const SPRACHEN = { de: "/", fr: "/fr/" };

const b = await chromium.launch();

async function seite(g, opt = {}) {
  const ctx = await b.newContext({
    viewport: g.vp,
    isMobile: g.mobil,
    hasTouch: g.mobil,
    reducedMotion: opt.reduziert ? "reduce" : "no-preference",
    javaScriptEnabled: opt.js !== false,
  });
  if (opt.thema) await ctx.addInitScript((t) => localStorage.setItem("sherka:thema", t), opt.thema);
  // Hydrierung darf den vorgerenderten Inhalt nicht ersetzen.
  await ctx.addInitScript(() => {
    window.__entfernt = 0;
    new MutationObserver((ms) => {
      for (const m of ms) {
        if (!m.target.closest?.("#app") && m.target.id !== "app") continue;
        for (const n of m.removedNodes) if (n.nodeType === 1) window.__entfernt++;
      }
    }).observe(document, { childList: true, subtree: true });
  });
  const p = await ctx.newPage();
  const meldungen = [];
  const fremd = [];
  p.on("console", (m) => m.type() === "error" && meldungen.push(m.text().slice(0, 160)));
  p.on("pageerror", (e) => meldungen.push("PAGEERROR " + e.message));
  p.on("request", (r) => {
    const u = new URL(r.url());
    if (!["localhost", "127.0.0.1", "sherka.ch"].includes(u.hostname) && !u.protocol.startsWith("data")) fremd.push(u.hostname);
  });
  return { ctx, p, meldungen, fremd };
}

// ---------- Matrix: Darstellung ----------
for (const g of GERAETE) {
  for (const [sprache, pfad] of Object.entries(SPRACHEN)) {
    const thema = g.n === "390" || g.n === "1366" ? (sprache === "de" ? "dunkel" : "hell") : undefined;
    const { ctx, p, meldungen, fremd } = await seite(g, { thema });
    await p.goto(BASIS + pfad, { waitUntil: "load" });
    await p.waitForTimeout(1800);
    const tag = `${g.n}-${sprache}${thema ? "-" + thema : ""}`;
    await p.screenshot({ path: `${AUS}/${tag}.png` });

    const info = await p.evaluate(() => {
      const r = (s) => document.querySelector(s)?.getBoundingClientRect();
      const sichtbar = (el) => {
        if (!el) return false;
        const b = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return b.width > 0 && b.bottom <= innerHeight && b.top >= 0 && cs.visibility !== "hidden" && cs.display !== "none";
      };
      const knopf =
        [...document.querySelectorAll("#hero-knoepfe .knopf-voll, .kopf-cta")].some(sichtbar) ||
        !!document.querySelector(".leiste.leiste-an");
      const klein = [];
      if (innerWidth < 900) {
        for (const el of document.querySelectorAll("a, button, input, summary, textarea")) {
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) continue;
          if (el.closest(".honeypot, .vp, .springlink, [inert]")) continue;
          if (el.matches(".chip input")) continue;
          if (b.height < 44 && !el.closest("p, li, dd")) klein.push((el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 24));
        }
      }
      return {
        ueberlauf: document.documentElement.scrollWidth > innerWidth + 1,
        h1: sichtbar(document.querySelector("h1")),
        knopf,
        bildschirme: document.documentElement.scrollHeight / innerHeight,
        lang: document.documentElement.lang,
        thema: document.documentElement.dataset.theme,
        klein,
        entfernt: window.__entfernt,
        fertig: document.querySelector(".bg")?.hasAttribute("data-fertig"),
      };
    });
    fall("P1", `${tag}: kein waagrechter Überlauf`, !info.ueberlauf);
    fall("P2", `${tag}: h1 im ersten Bild`, info.h1);
    fall("P3", `${tag}: Hauptaktion ohne Scrollen`, info.knopf);
    // Das Längenziel gilt für die Massstab-Geräte: Handy 390x844, Laptop 1366x768.
    if (g.n === "390" || g.n === "1366") {
      const max = g.n === "390" ? 12.5 : 9.5;
      fall("P4", `${tag}: Seitenlänge`, info.bildschirme <= max, `${info.bildschirme.toFixed(1)} Bildschirme (max. ${max})`);
    }
    fall("P5", `${tag}: Sprache`, info.lang === (sprache === "fr" ? "fr-CH" : "de-CH"), info.lang);
    if (thema) fall("P6", `${tag}: Thema aus Speicher`, info.thema === thema, info.thema);
    if (!thema) fall("P6", `${tag}: Standard dunkel`, info.thema === "dunkel", info.thema);
    fall("P7", `${tag}: Tippziele >= 44 px`, info.klein.length === 0, info.klein.join(" | "));
    fall("P8", `${tag}: keine Konsolenfehler`, meldungen.length === 0, meldungen.join(" | "));
    fall("P9", `${tag}: keine fremden Hosts beim Laden`, fremd.length === 0, [...new Set(fremd)].join(", "));
    fall("P10", `${tag}: Aufrichte fertig`, info.fertig === true);
    fall("P10b", `${tag}: Hydrierung ersetzt nichts`, info.entfernt === 0, `${info.entfernt} entfernt`);

    if (g.n === "390" || g.n === "1366") {
      const axe = await new AxeBuilder({ page: p }).exclude(".vp").analyze();
      const schwer = axe.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      fall("P11", `${tag}: axe ohne serious/critical`, schwer.length === 0, schwer.map((v) => `${v.id}(${v.nodes.length})`).join(", "));
    }
    await ctx.close();
  }
}

// ---------- Bewegung ----------
{
  const g = GERAETE[4];
  const { ctx, p } = await seite(g, { reduziert: true });
  await p.goto(BASIS + "/", { waitUntil: "load" });
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => ({
    stufe: document.documentElement.dataset.bewegung,
    fertig: document.querySelector(".bg")?.hasAttribute("data-fertig"),
    animationen: document.getAnimations().filter((a) => a.playState === "running").length,
  }));
  fall("P12", "reduzierte Bewegung: Stufe aus, Endzustand sofort", r.stufe === "aus" && r.fertig === true, JSON.stringify(r));
  await ctx.close();
}

// ---------- Ohne JavaScript ----------
{
  const { ctx, p } = await seite(GERAETE[1], { js: false });
  await p.goto(BASIS + "/", { waitUntil: "load" });
  const r = await p.evaluate(() => ({
    h1: document.querySelector("h1")?.textContent?.trim(),
    blaetter: document.querySelectorAll(".blatt").length,
    faq: document.querySelectorAll(".faq details").length,
    entwurf: getComputedStyle(document.querySelector(".vp-echt")).opacity,
  }));
  await p.screenshot({ path: `${AUS}/ohne-js.png`, fullPage: false });
  fall("P13", "ohne JS: Inhalt und Entwurf sichtbar", !!r.h1 && r.blaetter === 4 && r.faq === 6 && r.entwurf === "1", JSON.stringify(r));
  await ctx.close();
}

// ---------- Bautafel ----------
{
  const { ctx, p } = await seite(GERAETE[4]);
  await p.goto(BASIS + "/", { waitUntil: "load" });
  await p.waitForTimeout(1600);
  await p.fill("#tafel-name", '<img src=x onerror="window.__xss=1">Atelier');
  await p.waitForTimeout(1600);
  const xss = await p.evaluate(() => ({ xss: window.__xss === 1, imgs: document.querySelectorAll(".vp img").length }));
  fall("P14", "Bautafel: HTML im Namen bleibt Text", !xss.xss && xss.imgs === 0);

  await p.fill("#tafel-name", "Boulangerie-Pâtisserie Les Trois Sapins du Faubourg XYZ");
  const laenge = await p.$eval("#tafel-name", (e) => e.value.length);
  fall("P15", "Bautafel: Name auf 40 Zeichen begrenzt", laenge <= 40, `${laenge}`);

  await p.fill("#tafel-name", "Café 👩🏽‍🍳 Rösti");
  await p.waitForTimeout(500);
  const emoji = await p.$eval(".vp-logo strong", (e) => e.textContent);
  fall("P16", "Bautafel: Emoji bleibt ganz", emoji === "Café 👩🏽‍🍳 Rösti", emoji);

  await p.fill("#tafel-name", "   ");
  await p.waitForTimeout(500);
  const leer = await p.$eval(".vp-logo strong", (e) => e.textContent);
  fall("P17", "Bautafel: nur Leerzeichen wie leer", leer === "Ihr Betrieb", leer);

  await p.fill("#tafel-name", "Schreinerei Muster");
  await p.click('label.chip:has(input[value="handwerk"])');
  await p.keyboard.press("Escape");
  await p.waitForTimeout(150);
  const sprung = await p.evaluate(() => document.querySelector(".bg").hasAttribute("data-fertig"));
  fall("P18", "Bautafel: Escape springt zum Endzustand", sprung);

  const masse = await p.evaluate(() => {
    const t = document.querySelector(".bg-mass span").textContent;
    const r = document.querySelector(".vp").getBoundingClientRect();
    const [w, h] = t.match(/\d+/g).map(Number);
    return { t, ok: Math.abs(w - r.width) <= 1 && Math.abs(h - r.height) <= 1 };
  });
  fall("P19", "Baugespann: Masse stimmen", masse.ok, masse.t);

  await p.click('.vp-sprache button:has-text("FR")');
  const vfr = await p.$eval(".vp", (e) => ({ lang: e.lang, h: e.querySelector(".vp-h").textContent }));
  fall("P20", "Entwurf: DE/FR-Schalter", vfr.lang === "fr-CH" && vfr.h.includes("Votre demande"), vfr.h);

  const speicher = await p.evaluate(() => JSON.stringify({ ...localStorage }) + JSON.stringify({ ...sessionStorage }) + location.href);
  fall("P21", "Name nicht in Speicher oder Adresse", !speicher.includes("Schreinerei"));

  const betrieb = await p.$eval("#a-betrieb", (e) => e.value);
  fall("P22", "Name landet im Formularfeld Betrieb", betrieb === "Schreinerei Muster", betrieb);
  await ctx.close();
}

// ---------- Formular ----------
async function formular(antwort, aktion) {
  const { ctx, p } = await seite(GERAETE[4]);
  const anfragen = [];
  await p.route("**/api/anfrage.php", async (r) => {
    anfragen.push(r.request().postDataJSON());
    await new Promise((res) => setTimeout(res, 400));
    if (antwort === "abbruch") return r.abort();
    await r.fulfill({ status: antwort.status, contentType: "application/json", body: JSON.stringify(antwort.body ?? { ok: antwort.status === 200 }) });
  });
  await p.goto(BASIS + "/#kontakt", { waitUntil: "load" });
  await p.waitForTimeout(3200); // Zeitprüfung: mind. 3 s offen
  const r = await aktion(p, anfragen);
  await ctx.close();
  return r;
}
const ausfuellen = async (p, { tel = false } = {}) => {
  await p.click('#kontakt label.chip:has(input[value="neu"])');
  await p.fill("#a-name", "Test Person");
  if (tel) await p.fill("#a-tel", "+41 79 123 45 67");
  else await p.fill("#a-mail", "test@example.ch");
};

fall(
  "P23",
  "Formular: leer absenden, Fokus auf erstem Fehler",
  await formular({ status: 200 }, async (p) => {
    await p.click("#kontakt button[type=submit]");
    await p.waitForTimeout(200);
    return p.evaluate(() => document.activeElement?.getAttribute("aria-invalid") === "true");
  }),
);
fall(
  "P24",
  "Formular: nur Telefon genügt, 200 zeigt Erfolg",
  await formular({ status: 200 }, async (p, anfragen) => {
    await ausfuellen(p, { tel: true });
    await p.click("#kontakt button[type=submit]");
    await p.waitForSelector(".anfrage-erfolg", { timeout: 3000 }).catch(() => {});
    const fokus = await p.evaluate(() => document.activeElement?.classList.contains("anfrage-erfolg"));
    return fokus && anfragen.length === 1 && anfragen[0].telefon && !anfragen[0].email;
  }),
);
fall(
  "P25",
  "Formular: Doppelklick sendet genau einmal",
  await formular({ status: 200 }, async (p, anfragen) => {
    await ausfuellen(p);
    await p.dblclick("#kontakt button[type=submit]");
    await p.waitForTimeout(900);
    return anfragen.length === 1;
  }),
);
for (const [id, status, sel] of [["P26", 502, ".anfrage-fehler"], ["P27", 429, ".anfrage-fehler"], ["P28", "abbruch", ".anfrage-fehler"]]) {
  fall(
    id,
    `Formular: ${status} meldet Fehler, Eingaben bleiben`,
    await formular(status === "abbruch" ? "abbruch" : { status }, async (p) => {
      await ausfuellen(p);
      await p.click("#kontakt button[type=submit]");
      await p.waitForSelector(sel, { timeout: 3000 }).catch(() => {});
      const name = await p.$eval("#a-name", (e) => e.value).catch(() => "");
      return (await p.$(sel)) !== null && name === "Test Person";
    }),
  );
}
fall(
  "P29",
  "Formular: 422 markiert das Feld",
  await formular({ status: 422, body: { ok: false, fehler: { email: "ungueltig" } } }, async (p) => {
    await ausfuellen(p);
    await p.click("#kontakt button[type=submit]");
    await p.waitForTimeout(900);
    return p.evaluate(() => document.querySelector("#a-mail")?.getAttribute("aria-invalid") === "true");
  }),
);

// ---------- Referenzen ----------
{
  const { ctx, p } = await seite(GERAETE[4]);
  await p.goto(BASIS + "/", { waitUntil: "load" });
  const vorher = await p.$$eval("iframe", (f) => f.length);
  fall("P30", "Abnahme: kein iframe vor dem Klick", vorher === 0);
  await ctx.close();
}

// ---------- Tastatur ----------
{
  const { ctx, p } = await seite(GERAETE[4]);
  await p.goto(BASIS + "/", { waitUntil: "load" });
  await p.keyboard.press("Tab");
  const erstes = await p.evaluate(() => document.activeElement?.className);
  fall("P31", "Tastatur: erstes Tab trifft den Sprunglink", String(erstes).includes("springlink"), erstes);
  await ctx.close();
}

// ---------- Routing ----------
for (const [pfad, erwartet] of [["/impressum/", 200], ["/datenschutz/", 200], ["/fr/mentions-legales/", 200], ["/fr/protection-des-donnees/", 200]]) {
  const r = await fetch(BASIS + pfad);
  const html = await r.text();
  fall("P32", `Rechtsseite ${pfad}`, r.status === erwartet && /<h1/.test(html) && !/type="module"/.test(html), `${r.status}`);
}

await b.close();
const fehlgeschlagen = ergebnisse.filter((e) => !e.ok);
await writeFile(`${AUS}/bericht.json`, JSON.stringify({ basis: BASIS, datum: new Date().toISOString(), ergebnisse }, null, 2));
console.log(`\n${ergebnisse.length - fehlgeschlagen.length} von ${ergebnisse.length} Prüfungen bestanden.`);
if (fehlgeschlagen.length) process.exit(1);
