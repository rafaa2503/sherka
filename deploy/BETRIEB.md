# Sherka V2: Betrieb

Kurzanleitung für Livegang und Betrieb. Keine Zugangsdaten in dieses Repo: es ist öffentlich.

## Bauen und prüfen (lokal)

```
npm run build        # Typen, Browser-Build, Vorrendern, Budget
npm run preview      # http://localhost:4173
npm run pruefen      # Prüfmatrix, Bericht in ansichten/pruefen/
npm run startklar    # Platzhalter, verbotene Wörter, Domain, Französisch
node scripts/og.mjs  # Teilen-Bilder neu erzeugen
```

## Vorschau auf Cloudflare Pages (Branch v2)

- Projekt mit dem GitHub-Repo verbinden, Produktionsbranch `main` NICHT verwenden, nur Vorschau-Builds für `v2`.
- Build-Befehl: `npm run build`, Ausgabeordner: `dist`.
- Umgebungsvariablen der Vorschau: `SHERKA_VORSCHAU=1` (noindex, robots sperren) und `VITE_FORMULAR_AUS=1` (Formular aus, es gibt dort kein PHP).
- Zugang mit Cloudflare Access schützen.

## Produktion auf Infomaniak

1. **Domain:** sherka.ch registrieren (Halter Raffa), DNS bei Infomaniak. `www` leitet die `.htaccess` auf die Hauptdomain um.
2. **Mail:** Postfach `info@sherka.ch` anlegen (dient auch als Absender).
   - SPF: `v=spf1 include:spf.infomaniak.ch -all`
   - DKIM im Manager aktivieren
   - DMARC zuerst `v=DMARC1; p=none; rua=mailto:info@sherka.ch`, nach vier Wochen `quarantine`, später `reject`
3. **Webhosting:** PHP 8.2 oder neuer. Webordner z. B. `sites/sherka.ch`.
4. **Formular-Konfiguration:** `deploy/sherka-config.example.php` kopieren, Werte eintragen, als `sherka-config.php` EINE EBENE ÜBER dem Webordner ablegen. Ordner `sherka-rate` daneben anlegen (beschreibbar).
5. **Auslieferung:** GitHub Action `Deploy` (`.github/workflows/deploy.yml`). Secrets: `INFOMANIAK_SSH_HOST`, `INFOMANIAK_SSH_USER`, `INFOMANIAK_SSH_KEY`, `INFOMANIAK_WEBORDNER`.
6. **Testversand:** Formular einmal echt ausfüllen, in der Mail prüfen, dass SPF und DKIM `pass` melden.
7. **CSP:** Der Build setzt die Regeln zuerst nur als Bericht (`Content-Security-Policy-Report-Only`). Nach einer Woche ohne Verstösse mit `SHERKA_CSP_SCHARF=1` bauen.
8. **Überwachung:** UptimeRobot (gratis) für sherka.ch und die vier Kundenseiten, Google Search Console mit `sitemap.xml`.

## Zurück auf V1

V1 läuft bis zum Wechsel weiter auf Vercel (Tag `v1.0`). Bei einem Problem nach dem Wechsel: DNS wieder auf Vercel zeigen lassen oder den vorherigen Stand per `Deploy` von Hand ausliefern.

## Notfall

Zugänge (Infomaniak, GitHub, Domain) gehören in einen Passwortmanager mit Notfallzugriff, nicht in dieses Repo. Ein Notfall-Dokument mit Registrar, Hosting-Konten und Ablauf eines Deploys liegt ebenfalls dort.
