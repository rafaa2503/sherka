import { useEffect, useState } from "react";
import { useSprache } from "../lib/sprache";
import { TELEFON_ROH, whatsappLink } from "../lib/kontakt";
import { fuelle } from "../lib/typo";
import { useBetrieb } from "../lib/betrieb";
import { Marke } from "./Marke";
import { IconPhone, IconWhatsapp } from "./Icons";
import "./Rahmen.css";

/* Aktionsleiste am Handy: Anrufen, WhatsApp, Erstgespräch. Sichtbar, solange
   die Knöpfe der Bautafel nicht im Bild sind. Weg, sobald der Kontakt im Bild
   ist oder die Tastatur offen ist (ein Eingabefeld hat den Fokus). */

export function Aktionsleiste() {
  const { t } = useSprache();
  const { name } = useBetrieb();
  const [heroSichtbar, setHeroSichtbar] = useState(true);
  const [kontaktSichtbar, setKontaktSichtbar] = useState(false);
  const [tippt, setTippt] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-knoepfe");
    const kontakt = document.getElementById("kontakt");
    if (!hero || !kontakt || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((eintraege) => {
      for (const e of eintraege) {
        if (e.target === hero) setHeroSichtbar(e.isIntersecting);
        if (e.target === kontakt) setKontaktSichtbar(e.isIntersecting);
      }
    });
    io.observe(hero);
    io.observe(kontakt);

    const rein = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      setTippt(el.matches?.("input:not([type=radio]), textarea") ?? false);
    };
    const raus = () => setTippt(false);
    document.addEventListener("focusin", rein);
    document.addEventListener("focusout", raus);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", rein);
      document.removeEventListener("focusout", raus);
    };
  }, []);

  const sichtbar = !heroSichtbar && !kontaktSichtbar && !tippt;
  const waText = fuelle(t.kontakt.whatsappText, { betrieb: name.trim() || t.kontakt.whatsappOhne });

  return (
    <nav className={sichtbar ? "leiste leiste-an" : "leiste"} aria-label={t.aktionsleiste.label} inert={!sichtbar}>
      <a className="leiste-neben" href={`tel:+${TELEFON_ROH}`}>
        <IconPhone />
        <span>{t.aktionsleiste.anrufen}</span>
      </a>
      <a className="leiste-neben" href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer">
        <IconWhatsapp />
        <span>{t.aktionsleiste.whatsapp}</span>
      </a>
      <a className="knopf knopf-voll leiste-haupt" href="#kontakt">
        {t.aktionsleiste.anfragen}
      </a>
    </nav>
  );
}

export function Fuss() {
  const { t } = useSprache();
  return (
    <footer className="fuss">
      <div className="shell fuss-innen">
        <span className="fuss-marke" translate="no">
          <Marke />
        </span>
        <span className="leise">{t.fuss.ort}</span>
        <a href={t.fuss.impressumPfad}>{t.fuss.impressum}</a>
        <a href={t.fuss.datenschutzPfad}>{t.fuss.datenschutz}</a>
        <span className="fuss-jahr mono leise">2026</span>
      </div>
    </footer>
  );
}
