'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';
import { FavoriteButton } from '@/components/shop/FavoriteButton';
import { Icon } from '@/components/ui/Icon';
import { formatDeliveryDays, formatPrice } from '@/lib/format';
import { resistanceLabels, sideLabels } from '@/lib/labels';
import type { Product, ProductVariant } from '@/lib/types';

/**
 * Kaufbereich der Produktseite: Variantenwahl, Menge, Warenkorb.
 *
 * Die Varianten kommen fertig serialisiert aus der Server Component – der
 * Client kennt nur das eine Produkt, nicht den gesamten Katalog.
 */

/**
 * Beschriftet eine Variante – und zwar nur mit den Merkmalen, die sich
 * innerhalb des Produkts tatsächlich unterscheiden. Sonst stünde an jeder
 * Kniebandage "Beidseitig", was keine Information trägt.
 */
function labelFor(variant: ProductVariant, varying: Set<keyof ProductVariant>): string {
  const parts: string[] = [];
  if (variant.size && varying.has('size')) parts.push(variant.size);
  if (variant.color && varying.has('color')) parts.push(variant.color);
  if (variant.side && varying.has('side')) parts.push(sideLabels[variant.side]);
  if (variant.resistance && varying.has('resistance')) {
    parts.push(resistanceLabels[variant.resistance]);
  }
  if (variant.lengthCm && varying.has('lengthCm')) parts.push(`${variant.lengthCm} cm`);
  return parts.join(' · ') || 'Standardausführung';
}

/** Ermittelt, welche Variantenmerkmale innerhalb des Produkts variieren. */
function varyingKeys(variants: ProductVariant[]): Set<keyof ProductVariant> {
  const keys: (keyof ProductVariant)[] = ['size', 'color', 'side', 'resistance', 'lengthCm'];
  const varying = new Set<keyof ProductVariant>();
  for (const key of keys) {
    const distinct = new Set(variants.map((variant) => variant[key]).filter(Boolean));
    if (distinct.size > 1) varying.add(key);
  }
  return varying;
}

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();

  // Erste lieferbare Variante vorauswählen.
  const initial = useMemo(
    () => product.variants.find((variant) => variant.stock > 0) ?? product.variants[0]!,
    [product.variants],
  );

  const varying = useMemo(() => varyingKeys(product.variants), [product.variants]);
  const [variantId, setVariantId] = useState(initial.id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((entry) => entry.id === variantId) ?? initial;
  const price = variant.priceCents ?? product.priceCents;
  const available = variant.stock > 0;
  const maxQuantity = Math.max(1, Math.min(variant.stock, 10));

  function handleAdd() {
    if (!available) return;
    add({ productSlug: product.slug, variantId: variant.id, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  }

  const hasChoice = product.variants.length > 1;

  return (
    <>
      <div className="space-y-5">
        {/* Preis */}
        <div>
          <p className="font-display text-3xl font-extrabold text-ink md:text-4xl">
            {formatPrice(price)}
          </p>
          <p className="mt-1 text-xs text-slate-soft">
            inkl. {product.vatRate} % MwSt. zzgl.{' '}
            <Link href="/rechtliches/versand" className="underline hover:text-ink">
              Versandkosten
            </Link>
            {product.rrpCents && product.rrpCents > price && (
              <>
                {' '}
                · UVP <span className="line-through">{formatPrice(product.rrpCents)}</span>
              </>
            )}
          </p>
        </div>

        {/* Varianten */}
        {hasChoice && (
          <fieldset>
            <legend className="ha-label">Ausführung wählen</legend>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((entry) => {
                const selected = entry.id === variantId;
                const soldOut = entry.stock === 0;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => {
                      setVariantId(entry.id);
                      setQuantity(1);
                    }}
                    aria-pressed={selected}
                    className={`ha-chip ${selected ? 'ha-chip-active' : ''} ${
                      soldOut ? 'opacity-45' : ''
                    }`}
                  >
                    {labelFor(entry, varying)}
                    {soldOut && <span className="text-[0.625rem] uppercase">ausverkauft</span>}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* Verfügbarkeit */}
        <p
          className={`flex items-center gap-2 text-sm font-semibold ${
            available ? 'text-pulse-dark' : 'text-signal-dark'
          }`}
        >
          <Icon name="check" size={16} />
          {available
            ? `Auf Lager · Lieferzeit ${formatDeliveryDays(product.deliveryDays)}`
            : 'Aktuell nicht verfügbar'}
        </p>

        {/* Menge + Warenkorb */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-chalk bg-white">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              disabled={quantity <= 1}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-ink disabled:opacity-35"
              aria-label="Menge verringern"
            >
              −
            </button>
            <span className="w-9 text-center font-display text-base font-extrabold" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
              disabled={quantity >= maxQuantity}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-ink disabled:opacity-35"
              aria-label="Menge erhöhen"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!available}
            className="ha-btn ha-btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name="cart" size={18} />
            {added ? 'Zum Warenkorb hinzugefügt' : 'In den Warenkorb'}
          </button>

          <FavoriteButton slug={product.slug} productName={product.name} />
        </div>

        <p role="status" aria-live="polite" className="min-h-5 text-sm text-pulse-dark">
          {added && (
            <>
              Hinzugefügt.{' '}
              <Link href="/warenkorb" className="font-bold underline">
                Zum Warenkorb
              </Link>
            </>
          )}
        </p>
      </div>

      {/* Sticky Add-to-Cart für Mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-chalk bg-white/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-graphite">{product.name}</p>
            <p className="font-display text-base font-extrabold text-ink">{formatPrice(price)}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!available}
            className="ha-btn ha-btn-primary disabled:opacity-50"
          >
            {added ? 'Hinzugefügt' : 'In den Warenkorb'}
          </button>
        </div>
      </div>
    </>
  );
}
