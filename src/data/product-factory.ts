import type { Product, ProductVariant } from '@/lib/types';

/**
 * Hilfsfunktionen für die Beispiel-Produktdaten.
 *
 * Varianten (SKU, EAN, Lagerbestand) werden deterministisch aus der Basis-SKU
 * erzeugt. Das hält die Datendatei lesbar und sorgt gleichzeitig dafür, dass
 * jede Variante die Felder besitzt, die ein echtes Warenwirtschaftssystem
 * später liefern würde.
 *
 * WICHTIG: Alle erzeugten EANs beginnen mit der Kennung `9900000` und sind
 * damit eindeutig als BEISPIELDATEN erkennbar. Es handelt sich nicht um echte,
 * vergebene GS1-Nummern.
 */

const DEMO_EAN_PREFIX = '9900000';

/** Einfacher, stabiler String-Hash (FNV-1a) für reproduzierbare Mock-Werte. */
function hash(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return Math.abs(h);
}

/** Erzeugt eine 13-stellige Beispiel-EAN aus einem Schlüssel. */
export function demoEan(key: string): string {
  const digits = String(hash(key)).padStart(6, '0').slice(0, 6);
  return `${DEMO_EAN_PREFIX}${digits}`;
}

/** Reproduzierbarer Lagerbestand zwischen `min` und `max`. */
function demoStock(key: string, min = 0, max = 60): number {
  return min + (hash(key) % (max - min + 1));
}

type VariantDimension = {
  key: 'size' | 'color' | 'side' | 'resistance' | 'lengthCm';
  values: (string | number)[];
};

/**
 * Baut die Variantenmatrix aus den Produktattributen.
 * Es werden maximal zwei Dimensionen kombiniert, damit die Variantenanzahl
 * überschaubar bleibt (so arbeiten auch die meisten Shopsysteme im Standard).
 */
export function buildVariants(
  sku: string,
  attributes: Product['attributes'],
  basePriceCents: number,
): ProductVariant[] {
  const dimensions: VariantDimension[] = [];

  if (attributes.sizes?.length) dimensions.push({ key: 'size', values: attributes.sizes });
  if (attributes.resistances?.length)
    dimensions.push({ key: 'resistance', values: attributes.resistances });
  if (attributes.lengthsCm?.length)
    dimensions.push({ key: 'lengthCm', values: attributes.lengthsCm });
  if (attributes.sides?.length) dimensions.push({ key: 'side', values: attributes.sides });
  if (attributes.colors?.length) dimensions.push({ key: 'color', values: attributes.colors });

  const [first, second] = [dimensions[0], dimensions[1]];

  if (!first) {
    const id = `${sku}-STD`;
    return [
      {
        id,
        sku: id,
        ean: demoEan(id),
        stock: demoStock(id, 4, 80),
      },
    ];
  }

  const combos: Record<string, string | number>[] = [];
  for (const a of first.values) {
    if (second) {
      for (const b of second.values) {
        combos.push({ [first.key]: a, [second.key]: b });
      }
    } else {
      combos.push({ [first.key]: a });
    }
  }

  return combos.map((combo, index) => {
    const suffix = Object.values(combo)
      .map((value) => String(value).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))
      .join('-');
    const id = `${sku}-${suffix || index + 1}`;
    return {
      id,
      sku: id,
      ean: demoEan(id),
      ...combo,
      priceCents: basePriceCents,
      stock: demoStock(id, 0, 45),
    } as ProductVariant;
  });
}

/**
 * Platzhalter-Bildquellen.
 *
 * Es liegen bewusst KEINE fremden Produktfotos im Repository (Bildrechte!).
 * Stattdessen erzeugt `<ProductImage />` aus diesem Schlüssel eine
 * markenkonforme SVG-Grafik. Sobald echte Bilder vorliegen, werden hier
 * schlicht CDN-URLs eingetragen – die Komponente erkennt das automatisch.
 */
export function demoImages(slug: string, name: string): Product['images'] {
  return [
    { src: `demo:${slug}`, alt: `${name} – Produktabbildung (Beispieldaten)`, kind: 'produkt' },
    { src: `demo:${slug}--anwendung`, alt: `${name} – Anwendungssituation (Beispieldaten)`, kind: 'anwendung' },
    { src: `demo:${slug}--detail`, alt: `${name} – Detailansicht (Beispieldaten)`, kind: 'detail' },
  ];
}

/** Eingabeformat der Produktdatei – alles Generierbare ist optional. */
export type ProductDraft = Omit<
  Product,
  'id' | 'ean' | 'variants' | 'images' | 'isDemoData' | 'stock'
> & {
  /** Optional: Varianten manuell setzen (sonst aus `attributes` erzeugt). */
  variants?: ProductVariant[];
  images?: Product['images'];
};

/** Vervollständigt einen Produktentwurf zu einem vollständigen Produkt. */
export function defineProduct(draft: ProductDraft): Product {
  const variants = draft.variants ?? buildVariants(draft.sku, draft.attributes, draft.priceCents);
  const stock = variants.reduce((sum, variant) => sum + variant.stock, 0);

  return {
    ...draft,
    id: draft.sku,
    ean: demoEan(draft.sku),
    variants,
    stock,
    images: draft.images ?? demoImages(draft.slug, draft.name),
    isDemoData: true,
  };
}
