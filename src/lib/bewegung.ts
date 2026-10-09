import { useEffect, type RefObject } from "react";

/* Bewegung ohne Bibliothek: ein IntersectionObserver für den Auftritt beim
   Scrollen und ein requestAnimationFrame-Takt für den Scroll-Fortschritt.
   Nur transform und opacity, der Endzustand ist immer die Vorgabe im CSS. */

export function stufe(): "voll" | "leicht" | "aus" {
  const s = document.documentElement.dataset.bewegung;
  return s === "leicht" || s === "aus" ? s : "voll";
}

/** Gibt allen .auftritt-Elementen die Klasse .da, sobald sie ins Bild kommen. */
export function useAuftritt() {
  useEffect(() => {
    const ziele = Array.from(document.querySelectorAll<HTMLElement>(".auftritt:not(.da)"));
    if (stufe() !== "voll" || typeof IntersectionObserver === "undefined") {
      ziele.forEach((z) => z.classList.add("da"));
      return;
    }
    const io = new IntersectionObserver(
      (eintraege) => {
        for (const e of eintraege) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("da");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    ziele.forEach((z) => io.observe(z));
    return () => io.disconnect();
  }, []);
}

/** Schreibt den Scroll-Fortschritt (0 bis 1) eines hohen Abschnitts als
    CSS-Variable --p auf ein Ziel. 0 = Abschnitt beginnt, 1 = Ende erreicht. */
export function useScrollFortschritt(abschnitt: RefObject<HTMLElement | null>, ziel: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const a = abschnitt.current;
    const z = ziel.current;
    if (!a || !z) return;
    if (stufe() === "aus") {
      z.style.setProperty("--p", "1");
      return;
    }
    let geplant = 0;
    let letzter = -1;
    const messen = () => {
      geplant = 0;
      const r = a.getBoundingClientRect();
      const weg = r.height - innerHeight;
      const p = weg > 0 ? Math.min(1, Math.max(0, -r.top / weg)) : 1;
      const gerundet = Math.round(p * 1000) / 1000;
      if (gerundet !== letzter) {
        letzter = gerundet;
        z.style.setProperty("--p", String(gerundet));
      }
    };
    const planen = () => {
      if (!geplant) geplant = requestAnimationFrame(messen);
    };
    messen();
    addEventListener("scroll", planen, { passive: true });
    addEventListener("resize", planen);
    return () => {
      removeEventListener("scroll", planen);
      removeEventListener("resize", planen);
      cancelAnimationFrame(geplant);
    };
  }, []);
}
