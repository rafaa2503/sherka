import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projekte } from "../data/projekte";
import messungen from "../data/messungen.json";
import { useSprache } from "../i18n";
import "./Arbeiten.css";

/* Die vier Referenzen laufen beim Scrollen seitlich durch, waehrend der
   Abschnitt stehen bleibt. Am Handy und bei reduzierter Bewegung gibt es
   kein Pinning: dann stehen sie untereinander. */

type Messung = { lcpSekunden: number; score: number; datum: string };
const gemessen = messungen as Record<string, Messung | undefined>;

export function Arbeiten({ titel }: { titel: React.ReactNode }) {
  const { t, sprache } = useSprache();
  const wurzel = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wurzel.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const spur = el.querySelector<HTMLElement>(".arb-spur")!;
      const strich = el.querySelector<HTMLElement>(".arb-strich")!;
      const weg = () => Math.max(0, spur.scrollWidth - window.innerWidth + 2 * parseFloat(getComputedStyle(spur).paddingLeft));

      gsap.set(strich, { scaleX: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el.querySelector(".arb-pin"),
          start: "top top",
          end: () => `+=${weg() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(spur, { x: () => -weg(), duration: 1 }, 0).to(strich, { scaleX: 1, duration: 1 }, 0);

      return () => gsap.set([spur, strich], { clearProps: "all" });
    });

    const nachLaden = () => ScrollTrigger.refresh();
    window.addEventListener("load", nachLaden);
    return () => {
      window.removeEventListener("load", nachLaden);
      mm.revert();
    };
  }, []);

  const datumFormat = new Intl.DateTimeFormat(sprache === "fr" ? "fr-CH" : "de-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="sektion arb" id="arbeiten" ref={wurzel}>
      <div className="arb-pin">
        <div className="shell arb-kopf">
          <h2>{titel}</h2>
          <p className="leise">{t.arbeiten.text}</p>
        </div>

        <ul className="arb-spur">
          {projekte.map((p, i) => {
            const m = gemessen[p.domain];
            return (
              <li className="arb-folie" key={p.domain}>
                <a className="arb-bild" href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
                  {p.bild && (
                    <img
                      src={p.bild}
                      alt={`${p.domain}, ${p.text[sprache].was}`}
                      width={1240}
                      height={775}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  )}
                  {p.bildMobil && (
                    <img
                      className="arb-handy"
                      src={p.bildMobil}
                      alt=""
                      width={275}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </a>

                <div className="arb-info">
                  <h3 className="num">{p.domain}</h3>
                  <dl>
                    <div>
                      <dt>{t.arbeiten.branche}</dt>
                      <dd>{p.text[sprache].was}</dd>
                    </div>
                    <div>
                      <dt>{t.arbeiten.domain}</dt>
                      <dd>{p.domainBei === "kunde" ? t.arbeiten.domainKunde : t.arbeiten.domainSherka}</dd>
                    </div>
                    {m && (
                      <div>
                        <dt>{t.arbeiten.ladezeit}</dt>
                        <dd>
                          <span className="num">{String(m.lcpSekunden).replace(".", ",")} s</span>
                          <span className="leise">
                            {" "}
                            {t.arbeiten.gemessen} {datumFormat.format(new Date(m.datum))}
                          </span>
                        </dd>
                      </div>
                    )}
                  </dl>
                  <p className="arb-kann">{p.text[sprache].kann}</p>
                  <a className="arb-link" href={p.url} target="_blank" rel="noopener noreferrer">
                    {t.arbeiten.besuchen}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="shell arb-fuss">
          <p className="arb-auch">{t.arbeiten.auchDafuer}</p>
          <span className="arb-linie" aria-hidden="true">
            <i className="arb-strich" />
          </span>
        </div>
      </div>
    </section>
  );
}
