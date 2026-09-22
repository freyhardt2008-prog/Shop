import type { ShippingMethod, ShippingMethodId } from '@/lib/types';

/**
 * Versandarten (Platzhalter-Konditionen).
 *
 * Die konkreten Preise und Laufzeiten werden später aus dem Vertrag mit dem
 * Versanddienstleister übernommen. Die Struktur ist bereits so angelegt,
 * dass ein Versandkosten-Service (z. B. Sendcloud, DHL API) sie befüllen kann.
 */
export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standardversand',
    description: 'Versand innerhalb Deutschlands, klimaneutraler Versand geplant.',
    priceCents: 495,
    deliveryDays: [2, 4],
  },
  {
    id: 'express',
    name: 'Expressversand',
    description: 'Zustellung am nächsten Werktag bei Bestellung bis 12:00 Uhr.',
    priceCents: 1290,
    deliveryDays: [1, 2],
  },
  {
    id: 'abholung',
    name: 'Abholung',
    description: 'Abholung nach Terminvereinbarung (sobald ein Standort verfügbar ist).',
    priceCents: 0,
    deliveryDays: [1, 2],
  },
];

/** Ab diesem Bestellwert ist der Standardversand versandkostenfrei. */
export const FREE_SHIPPING_THRESHOLD_CENTS = 4900;

export function getShippingMethod(id: ShippingMethodId): ShippingMethod {
  return shippingMethods.find((method) => method.id === id) ?? shippingMethods[0]!;
}

/** Versandkosten unter Berücksichtigung der Freigrenze. */
export function shippingCostCents(methodId: ShippingMethodId, subtotalCents: number): number {
  const method = getShippingMethod(methodId);
  if (method.id === 'standard' && subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) return 0;
  return method.priceCents;
}
