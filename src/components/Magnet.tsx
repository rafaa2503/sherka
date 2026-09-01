import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { reduziert } from "../lib/bewegung";

/* Magnetischer Knopf: zieht sich zum Zeiger. Laeuft ueber gsap.quickTo,
   also ausserhalb des React-Renderzyklus. Mit useState waere das ein
   Re-Render pro Mausbewegung und auf schwacher Hardware sofort ruckelig. */

export function Magnet({
  children,
  staerke = 0.32,
  className,
  href,
  onClick,
  type,
  disabled,
}: {
  children: ReactNode;
  staerke?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const el = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    if (reduziert() || window.matchMedia("(pointer: coarse)").matches) return;

    const xZu = gsap.quickTo(node, "x", { duration: 0.5, ease: "power3.out" });
    const yZu = gsap.quickTo(node, "y", { duration: 0.5, ease: "power3.out" });

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

  if (href) {
    return (
      <a ref={el} className={className} href={href}>
        <span>{children}</span>
      </a>
    );
  }
  return (
    <button ref={el} className={className} type={type ?? "button"} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
    </button>
  );
}
