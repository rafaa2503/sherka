import type { Woerter } from "./de";
import { typoFr } from "../lib/typo";

/* Vor dem Livegang von einer bezahlten Muttersprachlerin aus der Romandie
   abnehmen lassen. Kein Satz darf ein Adjektiv an {name} angleichen müssen,
   und vor {name} steht kein "de" (sonst fehlt die Elision bei Vokal).
   Das Erstgespräch heisst überall "rendez-vous" ("entretien" hiesse
   auch Wartung). Stimme wie im Deutschen: ganze, ruhige Sätze mit Subjekt
   und Verb, keine Schlagworte, keine Gegensatzpaare. */

export const fr: Woerter = typoFr({
  meta: {
    titel: "Site internet pour petite entreprise, créé et suivi | Sherka",
    beschreibung:
      "Nous créons et gérons des sites internet qui amènent des demandes aux salons, cabinets, restaurants et artisans. Le premier rendez-vous est gratuit.",
    ogTitel: "Des sites qui amènent des clients au lieu de seulement faire joli.",
  },

  kopf: {
    zumInhalt: "Aller au contenu",
    navLabel: "Navigation principale",
    links: {
      arbeiten: "Exemples",
      vorteile: "Avantages",
      ablauf: "Étapes",
      faq: "Questions",
    },
    anfragen: "Rendez-vous",
    themaHell: "Passer en affichage clair",
    themaDunkel: "Passer en affichage sombre",
    andereSprache: "Deutsch",
    andereSpracheKurz: "DE",
    menue: "Ouvrir le menu",
    menueZu: "Fermer le menu",
  },

  hero: {
    titel: "Plus de clients. Moins d'efforts.",
    unter: "Un beau site, beaucoup en ont un. Nous vous en créons un qui amène des clients.",
    cta: "Demander un rendez-vous",
    ctaHinweis: "Gratuit et sans engagement.",
    wahlTitel: "Nos réalisations",
    zeigen: "Afficher {domain} dans l'appareil",
    laptopAlt: "{domain} sur un ordinateur portable",
    handyAlt: "{domain} sur un téléphone",
    messTitel: "Mesuré à l'instant chez vous",
    messLcp: "Cette page visible après",
    messFcp: "Premier contenu visible après",
    messRichtLcp: "Google recommande : moins de 2,5 secondes",
    messRichtFcp: "Google recommande : moins de 1,8 seconde",
  },

  intro: {
    stark: "Le téléphone sonne et vous avez les mains prises.",
    rest: "Qui ne vous joint pas appelle le suivant. Votre site, lui, répond pendant que vous travaillez.",
  },

  arbeiten: {
    titel: "Ne nous croyez pas. Ouvrez les sites.",
    oeffnen: "Ouvrir",
    zurueck: "Exemple précédent",
    weiter: "Exemple suivant",
    bildAlt: "Page d'accueil de {domain}",
  },

  vorteile: {
    titel: "Un site qui vous rapporte.",
    kacheln: [
      {
        gross: "Les clients vous trouvent avant vos concurrents.",
        text: "Nous créons votre site pour que Google puisse lire votre offre et vos horaires.",
      },
      {
        gross: "Les demandes arrivent même quand vous avez fermé.",
        text: "Les clients vous écrivent directement par le site, au lieu d'essayer par téléphone.",
      },
      {
        gross: "Nous nous occupons de la technique, pas vous.",
        text: "Nous tenons votre site à jour et nous faisons les changements pour vous.",
      },
    ],
  },

  ablauf: {
    titel: "Vous voyez ce que vous recevez avant que nous commencions le travail.",
    schritte: [
      { was: "Vous nous présentez votre entreprise.", text: "À partir de là, nous élaborons ensemble un concept." },
      { was: "Vous recevez une première maquette.", text: "Vous nous dites ce que vous souhaitez y changer." },
      { was: "Ensuite, le travail commence à votre demande.", text: "Votre site n'est mis en ligne que lorsque vous êtes d'accord." },
    ],
  },

  faq: {
    titel: "La technique, vous n'avez pas à la comprendre.",
    liste: [
      {
        frage: "Que dois-je fournir ?",
        antwort: "Nous avons besoin de quelques phrases sur votre entreprise, de vos horaires et de photos, si vous en avez.",
      },
      {
        frage: "J'ai déjà un site.",
        antwort: "Alors nous le regardons ensemble et nous gardons ce qui est bon.",
      },
      {
        frage: "Et après, je dépends de vous ?",
        antwort: "Non, l'adresse internet est à votre nom, ou nous vous la transférons.",
      },
    ],
  },

  kontakt: {
    titel: "Présentez-nous votre entreprise.",
    titelMitName: "Présentez-nous {name}.",
    text: "Le premier rendez-vous est gratuit et sans engagement, et nous vous répondons sous un jour ouvrable.",
    whatsapp: "WhatsApp",
    whatsappText: "Bonjour, je m'intéresse à un site internet pour {betrieb}. Auriez-vous un moment pour un premier rendez-vous ?",
    whatsappOhne: "mon entreprise",
    telefon: "Téléphone",
    mail: "E-mail",

    anliegenLabel: "De quoi s'agit-il ?",
    anliegen: [
      { wert: "neu", text: "Nouveau site" },
      { wert: "ueberarbeiten", text: "Retravailler un site existant" },
      { wert: "anwendung", text: "Un outil au lieu d'Excel" },
      { wert: "offen", text: "Je ne sais pas encore" },
    ],
    betriebLabel: "Nom de votre entreprise",
    zeitLabel: "Est-ce urgent ?",
    zeit: [
      { wert: "bald", text: "Dès que possible" },
      { wert: "monate", text: "Dans les prochains mois" },
      { wert: "umschauen", text: "Je me renseigne d'abord" },
    ],
    textLabel: "Quelques mots à ce sujet",
    textPlatzhalter: "Ex. : salon de coiffure, rendez-vous en ligne, remplacer l'ancien site",
    textHinweis: "Pas de données de santé ni de patients, merci.",
    nameLabel: "Votre nom",
    mailLabel: "E-mail",
    telLabel: "Téléphone",
    erreichbarHinweis: "E-mail ou téléphone, un seul suffit.",
    freiwillig: "Facultatif",

    senden: "Demander un rendez-vous",
    sendet: "Envoi en cours",

    erfolgTitel: "Bien reçu",
    erfolgText: "Merci, {name}. Nous vous répondons sous un jour ouvrable.",
    erfolgEilig: "Si c'est urgent, écrivez-nous sur WhatsApp.",

    fehlerTitel: "Ça n'a pas marché",
    fehlerText: "Vos réponses sont toujours là. Réessayez, ou joignez-nous directement :",
    zuViele:
      "Il y a eu trop de tentatives en peu de temps. Réessayez un peu plus tard, s'il vous plaît, ou joignez-nous par téléphone ou sur WhatsApp.",
    aus: "Dans cet aperçu, le formulaire est désactivé.",

    pflichtAnliegen: "Choisissez de quoi il s'agit.",
    pflichtName: "Il manque votre nom.",
    pflichtErreichbar: "Indiquez une adresse e-mail ou un numéro de téléphone.",
    falscheMail: "Cette adresse e-mail semble incorrecte.",
    falschesTel: "Ce numéro de téléphone semble incorrect.",
    fehlerAnzahl: "Informations manquantes : {n}",

    datenschutzHinweis: "Nous n'utilisons vos données que pour vous répondre.",
  },

  aktionsleiste: {
    label: "Contact rapide",
    anrufen: "Appeler",
    anfragen: "Rendez-vous",
    whatsapp: "WhatsApp",
  },

  fuss: {
    ort: "Bienne",
    impressum: "Mentions légales",
    datenschutz: "Protection des données",
    impressumPfad: "/fr/mentions-legales/",
    datenschutzPfad: "/fr/protection-des-donnees/",
  },

  nichtGefunden: {
    titel: "Cette page n'existe pas",
    text: "Le lien est peut-être obsolète. Voici la page d'accueil.",
    zurueck: "Retour à l'accueil",
  },
});
