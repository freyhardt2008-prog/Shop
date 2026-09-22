import Image from 'next/image';
import type { IconName, ProductImage as ProductImageData } from '@/lib/types';
import { Icon } from './Icon';

/**
 * PRODUKTBILD
 * ---------------------------------------------------------------------------
 * Im Repository liegen bewusst KEINE fremden Produktfotos (Bildrechte!).
 * Solange die Bildquelle mit `demo:` beginnt, wird stattdessen eine
 * markenkonforme Platzhaltergrafik gerendert: ein weicher Farbverlauf,
 * abgeleitet aus dem Produkt-Slug, plus das Kategorie-Icon.
 *
 * Sobald echte Bilder vorliegen (CDN-URL oder Datei unter /public), erkennt
 * die Komponente das automatisch und rendert `next/image` mit Optimierung.
 */

/** Stabiler Hash für die Farbwahl (identisches Produkt → identische Grafik). */
function hash(value: string): number {
  let result = 0;
  for (let i = 0; i < value.length; i += 1) {
    result = (result * 31 + value.charCodeAt(i)) >>> 0;
  }
  return result;
}

/** Markenkonforme Farbpaare – bewusst warm und sportlich, nicht klinisch. */
const palettes: [string, string][] = [
  ['#FFE8E1', '#FFC9B8'],
  ['#E4F5F1', '#BFE9DF'],
  ['#FFF3DC', '#FFE1A8'],
  ['#EDEFF5', '#D3D9E6'],
  ['#F1F0E8', '#DFDCCC'],
  ['#E8F0FF', '#CBDCFA'],
];

interface Props {
  image: ProductImageData;
  /** Kategorie-Icon für die Platzhaltergrafik. */
  icon?: IconName;
  /** Kürzel (meist die ersten Zeichen des Produktnamens). */
  label?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export function ProductImage({
  image,
  icon = 'spark',
  label,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw',
  className = '',
  priority = false,
}: Props) {
  const isPlaceholder = image.src.startsWith('demo:');

  if (!isPlaceholder) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  const palette = palettes[hash(image.src) % palettes.length]!;
  const [from, to] = palette;
  const gradientId = `ha-img-${hash(image.src).toString(36)}`;
  const angle = hash(image.src) % 40;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      role="img"
      aria-label={image.alt}
    >
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${angle} 0.5 0.5)`}>
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill={`url(#${gradientId})`} />
        <circle cx="310" cy="90" r="120" fill="#ffffff" opacity="0.28" />
        <circle cx="90" cy="330" r="80" fill="#ffffff" opacity="0.18" />
      </svg>

      <span className="relative flex flex-col items-center gap-2 text-ink/45">
        <Icon name={icon} size={44} strokeWidth={1.4} />
        {label && (
          <span className="font-display text-[0.6875rem] font-extrabold tracking-[0.2em] uppercase">
            {label}
          </span>
        )}
      </span>

      <span className="absolute bottom-2 right-2 rounded-full bg-white/75 px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-slate-soft">
        Beispielbild
      </span>
    </div>
  );
}
