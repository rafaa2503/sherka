import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* Version 1 bewegt nur das Scrollen selbst. Alles andere an Effekten ist
   bewusst gestrichen (siehe plans/relaunch-v1.md): Inhalte stehen von
   Anfang an da, nichts wird versteckt und spaeter eingeblendet. */

export function reduziert(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* Buehne: Das Licht folgt dem Zeiger, und beim Scrollen hebt sich das Handy
   leicht, waehrend der Text zurueckweicht. Nur transform und opacity. */
export function starteHero(): () => void {
  const buehne = document.querySelector<HTMLElement>(".buehne");
  if (!buehne || reduziert()) return () => {};

  const spot = buehne.querySelector<HTMLElement>(".buehne-spot");
  const text = buehne.querySelector<HTMLElement>(".buehne-text");
  const geraet = buehne.querySelector<HTMLElement>(".buehne-geraet");

  const ctx = gsap.context(() => {
    if (text) {
      gsap.to(text, {
        y: -36,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: buehne, start: "top top", end: "bottom top", scrub: true },
      });
    }
    if (geraet) {
      gsap.to(geraet, {
        y: -70,
        ease: "none",
        scrollTrigger: { trigger: buehne, start: "top top", end: "bottom top", scrub: true },
      });
    }
  });

  let weg = () => {};
  if (spot && !window.matchMedia("(pointer: coarse)").matches) {
    const x = gsap.quickTo(spot, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(spot, "y", { duration: 0.6, ease: "power3.out" });
    const bewegen = (e: PointerEvent) => {
      const r = buehne.getBoundingClientRect();
      x(e.clientX - r.left);
      y(e.clientY - r.top);
    };
    buehne.addEventListener("pointermove", bewegen);
    weg = () => buehne.removeEventListener("pointermove", bewegen);
  }

  return () => {
    weg();
    ctx.revert();
  };
}

export function starteLenis(): () => void {
  if (reduziert()) return () => {};

  const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, touchMultiplier: 1.4 });

  // Lenis und ScrollTrigger teilen sich einen Takt, sonst hinkt der Laeufer hinterher.
  lenis.on("scroll", ScrollTrigger.update);
  const takt = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(takt);
  gsap.ticker.lagSmoothing(0);

  // Ankerlinks muessen durch Lenis laufen, sonst springt die Seite hart.
  const aufKlick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = a?.getAttribute("href");
    if (!a || !id || id === "#") return;
    const ziel = document.querySelector<HTMLElement>(id);
    if (!ziel) return;
    e.preventDefault();
    lenis.scrollTo(ziel, { offset: -80 });
  };
  document.addEventListener("click", aufKlick);

  return () => {
    document.removeEventListener("click", aufKlick);
    gsap.ticker.remove(takt);
    lenis.destroy();
  };
}
