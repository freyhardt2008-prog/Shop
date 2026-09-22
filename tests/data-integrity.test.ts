import { describe, expect, it } from 'vitest';
import { backToSportPrograms } from '@/data/back-to-sport';
import { bodyRegions } from '@/data/body-regions';
import { categories } from '@/data/categories';
import { conditions } from '@/data/conditions';
import { exercises } from '@/data/exercises';
import { goals } from '@/data/goals';
import { guideArticles } from '@/data/guide';
import { manufacturers } from '@/data/manufacturers';
import { products } from '@/data/products';
import { sports } from '@/data/sports';
import { tapeGuides } from '@/data/tape-guides';
import { hotspots } from '@/components/body-map/geometry';

/**
 * Referenzielle Integrität der Katalogdaten.
 *
 * Diese Tests sind das Sicherheitsnetz für die redaktionelle Pflege: Sobald
 * jemand einen Slug umbenennt oder einen Tippfehler in einer Verknüpfung hat,
 * schlägt hier etwas fehl statt erst im Build oder – schlimmer – live.
 */

const regionSlugs = new Set(bodyRegions.map((region) => region.slug));
const conditionSlugs = new Set(conditions.map((condition) => condition.slug));
const goalSlugs = new Set(goals.map((goal) => goal.slug));
const sportSlugs = new Set(sports.map((sport) => sport.slug));
const categorySlugs = new Set(categories.map((category) => category.slug));
const productSlugs = new Set(products.map((product) => product.slug));
const exerciseSlugs = new Set(exercises.map((exercise) => exercise.slug));
const tapeGuideSlugs = new Set(tapeGuides.map((guide) => guide.slug));
const manufacturerIds = new Set(manufacturers.map((manufacturer) => manufacturer.id));

function expectAllIn(values: string[], allowed: Set<string>, context: string) {
  for (const value of values) {
    expect(allowed.has(value), `${context}: unbekannter Slug "${value}"`).toBe(true);
  }
}

describe('Eindeutigkeit', () => {
  it('vergibt jeden Produkt-Slug nur einmal', () => {
    expect(productSlugs.size).toBe(products.length);
  });

  it('vergibt jede SKU nur einmal', () => {
    const skus = new Set(products.map((product) => product.sku));
    expect(skus.size).toBe(products.length);
  });

  it('vergibt jede Varianten-ID global nur einmal', () => {
    const variantIds = products.flatMap((product) =>
      product.variants.map((variant) => variant.id),
    );
    expect(new Set(variantIds).size).toBe(variantIds.length);
  });

  it('vergibt jeden Beschwerde-, Übungs- und Anleitungs-Slug nur einmal', () => {
    expect(conditionSlugs.size).toBe(conditions.length);
    expect(exerciseSlugs.size).toBe(exercises.length);
    expect(tapeGuideSlugs.size).toBe(tapeGuides.length);
  });

  it('vergibt Unterkategorie-Slugs innerhalb einer Kategorie eindeutig', () => {
    for (const category of categories) {
      const slugs = category.subcategories.map((sub) => sub.slug);
      expect(new Set(slugs).size, `Kategorie ${category.slug}`).toBe(slugs.length);
    }
  });
});

describe('Körperregionen', () => {
  it('verweist nur auf existierende Beschwerden und Kategorien', () => {
    for (const region of bodyRegions) {
      expectAllIn(region.conditionSlugs, conditionSlugs, `Region ${region.slug}`);
      expectAllIn(region.highlightCategorySlugs, categorySlugs, `Region ${region.slug}`);
    }
  });

  it('hat für jede Region einen Hotspot im Körpernavigator', () => {
    const mapped = new Set(hotspots.map((hotspot) => hotspot.regionSlug));
    for (const region of bodyRegions) {
      expect(mapped.has(region.slug), `Region ${region.slug} fehlt im Körpernavigator`).toBe(true);
    }
  });

  it('platziert jeden Hotspot auf der in den Daten hinterlegten Ansicht', () => {
    for (const hotspot of hotspots) {
      const region = bodyRegions.find((entry) => entry.slug === hotspot.regionSlug);
      expect(region, `Hotspot ohne Region: ${hotspot.regionSlug}`).toBeDefined();
      expect(hotspot.view).toBe(region!.view);
    }
  });
});

