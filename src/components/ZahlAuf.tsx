import { useEffect, useMemo, useRef, useState } from "react";

/* Zaehlt eine Kennzahl hoch, sobald sie ins Bild kommt. Genau einmal.

   Nimmt Strings wie "4", "24 h" oder "1" entgegen: die fuehrende Zahl
   wird gezaehlt, der Rest bleibt stehen. So braucht die Uebersetzung
   keine getrennten Felder fuer Wert und Einheit.

   Fallstrick, der hier schon einmal zugeschlagen hat: das Ergebnis von
   String.match ist bei jedem Render ein neues Objekt. Steht es in der
   Abhaengigkeitsliste, laeuft der Effekt nach jedem setState erneut,
   raeumt die laufende Animation ab und der Wert friert mitten im
   Hochzaehlen ein. Deshalb hier nur primitive Abhaengigkeiten. */

const DAUER = 900;
const sanft = (x: number) => 1 - Math.pow(1 - x, 4);

export function ZahlAuf({ wert }: { wert: string }) {
  const { ziel, rest, hatZahl } = useMemo(() => {
    const m = /^(\d+)(.*)$/.exec(wert);
    return m
      ? { ziel: Number(m[1]), rest: m[2], hatZahl: true }
      : { ziel: 0, rest: wert, hatZahl: false };
  }, [wert]);

  const reduziert =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [zahl, setZahl] = useState(() => (hatZahl && !reduziert ? 0 : ziel));
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!hatZahl || reduziert) {
      setZahl(ziel);
      return;
    }
    const node = el.current;
    if (!node) return;

    let raf = 0;
    let gelaufen = false;

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || gelaufen) return;
        gelaufen = true;
        io.disconnect();
        const start = performance.now();
        const schritt = (jetzt: number) => {
          const p = Math.min((jetzt - start) / DAUER, 1);
          setZahl(Math.round(ziel * sanft(p)));
          if (p < 1) raf = requestAnimationFrame(schritt);
        };
        raf = requestAnimationFrame(schritt);
      },
      { threshold: 0.4 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ziel, hatZahl, reduziert]);

  return (
    <span ref={el}>
      {hatZahl ? zahl : ""}
      {rest}
    </span>
  );
}
