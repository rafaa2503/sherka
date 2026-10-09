/* Hell oder dunkel. Hell ist der Standard, gelesen wird nur die eigene
   Wahl des Besuchers (localStorage), nie die Systemeinstellung. Gesetzt wird
   das Attribut schon im Inline-Skript in index.html, damit nichts aufblitzt. */

export type Thema = "hell" | "dunkel";
const SPEICHER = "sherka:thema";

export function aktuellesThema(): Thema {
  return document.documentElement.dataset.theme === "dunkel" ? "dunkel" : "hell";
}

export function setzeThema(thema: Thema) {
  const wechsel = () => document.documentElement.setAttribute("data-theme", thema);
  const ruhig = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const d = document as Document & { startViewTransition?: (f: () => void) => unknown };
  if (d.startViewTransition && !ruhig) d.startViewTransition(wechsel);
  else wechsel();
  try {
    localStorage.setItem(SPEICHER, thema);
  } catch {
    /* Speicher gesperrt: die Wahl gilt nur für diesen Besuch. */
  }
}
