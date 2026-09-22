import { NextResponse } from 'next/server';
import { calculateTotals, generateOrderNumber, resolveCartLines } from '@/lib/commerce/cart';
import { getPaymentMethod, getPaymentProvider } from '@/lib/commerce/payment';
import { getShippingMethod } from '@/lib/commerce/shipping';
import { variantLabel } from '@/lib/catalog';
import type {
  CartLine,
  OrderConfirmation,
  PaymentMethodId,
  ShippingMethodId,
} from '@/lib/types';

/**
 * CHECKOUT-ENDPUNKT (DEMO)
 * ---------------------------------------------------------------------------
 * Diese Route validiert die Bestelldaten serverseitig und berechnet die Summen
 * NEU aus dem Katalog – Preise aus dem Client werden bewusst ignoriert.
 *
 * Es wird KEINE echte Bestellung ausgelöst und KEINE Zahlung angestoßen:
 * `getPaymentProvider()` liefert aktuell den Demo-Provider. Sobald ein echter
 * Anbieter konfiguriert ist, entsteht hier ein Payment-Intent und die Antwort
 * enthält die Redirect-URL.
 *
 * Vor dem Livegang zusätzlich nötig:
 * - Persistenz der Bestellung (Datenbank / ERP)
 * - Bestandsprüfung und -reservierung
 * - Rate Limiting und Bot-Schutz
 * - Double-Opt-in / Bestellbestätigung per E-Mail
 * - Protokollierung der Einwilligungen (AGB, Widerruf)
 */

interface CheckoutRequestBody {
  lines?: CartLine[];
  email?: string;
  shippingMethod?: ShippingMethodId;
  paymentMethod?: PaymentMethodId;
  acceptedTerms?: boolean;
  acceptedWithdrawal?: boolean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: CheckoutRequestBody;
  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const errors: string[] = [];

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    errors.push('Der Warenkorb ist leer.');
  }
  if (!body.email || !EMAIL_PATTERN.test(body.email)) {
    errors.push('Bitte gib eine gültige E-Mail-Adresse an.');
  }
  if (!body.acceptedTerms) {
    errors.push('Bitte bestätige die AGB.');
  }
  if (!body.acceptedWithdrawal) {
    errors.push('Bitte bestätige die Kenntnisnahme der Widerrufsbelehrung.');
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  // Preise werden serverseitig aus dem Katalog neu berechnet.
  const resolved = resolveCartLines(body.lines ?? []);
  if (resolved.length === 0) {
    return NextResponse.json(
      { errors: ['Die Artikel im Warenkorb konnten nicht aufgelöst werden.'] },
      { status: 400 },
    );
  }

  const shippingMethod = getShippingMethod(body.shippingMethod ?? 'standard');
  const paymentMethod = getPaymentMethod(body.paymentMethod ?? 'rechnung');
  const totals = calculateTotals(resolved, shippingMethod.id);
  const orderNumber = generateOrderNumber();

  // Zahlungsanbieter: aktuell der Demo-Provider (löst keine Zahlung aus).
  const provider = getPaymentProvider();
  const intent = await provider.createIntent({
    amountCents: totals.totalCents,
    orderNumber,
    email: body.email!,
    methodId: paymentMethod.id,
  });

  const confirmation: OrderConfirmation = {
    orderNumber,
    createdAt: new Date().toISOString(),
    email: body.email!,
    totals,
    lines: resolved.map((line) => ({
      name: line.product.name,
      variantLabel: variantLabel(line.variant),
      quantity: line.quantity,
      lineTotalCents: line.lineTotalCents,
    })),
    shippingMethod,
    paymentMethod,
    isDemoOrder: true,
  };

  return NextResponse.json({
    confirmation,
    payment: { provider: provider.id, intentId: intent.id, status: intent.status },
    notice:
      'Demo-Bestellung: Es wurde keine Zahlung ausgelöst und keine Ware reserviert. Der Zahlungsanbieter ist noch nicht angebunden.',
  });
}
