import { useEffect, useRef, useState } from "react";
import { WOERTER, useSprache, type Sprache } from "../lib/sprache";
import { anzeigeName, NAME_MAX, setzeBranche, setzeName, useBetrieb } from "../lib/betrieb";
import { fuelle } from "../lib/typo";
import { whatsappLink } from "../lib/kontakt";
import { aufrichten, bewegungsStufe, type Ab, type Aufrichte } from "../bautafel/aufrichte";
import { Vorschau } from "../bautafel/Vorschau";
import { VORLAGEN, vorlage as findeVorlage } from "../bautafel/vorlagen";
import { IconCheck, IconWhatsapp } from "./Icons";
import "./Bautafel.css";

/* Der Anfang der Seite: eine Bautafel, auf der der Besucher Bauherr ist.
   Funktioniert ohne Tippen: der Entwurf steht beim Laden schon da, ein Klick
   auf eine Branche genügt, der Name ist freiwillig. Am Handy steht der
   Entwurf über der Tafel, damit die Tastatur ihn nicht verdeckt. */

export function Bautafel() {
  const { t, sprache } = useSprache();
  const { name, branche } = useBetrieb();
  const [vSprache, setVSprache] = useState<Sprache>(sprache);
  const [status, setStatus] = useState("");
  const [messung, setMessung] = useState("");
  const bg = useRef<HTMLDivElement>(null);
  const vp = useRef<HTMLDivElement>(null);
  const massText = useRef<HTMLSpanElement>(null);
  const lauf = useRef<Aufrichte | null>(null);
  const erster = useRef(true);

  const v = findeVorlage(branche);
  const angezeigt = anzeigeName(name, t.tafel.ihrBetrieb);

  const starte = (ab: Ab, ansagen: boolean) => {
    const el = bg.current;
    if (!el) return;
    lauf.current = aufrichten(el, ab, bewegungsStufe(), () => {
      if (ansagen) setStatus(fuelle(t.tafel.status, { name: angezeigt, branche: v.label[sprache] }));
    });
  };

  // Beim Laden einmal ganz aufrichten. Scrollen, Escape oder ein Klick in
  // den Entwurf springt sofort zum Ende.
  useEffect(() => {
    starte("schnur", false);
    const weiter = () => lauf.current?.ueberspringen();
    const taste = (e: KeyboardEvent) => e.key === "Escape" && weiter();
    window.addEventListener("scroll", weiter, { once: true, passive: true });
    window.addEventListener("keydown", taste);
    const el = bg.current;
    el?.addEventListener("pointerdown", weiter);
    return () => {
      window.removeEventListener("scroll", weiter);
      window.removeEventListener("keydown", taste);
      el?.removeEventListener("pointerdown", weiter);
    };
  }, []);

  // Name geändert: nach kurzer Pause ab dem Ausbau neu.
  useEffect(() => {
    if (erster.current) return;
    const id = window.setTimeout(() => starte("ausbau", true), 350);
    return () => window.clearTimeout(id);
  }, [name]);

  // Branche geändert: ab dem Rohbau neu.
  useEffect(() => {
    if (erster.current) {
      erster.current = false;
      return;
    }
    starte("rohbau", true);
  }, [branche]);

  // Echte Masse des Entwurfs im Baugespann.
  useEffect(() => {
    const el = vp.current?.querySelector<HTMLElement>(".vp");
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([e]) => {
      const box = e.borderBoxSize?.[0];
      const w = Math.round(box ? box.inlineSize : e.contentRect.width);
      const h = Math.round(box ? box.blockSize : e.contentRect.height);
      if (massText.current) massText.current.textContent = `${w} × ${h} px`;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Abnahme-Plakette: wie schnell war diese Seite lesbar? Gemessen im
  // Browser des Besuchers, nichts geschätzt.
  useEffect(() => {
    const zahl = new Intl.NumberFormat(sprache === "fr" ? "fr-CH" : "de-CH", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const zeige = (ms: number, satz: string) => setMessung(fuelle(satz, { s: zahl.format(ms / 1000) }));
    let beobachter: PerformanceObserver | undefined;
    const unterstuetzt =
      typeof PerformanceObserver !== "undefined" &&
      PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint");
    if (unterstuetzt) {
      beobachter = new PerformanceObserver((liste) => {
        const e = liste.getEntries()[liste.getEntries().length - 1];
        if (e) zeige(e.startTime, t.tafel.messungLcp);
      });
      beobachter.observe({ type: "largest-contentful-paint", buffered: true });
    } else {
      const nav = () => {
        const n = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        if (n && n.loadEventEnd > 0) zeige(n.loadEventEnd, t.tafel.messungLaden);
      };
      if (document.readyState === "complete") nav();
      else window.addEventListener("load", () => setTimeout(nav, 0), { once: true });
    }
    return () => beobachter?.disconnect();
  }, [sprache]);

  const waText = fuelle(t.kontakt.whatsappText, { betrieb: name.trim() || t.kontakt.whatsappOhne });

  return (
    <section className="tafel-sektion" id="oben" aria-labelledby="tafel-titel">
      <div className="shell tafel-raster">
        <div className="tafel-kopf">
          <h1 id="tafel-titel">
            {t.tafel.titelOben}
            <br />
            {t.tafel.titelUnten}
          </h1>
          <p className="tafel-unter">{t.tafel.unterzeile}</p>
        </div>

        <div className="bg" ref={bg}>
          <span className="bg-linie bg-o" data-achse="x" aria-hidden="true" />
          <span className="bg-linie bg-u" data-achse="x" aria-hidden="true" />
          <span className="bg-linie bg-l" data-achse="y" aria-hidden="true" />
          <span className="bg-linie bg-r" data-achse="y" aria-hidden="true" />
          <span className="bg-pfosten bg-p1" aria-hidden="true" />
          <span className="bg-pfosten bg-p2" aria-hidden="true" />
          <span className="bg-pfosten bg-p3" aria-hidden="true" />
          <span className="bg-pfosten bg-p4" aria-hidden="true" />
          <span className="bg-mass mono" aria-hidden="true">
            <span ref={massText} />
          </span>

          <div className="bg-feld" ref={vp}>
            <Vorschau
              vorlage={v}
              name={angezeigt}
              sprache={vSprache}
              setzeSprache={setVSprache}
              texte={{
                // Hilfstexte im Entwurf folgen der Sprache des Entwurfs.
                fotos: WOERTER[vSprache].tafel.fotos,
                nichtsGesendet: WOERTER[vSprache].tafel.nichtsGesendet,
                label: fuelle(t.tafel.vorschauLabel, { name: angezeigt }),
                sprachLabel: t.tafel.vorschauSprache,
              }}
            />
          </div>

          <p className="bg-plakette">
            <IconCheck />
            <span>{t.tafel.abgenommen}</span>
            {messung && <span className="leise">{messung}</span>}
          </p>
        </div>

        <p className="tafel-entwurf">{fuelle(t.tafel.entwurfFuer, { name: angezeigt })}</p>

        <div className="tafel" role="group" aria-label={t.tafel.tafelLabel}>
          <div className="tafel-zeile">
            <label className="tafel-feld" htmlFor="tafel-name">
              {t.tafel.bauherrschaft}
            </label>
            <div className="tafel-wert">
              <input
                id="tafel-name"
                type="text"
                value={name}
                maxLength={NAME_MAX * 2}
                placeholder={t.tafel.platzhalter}
                autoComplete="organization"
                enterKeyHint="done"
                spellCheck={false}
                aria-describedby="tafel-name-hinweis"
                onInput={(e) => setzeName((e.target as HTMLInputElement).value)}
              />
              <p className="tafel-hinweis" id="tafel-name-hinweis">
                {t.tafel.feldHinweis}
              </p>
            </div>
          </div>

          <div className="tafel-zeile">
            <span className="tafel-feld" id="tafel-branche">
              {t.tafel.branche}
            </span>
            <div className="tafel-wert tafel-chips" role="radiogroup" aria-labelledby="tafel-branche">
              {VORLAGEN.map((vl) => (
                <label key={vl.id} className="chip">
                  <input
                    type="radio"
                    name="branche"
                    value={vl.id}
                    checked={branche === vl.id}
                    onChange={() => setzeBranche(vl.id)}
                  />
                  <span>
                    <IconCheck />
                    {vl.label[sprache]}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="tafel-zeile">
            <span className="tafel-feld">{t.tafel.planung}</span>
            <span className="tafel-wert">{t.tafel.planungWer}</span>
          </div>
          <div className="tafel-zeile">
            <span className="tafel-feld">{t.tafel.hauswartung}</span>
            <span className="tafel-wert">{t.tafel.hauswartungWer}</span>
          </div>
        </div>

        <div className="tafel-knoepfe" id="hero-knoepfe">
          <a className="knopf knopf-voll" href="#kontakt">
            {t.tafel.cta}
          </a>
          <a className="knopf knopf-leer" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
            <IconWhatsapp />
            {t.tafel.whatsapp}
          </a>
        </div>

        <p className="nur-lesen" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}
