/* Versand der Anfrage. Ist eine Formspree-Adresse gesetzt, geht die Anfrage
   dorthin (funktioniert auf jedem Hosting, auch auf Vercel). Sonst an den
   eigenen Endpunkt public/api/anfrage.php auf Infomaniak. Keine Bibliothek.
   Nach 15 Sekunden wird abgebrochen. Bei jedem Fehler bleiben die Eingaben
   im Formular stehen. */

export const ENDPUNKT = "/api/anfrage.php";
/* Formspree-Endpunkt aus dem Dashboard (Form > Integration), z. B.
   https://formspree.io/f/abcdwxyz. Die Adresse ist nicht geheim: Sie steht
   ohnehin im Code, den jeder Browser lädt. */
export const FORMSPREE: string = import.meta.env.VITE_FORMSPREE || "";
export const FORMULAR_AUS = import.meta.env.VITE_FORMULAR_AUS === "1";

export type Anfrage = {
  anliegen: string;
  betrieb: string;
  zeitrahmen: string;
  text: string;
  name: string;
  email: string;
  telefon: string;
  sprache: "de" | "fr";
  firma: string;
  dauerMs: number;
};

export type Ergebnis =
  | { ok: true }
  | { ok: false; art: "feld"; felder: Record<string, string> }
  | { ok: false; art: "zuviele" }
  | { ok: false; art: "fehler" };

export async function sendeAnfrage(daten: Anfrage): Promise<Ergebnis> {
  return FORMSPREE ? sendeFormspree(daten) : sendeEigen(daten);
}

async function sendeFormspree(daten: Anfrage): Promise<Ergebnis> {
  // Honigtopf gefüllt oder unmenschlich schnell: so tun, als wäre alles gut.
  if (daten.firma !== "" || daten.dauerMs < 3000) return { ok: true };
  const abbruch = new AbortController();
  const zeit = window.setTimeout(() => abbruch.abort(), 15000);
  try {
    const r = await fetch(FORMSPREE, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: daten.betrieb ? `Anfrage über sherka.ch: ${daten.betrieb}` : "Anfrage über sherka.ch",
        name: daten.name,
        ...(daten.email ? { email: daten.email } : {}),
        telefon: daten.telefon,
        anliegen: daten.anliegen,
        betrieb: daten.betrieb,
        zeitrahmen: daten.zeitrahmen,
        nachricht: daten.text,
        sprache: daten.sprache,
      }),
      signal: abbruch.signal,
    });
    if (r.ok) return { ok: true };
    if (r.status === 429) return { ok: false, art: "zuviele" };
    if (r.status === 422) {
      const j = (await r.json().catch(() => ({}))) as { errors?: { field?: string }[] };
      const felder: Record<string, string> = {};
      for (const e of j.errors ?? []) if (e.field) felder[e.field] = "ungueltig";
      return Object.keys(felder).length ? { ok: false, art: "feld", felder } : { ok: false, art: "fehler" };
    }
    return { ok: false, art: "fehler" };
  } catch {
    return { ok: false, art: "fehler" };
  } finally {
    window.clearTimeout(zeit);
  }
}

async function sendeEigen(daten: Anfrage): Promise<Ergebnis> {
  const abbruch = new AbortController();
  const zeit = window.setTimeout(() => abbruch.abort(), 15000);
  try {
    const r = await fetch(ENDPUNKT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(daten),
      signal: abbruch.signal,
    });
    if (r.ok) return { ok: true };
    if (r.status === 429) return { ok: false, art: "zuviele" };
    if (r.status === 422) {
      const j = (await r.json().catch(() => ({}))) as { fehler?: Record<string, string> };
      return { ok: false, art: "feld", felder: j.fehler ?? {} };
    }
    return { ok: false, art: "fehler" };
  } catch {
    return { ok: false, art: "fehler" };
  } finally {
    window.clearTimeout(zeit);
  }
}

export const MAIL_MUSTER = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const TEL_MUSTER = /^\+?[0-9 ()/-]{9,30}$/;

export function telGueltig(tel: string): boolean {
  return TEL_MUSTER.test(tel) && tel.replace(/\D/g, "").length >= 9;
}
