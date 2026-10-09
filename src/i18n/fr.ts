import type { Woerter } from "./de";

/* Vor dem Livegang von einer Muttersprachlerin aus der Romandie gegenlesen
   lassen. Die gröbsten Übersetzungsfehler aus dem Kundentest sind bereits
   korrigiert (langues d'origine, reprise statt refonte, savoir faire). */

export const fr: Woerter = {
  meta: {
    titel: "Sherka. Sites web pour les entreprises de Bienne, Berne et du Seeland",
    beschreibung:
      "Des sites web et de petites applications qui remplissent une tâche : prendre des rendez-vous, recevoir des commandes, fonctionner en deux langues.",
  },

  nav: {
    zumInhalt: "Aller au contenu",
    bau: "Comment naît un site",
    arbeiten: "Réalisations",
    leistungen: "Prestations",
    ablauf: "Déroulement",
    person: "À propos",
    kontakt: "Contact",
    anfragen: "Demander un projet",
    themaHell: "Passer en affichage clair",
    themaDunkel: "Passer en affichage sombre",
    sprache: "Langue",
    menue: "Menu",
    menueZu: "Fermer le menu",
  },

  hero: {
    rolle: "Développeur web à Bienne",
    titelOben: "Votre site doit servir à quelque chose.",
    titelUnten: "Pas seulement exister.",
    text: "Prendre des rendez-vous, recevoir des commandes, fonctionner en deux langues. Construit à la main, pour les entreprises de Bienne, Berne et du Seeland.",
    cta: "Demander un projet",
    whatsapp: "Écrire sur WhatsApp",
    bildAlt: "bern-zahnarzt-team.ch sur téléphone, un site de cabinet réalisé par Sherka",
    live: "Voici le vrai site d'un cabinet dentaire, en direct. Faites défiler et cliquez.",
  },

  bau: {
    titel: "Comment naît un site",
    text: "Un exemple, pas un projet client. Faites défiler : à gauche le code, à droite ce que voit votre clientèle.",
    beispiel: "Exemple",
    codeLabel: "Code",
    schritte: [
      { name: "Structure", text: "D'abord l'ossature : ce qui va où, sans aucune couleur." },
      { name: "Mise en forme", text: "Typographie, couleur, espacements. Tout part de quelques valeurs, pour que l'ensemble tienne." },
      { name: "Fonction", text: "Le formulaire vérifie les saisies et les envoie. Un clic, une demande." },
      { name: "Bilingue et référencé", text: "Allemand et français, plus le balisage grâce auquel Google affiche lui-même les horaires." },
    ],
    chips: ["Bilingue", "Formulaire", "Lisible par Google"],
  },

  arbeiten: {
    titel: "Quatre sites en service",
    text: "Les quatre sont en ligne. Ouvrez-les et voyez par vous-même.",
    besuchen: "Ouvrir le site",
    branche: "Entreprise",
    domain: "Domaine",
    domainKunde: "enregistré au nom du client",
    domainSherka: "géré par Sherka, transféré au client sur simple demande",
    ladezeit: "Temps de chargement sur mobile",
    gemessen: "mesuré le",
    auchDafuer: "Salon, cabinet ou artisanat ? Aussi.",
  },

  leistungen: {
    titel: "Ce que je fais",
    liste: [
      {
        was: "Nouveau site",
        text: "En une ou plusieurs langues, de la page unique à la présence complète.",
      },
      {
        was: "Rendez-vous et réservations",
        text: "Les demandes arrivent par le site, plutôt que par téléphone entre deux clients.",
      },
      {
        was: "Petites applications web",
        text: "Pour les processus qui passent aujourd'hui par Excel et WhatsApp.",
      },
      {
        was: "Refonte d'un site existant",
        text: "Le rendre plus rapide et plus utile, sans repartir de zéro.",
      },
    ],
  },

  stimmen: {
    titel: "Ce que disent les clients",
    platzhalter: true,
    liste: [
      {
        zitat:
          "Avant, les rendez-vous se prenaient uniquement par téléphone, souvent au milieu d'un traitement. Maintenant les demandes arrivent par le site et nous les traitons entre deux.",
        name: "Dr méd. dent. Mustafa Saleh",
        rolle: "Cabinet dentaire Saleh, Berne",
      },
      {
        zitat:
          "Notre carte était un PDF sur le site, personne ne l'ouvrait sur téléphone. Maintenant on la voit tout de suite, en allemand et en français.",
        name: "Bledi",
        rolle: "Restaurant marocain, Bienne/Biel",
      },
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
        zeit: "2 jours ouvrables",
        was: "Offre",
        text: "Périmètre fixe, date fixe, par écrit. Si quelque chose s'ajoute, nous en parlons avant.",
      },
      {
        zeit: "2 à 4 semaines",
        was: "Réalisation",
        text: "Vous recevez un lien pour suivre l'avancement, pas seulement à la fin.",
      },
      {
        zeit: "ensuite",
        was: "Suivi",
        text: "Je continue à faire les petites modifications. Vous n'avez personne à former.",
      },
    ],
  },

  faq: {
    titel: "Ce que vous vous demandez",
    liste: [
      {
        frage: "Vous travaillez seul. Et si vous n'êtes plus disponible ?",
        antwort:
          "Votre site est hébergé chez moi, je m'occupe de l'hébergement et de l'exploitation. L'adresse (le domaine) reste entre vos mains : elle est enregistrée à votre nom, ou je la transfère à votre nom quand vous le souhaitez. Ainsi, votre présence en ligne ne dépend jamais de moi.",
      },
      {
        frage: "Et si je veux encore changer quelque chose après ?",
        antwort:
          "Une série de corrections fait partie de l'offre. Ce qui va au-delà, nous en parlons avant, pour éviter toute surprise à la fin.",
      },
      {
        frage: "Puis-je modifier les textes moi-même ?",
        antwort:
          "Sur demande, oui. Un système de gestion de contenu s'ajoute alors, comme pour takabul.ch. Sinon, je modifie les textes pour vous.",
      },
      {
        frage: "Combien de temps cela prend-il vraiment ?",
        antwort:
          "Deux à quatre semaines, à partir du moment où vos textes et vos images sont là. Cette partie prend en général plus de temps que la réalisation.",
      },
      {
        frage: "Vous travaillez avec des données de patients ?",
        antwort:
          "Dans ce cas, nous clarifions lors du premier entretien quelles informations un formulaire peut demander et où elles aboutissent. Les données de santé n'ont pas leur place dans un formulaire de contact ordinaire.",
      },
    ],
  },

  person: {
    titel: "Qui construit",
    text1:
      "Raffa Amro Elsherkasi, Bienne. Développeur d'applications CFC, puis DevOps Engineer. Je construis des sites web et je veille ensuite à ce qu'ils fonctionnent.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  kontakt: {
    titel: "Dites-moi ce dont vous avez besoin",
    text: "Réponse en un jour ouvrable. Si c'est urgent, écrivez sur WhatsApp ou appelez-moi.",
    whatsapp: "WhatsApp",
    telefon: "Téléphone",
    mail: "E-mail",

    projektLabel: "De quoi s'agit-il ?",
    projektOptionen: [
      "Nouveau site",
      "Refonte d'un site existant",
      "Application ou outil",
      "Je ne sais pas encore",
    ],
    zeitLabel: "Pour quand ?",
    zeitOptionen: ["Dès que possible", "Dans les prochains mois", "Je me renseigne d'abord"],

    beschreibungLabel: "Que doit pouvoir faire le site ?",
    beschreibungHinweis: "Facultatif",
    beschreibungPlatzhalter: "Deux ou trois phrases suffisent",

    nameLabel: "Nom",
    mailLabel: "E-mail",
    telLabel: "Téléphone",
    telHinweis: "Facultatif",

    senden: "Envoyer la demande",
    sendet: "Envoi en cours",

    erfolgTitel: "Bien reçu",
    erfolgText: "Je vous réponds en un jour ouvrable.",

    fehlerTitel: "Cela n'a pas fonctionné",
    fehlerText: "Appelez-moi ou écrivez à raffa.amro@gmail.com, ainsi votre message arrivera à coup sûr.",

    pflichtProjekt: "Indiquez de quoi il s'agit.",
    pflichtZeit: "Indiquez pour quand.",
    pflichtName: "Votre nom manque encore.",
    pflichtMail: "Cette adresse n'est pas correcte.",

    datenschutzHinweis: "J'utilise vos données uniquement pour vous répondre.",
  },

  fuss: {
    ort: "Bienne/Biel",
    impressum: "Mentions légales",
    datenschutz: "Protection des données",
  },
};
