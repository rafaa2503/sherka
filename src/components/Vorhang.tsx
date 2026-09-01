import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Vorhang.css";

/* Ladevorhang. Deckt die Seite ab, zaehlt auf 100 und faehrt in zwei
   Lagen nach oben weg.

   Er blockiert das Rendern nicht: die Seite steht darunter bereits
   fertig da, der Vorhang liegt nur darueber. Faellt JavaScript aus,
   ist er gar nicht erst im Markup.

   Nur beim ersten Besuch pro Sitzung. Wer zurueckkommt, will nicht
   jedes Mal 1.4 Sekunden zuschauen. */

const SCHLUESSEL = "sherka:vorhang";

export function Vorhang() {
  const [fertig, setFertig] = useState(false);
  const wurzel = useRef<HTMLDivElement>(null);
  const zaehler = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = wurzel.current;
    if (!node) return;

    const schon = sessionStorage.getItem(SCHLUESSEL) === "1";
    const reduziert = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (schon || reduziert) {
      setFertig(true);
      return;
    }

    sessionStorage.setItem(SCHLUESSEL, "1");
    document.body.style.overflow = "hidden";

    const zahl = { n: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setFertig(true);
      },
    });

    tl.to(zahl, {
      n: 100,
      duration: 1.1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (zaehler.current) zaehler.current.textContent = String(Math.round(zahl.n));
      },
    })
      .to(".vorhang-inhalt", { autoAlpha: 0, duration: 0.28, ease: "power2.in" }, "-=0.1")
      // Zwei Lagen mit Versatz: der Vorhang reisst auf, statt zu verblassen.
      .to(".vorhang-lage", { yPercent: -100, duration: 0.85, ease: "expo.inOut", stagger: 0.09 }, "-=0.1");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (fertig) return null;

  return (
    <div className="vorhang" ref={wurzel} aria-hidden="true">
      <span className="vorhang-lage" />
      <span className="vorhang-lage" />
      <div className="vorhang-inhalt">
        <span className="vorhang-marke">Sherka</span>
        <span className="vorhang-zahl num">
          <span ref={zaehler}>0</span>
        </span>
      </div>
    </div>
  );
}
