<?php
/*
 * Vorlage für die Konfiguration des Formular-Endpunkts.
 *
 * Auf Infomaniak als sherka-config.php EINE EBENE ÜBER dem Webordner ablegen
 * (also neben "web", nicht darin), damit sie nie über eine URL abrufbar ist.
 * Diese Datei mit echten Werten niemals ins Repo legen: das Repo ist öffentlich.
 */

return [
    // Postfach, das die Anfragen bekommt.
    'an' => 'hallo@sherka.ch',
    // Absender: eine Adresse auf sherka.ch, damit SPF und DKIM passen.
    'von' => 'anfrage@sherka.ch',
    // Nur Anfragen von diesen Seiten werden angenommen.
    'origins' => ['https://sherka.ch', 'https://www.sherka.ch'],
    // Zufällige Zeichenkette, einmal erzeugen (z. B. 32 Zeichen), nie teilen.
    'salz' => 'HIER_ZUFAELLIGE_ZEICHENKETTE',
    // Ordner für die Ratenbegrenzung, ausserhalb des Webordners, beschreibbar.
    'rate_ordner' => __DIR__ . '/sherka-rate',
];
