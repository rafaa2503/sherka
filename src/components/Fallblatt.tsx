import { useEffect, useRef, useState } from "react";
import "./Fallblatt.css";

/* Fallblattanzeige. Jeder Buchstabe rattert durch ein Alphabet, bis er
   auf dem Zielzeichen stehen bleibt, wie an einem Bahnhof.

   Nicht dekorativ: der Effekt ist die Marke. Er kommt aus Raffas
   SBB-Herkunft und aus Biel als Bahnknoten, und keine Vorlage hat ihn.

   Umsetzung ohne Bibliothek. Ein Intervall fuer die ganze Zeile, nicht
   eines pro Buchstabe, sonst laufen bei langen Ueberschriften hundert
   Timer gleichzeitig. */

const ALPHABET = "abcdefghijklmnopqrstuvwxyzäöüABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TAKT = 42;

export function Fallblatt({
  text,
  as: Tag = "span",
  className,
  verzoegerung = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  className?: string;
  verzoegerung?: number;
}) {
  const [anzeige, setAnzeige] = useState(text);
  const el = useRef<HTMLElement>(null);
  const gelaufen = useRef(false);

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnzeige(text);
      return;
    }

    let timer = 0;
    let start = 0;

    const lauf = () => {
      // Pro Zeichen eine eigene Standzeit, damit die Zeile von links
      // nach rechts zur Ruhe kommt statt auf einen Schlag.
      const fest = text.split("").map((z, i) => (z === " " ? 0 : 4 + i * 1.6));
      let schritt = 0;
      const maximum = Math.max(...fest, 1);

      timer = window.setInterval(() => {
        schritt++;
        setAnzeige(
          text
            .split("")
            .map((z, i) => {
              if (z === " ") return " ";
              if (schritt >= fest[i]) return z;
              return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            })
            .join(""),
        );
        if (schritt > maximum) {
          window.clearInterval(timer);
          setAnzeige(text);
        }
      }, TAKT);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || gelaufen.current) return;
        gelaufen.current = true;
        io.disconnect();
        start = window.setTimeout(lauf, verzoegerung);
      },
      { threshold: 0.25 },
    );
    io.observe(node);

    return () => {
      io.disconnect();
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [text, verzoegerung]);

  return (
    <Tag ref={el as never} className={className ? `fallblatt ${className}` : "fallblatt"}>
      {/* Der Zieltext steht unsichtbar im Markup, damit Screenreader und
          Suchmaschinen nie das Buchstabensalat-Zwischenbild sehen. */}
      <span className="nur-screenreader">{text}</span>
      <span aria-hidden="true">{anzeige}</span>
    </Tag>
  );
}
