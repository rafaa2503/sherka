import { useSyncExternalStore } from "react";

/* Der Betriebsname aus dem Kontaktformular (geteilt mit der WhatsApp-
   Vorlage und dem Titel des Kontaktabschnitts). Liegt nur im
   Arbeitsspeicher dieses Fensters: kein localStorage, keine Adresse, kein
   Server. Erst wenn der Besucher das Formular abschickt, geht der Name mit.
   Das ist die Zusage am Eingabefeld, also nichts daran ändern, ohne den
   Hinweistext und die Datenschutzerklärung anzupassen. */

export const NAME_MAX = 40;

type Zustand = { name: string };

let zustand: Zustand = { name: "" };
const hoerer = new Set<() => void>();

function melden() {
  hoerer.forEach((h) => h());
}

export function setzeName(roh: string) {
  // Nur eine Zeile, keine Steuerzeichen, Länge begrenzt nach Graphemen.
  const sauber = roh.replace(/[\u0000-\u001f\u007f]/g, "");
  const teile = Array.from(sauber);
  const name = teile.length > NAME_MAX ? teile.slice(0, NAME_MAX).join("") : sauber;
  if (name === zustand.name) return;
  zustand = { ...zustand, name };
  melden();
}

function abonnieren(h: () => void) {
  hoerer.add(h);
  return () => hoerer.delete(h);
}

const lesen = () => zustand;

export function useBetrieb(): Zustand {
  return useSyncExternalStore(abonnieren, lesen, lesen);
}

/** Der Name, wie er angezeigt wird: getrimmt, sonst der Platzhalter. */
export function anzeigeName(name: string, ersatz: string): string {
  const n = name.trim();
  return n === "" ? ersatz : n;
}