describe('Beschwerdebilder', () => {
  it('verweist nur auf existierende Regionen, Ziele, Sportarten, Übungen und Anleitungen', () => {
    for (const condition of conditions) {
      expect(regionSlugs.has(condition.regionSlug), `Beschwerde ${condition.slug}`).toBe(true);
      expectAllIn(condition.goalSlugs, goalSlugs, `Beschwerde ${condition.slug}`);
      expectAllIn(condition.sportSlugs, sportSlugs, `Beschwerde ${condition.slug}`);
      expectAllIn(condition.exerciseSlugs, exerciseSlugs, `Beschwerde ${condition.slug}`);
      expectAllIn(condition.tapeGuideSlugs, tapeGuideSlugs, `Beschwerde ${condition.slug}`);
    }
  });

  it('ist jeder Region zugeordnet, die sie referenziert', () => {
    for (const condition of conditions) {
      const region = bodyRegions.find((entry) => entry.slug === condition.regionSlug)!;
      expect(
        region.conditionSlugs.includes(condition.slug),
        `${condition.slug} fehlt in Region ${region.slug}`,
      ).toBe(true);
    }
  });
});

describe('Produkte', () => {
  it('verweist nur auf existierende Taxonomien', () => {
    for (const product of products) {
      expect(categorySlugs.has(product.categorySlug), `Produkt ${product.slug}`).toBe(true);
      expect(manufacturerIds.has(product.manufacturerId), `Produkt ${product.slug}`).toBe(true);
      expectAllIn(product.bodyRegionSlugs, regionSlugs, `Produkt ${product.slug}`);
      expectAllIn(product.conditionSlugs, conditionSlugs, `Produkt ${product.slug}`);
      expectAllIn(product.sportSlugs, sportSlugs, `Produkt ${product.slug}`);
      expectAllIn(product.goalSlugs, goalSlugs, `Produkt ${product.slug}`);
      expectAllIn(product.exerciseSlugs, exerciseSlugs, `Produkt ${product.slug}`);
      expectAllIn(product.relatedProductSlugs, productSlugs, `Produkt ${product.slug}`);
      expectAllIn(product.accessoryProductSlugs, productSlugs, `Produkt ${product.slug}`);
    }
  });

  it('nutzt nur Unterkategorien der eigenen Kategorie', () => {
    for (const product of products) {
      const category = categories.find((entry) => entry.slug === product.categorySlug)!;
      const known = category.subcategories.some((sub) => sub.slug === product.subcategorySlug);
      expect(known, `Produkt ${product.slug}: ${product.subcategorySlug}`).toBe(true);
    }
  });

  it('verlinkt sich nicht selbst als verwandtes Produkt', () => {
    for (const product of products) {
      expect(product.relatedProductSlugs).not.toContain(product.slug);
      expect(product.accessoryProductSlugs).not.toContain(product.slug);
    }
  });

  it('kalkuliert plausibel: Verkaufspreis liegt über dem Einkaufspreis', () => {
    for (const product of products) {
      const netPrice = product.priceCents / (1 + product.vatRate / 100);
      expect(netPrice, `Produkt ${product.slug}`).toBeGreaterThan(product.purchasePriceCents);
    }
  });

  it('nutzt nur zulässige Mehrwertsteuersätze', () => {
    for (const product of products) {
      expect([7, 19]).toContain(product.vatRate);
    }
  });

  it('hält die UVP nicht unter dem Verkaufspreis', () => {
    for (const product of products) {
      if (product.rrpCents === undefined) continue;
      expect(product.rrpCents, `Produkt ${product.slug}`).toBeGreaterThanOrEqual(product.priceCents);
    }
  });

  it('kennzeichnet alle Produkte als Beispieldaten', () => {
    for (const product of products) {
      expect(product.isDemoData).toBe(true);
    }
  });

  it('nutzt ausschließlich Beispiel-EANs mit dem Präfix 9900000', () => {
    for (const product of products) {
      expect(product.ean.startsWith('9900000'), `Produkt ${product.slug}`).toBe(true);
      for (const variant of product.variants) {
        expect(variant.ean.startsWith('9900000'), `Variante ${variant.id}`).toBe(true);
      }
    }
  });

  it('hat je Produkt mindestens eine Variante, ein Bild und Sicherheitshinweise', () => {
    for (const product of products) {
      expect(product.variants.length, `Produkt ${product.slug}`).toBeGreaterThan(0);
      expect(product.images.length, `Produkt ${product.slug}`).toBeGreaterThan(0);
      expect(product.safetyNotes.length, `Produkt ${product.slug}`).toBeGreaterThan(0);
    }
  });

  it('summiert den Produktbestand aus den Varianten', () => {
    for (const product of products) {
      const sum = product.variants.reduce((total, variant) => total + variant.stock, 0);
      expect(product.stock).toBe(sum);
    }
  });
});

