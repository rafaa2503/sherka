import { useEffect, useRef, useState } from "react";

/* Zaehlt einmal auf den Messwert hoch. Einzige Bewegung mit Erzaehlfunktion
   auf der Seite: sie lenkt den Blick auf den Wert, der zaehlt.
   Ohne GSAP, weil requestAnimationFrame das hier vollstaendig abdeckt. */

const DAUER = 600;
const sanft = (x: number) => 1 - Math.pow(1 - x, 3);

export function Zahl({ bis, stellen }: { bis: number; stellen: number }) {
  const reduziert =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [wert, setWert] = useState(reduziert ? bis : 0);
  const rafId = useRef(0);

  useEffect(() => {
    if (reduziert) {
      setWert(bis);
      return;
    }
    const start = performance.now();
    const schritt = (jetzt: number) => {
      const p = Math.min((jetzt - start) / DAUER, 1);
      setWert(bis * sanft(p));
      if (p < 1) rafId.current = requestAnimationFrame(schritt);
    };
    rafId.current = requestAnimationFrame(schritt);
    return () => cancelAnimationFrame(rafId.current);
  }, [bis, reduziert]);

  return <span className="num">{wert.toFixed(stellen)}</span>;
}
