import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSprache } from "../i18n";
import "./Ablauf.css";

/* Der Ablauf ist eine echte Reihenfolge, deshalb darf er eine Linie sein, die
   sich beim Scrollen fuellt. Schritt fuer Schritt wird hell, was schon
   erreicht ist. Ohne Bewegung steht alles hell da. */

export function Ablauf({ titel }: { titel: React.ReactNode }) {
  const { t } = useSprache();
  const wurzel = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wurzel.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    const bauen = (achse: "scaleX" | "scaleY") => {
      const fuell = el.querySelector<HTMLElement>(".abl-fuell")!;
      const schritte = Array.from(el.querySelectorAll<HTMLElement>(".abl-schritt"));
      gsap.set(fuell, { [achse]: 0 });
      gsap.set(schritte, { opacity: 0.3 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el.querySelector(".abl-liste"), start: "top 75%", end: "bottom 55%", scrub: 0.5 },
      });
      tl.to(fuell, { [achse]: 1, duration: 1 }, 0);
      schritte.forEach((s, i) => tl.to(s, { opacity: 1, duration: 0.12, ease: "power2.out" }, i / schritte.length));
      return () => gsap.set([fuell, ...schritte], { clearProps: "all" });
    };

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => bauen("scaleX"));
    mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => bauen("scaleY"));

    const nachLaden = () => ScrollTrigger.refresh();
    window.addEventListener("load", nachLaden);
    return () => {
      window.removeEventListener("load", nachLaden);
      mm.revert();
    };
  }, []);

  return (
    <section className="sektion" id="ablauf" ref={wurzel}>
      <div className="shell stapel-gross">
        <h2 className="spalte">{titel}</h2>
        <div className="abl-liste">
          <span className="abl-linie" aria-hidden="true">
            <i className="abl-fuell" />
          </span>
          <ol className="abl-schritte">
            {t.ablauf.schritte.map((s) => (
              <li className="abl-schritt" key={s.was}>
                <span className="abl-zeit num">{s.zeit}</span>
                <h3>{s.was}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
