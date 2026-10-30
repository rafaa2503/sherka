/* Alle sichtbaren Texte der Seite, Deutsch ist die Quelle.
   Regeln: Schweizer Hochdeutsch (ss statt ß), Sie-Form, keine Gedankenstriche,
   keine Preise (das Thema wird gar nicht angesprochen), kein Ort, keine
   Zweisprachigkeit und keine Anzahl Kundenseiten als Verkaufsargument,
   nichts Erfundenes. {name} und {branche} werden zur Laufzeit ersetzt. */

export const de = {
  meta: {
    titel: "Webdesign Schweiz: Websites, die Kunden bringen | Sherka",
    beschreibung:
      "Wir bauen Websites, die Anfragen bringen, und betreuen sie danach. Texte, Bilder und Preise ändern Sie selbst. Das Erstgespräch ist kostenlos.",
    ogTitel: "Websites, die Kunden bringen, statt nur gut auszusehen.",
  },

  kopf: {
    zumInhalt: "Zum Inhalt springen",
    navLabel: "Hauptnavigation",
    links: {
      arbeiten: "Beispiele",
      vorteile: "Vorteile",
      leistungen: "Leistungen",
      ablauf: "Ablauf",
      faq: "Fragen",
    },
    anfragen: "Erstgespräch",
    themaHell: "Auf helle Darstellung wechseln",
    themaDunkel: "Auf dunkle Darstellung wechseln",
    andereSprache: "Français",
    andereSpracheKurz: "FR",
    menue: "Menü öffnen",
    menueZu: "Menü schliessen",
  },

  hero: {
    titel: "Mehr Kunden. Weniger Aufwand.",
    unter: "Eine schöne Website haben viele. Wir bauen Ihnen eine, die Kunden bringt.",
    cta: "Erstgespräch anfragen",
    ctaHinweis: "Kostenlos und unverbindlich.",
    wahlTitel: "Von uns gebaut",
    zeigen: "{domain} im Gerät zeigen",
    laptopAlt: "{domain} auf einem Laptop",
    handyAlt: "{domain} auf einem Handy",
    messTitel: "Soeben bei Ihnen gemessen",
    messLcp: "Diese Seite sichtbar nach",
    messFcp: "Erster Inhalt sichtbar nach",
    messRichtLcp: "Google empfiehlt: unter 2,5 Sekunden",
    messRichtFcp: "Google empfiehlt: unter 1,8 Sekunden",
  },

  intro: {
    stark: "Das Telefon klingelt, und Sie haben die Hände voll.",
    rest: "Wer nicht durchkommt, versucht es beim Nächsten. Ihre Seite antwortet, während Sie arbeiten.",
  },

  arbeiten: {
    titel: "Glauben Sie uns nichts. Öffnen Sie die Seiten.",
    oeffnen: "Öffnen",
    zurueck: "Vorheriges Beispiel",
    weiter: "Nächstes Beispiel",
    bildAlt: "Startseite von {domain}",
  },

  vorteile: {
    titel: "Eine Website, die sich für Sie lohnt.",
    kacheln: [
      {
        gross: "Kunden finden Sie, bevor sie die Konkurrenz finden.",
        text: "Wir bauen Ihre Seite so, dass Google Ihr Angebot und Ihre Öffnungszeiten lesen kann.",
      },
      {
        gross: "Anfragen kommen, auch wenn Sie Feierabend haben.",
        text: "Kunden schreiben Ihnen direkt über die Seite, statt es am Telefon zu versuchen.",
      },
      {
        gross: "Um die Technik kümmern wir uns, nicht Sie.",
        text: "Wir halten Ihre Seite aktuell. Texte, Bilder und Preise ändern Sie selbst, wann Sie wollen.",
      },
    ],
  },

  leistungen: {
    titel: "Was wir für Sie machen.",
    liste: [
      {
        was: "Website oder Shop",
        text: "Eine Seite für Ihren Betrieb, auf Wunsch mit Shop, Reservation oder Ticketverkauf.",
      },
      {
        was: "Inhalte selbst ändern",
        text: "Texte, Bilder und Preise passen Sie selbst an, am Handy oder am Computer.",
      },
      {
        was: "Bei Google gefunden werden",
        text: "Wir richten Ihr Google-Unternehmensprofil ein und melden Ihre Seite bei Google an.",
      },
      {
        was: "Hosting und Betreuung",
        text: "Ihre Seite liegt auf Servern in der Schweiz. Updates und Sicherungen übernehmen wir.",
      },
    ],
  },

  ablauf: {
    titel: "Sie sehen, was Sie bekommen, bevor wir mit der Arbeit beginnen.",
    schritte: [
      { was: "Sie stellen uns Ihr Unternehmen vor.", text: "Daraus bauen wir gemeinsam ein Konzept." },
      { was: "Sie erhalten einen ersten Entwurf.", text: "Sie sagen uns, was Sie daran ändern möchten." },
      { was: "Auf Ihren Wunsch startet dann die Arbeit.", text: "Online geht Ihre Seite erst, wenn Sie einverstanden sind." },
    ],
  },

  /* Wer hinter Sherka steht. In der dritten Person, die Seite spricht als "wir". */
  person: {
    titel: "Wer hinter Sherka steht.",
    text: "Raffa Amro Elsherkasi, gelernter Informatiker EFZ. Mit ihm reden Sie vom ersten Gespräch an, und er baut Ihre Seite.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "Von Technik müssen Sie nichts verstehen.",
    liste: [
      {
        frage: "Was muss ich liefern?",
        antwort: "Wir brauchen ein paar Sätze über Ihren Betrieb, Ihre Öffnungszeiten und Fotos, falls Sie welche haben.",
      },
      {
        frage: "Ich habe schon eine Website.",
        antwort: "Dann schauen wir sie gemeinsam an und behalten, was gut ist.",
      },
      {
        frage: "Bin ich danach von Ihnen abhängig?",
        antwort: "Nein, die Internetadresse läuft auf Ihren Namen, oder wir schreiben sie auf Sie um.",
      },
    ],
  },

  kontakt: {
    titel: "Stellen Sie uns Ihr Unternehmen vor.",
    titelMitName: "Stellen Sie uns {name} vor.",
    text: "Das erste Gespräch ist kostenlos und unverbindlich, und wir antworten innert eines Werktags.",
    whatsapp: "WhatsApp",
    whatsappText: "Grüezi, ich interessiere mich für eine Website für {betrieb}. Hätten Sie Zeit für ein kurzes Erstgespräch?",
    whatsappOhne: "meinen Betrieb",
    telefon: "Telefon",
    mail: "E-Mail",

    anliegenLabel: "Worum geht es?",
    anliegen: [
      { wert: "neu", text: "Neue Website" },
      { wert: "ueberarbeiten", text: "Bestehende Seite überarbeiten" },
      { wert: "anwendung", text: "Werkzeug statt Excel-Listen" },
      { wert: "offen", text: "Weiss ich noch nicht" },
    ],
    betriebLabel: "Wie heisst Ihr Betrieb?",
    zeitLabel: "Wie eilig ist es?",
    zeit: [
      { wert: "bald", text: "So bald wie möglich" },
      { wert: "monate", text: "In den nächsten Monaten" },
      { wert: "umschauen", text: "Ich schaue mich erst um" },
    ],
    textLabel: "Ein paar Stichworte dazu",
    textPlatzhalter: "Zum Beispiel: Coiffeursalon, Termine online, alte Seite ersetzen",
    textHinweis: "Bitte keine Gesundheits- oder Patientendaten.",
    nameLabel: "Ihr Name",
    mailLabel: "E-Mail",
    telLabel: "Telefon",
    erreichbarHinweis: "E-Mail oder Telefon, eines reicht.",
    freiwillig: "Freiwillig",

    senden: "Erstgespräch anfragen",
    sendet: "Wird geschickt",

    erfolgTitel: "Angekommen",
    erfolgText: "Danke, {name}. Wir melden uns innert eines Werktags.",
    erfolgEilig: "Wenn es eilt, schreiben Sie uns auf WhatsApp.",

    fehlerTitel: "Das hat nicht geklappt",
    fehlerText: "Ihre Angaben sind noch da. Versuchen Sie es nochmals, oder erreichen Sie uns direkt:",
    zuViele:
      "Das waren zu viele Versuche in kurzer Zeit. Versuchen Sie es bitte etwas später nochmals, oder schreiben Sie uns per WhatsApp.",
    aus: "In dieser Vorschau ist das Formular abgeschaltet.",

    pflichtAnliegen: "Wählen Sie kurz aus, worum es geht.",
    pflichtName: "Ihr Name fehlt noch.",
    pflichtErreichbar: "Geben Sie eine E-Mail-Adresse oder eine Telefonnummer an.",
    falscheMail: "Diese E-Mail-Adresse stimmt so nicht.",
    falschesTel: "Diese Telefonnummer stimmt so nicht.",
    fehlerAnzahl: "Fehlende Angaben: {n}",

    datenschutzHinweis: "Ihre Angaben nutzen wir nur, um Ihnen zu antworten.",
  },

  aktionsleiste: {
    label: "Schnellkontakt",
    anrufen: "Anrufen",
    anfragen: "Erstgespräch",
    whatsapp: "WhatsApp",
  },

  fuss: {
    ort: "Biel/Bienne",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    impressumPfad: "/impressum/",
    datenschutzPfad: "/datenschutz/",
    instagram: "Instagram",
  },

  nichtGefunden: {
    titel: "Diese Seite gibt es nicht",
    text: "Vielleicht ist der Link veraltet. Hier geht es zur Startseite.",
    zurueck: "Zur Startseite",
  },
};

/* Kein "as const": sonst wären die Sätze Literaltypen und keine Übersetzung
   liesse sich zuweisen. Die Struktur bleibt trotzdem geprüft. */
export type Woerter = typeof de;
