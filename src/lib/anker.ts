/* Sprunglinks innerhalb der Seite (#kontakt, #ablauf …) scrollen zum
   Abschnitt, ohne dass "#kontakt" in der Adresszeile stehen bleibt.
   Die Links behalten ihr href: Ohne JavaScript springen sie wie gewohnt.
   Kommt jemand mit einem Anker in der Adresse (z. B. sherka.ch/#kontakt),
   springt die Seite nach dem Laden dorthin, danach wird der Anker entfernt. */

const ohneAnker = () => location.pathname + location.search;

function springe(ziel: HTMLElement) {
  // scroll-padding-top und scroll-behavior (inkl. reduzierter Bewegung)
  // kommen aus base.css.
  ziel.scrollIntoView({ block: "start" });
  // Fokus mitnehmen, damit Tastatur und Screenreader beim Abschnitt weitermachen.
  if (!ziel.hasAttribute("tabindex") && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(ziel.tagName)) {
    ziel.setAttribute("tabindex", "-1");
  }
  ziel.focus({ preventScroll: true });
}

export function starteAnker() {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.("a[href^='#']");
    if (!(link instanceof HTMLAnchorElement)) return;
    const id = decodeURIComponent(link.hash.slice(1));
    const ziel = id ? document.getElementById(id) : null;
    if (!ziel) return;
    e.preventDefault();
    springe(ziel);
  });

  // Erst selbst hinspringen (ohne Animation), dann den Anker entfernen:
  // Auf den Sprung des Browsers ist beim ersten Laden kein Verlass.
  const ankerWeg = () => {
    if (!location.hash) return;
    const ziel = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (ziel) ziel.scrollIntoView({ block: "start", behavior: "instant" });
    history.replaceState(history.state, "", ohneAnker());
  };
  if (document.readyState === "complete") ankerWeg();
  else addEventListener("load", ankerWeg, { once: true });
  // Anker, der auf derselben Seite eingetippt wird
  addEventListener("hashchange", ankerWeg);
}
