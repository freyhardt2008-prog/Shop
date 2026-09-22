'use client';

import { useFavorites } from '@/components/providers/FavoritesProvider';
import { Icon } from '@/components/ui/Icon';

/** Merkzettel-Schalter. Barrierefrei über `aria-pressed` ausgezeichnet. */
export function FavoriteButton({
  slug,
  productName,
  className = '',
  size = 20,
}: {
  slug: string;
  productName: string;
  className?: string;
  size?: number;
}) {
  const { has, toggle, ready } = useFavorites();
  const active = ready && has(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={active}
      aria-label={
        active ? `${productName} von den Favoriten entfernen` : `${productName} zu den Favoriten hinzufügen`
      }
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-chalk bg-white/90 backdrop-blur transition-colors hover:border-signal hover:text-signal ${
        active ? 'border-signal text-signal' : 'text-graphite'
      } ${className}`}
    >
      <Icon name="heart" size={size} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
