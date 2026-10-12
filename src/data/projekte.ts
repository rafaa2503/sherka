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
        pruefpunkte: ["Speisekarte ohne PDF, Brunch mit eigenem Bereich"],
      },
      fr: {
        was: "Restaurant à Bienne",
        pruefpunkte: ["Carte sans PDF, brunch avec sa propre rubrique"],
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
        pruefpunkte: ["Termin online anfragen, Notfallnummer sofort sichtbar"],
      },
      fr: {
        was: "Cabinet dentaire",
        pruefpunkte: ["Demande de rendez-vous en ligne, numéro d'urgence bien en vue"],
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
        pruefpunkte: ["Der Kunde ändert Texte selbst"],
      },
      fr: {
        was: "Plateforme d'événements",
        pruefpunkte: ["Le client change ses textes seul"],
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
        pruefpunkte: ["Für Geschäftspartner im Ausland, bewusst nüchtern"],
      },
      fr: {
        was: "Négoce de matières premières agricoles",
        pruefpunkte: ["Pour des partenaires à l'étranger, volontairement sobre"],
      },
    },
  },
];

/** Aussagen, die Raffa vor dem Livegang bestätigen muss. */
export const BESTAETIGEN = [
  "bern-zahnarzt-team.ch: Sind die Öffnungszeiten im Code für Google ausgezeichnet (Rich-Results-Test)?",
  "Alle vier Kunden: schriftliche Freigabe für Name, Bild und Live-Ansicht.",
];
