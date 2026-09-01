import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/* Bewegungsschicht.

   Aufteilung nach Zustaendigkeit, nicht nach Bibliothek:
   - Enthuellung laeuft ueber IntersectionObserver und CSS. Das kann nicht
     haengen bleiben, und ein unsichtbarer Abschnitt ist der teuerste Bug,
     den eine Verkaufsseite haben kann.
   - GSAP macht nur das, was IO nicht kann: an den Scrollfortschritt
     gekoppelte Bewegung (Parallaxe, Laufschrift).
   - Lenis liefert das weiche Scrollgefuehl der Referenzen.

   Lenis und ScrollTrigger teilen sich denselben Takt. Ohne das laufen
   gescrubbte Effekte der Seite hinterher. */

export function reduziert(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function starteLenis(): () => void {
  if (reduziert()) return () => {};

  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.6 });

  lenis.on("scroll", ScrollTrigger.update);
  const takt = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(takt);
  gsap.ticker.lagSmoothing(0);

  // Ankerlinks muessen durch Lenis laufen, sonst springt die Seite hart.
  const aufKlick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = a?.getAttribute("href");
    if (!a || !id || id === "#") return;
    const ziel = document.querySelector(id);
    if (!ziel) return;
    e.preventDefault();
    lenis.scrollTo(ziel as HTMLElement, { offset: -80 });
  };
  document.addEventListener("click", aufKlick);

  return () => {
    document.removeEventListener("click", aufKlick);
    gsap.ticker.remove(takt);
    lenis.destroy();
  };
}

/** Enthuellung. Sichtbar ist der Normalzustand, versteckt wird erst hier. */
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
        (e.target as HTMLElement).setAttribute("data-auf", "an");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
  );
  ziele.forEach((el) => io.observe(el));

  // Notbremse: was nach zehn Sekunden noch versteckt ist, wird sichtbar.
  const notbremse = window.setTimeout(() => {
    ziele.forEach((el) => el.setAttribute("data-auf", "an"));
    io.disconnect();
  }, 10000);

  return () => {
    window.clearTimeout(notbremse);
    io.disconnect();
  };
}

