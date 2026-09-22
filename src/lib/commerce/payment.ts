import type { PaymentMethod, PaymentMethodId } from '@/lib/types';

/**
 * ZAHLUNGSARTEN – VORBEREITET, NOCH NICHT AKTIV
 * ---------------------------------------------------------------------------
 * Es ist bewusst KEIN Zahlungsanbieter angebunden und es liegen keinerlei
 * Zugangsdaten im Repository. Der Checkout erzeugt eine Demo-Bestellung.
 *
 * Für die spätere Anbindung existiert unten das Interface `PaymentProvider`.
 * Ein echter Adapter (Stripe, Mollie, PayPal, Adyen) implementiert es und wird
 * über die Umgebungsvariable `PAYMENT_PROVIDER` ausgewählt.
 */
export const paymentMethods: PaymentMethod[] = [
  {
    id: 'rechnung',
    name: 'Kauf auf Rechnung',
    description: 'Zahlung innerhalb von 14 Tagen nach Erhalt der Ware.',
    status: 'vorbereitet',
  },
  {
    id: 'kreditkarte',
    name: 'Kreditkarte',
    description: 'Visa, Mastercard, American Express.',
    status: 'vorbereitet',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Bezahlen mit deinem PayPal-Konto.',
    status: 'vorbereitet',
  },
  {
    id: 'sofort',
    name: 'Sofortüberweisung',
    description: 'Direkte Überweisung über dein Online-Banking.',
    status: 'vorbereitet',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    description: 'Schnelle Zahlung auf unterstützten Geräten.',
    status: 'vorbereitet',
  },
  {
    id: 'vorkasse',
    name: 'Vorkasse',
    description: 'Überweisung vor dem Versand.',
    status: 'vorbereitet',
  },
];

export function getPaymentMethod(id: PaymentMethodId): PaymentMethod {
  return paymentMethods.find((method) => method.id === id) ?? paymentMethods[0]!;
}

/* ========================================================================== */

export interface PaymentIntent {
  id: string;
  amountCents: number;
  currency: 'EUR';
  status: 'requires_confirmation' | 'succeeded' | 'failed';
  /** Bei echten Providern die URL zur Weiterleitung (Redirect-Flow). */
  redirectUrl?: string;
}

/**
 * Schnittstelle für Zahlungsanbieter.
 * Ein echter Adapter implementiert diese Methoden gegen die Provider-API.
 */
export interface PaymentProvider {
  readonly id: string;
  createIntent(input: {
    amountCents: number;
    orderNumber: string;
    email: string;
    methodId: PaymentMethodId;
  }): Promise<PaymentIntent>;
  /** Verifiziert eingehende Webhooks (Signaturprüfung). */
  verifyWebhook(rawBody: string, signature: string): Promise<boolean>;
}

/**
 * Demo-Provider: löst KEINE Zahlung aus.
 * Er existiert nur, damit der Checkout-Flow vollständig durchlaufen werden
 * kann, solange kein echter Anbieter angebunden ist.
 */
export const mockPaymentProvider: PaymentProvider = {
  id: 'mock',
  async createIntent({ amountCents, orderNumber }) {
    return {
      id: `demo_${orderNumber}`,
      amountCents,
      currency: 'EUR',
      status: 'requires_confirmation',
    };
  },
  async verifyWebhook() {
    return false;
  },
};

/**
 * Wählt den Provider anhand von `PAYMENT_PROVIDER`.
 * Solange keine echten Adapter registriert sind, greift immer der Demo-Provider.
 */
export function getPaymentProvider(): PaymentProvider {
  const configured = process.env.PAYMENT_PROVIDER ?? 'mock';
  switch (configured) {
    // case 'stripe': return stripeProvider;
    // case 'mollie': return mollieProvider;
    default:
      return mockPaymentProvider;
  }
}
