import type { Woerter } from "./de";
import { typoFr } from "../lib/typo";

/* Vor dem Livegang von einer bezahlten Muttersprachlerin aus der Romandie
   abnehmen lassen. Kein Satz darf ein Adjektiv an {name} angleichen müssen,
   und vor {name} steht kein "de" (sonst fehlt die Elision bei Vokal).
   Das Erstgespräch heisst überall "rendez-vous" ("entretien" hiesse
   auch Wartung). */

export const fr: Woerter = typoFr({
  meta: {
    titel: "Site internet pour petite entreprise, créé et suivi | Sherka",
    beschreibung:
      "Sites internet pour salons, cabinets, restaurants et artisans. Faits main, puis suivis, par une seule personne. Premier rendez-vous gratuit.",
    ogTitel: "Des sites qui travaillent.",
  },

  kopf: {
    zumInhalt: "Aller au contenu",
    navLabel: "Navigation principale",
    links: {
      arbeiten: "Exemples",
      entstehung: "Fait main",
      vorteile: "À propos",
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
    unter: "Je construis votre site et je le fais tourner. Vous vous occupez de vos clients.",
    cta: "Demander un rendez-vous",
    ctaHinweis: "Gratuit et sans engagement.",
    wahlTitel: "Faits par moi",
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
    titel: "Ne me croyez pas. Ouvrez les sites.",
    text: "De vrais clients, tous en ligne.",
    oeffnen: "Ouvrir",
    zurueck: "Exemple précédent",
    weiter: "Exemple suivant",
    bildAlt: "Page d'accueil de {domain}",
  },

  entstehung: {
    titel: "Un site en kit, vous le montez. Ici, c'est moi.",
    text: "Le salon est inventé. La méthode, non.",
    beispiel: "Exemple",
    codeLabel: "Code de cette étape",
    schritte: [
      { name: "Structure.", text: "Ce que vos clients cherchent est en haut." },
      { name: "Design.", text: "Vos couleurs, votre police." },
      { name: "Fonction.", text: "Un clic, et la demande vous arrive." },
      { name: "Google.", text: "Des horaires que Google sait lire." },
    ],
    vorschau: {
      name: "Salon Lumen",
      links: ["Prestations", "Équipe", "Contact"],
      titel: "Réserver, sans téléphoner.",
      text: "Choisissez un horaire. Nous confirmons par e-mail.",
      zeiten: ["mar. 10 h 00", "mar. 14 h 30", "mer. 9 h 00"],
      knopf: "Prendre rendez-vous",
      erfolg: "Demande envoyée",
    },
  },

  vorteile: {
    titel: "Qui construit reste.",
    kacheln: [
      { gross: "Je décroche.", text: "Pas de secrétariat. Vous parlez à celui qui a construit." },
      { gross: "Mon problème.", text: "Que le site tourne, c'est mon affaire. En kit, c'est la vôtre." },
      { gross: "On n'attend pas.", text: "La vitesse en haut, c'est vous qui l'avez mesurée. Je construis ainsi." },
    ],
  },

  ablauf: {
    titel: "À vous les textes et les images. À moi le reste.",
    schritte: [
      {
        zeit: "gratuit",
        was: "On se parle",
        text: "Vous dites ce qu'il vous faut. Je dis ce que je construis.",
      },
      {
        zeit: "par écrit",
        was: "Vous voyez la maquette",
        text: "L'aspect du site et ce que je construis.",
      },
      {
        zeit: "à la main",
        was: "Je construis",
        text: "Dès que j'ai vos textes et vos images. Rien n'est mis en ligne avant votre oui.",
      },
    ],
  },

  /* Steht unter dem Titel der Vorteile: die Person ist der Beleg, kein eigenes Kapitel. */
  person: {
    text: "Je suis Raffa Amro Elsherkasi, informaticien CFC de formation. Dans mon métier, j'ai fait tourner des systèmes. Maintenant, votre site.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "La technique, vous n'avez pas à la comprendre.",
    liste: [
      {
        frage: "Que dois-je fournir ?",
        antwort: "Quelques phrases sur votre entreprise, vos horaires et des photos, si vous en avez. Rien de plus.",
      },
      {
        frage: "J'ai déjà un site.",
        antwort: "Alors on ne repart pas de zéro. Ce qui est bon reste.",
      },
      {
        frage: "Et après, je dépends de vous ?",
        antwort: "Non. L'adresse internet est à votre nom, ou je vous la transfère.",
      },
    ],
  },

  kontakt: {
    titel: "Parlons de votre entreprise.",
    titelMitName: "{name} : parlons-en.",
    text: "Le rendez-vous est gratuit et sans engagement. Réponse sous un jour ouvrable.",
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
    erfolgText: "Merci, {name}. Je vous réponds sous un jour ouvrable.",
    erfolgEilig: "Urgent ? Écrivez-moi sur WhatsApp.",

    fehlerTitel: "Ça n'a pas marché",
    fehlerText: "Vos réponses sont toujours là. Réessayez, ou joignez-moi directement :",
    zuViele: "Trop de tentatives en peu de temps. Réessayez un peu plus tard, ou par téléphone ou WhatsApp.",
    aus: "Dans cet aperçu, le formulaire est désactivé.",

    pflichtAnliegen: "Choisissez de quoi il s'agit.",
    pflichtName: "Il manque votre nom.",
    pflichtErreichbar: "Indiquez une adresse e-mail ou un numéro de téléphone.",
    falscheMail: "Cette adresse e-mail semble incorrecte.",
    falschesTel: "Ce numéro de téléphone semble incorrect.",
    fehlerAnzahl: "Informations manquantes : {n}",

    datenschutzHinweis: "Je n'utilise vos données que pour vous répondre.",
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
