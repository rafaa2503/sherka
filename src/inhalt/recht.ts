import type { Sprache } from "../lib/sprache";

/* Impressum und Datenschutzerklärung, Deutsch und Französisch.
   Stand: Hosting und Formular bei Infomaniak (Schweiz), keine Cookies, keine
   Analyse, Schriften selbst gehostet. Eckige Klammern sind Platzhalter, die
   Raffa füllen muss; npm run startklar schlägt fehl, solange welche drin sind.
   Keine Rechtsberatung: vor dem Livegang von einer Fachperson prüfen lassen.
   Die französische Fassung muss von einer Romande abgenommen werden. */

export type Block = { titel: string; absaetze: string[] };
export type RechtText = { titel: string; stand: string; bloecke: Block[] };

const MAIL = "hallo@sherka.ch";

export const IMPRESSUM: Record<Sprache, RechtText> = {
  de: {
    titel: "Impressum",
    stand: "Stand: [Datum]",
    bloecke: [
      {
        titel: "Verantwortlich",
        absaetze: [
          "Raffa Amro Elsherkasi, handelnd unter Sherka",
          "[Strasse und Nummer]",
          "[PLZ] Biel/Bienne, Schweiz",
        ],
      },
      { titel: "Kontakt", absaetze: [`Telefon +41 78 745 00 47`, `E-Mail ${MAIL}`] },
      { titel: "Rechtsform", absaetze: ["[Einzelunternehmen, UID falls vorhanden]"] },
      {
        titel: "Haftung für Inhalte",
        absaetze: [
          "Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität kann keine Gewähr übernommen werden.",
        ],
      },
      {
        titel: "Haftung für Links",
        absaetze: [
          "Diese Website verweist auf Websites Dritter, darunter Seiten, die ich für Kundinnen und Kunden gebaut habe. Für deren Inhalte sind ausschliesslich die jeweiligen Betreiber verantwortlich.",
        ],
      },
      {
        titel: "Urheberrecht",
        absaetze: [
          "Texte, Bilder und Code dieser Website sind urheberrechtlich geschützt. Eine Verwendung ausserhalb der gesetzlichen Schranken bedarf meiner Zustimmung.",
        ],
      },
    ],
  },
  fr: {
    titel: "Mentions légales",
    stand: "État : [date]",
    bloecke: [
      {
        titel: "Responsable",
        absaetze: ["Raffa Amro Elsherkasi, sous le nom de Sherka", "[rue et numéro]", "[NPA] Bienne, Suisse"],
      },
      { titel: "Contact", absaetze: [`Téléphone +41 78 745 00 47`, `E-mail ${MAIL}`] },
      { titel: "Forme juridique", absaetze: ["[entreprise individuelle, IDE le cas échéant]"] },
      {
        titel: "Responsabilité pour les contenus",
        absaetze: [
          "Les contenus de ce site sont rédigés avec soin. Aucune garantie ne peut être donnée quant à leur exactitude, leur exhaustivité et leur actualité.",
        ],
      },
      {
        titel: "Responsabilité pour les liens",
        absaetze: [
          "Ce site renvoie à des sites de tiers, notamment à des sites que j'ai réalisés pour des clients. Leurs exploitants sont seuls responsables de leurs contenus.",
        ],
      },
      {
        titel: "Droit d'auteur",
        absaetze: [
          "Les textes, images et le code de ce site sont protégés par le droit d'auteur. Toute utilisation au-delà des limites légales nécessite mon accord.",
        ],
      },
    ],
  },
};

