/* Alle sichtbaren Texte der Seite, Deutsch ist die Quelle.
   Regeln: Schweizer Hochdeutsch (ss statt ß), Sie-Form, keine Gedankenstriche,
   keine Preise (das Thema wird gar nicht angesprochen), kein Ort, keine
   Zweisprachigkeit und keine Anzahl Kundenseiten als Verkaufsargument,
   nichts Erfundenes. {name} und {branche} werden zur Laufzeit ersetzt. */

export const de = {
  meta: {
    titel: "Webdesign für kleine Betriebe: gebaut und betreut | Sherka",
    beschreibung:
      "Websites für Salons, Praxen, Restaurants und Handwerker. Von Hand gebaut, danach betreut, alles von einer Person. Erstgespräch kostenlos.",
    ogTitel: "Websites, die arbeiten.",
  },

  kopf: {
    zumInhalt: "Zum Inhalt springen",
    navLabel: "Hauptnavigation",
    links: {
      arbeiten: "Beispiele",
      entstehung: "Handarbeit",
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
    unter: "Ich baue Ihre Website und halte sie am Laufen. Sie kümmern sich um Ihre Kunden.",
    cta: "Erstgespräch anfragen",
    ctaHinweis: "Kostenlos. Verpflichtet zu nichts.",
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
    text: "Echte Betriebe, alle online.",
    oeffnen: "Öffnen",
    zurueck: "Vorheriges Beispiel",
    weiter: "Nächstes Beispiel",
    bildAlt: "Startseite von {domain}",
  },

  entstehung: {
    titel: "Beim Baukasten bauen Sie. Hier baue ich.",
    text: "Der Salon ist erfunden. Gebaut wird genau so.",
    beispiel: "Beispiel",
    codeLabel: "Code zu diesem Schritt",
    schritte: [
      { name: "Aufbau.", text: "Was Ihre Kunden suchen, steht oben." },
      { name: "Gestaltung.", text: "Ihre Farben, Ihre Schrift." },
      { name: "Funktion.", text: "Ein Klick, und die Anfrage ist bei Ihnen." },
      { name: "Google.", text: "Öffnungszeiten, die Google lesen kann." },
    ],
    vorschau: {
      name: "Salon Lumen",
      links: ["Leistungen", "Team", "Kontakt"],
      titel: "Termin buchen, ohne anzurufen.",
      text: "Wählen Sie eine Zeit. Wir bestätigen per E-Mail.",
      zeiten: ["Di 10:00", "Di 14:30", "Mi 09:00"],
      knopf: "Termin anfragen",
      erfolg: "Anfrage gesendet",
    },
  },

  vorteile: {
    titel: "Wer baut, bleibt.",
    kacheln: [
      { gross: "Ich nehme ab.", text: "Kein Sekretariat. Sie reden mit dem, der gebaut hat." },
      { gross: "Mein Problem.", text: "Dass die Seite läuft, ist meine Sache. Beim Baukasten Ihre." },
      { gross: "Keiner wartet.", text: "Die Ladezeit oben haben Sie selbst gemessen. So baue ich." },
    ],
  },

  ablauf: {
    titel: "In zwei bis vier Wochen steht Ihre Seite.",
    schritte: [
      {
        zeit: "kostenlos",
        was: "Wir reden",
        text: "Sie sagen, was Ihr Betrieb braucht. Ich sage, was ich baue.",
      },
      {
        zeit: "schriftlich",
        was: "Sie sehen den Entwurf",
        text: "Wie Ihre Seite aussieht, was ich baue, bis wann.",
      },
      {
        zeit: "2 bis 4 Wochen",
        was: "Ich baue",
        text: "Sobald Ihre Texte und Bilder da sind. Online geht nichts, bevor Sie Ja sagen.",
      },
    ],
  },

  /* Steht unter dem Titel der Vorteile: die Person ist der Beleg, kein eigenes Kapitel. */
  person: {
    text: "Ich bin Raffa Amro Elsherkasi, gelernter Informatiker EFZ. Im Beruf habe ich Systeme am Laufen gehalten. Jetzt Ihre Seite.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "Von Technik müssen Sie nichts verstehen.",
    liste: [
      {
        frage: "Was muss ich liefern?",
        antwort: "Ein paar Sätze über Ihren Betrieb, die Öffnungszeiten und Fotos, falls Sie welche haben. Mehr nicht.",
      },
      {
        frage: "Ich habe schon eine Website.",
        antwort: "Dann fangen wir nicht bei null an. Was gut ist, bleibt.",
      },
      {
        frage: "Bin ich danach von Ihnen abhängig?",
        antwort: "Nein. Die Internetadresse läuft auf Ihren Namen, oder ich schreibe sie auf Sie um.",
      },
    ],
  },

  kontakt: {
    titel: "Reden wir über Ihren Betrieb.",
    titelMitName: "Reden wir über {name}.",
    text: "Das Gespräch ist kostenlos. Danach entscheiden Sie. Antwort innert eines Werktags.",
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
    erfolgText: "Danke, {name}. Ich melde mich innerhalb eines Werktags.",
    erfolgEilig: "Eilig? Schreiben Sie auf WhatsApp.",

    fehlerTitel: "Das hat nicht geklappt",
    fehlerText: "Ihre Angaben sind noch da. Versuchen Sie es nochmals, oder erreichen Sie mich direkt:",
    zuViele: "Zu viele Versuche in kurzer Zeit. Bitte etwas später nochmals, oder direkt per Telefon oder WhatsApp.",
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
