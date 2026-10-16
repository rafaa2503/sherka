import type { Sprache } from "../lib/sprache";

/* Die vier echten Referenzen. Nur Prüfpunkte, die stimmen. Was Raffa noch
   bestätigen muss, steht in BESTAETIGEN (npm run startklar listet es).
   Reihenfolge: zuerst die Betriebe aus der Region, kamil-energy zuletzt. */

export type Projekt = {
  domain: string;
  url: string;
  bild: string;
  bildBreite: number;
  bildHoehe: number;
  /* Wem die Domain gehört. Stand laut Raffa: bledi und die Zahnarztpraxis
     laufen über Sherka, takabul und kamil auf den Kunden. */
  domainBei: "kunde" | "sherka";
  /* bledi-bienne.ch sendet X-Frame-Options: SAMEORIGIN und lässt sich nicht
     einbetten. Dort gibt es nur den Link. */
  einbettbar: boolean;
  /* Was für eine Seite es ist, in Raffas Worten. */
  text: Record<Sprache, { was: string }>;
};

export const projekte: Projekt[] = [
  {
    domain: "bledi-bienne.ch",
    url: "https://bledi-bienne.ch",
    bild: "/shots/bledi-bienne.ch.webp",
    bildBreite: 1240,
    bildHoehe: 775,
    domainBei: "sherka",
    einbettbar: false,
    text: {
      de: { was: "Marokkanisches Restaurant in Biel" },
      fr: { was: "Restaurant marocain à Bienne" },
    },
  },
  {
    domain: "bern-zahnarzt-team.ch",
    url: "https://bern-zahnarzt-team.ch",
    bild: "/shots/bern-zahnarzt-team.ch.webp",
    bildBreite: 1240,
    bildHoehe: 775,
    domainBei: "sherka",
    einbettbar: true,
    text: {
      de: { was: "Zahnarztpraxis in Bern" },
      fr: { was: "Cabinet dentaire à Berne" },
    },
  },
  {
    domain: "takabul.ch",
    url: "https://takabul.ch",
    bild: "/shots/takabul.ch.webp",
    bildBreite: 1240,
    bildHoehe: 775,
    domainBei: "kunde",
    einbettbar: true,
    text: {
      de: { was: "Event-Seite mit Ticketshop" },
      fr: { was: "Site événementiel avec billetterie en ligne" },
    },
  },
  {
    domain: "kamil-energy.ch",
    url: "https://kamil-energy.ch",
    bild: "/shots/kamil-energy.ch.webp",
    bildBreite: 1240,
    bildHoehe: 775,
    domainBei: "kunde",
    einbettbar: true,
    text: {
      de: { was: "Handels-Website für ein Schweizer Unternehmen" },
      fr: { was: "Site commercial pour une entreprise suisse" },
    },
  },
];

/** Aussagen, die Raffa vor dem Livegang bestätigen muss. */
export const BESTAETIGEN = [
  "bern-zahnarzt-team.ch: Sind die Öffnungszeiten im Code für Google ausgezeichnet (Rich-Results-Test)?",
  "Alle vier Kunden: schriftliche Freigabe für Name, Bild und Live-Ansicht.",
];
