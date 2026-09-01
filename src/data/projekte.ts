import type { Sprache } from "../i18n";

/* Jedes Projekt nennt eine Funktion, die eine Vorlage nicht kann.
   Bewusst nicht ueber Optik argumentiert: drei der vier Seiten benutzen
   aehnliche Farbwelten, optische Vielfalt waere hier gelogen. */

export type Projekt = {
  domain: string;
  url: string;
  /* Echte Bildschirmfotos der laufenden Seiten. Keine nachgebauten
     Attrappen aus divs, das ist der auffaelligste Fake ueberhaupt. */
  bild: string | null;
  bildMobil: string | null;
  text: Record<Sprache, { was: string; kann: string }>;
};

export const projekte: Projekt[] = [
  {
    domain: "bledi-bienne.ch",
    url: "https://bledi-bienne.ch",
    bild: "/shots/bledi-bienne.ch.webp",
    bildMobil: "/shots/bledi-bienne.ch-mobile.webp",
    text: {
      de: {
        was: "Restaurant in Biel",
        kann: "Speisekarte auf Deutsch und Französisch, direkt lesbar statt als PDF zum Herunterladen. Wochenend-Brunch als eigener Bereich, Bestellung angebunden. Zuerst fürs Handy gebaut, weil dort bestellt wird.",
      },
      fr: {
        was: "Restaurant à Bienne",
        kann: "Carte en allemand et en français, lisible directement au lieu d'un PDF à télécharger. Le brunch du week-end a sa propre section, la commande est reliée. Conçu d'abord pour le téléphone, parce que c'est là qu'on commande.",
      },
    },
  },
  {
    domain: "bern-zahnarzt-team.ch",
    url: "https://bern-zahnarzt-team.ch",
    bild: "/shots/bern-zahnarzt-team.ch.webp",
    bildMobil: "/shots/bern-zahnarzt-team.ch-mobile.webp",
    text: {
      de: {
        was: "Zahnarztpraxis in Bern",
        kann: "Terminanfrage direkt auf der Seite, Notfallnummer sofort sichtbar, sieben Personen im Team vorgestellt. Im Code so ausgezeichnet, dass Google Öffnungszeiten und Bewertungen selbst anzeigt.",
      },
      fr: {
        was: "Cabinet dentaire à Berne",
        kann: "Demande de rendez-vous directement sur le site, numéro d'urgence visible d'emblée, sept personnes présentées. Balisé dans le code pour que Google affiche lui-même les horaires et les avis.",
      },
    },
  },
  {
    domain: "kamil-energy.ch",
    url: "https://kamil-energy.ch",
    bild: "/shots/kamil-energy.ch.webp",
    bildMobil: "/shots/kamil-energy.ch-mobile.webp",
    text: {
      de: {
        was: "Handel mit Agrar-Rohstoffen",
        kann: "Auf Englisch für internationale Gegenparteien, bewusst nüchtern gehalten, weil hier Zahlen verkaufen und keine Bilder.",
      },
      fr: {
        was: "Négoce de matières premières agricoles",
        kann: "En anglais pour des contreparties internationales, volontairement sobre, parce qu'ici ce sont les chiffres qui vendent et non les images.",
      },
    },
  },
  {
    domain: "takabul.ch",
    url: "https://takabul.ch",
    bild: "/shots/takabul.ch.webp",
    bildMobil: "/shots/takabul.ch-mobile.webp",
    text: {
      de: {
        was: "Event-Plattform",
        kann: "Der Kunde pflegt Termine und Inhalte selbst über ein Redaktionssystem, ohne mich und ohne Zusatzkosten pro Änderung.",
      },
      fr: {
        was: "Plateforme d'événements",
        kann: "Le client gère lui-même les dates et les contenus via un système de gestion de contenu, sans moi et sans frais par modification.",
      },
    },
  },
];
