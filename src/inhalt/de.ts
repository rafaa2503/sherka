/* Alle sichtbaren Texte der Seite, Deutsch ist die Quelle.
   Regeln: Schweizer Hochdeutsch (ss statt ß), Sie-Form, keine Gedankenstriche,
   keine Preise (das Thema wird gar nicht angesprochen), Ort nur Biel/Bienne,
   nichts Erfundenes. {name} und {branche} werden zur Laufzeit ersetzt. */

export const de = {
  meta: {
    titel: "Webdesign Biel/Bienne: Websites für kleine Betriebe | Sherka",
    beschreibung:
      "Raffa Amro Elsherkasi baut Websites für Salons, Praxen, Restaurants und Handwerksbetriebe und betreibt sie danach auch. Zweisprachig, von Hand gebaut. Das Erstgespräch ist kostenlos.",
    ogTitel: "Websites, die arbeiten.",
  },

  kopf: {
    zumInhalt: "Zum Inhalt springen",
    navLabel: "Hauptnavigation",
    links: {
      arbeiten: "Arbeiten",
      entstehung: "So entsteht's",
      vorteile: "Warum Sherka",
      ablauf: "Ablauf",
      faq: "Fragen",
    },
    anfragen: "Anfragen",
    themaHell: "Auf helle Darstellung wechseln",
    themaDunkel: "Auf dunkle Darstellung wechseln",
    andereSprache: "Français",
    andereSpracheKurz: "FR",
    menue: "Menü öffnen",
    menueZu: "Menü schliessen",
  },

  hero: {
    titel: "Mehr Kunden. Weniger Aufwand.",
    unter: "Ihre Website bringt Anfragen, Termine und Bestellungen. Bau, Hosting und Pflege übernehme ich, persönlich aus Biel/Bienne.",
    cta: "Erstgespräch anfragen",
    wahlTitel: "Vier Seiten, alle live",
    zeigen: "{domain} im Gerät zeigen",
    laptopAlt: "{domain} auf einem Laptop",
    handyAlt: "{domain} auf einem Handy",
    messTitel: "Diese Seite, gemessen in Ihrem Browser",
    messLcp: "Inhalt vollständig sichtbar nach",
    messFcp: "Erster Inhalt sichtbar nach",
    messRichtLcp: "Richtwert von Google: unter 2,5 s",
    messRichtFcp: "Richtwert von Google: unter 1,8 s",  },

  intro: {
    stark: "Eine Website soll Anfragen bringen.",
    rest: "Termine annehmen, Bestellungen entgegennehmen, zweisprachig laufen. Nicht nur gut aussehen, sondern im Alltag Ihres Betriebs mitarbeiten.",
  },

  arbeiten: {
    titel: "Vier Seiten. Alle live.",
    text: "Öffnen Sie sie selbst. Jede wurde von Hand gebaut und läuft heute.",
    domainKunde: "Domain auf den Namen des Kunden",
    domainSherka: "Domain verwaltet von Sherka, auf Wunsch umgeschrieben",
    oeffnen: "Seite öffnen",
    zurueck: "Vorherige Arbeit",
    weiter: "Nächste Arbeit",
    bildAlt: "Startseite von {domain}",
  },

  entstehung: {
    titel: "So entsteht eine Seite.",
    text: "Ein Beispiel, kein Kundenprojekt. Daneben der Code, der dafür sorgt.",
    beispiel: "Beispiel",
    codeLabel: "Code zu diesem Schritt",
    schritte: [
      { name: "Gerüst.", text: "Zuerst die Ordnung: was oben steht, was unten, ohne jede Farbe." },
      { name: "Gestaltung.", text: "Schrift, Farben, Abstände. Wenige Werte, damit alles zusammenpasst." },
      { name: "Funktion.", text: "Das Formular prüft die Eingaben und schickt die Anfrage ab. Ein Klick genügt." },
      { name: "Zweisprachig und bei Google.", text: "Deutsch und Französisch, dazu Angaben im Code, mit denen Google Ihre Öffnungszeiten zeigt." },
    ],
    vorschau: {
      name: "Salon Lumen",
      links: ["Leistungen", "Team", "Kontakt"],
      titel: "Termin buchen, ohne anzurufen.",
      text: "Wählen Sie eine Zeit. Wir bestätigen per E-Mail.",
      titelFr: "Réserver, sans téléphoner.",
      textFr: "Choisissez un horaire. Nous confirmons par e-mail.",
      zeiten: ["Di 10:00", "Di 14:30", "Mi 09:00"],
      knopf: "Termin anfragen",
      erfolg: "Anfrage gesendet",
    },
  },

  vorteile: {
    titel: "Warum Sherka.",
    kacheln: [
      { gross: "DE und FR", text: "Zweisprachig von Anfang an, nicht nachträglich übersetzt." },
      { gross: "Von Hand", text: "Kein Baukasten. Jede Seite wird für Ihren Betrieb gebaut." },
      { gross: "Eine Person", text: "Wer baut, betreut auch. Sie müssen niemanden neu einarbeiten." },
      { gross: "20 Minuten", text: "So lange dauert das Erstgespräch. Es ist kostenlos." },
      { gross: "1 Werktag", text: "So schnell kommt die Antwort auf Ihre Anfrage." },
      { gross: "Ihre Adresse", text: "Die Domain läuft auf Ihren Namen oder wird auf Wunsch auf Sie umgeschrieben." },
    ],
    leistungenTitel: "Was ich baue.",
    leistungen: [
      { was: "Neue Websites.", text: "Ein- oder zweisprachig, von der einzelnen Seite bis zum ganzen Auftritt." },
      { was: "Terminanfragen und Reservationen.", text: "Anfragen kommen auf der Seite herein, statt per Telefon zwischen zwei Kunden." },
      { was: "Kleine Web-Anwendungen.", text: "Für Abläufe, die heute über Excel und WhatsApp laufen." },
      { was: "Bestehende Seiten überarbeiten.", text: "Schneller und brauchbarer machen, ohne bei null anzufangen." },
    ],
  },

  ablauf: {
    titel: "So läuft es ab",
    schritte: [
      {
        zeit: "20 Minuten",
        was: "Erstgespräch, kostenlos",
        text: "Ich frage, was die Seite können muss. Sie fragen, was ich kann. Danach wissen wir beide, ob es passt.",
      },
      {
        zeit: "schriftlich",
        was: "Entwurf",
        text: "Sie sehen, wie die Seite aussieht und was sie kann. Dazu steht schriftlich, was gebaut wird und bis wann.",
      },
      {
        zeit: "2 bis 4 Wochen",
        was: "Bau",
        text: "Ab dem Tag, an dem Texte und Bilder da sind. Zwischendurch bekommen Sie einen Link zum Anschauen.",
      },
      {
        zeit: "vor dem Start",
        was: "Abnahme",
        text: "Wir gehen alles gemeinsam durch. Was nicht stimmt, korrigiere ich.",
      },
      {
        zeit: "danach",
        was: "Betrieb",
        text: "Hosting, Adresse und kleine Änderungen bleiben bei mir.",
      },
    ],
  },

  person: {
    titel: "Wer das baut",
    text: "Ich bin Raffa Amro Elsherkasi und arbeite von Biel/Bienne aus. Gelernt habe ich Applikationsentwickler EFZ, danach war ich DevOps Engineer, also dort, wo Systeme laufen müssen. Deshalb baue ich Ihre Seite nicht nur, ich betreibe sie auch.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "Was Sie sich jetzt fragen",
    liste: [
      {
        frage: "Wie lange dauert es wirklich?",
        antwort:
          "Zwei bis vier Wochen, ab dem Moment, in dem Ihre Texte und Bilder da sind. Dieser Teil dauert meistens länger als der Bau.",
      },
      {
        frage: "Was muss ich vorbereiten?",
        antwort:
          "Ein paar Sätze über Ihren Betrieb, die Öffnungszeiten und Fotos, falls Sie welche haben. Was fehlt, besprechen wir im Erstgespräch.",
      },
      {
        frage: "Kann ich Texte selbst ändern?",
        antwort: "Auf Wunsch ja, mit einem Redaktionssystem wie bei takabul.ch. Sonst ändere ich sie für Sie.",
      },
      {
        frage: "Was, wenn ich nachher noch etwas ändern will?",
        antwort:
          "Bei der Abnahme korrigiere ich, was nicht stimmt. Spätere Wünsche schicken Sie mir per E-Mail oder WhatsApp, und wir besprechen sie.",
      },
      {
        frage: "Wem gehört die Adresse meiner Seite?",
        antwort:
          "Entweder läuft die Domain auf Ihren Namen, oder ich verwalte sie für Sie und schreibe sie auf Wunsch auf Sie um.",
      },
      {
        frage: "Ich habe eine Praxis. Was gilt für Patientendaten?",
        antwort:
          "Im Erstgespräch klären wir, welche Angaben ein Formular überhaupt abfragen darf und wo sie landen. Gesundheitsdaten gehören nicht in ein gewöhnliches Kontaktformular.",
      },
    ],
  },

  kontakt: {
    titel: "Sagen Sie mir, was Sie brauchen",
    titelMitName: "Sagen Sie mir, was {name} braucht",
    text: "Das Erstgespräch ist kostenlos. Ich antworte innerhalb eines Werktags. Wenn es schnell gehen soll, schreiben Sie auf WhatsApp oder rufen Sie an.",
    whatsapp: "WhatsApp",
    whatsappText: "Grüezi, ich interessiere mich für eine Website für {betrieb}. Hätten Sie Zeit für ein kurzes Erstgespräch?",
    whatsappOhne: "meinen Betrieb",
    telefon: "Telefon",
    mail: "E-Mail",

    anliegenLabel: "Worum geht es?",
    anliegen: [
      { wert: "neu", text: "Neue Website" },
      { wert: "ueberarbeiten", text: "Bestehende Seite überarbeiten" },
      { wert: "anwendung", text: "App oder Tool" },
      { wert: "offen", text: "Weiss ich noch nicht" },
    ],
    betriebLabel: "Ihr Betrieb",
    zeitLabel: "Wann soll es stehen?",
    zeit: [
      { wert: "bald", text: "So bald wie möglich" },
      { wert: "monate", text: "In den nächsten Monaten" },
      { wert: "umschauen", text: "Ich schaue mich erst um" },
    ],
    textLabel: "Was soll die Seite können?",
    textPlatzhalter: "Zwei, drei Sätze reichen",
    textHinweis: "Bitte keine Gesundheits- oder Patientendaten.",
    nameLabel: "Ihr Name",
    mailLabel: "E-Mail",
    telLabel: "Telefon",
    erreichbarHinweis: "E-Mail oder Telefon, eines reicht.",
    freiwillig: "Freiwillig",

    senden: "Anfrage schicken",
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
    fehlerAnzahl: "{n} Angaben fehlen noch.",

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
