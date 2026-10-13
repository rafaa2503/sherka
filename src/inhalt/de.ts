/* Alle sichtbaren Texte der Seite, Deutsch ist die Quelle.
   Regeln: Schweizer Hochdeutsch (ss statt ß), Sie-Form, keine Gedankenstriche,
   keine Preise (das Thema wird gar nicht angesprochen), kein Ort, keine
   Zweisprachigkeit und keine Anzahl Kundenseiten als Verkaufsargument,
   nichts Erfundenes. {name} und {branche} werden zur Laufzeit ersetzt. */

export const de = {
  meta: {
    titel: "Webdesign für kleine Betriebe: gebaut und betreut | Sherka",
    beschreibung:
      "Ich baue Websites für Salons, Praxen, Restaurants und Handwerker und betreue sie danach selbst. Das Erstgespräch ist kostenlos und unverbindlich.",
    ogTitel: "Ich baue und betreue Websites für kleine Betriebe.",
  },

  kopf: {
    zumInhalt: "Zum Inhalt springen",
    navLabel: "Hauptnavigation",
    links: {
      arbeiten: "Beispiele",
      vorteile: "Über mich",
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
    unter: "Ihre Website lädt schnell, funktioniert auf jedem Handy und wird bei Google gefunden. Um Entwurf, Technik und Betreuung kümmere ich mich.",
    cta: "Erstgespräch anfragen",
    ctaHinweis: "Kostenlos und unverbindlich.",
    wahlTitel: "Von mir gebaut",
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
    titel: "Glauben Sie mir nichts. Öffnen Sie die Seiten.",
    oeffnen: "Öffnen",
    zurueck: "Vorheriges Beispiel",
    weiter: "Nächstes Beispiel",
    bildAlt: "Startseite von {domain}",
  },

  vorteile: {
    titel: "Vom ersten Gespräch an haben Sie immer mit mir zu tun.",
    kacheln: [
      { gross: "Sie erreichen mich direkt.", text: "Meine Nummer steht unten auf dieser Seite." },
      { gross: "Nach dem Start müssen Sie nichts mehr tun.", text: "" },
      {
        gross: "Ihre Website bringt Ihnen neue Anfragen.",
        text: "Kunden finden Sie bei Google und schreiben Ihnen direkt über die Seite, auch ausserhalb Ihrer Öffnungszeiten.",
      },
    ],
  },

  ablauf: {
    titel: "Sie sehen, was Sie bekommen, bevor ich mit der Arbeit beginne.",
    schritte: [
      { was: "Sie stellen mir Ihr Unternehmen vor.", text: "Daraus bauen wir gemeinsam ein Konzept." },
      { was: "Sie erhalten einen ersten Entwurf.", text: "Sie sagen mir, was Sie daran ändern möchten." },
      { was: "Auf Ihren Wunsch startet dann die Arbeit.", text: "Online geht Ihre Seite erst, wenn Sie einverstanden sind." },
    ],
  },

  /* Steht unter dem Titel der Vorteile: die Person ist der Beleg, kein eigenes Kapitel. */
  person: {
    text: "Ich bin Raffa Amro Elsherkasi, gelernter Informatiker EFZ, und habe im Beruf dafür gesorgt, dass Systeme laufen.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "Von Technik müssen Sie nichts verstehen.",
    liste: [
      {
        frage: "Was muss ich liefern?",
        antwort: "Ich brauche ein paar Sätze über Ihren Betrieb, Ihre Öffnungszeiten und Fotos, falls Sie welche haben.",
      },
      {
        frage: "Ich habe schon eine Website.",
        antwort: "Dann schauen wir sie gemeinsam an und behalten, was gut ist.",
      },
      {
        frage: "Bin ich danach von Ihnen abhängig?",
        antwort: "Nein, die Internetadresse läuft auf Ihren Namen, oder ich schreibe sie auf Sie um.",
      },
    ],
  },

  kontakt: {
    titel: "Stellen Sie mir Ihr Unternehmen vor.",
    titelMitName: "Stellen Sie mir {name} vor.",
    text: "Das erste Gespräch ist kostenlos und unverbindlich, und ich antworte innert eines Werktags.",
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
    erfolgText: "Danke, {name}. Ich melde mich innert eines Werktags.",
    erfolgEilig: "Wenn es eilt, schreiben Sie mir auf WhatsApp.",

    fehlerTitel: "Das hat nicht geklappt",
    fehlerText: "Ihre Angaben sind noch da. Versuchen Sie es nochmals, oder erreichen Sie mich direkt:",
    zuViele:
      "Das waren zu viele Versuche in kurzer Zeit. Versuchen Sie es bitte etwas später nochmals, oder erreichen Sie mich per Telefon oder WhatsApp.",
    aus: "In dieser Vorschau ist das Formular abgeschaltet.",

    pflichtAnliegen: "Wählen Sie kurz aus, worum es geht.",
    pflichtName: "Ihr Name fehlt noch.",
    pflichtErreichbar: "Geben Sie eine E-Mail-Adresse oder eine Telefonnummer an.",
    falscheMail: "Diese E-Mail-Adresse stimmt so nicht.",
    falschesTel: "Diese Telefonnummer stimmt so nicht.",
    fehlerAnzahl: "Fehlende Angaben: {n}",

    datenschutzHinweis: "Ihre Angaben nutze ich nur, um Ihnen zu antworten.",
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
