import { useEffect, useRef } from "react";
import { Nav } from "./components/Nav";
import { Vorhang } from "./components/Vorhang";
import { Nebel } from "./components/Nebel";
import { Fallblatt } from "./components/Fallblatt";
import { Magnet } from "./components/Magnet";
import { BildFluss } from "./components/BildFluss";
import { ZahlAuf } from "./components/ZahlAuf";
import { Anfrage } from "./components/Anfrage";
import { projekte } from "./data/projekte";
import { starteEnthuellung, starteFortschritt, starteKippen, starteLenis, starteScrub } from "./lib/bewegung";
import { useSprache } from "./i18n";
import "./App.css";

const TELEFON = "+41 78 745 00 47";
const TELEFON_ROH = "41787450047";
const MAIL = "raffa.amro@gmail.com";

export default function App() {
  const { t, sprache } = useSprache();
  const wurzel = useRef<HTMLDivElement>(null);

  useEffect(() => starteLenis(), []);

  useEffect(() => {
    if (!wurzel.current) return;
    const auf = starteEnthuellung(wurzel.current);
    const scrub = starteScrub(wurzel.current);
    const kippen = starteKippen(wurzel.current);
    const fortschritt = starteFortschritt();
    return () => {
      auf();
      scrub();
      kippen();
      fortschritt();
    };
  }, [sprache]);

  return (
    <div ref={wurzel}>
      <Vorhang />
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
                <Magnet className="knopf knopf-voll" href="#kontakt">
                  {t.hero.cta}
                </Magnet>
                <Magnet className="knopf knopf-leer" href="#arbeiten">
                  {t.hero.cta2}
                </Magnet>
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

        <section className="sektion" id="arbeiten">
          <div className="shell stapel-gross">
            <div className="stapel spalte">
              <h2 className="maske">
                <span data-zerlegen>{t.arbeiten.titel}</span>
              </h2>
              <p className="leise">{t.arbeiten.text}</p>
            </div>

            <ul className="projekte">
              {projekte.map((p) => (
                <li className="projekt" key={p.domain} data-auf>
                  <div className="projekt-bild">
                    {p.bild ? (
                      <>
                        <BildFluss
                          src={p.bild}
                          alt={`${p.domain}, ${p.text[sprache].was}`}
                          breite={1240}
                          hoehe={775}
                        />
                        {p.bildMobil && (
                          /* Echtes Handy-Bildschirmfoto im Geraeterahmen.
                             Belegt nebenbei, dass die Seite mobil gebaut ist. */
                          <div className="telefon" aria-hidden="true">
                            <span className="telefon-insel" />
                            <img
                              src={p.bildMobil}
                              alt=""
                              width={275}
                              height={597}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
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
            <h2 className="spalte"><span className="maske">
              <span>{t.leistungen.titel}</span>
            </span></h2>
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

        {/* Laufschrift. Genau eine auf der Seite, und sie traegt echten Inhalt:
            die vier Domains, die tatsaechlich laufen. */}
        <section className="laufband" aria-hidden="true">
          <div className="laufband-spur">
            {[0, 1].map((n) => (
              <span key={n}>
                {projekte.map((p) => (
                  <span key={p.domain}>
                    {p.domain}
                    <i />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </section>
        {/* Aussage, die sich beim Durchscrollen fuellt. Traegt den Satz,
            der die ganze Positionierung in einer Zeile zusammenfasst. */}
        <section className="sektion aussage-sektion">
          <div className="shell">
            <p className="aussage fuellsatz">{t.aussage}</p>
          </div>
        </section>


        {/* Zahlen. Nur echte: vier laufende Seiten, zwei Sprachen,
            Antwortzeit, eine Ansprechperson. Keine erfundenen Prozente. */}
        <section className="sektion" id="zahlen">
          <div className="shell">
            <ul className="zahlen" data-auf>
              {t.zahlen.map((z) => (
                <li key={z.label}>
                  <span className="zahl-wert num"><ZahlAuf wert={z.wert} /></span>
                  <span className="zahl-label">{z.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sektion" id="branchen">
          <div className="shell stapel-gross">
            <div className="stapel spalte">
              <h2 className="maske">
                <span data-zerlegen>{t.branchen.titel}</span>
              </h2>
              <p className="leise">{t.branchen.text}</p>
            </div>
            <ul className="branchen">
              {t.branchen.liste.map((b) => (
                <li key={b.was} data-auf>
                  <h3>{b.was}</h3>
                  <p className="leise">{b.text}</p>
                  <span className="branche-beleg num">{b.beleg}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sektion" id="regionen">
          <div className="shell zweispaltig" data-auf>
            <div className="stapel">
              <h2 className="maske">
                <span>{t.regionen.titel}</span>
              </h2>
            </div>
            <div className="stapel">
              <p className="leise">{t.regionen.text}</p>
              <ul className="regionen">
                {t.regionen.liste.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className="leise regionen-fern">{t.regionen.fern}</p>
            </div>
          </div>
        </section>

        <section className="sektion" id="ablauf">
          <div className="shell stapel-gross">
            <h2 className="spalte"><span className="maske">
              <span>{t.ablauf.titel}</span>
            </span></h2>

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
            <h2 className="spalte"><span className="maske">
              <span data-zerlegen>{t.einwaende.titel}</span>
            </span></h2>
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

        <section className="sektion" id="kontakt">
          <div className="shell kontakt">
            <div className="stapel">
              <h2 className="maske">
                <span data-zerlegen>{t.kontakt.titel}</span>
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
              <Anfrage />
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
