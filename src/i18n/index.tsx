import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { de, type Woerter } from "./de";
import { fr } from "./fr";

/* Bewusst ohne i18n-Bibliothek. Zwei Sprachen, ein Objekt, volle Typsicherheit.
   Englisch kommt spaeter dazu: eine Datei mehr, kein Umbau. */

export const SPRACHEN = ["de", "fr"] as const;
export type Sprache = (typeof SPRACHEN)[number];

const woerterbuch: Record<Sprache, Woerter> = { de, fr };

const SPEICHER = "sherka:sprache";

function ersteSprache(): Sprache {
  if (typeof window === "undefined") return "de";
  const gespeichert = window.localStorage.getItem(SPEICHER);
  if (gespeichert === "de" || gespeichert === "fr") return gespeichert;
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "de";
}

type Wert = { sprache: Sprache; setzeSprache: (s: Sprache) => void; t: Woerter };

const Ctx = createContext<Wert | null>(null);

export function SprachProvider({ children }: { children: React.ReactNode }) {
  const [sprache, setSprache] = useState<Sprache>(ersteSprache);

  useEffect(() => {
    document.documentElement.lang = sprache === "fr" ? "fr-CH" : "de-CH";
    window.localStorage.setItem(SPEICHER, sprache);
    const t = woerterbuch[sprache];
    document.title = t.meta.titel;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.beschreibung);
  }, [sprache]);

  const setzeSprache = useCallback((s: Sprache) => setSprache(s), []);

  const wert = useMemo(
    () => ({ sprache, setzeSprache, t: woerterbuch[sprache] }),
    [sprache, setzeSprache],
  );

  return <Ctx.Provider value={wert}>{children}</Ctx.Provider>;
}

export function useSprache(): Wert {
  const w = useContext(Ctx);
  if (!w) throw new Error("useSprache ausserhalb von SprachProvider benutzt");
  return w;
}
