# Sherka Startseite: Texte Runde 8 (Deutsch)

Stand 13.10.2026. Grundlage: `src/inhalt/de.ts` und `src/data/projekte.ts` im heutigen Stand, dazu Raffas Rückmeldung zu Runde 7. Diese Datei ändert keinen Code.

## Der Leersatz-Test

Raffa zu zwei Sätzen aus Runde 7: "Binde deine Schuhe, dann sind sie gebunden." Ein Satz, der nur sagt, was sich von selbst versteht, ist schlimmer als kein Satz. Die Probe für jeden Satz: Was weiss der Leser danach, was er vorher nicht wusste und was seine Entscheidung beeinflusst? Zählt als Input: eine Tatsache, ein Ergebnis, eine Zusage, ein nächster Schritt, eine Stelle, an der er etwas nachprüfen kann. Wenn nichts davon drin ist, wird gestrichen und nicht umformuliert. Die Stimme aus Runde 7 bleibt.

---

## Aufgabe 1: `hero.unter`, vier Fassungen

Der Satz steht unter "Mehr Kunden. Weniger Aufwand." und über dem Knopf "Erstgespräch anfragen".

**Fassung A, für wen und was genau** (19 Wörter)
Für Restaurants, Praxen und Salons baue ich Websites, auf denen Kunden direkt einen Termin anfragen oder die Speisekarte lesen.
Input: Der Leser sieht, ob sein Betrieb gemeint ist, und was seine Kunden auf der Seite tun können. Beides lässt sich rechts an den Kundenseiten nachprüfen.

**Fassung B, die Zusage** (18 Wörter)
Sie sehen einen Entwurf, bevor die Arbeit beginnt, und online geht Ihre Website erst, wenn Sie einverstanden sind.
Input: zwei Zusagen, die ein Baukasten oder ein Bekannter nicht gibt, und der Leser weiss, dass er zweimal Ja sagen kann.

**Fassung C, der Aufwand des Kunden** (18 Wörter)
Für Ihre Website brauche ich von Ihnen nur ein Gespräch, ein paar Sätze über Ihren Betrieb und Fotos.
Input: Der Leser weiss genau, was er selbst beitragen muss. Das macht "Weniger Aufwand" aus dem Titel zu einer Angabe.

**Fassung D, der nächste Schritt** (20 Wörter)
Sie schreiben mir, worum es bei Ihrer Website geht, und ich melde mich innert eines Werktags für ein erstes Gespräch.
Input: was nach dem Klick auf den Knopf passiert und wie schnell.

**Fünfte Möglichkeit: kein Satz.** Am Laptop bleibt der erste Bildschirm verständlich, weil "Von mir gebaut", die Adressen und der Laptop mit einer Kundenseite zeigen, worum es geht. Auf dem Handy steht dann über dem Knopf nirgends das Wort "Website", solange Liste und Gerät erst darunter kommen. Darum rate ich davon ab.

**Empfehlung: Fassung B.** Sie ist die einzige, die etwas zusagt, und sie ist Raffas eigener Ablauf in einem Satz. Jedes Wort darin ist durch die Fakten gedeckt. Zweite Wahl ist C, weil sie direkt an den Titel anschliesst. Bei C muss Raffa bestätigen, dass "nur" stimmt (der Kunde schaut auch den Entwurf an und gibt frei).

Folgen der Wahl:
- Mit B sagt `ablauf.titel` dasselbe ein zweites Mal. Dann dort: "In drei Schritten kommen Sie vom ersten Gespräch zur fertigen Website."
- Mit C wird die erste Frage "Was muss ich liefern?" überflüssig.
- Mit D wiederholt `kontakt.text` die Frist. Das stört nicht, weil die Stellen weit auseinander liegen.

---

## Aufgabe 2: Leersatz-Test über alle übrigen Texte

### Gestrichen

- `intro.stark` und `intro.rest` (der ganze Abschnitt): "Das Telefon klingelt, und Sie haben die Hände voll. Über Ihre Website können Kunden trotzdem anfragen, statt es beim nächsten Betrieb zu versuchen."
  Der Leser kennt seinen Alltag, und dass man über eine Website anfragen kann, versteht sich von selbst. Kein Input.
- `vorteile.kacheln[1].text`: "Ich betreue Ihre Seite und sorge dafür, dass sie läuft."
  Wiederholt die grosse Zeile mit anderen Worten. Die grosse Zeile "Nach dem Start müssen Sie nichts mehr tun." bleibt allein stehen.
- `kamil-energy.ch`, `pruefpunkte`: "Die Seite spricht Geschäftspartner im Ausland sachlich an."
  Dass die Seite sachlich ist, sieht man beim Öffnen. Die Zeile "Handel mit Agrar-Rohstoffen" darüber sagt schon, für wen sie ist.
