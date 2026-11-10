import { describe, expect, it } from 'vitest';
import { getPaymentProvider, mockPaymentProvider } from '@/lib/commerce/payment';
import {
  centsToMollieValue,
  createMollieProvider,
  mapMollieStatus,
  MollieConfigError,
} from '@/lib/commerce/providers/mollie';

const KEY = 'test_abcdefghijklmnopqrstuvwxyz12';

type Call = { url: string; init?: RequestInit };

function fakeFetch(responses: Record<string, { status?: number; body: unknown }>) {
  const calls: Call[] = [];
  const impl = (async (url: string | URL, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    const key = `${init?.method ?? 'GET'} ${String(url)}`;
    const match = responses[key];
    if (!match) return new Response(JSON.stringify({ detail: 'not found' }), { status: 404 });
    return new Response(JSON.stringify(match.body), { status: match.status ?? 200 });
  }) as typeof fetch;
  return { impl, calls };
}

describe('Mollie-Hilfsfunktionen', () => {
  it('formatiert Cent-Beträge mit zwei Nachkommastellen', () => {
    expect(centsToMollieValue(3995)).toBe('39.95');
    expect(centsToMollieValue(500)).toBe('5.00');
    expect(centsToMollieValue(7)).toBe('0.07');
    expect(() => centsToMollieValue(0)).toThrow();
    expect(() => centsToMollieValue(12.5)).toThrow();
  });

  it('bildet Mollie-Status auf den Shop-Status ab', () => {
    expect(mapMollieStatus('paid')).toBe('succeeded');
    expect(mapMollieStatus('authorized')).toBe('succeeded');
    expect(mapMollieStatus('open')).toBe('requires_confirmation');
    expect(mapMollieStatus('pending')).toBe('requires_confirmation');
    expect(mapMollieStatus('canceled')).toBe('failed');
    expect(mapMollieStatus('expired')).toBe('failed');
    expect(mapMollieStatus('failed')).toBe('failed');
  });
});

describe('Mollie-Adapter', () => {
  it('lehnt ungültige Keys und URLs ab', () => {
    expect(() => createMollieProvider({ apiKey: '', siteUrl: 'https://shop.example' })).toThrow(MollieConfigError);
    expect(() => createMollieProvider({ apiKey: 'sk_live_123', siteUrl: 'https://shop.example' })).toThrow(MollieConfigError);
    expect(() => createMollieProvider({ apiKey: KEY, siteUrl: 'kein-url' })).toThrow(MollieConfigError);
  });

  it('erstellt eine Zahlung mit Betrag, Methode, Rücksprung, Webhook und Idempotenz', async () => {
    const { impl, calls } = fakeFetch({
      'POST https://api.mollie.com/v2/payments': {
        status: 201,
        body: { id: 'tr_WDqYK6vllg', status: 'open', amount: { currency: 'EUR', value: '44.90' }, _links: { checkout: { href: 'https://www.mollie.com/checkout/abc' } } },
      },
    });
    const provider = createMollieProvider({ apiKey: KEY, siteUrl: 'https://shop.example', fetchImpl: impl });
    const intent = await provider.createIntent({ amountCents: 4490, orderNumber: 'HA-2026-0001', email: 'a@b.de', methodId: 'paypal' });

    expect(intent).toEqual({
      id: 'tr_WDqYK6vllg',
      amountCents: 4490,
      currency: 'EUR',
      status: 'requires_confirmation',
      redirectUrl: 'https://www.mollie.com/checkout/abc',
    });
    const headers = calls[0]!.init!.headers as Record<string, string>;
    expect(headers.Authorization).toBe(`Bearer ${KEY}`);
    expect(headers['Idempotency-Key']).toBe('HA-2026-0001');
    const body = JSON.parse(String(calls[0]!.init!.body));
    expect(body.amount).toEqual({ currency: 'EUR', value: '44.90' });
    expect(body.method).toBe('paypal');
    expect(body.redirectUrl).toBe('https://shop.example/checkout/bestaetigung?order=HA-2026-0001');
    expect(body.webhookUrl).toBe('https://shop.example/api/payment/webhook');
    expect(body.metadata).toEqual({ orderNumber: 'HA-2026-0001' });
  });

  it('lässt Methode und Webhook weg, wo Mollie sie nicht nutzen kann', async () => {
    const { impl, calls } = fakeFetch({
      'POST https://api.mollie.com/v2/payments': { status: 201, body: { id: 'tr_abcd1234', status: 'open', amount: { currency: 'EUR', value: '9.95' } } },
    });
    const provider = createMollieProvider({ apiKey: KEY, siteUrl: 'http://localhost:3000', fetchImpl: impl });
    await provider.createIntent({ amountCents: 995, orderNumber: 'HA-1', email: 'a@b.de', methodId: 'rechnung' });
    const body = JSON.parse(String(calls[0]!.init!.body));
    expect(body.method).toBeUndefined();
    expect(body.webhookUrl).toBeUndefined();
  });

  it('meldet API-Fehler verständlich', async () => {
    const { impl } = fakeFetch({
      'POST https://api.mollie.com/v2/payments': { status: 422, body: { detail: 'The amount is lower than the minimum' } },
    });
    const provider = createMollieProvider({ apiKey: KEY, siteUrl: 'https://shop.example', fetchImpl: impl });
    await expect(
      provider.createIntent({ amountCents: 1, orderNumber: 'HA-2', email: 'a@b.de', methodId: 'paypal' }),
    ).rejects.toThrow(/HTTP 422: The amount is lower/);
  });

  it('prüft Webhooks per Gegenabruf und liefert den Status', async () => {
    const { impl } = fakeFetch({
      'GET https://api.mollie.com/v2/payments/tr_paid1234': { body: { id: 'tr_paid1234', status: 'paid', amount: { currency: 'EUR', value: '1.00' } } },
    });
    const provider = createMollieProvider({ apiKey: KEY, siteUrl: 'https://shop.example', fetchImpl: impl });
    expect(await provider.verifyWebhook('id=tr_paid1234', '')).toBe(true);
    expect(await provider.getStatus!('tr_paid1234')).toBe('succeeded');
    // Unbekannte Zahlung (404) und manipulierte IDs werden abgelehnt.
    expect(await provider.verifyWebhook('id=tr_fake9999', '')).toBe(false);
    expect(await provider.verifyWebhook('id=../../etc', '')).toBe(false);
    expect(await provider.verifyWebhook('', '')).toBe(false);
  });
});

describe('Provider-Auswahl', () => {
  it('nutzt ohne Konfiguration den Demo-Provider', () => {
    expect(getPaymentProvider({})).toBe(mockPaymentProvider);
  });

  it('liefert mit PAYMENT_PROVIDER=mollie den Mollie-Adapter', () => {
    const provider = getPaymentProvider({ PAYMENT_PROVIDER: 'mollie', PAYMENT_API_KEY: KEY, NEXT_PUBLIC_SITE_URL: 'https://shop.example' });
    expect(provider.id).toBe('mollie');
  });

  it('fällt bei Fehlkonfiguration NICHT still auf den Demo-Provider zurück', () => {
    expect(() => getPaymentProvider({ PAYMENT_PROVIDER: 'mollie' })).toThrow(MollieConfigError);
    expect(() => getPaymentProvider({ PAYMENT_PROVIDER: 'unbekannt' })).toThrow(/Unbekannter/);
  });
});
