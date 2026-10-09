import { createContext, useContext, type ReactNode } from "react";
import { de, type Woerter } from "../inhalt/de";
import { fr } from "../inhalt/fr";

/* Die Sprache kommt ausschliesslich aus der Adresse: / ist Deutsch, /fr/ ist
   Französisch. Kein localStorage, keine Browsersprache, keine Weiterleitung.
   Nur so stimmt das vorgerenderte HTML mit dem überein, was der Browser
   danach daraus macht, und Google sieht beide Fassungen. */

export const SPRACHEN = ["de", "fr"] as const;
export type Sprache = (typeof SPRACHEN)[number];

export const WOERTER: Record<Sprache, Woerter> = { de, fr };

export const STARTPFAD: Record<Sprache, string> = { de: "/", fr: "/fr/" };

export function spracheAusPfad(pfad: string): Sprache {
  return pfad === "/fr" || pfad.startsWith("/fr/") ? "fr" : "de";
}

type Wert = { sprache: Sprache; t: Woerter };

const Ctx = createContext<Wert>({ sprache: "de", t: de });

export function SprachProvider({ sprache, children }: { sprache: Sprache; children: ReactNode }) {
  return <Ctx.Provider value={{ sprache, t: WOERTER[sprache] }}>{children}</Ctx.Provider>;
}

export function useSprache(): Wert {
  return useContext(Ctx);
}
