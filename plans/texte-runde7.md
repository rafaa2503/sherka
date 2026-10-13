# Sherka Startseite: Texte Runde 7 (Deutsch)

Stand 13.10.2026. Grundlage: `src/inhalt/de.ts`, `src/data/projekte.ts`, `plans/texte-marketing.md` und Raffas Rückmeldung nach dem Test mit Lesern. Diese Datei ändert keinen Code. Französisch geht nach der Freigabe an `romand-lektor`.

---

## 1. Was gilt und was sich ändert

**Positionierung: gilt weiter.**

1. Alternativen: Baukasten am Abend, Agentur mit wechselnden Ansprechpersonen, ein Bekannter, der danach nicht mehr antwortet, oder die alte Seite bleibt stehen.
2. Was nur Sherka hat: Ein gelernter Informatiker baut die Seite eigens für den Betrieb und betreut sie danach selbst. Belegt mit Kundenseiten, die jeder öffnen kann, und einer Ladezeit, die der Besucher selbst misst.
3. Was der Kunde davon hat: Er erklärt seinen Betrieb einmal, hat danach eine Person, die antwortet, und muss sich nicht mit Technik befassen.
4. Für wen: Die Coiffeuse oder der Wirt, den ganzen Tag am Kunden, ohne Lust auf Technik.
5. Schublade: "Meine Person für die Website", so wie man einen Treuhänder hat.

**Bewusstseinsstufe: "Lösung bewusst".** Der Leser vergleicht. Er braucht den Unterschied und den Weg, keine Erklärung, wozu eine Website gut ist.

**Was sich ändert: die Stimme.** Die letzte Fassung hat mit Werbekniffen gearbeitet (kurze Schläge, Gegensatzpaare, Sprichwort, Stichworte ohne Verb, Schlagwort mit Erklärsatz). Raffa und seine Testleser lesen das als Maschinentext. Die neue Fassung nimmt Raffas eigene Sätze zum Ablauf als Mass: ganze, ruhige Sätze, die sagen, wer was tut, mit "Sie", "ich" und "wir". Ein Satz packt, wenn der Leser sich darin sieht und weiss, was er bekommt und was als Nächstes passiert.

**Aufgabe jedes Abschnitts**

| Abschnitt | Aufgabe | In dieser Runde |
|---|---|---|
| Hero | Versprechen und Handlung | Untertitel neu |
| Beispiele | Beweis | Zeile unter dem Titel und vier Zeilen zu den Seiten neu |
| Intro | Problem | zweiter Satz neu |
| Vorteile mit Person | Unterschied, die Person als Beleg | alles neu |
| Ablauf | Der Weg | alles neu, auf Raffas Sätzen gebaut |
| Fragen | Einwände | drei Antworten neu, Titel bleibt |
| Kontakt | Handlung mit Risikoumkehr | Titel und Text neu |

---

## 2. Die neuen Texte

### a) Hero

- `hero.titel`: Mehr Kunden. Weniger Aufwand. (unverändert, von Raffa gesetzt)
- `hero.unter` **(empfohlen)**: Ich baue die Website für Ihren Betrieb und betreue sie danach selbst, damit Sie Zeit für Ihre Kunden haben.
- `hero.unter` **(ALTERNATIVE)**: Sie erhalten eine Website, über die neue Kunden zu Ihnen finden. Ich baue sie und betreue sie danach selbst.
- `hero.cta`, `hero.ctaHinweis`: unverändert.

Je 19 Wörter. Die empfohlene Fassung ist ein einziger Satz mit "und" und "damit": was ich tue, was danach passiert, was Sie davon haben. Sie trägt das "Weniger Aufwand" aus dem Titel. Die Alternative beginnt beim Kunden und trägt das "Mehr Kunden". Sie verspricht damit etwas mehr, als heute belegt ist.

### b) Beispiele

- `arbeiten.titel`: Glauben Sie mir nichts. Öffnen Sie die Seiten. (unverändert)
- `arbeiten.text`: Sie gehören echten Betrieben, und alle sind online.

"Sie" schliesst direkt an "die Seiten" im Titel an.

### c) Die vier Zeilen zu den Kundenseiten

In `src/data/projekte.ts`, Feld `text.de.pruefpunkte`, je genau ein Eintrag:

- bledi-bienne.ch: Gäste lesen die Speisekarte direkt, ohne PDF.
- bern-zahnarzt-team.ch: Patienten fragen Termine online an und sehen die Notfallnummer sofort.
- takabul.ch: Der Kunde pflegt Termine und Texte selbst.
- kamil-energy.ch: Die Seite spricht Geschäftspartner im Ausland sachlich an.

