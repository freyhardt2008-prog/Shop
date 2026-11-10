import { NextResponse } from 'next/server';
import { getPaymentProvider } from '@/lib/commerce/payment';

/**
 * WEBHOOK DES ZAHLUNGSANBIETERS
 * ---------------------------------------------------------------------------
 * Mollie ruft diese Route bei jeder Statusänderung mit `id=tr_…` auf.
 * Die Echtheit wird über `verifyWebhook` geprüft (erneuter Abruf der Zahlung
 * mit dem eigenen API-Key).
 *
 * Offen bis zur Datenbank-Anbindung: Bestellstatus persistieren, Bestand
 * buchen und die Bestellbestätigung per E-Mail versenden.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  let provider;
  try {
    provider = getPaymentProvider();
  } catch (error) {
    console.error('Webhook: Zahlungsanbieter falsch konfiguriert:', error);
    return new NextResponse(null, { status: 500 });
  }

  const signature = request.headers.get('x-signature') ?? '';
  let valid = false;
  try {
    valid = await provider.verifyWebhook(rawBody, signature);
  } catch (error) {
    // Netzwerkfehler o. Ä.: 500 sorgt dafür, dass Mollie den Aufruf später wiederholt.
    console.error('Webhook konnte nicht geprüft werden:', error);
    return new NextResponse(null, { status: 500 });
  }
  if (!valid) return new NextResponse(null, { status: 400 });

  const paymentId = new URLSearchParams(rawBody).get('id');
  const status = paymentId && provider.getStatus ? await provider.getStatus(paymentId) : null;

  // TODO (Datenbank): Bestellung anhand der Zahlung suchen und Status speichern.
  console.info(`Zahlung ${paymentId}: Status ${status ?? 'unbekannt'}`);
  return new NextResponse(null, { status: 200 });
}
