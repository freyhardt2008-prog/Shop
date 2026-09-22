'use client';

import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';
import { Icon } from '@/components/ui/Icon';
import { ProductImage } from '@/components/ui/ProductImage';
import { calculateTotals, resolveCartLines } from '@/lib/commerce/cart';
import { formatPrice } from '@/lib/format';
import { variantLabel } from '@/lib/catalog';

/**
 * Warenkorbansicht.
 * Die Auflösung der Zeilen gegen den Katalog passiert über `lib/commerce/cart`
 * – dieselbe Logik nutzt auch der Checkout und die API-Route.
 */
export function CartView() {
  const { lines, setQuantity, remove, ready } = useCart();
  const resolved = resolveCartLines(lines);
  const totals = calculateTotals(resolved, 'standard');

  if (!ready) {
    return <p className="ha-card p-8 text-center text-sm text-slate-soft">Warenkorb wird geladen …</p>;
  }

  if (resolved.length === 0) {
    return (
      <div className="ha-card p-8 text-center md:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sand text-slate-soft">
          <Icon name="cart" size={26} />
        </span>
        <p className="mt-5 font-display text-xl font-extrabold text-ink">
          Dein Warenkorb ist noch leer.
        </p>
        <p className="ha-prose mx-auto mt-2 max-w-md text-sm">
          Starte beim Körpernavigator, beim Finder oder stöbere direkt im Shop.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="ha-btn ha-btn-primary">
            Zum Shop
          </Link>
          <Link href="/finder" className="ha-btn ha-btn-ghost">
            Zum Finder
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
      <ul className="space-y-4">
        {resolved.map((line) => {
          const image = line.product.images[0];
          const maxQuantity = Math.max(1, Math.min(line.variant.stock, 10));

          return (
            <li key={`${line.productSlug}-${line.variantId}`} className="ha-card overflow-hidden">
              <div className="flex gap-4 p-4">
                <Link
                  href={`/produkt/${line.product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-sand sm:h-28 sm:w-28"
                >
                  {image && <ProductImage image={image} sizes="112px" />}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="ha-eyebrow truncate">{line.product.brand}</p>
                      <Link
                        href={`/produkt/${line.product.slug}`}
                        className="block font-display text-base font-extrabold text-ink hover:text-signal"
                      >
                        {line.product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-slate-soft">
                        {variantLabel(line.variant)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(line.productSlug, line.variantId)}
                      className="shrink-0 rounded-full p-2 text-slate-soft transition-colors hover:bg-sand hover:text-signal"
                      aria-label={`${line.product.name} aus dem Warenkorb entfernen`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                    <div className="inline-flex items-center rounded-full border border-chalk bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(line.productSlug, line.variantId, line.quantity - 1)
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-ink"
                        aria-label="Menge verringern"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-display text-sm font-extrabold">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(line.productSlug, line.variantId, line.quantity + 1)
                        }
                        disabled={line.quantity >= maxQuantity}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-ink disabled:opacity-35"
                        aria-label="Menge erhöhen"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-display text-lg font-extrabold text-ink">
                      {formatPrice(line.lineTotalCents)}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="ha-card p-5 md:p-6">
          <h2 className="font-display text-lg font-extrabold text-ink">Zusammenfassung</h2>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-graphite">Zwischensumme</dt>
              <dd className="font-semibold text-ink">{formatPrice(totals.subtotalCents)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-graphite">Versand (Standard)</dt>
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

          {totals.amountToFreeShippingCents > 0 && (
            <p className="mt-4 rounded-xl bg-pulse-soft px-3 py-2 text-xs leading-relaxed text-pulse-dark">
              Noch {formatPrice(totals.amountToFreeShippingCents)} bis zum versandkostenfreien
              Standardversand.
            </p>
          )}

          <Link href="/checkout" className="ha-btn ha-btn-primary mt-5 w-full">
            Zur Kasse
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/shop" className="ha-btn ha-btn-ghost mt-2 w-full">
            Weiter einkaufen
          </Link>

          <p className="mt-4 text-xs leading-relaxed text-slate-soft">
            Preise inkl. gesetzlicher MwSt. Es handelt sich um eine Vorschau mit Beispieldaten – es
            wird keine echte Bestellung ausgelöst.
          </p>
        </div>
      </aside>
    </div>
  );
}
