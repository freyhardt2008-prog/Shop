/**
 * INTELLIGENTE PRODUKTFILTER
 * ---------------------------------------------------------------------------
 * Die Filterleiste zeigt nur Filter, die im aktuellen Kontext sinnvoll sind:
 *
 * 1. Die Kategorie legt über `Category.filterKeys` fest, welche Filter
 *    überhaupt in Frage kommen (Bandagen: Körperregion/Größe/Seite,
 *    Trainingsbänder: Widerstand/Länge/Niveau, Shirts: Geschlecht/Größe/Farbe).
 * 2. Zusätzlich werden Filter ausgeblendet, die in der aktuellen Produktmenge
 *    weniger als zwei unterschiedliche Ausprägungen hätten – ein Filter mit
 *    nur einer Option hilft niemandem.
 *
 * Der Filterzustand lebt vollständig in der URL (`?größe=M&farbe=Schwarz`),
 * damit Ergebnisse teilbar und serverseitig renderbar sind.
 */

import { getBodyRegion, getCondition, getSport } from './catalog';
import {
  filterLabels,
  genderLabels,
  purposeLabels,
  resistanceLabels,
  trainingLevelLabels,
} from './labels';
import type { FilterGroup, FilterKey, FilterOption, Product, SortKey } from './types';

/** Filterzustand: pro Filter eine Liste ausgewählter Werte. */
export type FilterState = Partial<Record<FilterKey, string[]>>;

/** URL-Parameternamen (deutsch, sprechend, SEO-freundlich). */
export const filterParamNames: Record<FilterKey, string> = {
  gender: 'geschlecht',
  bodyRegion: 'koerperregion',
  condition: 'beschwerde',
  purpose: 'zweck',
  sport: 'sportart',
  size: 'groesse',
  color: 'farbe',
  resistance: 'widerstand',
  length: 'laenge',
  trainingLevel: 'niveau',
  brand: 'marke',
  material: 'material',
  price: 'preis',
};

export const filterKeyByParam = Object.fromEntries(
  Object.entries(filterParamNames).map(([key, param]) => [param, key as FilterKey]),
) as Record<string, FilterKey>;

/** Preis-Buckets (Wert = Bucket-Id, wird in `matchesPrice` aufgelöst). */
export const priceBuckets: { value: string; label: string; min: number; max: number }[] = [
  { value: 'bis-15', label: 'bis 15 €', min: 0, max: 1500 },
  { value: '15-30', label: '15 – 30 €', min: 1500, max: 3000 },
  { value: '30-60', label: '30 – 60 €', min: 3000, max: 6000 },
  { value: '60-120', label: '60 – 120 €', min: 6000, max: 12000 },
  { value: 'ab-120', label: 'ab 120 €', min: 12000, max: Number.MAX_SAFE_INTEGER },
];

/* ----------------------------------------------------------- Wertextraktion */

/** Liefert alle Ausprägungen eines Produkts für einen Filter. */
export function valuesFor(product: Product, key: FilterKey): string[] {
  switch (key) {
    case 'gender':
      return [product.gender];
    case 'bodyRegion':
      return product.bodyRegionSlugs;
    case 'condition':
      return product.conditionSlugs;
    case 'purpose':
      return product.purposes;
    case 'sport':
      return product.sportSlugs;
    case 'size':
      return product.attributes.sizes ?? [];
    case 'color':
      return product.attributes.colors ?? [];
    case 'resistance':
      return product.attributes.resistances ?? [];
    case 'length':
      return (product.attributes.lengthsCm ?? []).map(String);
    case 'trainingLevel':
      return product.attributes.trainingLevels ?? [];
    case 'brand':
      return [product.brand];
    case 'material':
      return product.attributes.materials ?? [];
    case 'price': {
      const bucket = priceBuckets.find(
        (b) => product.priceCents >= b.min && product.priceCents < b.max,
      );
      return bucket ? [bucket.value] : [];
    }
    default:
      return [];
  }
}

/** Menschenlesbares Label eines Filterwerts. */
export function optionLabel(key: FilterKey, value: string): string {
  switch (key) {
    case 'gender':
      return genderLabels[value as keyof typeof genderLabels] ?? value;
    case 'bodyRegion':
      return getBodyRegion(value)?.name ?? value;
    case 'condition':
      return getCondition(value)?.name ?? value;
    case 'purpose':
      return purposeLabels[value as keyof typeof purposeLabels] ?? value;
    case 'sport':
      return getSport(value)?.name ?? value;
    case 'resistance':
      return resistanceLabels[value as keyof typeof resistanceLabels] ?? value;
    case 'trainingLevel':
      return trainingLevelLabels[value as keyof typeof trainingLevelLabels] ?? value;
    case 'length':
      return `${value} cm`;
    case 'price':
      return priceBuckets.find((b) => b.value === value)?.label ?? value;
    default:
      return value;
  }
}

/* ------------------------------------------------------------- Filtergruppen */

/**
 * Baut die anzuzeigenden Filtergruppen.
 * Filter mit weniger als zwei Optionen werden ausgeblendet.
 */
