/* Enthuellung beim Scrollen, ohne GSAP und ohne Lenis.

   Warum beide raus sind:
   - Lenis ersetzt natives Scrollen durch simuliertes. Das passt nicht zu
     einer Anzeige, die einrasten soll, und es hat ScrollTrigger die
     Positionen verfaelscht: Inhalte blieben auf opacity 0 stehen, obwohl
     sie im Bild waren. Ein unsichtbarer Abschnitt ist der teuerste Bug,
     den eine Verkaufsseite haben kann.
   - GSAP loest hier nichts, was IntersectionObserver plus eine
     CSS-Transition nicht koennen. Zusammen sparen die beiden rund 60 KB.

   Sicherheitsnetz: sichtbar ist der Normalzustand. Die Elemente werden
   erst versteckt, wenn dieses Skript laeuft. Faellt JavaScript aus,
   steht die Seite trotzdem vollstaendig da. */

export function reduziert(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function starteEnthuellung(wurzel: HTMLElement): () => void {
  const ziele = Array.from(wurzel.querySelectorAll<HTMLElement>("[data-auf]"));
  if (ziele.length === 0) return () => {};

  if (reduziert()) {
    ziele.forEach((el) => el.setAttribute("data-auf", "an"));
    return () => {};
  }

  ziele.forEach((el) => el.setAttribute("data-auf", "aus"));

  const io = new IntersectionObserver(
    (eintraege) => {
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        el.setAttribute("data-auf", "an");
        io.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
  );

  ziele.forEach((el) => io.observe(el));

  // Notbremse: was nach zehn Sekunden immer noch versteckt ist, wird
  // sichtbar gemacht. Lieber ohne Animation als unsichtbar.
  const notbremse = window.setTimeout(() => {
    ziele.forEach((el) => el.setAttribute("data-auf", "an"));
    io.disconnect();
  }, 10000);

  return () => {
    window.clearTimeout(notbremse);
    io.disconnect();
  };
}
