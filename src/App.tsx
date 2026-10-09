import { Fragment, useEffect } from "react";
import { Nav } from "./components/Nav";
import { Laeufer } from "./components/Laeufer";
import { Anfrage } from "./components/Anfrage";
import { Bau } from "./components/Bau";
import { Arbeiten } from "./components/Arbeiten";
import { Ablauf } from "./components/Ablauf";
import { LiveTelefon } from "./components/LiveTelefon";
import { projekte } from "./data/projekte";
import { PORTRAET_1120, PORTRAET_560, PORTRAET_DA } from "./data/portraet";
import { starteHero, starteLenis } from "./lib/bewegung";
import { useSprache } from "./i18n";
import "./App.css";

const TELEFON = "+41 78 745 00 47";
const TELEFON_ROH = "41787450047";
const MAIL = "raffa.amro@gmail.com";

/* Worte statt Buchstaben: jedes Wort steigt hinter einer Kante hervor. So
   bleibt jeder Umbruch an einer Wortgrenze, und der Text steht in beiden
   Sprachen von selbst richtig da. */
function woerter(satz: string, start: number) {
  return satz.split(" ").map((w, i) => (
    <Fragment key={`${w}-${i}`}>
      <span className="wort" aria-hidden="true">
        <span style={{ animationDelay: `${120 + (start + i) * 70}ms` }}>{w}</span>
      </span>{" "}
    </Fragment>
  ));
}

/* Zweifarbige Ueberschrift: erster Teil in Tinte, Rest gedaempft. Geteilt wird
   am Komma, sonst in der Mitte, immer an einer Wortgrenze. */
function zweiton(text: string) {
  const komma = text.indexOf(", ");
  const teile = text.split(" ");
  const schnitt = komma > 0 ? text.slice(0, komma + 1).split(" ").length : Math.ceil(teile.length / 2);
  return (
    <>
      {teile.slice(0, schnitt).join(" ")} <span className="ton-zwei">{teile.slice(schnitt).join(" ")}</span>
    </>
  );
}

export default function App() {
  const { t } = useSprache();

  useEffect(() => starteLenis(), []);
  useEffect(() => starteHero(), []);

  const live = projekte[1];

  return (
    <>
      <Laeufer />
      <a className="springlink" href="#inhalt">
        {t.nav.zumInhalt}
      </a>
      <Nav />

      <header className="buehne-aussen">
        <span id="oben" />
        <div className="buehne flaeche-dunkel">
          <div className="buehne-licht" aria-hidden="true">
            <i className="blob blob-a" />
            <i className="blob blob-b" />
            <i className="blob blob-c" />
            <i className="buehne-spot" />
            <i className="buehne-korn" />
          </div>

          <div className="buehne-text">
            <span className="abzeichen">{t.hero.rolle}</span>
            <h1 aria-label={`${t.hero.titelOben} ${t.hero.titelUnten}`}>
              {woerter(t.hero.titelOben, 0)}
              <br />
              <span className="ton-zwei">{woerter(t.hero.titelUnten, t.hero.titelOben.split(" ").length)}</span>
            </h1>
            <p className="buehne-unterzeile">{t.hero.text}</p>
            <div className="buehne-knoepfe">
              <a className="knopf knopf-voll" href="#kontakt">
                {t.hero.cta}
              </a>
              <a
                className="knopf knopf-leer"
                href={`https://wa.me/${TELEFON_ROH}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.whatsapp}
              </a>
            </div>
          </div>

          <div className="buehne-geraet">
            <LiveTelefon url={live.url} poster={live.bildMobil} alt={t.hero.bildAlt} hinweis={t.hero.live} />
          </div>
        </div>
      </header>

      <main id="inhalt">
        <Bau />

        <Arbeiten titel={zweiton(t.arbeiten.titel)} />

        <section className="sektion" id="leistungen">
          <div className="shell leist">
            <h2>{zweiton(t.leistungen.titel)}</h2>
            <ul className="leist-liste">
              {t.leistungen.liste.map((l) => (
                <li key={l.was}>
                  <h3>{l.was}</h3>
                  <p>{l.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Stimmen erscheinen erst, wenn der Text schriftlich freigegeben ist. */}
        {!t.stimmen.platzhalter && (
          <section className="sektion" id="stimmen">
            <div className="shell stapel-gross">
              <h2 className="spalte">{zweiton(t.stimmen.titel)}</h2>
              <ul className="stimmen">
                {t.stimmen.liste.map((s) => (
                  <li key={s.name}>
                    <blockquote>{s.zitat}</blockquote>
                    <p className="stimme-wer">
                      <strong>{s.name}</strong>
                      <span className="leise">{s.rolle}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <Ablauf titel={zweiton(t.ablauf.titel)} />

        <section className="sektion" id="faq">
          <div className="shell faq-raster">
            <h2>{zweiton(t.faq.titel)}</h2>
            <ul className="faq">
              {t.faq.liste.map((e) => (
                <li key={e.frage}>
                  <details>
                    <summary>
                      <span>{e.frage}</span>
                      <span className="faq-icon" aria-hidden="true" />
                    </summary>
                    <p>{e.antwort}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sektion" id="person">
          <div className={PORTRAET_DA ? "shell person" : "shell person person-ohne-bild"}>
            {PORTRAET_DA && (
              <img
                className="person-bild"
                src={PORTRAET_1120}
                srcSet={`${PORTRAET_560} 560w, ${PORTRAET_1120} 1120w`}
                sizes="(min-width: 800px) 288px, 70vw"
                alt={t.person.fotoAlt}
                width={560}
                height={700}
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="person-spalte">
              <h2>{zweiton(t.person.titel)}</h2>
              <p className="person-text">{t.person.text1}</p>
            </div>
          </div>
        </section>
      </main>

      <section className="kontakt-aussen" id="kontakt">
        <div className="kontakt-buehne flaeche-dunkel">
          <div className="buehne-licht" aria-hidden="true">
            <i className="blob blob-b kontakt-blob-a" />
            <i className="blob blob-a kontakt-blob-b" />
            <i className="buehne-korn" />
          </div>
          <div className="shell kontakt">
            <div className="stapel">
              <h2>{zweiton(t.kontakt.titel)}</h2>
              <p className="leise">{t.kontakt.text}</p>

              <dl className="kanaele">
                <div>
                  <dt>{t.kontakt.whatsapp}</dt>
                  <dd>
                    <a href={`https://wa.me/${TELEFON_ROH}`} target="_blank" rel="noopener noreferrer">
                      {t.hero.whatsapp}
                    </a>
                  </dd>
                </div>
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

            <Anfrage />
          </div>
        </div>
      </section>

      <footer className="fuss">
        <div className="shell fuss-inhalt">
          <span className="marke">Sherka</span>
          <span className="leise">{t.fuss.ort}</span>
          <a href="/impressum.html">{t.fuss.impressum}</a>
          <a href="/datenschutz.html">{t.fuss.datenschutz}</a>
          <span className="fuss-jahr num">2026</span>
        </div>
        <span className="fuss-marke" aria-hidden="true">
          Sherka
        </span>
      </footer>
    </>
  );
}
