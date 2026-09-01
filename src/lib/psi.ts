/* PageSpeed Insights v5.
   Die Messung laeuft auf Googles Servern, nicht im Browser des Besuchers.
   Genau deshalb ist sie als Beweis brauchbar: sie haengt nicht am Geraet
   oder an der Leitung dessen, der gerade schaut, und ist nicht faelschbar. */

const ENDPUNKT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

/* Optional. Ohne Schluessel gilt ein niedriges Kontingent, mit Schluessel
   ein hoeheres. Der Schluessel darf oeffentlich sein, solange er in der
   Google Cloud Console per HTTP-Referrer auf die eigene Domain beschraenkt ist. */
const SCHLUESSEL = import.meta.env.VITE_PSI_KEY as string | undefined;

export type Stufe = "gut" | "mittel" | "schlecht";
export type Fehlerart = "url" | "nicht-erreichbar" | "kontingent" | "allgemein";

export type Messwert = { wert: number; stufe: Stufe };

export type Messung = {
  domain: string;
  lcp: Messwert;
  cls: Messwert;
  score: number;
  gesamt: Stufe;
  ausFelddaten: boolean;
};

export class MessFehler extends Error {
  art: Fehlerart;
  constructor(art: Fehlerart) {
    super(art);
    this.art = art;
  }
}

/* Googles eigene Schwellen fuer die Core Web Vitals.
   Keine ausgedachten Zahlen: https://web.dev/articles/defining-core-web-vitals-thresholds */
const LCP_GUT = 2500;
const LCP_MITTEL = 4000;
const CLS_GUT = 0.1;
const CLS_MITTEL = 0.25;

const stufeVon = (wert: number, gut: number, mittel: number): Stufe =>
  wert <= gut ? "gut" : wert <= mittel ? "mittel" : "schlecht";

/** Nimmt entgegen, was ein Mensch tippt, und macht daraus eine pruefbare URL. */
export function normalisiere(eingabe: string): string {
  const roh = eingabe.trim().replace(/\s+/g, "");
  if (!roh) throw new MessFehler("url");

  const mitSchema = /^https?:\/\//i.test(roh) ? roh : `https://${roh}`;

  let url: URL;
  try {
    url = new URL(mitSchema);
  } catch {
    throw new MessFehler("url");
  }

  // Mindestens ein Punkt und eine plausible Endung, sonst ist es kein Hostname.
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(url.hostname)) throw new MessFehler("url");

  return url.toString();
}

export function anzeigeName(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

type PsiAntwort = {
  lighthouseResult?: {
    categories?: { performance?: { score?: number } };
    audits?: Record<string, { numericValue?: number }>;
  };
  loadingExperience?: {
    metrics?: Record<string, { percentile?: number }>;
  };
  error?: { code?: number; message?: string };
};

export async function miss(eingabe: string, signal?: AbortSignal): Promise<Messung> {
  const url = normalisiere(eingabe);

  const p = new URLSearchParams({ url, strategy: "mobile", category: "performance" });
  if (SCHLUESSEL) p.set("key", SCHLUESSEL);

  let antwort: Response;
  try {
    antwort = await fetch(`${ENDPUNKT}?${p}`, { signal });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    throw new MessFehler("allgemein");
  }

  if (!antwort.ok) {
    if (antwort.status === 429) throw new MessFehler("kontingent");
    if (antwort.status === 400 || antwort.status === 404) throw new MessFehler("nicht-erreichbar");
    if (antwort.status === 403) throw new MessFehler("kontingent");
    throw new MessFehler("allgemein");
  }

  const daten = (await antwort.json()) as PsiAntwort;
  const haus = daten.lighthouseResult;
  const score = haus?.categories?.performance?.score;

  if (typeof score !== "number") throw new MessFehler("nicht-erreichbar");

  // Felddaten aus echten Besuchen schlagen die Labormessung, wenn vorhanden.
  const feldLcp = daten.loadingExperience?.metrics?.LARGEST_CONTENTFUL_PAINT_MS?.percentile;
  const feldCls = daten.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile;

  const laborLcp = haus?.audits?.["largest-contentful-paint"]?.numericValue ?? 0;
  const laborCls = haus?.audits?.["cumulative-layout-shift"]?.numericValue ?? 0;

  const ausFelddaten = typeof feldLcp === "number";

  const lcpWert = ausFelddaten ? feldLcp : laborLcp;
  // Das CrUX-Feld liefert CLS mit Faktor 100, die Labormessung nicht.
  const clsWert =
    ausFelddaten && typeof feldCls === "number" ? feldCls / 100 : laborCls;

  const lcp: Messwert = { wert: lcpWert, stufe: stufeVon(lcpWert, LCP_GUT, LCP_MITTEL) };
  const cls: Messwert = { wert: clsWert, stufe: stufeVon(clsWert, CLS_GUT, CLS_MITTEL) };

  // Das schlechtere der beiden bestimmt das Gesamturteil. Ein guter Wert
  // darf einen schlechten nicht verdecken.
  const rang: Record<Stufe, number> = { gut: 0, mittel: 1, schlecht: 2 };
  const gesamt = rang[lcp.stufe] >= rang[cls.stufe] ? lcp.stufe : cls.stufe;

  return { domain: anzeigeName(url), lcp, cls, score: Math.round(score * 100), gesamt, ausFelddaten };
}
