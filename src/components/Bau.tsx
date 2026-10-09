import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { code, faerbe, vorschau } from "../data/bau";
import { useSprache } from "../i18n";
import "./Bau.css";

/* Bau-Sequenz: beim Scrollen entsteht links der Code und rechts die Seite
   dazu. Ein einziger gepinnter Abschnitt, eine einzige Zeitleiste.

   Am Handy, auf kleinen Fenstern und bei reduzierter Bewegung gibt es kein
   Pinning: dann stehen alle vier Codebloecke untereinander und die
   Vorschau zeigt den Endzustand. Die CSS-Vorgabewerte sind deshalb der
   fertige Zustand, das Skript setzt nur fuer die Animation zurueck. */

export function Bau() {
  const { t } = useSprache();
  const wurzel = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wurzel.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));
      const vp = el.querySelector<HTMLElement>(".vp")!;
      const bloecke = q<HTMLElement>(".bau-code .code");
      const schritte = q<HTMLElement>(".bau-schritt");
      const teile = q<HTMLElement>(".vp-x");
      const chips = q<HTMLElement>(".vp-chip");
      const toast = el.querySelector<HTMLElement>(".vp-toast")!;

      gsap.set(vp, { "--fertig": 0, "--wahl": 0, "--fr": 0 });
      gsap.set(bloecke, { opacity: 0 });
      gsap.set(bloecke[0], { opacity: 1 });
      gsap.set(schritte, { opacity: 0.4 });
      gsap.set(schritte[0], { opacity: 1 });
      gsap.set(teile, { opacity: 0, y: 12 });
      gsap.set(chips, { opacity: 0, y: 8 });
      gsap.set(toast, { opacity: 0, y: 12 });

      const zeilen = (i: number) => bloecke[i].querySelectorAll(".zeile");
      gsap.set(zeilen(0), { opacity: 0 });
      for (const i of [1, 2, 3]) gsap.set(zeilen(i), { opacity: 0, x: -8 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el.querySelector(".bau-pin"),
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // Schritt 1: Geruest. Code erscheint Zeile fuer Zeile, die Seite als graue Flaechen.
      tl.to(zeilen(0), { opacity: 1, stagger: 0.04, duration: 0.25 }, 0.05)
        .to(teile, { opacity: 1, y: 0, stagger: 0.06, duration: 0.3, ease: "power2.out" }, 0.1);

      // Wechsel zu Schritt 2: Gestaltung.
      const wechsel = (von: number, nach: number, zeit: number) => {
        tl.to(bloecke[von], { opacity: 0, duration: 0.2 }, zeit)
          .to(schritte[von], { opacity: 0.4, duration: 0.2 }, zeit)
          .to(bloecke[nach], { opacity: 1, duration: 0.2 }, zeit + 0.1)
          .to(schritte[nach], { opacity: 1, duration: 0.2 }, zeit + 0.1)
          .to(zeilen(nach), { opacity: 1, x: 0, stagger: 0.04, duration: 0.25, ease: "power2.out" }, zeit + 0.15);
      };

      wechsel(0, 1, 1);
      tl.to(vp, { "--fertig": 1, duration: 0.7 }, 1.15);

      // Schritt 3: Funktion. Eine Zeit wird gewaehlt, die Anfrage geht raus.
      wechsel(1, 2, 2);
      tl.to(vp, { "--wahl": 1, duration: 0.25 }, 2.2)
        .to(toast, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 2.65);

      // Schritt 4: Sprache und Auszeichnung.
      wechsel(2, 3, 3);
      tl.to(vp, { "--fr": 1, duration: 0.5 }, 3.2)
        .to(chips, { opacity: 1, y: 0, stagger: 0.12, duration: 0.25, ease: "power2.out" }, 3.5)
        .to({}, { duration: 0.4 }, 3.9);

      return () => {
        // Zustand nach dem Aufraeumen: der fertige Endzustand aus dem CSS.
        gsap.set([vp, ...bloecke, ...schritte, ...teile, ...chips, toast, ...q(".zeile")], { clearProps: "all" });
      };
    });

    const nachLaden = () => ScrollTrigger.refresh();
    window.addEventListener("load", nachLaden);
    return () => {
      window.removeEventListener("load", nachLaden);
      mm.revert();
    };
  }, []);

  const zweisprachig = (de: string, fr: string) => (
    <span className="zw">
      <span className="zw-de">{de}</span>
      <span className="zw-fr" aria-hidden="true">
        {fr}
      </span>
    </span>
  );

  return (
    <section className="sektion bau" id="bau" ref={wurzel}>
      <div className="bau-pin">
        <div className="shell bau-innen">
          <div className="bau-kopf">
            <h2>{t.bau.titel.split(" ").slice(0, 2).join(" ")} <span className="ton-zwei">{t.bau.titel.split(" ").slice(2).join(" ")}</span></h2>
            <p className="leise">{t.bau.text}</p>
          </div>

          <div className="bau-links">
            <ol className="bau-schritte">
              {t.bau.schritte.map((s, i) => (
                <li className="bau-schritt" key={s.name}>
                  <span className="num">{i + 1}</span>
                  <div>
                    <h3>{s.name}</h3>
                    <p className="leise">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="bau-code" role="img" aria-label={t.bau.codeLabel}>
              {code.map((b) => (
                <div className="code" key={b.datei}>
                  <span className="code-datei num">{b.datei}</span>
                  <pre className="num" aria-hidden="true">
                    {b.zeilen.map((z, i) => (
                      <span
                        className="zeile"
                        key={i}
                        dangerouslySetInnerHTML={{ __html: faerbe(z, b.sprache) || "&nbsp;" }}
                      />
                    ))}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          <div className="bau-rechts">
            <span className="bau-beispiel num">{t.bau.beispiel}</span>
            <div className="vp-rahmen">
              <div className="vp-leiste" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className="vp" aria-hidden="true">
                <div className="vp-x vp-nav">
                  <strong className="vp-logo">{vorschau.name}</strong>
                  <span className="vp-links">
                    {vorschau.links.de.map((l, i) => (
                      <span key={l}>{zweisprachig(l, vorschau.links.fr[i])}</span>
                    ))}
                  </span>
                </div>
                <h4 className="vp-x vp-h">{zweisprachig(vorschau.titel.de, vorschau.titel.fr)}</h4>
                <p className="vp-x vp-p">{zweisprachig(vorschau.text.de, vorschau.text.fr)}</p>
                <div className="vp-x vp-zeiten">
                  {vorschau.zeiten.map((z, i) => (
                    <span className={i === 1 ? "vp-zeit vp-gewaehlt" : "vp-zeit"} key={z}>
                      {z}
                    </span>
                  ))}
                </div>
                <div className="vp-x vp-knopf">{zweisprachig(vorschau.knopf.de, vorschau.knopf.fr)}</div>
                <div className="vp-toast">{zweisprachig(vorschau.erfolg.de, vorschau.erfolg.fr)}</div>
                <div className="vp-chips">
                  {t.bau.chips.map((c) => (
                    <span className="vp-chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
