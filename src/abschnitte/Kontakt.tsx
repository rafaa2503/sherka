import { useEffect, useRef, useState } from "react";
import { useSprache } from "../lib/sprache";
import { fuelle } from "../lib/typo";
import { MAIL, TELEFON, whatsappLink } from "../lib/kontakt";
import { setzeName, useBetrieb } from "../lib/betrieb";
import { FORMULAR_AUS, MAIL_MUSTER, sendeAnfrage, telGueltig } from "../lib/formular";
import { IconMail, IconWhatsapp } from "./Icons";
import "./Kontakt.css";

/* Kontakt: WhatsApp und E-Mail zuerst, dann ein kurzes Formular.
   Pflicht sind nur: worum es geht, der Name, und E-Mail ODER Telefon.
   Geprüft wird beim Verlassen eines Feldes und beim Absenden, der Fokus
   springt zum ersten Fehler. Der Betriebsname kommt aus der Bautafel. */

type Fehler = Partial<Record<"anliegen" | "name" | "erreichbar" | "email" | "telefon", string>>;
type Zustand = "bereit" | "sendet" | "fertig" | "fehler" | "zuviele";

export function Kontakt() {
  const { t, sprache } = useSprache();
  const k = t.kontakt;
  const { name: betriebStore } = useBetrieb();

  const [anliegen, setAnliegen] = useState("");
  const [zeit, setZeit] = useState("");
  const [text, setText] = useState("");
  const [person, setPerson] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [fehler, setFehler] = useState<Fehler>({});
  const [zustand, setZustand] = useState<Zustand>("bereit");
  const [zusammenfassung, setZusammenfassung] = useState("");
  const geoeffnet = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const erfolg = useRef<HTMLDivElement>(null);
  const zumFehler = useRef(false);

  useEffect(() => {
    geoeffnet.current = Date.now();
  }, []);

  useEffect(() => {
    if (zustand === "fertig") erfolg.current?.focus();
  }, [zustand]);

  useEffect(() => {
    if (!zumFehler.current) return;
    zumFehler.current = false;
    const ziel = form.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    ziel?.focus();
  }, [fehler]);

  const betrieb = betriebStore.trim();

  function pruefe(): Fehler {
    const f: Fehler = {};
    if (!anliegen) f.anliegen = k.pflichtAnliegen;
    if (person.trim().length < 2) f.name = k.pflichtName;
    const m = email.trim();
    const tel = telefon.trim();
    if (!m && !tel) f.erreichbar = k.pflichtErreichbar;
    if (m && !MAIL_MUSTER.test(m)) f.email = k.falscheMail;
    if (tel && !telGueltig(tel)) f.telefon = k.falschesTel;
    return f;
  }

  // Beim Verlassen nur das eigene Feld prüfen, nicht alles auf einmal anzeigen.
  function pruefeFeld(feld: keyof Fehler) {
    const alle = pruefe();
    setFehler((alt) => {
      const neu = { ...alt, [feld]: alle[feld] };
      if (feld === "email" || feld === "telefon") neu.erreichbar = alt.erreichbar ? alle.erreichbar : undefined;
      return neu;
    });
  }

  function leere(feld: keyof Fehler) {
    setFehler((alt) => ({ ...alt, [feld]: undefined, ...(feld === "email" || feld === "telefon" ? { erreichbar: undefined } : {}) }));
  }

  async function senden(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (zustand === "sendet") return;
    const f = pruefe();
    const anzahl = Object.values(f).filter(Boolean).length;
    setFehler(f);
    if (anzahl > 0) {
      setZusammenfassung(fuelle(k.fehlerAnzahl, { n: anzahl }));
      zumFehler.current = true;
      return;
    }
    setZusammenfassung("");
    if (FORMULAR_AUS) {
      setZustand("fehler");
      return;
    }
    setZustand("sendet");
    const daten = new FormData(e.currentTarget);
    const r = await sendeAnfrage({
      anliegen,
      betrieb,
      zeitrahmen: zeit,
      text: text.trim(),
      name: person.trim(),
      email: email.trim(),
      telefon: telefon.trim(),
      sprache,
      firma: String(daten.get("firma") ?? ""),
      dauerMs: Date.now() - geoeffnet.current,
    });
    if (r.ok) setZustand("fertig");
    else if (r.art === "zuviele") setZustand("zuviele");
    else if (r.art === "feld") {
      const neu: Fehler = {};
      for (const feld of Object.keys(r.felder)) {
        if (feld === "anliegen") neu.anliegen = k.pflichtAnliegen;
        else if (feld === "name") neu.name = k.pflichtName;
        else if (feld === "email") neu.email = k.falscheMail;
        else if (feld === "telefon") neu.telefon = k.falschesTel;
        else neu.erreichbar = k.pflichtErreichbar;
      }
      setFehler(neu);
      zumFehler.current = true;
      setZustand("bereit");
    } else setZustand("fehler");
  }

  const waText = fuelle(k.whatsappText, { betrieb: betrieb || k.whatsappOhne });
  const titel = betrieb ? fuelle(k.titelMitName, { name: betrieb }) : k.titel;

  return (
    <section className="sektion kontakt-sektion" id="kontakt" aria-labelledby="kontakt-titel">
      <div className="shell kontakt">
        <div className="stapel kontakt-links">
          <h2 id="kontakt-titel">{titel}</h2>
          <p className="leise kontakt-text">{k.text}</p>
          <ul className="kanaele">
            <li>
              <a className="kanal" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
                <IconWhatsapp />
                <span>
                  <span className="kanal-art">{k.whatsapp}</span>
                  <span className="kanal-wert mono">{TELEFON}</span>
                </span>
              </a>
            </li>
            <li>
              <a className="kanal" href={`mailto:${MAIL}`}>
                <IconMail />
                <span>
                  <span className="kanal-art">{k.mail}</span>
                  <span className="kanal-wert">{MAIL}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        {zustand === "fertig" ? (
          <div className="anfrage-erfolg" tabIndex={-1} ref={erfolg} role="status">
            <h3>{k.erfolgTitel}</h3>
            <p>{fuelle(k.erfolgText, { name: person.trim().split(/\s+/)[0] ?? "" })}</p>
            <a className="textlink" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
              {k.erfolgEilig}
            </a>
          </div>
        ) : (
          <form className="anfrage" ref={form} onSubmit={senden} noValidate>
            <Wahl
              legende={k.anliegenLabel}
              name="anliegen"
              optionen={k.anliegen}
              wert={anliegen}
              setze={(w) => {
                setAnliegen(w);
                leere("anliegen");
              }}
              fehler={fehler.anliegen}
            />

            <Feld
              id="a-betrieb"
              label={k.betriebLabel}
              hinweis={k.freiwillig}
              wert={betriebStore}
              setze={setzeName}
              autoComplete="organization"
            />

            <Wahl
              legende={k.zeitLabel}
              hinweis={k.freiwillig}
              name="zeitrahmen"
              optionen={k.zeit}
              wert={zeit}
              setze={setZeit}
            />

            <div className="feld">
              <label htmlFor="a-text">
                {k.textLabel} <span className="leise">{k.freiwillig}</span>
              </label>
              <textarea
                id="a-text"
                rows={3}
                maxLength={1500}
                placeholder={k.textPlatzhalter}
                value={text}
                aria-describedby="a-text-hinweis"
                onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
              />
              <p className="feld-hinweis" id="a-text-hinweis">
                {k.textHinweis}
              </p>
            </div>

            <Feld
              id="a-name"
              label={k.nameLabel}
              wert={person}
              setze={(w) => {
                setPerson(w);
                leere("name");
              }}
              beimVerlassen={() => pruefeFeld("name")}
              autoComplete="name"
              fehler={fehler.name}
            />

            <fieldset className="erreichbar" aria-describedby="a-erreichbar-hinweis">
              <legend className="nur-lesen">{k.erreichbarHinweis}</legend>
              <div className="anfrage-paar">
                <Feld
                  id="a-mail"
                  label={k.mailLabel}
                  typ="email"
                  modus="email"
                  wert={email}
                  setze={(w) => {
                    setEmail(w);
                    leere("email");
                  }}
                  beimVerlassen={() => pruefeFeld("email")}
                  autoComplete="email"
                  fehler={fehler.email}
                  gruppenFehler={!!fehler.erreichbar}
                />
                <Feld
                  id="a-tel"
                  label={k.telLabel}
                  typ="tel"
                  modus="tel"
                  wert={telefon}
                  setze={(w) => {
                    setTelefon(w);
                    leere("telefon");
                  }}
                  beimVerlassen={() => pruefeFeld("telefon")}
                  autoComplete="tel"
                  fehler={fehler.telefon}
                  gruppenFehler={!!fehler.erreichbar}
                />
              </div>
              <p className={fehler.erreichbar ? "feld-fehler" : "feld-hinweis"} id="a-erreichbar-hinweis">
                {fehler.erreichbar ?? k.erreichbarHinweis}
              </p>
            </fieldset>

            {/* Honeypot: für Menschen unsichtbar, für Screenreader ausgeblendet. */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="a-firma">Firma</label>
              <input id="a-firma" name="firma" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="anfrage-fuss">
              <button className="knopf knopf-voll" type="submit" disabled={zustand === "sendet"}>
                {zustand === "sendet" ? k.sendet : k.senden}
              </button>
              <p className="leise anfrage-hinweis">{k.datenschutzHinweis}</p>
            </div>

            <p className="anfrage-zusammenfassung" role="alert">
              {zusammenfassung}
            </p>

            {(zustand === "fehler" || zustand === "zuviele") && (
              <div className="anfrage-fehler" role="alert">
                <p>
                  <strong>{k.fehlerTitel}</strong>
                </p>
                <p className="leise">{FORMULAR_AUS ? k.aus : zustand === "zuviele" ? k.zuViele : k.fehlerText}</p>
                <p className="anfrage-alternativen">
                  <a className="textlink" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  <a className="textlink" href={`mailto:${MAIL}`}>
                    {MAIL}
                  </a>
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function Wahl({
  legende,
  hinweis,
  name,
  optionen,
  wert,
  setze,
  fehler,
}: {
  legende: string;
  hinweis?: string;
  name: string;
  optionen: { wert: string; text: string }[];
  wert: string;
  setze: (v: string) => void;
  fehler?: string;
}) {
  const fehlerId = `${name}-fehler`;
  return (
    <fieldset className="wahl">
      <legend>
        {legende} {hinweis && <span className="leise">{hinweis}</span>}
      </legend>
      <div className="wahl-knoepfe">
        {optionen.map((o, i) => (
          <label key={o.wert} className="chip">
            <input
              type="radio"
              name={name}
              value={o.wert}
              checked={wert === o.wert}
              onChange={() => setze(o.wert)}
              aria-invalid={fehler && i === 0 ? true : undefined}
              aria-describedby={fehler ? fehlerId : undefined}
            />
            <span>{o.text}</span>
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
  label,
  hinweis,
  typ = "text",
  modus,
  wert,
  setze,
  beimVerlassen,
  autoComplete,
  fehler,
  gruppenFehler,
}: {
  id: string;
  label: string;
  hinweis?: string;
  typ?: string;
  modus?: "email" | "tel";
  wert: string;
  setze: (v: string) => void;
  beimVerlassen?: () => void;
  autoComplete?: string;
  fehler?: string;
  gruppenFehler?: boolean;
}) {
  const beschrieben = [fehler ? `${id}-fehler` : "", gruppenFehler ? "a-erreichbar-hinweis" : ""].filter(Boolean).join(" ");
  return (
    <div className="feld">
      <label htmlFor={id}>
        {label} {hinweis && <span className="leise">{hinweis}</span>}
      </label>
      <input
        id={id}
        type={typ}
        inputMode={modus}
        value={wert}
        autoComplete={autoComplete}
        enterKeyHint="next"
        aria-invalid={fehler || gruppenFehler ? true : undefined}
        aria-describedby={beschrieben || undefined}
        onInput={(e) => setze((e.target as HTMLInputElement).value)}
        onBlur={beimVerlassen}
      />
      {fehler && (
        <p className="feld-fehler" id={`${id}-fehler`}>
          {fehler}
        </p>
      )}
    </div>
  );
}
