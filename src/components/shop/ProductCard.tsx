import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { ProductImage } from '@/components/ui/ProductImage';
import { getCategory, getLowestPrice } from '@/lib/catalog';
import { discountPercent, formatPrice } from '@/lib/format';
import type { Product } from '@/lib/types';
import { FavoriteButton } from './FavoriteButton';

/**
 * Produktkachel für alle Listen- und Empfehlungsflächen.
 * Mobile-first: große Bildfläche, klare Typo, Touch-Ziel über die volle Karte.
 */
export function ProductCard({
  product,
  priority = false,
  showCategory = true,
}: {
  product: Product;
  priority?: boolean;
  showCategory?: boolean;
}) {
  const category = getCategory(product.categorySlug);
  const lowest = getLowestPrice(product);
  const hasPriceRange = product.variants.some(
    (variant) => (variant.priceCents ?? product.priceCents) !== product.priceCents,
  );
  const discount = discountPercent(product.priceCents, product.rrpCents);
  const inStock = product.stock > 0;
  const image = product.images[0];

  return (
    <article className="ha-card ha-card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-sand">
        {image && (
          <ProductImage
            image={image}
            icon={category?.icon}
            label={product.brand.replace('MUSTERMARKE ', 'Marke ')}
            priority={priority}
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badges?.map((badge) => (
            <Badge key={badge} tone="ink">
              {badge}
            </Badge>
          ))}
          {discount && <Badge tone="signal">-{discount}%</Badge>}
        </div>

        <div className="absolute right-3 top-3">
          <FavoriteButton slug={product.slug} productName={product.name} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        {showCategory && category && (
          <p className="ha-eyebrow mb-1.5 truncate">{category.name}</p>
        )}

        <h3 className="font-display text-base leading-snug font-extrabold text-ink md:text-lg">
          <Link href={`/produkt/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-graphite">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-lg font-extrabold text-ink">
                {hasPriceRange && <span className="text-xs font-bold text-slate-soft">ab </span>}
                {formatPrice(lowest)}
              </p>
              {product.rrpCents && product.rrpCents > product.priceCents && (
                <p className="text-xs text-slate-soft">
                  <span className="line-through">{formatPrice(product.rrpCents)}</span> UVP
                </p>
              )}
            </div>

            <p
              className={`flex items-center gap-1 text-xs font-semibold ${
                inStock ? 'text-pulse-dark' : 'text-slate-soft'
              }`}
            >
              <Icon name="check" size={14} />
              {inStock ? 'Auf Lager' : 'Nicht verfügbar'}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Responsives Produktraster. */
export function ProductGrid({
  products,
  priorityCount = 0,
  className = '',
}: {
  products: Product[];
  priorityCount?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.slug} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}

/** Horizontal scrollbare Produktreihe (Mobile-freundlich). */
export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="ha-scroll-x -mx-4 flex gap-4 px-4 pb-2 md:mx-0 md:px-0">
      {products.map((product) => (
        <div key={product.slug} className="w-[68vw] shrink-0 sm:w-72 lg:w-80">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
