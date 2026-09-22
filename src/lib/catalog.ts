/**
 * KATALOG-ZUGRIFFSSCHICHT
 * ---------------------------------------------------------------------------
 * Einziger Ort, an dem die UI auf Katalogdaten zugreift. Heute liest sie die
 * Mock-Daten aus `src/data`, später kann hier ein Headless-Commerce-System,
 * eine Datenbank oder ein PIM angebunden werden – ohne Änderungen in den
 * Seiten und Komponenten.
 *
 * Alle Funktionen sind synchron gehalten, damit sie in Server Components
 * direkt verwendet werden können. Beim Wechsel auf eine echte Datenquelle
 * werden sie async und die aufrufenden Server Components awaiten sie.
 */

import { backToSportBySlug, backToSportPrograms } from '@/data/back-to-sport';
import { bodyRegionBySlug, bodyRegions } from '@/data/body-regions';
import { categories, categoryBySlug, orderedCategories } from '@/data/categories';
import { conditionBySlug, conditions } from '@/data/conditions';
import { exerciseBySlug, exercises } from '@/data/exercises';
import { goalBySlug, goals } from '@/data/goals';
import { guideArticleBySlug, guideArticles, type GuideArticle } from '@/data/guide';
import { manufacturerById, manufacturers } from '@/data/manufacturers';
import { productBySlug, products } from '@/data/products';
import { sportBySlug, sports } from '@/data/sports';
import { tapeGuideBySlug, tapeGuides } from '@/data/tape-guides';
import { initialLetter } from './format';
import type {
  BackToSportProgram,
  BodyRegion,
  Category,
  Condition,
  Exercise,
  Goal,
  Manufacturer,
  Product,
  ProductVariant,
  Slug,
  Sport,
  TapeGuide,
} from './types';

/* -------------------------------------------------------------- Taxonomien */

export function getCategories(): Category[] {
  return orderedCategories;
}

export function getCategory(slug: Slug): Category | undefined {
  return categoryBySlug.get(slug);
}

export function getSubcategory(categorySlug: Slug, subcategorySlug: Slug) {
  return getCategory(categorySlug)?.subcategories.find((s) => s.slug === subcategorySlug);
}

export function getBodyRegions(): BodyRegion[] {
  return bodyRegions;
}

export function getBodyRegion(slug: Slug): BodyRegion | undefined {
  return bodyRegionBySlug.get(slug);
}

export function getConditions(): Condition[] {
  return conditions;
}

export function getCondition(slug: Slug): Condition | undefined {
  return conditionBySlug.get(slug);
}

export function getConditionsForRegion(regionSlug: Slug): Condition[] {
  return conditions.filter((condition) => condition.regionSlug === regionSlug);
}

export function getGoals(): Goal[] {
  return goals;
}

export function getGoal(slug: Slug): Goal | undefined {
  return goalBySlug.get(slug);
}

export function getSports(): Sport[] {
  return sports;
}

export function getSport(slug: Slug): Sport | undefined {
  return sportBySlug.get(slug);
}

/* ---------------------------------------------------------------- Produkte */

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: Slug): Product | undefined {
  return productBySlug.get(slug);
}

export function getProductsBySlugs(slugs: Slug[]): Product[] {
  return slugs.map((slug) => productBySlug.get(slug)).filter((p): p is Product => Boolean(p));
}

export function getProductsByCategory(categorySlug: Slug, subcategorySlug?: Slug): Product[] {
  return products.filter(
    (product) =>
      product.categorySlug === categorySlug &&
      (!subcategorySlug || product.subcategorySlug === subcategorySlug),
  );
}

export function getProductsByRegion(regionSlug: Slug): Product[] {
  return products.filter((product) => product.bodyRegionSlugs.includes(regionSlug));
}

export function getProductsByCondition(conditionSlug: Slug): Product[] {
  return products.filter((product) => product.conditionSlugs.includes(conditionSlug));
}

export function getProductsByGoal(goalSlug: Slug): Product[] {
  const goal = getGoal(goalSlug);
  if (!goal) return [];
  return products.filter(
    (product) =>
      product.goalSlugs.includes(goalSlug) ||
      product.purposes.some((purpose) => goal.purposes.includes(purpose)),
  );
}

export function getProductsBySport(sportSlug: Slug): Product[] {
  return products.filter((product) => product.sportSlugs.includes(sportSlug));
}

