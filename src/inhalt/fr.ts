import type { Woerter } from "./de";
import { typoFr } from "../lib/typo";

/* Vor dem Livegang von einer bezahlten Muttersprachlerin aus der Romandie
   abnehmen lassen. Kein Satz darf ein Adjektiv an {name} angleichen müssen,
   und vor {name} steht kein "de" (sonst fehlt die Elision bei Vokal). */

export const fr: Woerter = typoFr({
  meta: {
    titel: "Site internet à Bienne pour votre entreprise | Sherka",
    beschreibung:
      "Sites internet pour salons, cabinets, restaurants et artisans à Bienne. En français et en allemand, créés puis suivis. Premier entretien gratuit.",
    ogTitel: "Des sites qui travaillent.",
  },

  kopf: {
    zumInhalt: "Aller au contenu",
    navLabel: "Navigation principale",
    links: {
      arbeiten: "Exemples",
      entstehung: "Coulisses",
      vorteile: "Pourquoi Sherka",
      ablauf: "Étapes",
      faq: "Questions",
    },
    anfragen: "Parlons-en",
    themaHell: "Passer en affichage clair",
    themaDunkel: "Passer en affichage sombre",
    andereSprache: "Deutsch",
    andereSpracheKurz: "DE",
    menue: "Ouvrir le menu",
    menueZu: "Fermer le menu",
  },

  hero: {
    titel: "Plus de clients. Moins d'efforts.",
    unter: "Votre site amène des demandes, en français et en allemand. À Bienne, je le crée et m'en occupe pour vous.",
    cta: "Demander un entretien",
    wahlTitel: "Quatre sites en ligne",
    zeigen: "Afficher {domain} dans l'appareil",
    laptopAlt: "{domain} sur un ordinateur portable",
    handyAlt: "{domain} sur un téléphone",
    messTitel: "Vitesse de ce site, mesurée chez vous",
    messLcp: "L'essentiel visible après",
    messFcp: "Premier contenu visible après",
    messRichtLcp: "Google recommande : moins de 2,5 secondes",
    messRichtFcp: "Google recommande : moins de 1,8 seconde",
  },

  intro: {
    stark: "Le téléphone sonne en plein travail.",
    rest: "Encore quelqu'un qui veut juste vos horaires, parce que le site n'est plus à jour. Un bon site répond lui-même et prend les demandes pendant que vous travaillez.",
  },

  arbeiten: {
    titel: "Quatre sites. Tous en ligne.",
    text: "Ce sont les sites de vraies entreprises. Ouvrez-les et jugez par vous-même.",
    domainKunde: "Adresse internet au nom du client",
    domainSherka: "Adresse internet chez Sherka, transférée au client sur demande",
    oeffnen: "Voir le site",
    zurueck: "Exemple précédent",
    weiter: "Exemple suivant",
    bildAlt: "Page d'accueil de {domain}",
  },

  entstehung: {
    titel: "Comment naît un site.",
    text: "Ici avec un salon inventé. Pour votre site, je m'y prends de la même façon.",
    beispiel: "Exemple",
    codeLabel: "Code de cette étape",
    schritte: [
      { name: "Structure.", text: "D'abord l'ordre, encore sans couleur : ce que vos clients cherchent vient en haut." },
      { name: "Design.", text: "Une police et des couleurs qui vous ressemblent. Peu, pour que l'ensemble reste calme." },
      { name: "Fonction.", text: "Un clic, et la demande de rendez-vous vous arrive. Les fautes de frappe sont repérées avant l'envoi." },
      { name: "Bilingue et sur Google.", text: "Français et allemand. Avec les indications qui permettent à Google d'afficher correctement vos horaires." },
    ],
    vorschau: {
      name: "Salon Lumen",
      links: ["Prestations", "Équipe", "Contact"],
      titel: "Réserver, sans téléphoner.",
      text: "Choisissez un horaire. Nous confirmons par e-mail.",
      titelFr: "Termin buchen, ohne anzurufen.",
      textFr: "Wählen Sie eine Zeit. Wir bestätigen per E-Mail.",
      zeiten: ["mar. 10 h 00", "mar. 14 h 30", "mer. 9 h 00"],
      knopf: "Prendre rendez-vous",
      erfolg: "Demande envoyée",
    },
  },

  vorteile: {
    titel: "Pourquoi Sherka.",
    kacheln: [
      { gross: "FR et DE", text: "Votre clientèle parle les deux langues. Votre site aussi, dès le départ." },
      { gross: "Fait main", text: "Créé pour votre entreprise, sans modèle tout fait. Vous ne gérez rien." },
      { gross: "Une personne", text: "Je crée le site et je reste là ensuite. Vous n'expliquez tout qu'une fois." },
      { gross: "20 minutes", text: "C'est la durée du premier entretien, gratuit. Vous décidez ensuite." },
      { gross: "1 jour", text: "Vous avez ma réponse en un jour ouvrable." },
      { gross: "Votre adresse", text: "L'adresse internet est à votre nom, ou je la transfère à votre nom sur demande." },
    ],
    leistungenTitel: "Ce que je crée.",
    leistungen: [
      { was: "Nouveaux sites.", text: "En une ou deux langues, de la page unique au site complet." },
      { was: "Rendez-vous et réservations.", text: "Vos clients passent par le site au lieu d'appeler pendant que vous vous occupez de quelqu'un." },
      { was: "Outils d'organisation.", text: "Listes et plannings qui passent aujourd'hui par Excel et WhatsApp." },
      { was: "Retravailler un site existant.", text: "Le rendre plus rapide et plus utile, sans que vous repartiez de zéro." },
    ],
  },

  ablauf: {
    titel: "Étape par étape",
    schritte: [
      {
        zeit: "20 minutes",
        was: "Premier entretien",
        text: "Vous dites ce qu'il faut à votre entreprise. Je dis ce que je peux en réaliser. Après, nous savons tous deux si cela convient.",
      },
      {
        zeit: "par écrit",
        was: "Maquette",
        text: "Vous voyez à quoi ressemblera votre site. Je note aussi par écrit ce que je réalise et pour quand.",
      },
      {
        zeit: "2 à 4 semaines",
        was: "Création",
        text: "À partir du jour où j'ai vos textes et vos images. En cours de route, je vous envoie un lien pour regarder.",
      },
      {
        zeit: "avant la mise en ligne",
        was: "Dernier contrôle",
        text: "Nous regardons tout ensemble. Ce qui ne va pas, je le corrige.",
      },
      {
        zeit: "ensuite",
        was: "Suivi",
        text: "Que le site fonctionne, c'est mon travail, pas le vôtre. Les petits changements, vous me les envoyez, je m'en charge.",
      },
    ],
  },

  person: {
    titel: "Qui crée votre site",
    text: "Je m'appelle Raffa Amro Elsherkasi et je travaille depuis Bienne. J'ai appris le métier d'informaticien (CFC en développement d'applications). Ensuite, mon travail a été de faire tourner des systèmes. Voilà pourquoi, pour moi, rien ne s'arrête à la mise en ligne : je reste responsable, et vous me joignez directement.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "Vous vous demandez",
    liste: [
      {
        frage: "Combien de temps, vraiment ?",
        antwort:
          "Deux à quatre semaines, dès que j'ai vos textes et vos images. La date à laquelle le site sera prêt, vous la recevez avant, par écrit.",
      },
      {
        frage: "Que dois-je préparer ?",
        antwort:
          "Peu de choses : quelques phrases sur votre entreprise, vos horaires et des photos si vous en avez. Ce qui manque, nous le voyons au premier entretien.",
      },
      {
        frage: "Changer les textes moi-même ?",
        antwort: "Oui, si vous le souhaitez, comme le fait le client de takabul.ch. Sinon, vous m'envoyez le nouveau texte et je le change.",
      },
      {
        frage: "Et si je veux changer quelque chose après ?",
        antwort:
          "Vous m'écrivez par e-mail ou WhatsApp. Les gros changements, nous en parlons brièvement. Les petits, je les fais.",
      },
      {
        frage: "Je n'y connais rien en informatique. Ça ira ?",
        antwort:
          "Oui. Il me faut seulement vos textes, vos images et quelques réponses. Toute la technique, je m'en charge, avant la mise en ligne et après.",
      },
      {
        frage: "J'ai un cabinet. Et les données des patients ?",
        antwort:
          "Les données de santé n'ont pas leur place dans un formulaire de contact ordinaire. Nous voyons donc au premier entretien ce que votre formulaire peut demander et où vont les réponses.",
      },
    ],
  },

  kontakt: {
    titel: "Parlons de votre entreprise",
    titelMitName: "{name} : parlons-en",
    text: "Le premier entretien est gratuit, et vous parlez directement à celui qui crée votre site. Quelques mots suffisent. Je réponds sous un jour ouvrable. Si ça presse : WhatsApp ou téléphone.",
    whatsapp: "WhatsApp",
    whatsappText: "Bonjour, je m'intéresse à un site internet pour {betrieb}. Auriez-vous un moment pour un bref premier entretien ?",
    whatsappOhne: "mon entreprise",
    telefon: "Téléphone",
    mail: "E-mail",

    anliegenLabel: "De quoi s'agit-il ?",
    anliegen: [
      { wert: "neu", text: "Nouveau site" },
      { wert: "ueberarbeiten", text: "Retravailler un site existant" },
      { wert: "anwendung", text: "Outil d'organisation" },
      { wert: "offen", text: "Je ne sais pas encore" },
    ],
    betriebLabel: "Votre entreprise",
    zeitLabel: "Est-ce urgent ?",
    zeit: [
      { wert: "bald", text: "Dès que possible" },
      { wert: "monate", text: "Dans les prochains mois" },
      { wert: "umschauen", text: "Je me renseigne d'abord" },
    ],
    textLabel: "Que devrais-je déjà savoir ?",
    textPlatzhalter: "Par exemple : salon de coiffure, rendez-vous en ligne, bilingue",
    textHinweis: "Pas de données de santé ni de patients, merci.",
    nameLabel: "Votre nom",
    mailLabel: "E-mail",
    telLabel: "Téléphone",
    erreichbarHinweis: "E-mail ou téléphone, un seul suffit.",
    freiwillig: "Facultatif",

    senden: "Demander un entretien",
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
    anfragen: "Parlons-en",
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
