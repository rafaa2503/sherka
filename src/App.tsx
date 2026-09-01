import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "./components/Nav";
import { Nebel } from "./components/Nebel";
import { Fallblatt } from "./components/Fallblatt";
import { Tempocheck } from "./components/Tempocheck";
import { Anfrage } from "./components/Anfrage";
import { projekte } from "./data/projekte";
import { starteEnthuellung } from "./lib/bewegung";
import { useSprache } from "./i18n";
import "./App.css";

const TELEFON = "+41 78 745 00 47";
const TELEFON_ROH = "41787450047";
const MAIL = "raffa.amro@gmail.com";

export default function App() {
  const { t, sprache } = useSprache();
  const [ausTempo, setAusTempo] = useState<string | null>(null);
  const kontakt = useRef<HTMLElement>(null);
  const wurzel = useRef<HTMLDivElement>(null);

  const zurAnfrage = useCallback((domain: string) => {
    setAusTempo(domain);
    kontakt.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!wurzel.current) return;
    return starteEnthuellung(wurzel.current);
  }, [sprache]);

  return (
    <div ref={wurzel}>
      <a className="springlink" href="#inhalt">
        {t.nav.zumInhalt}
      </a>
      <Nav />

      <main id="inhalt">
        <span id="oben" />

        <section className="sektion hero">
          <Nebel />
          <div className="shell">
            <div className="hero-kopf">
              <div className="hero-marke">
                <span>Sherka</span>
                <b>{t.hero.plakette}</b>
              </div>

              <h1>
                <Fallblatt as="span" text={t.hero.titelOben} />
                <Fallblatt as="span" className="an" text={t.hero.titelUnten} verzoegerung={340} />
              </h1>

              <p className="hero-unterzeile maske">
                <span>{t.hero.text}</span>
              </p>

              <div className="hero-knoepfe">
                <a className="knopf knopf-voll" href="#kontakt">
                  <span>{t.hero.cta}</span>
                </a>
                <a className="knopf knopf-leer" href="#tempo">
                  <span>{t.hero.cta2}</span>
                </a>
              </div>
            </div>

            {/* Abfahrtstafel. Vier echte Domains mit ihrem echten
                Bildschirmfoto, keine erfundenen Kundenlogos. Steht rechts
                im Hero, weil dort sonst ein totes Feld waere. */}
            <aside className="tafel" data-auf>
              <div className="tafel-kopf">
                <span>{t.arbeiten.tafelKopf}</span>
                <span className="tafel-status">{t.arbeiten.tafelStatus}</span>
              </div>
              {projekte.map((p) => (
                <a className="tafel-zeile" key={p.domain} href={p.url} target="_blank" rel="noopener noreferrer">
                  <img src={p.bild ?? ""} alt="" width={1240} height={775} loading="eager" decoding="async" />
                  <span className="tafel-name">{p.domain}</span>
                  <span className="tafel-was">{p.text[sprache].was}</span>
                </a>
              ))}
            </aside>
          </div>
        </section>

        <section className="sektion" id="tempo">
          <div className="shell stapel-gross">
            <div className="stapel spalte">
              <h2 className="maske">
                <span>{t.tempo.titel}</span>
              </h2>
              <p className="leise">{t.tempo.text}</p>
            </div>
            <div data-auf>
              <Tempocheck aufAnfrage={zurAnfrage} />
            </div>
          </div>
        </section>

        <section className="sektion" id="arbeiten">
          <div className="shell stapel-gross">
            <div className="stapel spalte">
              <h2 className="maske">
                <span>{t.arbeiten.titel}</span>
              </h2>
              <p className="leise">{t.arbeiten.text}</p>
            </div>

            <ul className="projekte">
              {projekte.map((p) => (
                <li className="projekt" key={p.domain} data-auf>
                  <div className="projekt-bild">
                    {p.bild ? (
                      <>
                        <img
                          src={p.bild}
                          alt={`${p.domain}, ${p.text[sprache].was}`}
                          width={1240}
                          height={775}
                          loading="lazy"
                          decoding="async"
                        />
                        {p.bildMobil && (
                          <img
                            className="projekt-telefon"
                            src={p.bildMobil}
                            alt=""
                            width={275}
                            height={597}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                      </>
                    ) : (
                      <span className="leise num">{t.arbeiten.bildFehlt}</span>
                    )}
                  </div>
                  <div className="projekt-text">
                    <div className="projekt-kopf">
                      <h3>{p.domain}</h3>
                      <span className="leise num">{p.text[sprache].was}</span>
                    </div>
                    <p className="projekt-kann">{p.text[sprache].kann}</p>
                    <a className="projekt-link" href={p.url} target="_blank" rel="noopener noreferrer">
                      {t.arbeiten.besuchen}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sektion" id="leistungen">
          <div className="shell stapel-gross">
            <h2 className="maske spalte">
              <span>{t.leistungen.titel}</span>
            </h2>
            <ul className="reihen">
              {t.leistungen.liste.map((l) => (
                <li className="reihe zweispaltig" key={l.was} data-auf>
                  <h3>{l.was}</h3>
                  <p>{l.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sektion" id="ablauf">
          <div className="shell stapel-gross">
            <h2 className="maske spalte">
              <span>{t.ablauf.titel}</span>
            </h2>

            <ol className="ablauf" data-auf>
              {t.ablauf.schritte.map((s) => (
                <li key={s.was}>
                  <span className="ablauf-zeit num">{s.zeit}</span>
                  <h3>{s.was}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>

            <div className="preis zweispaltig" data-auf>
              <div>
                <span className="preis-zahl">{t.ablauf.preisZahl}</span>
                <h3>{t.ablauf.preisTitel}</h3>
              </div>
              <p>{t.ablauf.preisText}</p>
            </div>
          </div>
        </section>

        <section className="sektion" id="einwaende">
          <div className="shell stapel-gross">
            <h2 className="maske spalte">
              <span>{t.einwaende.titel}</span>
            </h2>
            <ul className="reihen">
              {t.einwaende.liste.map((e) => (
                <li className="reihe zweispaltig" key={e.frage} data-auf>
                  <h3>{e.frage}</h3>
                  <p>{e.antwort}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sektion" id="person">
          <div className="shell person" data-auf>
            <div className="person-bild">
              <span className="leise num">{t.person.fotoFehlt}</span>
            </div>
            <div className="stapel">
              <p className="person-text">{t.person.text1}</p>
              <p className="person-fuss">{t.person.text2}</p>
            </div>
          </div>
        </section>

        <section className="sektion" id="kontakt" ref={kontakt}>
          <div className="shell kontakt">
            <div className="stapel">
              <h2 className="maske">
                <span>{t.kontakt.titel}</span>
              </h2>
              <p className="leise">{t.kontakt.text}</p>

              <dl className="kanaele">
                <div>
                  <dt>{t.kontakt.telefon}</dt>
                  <dd>
                    <a className="num" href={`tel:+${TELEFON_ROH}`}>
                      {TELEFON}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t.kontakt.mail}</dt>
                  <dd>
                    <a href={`mailto:${MAIL}`}>{MAIL}</a>
                  </dd>
                </div>
              </dl>
            </div>

            <div data-auf>
              <Anfrage domain={ausTempo} />
            </div>
          </div>
        </section>
      </main>

      <footer className="fuss">
        <div className="shell fuss-inhalt">
          <span className="marke">Sherka</span>
          <span className="leise">{t.fuss.ort}</span>
          <a href="/impressum.html">{t.fuss.impressum}</a>
          <a href="/datenschutz.html">{t.fuss.datenschutz}</a>
          <span className="fuss-jahr num">2026</span>
        </div>
      </footer>
    </div>
  );
}
