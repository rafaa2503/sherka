/* Aufrichte: der Entwurf richtet sich im Baugespann auf.

   Ausgelöst, nicht ans Scrollen gekoppelt. Läuft über die Web Animations
   API, ohne Bibliothek. Nur transform und opacity.

     Schnurgerüst   0 bis 260 ms   Linien ziehen sich auf (scaleX/scaleY)
     Rohbau       150 bis 550 ms   graue Flächen erscheinen
     Ausbau       500 bis 1000 ms  echter Inhalt kommt, Flächen gehen
     Abnahme     1000 bis 1400 ms  Plakette

   Der Endzustand ist das, was das CSS ohnehin zeigt. Die Animation läuft mit
   fill "both" und wird am Ende entfernt, sodass nie ein Zustand hängen
   bleibt. Überspringen setzt sofort den Endzustand. */

export type Ab = "schnur" | "rohbau" | "ausbau";
export type Stufe = "voll" | "leicht" | "aus";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_WEICH = "cubic-bezier(0.16, 1, 0.3, 1)";

export function bewegungsStufe(): Stufe {
  const s = document.documentElement.dataset.bewegung;
  return s === "leicht" || s === "aus" ? s : "voll";
}

export type Aufrichte = { ueberspringen: () => void; laeuft: () => boolean };

let aktuell: Animation[] = [];

function abbrechen(wurzel: HTMLElement) {
  aktuell.forEach((a) => a.cancel());
  aktuell = [];
  wurzel.removeAttribute("data-laeuft");
}

export function aufrichten(wurzel: HTMLElement, ab: Ab, stufe: Stufe, fertig?: () => void): Aufrichte {
  // Vor dem Abbrechen den sichtbaren Zustand lesen: ein Neustart läuft vom
  // aktuellen Wert weiter, statt auf null zu springen (unterbrechbar).
  const jetzt = new Map<Element, number>();
  if (aktuell.length) {
    wurzel.querySelectorAll(".vp-echt, .vp-roh").forEach((el) => jetzt.set(el, Number(getComputedStyle(el).opacity)));
  }
  abbrechen(wurzel);

  const ende = () => {
    aktuell.forEach((a) => a.cancel());
    aktuell = [];
    wurzel.removeAttribute("data-laeuft");
    wurzel.setAttribute("data-fertig", "");
    fertig?.();
  };

  if (stufe === "aus" || typeof wurzel.animate !== "function") {
    ende();
    return { ueberspringen: () => {}, laeuft: () => false };
  }

  const linien = Array.from(wurzel.querySelectorAll<HTMLElement>(".bg-linie"));
  const mass = wurzel.querySelector<HTMLElement>(".bg-mass");
  const roh = Array.from(wurzel.querySelectorAll<HTMLElement>(".vp-roh"));
  const echt = Array.from(wurzel.querySelectorAll<HTMLElement>(".vp-echt"));
  const plakette = wurzel.querySelector<HTMLElement>(".bg-plakette");

  wurzel.removeAttribute("data-fertig");
  wurzel.setAttribute("data-laeuft", "");

  const lauf = (el: Element, kf: Keyframe[], opt: KeyframeAnimationOptions) => {
    aktuell.push(el.animate(kf, { fill: "both", easing: EASE, ...opt }));
  };

  if (stufe === "leicht") {
    // Nur Überblenden, kurz, ohne Bewegung.
    echt.forEach((e) => lauf(e, [{ opacity: 0 }, { opacity: 1 }], { duration: 300 }));
    roh.forEach((r) => lauf(r, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 }));
  } else {
    // Verschiebung, damit ein Neustart ab Rohbau oder Ausbau sofort beginnt.
    const versatz = ab === "schnur" ? 0 : ab === "rohbau" ? 150 : 500;

    if (ab === "schnur") {
      linien.forEach((l, i) => {
        const t = l.dataset.achse === "y" ? "scaleY(0)" : "scaleX(0)";
        lauf(l, [{ transform: t }, { transform: "none" }], { duration: 260, delay: i * 40 });
      });
      if (mass) lauf(mass, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 200 });
    }

    if (ab !== "ausbau") {
      roh.forEach((r, i) =>
        lauf(r, [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], {
          duration: 320,
          delay: Math.max(0, 150 - versatz) + i * 50,
        }),
      );
    }

    const ausbau = Math.max(0, 500 - versatz);
    const neuAb = ab === "ausbau";
    echt.forEach((e, i) =>
      lauf(e, [{ opacity: neuAb ? (jetzt.get(e) ?? 1) * 0.15 : 0 }, { opacity: 1 }], {
        duration: neuAb ? 320 : 400,
        delay: ausbau + i * (neuAb ? 20 : 40),
        easing: EASE_WEICH,
      }),
    );
    roh.forEach((r) =>
      lauf(r, [{ opacity: neuAb ? Math.max(jetzt.get(r) ?? 0, 0.6) : 1 }, { opacity: 0 }], { duration: 300, delay: ausbau + 100 }),
    );

    if (plakette) {
      lauf(plakette, [{ opacity: 0, transform: "scale(0.95)" }, { opacity: 1, transform: "none" }], {
        duration: 220,
        delay: Math.max(0, 1000 - versatz),
      });
    }
  }

  const meine = aktuell;
  Promise.all(meine.map((a) => a.finished))
    .then(() => {
      if (aktuell === meine) ende();
    })
    .catch(() => {
      /* abgebrochen durch einen Neustart: der neue Lauf räumt auf */
    });

  return {
    ueberspringen: () => {
      if (aktuell === meine) meine.forEach((a) => a.finish());
    },
    laeuft: () => aktuell === meine && meine.length > 0,
  };
}
