import type { Woerter } from "./de";
import { typoFr } from "../lib/typo";

/* Vor dem Livegang von einer bezahlten Muttersprachlerin aus der Romandie
   abnehmen lassen. Kein Satz darf ein Adjektiv an {name} angleichen müssen,
   und vor {name} steht kein "de" (sonst fehlt die Elision bei Vokal).
   Das Erstgespräch heisst überall "rendez-vous" ("entretien" hiesse
   auch Wartung). Stimme wie im Deutschen: ganze, ruhige Sätze mit Subjekt
   und Verb, keine Schlagworte, keine Gegensatzpaare. Die Texte sind keine
   Übersetzung, sondern so geschrieben, wie man sie in der Romandie sagt.
   Gerade Apostrophe und normale Leerzeichen genügen, typoFr setzt die
   französische Typografie. */

export const fr: Woerter = typoFr({
  meta: {
    titel: "Création de sites internet en Suisse qui amènent des clients | Sherka",
    beschreibung:
      "Nous créons des sites internet qui amènent des demandes et nous les entretenons. Vous modifiez vous-même textes, images et prix. Le premier rendez-vous est gratuit.",
    ogTitel: "Des sites internet pensés pour vous amener des clients.",
  },

  kopf: {
    zumInhalt: "Aller au contenu",
    navLabel: "Navigation principale",
    links: {
      arbeiten: "Réalisations",
      vorteile: "Avantages",
      leistungen: "Prestations",
      ablauf: "Déroulement",
      faq: "Questions",
    },
    anfragen: "Rendez-vous",
    themaHell: "Passer en mode clair",
    themaDunkel: "Passer en mode sombre",
    andereSprache: "Deutsch",
    andereSpracheKurz: "DE",
    menue: "Ouvrir le menu",
    menueZu: "Fermer le menu",
  },

  hero: {
    titel: "Plus de clients. Moins de tracas.",
    unter: "Beaucoup d'entreprises ont un beau site. Nous créons le vôtre pour qu'il vous amène des clients.",
    cta: "Prendre rendez-vous",
    ctaHinweis: "Gratuit et sans engagement.",
    wahlTitel: "Nos réalisations",
    zeigen: "Afficher {domain} sur l'appareil",
    laptopAlt: "{domain} sur un ordinateur portable",
    handyAlt: "{domain} sur un smartphone",
    messTitel: "Mesuré à l'instant sur votre appareil",
    messLcp: "Page affichée en",
    messFcp: "Premier contenu affiché en",
    messRichtLcp: "Google recommande : moins de 2,5 secondes",
    messRichtFcp: "Google recommande : moins de 1,8 seconde",
  },

  intro: {
    stark: "Le téléphone sonne et vous avez les mains prises.",
    rest: "Le client qui n'arrive pas à vous joindre appelle ailleurs. Votre site, lui, répond pendant que vous travaillez.",
  },

  arbeiten: {
    titel: "Vous ne nous croyez pas ? Ouvrez les sites.",
    oeffnen: "Ouvrir",
    zurueck: "Exemple précédent",
    weiter: "Exemple suivant",
    bildAlt: "Page d'accueil de {domain}",
  },

  vorteile: {
    titel: "Un site qui vous rapporte.",
    kacheln: [
      {
        gross: "Vos clients vous trouvent avant de tomber sur la concurrence.",
        text: "Nous construisons votre site pour que Google y trouve vos prestations et vos horaires d'ouverture.",
      },
      {
        gross: "Les demandes arrivent même une fois votre journée terminée.",
        text: "Vos clients vous écrivent directement depuis le site au lieu d'essayer de vous appeler.",
      },
      {
        gross: "C'est nous qui nous occupons de la technique.",
        text: "Nous tenons votre site à jour. Textes, images et prix, vous les modifiez vous-même quand vous voulez.",
      },
    ],
  },

  leistungen: {
    titel: "Ce que nous faisons pour vous.",
    liste: [
      {
        was: "Site internet ou boutique en ligne",
        text: "Un site pour votre entreprise, si vous le souhaitez avec boutique, réservation ou billetterie.",
      },
      {
        was: "Modifier vous-même le contenu",
        text: "Vous adaptez vous-même textes, images et prix, depuis votre téléphone ou votre ordinateur.",
      },
      {
        was: "Être trouvé sur Google",
        text: "Nous créons votre fiche d'établissement Google et annonçons votre site à Google.",
      },
      {
        was: "Hébergement et suivi",
        text: "Votre site est hébergé sur des serveurs en Suisse. Nous nous chargeons des mises à jour et des sauvegardes.",
      },
    ],
  },

  ablauf: {
    titel: "Vous voyez à quoi ressemblera votre site avant que nous commencions.",
    schritte: [
      { was: "Vous nous présentez votre entreprise.", text: "Sur cette base, nous définissons le concept ensemble." },
      { was: "Vous recevez une première maquette.", text: "Vous nous dites ce que vous aimeriez y changer." },
      { was: "Avec votre feu vert, nous nous mettons au travail.", text: "Nous ne mettons votre site en ligne que lorsque vous êtes d'accord." },
    ],
  },

  person: {
    titel: "Qui se cache derrière Sherka.",
    text: "Raffa Amro Elsherkasi, informaticien CFC. C'est lui que vous rencontrez dès le premier rendez-vous, et c'est lui qui construit votre site.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "Vous n'avez pas besoin de vous y connaître en informatique.",
    liste: [
      {
        frage: "Qu'est-ce que je dois vous fournir ?",
        antwort: "Il nous faut quelques lignes sur votre entreprise, vos horaires d'ouverture et, si vous en avez, des photos.",
      },
      {
        frage: "J'ai déjà un site internet.",
        antwort: "Nous le passons en revue ensemble et nous gardons ce qui fonctionne.",
      },
      {
        frage: "Et après, je dépends de vous ?",
        antwort: "Non, l'adresse de votre site est enregistrée à votre nom, ou nous la mettons à votre nom.",
      },
    ],
  },

  kontakt: {
    titel: "Présentez-nous votre entreprise.",
    titelMitName: "Présentez-nous {name}.",
    text: "Le premier rendez-vous est gratuit et sans engagement. Nous vous répondons dans un délai d'un jour ouvrable.",
    whatsapp: "WhatsApp",
    whatsappText: "Bonjour, je réfléchis à un site internet pour {betrieb}. Auriez-vous un moment pour en parler ?",
    whatsappOhne: "mon entreprise",
    telefon: "Téléphone",
    mail: "E-mail",

    anliegenLabel: "De quoi s'agit-il ?",
    anliegen: [
      { wert: "neu", text: "Un nouveau site" },
      { wert: "ueberarbeiten", text: "Revoir mon site actuel" },
      { wert: "anwendung", text: "Un outil pour remplacer mes listes Excel" },
      { wert: "offen", text: "Je ne sais pas encore" },
    ],
    betriebLabel: "Comment s'appelle votre entreprise ?",
    zeitLabel: "C'est pour quand ?",
    zeit: [
      { wert: "bald", text: "Dès que possible" },
      { wert: "monate", text: "Dans les prochains mois" },
      { wert: "umschauen", text: "Je me renseigne pour l'instant" },
    ],
    textLabel: "En quelques mots",
    textPlatzhalter: "Par exemple : salon de coiffure, réservation en ligne, remplacer l'ancien site",
    textHinweis: "Merci de ne pas indiquer de données de santé ou de patients.",
    nameLabel: "Votre nom",
    mailLabel: "E-mail",
    telLabel: "Téléphone",
    erreichbarHinweis: "Un e-mail ou un numéro de téléphone suffit.",
    freiwillig: "Facultatif",

    senden: "Demander un rendez-vous",
    sendet: "Envoi en cours",

    erfolgTitel: "Bien reçu",
    erfolgText: "Merci, {name}. Nous revenons vers vous dans un délai d'un jour ouvrable.",
    erfolgEilig: "Si c'est urgent, écrivez-nous sur WhatsApp.",

    fehlerTitel: "Le message n'est pas parti",
    fehlerText: "Vos informations sont toujours là. Réessayez ou contactez-nous directement :",
    zuViele:
      "Il y a eu trop d'essais en peu de temps. Merci de réessayer un peu plus tard ou de nous contacter par téléphone ou sur WhatsApp.",
    aus: "Le formulaire est désactivé dans cet aperçu.",

    pflichtAnliegen: "Indiquez-nous de quoi il s'agit.",
    pflichtName: "Il manque encore votre nom.",
    pflichtErreichbar: "Indiquez une adresse e-mail ou un numéro de téléphone.",
    falscheMail: "Il y a une erreur dans cette adresse e-mail.",
    falschesTel: "Il y a une erreur dans ce numéro de téléphone.",
    fehlerAnzahl: "Champs à compléter : {n}",

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
    instagram: "Instagram",
  },

  nichtGefunden: {
    titel: "Cette page n'existe pas",
    text: "Ce lien n'est peut-être plus à jour. Vous pouvez repartir de la page d'accueil.",
    zurueck: "Retour à l'accueil",
  },
});