/** An den Scrollfortschritt gekoppelte Bewegung. Nur hier ist GSAP noetig. */
export function starteScrub(wurzel: HTMLElement): () => void {
  if (reduziert()) return () => {};

  const ctx = gsap.context(() => {
    // Zeilen steigen hinter einer Kante hervor. Der Wrapper .maske
    // schneidet ab, also sieht man die Bewegung als Enthuellung und
    // nicht als blosses Verschieben.
    /* Durchgehend fromTo mit immediateRender: false.
       gsap.from versteckt das Ziel sofort beim Anlegen. Feuert der
       Trigger dann nicht, bleibt der Inhalt fuer immer unsichtbar. Mit
       fromTo und immediateRender: false ist sichtbar der Ausgangszustand
       und die Animation setzt erst im Moment des Ausloesens an. */
    gsap.utils.toArray<HTMLElement>(".maske").forEach((maske) => {
      const zeile = maske.firstElementChild;
      if (!zeile) return;
      gsap.fromTo(
        zeile,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: { trigger: maske, start: "top 90%", once: true },
        },
      );
    });

    // Bildwischer: der Rahmen oeffnet sich von unten nach oben und gibt
    // das Bildschirmfoto frei. Wirkt wie ein Vorhang statt wie ein
    // Einblenden, und Einblenden hat die Seite schon genug.
    gsap.utils.toArray<HTMLElement>(".projekt-bild").forEach((rahmen) => {
      gsap.fromTo(
        rahmen,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.25,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: { trigger: rahmen, start: "top 88%", once: true },
        },
      );
    });

    // Karten laufen versetzt ein statt alle auf einen Schlag.
    gsap.utils.toArray<HTMLElement>(".branchen, .zahlen, .regionen").forEach((gitter) => {
      gsap.fromTo(
        gitter.children,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: { trigger: gitter, start: "top 88%", once: true },
        },
      );
    });

    // Bild wandert im festen Rahmen. Der Rahmen bleibt stehen, also
    // entsteht Tiefe, ohne dass das Layout springt.
    gsap.utils.toArray<HTMLElement>(".projekt-bild .fluss").forEach((bild) => {
      gsap.fromTo(
        bild,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: bild.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    });

    // Ueberschriften buchstabenweise. Die Zeichen werden hier zerlegt und
    // nicht im Markup, damit der Text fuer Screenreader und Suchmaschinen
    // ein zusammenhaengender Satz bleibt.
    gsap.utils.toArray<HTMLElement>("[data-zerlegen]").forEach((titel) => {
      if (titel.dataset.zerlegt === "1") return;
      const roh = titel.textContent ?? "";
      titel.dataset.zerlegt = "1";
      titel.setAttribute("aria-label", roh);
      titel.textContent = "";
      const zeichen: HTMLElement[] = [];
      for (const z of roh) {
        const s = document.createElement("span");
        s.className = "zeichen";
        s.setAttribute("aria-hidden", "true");
        s.textContent = z === " " ? " " : z;
        titel.appendChild(s);
        zeichen.push(s);
      }
      gsap.fromTo(
        zeichen,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "expo.out",
          stagger: 0.022,
          immediateRender: false,
          scrollTrigger: { trigger: titel, start: "top 88%", once: true },
        },
      );
    });

    // Hero faehrt beim Wegscrollen zurueck, statt einfach oben rauszulaufen.
    const hero = wurzel.querySelector(".hero-kopf");
    if (hero) {
      gsap.to(hero, {
        yPercent: 14,
        scale: 0.94,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.5 },
      });
    }

    // Textfuellung: die Aussage faerbt sich beim Durchscrollen bernsteinfarben.
    gsap.utils.toArray<HTMLElement>(".fuellsatz").forEach((satz) => {
      gsap.fromTo(
        satz,
        { backgroundPosition: "100% 0" },
        {
          backgroundPosition: "0% 0",
          ease: "none",
          immediateRender: false,
          scrollTrigger: { trigger: satz, start: "top 78%", end: "bottom 45%", scrub: 0.4 },
        },
      );
    });

    // Laufschrift. Grundtempo laeuft immer, der Scroll schiebt zusaetzlich.
    gsap.utils.toArray<HTMLElement>(".laufband-spur").forEach((spur) => {
      const halbe = spur.scrollWidth / 2;
      gsap.set(spur, { x: 0 });
      gsap.to(spur, {
        x: -halbe,
        duration: 26,
        ease: "none",
        repeat: -1,
        modifiers: { x: (v) => `${parseFloat(v) % halbe}px` },
      });
      gsap.to(spur, {
        x: `-=${halbe * 0.55}`,
        ease: "none",
        scrollTrigger: { trigger: spur.closest(".laufband"), start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
  }, wurzel);

  // Nach dem Laden der Bilder stimmen die Positionen erst wirklich.
  const nachLaden = () => ScrollTrigger.refresh();
  window.addEventListener("load", nachLaden);

  return () => {
    window.removeEventListener("load", nachLaden);
    ctx.revert();
  };
}

/** Karten kippen leicht zum Zeiger. Nur auf Geraeten mit Maus. */
export function starteKippen(wurzel: HTMLElement): () => void {
  if (reduziert() || window.matchMedia("(pointer: coarse)").matches) return () => {};

  const auframen: Array<() => void> = [];

  wurzel.querySelectorAll<HTMLElement>(".branchen li, .ablauf li").forEach((karte) => {
    // quickTo statt State: sonst ein Re-Render pro Mausbewegung.
    const rx = gsap.quickTo(karte, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(karte, "rotationY", { duration: 0.5, ease: "power3.out" });
    gsap.set(karte, { transformPerspective: 900, transformOrigin: "center" });

    const bewegen = (e: PointerEvent) => {
      const r = karte.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      ry(x * 7);
      rx(-y * 7);
    };
    const raus = () => {
      rx(0);
      ry(0);
    };

    karte.addEventListener("pointermove", bewegen);
    karte.addEventListener("pointerleave", raus);
    auframen.push(() => {
      karte.removeEventListener("pointermove", bewegen);
      karte.removeEventListener("pointerleave", raus);
      gsap.killTweensOf(karte);
    });
  });

  return () => auframen.forEach((f) => f());
}

