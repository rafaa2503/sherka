import { useEffect, useRef, useState } from "react";
import { useSprache } from "../lib/sprache";
import { code, faerbe } from "../data/code";
import "./Entstehung.css";

/* "So entsteht eine Seite" auf einer dunklen Bühne, wie die Funktions-
   Abschnitte auf apple.com. Links laufen die vier Schritte vorbei, rechts
   bleibt das Beispiel stehen und baut sich Schritt für Schritt auf, mit dem
   Code dazu. Kein Scroll-Kapern: die Seite scrollt normal, nur die Bühne
   rechts klebt (position: sticky). Ohne Skript zeigt sie den letzten Schritt. */

export function Entstehung() {
  const { t } = useSprache();
  const e = t.entstehung;
  const v = e.vorschau;
  const [schritt, setSchritt] = useState(4);
  const liste = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = liste.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    setSchritt(1);
    const io = new IntersectionObserver(
      (eintraege) => {
        for (const x of eintraege) {
          if (x.isIntersecting) setSchritt(Number((x.target as HTMLElement).dataset.schritt));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    el.querySelectorAll("[data-schritt]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="sektion buehne-dunkel entstehung" id="entstehung" aria-labelledby="entstehung-titel">
      <div className="shell-breit">
        <div className="entstehung-kopf auftritt">
          <h2 id="entstehung-titel">{e.titel}</h2>
          <p className="leise">{e.text}</p>
        </div>

        <div className="entstehung-raster">
          <div className="entstehung-buehne" data-schritt={schritt}>
            <p className="ent-beispiel mono">{e.beispiel}</p>
            <div className="ent-vorschau" aria-hidden="true">
              <div className="ev-leiste">
                <span className="ev-teil ev-logo">{v.name}</span>
                <span className="ev-teil ev-links">
                  {v.links.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </span>
              </div>
              <p className="ev-teil ev-titel">{v.titel}</p>
              <p className="ev-teil ev-text">{v.text}</p>
              <div className="ev-teil ev-zeiten">
                {v.zeiten.map((z, i) => (
                  <span key={z} className={i === 1 ? "ev-zeit ev-gewaehlt" : "ev-zeit"}>
                    {z}
                  </span>
                ))}
              </div>
              <span className="ev-teil ev-knopf">{v.knopf}</span>
              <span className="ev-toast">{v.erfolg}</span>
              <span className="ev-marken">
                <span>schema.org</span>
                <span className="mono">Tu-Fr 09:00-18:00</span>
              </span>
            </div>

            <div className="ent-code" role="img" aria-label={e.codeLabel}>
              {code.map((b, i) => (
                <div className={i + 1 === schritt ? "ec-block ec-an" : "ec-block"} key={b.datei} aria-hidden="true">
                  <span className="ec-datei mono">{b.datei}</span>
                  <pre className="mono">
                    {b.zeilen.map((z, n) => (
                      <span
                        className="ec-zeile"
                        key={n}
                        style={{ "--n": n } as React.CSSProperties}
                        dangerouslySetInnerHTML={{ __html: faerbe(z, b.sprache) || "&nbsp;" }}
                      />
                    ))}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          <ol className="entstehung-schritte" ref={liste}>
            {e.schritte.map((s, i) => (
              <li key={s.name} data-schritt={i + 1} className={i + 1 === schritt ? "es-an" : undefined}>
                <p className="zweiklang">
                  <strong>{s.name}</strong> {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
