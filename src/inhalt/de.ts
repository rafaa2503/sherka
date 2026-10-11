/* Alle sichtbaren Texte der Seite, Deutsch ist die Quelle.
   Regeln: Schweizer Hochdeutsch (ss statt ß), Sie-Form, keine Gedankenstriche,
   keine Preise (das Thema wird gar nicht angesprochen), Ort nur Biel/Bienne,
   nichts Erfundenes. {name} und {branche} werden zur Laufzeit ersetzt. */

export const de = {
  meta: {
    titel: "Webdesign Biel/Bienne: Website für Ihren Betrieb | Sherka",
    beschreibung:
      "Websites für Salons, Praxen, Restaurants und Handwerker in Biel/Bienne. Auf Deutsch und Französisch, gebaut und danach betreut. Erstgespräch kostenlos.",
    ogTitel: "Websites, die arbeiten.",
  },

  kopf: {
    zumInhalt: "Zum Inhalt springen",
    navLabel: "Hauptnavigation",
    links: {
      arbeiten: "Beispiele",
      entstehung: "So entsteht's",
      vorteile: "Warum Sherka",
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
    unter: "Ihre Website bringt Anfragen, auf Deutsch und Französisch. Ich baue und betreue sie in Biel/Bienne, Sie kümmern sich um nichts.",
    cta: "Erstgespräch anfragen",
    wahlTitel: "Vier Seiten, alle live",
    zeigen: "{domain} im Gerät zeigen",
    laptopAlt: "{domain} auf einem Laptop",
    handyAlt: "{domain} auf einem Handy",
    messTitel: "So schnell lädt diese Seite bei Ihnen",
    messLcp: "Das Wichtigste zu sehen nach",
    messFcp: "Erster Inhalt zu sehen nach",
    messRichtLcp: "Google empfiehlt: unter 2,5 Sekunden",
    messRichtFcp: "Google empfiehlt: unter 1,8 Sekunden",
  },

  intro: {
    stark: "Das Telefon klingelt mitten in der Arbeit.",
    rest: "Wieder nur die Frage nach den Öffnungszeiten, weil die Website veraltet ist. Eine gute Seite antwortet selbst und nimmt Anfragen an, während Sie arbeiten.",
  },

  arbeiten: {
    titel: "Vier Seiten. Alle live.",
    text: "Alle vier gehören echten Betrieben. Öffnen Sie sie und schauen Sie selbst.",
    domainKunde: "Internetadresse läuft auf den Kunden",
    domainSherka: "Internetadresse bei Sherka, wechselt auf Wunsch zum Kunden",
    oeffnen: "Seite öffnen",
    zurueck: "Vorheriges Beispiel",
    weiter: "Nächstes Beispiel",
    bildAlt: "Startseite von {domain}",
  },

  entstehung: {
    titel: "So entsteht eine Seite.",
    text: "Gezeigt an einem erfundenen Salon. Bei Ihrer Seite gehe ich genauso vor.",
    beispiel: "Beispiel",
    codeLabel: "Code zu diesem Schritt",
    schritte: [
      { name: "Aufbau.", text: "Zuerst die Reihenfolge, noch ohne Farbe: Was Ihre Kunden suchen, steht oben." },
      { name: "Gestaltung.", text: "Schrift und Farben, die zu Ihrem Betrieb passen. Wenige, damit es ruhig wirkt." },
      { name: "Funktion.", text: "Ein Klick, und die Terminanfrage ist bei Ihnen. Tippfehler fängt das Formular vorher ab." },
      { name: "Zweisprachig und bei Google.", text: "Deutsch und Französisch. Dazu Angaben, mit denen Google Ihre Öffnungszeiten richtig anzeigen kann." },
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
      { gross: "DE und FR", text: "Ihre Kundschaft spricht beide Sprachen. Ihre Seite auch, von Anfang an." },
      { gross: "Von Hand", text: "Für Ihren Betrieb gebaut, kein Baukasten. Sie pflegen nichts selbst." },
      { gross: "Eine Person", text: "Wer baut, bleibt auch danach zuständig. Sie erklären alles nur einmal." },
      { gross: "20 Minuten", text: "So kurz ist das kostenlose Erstgespräch. Sie entscheiden danach." },
      { gross: "1 Werktag", text: "Länger warten Sie nicht auf meine Antwort." },
      { gross: "Ihre Adresse", text: "Die Internetadresse läuft auf Ihren Namen, oder ich schreibe sie auf Wunsch auf Sie um." },
    ],
    leistungenTitel: "Was ich baue.",
    leistungen: [
      { was: "Neue Websites.", text: "Ein- oder zweisprachig, von einer einzigen Seite bis zum ganzen Auftritt." },
      { was: "Terminanfragen und Reservationen.", text: "Ihre Kunden fragen auf der Seite an, statt anzurufen, während Sie gerade jemanden bedienen." },
      { was: "Hilfsmittel für Abläufe.", text: "Listen und Planung, die heute über Excel und WhatsApp laufen." },
      { was: "Bestehende Seiten überarbeiten.", text: "Schneller und brauchbarer machen, ohne dass Sie bei null anfangen." },
    ],
  },

  ablauf: {
    titel: "So läuft es ab",
    schritte: [
      {
        zeit: "20 Minuten",
        was: "Erstgespräch",
        text: "Sie sagen, was Ihr Betrieb braucht. Ich sage, was ich davon bauen kann. Danach wissen wir beide, ob es passt.",
      },
      {
        zeit: "schriftlich",
        was: "Entwurf",
        text: "Sie sehen, wie Ihre Seite aussehen wird. Dazu halte ich schriftlich fest, was ich baue und bis wann.",
      },
      {
        zeit: "2 bis 4 Wochen",
        was: "Bau",
        text: "Ab dem Tag, an dem Ihre Texte und Bilder da sind. Zwischendurch schicke ich Ihnen einen Link zum Anschauen.",
      },
      {
        zeit: "vor dem Start",
        was: "Letzte Kontrolle",
        text: "Wir schauen alles gemeinsam an. Was nicht stimmt, korrigiere ich.",
      },
      {
        zeit: "danach",
        was: "Betreuung",
        text: "Dass die Seite läuft, ist meine Aufgabe, nicht Ihre. Kleine Änderungen schicken Sie mir, ich erledige sie.",
      },
    ],
  },

  person: {
    titel: "Wer Ihre Seite baut",
    text: "Ich bin Raffa Amro Elsherkasi und arbeite von Biel/Bienne aus. Gelernt habe ich Informatiker (Applikationsentwickler EFZ). Danach war es mein Beruf, dafür zu sorgen, dass Systeme laufen. Deshalb ist für mich nach dem Start nicht Schluss: Ich bleibe zuständig, und Sie erreichen mich direkt.",
    fotoAlt: "Raffa Amro Elsherkasi",
  },

  faq: {
    titel: "Was Sie sich jetzt fragen",
    liste: [
      {
        frage: "Wie lange dauert es wirklich?",
        antwort:
          "Zwei bis vier Wochen, sobald Ihre Texte und Bilder da sind. Bis wann die Seite steht, bekommen Sie vorher schriftlich.",
      },
      {
        frage: "Was muss ich vorbereiten?",
        antwort:
          "Wenig: ein paar Sätze über Ihren Betrieb, die Öffnungszeiten und Fotos, falls Sie welche haben. Fehlt etwas, klären wir das im Erstgespräch.",
      },
      {
        frage: "Kann ich Texte selbst ändern?",
        antwort: "Ja, wenn Sie das möchten, so wie der Kunde bei takabul.ch. Sonst schicken Sie mir den neuen Text, und ich ändere ihn.",
      },
      {
        frage: "Was, wenn ich nachher noch etwas ändern will?",
        antwort:
          "Dann schreiben Sie mir per E-Mail oder WhatsApp. Grösseres besprechen wir kurz, kleine Änderungen erledige ich.",
      },
      {
        frage: "Ich verstehe nichts von Technik. Geht das trotzdem?",
        antwort:
          "Ja. Von Ihnen brauche ich nur Texte, Bilder und ein paar Antworten. Alles Technische übernehme ich, vor dem Start und danach.",
      },
      {
        frage: "Ich habe eine Praxis. Was gilt für Patientendaten?",
        antwort:
          "Gesundheitsdaten gehören nicht in ein gewöhnliches Kontaktformular. Darum klären wir im Erstgespräch, was Ihr Formular abfragen darf und wo die Angaben landen.",
      },
    ],
  },

  kontakt: {
    titel: "Reden wir über Ihren Betrieb",
    titelMitName: "Reden wir über {name}",
    text: "Das Erstgespräch ist kostenlos, und Sie reden direkt mit dem, der Ihre Seite baut. Stichworte reichen. Ich antworte innerhalb eines Werktags. Wenn es eilt: WhatsApp oder Telefon.",
    whatsapp: "WhatsApp",
    whatsappText: "Grüezi, ich interessiere mich für eine Website für {betrieb}. Hätten Sie Zeit für ein kurzes Erstgespräch?",
    whatsappOhne: "meinen Betrieb",
    telefon: "Telefon",
    mail: "E-Mail",

    anliegenLabel: "Worum geht es?",
    anliegen: [
      { wert: "neu", text: "Neue Website" },
      { wert: "ueberarbeiten", text: "Bestehende Seite überarbeiten" },
      { wert: "anwendung", text: "Hilfsmittel für Abläufe" },
      { wert: "offen", text: "Weiss ich noch nicht" },
    ],
    betriebLabel: "Ihr Betrieb",
    zeitLabel: "Wie eilig ist es?",
    zeit: [
      { wert: "bald", text: "So bald wie möglich" },
      { wert: "monate", text: "In den nächsten Monaten" },
      { wert: "umschauen", text: "Ich schaue mich erst um" },
    ],
    textLabel: "Was sollte ich schon wissen?",
    textPlatzhalter: "Zum Beispiel: Coiffeursalon, Termine online, zwei Sprachen",
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