export function buildFilterGroups(products: Product[], keys: FilterKey[]): FilterGroup[] {
  const groups: FilterGroup[] = [];

  for (const key of keys) {
    const counts = new Map<string, number>();
    for (const product of products) {
      for (const value of new Set(valuesFor(product, key))) {
        counts.set(value, (counts.get(value) ?? 0) + 1);
      }
    }

    if (counts.size < 2) continue;

    const options: FilterOption[] = [...counts.entries()]
      .map(([value, count]) => ({ value, label: optionLabel(key, value), count }))
      .sort((a, b) => sortOptions(key, a, b));

    groups.push({ key, label: filterLabels[key], options });
  }

  return groups;
}

/** Sortierlogik pro Filterart (Größen und Widerstände nicht alphabetisch). */
function sortOptions(key: FilterKey, a: FilterOption, b: FilterOption): number {
  if (key === 'size') {
    const order = ['XS', 'S', 'S/M', 'M', 'L', 'L/XL', 'XL', 'XXL'];
    const ia = order.indexOf(a.value);
    const ib = order.indexOf(b.value);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
  }
  if (key === 'resistance') {
    const order = ['sehr-leicht', 'leicht', 'mittel', 'stark', 'sehr-stark'];
    return order.indexOf(a.value) - order.indexOf(b.value);
  }
  if (key === 'trainingLevel') {
    const order = ['einsteiger', 'fortgeschritten', 'profi'];
    return order.indexOf(a.value) - order.indexOf(b.value);
  }
  if (key === 'price') {
    const order = priceBuckets.map((bucket) => bucket.value);
    return order.indexOf(a.value) - order.indexOf(b.value);
  }
  if (key === 'length') return Number(a.value) - Number(b.value);
  return a.label.localeCompare(b.label, 'de');
}

/* -------------------------------------------------------------- Anwendung */

/** Wendet den Filterzustand an (UND zwischen Filtern, ODER innerhalb eines Filters). */
export function applyFilters(products: Product[], state: FilterState): Product[] {
  const activeEntries = Object.entries(state).filter(
    (entry): entry is [FilterKey, string[]] => Array.isArray(entry[1]) && entry[1].length > 0,
  );

  if (activeEntries.length === 0) return products;

  return products.filter((product) =>
    activeEntries.every(([key, selected]) => {
      const productValues = valuesFor(product, key);
      return selected.some((value) => productValues.includes(value));
    }),
  );
}

export function sortProducts(products: Product[], sortKey: SortKey): Product[] {
  const sorted = [...products];
  switch (sortKey) {
    case 'preis-auf':
      return sorted.sort((a, b) => a.priceCents - b.priceCents);
    case 'preis-ab':
      return sorted.sort((a, b) => b.priceCents - a.priceCents);
    case 'name-az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'de'));
    case 'neu':
      return sorted.sort((a, b) => b.sku.localeCompare(a.sku));
    case 'empfohlen':
    default:
      return sorted.sort((a, b) => {
        const pick = Number(Boolean(b.isEditorsPick)) - Number(Boolean(a.isEditorsPick));
        if (pick !== 0) return pick;
        return a.name.localeCompare(b.name, 'de');
      });
  }
}

/* ------------------------------------------------------------ URL-Anbindung */

type RawSearchParams = Record<string, string | string[] | undefined>;

/** Liest den Filterzustand aus den Next.js `searchParams`. */
export function parseFilterState(searchParams: RawSearchParams): FilterState {
  const state: FilterState = {};
  for (const [param, key] of Object.entries(filterKeyByParam)) {
    const raw = searchParams[param];
    if (!raw) continue;
    const values = (Array.isArray(raw) ? raw : [raw]).flatMap((value) => value.split(','));
    const cleaned = values.map((value) => value.trim()).filter(Boolean);
    if (cleaned.length > 0) state[key] = cleaned;
  }
  return state;
}

export function parseSortKey(searchParams: RawSearchParams): SortKey {
  const raw = searchParams.sortierung;
  const value = Array.isArray(raw) ? raw[0] : raw;
  const allowed: SortKey[] = ['empfohlen', 'preis-auf', 'preis-ab', 'name-az', 'neu'];
  return allowed.includes(value as SortKey) ? (value as SortKey) : 'empfohlen';
}

/** Erzeugt einen Query-String aus Filterzustand + Sortierung. */
export function buildQueryString(state: FilterState, sortKey?: SortKey): string {
  const params = new URLSearchParams();
  for (const [key, values] of Object.entries(state)) {
    if (!values || values.length === 0) continue;
    params.set(filterParamNames[key as FilterKey], values.join(','));
  }
  if (sortKey && sortKey !== 'empfohlen') params.set('sortierung', sortKey);
  const query = params.toString();
  return query ? `?${query}` : '';
}

/** Schaltet einen Filterwert an bzw. aus (für Klicks auf Filter-Chips). */
export function toggleFilterValü(
  state: FilterState,
  key: FilterKey,
  value: string,
): FilterState {
  const current = state[key] ?? [];
  const next = current.includes(value)
    ? current.filter((entry) => entry !== value)
    : [...current, value];
  const updated: FilterState = { ...state, [key]: next };
  if (next.length === 0) delete updated[key];
  return updated;
}

export function countActiveFilters(state: FilterState): number {
  return Object.values(state).reduce((sum, values) => sum + (values?.length ?? 0), 0);
}
