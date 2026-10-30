import { useSprache } from "../lib/sprache";
import { Marke } from "./Marke";
import "./Rahmen.css";

const INSTAGRAM = "https://www.instagram.com/sherka.ch/";

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
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
          {t.fuss.instagram}
        </a>
        <span className="fuss-jahr mono leise">2026</span>
      </div>
    </footer>
  );
}
