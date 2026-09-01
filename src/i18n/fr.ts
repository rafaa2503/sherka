import type { Woerter } from "./de";

export const fr: Woerter = {
  meta: {
    titel: "Sherka. Sites web pour les entreprises de Bienne, Berne et du Seeland",
    beschreibung:
      "Des sites web et de petites applications qui font un vrai travail : prendre des rendez-vous, recevoir des commandes, fonctionner en deux langues. Dès CHF 1'000.",
  },

  nav: {
    zumInhalt: "Aller au contenu",
    arbeiten: "Réalisations",
    leistungen: "Prestations",
    person: "À propos",
    ablauf: "Déroulement",
    kontakt: "Contact",
    anfragen: "Demander un devis",
    themaHell: "Passer en affichage clair",
    themaDunkel: "Passer en affichage sombre",
    sprache: "Langue",
  },

  hero: {
    rolle: "Développeur web à Bienne",
    titelOben: "Votre site doit savoir faire quelque chose.",
    titelUnten: "Pas seulement exister.",
    text: "Prendre des rendez-vous, recevoir des commandes, fonctionner en deux langues. Construit par un développeur, pas à partir d'un modèle.",
    cta: "Demander un devis",
    cta2: "Voir les réalisations",
  },


  arbeiten: {
    titel: "Quatre sites qui travaillent",
    text: "Un restaurant, un cabinet dentaire, un négociant en matières premières, une plateforme d'événements. Les quatre sont en ligne et vous pouvez les ouvrir.",
    besuchen: "Ouvrir le site",
    tafelKopf: "En service",
    tafelStatus: "en ligne",
    bildFehlt: "Capture à venir",
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
        text: "Les demandes arrivent sur le site, plutôt que par téléphone entre deux clients.",
      },
      {
        was: "Petites applications web",
        text: "Pour les processus qui passent aujourd'hui par Excel et WhatsApp.",
      },
      {
        was: "Reprise d'un site existant",
        text: "Le rendre plus rapide et plus utile, sans repartir de zéro.",
      },
    ],
  },

  aussage: "Chacun de ces sites est construit à la main. Pas de thème, pas de constructeur, pas d'empilement de plugins qui finit par casser.",

  branchen: {
    titel: "Pour qui je construis",
    text: "Quatre secteurs où quelque chose de moi tourne déjà. Si le vôtre n'y figure pas, cela veut simplement dire que vous seriez le premier.",
    liste: [
      {
        was: "Restauration",
        beleg: "bledi-bienne.ch",
        text: "Carte, horaires et commande, pensés d'abord pour le téléphone.",
      },
      {
        was: "Cabinets et santé",
        beleg: "bern-zahnarzt-team.ch",
        text: "Demande de rendez-vous, numéro d'urgence et le balisage qui fait afficher horaires et avis par Google.",
      },
      {
        was: "Négoce et B2B",
        beleg: "kamil-energy.ch",
        text: "Sobre et pensé pour des contreparties internationales.",
      },
      {
        was: "Événements et communauté",
        beleg: "takabul.ch",
        text: "Le client gère lui-même dates et contenus via un système de gestion de contenu.",
      },
    ],
  },

  regionen: {
    titel: "Où je travaille",
    text: "Je viens de Bienne et je travaille dans la région. Pour le premier entretien je passe sur place plutôt que de fixer une visioconférence.",
    liste: ["Bienne/Biel", "Berne", "Seeland", "Soleure"],
    fern: "Plus loin, c'est possible aussi. Tout passe alors par téléphone et par écran, cela ne change rien au résultat.",
  },

  zahlen: [
    { wert: "4", label: "sites en service aujourd'hui" },
    { wert: "2", label: "langues d'origine, allemand et français" },
    { wert: "24 h", label: "avant que vous ayez une réponse" },
    { wert: "1", label: "interlocuteur, du premier appel jusqu'après" },
  ],

  ablauf: {
    titel: "Déroulement et coûts",
    schritte: [
      {
        zeit: "20 minutes",
        was: "Entretien",
        text: "Je demande ce que le site doit savoir faire. Vous demandez ce que je sais faire. Ensuite nous savons tous les deux si cela colle.",
      },
      {
        zeit: "2 jours ouvrables",
        was: "Offre",
        text: "Prix fixe, périmètre fixe, date fixe. Si quelque chose s'ajoute, je dis avant ce que cela coûte.",
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
    preisZahl: "dès CHF 1'000",
    preisTitel: "Ce que cela coûte",
    preisText:
      "Le prix de votre site dépend du nombre de pages et de langues et de ce qu'il doit savoir faire. Vous recevez le prix fixe après l'entretien, avant cela je ne demande rien.",
  },

  einwaende: {
    titel: "Ce que vous vous demandez maintenant",
    liste: [
      {
        frage: "Vous travaillez seul. Et si vous n'êtes plus disponible ?",
        antwort:
          "C'est vous qui décidez où votre site est hébergé. Sur votre propre compte, et n'importe quel autre développeur peut reprendre sans repartir de zéro. Ou chez moi, et je m'occupe de tout. Dans les deux cas le domaine vous appartient, et s'il passe par moi, je le transfère à votre nom quand vous le souhaitez.",
      },
      {
        frage: "Combien coûte l'exploitation ensuite ?",
        antwort:
          "Si vous hébergez vous-même : le domaine, environ CHF 15 par an, rien d'autre. Si je m'en charge : dès CHF 30 par mois pour la disponibilité, les petites modifications et les mises à jour. Le serveur ne coûte de toute façon rien à cette taille, vous payez mon temps et non de l'espace disque.",
      },
      {
        frage: "Et si je veux encore changer quelque chose après ?",
        antwort:
          "Une série de corrections est comprise dans le prix. Ensuite je vous dis à l'avance ce que coûte la suivante, pour qu'il n'y ait aucune surprise sur la facture.",
      },
      {
        frage: "Puis-je modifier les textes moi-même ?",
        antwort:
          "Sur demande, oui. Un système de gestion de contenu s'ajoute alors, comme pour takabul.ch. Sans cela, je modifie les textes pour vous.",
      },
      {
        frage: "Combien de temps cela prend-il vraiment ?",
        antwort:
          "Deux à quatre semaines, à partir du moment où vos textes et vos images sont là. Cette partie prend en général plus de temps que la réalisation.",
      },
    ],
  },

  person: {
    titel: "Qui construit",
    text1:
      "Raffa Amro Elsherkasi, Bienne. Développeur d'applications CFC. Ensuite DevOps Engineer aux CFF, où j'ai construit des outils .NET et React pour des processus internes ainsi que les chaînes de livraison correspondantes.",
    text2: "Les CFF étaient mon employeur, pas mon client.",
    fotoFehlt: "Photo à venir",
  },

  kontakt: {
    titel: "Dites-moi ce dont vous avez besoin",
    text: "Réponse le jour ouvrable même. Si cela presse, appelez-moi.",
    telefon: "Téléphone et WhatsApp",
    mail: "E-mail",

    projektLabel: "De quoi s'agit-il ?",
    projektOptionen: [
      "Nouveau site",
      "Reprise d'un site existant",
      "Application ou outil",
      "Je ne sais pas encore",
    ],
    zeitLabel: "Pour quand ?",
    zeitOptionen: ["Dès que possible", "Dans les prochains mois", "Je me renseigne d'abord"],

    beschreibungLabel: "Que doit savoir faire le site ?",
    beschreibungHinweis: "Facultatif",
    beschreibungPlatzhalter: "Deux ou trois phrases suffisent",

    nameLabel: "Nom",
    mailLabel: "E-mail",
    telLabel: "Téléphone",
    telHinweis: "Facultatif",

    senden: "Envoyer la demande",
    sendet: "Envoi en cours",

    erfolgTitel: "Bien reçu",
    erfolgText: "Je réponds dans les 24 heures, le plus souvent avant.",

    fehlerTitel: "Cela n'a pas fonctionné",
    fehlerText: "Appelez-moi ou écrivez à raffa.amro@gmail.com, ainsi cela arrivera à coup sûr.",

    pflichtProjekt: "Choisissez brièvement de quoi il s'agit.",
    pflichtZeit: "Choisissez brièvement pour quand.",
    pflichtName: "Votre nom manque encore.",
    pflichtMail: "Cette adresse n'est pas correcte.",

    datenschutzHinweis: "Je n'utilise vos données que pour vous répondre.",
  },

  fuss: {
    ort: "Bienne/Biel",
    impressum: "Mentions légales",
    datenschutz: "Protection des données",
  },
};
