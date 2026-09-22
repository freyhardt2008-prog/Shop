/** Formatierungs-Helfer (de-DE). */

const priceFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

/** Formatiert Cent-Beträge als Euro-Preis, z. B. 3995 → "39,95 €". */
export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100);
}

/** Formatiert eine Lieferzeitspanne, z. B. [2, 4] → "2–4 Werktage". */
export function formatDeliveryDays([min, max]: [number, number]): string {
  return min === max ? `${min} Werktage` : `${min}–${max} Werktage`;
}

/** Rechnet den im Bruttopreis enthaltenen Mehrwertsteueranteil aus. */
export function vatAmountCents(grossCents: number, vatRate: number): number {
  return Math.round(grossCents - grossCents / (1 + vatRate / 100));
}

/** Rabatt in Prozent gegenüber der UVP (für Streichpreise). */
export function discountPercent(priceCents: number, rrpCents?: number): number | null {
  if (!rrpCents || rrpCents <= priceCents) return null;
  return Math.round((1 - priceCents / rrpCents) * 100);
}

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export function formatDate(value: string | Date): string {
  return dateFormatter.format(typeof value === 'string' ? new Date(value) : value);
}

/**
 * Normalisiert Text für Suche und Vergleiche:
 * Kleinschreibung, Umlaut-Faltung, Entfernen von Sonderzeichen.
 */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Kürzt Text auf eine maximale Länge (für Meta-Descriptions). */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 1).trimEnd()}…`;
}

/** Erzeugt aus einem beliebigen String einen URL-tauglichen Slug. */
export function slugify(input: string): string {
  return normalize(input).replace(/\s+/g, '-');
}

/** Erster Buchstabe für die A–Z-Navigation (nicht-alphabetisch → "#"). */
export function initialLetter(name: string): string {
  const normalized = normalize(name);
  const first = normalized.charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : '#';
}
