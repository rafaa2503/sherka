import { useEffect, useRef, useState } from "react";
import "./LiveTelefon.css";

/* Handy mit der echten, laufenden Kundenseite darin. Das ist der Beweis im
   ersten Bild: keine Attrappe, man kann scrollen und klicken.

   Bis die Seite geladen ist, steht das Bildschirmfoto da. Der Rahmen wird
   erst nach dem Laden der eigenen Seite und nur am Computer bestueckt, damit
   die fremde Seite weder den Start bremst noch am Handy das Scrollen
   einfaengt. */

const BREITE = 390;

type Props = { url: string; poster: string | null; alt: string; hinweis: string };

export function LiveTelefon({ url, poster, alt, hinweis }: Props) {
  const schirm = useRef<HTMLDivElement>(null);
  const [laden, setLaden] = useState(false);
  const [fertig, setFertig] = useState(false);
  const [massstab, setMassstab] = useState(0.7);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    if (!desktop) return;
    const los = () => setLaden(true);
    let timer = 0;
    const planen = () => {
      timer = window.setTimeout(los, 400);
    };
    if (document.readyState === "complete") planen();
    else window.addEventListener("load", planen, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", planen);
    };
  }, []);

  useEffect(() => {
    const el = schirm.current;
    if (!el) return;
    const messen = () => setMassstab(el.clientWidth / BREITE);
    messen();
    const ro = new ResizeObserver(messen);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hoehe = schirm.current ? schirm.current.clientHeight / massstab : 844;

  return (
    <figure className="live">
      <div className="telefon">
        <span className="telefon-insel" aria-hidden="true" />
        <div className="telefon-schirm" ref={schirm}>
          {poster && <img src={poster} alt={alt} width={275} height={600} decoding="async" />}
          {laden && (
            <iframe
              className={fertig ? "live-seite live-fertig" : "live-seite"}
              src={url}
              title={alt}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
              onLoad={() => setFertig(true)}
              style={{ width: BREITE, height: hoehe, transform: `scale(${massstab})` }}
            />
          )}
        </div>
      </div>
      <figcaption className="live-hinweis">{hinweis}</figcaption>
    </figure>
  );
}
