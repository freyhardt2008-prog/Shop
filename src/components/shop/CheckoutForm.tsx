'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { calculateTotals, resolveCartLines } from '@/lib/commerce/cart';
import { paymentMethods } from '@/lib/commerce/payment';
import { shippingMethods } from '@/lib/commerce/shipping';
import { formatDeliveryDays, formatPrice } from '@/lib/format';
import { variantLabel } from '@/lib/catalog';
import type { Address, OrderConfirmation, PaymentMethodId, ShippingMethodId } from '@/lib/types';

/**
 * CHECKOUT (DEMO)
 * ---------------------------------------------------------------------------
 * Vollständiger Bestellablauf: Kontakt → Lieferadresse → Rechnungsadresse →
 * Versandart → Zahlungsart → Übersicht → Bestellbestätigung.
 *
 * Die Bestellung geht an `/api/checkout`, wo die Summen serverseitig neu
 * berechnet werden. Es wird KEINE echte Zahlung ausgelöst.
 */

const emptyAddress: Address = {
  firstName: '',
  lastName: '',
  company: '',
  street: '',
  houseNumber: '',
  addition: '',
  zip: '',
  city: '',
  country: 'Deutschland',
};

const CONFIRMATION_KEY = 'heal-active:last-order:v1';

export function CheckoutForm() {
  const router = useRouter();
  const { lines, clear, ready } = useCart();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState<Address>(emptyAddress);
  const [billingSame, setBillingSame] = useState(true);
  const [billingAddress, setBillingAddress] = useState<Address>(emptyAddress);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('rechnung');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedWithdrawal, setAcceptedWithdrawal] = useState(false);
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const resolved = resolveCartLines(lines);
  const totals = calculateTotals(resolved, shippingMethod);

  if (!ready) {
    return <p className="ha-card p-8 text-center text-sm text-slate-soft">Warenkorb wird geladen …</p>;
  }

  if (resolved.length === 0) {
    return (
      <div className="ha-card p-8 text-center">
        <p className="font-display text-xl font-extrabold text-ink">Dein Warenkorb ist leer.</p>
        <Link href="/shop" className="ha-btn ha-btn-primary mt-5">
          Zum Shop
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrors([]);
    setSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lines,
          email,
          shippingMethod,
          paymentMethod,
          acceptedTerms,
          acceptedWithdrawal,
        }),
      });

      const data: { confirmation?: OrderConfirmation; errors?: string[]; error?: string } =
        await response.json();

      if (!response.ok || !data.confirmation) {
        setErrors(data.errors ?? [data.error ?? 'Die Bestellung konnte nicht abgeschlossen werden.']);
        setSubmitting(false);
        return;
      }

      // Bestätigung für die Folgeseite zwischenspeichern (kein Backend vorhanden).
      try {
        window.sessionStorage.setItem(CONFIRMATION_KEY, JSON.stringify(data.confirmation));
      } catch {
        // Ohne Storage zeigt die Bestätigungsseite einen Hinweis an.
      }

      clear();
      router.push('/checkout/bestaetigung');
    } catch {
      setErrors(['Es gab ein Verbindungsproblem. Bitte versuche es erneut.']);
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
      <div className="space-y-8">
        {errors.length > 0 && (
          <div role="alert" className="rounded-2xl border border-signal/30 bg-signal-soft p-4">
            <p className="font-bold text-signal-dark">Bitte prüfe noch folgende Punkte:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-graphite">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 1. Kontakt */}
        <Step number={1} title="Kontakt">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="E-Mail-Adresse" required>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="ha-input"
                autoComplete="email"
              />
            </Field>
            <Field label="Telefon (optional)">
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="ha-input"
                autoComplete="tel"
              />
            </Field>
          </div>
        </Step>

        {/* 2. Lieferadresse */}
        <Step number={2} title="Lieferadresse">
          <AddressFields address={shippingAddress} onChange={setShippingAddress} prefix="shipping" />
        </Step>

        {/* 3. Rechnungsadresse */}
        <Step number={3} title="Rechnungsadresse">
          <label className="flex items-center gap-2.5 text-sm text-graphite">
            <input
              type="checkbox"
              checked={billingSame}
              onChange={(event) => setBillingSame(event.target.checked)}
            />
            Rechnungsadresse entspricht der Lieferadresse
          </label>
          {!billingSame && (
            <div className="mt-4">
              <AddressFields address={billingAddress} onChange={setBillingAddress} prefix="billing" />
            </div>
          )}
        </Step>

        {/* 4. Versandart */}
        <Step number={4} title="Versandart">
          <div className="space-y-2">
            {shippingMethods.map((method) => {
              const cost =
                method.id === 'standard' && totals.subtotalCents >= totals.freeShippingThresholdCents
                  ? 0
                  : method.priceCents;
              return (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                    shippingMethod === method.id ? 'border-ink bg-white' : 'border-chalk'
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={method.id}
                    checked={shippingMethod === method.id}
                    onChange={() => setShippingMethod(method.id)}
                    className="mt-1"
                  />
                  <span className="flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-bold text-ink">{method.name}</span>
                      <span className="font-display font-extrabold text-ink">
                        {cost === 0 ? 'kostenfrei' : formatPrice(cost)}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-sm text-graphite">{method.description}</span>
                    <span className="mt-0.5 block text-xs text-slate-soft">
                      Voraussichtlich {formatDeliveryDays(method.deliveryDays)}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </Step>

        {/* 5. Zahlungsart */}
        <Step number={5} title="Zahlungsart">
          <p className="mb-3 rounded-xl border border-dashed border-chalk bg-beam-soft/60 px-3 py-2 text-xs leading-relaxed text-graphite">
            <strong className="text-ink">Hinweis:</strong> Es ist noch kein Zahlungsanbieter
            angebunden. Die Auswahl zeigt den vorgesehenen Ablauf, es wird keine Zahlung ausgelöst.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                  paymentMethod === method.id ? 'border-ink bg-white' : 'border-chalk'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                  className="mt-1"
                />
                <span>
                  <span className="block font-bold text-ink">{method.name}</span>
                  <span className="mt-0.5 block text-sm text-graphite">{method.description}</span>
                </span>
              </label>
            ))}
          </div>
        </Step>

        {/* 6. Bestellhinweis */}
        <Step number={6} title="Anmerkung (optional)">
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            className="ha-input"
            placeholder="Hinweise zur Lieferung"
          />
        </Step>
      </div>

      {/* Übersicht */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="ha-card p-5 md:p-6">
          <h2 className="font-display text-lg font-extrabold text-ink">Bestellübersicht</h2>

          <ul className="mt-4 space-y-3 border-b border-chalk pb-4">
            {resolved.map((line) => (
              <li key={`${line.productSlug}-${line.variantId}`} className="flex gap-3 text-sm">
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-sand text-xs font-bold text-graphite">
                  {line.quantity}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink">{line.product.name}</span>
                  <span className="block truncate text-xs text-slate-soft">
                    {variantLabel(line.variant)}
                  </span>
                </span>
                <span className="font-semibold text-ink">{formatPrice(line.lineTotalCents)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-graphite">Zwischensumme</dt>
              <dd className="font-semibold text-ink">{formatPrice(totals.subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-graphite">Versand</dt>
              <dd className="font-semibold text-ink">
                {totals.shippingCents === 0 ? 'kostenfrei' : formatPrice(totals.shippingCents)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-chalk pt-3 text-base">
              <dt className="font-display font-extrabold text-ink">Gesamt</dt>
              <dd className="font-display font-extrabold text-ink">
                {formatPrice(totals.totalCents)}
              </dd>
            </div>
            {totals.vatBreakdown.map((entry) => (
              <div key={entry.rate} className="flex justify-between text-xs text-slate-soft">
                <dt>enthaltene MwSt. ({entry.rate} %)</dt>
                <dd>{formatPrice(entry.amountCents)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 space-y-3 border-t border-chalk pt-4 text-sm">
            <label className="flex items-start gap-2.5 text-graphite">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-1"
                required
              />
              <span>
                Ich akzeptiere die{' '}
                <Link href="/rechtliches/agb" className="underline hover:text-ink">
                  AGB
                </Link>
                .
              </span>
            </label>
            <label className="flex items-start gap-2.5 text-graphite">
              <input
                type="checkbox"
                checked={acceptedWithdrawal}
                onChange={(event) => setAcceptedWithdrawal(event.target.checked)}
                className="mt-1"
                required
              />
              <span>
                Ich habe die{' '}
                <Link href="/rechtliches/widerruf" className="underline hover:text-ink">
                  Widerrufsbelehrung
                </Link>{' '}
                und die{' '}
                <Link href="/rechtliches/datenschutz" className="underline hover:text-ink">
                  Datenschutzerklärung
                </Link>{' '}
                zur Kenntnis genommen.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="ha-btn ha-btn-primary mt-5 w-full disabled:opacity-60"
          >
            {submitting ? 'Wird geprüft …' : 'Zahlungspflichtig bestellen'}
          </button>

          <p className="mt-3 text-xs leading-relaxed text-slate-soft">
            Demo-Bestellung: Es wird keine Zahlung ausgelöst, keine Ware versendet und keine
            Bestellung gespeichert.
          </p>
        </div>
      </aside>
    </form>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="ha-card p-5 md:p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-sm font-extrabold text-white">
          {number}
        </span>
        <h2 className="font-display text-lg font-extrabold text-ink">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
  className = '',
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="ha-label">
        {label}
        {required && <span className="text-signal"> *</span>}
      </span>
      {children}
    </label>
  );
}

function AddressFields({
  address,
  onChange,
  prefix,
}: {
  address: Address;
  onChange: (address: Address) => void;
  prefix: string;
}) {
  function update(key: keyof Address, value: string) {
    onChange({ ...address, [key]: value });
  }

  return (
    <div className="grid gap-4 sm:grid-cols-6">
      <Field label="Vorname" required className="sm:col-span-3">
        <input
          type="text"
          required
          value={address.firstName}
          onChange={(event) => update('firstName', event.target.value)}
          className="ha-input"
          autoComplete={`${prefix} given-name`}
        />
      </Field>
      <Field label="Nachname" required className="sm:col-span-3">
        <input
          type="text"
          required
          value={address.lastName}
          onChange={(event) => update('lastName', event.target.value)}
          className="ha-input"
          autoComplete={`${prefix} family-name`}
        />
      </Field>
      <Field label="Firma (optional)" className="sm:col-span-6">
        <input
          type="text"
          value={address.company ?? ''}
          onChange={(event) => update('company', event.target.value)}
          className="ha-input"
          autoComplete="organization"
        />
      </Field>
      <Field label="Straße" required className="sm:col-span-4">
        <input
          type="text"
          required
          value={address.street}
          onChange={(event) => update('street', event.target.value)}
          className="ha-input"
          autoComplete={`${prefix} address-line1`}
        />
      </Field>
      <Field label="Nr." required className="sm:col-span-2">
        <input
          type="text"
          required
          value={address.houseNumber}
          onChange={(event) => update('houseNumber', event.target.value)}
          className="ha-input"
        />
      </Field>
      <Field label="Adresszusatz (optional)" className="sm:col-span-6">
        <input
          type="text"
          value={address.addition ?? ''}
          onChange={(event) => update('addition', event.target.value)}
          className="ha-input"
          autoComplete={`${prefix} address-line2`}
        />
      </Field>
      <Field label="PLZ" required className="sm:col-span-2">
        <input
          type="text"
          required
          inputMode="numeric"
          value={address.zip}
          onChange={(event) => update('zip', event.target.value)}
          className="ha-input"
          autoComplete={`${prefix} postal-code`}
        />
      </Field>
      <Field label="Ort" required className="sm:col-span-4">
        <input
          type="text"
          required
          value={address.city}
          onChange={(event) => update('city', event.target.value)}
          className="ha-input"
          autoComplete={`${prefix} address-level2`}
        />
      </Field>
      <Field label="Land" required className="sm:col-span-6">
        <select
          required
          value={address.country}
          onChange={(event) => update('country', event.target.value)}
          className="ha-input"
          autoComplete={`${prefix} country-name`}
        >
          <option>Deutschland</option>
          <option>Österreich</option>
          <option>Schweiz</option>
        </select>
      </Field>
    </div>
  );
}
