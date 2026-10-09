# Sherka Relaunch, Version 1

Ergebnis einer Diskussion mit acht Agents am 6. Oktober 2026: vier mögliche Kunden (Coiffeurin Nidau, Schreiner Lyss, Startup-Gründerin Bern, Physio-Praxismanagerin Biel), Chef, Designerin, Entwickler, Senior-Berater. Vier Runden, jeder hat die echte Seite gesehen.

## Grundsatz

Effekt später, Charakter sofort. Bis zum Livegang wird nur gestrichen und fertiggemacht, nichts Neues erfunden. Keine neuen Referenzseiten bis dahin.

## Streichen (der unveröffentlichte Teemar-Umbau und mehr)

- Teemar-Umbau verwerfen: Blatt über klebendem Hero, kippende Projektkarte mit Pillen, Glas-Pille, Einheits-Glas-Karten
- Nebel-Shader, Laufschrift, Zahlenleiste, Ladevorhang, Hover-Lift, Glow, Magnetknöpfe, 3D-Kippen
- Buchstaben-Zerlegung der Überschriften (verursacht "w / as" und "u / nd" und lässt Überschriften nach dem Wechsel auf FR deutsch stehen)
- Korn mit mix-blend-mode, backdrop-filter überall ausser in der Nav (Ruckelverdacht auf iPads)
- Newsreader-Schrift, Branchenkarten, Platzhalter-Stimmen, "Foto folgt"
- Toter Code: Buehne, Galerie, BildFluss, archivo-Schrift, umbau-Skripte

## Version 1

- **Hell als Standard**, dunkel per Schalter. Orange nur auf Knöpfen zum Handeln. Fliesstext gross und kontrastreich.
- **Anfang:** "Ihre Website soll etwas können. Nicht nur da sein.", Anfragen und WhatsApp, rechts die echte bledi-Seite als Handy-Bild.
- **Arbeiten als Prüfblätter:** vier Projekte, identischer Aufbau, festes Raster, Monospace für Messwerte mit Messdatum. Ganz oben: Domain und Zugänge gehören dem Kunden. takabul.ch als Beispiel mit Redaktionssystem. Darunter: "Salon, Praxis oder Handwerk? Auch dafür."
- **Ablauf:** vier Schritte mit Zeiten, Gespräch ausdrücklich "kostenlos und unverbindlich". Preisform nach Raffas Entscheid.
- **Über mich:** echtes Foto, Adresse nach Raffas Entscheid, sichtbare Antwort auf "Was, wenn Sie ausfallen?", zwei Sätze Arbeitsweise (nur was wirklich stimmt), Erfahrung ohne Arbeitgeber.
- **Satz zu Patientendaten:** "Arbeiten Sie mit Patientendaten? Dann klären wir im ersten Gespräch, welche Angaben ein Formular überhaupt abfragen darf und wo sie landen."
- **Fragen:** Akkordeon ohne Kartenoptik.
- **Kontakt:** WhatsApp und Telefon zuerst, dann Formular, Mail auf sherka.ch, eine einzige Antwortzeit. Formular meldet Fehler laut.
- **Rechtsseiten** auf DE und FR. Datenschutz nennt Formspree und Vercel samt Grundlage der Übermittlung in die USA, belegt aus deren Bedingungen. Tempocheck raus.
- **Französisch** von einer Romande gegengelesen (bezahlt).
- **Technik:** vorgerendertes HTML, eigene /fr/-URL, Schriften gekürzt, og.png.
- **Läufer:** nur am Computer, auf der Linie, nie über Text. Weg am Handy und bei reduzierter Bewegung, weg auf dem iPad falls er ruckelt.

## Fertig, wenn

- LCP am Handy unter 2,0 s, CLS unter 0,05, JS höchstens 95 KB gzip
- nichts liegt über Text, FR-Wechsel funktioniert, reduzierte Bewegung vollständig lesbar
- geprüft auf altem iPad und Mittelklasse-Android
- `npm run startklar` grün

## Zeitplan

| Datum | Aufgabe |
|---|---|
| Di 6.10. | Raffa beantwortet die vier Fragen. Zitatentwürfe per WhatsApp an Bledi und Praxis. Foto bei Tageslicht. |
| Mi 7. bis Do 8.10. | Fundament und Streichliste |
| Fr 9.10. | Texte an die Romande, sherka.ch-Mail eingerichtet |
| Mo 12.10. | Rechtsseiten DE/FR, Formspree angeschlossen |
| Do 15.10. | Messung auf echten Geräten, Französisch zurück |
| Sa 17.10. | Livegang |
| Di 20.10. | spätestes Datum, danach wird gestrichen statt verschoben |

Abbruchkriterien: keine schriftliche Freigabe bis 12.10. = live ohne Stimmen. Kein Foto bis 15.10. = "Über mich" ohne Bildfläche, nie "Foto folgt". Französisch nicht gegengelesen = Livegang 20.10., nie mit bekannten Fehlern.

## Später, in dieser Reihenfolge

1. Google-Unternehmensprofil mit ersten Bewertungen
2. Praxis-Lösung (Formular ohne Beschwerdefeld, Schweizer Mailweg, Auftragsbearbeitungsvertrag), erst dann als Versprechen auf die Seite
3. Version 2 mit der Bau-Sequenz, 8 Stunden Deckel, statische Version als Rückfall. Frühestens Mo 2.11. und nur nach zehn angesprochenen Betrieben
4. Live-Datenblatt (10 bis 12 Stunden, nur mit Einverständnis der Kunden)
5. Fallstudie mit Login und Daten, sobald es ein echtes Projekt gibt
6. Branchen-Umschalter

## Entschieden (6.10.)

1. Preis: keine Preise auf der Seite, das Thema wird gar nicht angesprochen. Markt wird zuerst analysiert.
3. Adresse: auf der Seite nur Biel/Bienne. Das Impressum braucht voraussichtlich trotzdem eine vollständige Adresse (UWG Art. 3 Abs. 1 lit. s), prüfen lassen.
4. Antwortzeit: "innerhalb eines Werktags". Erstgespräch bleibt "kostenlos".
5. Abweichung vom Plan: Raffa will den IT-Beweis sofort sichtbar. Deshalb schon in V1: Bau-Sequenz (Code links, Seite rechts, scrollgesteuert) und echte Live-Kundenseite im Hero-Handy. Rückfall ohne Animation bei Handy und reduzierter Bewegung.

## Noch offen, entscheidet Raffa

1. Preis: (a) nichts, (b) "Nach einem kostenlosen 20-Minuten-Gespräch bekommen Sie einen schriftlichen Fixpreis, bevor etwas beginnt. Betrieb und Pflege ab CHF 30 im Monat.", (c) eine Spanne. Empfehlung: (b).
2. Ausfall: was wirklich passiert, wenn Raffa ausfällt
3. Strassenadresse öffentlich oder nur Biel/Bienne
4. Antwortzeit, die neben dem Zivildienst wirklich gehalten wird. Empfehlung: "innerhalb eines Werktags"
