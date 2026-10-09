import type { Sprache } from "../lib/sprache";

/* Vorlagen für den Entwurf auf der Bautafel. Alle teilen dasselbe Gerüst,
   es ändern sich nur Akzent, Texte und der Funktionsbaustein. Die Farben
   gehören dem Entwurf, nicht Sherka: der Entwurf soll nach dem Betrieb des
   Besuchers aussehen, nicht nach einer Vorlage von Sherka.
   {name} wird durch den eingegebenen Betriebsnamen ersetzt. */

export type VorlageId = "salon" | "praxis" | "restaurant" | "handwerk" | "anderes";

type Zweisprachig<T = string> = Record<Sprache, T>;

export type Vorlage = {
  id: VorlageId;
  label: Zweisprachig;
  akzent: string;
  radius: number;
  nav: Zweisprachig<string[]>;
  titel: Zweisprachig;
  text: Zweisprachig;
  funktion: {
    titel: Zweisprachig;
    optionen: Zweisprachig<string[]>;
    knopf: Zweisprachig;
    erfolg: Zweisprachig;
  };
};

export const VORLAGEN: Vorlage[] = [
  {
    id: "salon",
    label: { de: "Salon", fr: "Salon" },
    akzent: "#b4536f",
    radius: 999,
    nav: { de: ["Leistungen", "Team", "Kontakt"], fr: ["Prestations", "Équipe", "Contact"] },
    titel: { de: "{name}. Termin buchen, ohne anzurufen.", fr: "{name}. Réserver sans téléphoner." },
    text: {
      de: "Wählen Sie eine freie Zeit. Wir bestätigen per E-Mail.",
      fr: "Choisissez un horaire libre. Nous confirmons par e-mail.",
    },
    funktion: {
      titel: { de: "Freie Zeiten", fr: "Horaires libres" },
      optionen: { de: ["Di 10:00", "Di 14:30", "Mi 09:00"], fr: ["mar. 10 h 00", "mar. 14 h 30", "mer. 9 h 00"] },
      knopf: { de: "Termin anfragen", fr: "Prendre rendez-vous" },
      erfolg: { de: "Anfrage gesendet", fr: "Demande envoyée" },
    },
  },
  {
    id: "praxis",
    label: { de: "Praxis", fr: "Cabinet" },
    akzent: "#1f7f86",
    radius: 6,
    nav: { de: ["Praxis", "Team", "Kontakt"], fr: ["Le cabinet", "Équipe", "Contact"] },
    titel: { de: "{name}. Termine online anfragen.", fr: "{name}. Rendez-vous en ligne." },
    text: {
      de: "Wählen Sie die Art des Termins. Die Praxis meldet sich bei Ihnen.",
      fr: "Choisissez le type de rendez-vous. Le cabinet vous recontacte.",
    },
    funktion: {
      titel: { de: "Art des Termins", fr: "Type de rendez-vous" },
      optionen: { de: ["Erster Termin", "Folgetermin", "Rückruf"], fr: ["Premier rendez-vous", "Suivi", "Rappel"] },
      knopf: { de: "Termin anfragen", fr: "Prendre rendez-vous" },
      erfolg: { de: "Anfrage gesendet", fr: "Demande envoyée" },
    },
  },
  {
    id: "restaurant",
    label: { de: "Restaurant", fr: "Restaurant" },
    akzent: "#b5562e",
    radius: 2,
    nav: { de: ["Karte", "Reservieren", "Anfahrt"], fr: ["Carte", "Réserver", "Accès"] },
    titel: { de: "{name}. Die Karte auf einen Blick.", fr: "{name}. La carte, en un coup d'œil." },
    text: {
      de: "Mittags und abends geöffnet. Reservieren Sie Ihren Tisch hier.",
      fr: "Ouvert à midi et le soir. Réservez votre table ici.",
    },
    funktion: {
      titel: { de: "Tisch für", fr: "Table pour" },
      optionen: { de: ["2 Personen", "4 Personen", "6 Personen"], fr: ["2 personnes", "4 personnes", "6 personnes"] },
      knopf: { de: "Tisch reservieren", fr: "Réserver une table" },
      erfolg: { de: "Reservationsanfrage gesendet", fr: "Demande de réservation envoyée" },
    },
  },
  {
    id: "handwerk",
    label: { de: "Handwerk", fr: "Artisanat" },
    akzent: "#7a5a2e",
    radius: 0,
    nav: { de: ["Leistungen", "Arbeiten", "Kontakt"], fr: ["Prestations", "Réalisations", "Contact"] },
    titel: { de: "{name}. Ihre Anfrage in zwei Minuten.", fr: "{name}. Votre demande en deux minutes." },
    text: {
      de: "Beschreiben Sie kurz, was ansteht. Wir melden uns mit einem Termin.",
      fr: "Décrivez brièvement votre besoin. Nous revenons vers vous avec une date.",
    },
    funktion: {
      titel: { de: "Worum geht es?", fr: "De quoi s'agit-il ?" },
      optionen: { de: ["Reparatur", "Neubau", "Beratung"], fr: ["Réparation", "Nouvel ouvrage", "Conseil"] },
      knopf: { de: "Offerte anfragen", fr: "Demander une offre" },
      erfolg: { de: "Anfrage gesendet", fr: "Demande envoyée" },
    },
  },
  {
    id: "anderes",
    label: { de: "Anderes", fr: "Autre" },
    akzent: "#3d5fb8",
    radius: 8,
    nav: { de: ["Angebot", "Über uns", "Kontakt"], fr: ["Offre", "À propos", "Contact"] },
    titel: { de: "{name}. Kurz erklärt, was wir tun.", fr: "{name}. Ce que nous faisons, en bref." },
    text: {
      de: "Ein Satz, der sagt, für wen Sie da sind. Darunter der Weg zu Ihnen.",
      fr: "Une phrase qui dit pour qui vous êtes là. En dessous, le chemin vers vous.",
    },
    funktion: {
      titel: { de: "Wie erreichen wir Sie?", fr: "Comment vous joindre ?" },
      optionen: { de: ["Rückruf", "E-Mail", "Termin"], fr: ["Rappel", "E-mail", "Rendez-vous"] },
      knopf: { de: "Anfrage senden", fr: "Envoyer la demande" },
      erfolg: { de: "Anfrage gesendet", fr: "Demande envoyée" },
    },
  },
];

export function vorlage(id: VorlageId): Vorlage {
  return VORLAGEN.find((v) => v.id === id) ?? VORLAGEN[0];
}
