import type { Woerter } from "./de";
import { typoFr } from "../lib/typo";

/* Vor dem Livegang von einer bezahlten Muttersprachlerin aus der Romandie
   abnehmen lassen. Kein Satz darf ein Adjektiv an {name} angleichen müssen. */

export const fr: Woerter = typoFr({
  meta: {
    titel: "Création de site internet à Bienne pour PME et artisans | Sherka",
    beschreibung:
      "Raffa Amro Elsherkasi crée des sites web pour salons, cabinets, restaurants et artisans, et en assure ensuite l'entretien. Bilingues, faits à la main. Le premier entretien est gratuit.",
    ogTitel: "Des sites qui travaillent.",
  },

  kopf: {
    zumInhalt: "Aller au contenu",
    navLabel: "Navigation principale",
    links: {
      arbeiten: "Réalisations",
      entstehung: "Comment ça naît",
      vorteile: "Pourquoi Sherka",
      ablauf: "Déroulement",
      faq: "Questions",
    },
    anfragen: "Contact",
    themaHell: "Passer en affichage clair",
    themaDunkel: "Passer en affichage sombre",
    andereSprache: "Deutsch",
    andereSpracheKurz: "DE",
    menue: "Ouvrir le menu",
    menueZu: "Fermer le menu",
  },

  hero: {
    titel: "Plus de clients. Moins d'efforts.",
    unter: "Votre site apporte demandes, rendez-vous et commandes. Réalisation, hébergement et entretien : je m'en occupe, en personne, depuis Bienne.",
    cta: "Parler de votre projet",
    wahlTitel: "Quatre sites, tous en ligne",
    zeigen: "Afficher {domain} dans l'appareil",
    laptopAlt: "{domain} sur un ordinateur portable",
    handyAlt: "{domain} sur un téléphone",
    messTitel: "Ce site, mesuré dans votre navigateur",
    messLcp: "Contenu entièrement affiché après",
    messFcp: "Premier contenu affiché après",
    messRichtLcp: "Seuil recommandé par Google : moins de 2,5 s",
    messRichtFcp: "Seuil recommandé par Google : moins de 1,8 s",  },

  intro: {
    stark: "Un site web doit apporter des demandes.",
    rest: "Prendre des rendez-vous, recevoir des commandes, fonctionner en deux langues. Pas seulement être joli, mais travailler au quotidien avec votre entreprise.",
  },

  arbeiten: {
    titel: "Quatre sites. Tous en ligne.",
    text: "Ouvrez-les vous-même. Chacun a été construit à la main et fonctionne aujourd'hui.",
    domainKunde: "Domaine au nom du client",
    domainSherka: "Domaine géré par Sherka, transféré sur demande",
    oeffnen: "Ouvrir le site",
    zurueck: "Réalisation précédente",
    weiter: "Réalisation suivante",
    bildAlt: "Page d'accueil de {domain}",
  },

  entstehung: {
    titel: "Comment naît un site.",
    text: "Un exemple, pas un projet client. À côté, le code qui le fait fonctionner.",
    beispiel: "Exemple",
    codeLabel: "Code de cette étape",
    schritte: [
      { name: "Structure.", text: "D'abord l'ordre : ce qui va en haut, ce qui va en bas, sans aucune couleur." },
      { name: "Mise en forme.", text: "Typographie, couleurs, espacements. Peu de valeurs, pour que tout tienne ensemble." },
      { name: "Fonction.", text: "Le formulaire vérifie les saisies et envoie la demande. Un clic suffit." },
      { name: "Bilingue et sur Google.", text: "Français et allemand, plus des indications dans le code grâce auxquelles Google affiche vos horaires." },
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
      { gross: "FR et DE", text: "Bilingue dès le départ, pas traduit après coup." },
      { gross: "Fait main", text: "Pas de kit de construction. Chaque site est construit pour votre entreprise." },
      { gross: "Une personne", text: "Qui construit, entretient aussi. Vous n'avez personne à former." },
      { gross: "20 minutes", text: "C'est la durée du premier entretien. Il est gratuit." },
      { gross: "1 jour ouvrable", text: "C'est le délai de réponse à votre demande." },
      { gross: "Votre adresse", text: "Le domaine est à votre nom ou vous est transféré sur simple demande." },
    ],
    leistungenTitel: "Ce que je réalise.",
    leistungen: [
      { was: "Nouveaux sites web.", text: "En une ou deux langues, de la page unique à la présence complète." },
      { was: "Rendez-vous et réservations.", text: "Les demandes arrivent par le site, plutôt que par téléphone entre deux clients." },
      { was: "Petites applications web.", text: "Pour les processus qui passent aujourd'hui par Excel et WhatsApp." },
      { was: "Refonte d'un site existant.", text: "Le rendre plus rapide et plus utile, sans repartir de zéro." },
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
