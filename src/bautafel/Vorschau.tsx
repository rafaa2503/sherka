import { useState } from "react";
import type { Sprache } from "../lib/sprache";
import { fuelle, typoFrText } from "../lib/typo";
import type { Vorlage } from "./vorlagen";

/* Der Entwurf: echtes HTML, keine Attrappe aus Bildern. Er hat eigene
   Farben und eine eigene Sprache, unabhängig von der Seite drumherum.
   Jeder Teil besteht aus dem echten Inhalt (.vp-echt) und einer grauen
   Rohbau-Fläche (.vp-roh) darüber, zwischen denen die Aufrichte blendet. */

type Props = {
  vorlage: Vorlage;
  name: string;
  sprache: Sprache;
  setzeSprache: (s: Sprache) => void;
  texte: { fotos: string; nichtsGesendet: string; label: string; sprachLabel: string };
};

function Teil({ klasse, children }: { klasse: string; children: React.ReactNode }) {
  return (
    <div className={`vp-teil ${klasse}`}>
      <div className="vp-echt">{children}</div>
      <span className="vp-roh" aria-hidden="true" />
    </div>
  );
}

export function Vorschau({ vorlage, name, sprache, setzeSprache, texte }: Props) {
  const [wahl, setWahl] = useState(0);
  const [gesendet, setGesendet] = useState(false);
  const f = vorlage.funktion;
  // Französische Typografie auch im Entwurf (Apostroph, Leerzeichen vor ? !).
  const typo = (s: string) => (sprache === "fr" ? typoFrText(s) : s);

  return (
    <div
      className="vp"
      lang={sprache === "fr" ? "fr-CH" : "de-CH"}
      role="region"
      aria-label={texte.label}
      style={{ "--vp-akzent": vorlage.akzent, "--vp-radius": `${vorlage.radius}px` } as React.CSSProperties}
    >
      <div className="vp-leiste">
        <Teil klasse="vp-logo">
          <strong translate="no">{name}</strong>
        </Teil>
        <Teil klasse="vp-nav">
          <span className="vp-links">
            {vorlage.nav[sprache].map((n) => (
              <span key={n}>{typo(n)}</span>
            ))}
          </span>
        </Teil>
        <div className="vp-sprache" role="group" aria-label={texte.sprachLabel}>
          {(["de", "fr"] as const).map((s) => (
            <button key={s} type="button" aria-pressed={sprache === s} onClick={() => setzeSprache(s)}>
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <Teil klasse="vp-titel">
        <p className="vp-h">{fuelle(typo(vorlage.titel[sprache]), { name })}</p>
      </Teil>
      <Teil klasse="vp-text">
        <p>{typo(vorlage.text[sprache])}</p>
      </Teil>

      <Teil klasse="vp-foto">
        <span className="vp-foto-hinweis">{texte.fotos}</span>
      </Teil>

      <Teil klasse="vp-funktion">
        <p className="vp-ftitel">{typo(f.titel[sprache])}</p>
        <div className="vp-optionen">
          {f.optionen[sprache].map((o, i) => (
            <button
              key={o}
              type="button"
              className="vp-option"
              aria-pressed={wahl === i}
              onClick={() => {
                setWahl(i);
                setGesendet(false);
              }}
            >
              {typo(o)}
            </button>
          ))}
        </div>
        <button type="button" className="vp-knopf" onClick={() => setGesendet(true)}>
          {typo(f.knopf[sprache])}
        </button>
        <p className="vp-erfolg" role="status">
          {gesendet ? `${typo(f.erfolg[sprache])}. ${texte.nichtsGesendet}` : ""}
        </p>
      </Teil>
    </div>
  );
}
