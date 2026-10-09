<?php
/*
 * Sherka: Kontaktformular-Endpunkt auf Infomaniak (Schweiz).
 *
 * Nimmt die Anfrage als JSON entgegen, prüft sie serverseitig und schickt sie
 * als reinen Text an das Sherka-Postfach. Keine Speicherung, keine
 * Auto-Antwort an den Absender (sonst liesse sich der Endpunkt für Spam an
 * fremde Adressen missbrauchen), keine Personendaten im Log.
 *
 * Konfiguration liegt AUSSERHALB des Webordners: ../../sherka-config.php
 * (Vorlage: deploy/sherka-config.example.php im Repo). Nie ins Repo legen,
 * das Repo ist öffentlich.
 *
 * Antworten: 200 ok, 400 Format, 403 Herkunft, 405 Methode, 413 zu gross,
 * 415 kein JSON, 422 Feldfehler {fehler:{feld:code}}, 429 zu viele Versuche,
 * 500 Konfiguration, 502 Versand fehlgeschlagen.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function antwort(int $code, array $daten = []): void
{
    http_response_code($code);
    echo json_encode($daten === [] ? ['ok' => $code === 200] : $daten, JSON_UNESCAPED_UNICODE);
    exit;
}

/* Nur Grund und Status, nie Inhalte, Namen, Adressen oder IP. */
function protokoll(string $grund, int $code): void
{
    error_log('[sherka-anfrage] ' . $code . ' ' . $grund);
}

$konfigDatei = dirname(__DIR__, 2) . '/sherka-config.php';
if (!is_file($konfigDatei)) {
    protokoll('konfiguration-fehlt', 500);
    antwort(500, ['ok' => false]);
}
$k = require $konfigDatei;

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    antwort(405, ['ok' => false]);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (!in_array($origin, $k['origins'] ?? [], true)) {
    protokoll('origin', 403);
    antwort(403, ['ok' => false]);
}

if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    antwort(415, ['ok' => false]);
}

$roh = file_get_contents('php://input', false, null, 0, 8193);
if ($roh === false || strlen($roh) > 8192) {
    antwort(413, ['ok' => false]);
}

$d = json_decode($roh, true);
if (!is_array($d)) {
    antwort(400, ['ok' => false]);
}

$erlaubt = ['anliegen', 'betrieb', 'zeitrahmen', 'text', 'name', 'email', 'telefon', 'sprache', 'firma', 'dauerMs'];
foreach (array_keys($d) as $feld) {
    if (!in_array($feld, $erlaubt, true)) {
        antwort(400, ['ok' => false]);
    }
}

/* Spam: Honeypot gefüllt oder unmenschlich schnell. Der Bot bekommt ein
   "ok", es wird aber nichts verschickt. */
$dauer = is_int($d['dauerMs'] ?? null) ? $d['dauerMs'] : 0;
if (($d['firma'] ?? '') !== '' || $dauer < 3000 || $dauer > 86400000) {
    protokoll('spam', 200);
    antwort(200);
}

/* Ratenbegrenzung ohne Datenbank: Zeitstempel pro (IP + Tagessalz) als Hash
   in einer Datei. Höchstens 5 Anfragen in 10 Minuten und 20 pro Tag. */
$ordner = $k['rate_ordner'] ?? sys_get_temp_dir();
$schluessel = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . date('Y-m-d') . ($k['salz'] ?? ''));
$datei = rtrim($ordner, '/') . '/sherka-rate-' . $schluessel;
$jetzt = time();
$fh = @fopen($datei, 'c+');
if ($fh !== false) {
    flock($fh, LOCK_EX);
    $liste = json_decode((string) stream_get_contents($fh), true);
    $liste = is_array($liste) ? array_values(array_filter($liste, fn ($t) => is_int($t) && $t > $jetzt - 86400)) : [];
    $zehnMinuten = count(array_filter($liste, fn ($t) => $t > $jetzt - 600));
    if ($zehnMinuten >= 5 || count($liste) >= 20) {
        flock($fh, LOCK_UN);
        fclose($fh);
        header('Retry-After: 600');
        protokoll('rate', 429);
        antwort(429, ['ok' => false]);
    }
    $liste[] = $jetzt;
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($liste));
    flock($fh, LOCK_UN);
    fclose($fh);
}

/* ---------- Prüfung ---------- */

function text_von($wert): string
{
    if (!is_string($wert)) {
        return '';
    }
    if (class_exists('Normalizer')) {
        $n = Normalizer::normalize($wert, Normalizer::FORM_C);
        if (is_string($n)) {
            $wert = $n;
        }
    }
    return trim($wert);
}

