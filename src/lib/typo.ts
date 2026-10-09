/* Französische Typografie nach Schweizer Gebrauch, beim Laden einmal auf
   alle Texte angewendet: schmales geschütztes Leerzeichen (U+202F) vor ? ! ;
   und innerhalb von « », geschütztes Leerzeichen (U+00A0) vor dem
   Doppelpunkt, typografischer Apostroph. So muss niemand diese Zeichen von
   Hand in die Texte setzen. */

const SCHMAL = " ";
const FEST = " ";

export function typoFrText(s: string): string {
  return s
    .replace(/'/g, "’")
    .replace(/\s+([?!;])/g, `${SCHMAL}$1`)
    .replace(/\s+:(?!\/)/g, `${FEST}:`)
    .replace(/«\s*/g, `«${SCHMAL}`)
    .replace(/\s*»/g, `${SCHMAL}»`);
}

export function typoFr<T>(wert: T): T {
  if (typeof wert === "string") return typoFrText(wert) as T;
  if (Array.isArray(wert)) return wert.map((w) => typoFr(w)) as T;
  if (wert && typeof wert === "object") {
    const aus: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(wert)) {
      // Pfade, Werte und Kurzzeichen bleiben unverändert.
      aus[k] = /Pfad$|^wert$/.test(k) ? v : typoFr(v);
    }
    return aus as T;
  }
  return wert;
}

/** Ersetzt {name}, {s} usw. in einem Satz. */
export function fuelle(satz: string, werte: Record<string, string | number>): string {
  return satz.replace(/\{(\w+)\}/g, (_, k: string) => String(werte[k] ?? ""));
}
