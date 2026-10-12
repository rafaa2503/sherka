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
        pruefpunkte: [
          "Gäste lesen die Speisekarte direkt, ohne PDF",
          "Der Wochenend-Brunch hat seinen eigenen Bereich",
          "Zuerst fürs Handy gebaut",
        ],
      },
      fr: {
        was: "Restaurant à Bienne",
        pruefpunkte: [
          "Les clients lisent la carte directement, sans PDF",
          "Le brunch du week-end a sa propre rubrique",
          "Conçu d'abord pour mobile",
        ],
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
        pruefpunkte: [
          "Patienten fragen Termine auf der Seite an",
          "Notfallnummer auf den ersten Blick",
          "Patienten sehen vorher, wer sie behandelt",
          "Öffnungszeiten für Google lesbar hinterlegt",
        ],
      },
      fr: {
        was: "Cabinet dentaire",
        pruefpunkte: [
          "Les patients demandent un rendez-vous en ligne",
          "Numéro d'urgence visible d'emblée",
          "Les patients voient d'avance qui les soigne",
          "Horaires enregistrés pour que Google les lise",
        ],
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
        pruefpunkte: [
          "Der Kunde trägt Termine und Inhalte selbst ein",
          "Texte selber ändern, ohne auf mich zu warten",
        ],
      },
      fr: {
        was: "Plateforme d'événements",
        pruefpunkte: [
          "Le client saisit lui-même dates et contenus",
          "Il change ses textes lui-même, sans m'attendre",
        ],
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
        pruefpunkte: ["Ganz auf Englisch, für internationale Geschäftspartner", "Bewusst nüchtern gehalten"],
      },
      fr: {
        was: "Négoce de matières premières agricoles",
        pruefpunkte: ["Entièrement en anglais, pour des partenaires internationaux", "Volontairement sobre"],
      },
    },
  },
];

/** Aussagen, die Raffa vor dem Livegang bestätigen muss. */
export const BESTAETIGEN = [
  "bern-zahnarzt-team.ch: Sind die Öffnungszeiten im Code für Google ausgezeichnet (Rich-Results-Test)?",
  "Alle vier Kunden: schriftliche Freigabe für Name, Bild und Live-Ansicht.",
];
