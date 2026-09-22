import { ProductImage } from '@/components/ui/ProductImage';
import type { IconName, ProductImage as ProductImageData } from '@/lib/types';

/**
 * Produktgalerie.
 * Ohne JavaScript umgesetzt: Hauptbild plus Zusatzbilder als Raster.
 * Sobald echte Fotos vorliegen, kann hier ein Lightbox-/Zoom-Verhalten
 * ergänzt werden.
 */
export function ProductGallery({
  images,
  icon,
  label,
}: {
  images: ProductImageData[];
  icon?: IconName;
  label?: string;
}) {
  const [main, ...rest] = images;
  if (!main) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-card border border-chalk bg-white">
        <ProductImage image={main} icon={icon} label={label} priority sizes="(min-width: 1024px) 45vw, 92vw" />
      </div>

      {rest.length > 0 && (
        <ul className="grid grid-cols-3 gap-3">
          {rest.map((image) => (
            <li
              key={image.src}
              className="relative aspect-square overflow-hidden rounded-2xl border border-chalk bg-white"
            >
              <ProductImage image={image} icon={icon} sizes="30vw" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