export function getEditorsPicks(limit = 8): Product[] {
  return products.filter((product) => product.isEditorsPick).slice(0, limit);
}

/** Produkte für den Themenbereich "Strong Feet – Strong Body". */
export function getStrongFeetProducts(): Product[] {
  return products.filter(
    (product) =>
      product.categorySlug === 'balance-koordination' ||
      product.bodyRegionSlugs.includes('fuss') ||
      product.bodyRegionSlugs.includes('sprunggelenk'),
  );
}

/** Alle Produkte alphabetisch, gruppiert nach Anfangsbuchstabe (A–Z-Seite). */
export function getProductsByLetter(): { letter: string; products: Product[] }[] {
  const groups = new Map<string, Product[]>();
  for (const product of [...products].sort((a, b) => a.name.localeCompare(b.name, 'de'))) {
    const letter = initialLetter(product.name);
    const bucket = groups.get(letter);
    if (bucket) bucket.push(product);
    else groups.set(letter, [product]);
  }
  return [...groups.entries()]
    .map(([letter, items]) => ({ letter, products: items }))
    .sort((a, b) => a.letter.localeCompare(b.letter, 'de'));
}

/** Günstigster Variantenpreis eines Produkts (für "ab"-Preise). */
export function getLowestPrice(product: Product): number {
  return product.variants.reduce(
    (min, variant) => Math.min(min, variant.priceCents ?? product.priceCents),
    product.priceCents,
  );
}

export function getVariant(product: Product, variantId: string): ProductVariant | undefined {
  return product.variants.find((variant) => variant.id === variantId);
}

/** Lesbares Label einer Variante, z. B. "Größe M · Schwarz". */
export function variantLabel(variant: ProductVariant): string {
  const parts: string[] = [];
  if (variant.size) parts.push(variant.size);
  if (variant.color) parts.push(variant.color);
  if (variant.side) parts.push(variant.side === 'beidseitig' ? 'beidseitig' : `${variant.side}s Bein`);
  if (variant.resistance) parts.push(`Widerstand ${variant.resistance.replace('-', ' ')}`);
  if (variant.lengthCm) parts.push(`${variant.lengthCm} cm`);
  return parts.join(' · ') || 'Standardausführung';
}

export function isInStock(product: Product): boolean {
  return product.stock > 0;
}

/* ------------------------------------------------------ Redaktionelle Inhalte */

export function getExercises(): Exercise[] {
  return exercises;
}

export function getExercise(slug: Slug): Exercise | undefined {
  return exerciseBySlug.get(slug);
}

export function getExercisesBySlugs(slugs: Slug[]): Exercise[] {
  return slugs.map((slug) => exerciseBySlug.get(slug)).filter((e): e is Exercise => Boolean(e));
}

export function getTapeGuides(): TapeGuide[] {
  return tapeGuides;
}

export function getTapeGuide(slug: Slug): TapeGuide | undefined {
  return tapeGuideBySlug.get(slug);
}

export function getTapeGuidesBySlugs(slugs: Slug[]): TapeGuide[] {
  return slugs.map((slug) => tapeGuideBySlug.get(slug)).filter((g): g is TapeGuide => Boolean(g));
}

export function getBackToSportPrograms(): BackToSportProgram[] {
  return backToSportPrograms;
}

export function getBackToSportProgram(slug: Slug): BackToSportProgram | undefined {
  return backToSportBySlug.get(slug);
}

/* --------------------------------------------------------------- Hersteller */

export function getManufacturers(): Manufacturer[] {
  return manufacturers;
}

export function getManufacturer(id: string): Manufacturer | undefined {
  return manufacturerById.get(id);
}

/* -------------------------------------------------------------- Statistiken */

export function getCatalogStats() {
  return {
    products: products.length,
    categories: categories.length,
    subcategories: categories.reduce((sum, c) => sum + c.subcategories.length, 0),
    bodyRegions: bodyRegions.length,
    conditions: conditions.length,
    exercises: exercises.length,
    tapeGuides: tapeGuides.length,
    sports: sports.length,
    goals: goals.length,
    manufacturers: manufacturers.length,
  };
}

/* --------------------------------------------------------- HEAL ACTIVE Guide */

export function getGuideArticles(): GuideArticle[] {
  return guideArticles;
}

export function getGuideArticle(slug: Slug): GuideArticle | undefined {
  return guideArticleBySlug.get(slug);
}