Jede Zeile hat jetzt ein Verb und sagt, was ein Mensch auf der Seite tut. Bei bledi fehlt der Brunch, weil beides zusammen nicht in neun Wörter passt und die Speisekarte für einen Wirt das stärkere Beispiel ist. Falls der Platz reicht: "Gäste lesen die Speisekarte direkt, und der Brunch hat einen eigenen Bereich." (12 Wörter). Eine Online-Bestellung steht nirgends.

### d) Vorteile mit Person

Aufbau wie heute: Titel, darunter Foto und `person.text`, darunter drei Kacheln.

- `vorteile.titel` **(empfohlen)**: Vom ersten Gespräch an haben Sie immer mit mir zu tun.
- `vorteile.titel` **(ALTERNATIVE)**: Ich bleibe für Ihre Website zuständig, auch lange nach dem Start.
- `person.text`: Ich bin Raffa Amro Elsherkasi, gelernter Informatiker EFZ, und habe im Beruf dafür gesorgt, dass Systeme laufen.
- `vorteile.kacheln[0]`
  - `gross`: Sie erreichen mich direkt. (26 Zeichen)
  - `text`: Ich antworte selbst und kenne Ihre Seite, weil ich sie gebaut habe.
- `vorteile.kacheln[1]`
  - `gross`: Nach dem Start müssen Sie nichts mehr tun. (42 Zeichen)
  - `text`: Ich betreue Ihre Seite und sorge dafür, dass sie läuft.
- `vorteile.kacheln[2]`
  - `gross`: Ihre Besucher müssen nicht lange warten. (40 Zeichen)
  - `text`: Oben steht, wie schnell diese Seite bei Ihnen geladen hat, und Ihre baue ich genauso.

Der empfohlene Titel sagt den Unterschied zur Agentur so, wie Raffa ihn am Tisch sagt. Darunter stellt sich die Person vor, das passt als Fortsetzung. Die Alternative legt das Gewicht auf die Zeit nach dem Start statt auf die eine Person.

Jede grosse Zeile ist ein ganzer Satz über den Kunden und steht für sich. Die kleine Zeile sagt, wer dafür sorgt. Die Kacheln sind 12, 10 und 15 Wörter lang, also deutlich unter den erlaubten 20.

Vorsichtigere Fassung für Kachel 2, falls "nichts mehr tun" zu viel verspricht (takabul pflegt Inhalte selbst, neue Öffnungszeiten muss jemand melden): "Um die Technik müssen Sie sich nicht kümmern." (45 Zeichen).

### e) Ablauf

- `ablauf.titel` **(empfohlen)**: Sie sehen, was Sie bekommen, bevor ich mit der Arbeit beginne.
- `ablauf.titel` **(ALTERNATIVE)**: In drei Schritten kommen Sie vom ersten Gespräch zur fertigen Website.
- `ablauf.schritte[0]`
  - `zeit`: entfällt
  - `was`: Sie stellen mir Ihr Unternehmen vor.
  - `text`: Daraus bauen wir gemeinsam ein Konzept.
- `ablauf.schritte[1]`
  - `zeit`: entfällt
  - `was`: Sie erhalten einen ersten Entwurf.
  - `text`: Sie sagen mir, was Sie daran ändern möchten.
- `ablauf.schritte[2]`
  - `zeit`: entfällt
  - `was`: Auf Ihren Wunsch startet dann die Arbeit.
  - `text`: Online geht Ihre Seite erst, wenn Sie einverstanden sind.

Die drei `was`-Zeilen sind Raffas Sätze, fast wörtlich. Das "wir bauen ein Konzept" steht im ersten `text`. Die Etiketten "kostenlos", "schriftlich" und "eigens für Sie" entfallen, weil genau dieses Muster (Schlagwort über dem Satz) als Maschinentext gelesen wird. Braucht das Layout dort etwas, dann nur die Ziffern 1, 2 und 3. "Kostenlos" steht weiterhin am Knopf und im Kontakt.

Der empfohlene Titel nimmt dem Leser die grösste Sorge (ich zahle und weiss nicht, was kommt), ohne das Geld zu erwähnen. Die Alternative zeigt, wie kurz der Weg ist.

### f) Kontakt

**Empfohlen**

- `kontakt.titel`: Stellen Sie mir Ihr Unternehmen vor.
- `kontakt.titelMitName`: Stellen Sie mir {name} vor.
- `kontakt.text`: Das erste Gespräch ist kostenlos und unverbindlich, und ich antworte innert eines Werktags.

**ALTERNATIVE** (Titel und Text gehören zusammen)

- `kontakt.titel`: Erzählen Sie mir von Ihrem Betrieb, und ich melde mich innert eines Werktags.
- `kontakt.titelMitName`: Erzählen Sie mir von {name}, und ich melde mich innert eines Werktags.
- `kontakt.text`: Das erste Gespräch ist kostenlos und unverbindlich.

