import { useEffect, useRef, useState } from "react";
import { useSprache } from "../i18n";
import "./Anfrage.css";

/* Ein Bildschirm statt drei Schritten: bei fuenf Feldern kostet jeder
   Schrittwechsel mehr Abbrecher, als die Qualifizierung einbringt.
   Die Auswahlknoepfe stehen alle gleichzeitig da, das qualifiziert genauso gut.

   Kein react-hook-form und kein zod: rund 25 KB fuer fuenf Felder waeren auf
   einer Seite, die mit Tempo argumentiert, nicht zu rechtfertigen. */

const FORMSPREE = import.meta.env.VITE_FORMSPREE as string | undefined;

type Zustand = "bereit" | "sendet" | "fertig" | "fehler";
type Fehler = Partial<Record<"projekt" | "zeit" | "name" | "mail", string>>;

export function Anfrage({ domain }: { domain: string | null }) {
  const { t, sprache } = useSprache();
  const [projekt, setProjekt] = useState("");
  const [zeit, setZeit] = useState("");
  const [zustand, setZustand] = useState<Zustand>("bereit");
  const [fehler, setFehler] = useState<Fehler>({});
  const form = useRef<HTMLFormElement>(null);
  const geoeffnet = useRef(Date.now());
  const erfolgRef = useRef<HTMLDivElement>(null);
  const zumFehler = useRef(false);

  // Kommt jemand aus dem Tempocheck, ist die Domain schon bekannt.
  const [text, setText] = useState("");
  useEffect(() => {
    if (domain) {
      setProjekt(t.kontakt.projektOptionen[1]);
      setText(`${domain}\n`);
    }
  }, [domain, t]);

  useEffect(() => {
    if (zustand === "fertig") erfolgRef.current?.focus();
  }, [zustand]);

  /* Fokus erst setzen, nachdem React die Fehler gerendert hat. Direkt im
     Absende-Handler zu suchen findet nichts, weil aria-invalid dort noch
     gar nicht im DOM steht. */
  useEffect(() => {
    if (!zumFehler.current) return;
    zumFehler.current = false;
    const block = form.current?.querySelector<HTMLElement>("[data-fehler]");
    if (!block) return;
    const ziel = block.querySelector<HTMLElement>("input, textarea") ?? block;
    ziel.focus();
    block.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [fehler]);

  function pruefe(daten: FormData): Fehler {
    const f: Fehler = {};
    if (!projekt) f.projekt = t.kontakt.pflichtProjekt;
    if (!zeit) f.zeit = t.kontakt.pflichtZeit;
    if (!String(daten.get("name") ?? "").trim()) f.name = t.kontakt.pflichtName;
    const mail = String(daten.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) f.mail = t.kontakt.pflichtMail;
    return f;
  }

  async function senden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const daten = new FormData(e.currentTarget);

    // Honeypot plus Zeitpruefung. Bots fuellen versteckte Felder und
    // schicken schneller ab, als ein Mensch tippen kann.
    if (String(daten.get("firma") ?? "") !== "" || Date.now() - geoeffnet.current < 3000) {
      setZustand("fertig");
      return;
    }

    const f = pruefe(daten);
    setFehler(f);
    if (Object.keys(f).length > 0) {
      zumFehler.current = true;
      return;
    }

    if (!FORMSPREE) {
      console.warn("VITE_FORMSPREE fehlt. Anfrage wurde nicht verschickt.", Object.fromEntries(daten));
      setZustand("fertig");
      return;
    }

    setZustand("sendet");
    daten.set("_subject", `Sherka Anfrage: ${projekt}`);
    daten.set("sprache", sprache);
    try {
      const antwort = await fetch(FORMSPREE, {
        method: "POST",
        body: daten,
        headers: { Accept: "application/json" },
      });
      setZustand(antwort.ok ? "fertig" : "fehler");
    } catch {
      setZustand("fehler");
    }
  }

  if (zustand === "fertig") {
    return (
      <div className="anfrage-erfolg" tabIndex={-1} ref={erfolgRef} role="status">
        <h3>{t.kontakt.erfolgTitel}</h3>
        <p className="leise">{t.kontakt.erfolgText}</p>
      </div>
    );
  }

  return (
    <form className="anfrage" ref={form} onSubmit={senden} noValidate>
      <Wahl
        legende={t.kontakt.projektLabel}
        name="projekt"
        optionen={t.kontakt.projektOptionen}
        wert={projekt}
        setze={(v) => {
          setProjekt(v);
          setFehler((f) => ({ ...f, projekt: undefined }));
        }}
        fehler={fehler.projekt}
      />

      <Wahl
        legende={t.kontakt.zeitLabel}
        name="zeitrahmen"
        optionen={t.kontakt.zeitOptionen}
        wert={zeit}
        setze={(v) => {
          setZeit(v);
          setFehler((f) => ({ ...f, zeit: undefined }));
        }}
        fehler={fehler.zeit}
      />

      <div className="feld">
        <label htmlFor="a-text">
          {t.kontakt.beschreibungLabel} <span className="leise">{t.kontakt.beschreibungHinweis}</span>
        </label>
        <textarea
          id="a-text"
          name="beschreibung"
          rows={4}
          placeholder={t.kontakt.beschreibungPlatzhalter}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="anfrage-paar">
        <Feld
          id="a-name"
          name="name"
          label={t.kontakt.nameLabel}
          autoComplete="name"
          fehler={fehler.name}
          leere={() => setFehler((f) => ({ ...f, name: undefined }))}
        />
        <Feld
          id="a-mail"
          name="email"
          type="email"
          label={t.kontakt.mailLabel}
          autoComplete="email"
          fehler={fehler.mail}
          leere={() => setFehler((f) => ({ ...f, mail: undefined }))}
        />
      </div>

      <Feld
        id="a-tel"
        name="telefon"
        type="tel"
        label={t.kontakt.telLabel}
        hinweis={t.kontakt.telHinweis}
        autoComplete="tel"
      />

      {/* Honeypot: fuer Menschen unsichtbar, fuer Screenreader ausgeblendet. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="a-firma">Firma</label>
        <input id="a-firma" name="firma" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="anfrage-fuss">
        <button className="knopf knopf-voll" type="submit" disabled={zustand === "sendet"}>
          <span className="knopf-text">{zustand === "sendet" ? t.kontakt.sendet : t.kontakt.senden}</span>
        </button>
        <p className="leise anfrage-hinweis">{t.kontakt.datenschutzHinweis}</p>
      </div>

      {zustand === "fehler" && (
        <div className="anfrage-fehler" role="alert">
          <p>{t.kontakt.fehlerTitel}</p>
          <p className="leise">{t.kontakt.fehlerText}</p>
        </div>
      )}
    </form>
  );
}

function Wahl({
  legende,
  name,
  optionen,
  wert,
  setze,
  fehler,
}: {
  legende: string;
  name: string;
  optionen: readonly string[];
  wert: string;
  setze: (v: string) => void;
  fehler?: string;
}) {
  const fehlerId = `${name}-fehler`;
  const legendeId = `${name}-legende`;
  return (
    <fieldset className="wahl" data-fehler={fehler ? "" : undefined}>
      <legend id={legendeId}>{legende}</legend>
      {/* aria-invalid gehoert an die Gruppe, nicht an jeden einzelnen Knopf.
          Sonst meldet ein Screenreader den Fehler vier Mal hintereinander. */}
      <div
        className="wahl-knoepfe"
        role="radiogroup"
        aria-labelledby={legendeId}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={fehler ? fehlerId : undefined}
      >
        {optionen.map((o) => (
          <label key={o} className="chip">
            <input type="radio" name={name} value={o} checked={wert === o} onChange={() => setze(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {fehler && (
        <p className="feld-fehler" id={fehlerId}>
          {fehler}
        </p>
      )}
    </fieldset>
  );
}

function Feld({
  id,
  name,
  label,
  type = "text",
  hinweis,
  autoComplete,
  fehler,
  leere,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  hinweis?: string;
  autoComplete?: string;
  fehler?: string;
  leere?: () => void;
}) {
  return (
    <div className="feld" data-fehler={fehler ? "" : undefined}>
      <label htmlFor={id}>
        {label} {hinweis && <span className="leise">{hinweis}</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={fehler ? true : undefined}
        aria-describedby={fehler ? `${id}-fehler` : undefined}
        onChange={leere}
      />
      {fehler && (
        <p className="feld-fehler" id={`${id}-fehler`}>
          {fehler}
        </p>
      )}
    </div>
  );
}