export const DATENSCHUTZ: Record<Sprache, RechtText> = {
  de: {
    titel: "Datenschutzerklärung",
    stand: "Stand: [Datum]",
    bloecke: [
      {
        titel: "Verantwortliche Person",
        absaetze: [`Raffa Amro Elsherkasi, [Strasse und Nummer], [PLZ] Biel/Bienne, Schweiz. E-Mail ${MAIL}.`],
      },
      {
        titel: "Grundsatz",
        absaetze: [
          "Diese Website bearbeitet Personendaten nach dem Schweizer Datenschutzgesetz (DSG). Sie verwendet keine Analysewerkzeuge, keine Werbung, keine Cookies und lädt keine Schriften oder Skripte von fremden Servern.",
        ],
      },
      {
        titel: "Aufruf der Website",
        absaetze: [
          "Die Website liegt bei der Infomaniak Network SA in der Schweiz. Beim Aufruf fallen technisch notwendige Daten an (IP-Adresse, Zeitpunkt, aufgerufene Seite, Browserangaben). Sie dienen dem Betrieb und der Sicherheit und werden nach [Frist laut Infomaniak] gelöscht.",
        ],
      },
      {
        titel: "Speicher im Browser",
        absaetze: [
          "Wenn Sie die helle oder dunkle Darstellung wählen, wird diese Wahl im Speicher Ihres Browsers abgelegt. Sie verlässt Ihr Gerät nicht und lässt sich in den Browsereinstellungen löschen.",
        ],
      },
      {
        titel: "Kontaktformular",
        absaetze: [
          "Wenn Sie das Formular abschicken, übermittle ich Ihre Angaben (Anliegen, Betrieb, Zeitrahmen, Ihre Nachricht, Name, E-Mail-Adresse oder Telefonnummer, Sprache) über einen Server der Infomaniak Network SA in der Schweiz an mein Postfach, ebenfalls bei Infomaniak. Ich verwende sie nur, um Ihre Anfrage zu beantworten. Bitte geben Sie im Formular keine Gesundheits- oder Patientendaten an.",
          "[Falls Mails an ein weiteres Postfach weitergeleitet werden, hier den Anbieter und das Land nennen. Sonst diesen Absatz streichen.]",
        ],
      },
      {
        titel: "Live-Ansicht der Referenzen",
        absaetze: [
          "Unter Abnahme können Sie einzelne Kundenseiten in einem Fenster live ansehen. Erst wenn Sie darauf klicken, wird die Seite des Kunden geladen. Dabei erhält deren Betreiber Ihre IP-Adresse und es gilt dessen Datenschutzerklärung. Die Bilder der Referenzen liegen auf meinem eigenen Server.",
        ],
      },
      {
        titel: "Aufbewahrung",
        absaetze: [
          "Anfragen, aus denen kein Auftrag entsteht, lösche ich nach zwölf Monaten. Bei Aufträgen gelten die gesetzlichen Aufbewahrungsfristen.",
        ],
      },
      {
        titel: "Ihre Rechte",
        absaetze: [
          `Sie können Auskunft über Ihre Daten verlangen, sie berichtigen oder löschen lassen und der Bearbeitung widersprechen. Eine kurze E-Mail an ${MAIL} genügt. Sie haben zudem das Recht, sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.`,
        ],
      },
    ],
  },
  fr: {
    titel: "Protection des données",
    stand: "État : [date]",
    bloecke: [
      {
        titel: "Personne responsable",
        absaetze: [`Raffa Amro Elsherkasi, [rue et numéro], [NPA] Bienne, Suisse. E-mail ${MAIL}.`],
      },
      {
        titel: "Principe",
        absaetze: [
          "Ce site traite des données personnelles conformément à la loi suisse sur la protection des données (LPD). Il n'utilise ni outils d'analyse, ni publicité, ni cookies, et ne charge ni polices ni scripts depuis des serveurs tiers.",
        ],
      },
      {
        titel: "Consultation du site",
        absaetze: [
          "Le site est hébergé par Infomaniak Network SA en Suisse. Lors de la consultation, des données techniquement nécessaires sont traitées (adresse IP, heure, page consultée, informations sur le navigateur). Elles servent au fonctionnement et à la sécurité et sont effacées après [délai selon Infomaniak].",
        ],
      },
      {
        titel: "Mémoire du navigateur",
        absaetze: [
          "Si vous choisissez l'affichage clair ou sombre, ce choix est enregistré dans la mémoire de votre navigateur. Il ne quitte pas votre appareil et peut être effacé dans les réglages du navigateur.",
        ],
      },
      {
        titel: "Formulaire de contact",
        absaetze: [
          "Lorsque vous envoyez le formulaire, vos indications (objet, entreprise, délai, message, nom, adresse e-mail ou numéro de téléphone, langue) sont transmises via un serveur d'Infomaniak Network SA en Suisse à ma boîte mail, également chez Infomaniak. Je les utilise uniquement pour répondre à votre demande. Merci de ne pas indiquer de données de santé ou de patients dans le formulaire.",
          "[Si les e-mails sont transférés vers une autre boîte, indiquer ici le prestataire et le pays. Sinon, supprimer ce paragraphe.]",
        ],
      },
      {
        titel: "Aperçu en direct des références",
        absaetze: [
          "Sous Réception des travaux, vous pouvez afficher certains sites de clients en direct. Le site du client n'est chargé que lorsque vous cliquez. Son exploitant reçoit alors votre adresse IP et sa propre déclaration de protection des données s'applique. Les images des références sont hébergées sur mon propre serveur.",
        ],
      },
      {
        titel: "Conservation",
        absaetze: [
          "Les demandes qui n'aboutissent pas à un mandat sont effacées après douze mois. Pour les mandats, les délais légaux de conservation s'appliquent.",
        ],
      },
      {
        titel: "Vos droits",
        absaetze: [
          `Vous pouvez demander des renseignements sur vos données, les faire rectifier ou effacer et vous opposer à leur traitement. Un court e-mail à ${MAIL} suffit. Vous avez également le droit de déposer une plainte auprès du Préposé fédéral à la protection des données et à la transparence (PFPDT).`,
        ],
      },
    ],
  },
};