describe('Übungen, Tape-Anleitungen und Programme', () => {
  it('verweist in Übungen nur auf existierende Slugs', () => {
    for (const exercise of exercises) {
      expectAllIn(exercise.bodyRegionSlugs, regionSlugs, `Übung ${exercise.slug}`);
      expectAllIn(exercise.goalSlugs, goalSlugs, `Übung ${exercise.slug}`);
      expectAllIn(exercise.sportSlugs, sportSlugs, `Übung ${exercise.slug}`);
      expectAllIn(exercise.relatedProductSlugs, productSlugs, `Übung ${exercise.slug}`);
    }
  });

  it('verweist in Tape-Anleitungen nur auf existierende Slugs', () => {
    for (const guide of tapeGuides) {
      expect(regionSlugs.has(guide.bodyRegionSlug), `Anleitung ${guide.slug}`).toBe(true);
      expectAllIn(guide.relatedProductSlugs, productSlugs, `Anleitung ${guide.slug}`);
      expect(guide.steps.length, `Anleitung ${guide.slug}`).toBeGreaterThan(0);
      expect(guide.contraindications.length, `Anleitung ${guide.slug}`).toBeGreaterThan(0);
    }
  });

  it('verweist in Back-to-Sport-Programmen nur auf existierende Slugs', () => {
    for (const program of backToSportPrograms) {
      expect(sportSlugs.has(program.sportSlug), `Programm ${program.slug}`).toBe(true);
      expectAllIn(program.relatedRegionSlugs, regionSlugs, `Programm ${program.slug}`);
      for (const phase of program.phases) {
        expectAllIn(phase.exerciseSlugs, exerciseSlugs, `Programm ${program.slug}/${phase.name}`);
        expectAllIn(phase.productSlugs, productSlugs, `Programm ${program.slug}/${phase.name}`);
      }
    }
  });

  it('verweist in Guide-Artikeln nur auf existierende Slugs', () => {
    for (const article of guideArticles) {
      expectAllIn(article.relatedProductSlugs, productSlugs, `Artikel ${article.slug}`);
      expectAllIn(article.relatedCategorySlugs, categorySlugs, `Artikel ${article.slug}`);
    }
  });

  it('verweist in Sportarten nur auf existierende Regionen und Programme', () => {
    const programSlugs = new Set(backToSportPrograms.map((program) => program.slug));
    for (const sport of sports) {
      expectAllIn(sport.focusRegionSlugs, regionSlugs, `Sportart ${sport.slug}`);
      if (sport.backToSportSlug) {
        expect(programSlugs.has(sport.backToSportSlug), `Sportart ${sport.slug}`).toBe(true);
      }
    }
  });
});

describe('Hersteller', () => {
  it('sind ausnahmslos als Platzhalter gekennzeichnet und nicht kontaktiert', () => {
    for (const manufacturer of manufacturers) {
      expect(manufacturer.isPlaceholder).toBe(true);
      expect(manufacturer.status).toBe('nicht-kontaktiert');
    }
  });

  it('enthält keine erfundenen Kontaktdaten', () => {
    for (const manufacturer of manufacturers) {
      expect(manufacturer.email).toBe('');
      expect(manufacturer.phone).toBe('');
      expect(manufacturer.website).toBe('');
      expect(manufacturer.contactName).toBe('');
    }
  });

  it('verweist nur auf existierende Kategorien', () => {
    for (const manufacturer of manufacturers) {
      expectAllIn(manufacturer.productCategories, categorySlugs, manufacturer.id);
    }
  });
});
