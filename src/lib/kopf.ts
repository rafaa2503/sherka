import { WOERTER, type Sprache } from "./sprache";
import { DOMAIN, MAIL, TELEFON_ROH } from "./kontakt";

/* Kopfdaten pro vorgerenderter Seite: Titel, Beschreibung, kanonische
   Adresse, Sprachvarianten und strukturierte Daten. Nur Ort Biel/Bienne,
   keine Strasse, keine Preisangaben, keine Bewertungen. */

export type SeitenArt = "start" | "impressum" | "datenschutz" | "404";

const PFADE: Record<Exclude<SeitenArt, "404">, Record<Sprache, string>> = {
  start: { de: "/", fr: "/fr/" },
  impressum: { de: "/impressum/", fr: "/fr/mentions-legales/" },
  datenschutz: { de: "/datenschutz/", fr: "/fr/protection-des-donnees/" },
};

export function pfadVon(art: Exclude<SeitenArt, "404">, sprache: Sprache): string {
  return PFADE[art][sprache];
}

export type Kopf = {
  lang: string;
  titel: string;
  beschreibung: string;
  pfad: string;
  robots?: string;
  alternativen: { hreflang: string; href: string }[];
  ogTitel: string;
  ogBild: string;
  jsonld?: string;
};

export function kopfDaten(sprache: Sprache, art: SeitenArt): Kopf {
  const t = WOERTER[sprache];
  const lang = sprache === "fr" ? "fr-CH" : "de-CH";

  if (art === "404") {
    return {
      lang,
      titel: `${t.nichtGefunden.titel} | Sherka`,
      beschreibung: t.nichtGefunden.text,
      pfad: "/404.html",
      robots: "noindex",
      alternativen: [],
      ogTitel: t.meta.ogTitel,
      ogBild: `${DOMAIN}/og-${sprache}.png`,
    };
  }

  const pfad = PFADE[art][sprache];
  const alternativen = [
    { hreflang: "de-CH", href: DOMAIN + PFADE[art].de },
    { hreflang: "fr-CH", href: DOMAIN + PFADE[art].fr },
    { hreflang: "x-default", href: DOMAIN + PFADE[art].de },
  ];

  if (art !== "start") {
    const titel = art === "impressum" ? t.fuss.impressum : t.fuss.datenschutz;
    return {
      lang,
      titel: `${titel} | Sherka`,
      beschreibung: t.meta.beschreibung,
      pfad,
      robots: "noindex",
      alternativen,
      ogTitel: titel,
      ogBild: `${DOMAIN}/og-${sprache}.png`,
    };
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${DOMAIN}/#firma`,
        name: "Sherka",
        url: DOMAIN + pfad,
        description: t.meta.beschreibung,
        telephone: `+${TELEFON_ROH}`,
        email: MAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Biel/Bienne",
          addressRegion: "BE",
          addressCountry: "CH",
        },
        // Der Standort ist Biel/Bienne, das Angebot gilt für die ganze Schweiz.
        areaServed: { "@type": "Country", name: "CH" },
        availableLanguage: ["de", "fr"],
        founder: { "@id": `${DOMAIN}/#raffa` },
      },
      {
        "@type": "Person",
        "@id": `${DOMAIN}/#raffa`,
        name: "Raffa Amro Elsherkasi",
        jobTitle: sprache === "fr" ? "Développeur web" : "Webentwickler",
        knowsLanguage: ["de", "fr"],
        worksFor: { "@id": `${DOMAIN}/#firma` },
      },
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        url: DOMAIN + "/",
        name: "Sherka",
        inLanguage: ["de-CH", "fr-CH"],
        publisher: { "@id": `${DOMAIN}/#firma` },
      },
    ],
  };

  return {
    lang,
    titel: t.meta.titel,
    beschreibung: t.meta.beschreibung,
    pfad,
    alternativen,
    ogTitel: t.meta.ogTitel,
    ogBild: `${DOMAIN}/og-${sprache}.png`,
    jsonld: JSON.stringify(graph),
  };
}
