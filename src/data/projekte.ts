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
          "Speisekarte direkt lesbar statt als PDF",
          "Wochenend-Brunch als eigener Bereich",
          "Bestellung angebunden",
          "Zuerst fürs Handy gebaut",
        ],
      },
      fr: {
        was: "Restaurant à Bienne",
        pruefpunkte: [
          "Carte lisible directement, sans PDF",
          "Brunch du week-end dans sa propre section",
          "Commande reliée",
          "Conçu d'abord pour le téléphone",
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
          "Terminanfrage direkt auf der Seite",
          "Notfallnummer sofort sichtbar",
          "Das Team wird vorgestellt",
          "Öffnungszeiten für Google ausgezeichnet",
        ],
      },
      fr: {
        was: "Cabinet dentaire",
        pruefpunkte: [
          "Demande de rendez-vous directement sur le site",
          "Numéro d'urgence visible d'emblée",
          "L'équipe est présentée",
          "Horaires balisés pour Google",
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
          "Der Kunde pflegt Termine und Inhalte selbst",
          "Redaktionssystem, ohne auf mich zu warten",
        ],
      },
      fr: {
        was: "Plateforme d'événements",
        pruefpunkte: [
          "Le client gère lui-même dates et contenus",
          "Système de gestion de contenu, sans passer par moi",
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
  "bledi-bienne.ch: Ist die Bestellung wirklich angebunden (eigene Lösung oder externer Dienst)?",
  "bern-zahnarzt-team.ch: Sind die Öffnungszeiten im Code für Google ausgezeichnet (Rich-Results-Test)?",
  "Alle vier Kunden: schriftliche Freigabe für Name, Bild und Live-Ansicht.",
];