Die empfohlene Fassung ist Schritt 1 aus dem Ablauf als Einladung. Der Leser hat den Satz eben gelesen und weiss, dass er jetzt an der Reihe ist. Die Alternative sagt schon im Titel, was nach dem Absenden passiert, ist aber als Titel lang.

Hinweis zum Wort: "Unternehmen" stammt von Raffa und steht im Ablauf und im Kontakt. Sonst sagt die Seite "Betrieb" (Untertitel, Formular). Beides nebeneinander klingt im Gespräch normal. Wer nur ein Wort will, nimmt überall "Betrieb", weil das Formular "Wie heisst Ihr Betrieb?" fragt.

### g) Übrige Texte, geprüft

Treffer und neue Fassung:

- `intro.stark`: Das Telefon klingelt, und Sie haben die Hände voll. (bleibt, ganzer Satz, ein Bild)
- `intro.rest`: Über Ihre Website können Kunden trotzdem anfragen, statt es beim nächsten Betrieb zu versuchen.
  - Vorher zwei Sätze mit Pointe ("Ihre Seite antwortet, während Sie arbeiten."). Eine Seite antwortet nicht, sie nimmt Anfragen an.
- `faq.titel`: Von Technik müssen Sie nichts verstehen. (bleibt, ganzer Satz)
- `faq.liste[0].antwort`: Ich brauche ein paar Sätze über Ihren Betrieb, Ihre Öffnungszeiten und Fotos, falls Sie welche haben.
  - Vorher ohne Verb und mit "Mehr nicht." am Schluss.
- `faq.liste[1].antwort`: Dann schauen wir sie gemeinsam an und behalten, was gut ist.
  - Vorher "Was gut ist, bleibt.", derselbe Bau wie "Wer baut, bleibt."
- `faq.liste[2].antwort`: Nein, die Internetadresse läuft auf Ihren Namen, oder ich schreibe sie auf Sie um.
  - Vorher "Nein." als eigener Satz.
- `kontakt.erfolgEilig`: Wenn es eilt, schreiben Sie mir auf WhatsApp.
  - Vorher "Eilig? Schreiben Sie auf WhatsApp."
- `kontakt.erfolgText`: Danke, {name}. Ich melde mich innert eines Werktags.
  - Nur "innerhalb" zu "innert", damit die Frist überall gleich heisst.
- `kontakt.zuViele`: Das waren zu viele Versuche in kurzer Zeit. Versuchen Sie es bitte etwas später nochmals, oder erreichen Sie mich per Telefon oder WhatsApp.
  - Vorher zwei Sätze ohne Verb.
- `meta.beschreibung`: Ich baue Websites für Salons, Praxen, Restaurants und Handwerker und betreue sie danach selbst. Das Erstgespräch ist kostenlos und unverbindlich. (145 Zeichen)
  - Steht bei Google unter dem Link. Vorher drei Stücke ohne Verb.
- `meta.ogTitel`: Ich baue und betreue Websites für kleine Betriebe. (50 Zeichen)
  - Steht in der Vorschau, wenn jemand den Link auf WhatsApp teilt. Vorher "Websites, die arbeiten.", ein Werbespruch.

Ohne Treffer und unverändert: Menü, Knöpfe, die Beschriftungen der Messung im Hero, `hero.wahlTitel`, alle Formularfelder, Auswahlen und Pflichtmeldungen, `kontakt.fehlerText`, `kontakt.datenschutzHinweis`, der vorbereitete WhatsApp-Text, Schnellkontakt, Fuss, die Seite "nicht gefunden", `meta.titel`. Das sind Beschriftungen, die kurz sein müssen, oder schon ganze Sätze.

---

## 3. Bitte bestätigen

1. "Ich antworte selbst": Du antwortest auch nach dem Start selbst, am Telefon oder schriftlich.
2. "Nach dem Start müssen Sie nichts mehr tun": Die Betreuung gehört bei jedem Kunden dazu. Sonst die vorsichtigere Fassung nehmen.
3. "Ihre baue ich genauso": Kundenseiten laden ähnlich schnell wie diese. Auf einem langsamen Handy kann die Messung im Hero schwächer ausfallen.
4. "Sie sagen mir, was Sie daran ändern möchten": Nach dem Entwurf gibt es eine Runde für Änderungen.
5. "behalten, was gut ist": Du übernimmst bei einer Überarbeitung wirklich Teile der alten Seite.
6. "habe im Beruf dafür gesorgt": Die Vergangenheit stimmt so.

Der Beleg für "Mehr Kunden" fehlt weiterhin. Ein Satz von bledi oder der Zahnarztpraxis mit Namen, oder die Zahl der Anfragen über ihre Formulare, wiegt mehr als jeder Text hier.

---

