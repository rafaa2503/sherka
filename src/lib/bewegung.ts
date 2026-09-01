import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* Alle Bewegung an einer Stelle registriert, damit es genau einen Ort
   gibt, an dem man sie abschaltet. */

export function reduziert(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function starteLenis(): () => void {
  if (reduziert()) return () => {};

  const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, touchMultiplier: 1.4 });

  // Lenis und ScrollTrigger muessen sich denselben Takt teilen, sonst
  // laufen gepinnte Sektionen der Seite hinterher.
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}

/** Zeilenweise Enthuellung: Text steigt hinter einer Kante hervor. */
export function zeilenAuf(ziel: string, wurzel: Element): gsap.Context {
  return gsap.context(() => {
    if (reduziert()) {
      gsap.set(ziel, { yPercent: 0, opacity: 1 });
      return;
    }
    gsap.utils.toArray<HTMLElement>(ziel).forEach((el) => {
      gsap.from(el, {
        yPercent: 118,
        duration: 1.15,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
  }, wurzel);
}

/** Blockweise Enthuellung mit Versatz. Fuer Listen und Karten. */
export function blockAuf(ziel: string, wurzel: Element): gsap.Context {
  return gsap.context(() => {
    if (reduziert()) {
      gsap.set(ziel, { opacity: 1, y: 0 });
      return;
    }
    gsap.utils.toArray<HTMLElement>(ziel).forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 46,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
  }, wurzel);
}
