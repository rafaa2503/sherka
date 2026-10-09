import type { Woerter } from "./de";
import { typoFr } from "../lib/typo";

/* Vor dem Livegang von einer bezahlten Muttersprachlerin aus der Romandie
   abnehmen lassen. Die Begriffe der Bautafel folgen dem Gebrauch auf
   Westschweizer Bautafeln (Maître de l'ouvrage, Conception et réalisation).
   Kein Satz darf ein Adjektiv an {name} angleichen müssen. */

export const fr: Woerter = typoFr({
  meta: {
    titel: "Création de site internet à Bienne pour PME et artisans | Sherka",
    beschreibung:
      "Raffa Amro Elsherkasi crée des sites web pour salons, cabinets, restaurants et artisans, et en assure ensuite l'entretien. Bilingues, faits à la main. Le premier entretien est gratuit.",
    ogTitel: "Ici se construit votre site web.",
  },

  kopf: {
    zumInhalt: "Aller au contenu",
    navLabel: "Navigation principale",
    links: {
      abnahme: "Réalisations",
      hauswartung: "Entretien",
      ablauf: "Déroulement",
      person: "À propos",
      faq: "Questions",
    },
    anfragen: "Parler de votre projet",
    anfragenKurz: "Contact",
    themaHell: "Passer en affichage clair",
    themaDunkel: "Passer en affichage sombre",
    andereSprache: "Deutsch",
    andereSpracheKurz: "DE",
    menue: "Ouvrir le menu",
    menueZu: "Fermer le menu",
  },

  tafel: {
    titelOben: "Ici se construit",
    titelUnten: "votre site web.",
    unterzeile:
      "Indiquez le nom de votre entreprise ou choisissez votre activité. Le site se construit sous forme d'esquisse.",
    tafelLabel: "Panneau de chantier",
    bauherrschaft: "Maître de l'ouvrage",
    platzhalter: "p. ex. Coiffure Anna",
    feldHinweis: "Rien n'est envoyé. Reste dans cette fenêtre jusqu'à votre demande.",
    branche: "Activité",
    planung: "Conception et réalisation",
    planungWer: "Raffa Amro Elsherkasi, Bienne",
    hauswartung: "Entretien",
    hauswartungWer: "Raffa Amro Elsherkasi",
    ihrBetrieb: "Votre entreprise",
    entwurfFuer: "Esquisse pour {name}. La version réelle se dessine au premier entretien.",
    cta: "Parler de votre projet",
    whatsapp: "Écrire sur WhatsApp",
    vorschauLabel: "Esquisse du site web pour {name}",
    vorschauSprache: "Langue de l'esquisse",
    status: "Esquisse pour {name} construite, activité {branche}.",
    fotos: "Ici, vos photos",
    nichtsGesendet: "Rien n'est envoyé depuis l'esquisse.",
    abgenommen: "Réceptionné",
    messungLcp: "Cette page était lisible après {s} s.",
    messungLaden: "Cette page était chargée après {s} s.",
    ueberspringen: "Passer la construction",
  },

  abnahme: {
    titel: "Réception des travaux",
    text: "Avant la remise, un ouvrage est contrôlé point par point. Voici quatre vrais sites que j'ai réalisés. Tous sont en ligne, ouvrez-les vous-même.",
    betrieb: "Entreprise",
    domain: "Adresse",
    domainKunde: "enregistrée au nom du client",
    domainSherka: "gérée par moi, transférée au client sur simple demande",
    pruefpunkte: "Points de contrôle",
    oeffnen: "Ouvrir le site",
    live: "Voir en direct ici",
    liveHinweis: "Charge le site du client dans cette fenêtre. Son exploitant reçoit alors votre adresse IP.",
    liveZu: "Fermer l'aperçu en direct",
    ladezeit: "Temps de chargement sur mobile",
    gemessen: "mesuré le",
    bildAlt: "Page d'accueil de {domain}",
  },

  hauswartung: {
    titel: "Entretien",
    text: "Une fois en ligne, le site doit continuer à tourner. Je m'en occupe, vous n'avez personne à former.",
    zeilen: [
      {
        was: "Hébergement",
        text: "Votre site tourne sur un serveur dont je m'occupe. Vous n'avez besoin d'aucun compte.",
      },
      {
        was: "Adresse",
        text: "Votre domaine est enregistré à votre nom, ou je le gère pour vous et le transfère à votre nom sur simple demande.",
      },
      {
        was: "Mises à jour",
        text: "Je me charge des mises à jour techniques. Les petites modifications de textes ou d'horaires, vous me les envoyez par e-mail ou WhatsApp.",
      },
      {
        was: "Pannes",
        text: "Si le site ne fonctionne plus, je m'en occupe.",
      },
    ],
    leistungenTitel: "Ce que je réalise",
    leistungen: [
      { was: "Nouveaux sites web", text: "En une ou deux langues, de la page unique à la présence complète." },
      { was: "Demandes de rendez-vous et réservations", text: "Les demandes arrivent par le site, plutôt que par téléphone entre deux clients." },
      { was: "Petites applications web", text: "Pour les processus qui passent aujourd'hui par Excel et WhatsApp." },
      { was: "Refonte d'un site existant", text: "Le rendre plus rapide et plus utile, sans repartir de zéro." },
    ],
  },

  ablauf: {
    titel: "Comment ça se passe",
    schritte: [
      {
        zeit: "20 minutes",
        was: "Premier entretien, gratuit",
        text: "Je demande ce que le site doit pouvoir faire. Vous demandez ce que je sais faire. Ensuite, nous savons tous les deux si cela vous convient.",
      },
      {
        zeit: "par écrit",
        was: "Esquisse",
        text: "Vous voyez à quoi ressemble le site et ce qu'il sait faire. Avec, par écrit, ce qui sera réalisé et pour quand.",
      },
      {
        zeit: "2 à 4 semaines",
        was: "Construction",
        text: "À partir du jour où les textes et les images sont là. Entre-temps, vous recevez un lien pour suivre l'avancement.",
      },
      {
        zeit: "avant la mise en ligne",
        was: "Réception",
        text: "Nous passons tout en revue ensemble. Ce qui ne va pas, je le corrige.",
      },
      {
        zeit: "ensuite",
        was: "Exploitation",
        text: "L'hébergement, l'adresse et les petites modifications restent chez moi.",
      },
    ],
  },

  person: {
    titel: "Qui construit votre site",
    text: "Je suis Raffa Amro Elsherkasi et je travaille depuis Bienne. J'ai une formation de développeur d'applications CFC, puis j'ai été DevOps Engineer, là où les systèmes doivent tourner. C'est pourquoi je ne me contente pas de construire votre site : je l'exploite aussi.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "Ce que vous vous demandez",
    liste: [
      {
        frage: "Combien de temps cela prend-il vraiment ?",
        antwort:
          "Deux à quatre semaines, à partir du moment où vos textes et vos images sont là. Cette partie prend en général plus de temps que la construction.",
      },
      {
        frage: "Que dois-je préparer ?",
        antwort:
          "Quelques phrases sur votre entreprise, les horaires et des photos si vous en avez. Ce qui manque, nous en parlons au premier entretien.",
      },
      {
        frage: "Puis-je modifier les textes moi-même ?",
        antwort: "Sur demande, oui, avec un système de gestion de contenu comme pour takabul.ch. Sinon, je les modifie pour vous.",
      },
      {
        frage: "Et si je veux encore changer quelque chose après ?",
        antwort:
          "À la réception, je corrige ce qui ne va pas. Les souhaits ultérieurs, vous me les envoyez par e-mail ou WhatsApp, et nous en parlons.",
      },
      {
        frage: "À qui appartient l'adresse de mon site ?",
        antwort:
          "Soit le domaine est enregistré à votre nom, soit je le gère pour vous et le transfère à votre nom sur simple demande.",
      },
      {
        frage: "J'ai un cabinet. Qu'en est-il des données de patients ?",
        antwort:
          "Au premier entretien, nous clarifions quelles informations un formulaire peut demander et où elles aboutissent. Les données de santé n'ont pas leur place dans un formulaire de contact ordinaire.",
      },
    ],
  },

  kontakt: {
    titel: "Dites-moi ce dont vous avez besoin",
    titelMitName: "Dites-moi ce dont {name} a besoin",
    text: "Le premier entretien est gratuit. Je réponds dans un délai d'un jour ouvrable. Si c'est urgent, écrivez sur WhatsApp ou appelez-moi.",
    whatsapp: "WhatsApp",
    whatsappText: "Bonjour, je m'intéresse à un site web pour {betrieb}. Auriez-vous le temps pour un premier entretien ?",
    whatsappOhne: "mon entreprise",
    telefon: "Téléphone",
    mail: "E-mail",

    anliegenLabel: "De quoi s'agit-il ?",
    anliegen: [
      { wert: "neu", text: "Nouveau site" },
      { wert: "ueberarbeiten", text: "Refonte d'un site existant" },
      { wert: "anwendung", text: "Application ou outil" },
      { wert: "offen", text: "Je ne sais pas encore" },
    ],
    betriebLabel: "Votre entreprise",
    zeitLabel: "Pour quand ?",
    zeit: [
      { wert: "bald", text: "Dès que possible" },
      { wert: "monate", text: "Dans les prochains mois" },
      { wert: "umschauen", text: "Je me renseigne d'abord" },
    ],
    textLabel: "Que doit pouvoir faire le site ?",
    textPlatzhalter: "Deux ou trois phrases suffisent",
    textHinweis: "Merci de ne pas indiquer de données de santé ou de patients.",
    nameLabel: "Votre nom",
    mailLabel: "E-mail",
    telLabel: "Téléphone",
    erreichbarHinweis: "E-mail ou téléphone, l'un des deux suffit.",
    freiwillig: "Facultatif",

    senden: "Envoyer la demande",
    sendet: "Envoi en cours",

    erfolgTitel: "Bien reçu",
    erfolgText: "Merci, {name}. Je vous réponds dans un délai d'un jour ouvrable.",
    erfolgEilig: "C'est urgent ? Écrivez sur WhatsApp.",

    fehlerTitel: "Cela n'a pas fonctionné",
    fehlerText: "Vos indications sont toujours là. Réessayez, ou joignez-moi directement :",
    zuViele: "Trop de tentatives en peu de temps. Réessayez un peu plus tard, ou par téléphone ou WhatsApp.",
    aus: "Dans cet aperçu, le formulaire est désactivé.",

    pflichtAnliegen: "Choisissez de quoi il s'agit.",
    pflichtName: "Votre nom manque encore.",
    pflichtErreichbar: "Indiquez une adresse e-mail ou un numéro de téléphone.",
    falscheMail: "Cette adresse e-mail ne semble pas valable.",
    falschesTel: "Ce numéro de téléphone ne semble pas valable.",
    fehlerAnzahl: "{n} indications manquent encore.",

    datenschutzHinweis: "J'utilise vos indications uniquement pour vous répondre.",
  },

  aktionsleiste: {
    label: "Contact rapide",
    anrufen: "Appeler",
    anfragen: "Premier entretien",
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
    zurueck: "Vers la page d'accueil",
  },
});