/* Einzeilige Felder: kein Zeilenumbruch, keine Steuerzeichen. */
function einzeilig(string $s): bool
{
    return !preg_match('/[\x00-\x1F\x7F]/u', $s);
}

$fehler = [];
$anliegen = text_von($d['anliegen'] ?? '');
$betrieb = text_von($d['betrieb'] ?? '');
$zeitrahmen = text_von($d['zeitrahmen'] ?? '');
$text = text_von($d['text'] ?? '');
$name = text_von($d['name'] ?? '');
$email = text_von($d['email'] ?? '');
$telefon = text_von($d['telefon'] ?? '');
$sprache = text_von($d['sprache'] ?? '');

$anliegenTexte = ['neu' => 'Neue Website', 'ueberarbeiten' => 'Bestehende Seite überarbeiten', 'anwendung' => 'App oder Tool', 'offen' => 'Weiss noch nicht'];
$zeitTexte = ['' => 'keine Angabe', 'bald' => 'So bald wie möglich', 'monate' => 'In den nächsten Monaten', 'umschauen' => 'Schaut sich erst um'];

if (!isset($anliegenTexte[$anliegen])) {
    $fehler['anliegen'] = 'pflicht';
}
if (!isset($zeitTexte[$zeitrahmen])) {
    $fehler['zeitrahmen'] = 'ungueltig';
}
if (!in_array($sprache, ['de', 'fr'], true)) {
    $fehler['sprache'] = 'ungueltig';
}
if (mb_strlen($name) < 2 || mb_strlen($name) > 80 || !einzeilig($name) || str_contains($name, '://')) {
    $fehler['name'] = 'ungueltig';
}
if (mb_strlen($betrieb) > 120 || !einzeilig($betrieb) || str_contains($betrieb, '://')) {
    $fehler['betrieb'] = 'ungueltig';
}
if (mb_strlen($text) > 1500 || preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', $text)) {
    $fehler['text'] = 'ungueltig';
}
if ($email !== '' && (mb_strlen($email) > 254 || !einzeilig($email) || filter_var($email, FILTER_VALIDATE_EMAIL) === false)) {
    $fehler['email'] = 'ungueltig';
}
if ($telefon !== '' && (!preg_match('/^\+?[0-9 ()\/-]{9,30}$/', $telefon) || strlen(preg_replace('/\D/', '', $telefon)) < 9)) {
    $fehler['telefon'] = 'ungueltig';
}
if ($email === '' && $telefon === '') {
    $fehler['erreichbar'] = 'pflicht';
}

if ($fehler !== []) {
    protokoll('validierung:' . implode(',', array_keys($fehler)), 422);
    antwort(422, ['ok' => false, 'fehler' => $fehler]);
}

/* ---------- Versand ---------- */

$an = $k['an'];
$von = $k['von'];

$betreff = '[Sherka] ' . $anliegenTexte[$anliegen] . ($betrieb !== '' ? ' · ' . mb_substr($betrieb, 0, 60) : '');
$zeit = (new DateTimeImmutable('now', new DateTimeZone('Europe/Zurich')))->format('d.m.Y H:i');
$id = bin2hex(random_bytes(4));

$zeilen = [
    'Neue Anfrage über sherka.ch',
    '',
    'Anliegen:   ' . $anliegenTexte[$anliegen],
    'Betrieb:    ' . ($betrieb !== '' ? $betrieb : '-'),
    'Zeitrahmen: ' . $zeitTexte[$zeitrahmen],
    'Name:       ' . $name,
    'E-Mail:     ' . ($email !== '' ? $email : '-'),
    'Telefon:    ' . ($telefon !== '' ? $telefon : '-'),
    'Sprache:    ' . strtoupper($sprache),
    '',
    'Nachricht:',
    $text !== '' ? $text : '-',
    '',
    '--',
    'Eingang ' . $zeit . ' (Europe/Zurich), Anfrage ' . $id,
];

$kopf = [
    'From: ' . $von,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];
// Reply-To nur mit geprüfter Adresse, ohne Anzeigenamen (keine Kopfzeilen-Injektion).
if ($email !== '') {
    $kopf[] = 'Reply-To: ' . $email;
}

mb_internal_encoding('UTF-8');
$ok = mail($an, mb_encode_mimeheader($betreff, 'UTF-8', 'Q'), implode("\r\n", $zeilen), implode("\r\n", $kopf), '-f' . $von);

if (!$ok) {
    protokoll('versand ' . $id, 502);
    antwort(502, ['ok' => false]);
}

protokoll('ok ' . $id, 200);
antwort(200);