- `nichtGefunden.text`, zweiter Satz: "Hier geht es zur Startseite."
  Der Knopf darunter heisst "Zur Startseite". Es bleibt: "Vielleicht ist der Link veraltet."

### Ersetzt

- `person.text`
  - bisher: Ich bin Raffa Amro Elsherkasi, gelernter Informatiker EFZ, und habe im Beruf dafür gesorgt, dass Systeme laufen.
  - neu: Ich bin Raffa Amro Elsherkasi, gelernter Informatiker EFZ.
  - Der zweite Teil sagt, was jeder von einem Informatiker annimmt. Name und Abschluss sind die Tatsachen.
- `vorteile.kacheln[0].text`
  - bisher: Ich antworte selbst und kenne Ihre Seite, weil ich sie gebaut habe.
  - neu: Meine Nummer steht unten auf dieser Seite.
  - Der alte Satz wiederholt die grosse Zeile. Der neue zeigt auf den Beleg, so wie die dritte Kachel auf die Messung zeigt.
- `faq.liste[1].antwort` (Frage "Ich habe schon eine Website.")
  - bisher: Dann schauen wir sie gemeinsam an und behalten, was gut ist.
  - neu: Ihre heutige Seite bleibt online, bis Sie mit der neuen einverstanden sind.
  - Der alte Satz sagt nichts Greifbares. Der neue beantwortet die Sorge hinter der Frage: Es gibt keinen Tag ohne Website.

### Geprüft und bestanden

- `vorteile.titel`: eine Zusage (eine Person, von Anfang an).
- `vorteile.kacheln[0].gross`, `[1].gross`, `[2].gross`: je eine Zusage.
- `vorteile.kacheln[2].text`: zeigt, wo der Leser die Ladezeit nachprüfen kann, und sagt zu, dass seine Seite gleich gebaut wird.
- `ablauf.titel`: eine Zusage. Wird nur ersetzt, wenn Fassung B in den Hero kommt (siehe oben).
- `ablauf.schritte[0].text` "Daraus bauen wir gemeinsam ein Konzept.": Raffas eigener Inhalt, der Leser erfährt, dass vor dem Entwurf ein Konzept steht.
- `ablauf.schritte[1].text`: der Kunde kann am Entwurf ändern.
- `ablauf.schritte[2].text`: online erst mit dem Ja des Kunden.
- `faq.titel`, `faq.liste[0].antwort`, `faq.liste[2].antwort`: je eine Tatsache oder Zusage.
- `kontakt.titel`, `kontakt.text`: der nächste Schritt, kostenlos, mit Frist.
- Die Zeilen zu bledi, zur Zahnarztpraxis und zu takabul: je etwas, das ein Besucher dort tun kann.
- `meta.beschreibung`, `meta.ogTitel`: stehen bei Google und in der Link-Vorschau, dort ist "was und für wen" die Auskunft, die der Leser braucht.
- Formular, Meldungen, Menü, Knöpfe, Fuss: Beschriftungen und Hinweise mit Auskunft, unverändert.

### Möglichkeit, keine Empfehlung

Wenn alle drei Kacheln gleich gebaut sein sollen (nur die grosse Zeile), dann für die dritte:
- `vorteile.kacheln[2].gross`: Ihre Seite lädt so schnell wie diese hier. (42 Zeichen)
- `vorteile.kacheln[2].text`: entfällt, ebenso der neue Text der ersten Kachel.

---

## Bitte bestätigen

1. "Meine Nummer steht unten auf dieser Seite.": Im Kontakt steht deine eigene Nummer, sichtbar und nicht nur als Knopf.
2. "Ihre heutige Seite bleibt online, bis Sie mit der neuen einverstanden sind.": Du schaltest eine alte Seite nie vorher ab.
3. "Nach dem Start müssen Sie nichts mehr tun.": Steht jetzt ohne Erklärung da. Wenn du in einem Satz sagen kannst, was die Betreuung umfasst (zum Beispiel: Sie melden mir neue Öffnungszeiten, und ich trage sie ein), wäre das echter Input für diese Kachel.
4. Für kamil-energy.ch: Gibt es etwas, das ein Besucher dort tun kann, so wie bei den drei anderen? Dann kommt eine Zeile zurück.

---

## Länge

Sichtbare Wörter von Hero bis Kontakt: vor Runde 7 waren es 272, nach Runde 7 315, mit dieser Runde rund 250 (mit Fassung B, ohne Intro, ohne `arbeiten.text`). Die Seite ist damit kürzer als vor Runde 7 und hat einen Abschnitt weniger. Die Empfehlung aus Runde 7, auch die Fragen zu streichen, gilt weiter.
