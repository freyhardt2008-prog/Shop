'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { formatDate, formatDeliveryDays, formatPrice } from '@/lib/format';
import type { OrderConfirmation } from '@/lib/types';

const CONFIRMATION_KEY = 'heal-active:last-order:v1';

/**
 * Bestellbestätigung.
 * Liest die Demo-Bestellung aus dem `sessionStorage`, weil kein Backend
 * existiert. Mit echter Persistenz wird hier stattdessen die Bestellung
 * serverseitig anhand der Bestellnummer geladen.
 */
export function OrderConfirmationView() {
  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(CONFIRMATION_KEY);
      if (raw) setOrder(JSON.parse(raw) as OrderConfirmation);
    } catch {
      setOrder(null);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <p className="ha-card p-8 text-center text-sm text-slate-soft">Wird geladen …</p>;
  }

  if (!order) {
    return (
      <div className="ha-card p-8 text-center md:p-12">
        <p className="font-display text-xl font-extrabold text-ink">
          Keine Bestellung gefunden.
        </p>
        <p className="ha-prose mx-auto mt-2 max-w-md text-sm">
          Diese Seite zeigt die Bestätigung der zuletzt abgeschickten Demo-Bestellung. Sie ist nur
          direkt nach dem Abschluss verfügbar.
        </p>
        <Link href="/shop" className="ha-btn ha-btn-primary mt-6">
          Zum Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
      <div>
        <div className="ha-card p-6 md:p-8">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pulse-soft text-pulse-dark">
            <Icon name="check" size={28} />
          </span>
          <h1 className="mt-5 text-display-md">Danke für deine Bestellung!</h1>
          <p className="ha-prose mt-3">
            Deine Bestellnummer lautet{' '}
            <strong className="font-display text-ink">{order.orderNumber}</strong>. Eine
            Bestätigung würde im Live-Betrieb an {order.email} gehen.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-chalk bg-beam-soft/60 p-4 text-sm leading-relaxed text-graphite">
            <strong className="text-ink">Demo-Bestellung:</strong> Es wurde keine Zahlung
            ausgelöst, keine Ware reserviert und keine Bestellung gespeichert. Der Ablauf zeigt,
            wie der Checkout im Live-Betrieb funktionieren wird.
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-chalk pt-5 text-sm">
            <div>
              <dt className="ha-eyebrow">Bestelldatum</dt>
              <dd className="mt-0.5 text-graphite">{formatDate(order.createdAt)}</dd>
            </div>
            <div>
              <dt className="ha-eyebrow">Versandart</dt>
              <dd className="mt-0.5 text-graphite">
                {order.shippingMethod.name} ({formatDeliveryDays(order.shippingMethod.deliveryDays)})
              </dd>
            </div>
            <div>
              <dt className="ha-eyebrow">Zahlungsart</dt>
              <dd className="mt-0.5 text-graphite">{order.paymentMethod.name}</dd>
            </div>
            <div>
              <dt className="ha-eyebrow">E-Mail</dt>
              <dd className="mt-0.5 break-all text-graphite">{order.email}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/shop" className="ha-btn ha-btn-primary">
            Weiter einkaufen
          </Link>
          <Link href="/back-to-sport" className="ha-btn ha-btn-ghost">
            Back to Sport entdecken
          </Link>
        </div>
      </div>

      <aside>
        <div className="ha-card p-5 md:p-6">
          <h2 className="font-display text-lg font-extrabold text-ink">Deine Artikel</h2>
          <ul className="mt-4 space-y-3 border-b border-chalk pb-4">
            {order.lines.map((line) => (
              <li key={`${line.name}-${line.variantLabel}`} className="flex gap-3 text-sm">
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-sand text-xs font-bold text-graphite">
                  {line.quantity}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{line.name}</span>
                  <span className="block text-xs text-slate-soft">{line.variantLabel}</span>
                </span>
                <span className="font-semibold text-ink">{formatPrice(line.lineTotalCents)}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-graphite">Zwischensumme</dt>
              <dd className="font-semibold text-ink">{formatPrice(order.totals.subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-graphite">Versand</dt>
              <dd className="font-semibold text-ink">
                {order.totals.shippingCents === 0
                  ? 'kostenfrei'
                  : formatPrice(order.totals.shippingCents)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-chalk pt-3 text-base">
              <dt className="font-display font-extrabold text-ink">Gesamt</dt>
              <dd className="font-display font-extrabold text-ink">
                {formatPrice(order.totals.totalCents)}
              </dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}