## 4. Prüfung

- **Fünf-Sekunden-Test:** bestanden. Erster Bildschirm: Website für Ihren Betrieb, gebaut und betreut von einer Person, Knopf "Erstgespräch anfragen", kostenlos.
- **Titel-Test:** Mehr Kunden. Weniger Aufwand. / Glauben Sie mir nichts. Öffnen Sie die Seiten. / Das Telefon klingelt, und Sie haben die Hände voll. / Vom ersten Gespräch an haben Sie immer mit mir zu tun. / Sie sehen, was Sie bekommen, bevor ich mit der Arbeit beginne. / Von Technik müssen Sie nichts verstehen. / Stellen Sie mir Ihr Unternehmen vor. Das Gespräch steht.
- **"Nur wir"-Test:** Der Vorteile-Titel besteht gegen Agentur, Baukasten und Bekannte. Der Ablauf-Titel besteht gegen Baukasten und Bekannte, eine gute Agentur kann ihn auch sagen. Der Kontakt-Titel ist allgemein und wird mit dem Betriebsnamen persönlich.
- **Tresen-Test:** Jeder neue Satz hat Subjekt und Verb und lässt sich so sagen.
- **KI-Test:** kein Satz aus ein bis drei Wörtern, kein Gegensatzpaar, kein Sprichwort, keine Zeile ohne Verb, kein Schlagwort mit Erklärsatz. Von Raffa gesetzt und deshalb nicht angefasst: die beiden Titel im Hero und bei den Beispielen.
- **Regeln:** kein Geldthema ausser "kostenlos", kein Ort, kein Wort zu Sprachen, keine Bauzeit, keine Anzahl Kundenseiten, keine Online-Bestellung, nichts "von Hand", Sie-Form, kein scharfes S, keine Gedankenstriche, keine Ausrufezeichen.
- **Wortzahl** (Hero bis Kontakt, sichtbare Titel und Texte, ohne Formular, Menü und Beschriftungen):

| Abschnitt | heute | neu |
|---|---|---|
| Hero | 24 | 28 |
| Beispiele | 36 | 48 |
| Intro | 22 | 23 |
| Vorteile mit Person | 58 | 83 |
| Ablauf | 55 | 52 |
| Fragen | 62 | 62 |
| Kontakt | 15 | 19 |
| Summe | 272 | 315 |

Die Seite wird mit diesen Texten um 43 Wörter länger, nicht kürzer. Das liegt an zwei Stellen: Die Kacheln und die Zeilen zu den Kundenseiten waren Stichworte, jetzt sind es Sätze mit Verb. Ganze Sätze brauchen mehr Wörter als Stichworte, das lässt sich nicht wegschreiben. Kürzer wird die Seite über die Abschnitte, siehe unten.

---

## 5. Länge

Getestete Besucher scrollen nicht weit. Darum zählt der Streich-Test für ganze Abschnitte mehr als jedes gekürzte Wort. Die Entscheidung liegt bei Raffa.

**Empfehlung 1: Intro streichen.** Der Leser ist "Lösung bewusst", er weiss schon, dass er eine Seite braucht. Das Problem muss ihm niemand erklären. Für die Entscheidung fehlt ohne das Intro nichts, und der Unterschied (Vorteile) rückt einen Bildschirm näher an den Anfang. Spart 23 Wörter und einen ganzen Abschnitt.

**Empfehlung 2: Fragen streichen und einen Satz in den Ablauf nehmen.** Der Titel "Von Technik müssen Sie nichts verstehen" sagt dasselbe wie die zweite Kachel. Die Frage zur bestehenden Seite beantwortet das Formular mit der Auswahl "Bestehende Seite überarbeiten". Die Frage zur Abhängigkeit stellt kaum jemand vor dem ersten Gespräch, sie gehört ins Gespräch. Bleibt "Was muss ich liefern?", und das passt in Schritt 3:

- `ablauf.schritte[2].text` (nur falls die Fragen wegfallen): Von Ihnen brauche ich dafür ein paar Sätze über Ihren Betrieb und Fotos, falls Sie welche haben. Online geht Ihre Seite erst, wenn Sie einverstanden sind.

Danach steht der Ablauf direkt über dem Kontakt. Das passt, weil der Kontakt-Titel Schritt 1 wörtlich aufnimmt.

**Mit beiden Empfehlungen:** Hero, Beispiele, Vorteile, Ablauf, Kontakt. Fünf Abschnitte statt sieben und rund 245 Wörter statt 272 heute.

**Nicht streichen:** Beispiele (der einzige Beweis), Vorteile (der Unterschied und die Person), Ablauf (der Weg, von Raffa selbst formuliert). Wenn noch mehr weg soll, dann eher die Zeile `arbeiten.text` als ein ganzer Abschnitt.
