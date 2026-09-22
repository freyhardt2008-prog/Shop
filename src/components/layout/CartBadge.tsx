'use client';

import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { Icon } from '@/components/ui/Icon';

/** Warenkorb-Icon mit Artikelzähler. */
export function CartBadge({ className = 'inline-flex' }: { className?: string }) {
  const { count, ready } = useCart();

  return (
    <Link
      href="/warenkorb"
      className={`relative h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-chalk/50 ${className}`}
      aria-label={
        ready && count > 0 ? `Warenkorb, ${count} Artikel` : 'Warenkorb, aktuell leer'
      }
    >
      <Icon name="cart" size={22} />
      {ready && count > 0 && (
        <span className="absolute right-1 top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-signal px-1 text-[0.625rem] font-extrabold text-white">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}

/** Favoriten-Icon mit Zähler. */
export function FavoritesBadge({ className = 'inline-flex' }: { className?: string }) {
  const { slugs, ready } = useFavorites();
  const count = slugs.length;

  return (
    <Link
      href="/favoriten"
      className={`relative h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-chalk/50 ${className}`}
      aria-label={ready && count > 0 ? `Favoriten, ${count} Produkte` : 'Favoriten, noch leer'}
    >
      <Icon name="heart" size={22} />
      {ready && count > 0 && (
        <span className="absolute right-1 top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-ink px-1 text-[0.625rem] font-extrabold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
