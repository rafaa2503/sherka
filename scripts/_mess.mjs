import { chromium, webkit, firefox } from "playwright";
for (const [name, typ] of [["chromium", chromium], ["webkit", webkit], ["firefox", firefox]]) {
  let b;
  try { b = await typ.launch(); } catch (e) { console.log(name, "nicht installiert"); continue; }
  for (const mobil of [false, true]) {
    const k = await b.newContext(mobil ? { viewport: { width: 390, height: 844 }, isMobile: name !== "firefox", hasTouch: true } : { viewport: { width: 1366, height: 768 } });
    const p = await k.newPage();
    const f = [];
    p.on("console", (m) => m.type() === "error" && f.push(m.text().slice(0, 120)));
    await p.goto("https://sherka.vercel.app/", { waitUntil: "load" });
    await p.waitForTimeout(3000);
    const r = await p.evaluate(() => ({ wert: document.querySelector(".mess-wert")?.textContent, sichtbar: !!document.querySelector(".mess")?.offsetParent, lcp: PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint"), fcp: performance.getEntriesByName("first-contentful-paint").length }));
    console.log(name, mobil ? "handy" : "laptop", JSON.stringify(r), f.length ? "Fehler: " + JSON.stringify(f) : "");
    await k.close();
  }
  await b.close();
}
