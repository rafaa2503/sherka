import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/* Magnetischer Knopf: zieht sich zum Zeiger und federt zurueck.

   Ueber gsap.quickTo, also ausserhalb des React-Renderzyklus. Mit
   useState waere das ein Re-Render pro Mausbewegung und auf schwacher
   Hardware sofort ruckelig.

   Nur auf Zeigergeraeten mit Maus. Auf Touch gibt es keinen Hover, der
   Effekt waere dort nur totes Gewicht. */

export function Magnet({
  children,
  href,
  className,
  staerke = 0.28,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  staerke?: number;
}) {
  const el = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xZu = gsap.quickTo(node, "x", { duration: 0.6, ease: "elastic.out(1, 0.55)" });
    const yZu = gsap.quickTo(node, "y", { duration: 0.6, ease: "elastic.out(1, 0.55)" });

    const rein = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      xZu((e.clientX - (r.left + r.width / 2)) * staerke);
      yZu((e.clientY - (r.top + r.height / 2)) * staerke);
    };
    const raus = () => {
      xZu(0);
      yZu(0);
    };

    node.addEventListener("pointermove", rein);
    node.addEventListener("pointerleave", raus);
    return () => {
      node.removeEventListener("pointermove", rein);
      node.removeEventListener("pointerleave", raus);
      gsap.killTweensOf(node);
    };
  }, [staerke]);

  return (
    <a ref={el} className={className} href={href}>
      <span>{children}</span>
    </a>
  );
}
