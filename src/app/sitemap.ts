import type { MetadataRoute } from 'next';
import { legalPages } from '@/data/legal';
import {
  getBackToSportPrograms,
  getBodyRegions,
  getCategories,
  getConditions,
  getExercises,
  getGoals,
  getGuideArticles,
  getProducts,
  getSports,
  getTapeGuides,
} from '@/lib/catalog';
import { site } from '@/lib/site';

/**
 * Sitemap.
 *
 * Nicht enthalten sind bewusst: Warenkorb, Checkout, Konto, Favoriten,
 * Suchergebnisse, der Admin-Bereich sowie Rechtstexte, die noch als Entwurf
 * gekennzeichnet sind.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly',
  ) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry('/', 1, 'daily'),
    entry('/shop', 0.9),
    entry('/koerper', 0.9),
    entry('/ziel', 0.8),
    entry('/sport', 0.8),
    entry('/tape-yourself', 0.8),
    entry('/uebungen', 0.8),
    entry('/back-to-sport', 0.8),
    entry('/recovery', 0.7),
    entry('/strong-feet', 0.7),
    entry('/guide', 0.7),
    entry('/finder', 0.7),
    entry('/favorites', 0.6),
    entry('/produkte-a-z', 0.6),
    entry('/rechtliches', 0.3, 'yearly'),

    ...getCategories().flatMap((category) => [
      entry(`/shop/${category.slug}`, 0.8),
      ...category.subcategories.map((sub) => entry(`/shop/${category.slug}/${sub.slug}`, 0.7)),
    ]),

    ...getProducts().map((product) => entry(`/produkt/${product.slug}`, 0.8)),
    ...getBodyRegions().map((region) => entry(`/koerper/${region.slug}`, 0.8)),
    ...getConditions().map((condition) => entry(`/beschwerden/${condition.slug}`, 0.7)),
    ...getGoals().map((goal) => entry(`/ziel/${goal.slug}`, 0.7)),
    ...getSports().map((sport) => entry(`/sport/${sport.slug}`, 0.7)),
    ...getExercises().map((exercise) => entry(`/uebungen/${exercise.slug}`, 0.6)),
    ...getTapeGuides().map((guide) => entry(`/tape-yourself/${guide.slug}`, 0.7)),
    ...getBackToSportPrograms().map((program) => entry(`/back-to-sport/${program.slug}`, 0.7)),
    ...getGuideArticles().map((article) => entry(`/guide/${article.slug}`, 0.6)),

    ...legalPages
      .filter((page) => !page.requiresLegalReview)
      .map((page) => entry(`/rechtliches/${page.slug}`, 0.3, 'yearly')),
  ];
}
