/* Kontaktdaten an einer Stelle. Die Mailadresse auf sherka.ch funktioniert
   erst, wenn die Domain registriert und das Postfach eingerichtet ist
   (Launch-Blocker, siehe npm run startklar). */

export const DOMAIN = "https://sherka.ch";
export const TELEFON = "+41 78 745 00 47";
export const TELEFON_ROH = "41787450047";
export const MAIL = "info@sherka.ch";

export function whatsappLink(text: string): string {
  return `https://wa.me/${TELEFON_ROH}?text=${encodeURIComponent(text)}`;
}
