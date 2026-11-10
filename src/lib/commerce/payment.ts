import type { PaymentMethod, PaymentMethodId } from '@/lib/types';
import { createMollieProvider } from './providers/mollie';

/**
 * ZAHLUNGSARTEN
 * ---------------------------------------------------------------------------
 * Standardmäßig ist der Demo-Provider aktiv: Der Checkout erzeugt eine
 * Demo-Bestellung, es wird keine Zahlung ausgelöst. Es liegen keinerlei
 * Zugangsdaten im Repository.
 *
 * Adapter implementieren das Interface `PaymentProvider` und werden über
 * `PAYMENT_PROVIDER` gewählt. Vorhanden: `mollie` (providers/mollie.ts).
 * Weitere (Stripe, PayPal, Adyen) folgen demselben Muster.
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
  /** Verifiziert eingehende Webhooks (Signaturprüfung bzw. Gegenabruf beim Anbieter). */
  verifyWebhook(rawBody: string, signature: string): Promise<boolean>;
  /** Optional: aktuellen Zahlungsstatus beim Anbieter abfragen. */
  getStatus?(intentId: string): Promise<PaymentIntent['status'] | null>;
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
 *
 * - `mock` (Standard): Demo-Provider, löst keine Zahlung aus.
 * - `mollie`: echter Adapter, braucht `PAYMENT_API_KEY` und `NEXT_PUBLIC_SITE_URL`.
 *
 * Fail-closed: Ist ein echter Provider gewählt, aber falsch konfiguriert, wird
 * ein Fehler geworfen statt stillschweigend auf den Demo-Provider zu fallen.
 */
export function getPaymentProvider(env: Record<string, string | undefined> = process.env): PaymentProvider {
  const configured = env.PAYMENT_PROVIDER ?? 'mock';
  switch (configured) {
    case 'mollie':
      return createMollieProvider({
        apiKey: env.PAYMENT_API_KEY ?? '',
        siteUrl: env.NEXT_PUBLIC_SITE_URL ?? '',
      });
    case 'mock':
      return mockPaymentProvider;
    default:
      throw new Error(`Unbekannter PAYMENT_PROVIDER: ${configured}`);
  }
}
