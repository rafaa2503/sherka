import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Laeufer.css";

/* Laeufer auf dem Fortschrittsbalken, am unteren Bildrand.

   Er laeuft auf der Linie wie auf dem Boden und zieht sie als Spur
   hinter sich her. Beine und Arme pendeln nur, solange gescrollt wird:
   beim Anhalten wird die Animation pausiert, nicht zurueckgesetzt, er
   bleibt also mitten im Schritt stehen.

   Die Figur ist eigen gezeichnet. Die nach hinten gestreckte Laufhaltung
   ist ein Meme und frei, eine konkrete Anime-Figur waere fremdes
   Eigentum und auf einer Firmenseite ein echtes Risiko. */

const HALTEZEIT = 220;

export function Laeufer() {
  const spur = useRef<HTMLDivElement>(null);
  const figur = useRef<HTMLDivElement>(null);
  const bahn = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = spur.current;
    const f = figur.current;
    const b = bahn.current;
    if (!s || !f || !b) return;

    // Nur am Computer und ohne reduzierte Bewegung. Das CSS blendet die
    // Bahn sonst ohnehin aus, hier wird zusaetzlich nichts berechnet.
    const aktiv = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    if (!aktiv.matches) return;

    const xZu = gsap.quickTo(f, "x", { duration: 0.3, ease: "power2.out" });
    let stehtTimer = 0;
    // Die Bahn nimmt die Farbwelt dessen an, was gerade hinter ihr liegt.
    const faerben = () => {
      const el = document.elementFromPoint(window.innerWidth * 0.5, window.innerHeight - 70);
      b.classList.toggle("flaeche-dunkel", !!el?.closest(".flaeche-dunkel"));
    };
    const setze = (p: number) => {
      faerben();
      s.style.transform = `scaleX(${p})`;
      return 24 + p * (window.innerWidth - 48);
    };

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      // Richtige Startposition auch nach Neuladen mitten auf der Seite und
      // nach Groessenaenderung, sonst steht er links und springt erst beim
      // naechsten Scrollen an seinen Platz.
      onRefresh: (self) => gsap.set(f, { x: setze(self.progress) }),
      onUpdate: (self) => {
        // Am Rand nicht aus dem Bild laufen.
        xZu(setze(self.progress));

        const v = self.getVelocity();
        if (Math.abs(v) > 40) f.dataset.richtung = v > 0 ? "vor" : "zurueck";

        /* An die Geschwindigkeit gehaengt, nicht an das blosse Ereignis.
           Lenis feuert beim Ausschwingen noch winzige Updates; wuerde
           jedes davon den Timer zuruecksetzen, liefe die Figur endlos
           weiter, obwohl die Seite laengst steht. */
        if (Math.abs(v) < 15) return;

        f.dataset.laeuft = "1";
        window.clearTimeout(stehtTimer);
        stehtTimer = window.setTimeout(() => {
          f.dataset.laeuft = "0";
        }, HALTEZEIT);
      },
    });

    return () => {
      window.clearTimeout(stehtTimer);
      st.kill();
      gsap.killTweensOf(f);
    };
  }, []);

  return (
    <div className="laufbahn" aria-hidden="true" ref={bahn}>
      <div className="laufbahn-spur" ref={spur} />
      <div className="laeufer" ref={figur} data-laeuft="0" data-richtung="vor">
        <svg viewBox="0 0 44 44" fill="none" strokeLinecap="round">
          {/* Hinterer Arm. Er zeigt nach links, also entgegen der
              Laufrichtung: das ist die gestreckte Laufhaltung. */}
          <g className="arm arm-b">
            <path d="M21 19 L9 25" stroke="var(--stoff)" strokeWidth="4.5" />
            <path d="M12 23.5 L6 26.5" stroke="var(--haut)" strokeWidth="4" />
          </g>

          {/* Beine: Hose in Stofffarbe, Schuhe abgesetzt */}
          <g className="bein bein-a">
            <path d="M17 27 L8 34" stroke="var(--stoff)" strokeWidth="5.5" />
            <path d="M10 32.5 L6.5 35" stroke="var(--schuh)" strokeWidth="4.5" />
          </g>
          <g className="bein bein-b">
            <path d="M17 27 L20 38" stroke="var(--stoff)" strokeWidth="5.5" />
            <path d="M19.5 35 L21 39.5" stroke="var(--schuh)" strokeWidth="4.5" />
          </g>

          {/* Rumpf: die Jacke */}
          <path d="M25 16 L17 27" stroke="var(--stoff)" strokeWidth="8" />

          {/* Kopf mit Stirnband */}
          <circle cx="27.5" cy="11" r="5" fill="var(--haut)" />
          <path d="M23 9.2 L32 8" stroke="var(--stoff)" strokeWidth="3" />

          {/* Vorderer Arm, ueber dem Rumpf, ebenfalls nach hinten gestreckt */}
          <g className="arm arm-a">
            <path d="M23 17 L11 20" stroke="var(--stoff)" strokeWidth="4.5" />
            <path d="M14 19.3 L8 20.8" stroke="var(--haut)" strokeWidth="4" />
          </g>
        </svg>
      </div>
    </div>
  );
}
