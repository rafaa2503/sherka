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
  text: Record<Sprache, { was: string; pruefpunkte: string[] }>;
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
      de: {
        was: "Restaurant in Biel/Bienne",
        pruefpunkte: ["Gäste lesen die Speisekarte direkt, ohne PDF."],
      },
      fr: {
        was: "Restaurant à Bienne",
        pruefpunkte: ["Les clients lisent la carte directement, sans PDF."],
      },
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
      de: {
        was: "Zahnarztpraxis",
        pruefpunkte: ["Patienten fragen Termine online an und sehen die Notfallnummer sofort."],
      },
      fr: {
        was: "Cabinet dentaire",
        pruefpunkte: ["Les patients demandent un rendez-vous en ligne et voient tout de suite le numéro d'urgence."],
      },
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
      de: {
        was: "Event-Plattform",
        pruefpunkte: ["Der Kunde pflegt Termine und Texte selbst."],
      },
      fr: {
        was: "Plateforme d'événements",
        pruefpunkte: ["Le client gère lui-même ses dates et ses textes."],
      },
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
      de: {
        was: "Handel mit Agrar-Rohstoffen",
        pruefpunkte: ["Die Seite spricht Geschäftspartner im Ausland sachlich an."],
      },
      fr: {
        was: "Négoce de matières premières agricoles",
        pruefpunkte: ["Le site s'adresse sobrement à des partenaires commerciaux à l'étranger."],
      },
    },
  },
];

/** Aussagen, die Raffa vor dem Livegang bestätigen muss. */
export const BESTAETIGEN = [
  "bern-zahnarzt-team.ch: Sind die Öffnungszeiten im Code für Google ausgezeichnet (Rich-Results-Test)?",
  "Alle vier Kunden: schriftliche Freigabe für Name, Bild und Live-Ansicht.",
];
