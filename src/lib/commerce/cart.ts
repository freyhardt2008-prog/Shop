import { getProduct, getVariant } from '@/lib/catalog';
import { vatAmountCents } from '@/lib/format';
import type { CartLine, CartTotals, ResolvedCartLine, ShippingMethodId } from '@/lib/types';
import { FREE_SHIPPING_THRESHOLD_CENTS, shippingCostCents } from './shipping';

/**
 * Warenkorb-Logik – bewusst als reine Funktionen ohne React-Abhängigkeit,
 * damit sie sowohl im Client (Context) als auch serverseitig (Checkout-API)
 * und in Tests verwendet werden kann.
 */

/** Löst Warenkorbzeilen gegen den Katalog auf und berechnet Zeilensummen. */
export function resolveCartLines(lines: CartLine[]): ResolvedCartLine[] {
  const resolved: ResolvedCartLine[] = [];

  for (const line of lines) {
    const product = getProduct(line.productSlug);
    if (!product) continue;
    const variant = getVariant(product, line.variantId);
    if (!variant) continue;

    const unitPriceCents = variant.priceCents ?? product.priceCents;
    const quantity = Math.max(1, Math.floor(line.quantity));

    resolved.push({
      ...line,
      quantity,
      product,
      variant,
      unitPriceCents,
      lineTotalCents: unitPriceCents * quantity,
    });
  }

  return resolved;
}

/** Berechnet alle Summen inklusive MwSt.-Aufschlüsselung nach Steuersatz. */
export function calculateTotals(
  lines: ResolvedCartLine[],
  shippingMethodId: ShippingMethodId = 'standard',
): CartTotals {
  const subtotalCents = lines.reduce((sum, line) => sum + line.lineTotalCents, 0);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const shippingCents = lines.length === 0 ? 0 : shippingCostCents(shippingMethodId, subtotalCents);

  // MwSt. je Satz aufsummieren (Versand mit dem höchsten vorkommenden Satz).
  const byRate = new Map<number, number>();
  for (const line of lines) {
    byRate.set(line.product.vatRate, (byRate.get(line.product.vatRate) ?? 0) + line.lineTotalCents);
  }
  if (shippingCents > 0) {
    const highestRate = Math.max(19, ...byRate.keys());
    byRate.set(highestRate, (byRate.get(highestRate) ?? 0) + shippingCents);
  }

  const vatBreakdown = [...byRate.entries()]
    .map(([rate, grossCents]) => ({ rate, amountCents: vatAmountCents(grossCents, rate) }))
    .sort((a, b) => b.rate - a.rate);

  return {
    itemCount,
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
    vatBreakdown,
    freeShippingThresholdCents: FREE_SHIPPING_THRESHOLD_CENTS,
    amountToFreeShippingCents: Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents),
  };
}

/** Fügt eine Zeile hinzu bzw. erhöht die Menge einer bestehenden Zeile. */
export function addLine(lines: CartLine[], newLine: CartLine): CartLine[] {
  const index = lines.findIndex(
    (line) => line.productSlug === newLine.productSlug && line.variantId === newLine.variantId,
  );
  if (index === -1) return [...lines, { ...newLine, quantity: Math.max(1, newLine.quantity) }];

  return lines.map((line, i) =>
    i === index ? { ...line, quantity: line.quantity + Math.max(1, newLine.quantity) } : line,
  );
}

/** Setzt die Menge einer Zeile; Menge <= 0 entfernt die Zeile. */
export function setLineQuantity(
  lines: CartLine[],
  productSlug: string,
  variantId: string,
  quantity: number,
): CartLine[] {
  if (quantity <= 0) return removeLine(lines, productSlug, variantId);
  return lines.map((line) =>
    line.productSlug === productSlug && line.variantId === variantId
      ? { ...line, quantity: Math.floor(quantity) }
      : line,
  );
}

export function removeLine(lines: CartLine[], productSlug: string, variantId: string): CartLine[] {
  return lines.filter(
    (line) => !(line.productSlug === productSlug && line.variantId === variantId),
  );
}

/** Erzeugt eine Bestellnummer im Format HA-JJMMTT-XXXX. */
export function generateOrderNumber(date = new Date()): string {
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `HA-${year}${month}${day}-${random}`;
}
