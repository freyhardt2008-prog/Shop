'use client';

import Link from 'next/link';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { ProductCard } from '@/components/shop/ProductCard';
import { Icon } from '@/components/ui/Icon';
import type { Product } from '@/lib/types';

/**
 * Merkzettel.
 * Die Produktdaten kommen serverseitig gerendert als Prop – der Client filtert
 * lediglich anhand der lokal gespeicherten Slugs.
 */
export function FavoritesView({ products }: { products: Product[] }) {
  const { slugs, ready, clear } = useFavorites();

  if (!ready) {
    return <p className="ha-card p-8 text-center text-sm text-slate-soft">Favoriten werden geladen …</p>;
  }

  const favorites = products.filter((product) => slugs.includes(product.slug));

  if (favorites.length === 0) {
    return (
      <div className="ha-card p-8 text-center md:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sand text-slate-soft">
          <Icon name="heart" size={26} />
        </span>
        <p className="mt-5 font-display text-xl font-extrabold text-ink">
          Noch keine Favoriten gespeichert.
        </p>
        <p className="ha-prose mx-auto mt-2 max-w-md text-sm">
          Tippe auf das Herz-Symbol an einem Produkt, um es hier zu sammeln. Die Liste wird lokal in
          deinem Browser gespeichert.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="ha-btn ha-btn-primary">
            Zum Shop
          </Link>
          <Link href="/favorites" className="ha-btn ha-btn-ghost">
            HEAL ACTIVE Favorites ansehen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-soft">
          {favorites.length} {favorites.length === 1 ? 'Produkt' : 'Produkte'} gemerkt
        </p>
        <button type="button" onClick={clear} className="text-sm font-bold text-signal hover:underline">
          Liste leeren
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
