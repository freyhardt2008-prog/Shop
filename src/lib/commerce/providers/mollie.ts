import type { PaymentMethodId } from '@/lib/types';
import type { PaymentIntent, PaymentProvider } from '../payment';

/**
 * MOLLIE-ADAPTER
 * ---------------------------------------------------------------------------
 * Implementiert `PaymentProvider` gegen die öffentliche Mollie-REST-API (v2),
 * ganz ohne SDK. Aktivierung über Umgebungsvariablen:
 *
 *   PAYMENT_PROVIDER="mollie"
 *   PAYMENT_API_KEY="test_…"      # Test-Key aus dem Mollie-Dashboard
 *   NEXT_PUBLIC_SITE_URL="https://…" # für Rücksprung- und Webhook-URL
 *
 * Ablauf (Redirect-Flow):
 *   1. Checkout erzeugt eine Zahlung → Mollie liefert eine Checkout-URL.
 *   2. Kundin zahlt auf der Mollie-Seite und kehrt zu `redirectUrl` zurück.
 *   3. Mollie ruft `webhookUrl` mit `id=tr_…` auf. Mollie signiert Webhooks
 *      NICHT – die Echtheit wird geprüft, indem die Zahlung mit dem eigenen
 *      API-Key erneut abgerufen wird (so empfiehlt es Mollie).
 *
 * Es liegen keine Zugangsdaten im Repository.
 */

const MOLLIE_API = 'https://api.mollie.com/v2';

/** Zuordnung der Shop-Zahlarten zu Mollie-Methoden. `undefined` = Auswahl auf der Mollie-Seite. */
const METHOD_MAP: Record<PaymentMethodId, string | undefined> = {
  kreditkarte: 'creditcard',
  paypal: 'paypal',
  'apple-pay': 'applepay',
  vorkasse: 'banktransfer',
  // Sofort wurde von Mollie eingestellt; Kundin wählt auf der Mollie-Seite (z. B. Klarna, Überweisung).
  sofort: undefined,
  // Rechnungskauf läuft über Partner (z. B. Klarna/Billie) – Auswahl auf der Mollie-Seite.
  rechnung: undefined,
};

type MollieStatus = 'open' | 'pending' | 'authorized' | 'paid' | 'canceled' | 'expired' | 'failed';

interface MolliePayment {
  id: string;
  status: MollieStatus;
  amount: { currency: string; value: string };
  metadata?: { orderNumber?: string } | null;
  _links?: { checkout?: { href: string } };
}

export interface MollieOptions {
  apiKey: string;
  siteUrl: string;
  /** Austauschbar für Tests. */
  fetchImpl?: typeof fetch;
}

export class MollieConfigError extends Error {}

/** 1234 → "12.34" (Mollie erwartet einen String mit genau zwei Nachkommastellen). */
export function centsToMollieValue(cents: number): string {
  if (!Number.isInteger(cents) || cents <= 0) throw new Error(`Ungültiger Betrag: ${cents}`);
  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, '0')}`;
}

export function mapMollieStatus(status: MollieStatus): PaymentIntent['status'] {
  if (status === 'paid' || status === 'authorized') return 'succeeded';
  if (status === 'failed' || status === 'canceled' || status === 'expired') return 'failed';
  return 'requires_confirmation';
}

/** Mollie kann nur öffentlich erreichbare HTTPS-Adressen als Webhook aufrufen. */
function isPublicHttps(url: URL): boolean {
  return url.protocol === 'https:' && !['localhost', '127.0.0.1', '::1'].includes(url.hostname);
}

const PAYMENT_ID = /^tr_[A-Za-z0-9]{4,}$/;

export function createMollieProvider({ apiKey, siteUrl, fetchImpl = fetch }: MollieOptions): PaymentProvider {
  if (!/^(test|live)_[A-Za-z0-9]{20,}$/.test(apiKey)) {
    throw new MollieConfigError('PAYMENT_API_KEY ist kein gültiger Mollie-Key (erwartet test_… oder live_…).');
  }
  let base: URL;
  try {
    base = new URL(siteUrl);
  } catch {
    throw new MollieConfigError('NEXT_PUBLIC_SITE_URL ist keine gültige URL.');
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  async function fetchPayment(paymentId: string): Promise<MolliePayment | null> {
    const res = await fetchImpl(`${MOLLIE_API}/payments/${encodeURIComponent(paymentId)}`, { headers });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Mollie antwortete mit HTTP ${res.status}.`);
    return (await res.json()) as MolliePayment;
  }

  return {
    id: 'mollie',

    async createIntent({ amountCents, orderNumber, methodId }) {
      const redirectUrl = new URL('/checkout/bestaetigung', base);
      redirectUrl.searchParams.set('order', orderNumber);
      const webhookUrl = new URL('/api/payment/webhook', base);

      const body = {
        amount: { currency: 'EUR', value: centsToMollieValue(amountCents) },
        description: `HEAL ACTIVE Bestellung ${orderNumber}`,
        redirectUrl: redirectUrl.toString(),
        ...(isPublicHttps(webhookUrl) ? { webhookUrl: webhookUrl.toString() } : {}),
        ...(METHOD_MAP[methodId] ? { method: METHOD_MAP[methodId] } : {}),
        locale: 'de_DE',
        metadata: { orderNumber },
      };

      const res = await fetchImpl(`${MOLLIE_API}/payments`, {
        method: 'POST',
        // Schutz vor Doppelbuchungen bei Wiederholungen derselben Bestellung.
        headers: { ...headers, 'Idempotency-Key': orderNumber },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}) as { detail?: string });
        throw new Error(`Mollie-Zahlung konnte nicht erstellt werden (HTTP ${res.status}${detail.detail ? `: ${detail.detail}` : ''}).`);
      }
      const payment = (await res.json()) as MolliePayment;
      return {
        id: payment.id,
        amountCents,
        currency: 'EUR',
        status: mapMollieStatus(payment.status),
        redirectUrl: payment._links?.checkout?.href,
      };
    },

    /**
     * Mollie sendet `id=tr_…` als Formulardaten und keine Signatur.
     * Echt ist der Webhook genau dann, wenn die Zahlung mit unserem Key abrufbar ist.
     */
    async verifyWebhook(rawBody: string) {
      const id = new URLSearchParams(rawBody).get('id') ?? '';
      if (!PAYMENT_ID.test(id)) return false;
      const payment = await fetchPayment(id);
      return payment?.id === id;
    },

    async getStatus(paymentId: string) {
      if (!PAYMENT_ID.test(paymentId)) return null;
      const payment = await fetchPayment(paymentId);
      return payment ? mapMollieStatus(payment.status) : null;
    },
  };
}
