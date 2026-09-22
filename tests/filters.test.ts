import { describe, expect, it } from 'vitest';
import {
  applyFilters,
  buildFilterGroups,
  buildQueryString,
  countActiveFilters,
  parseFilterState,
  parseSortKey,
  sortProducts,
  toggleFilterValü,
  valuesFor,
} from '@/lib/filters';
import { getCategory, getProducts, getProductsByCategory } from '@/lib/catalog';

/**
 * Die Filterlogik ist das Herzstück der Produktsuche – entsprechend
 * gründlich getestet, vor allem die Regel "nur relevante Filter anzeigen".
 */

describe('valuesFor', () => {
  it('liest Ausprägungen je Filterart aus dem Produkt', () => {
    const product = getProducts().find((entry) => entry.slug === 'kniebandage-aktiv')!;
    expect(valuesFor(product, 'bodyRegion')).toContain('knie');
    expect(valuesFor(product, 'size')).toContain('M');
    expect(valuesFor(product, 'gender')).toEqual(['unisex']);
    expect(valuesFor(product, 'brand')).toEqual([product.brand]);
  });

  it('ordnet jedes Produkt genau einem Preis-Bucket zu', () => {
    for (const product of getProducts()) {
      expect(valuesFor(product, 'price')).toHaveLength(1);
    }
  });
});

describe('buildFilterGroups', () => {
  it('blendet Filter mit weniger als zwei Ausprägungen aus', () => {
    const products = getProductsByCategory('bandagen-support');
    const groups = buildFilterGroups(products, ['gender', 'bodyRegion', 'size']);

    // Alle Bandagen in den Beispieldaten sind unisex – der Filter hilft nicht.
    expect(groups.some((group) => group.key === 'gender')).toBe(false);
    expect(groups.some((group) => group.key === 'bodyRegion')).toBe(true);
  });

  it('zeigt bei Trainingsbändern Widerstand statt Größe', () => {
    const category = getCategory('trainingsbaender')!;
    const groups = buildFilterGroups(
      getProductsByCategory('trainingsbaender'),
      category.filterKeys,
    );
    const keys = groups.map((group) => group.key);

    expect(keys).toContain('resistance');
    expect(keys).not.toContain('gender');
  });

  it('zeigt bei Bekleidung Geschlecht, Größe und Farbe', () => {
    const category = getCategory('sport-lifestyle')!;
    const keys = buildFilterGroups(
      getProductsByCategory('sport-lifestyle'),
      category.filterKeys,
    ).map((group) => group.key);

    expect(keys).toContain('gender');
    expect(keys).toContain('size');
    expect(keys).toContain('color');
  });

  it('zählt korrekt, wie viele Produkte eine Option haben', () => {
    const products = getProductsByCategory('bandagen-support');
    const groups = buildFilterGroups(products, ['bodyRegion']);
    const knee = groups[0]?.options.find((option) => option.value === 'knie');

    expect(knee?.count).toBe(
      products.filter((product) => product.bodyRegionSlugs.includes('knie')).length,
    );
  });

  it('sortiert Größen nach Konfektion statt alphabetisch', () => {
    const groups = buildFilterGroups(getProducts(), ['size']);
    const values = groups[0]!.options.map((option) => option.value);
    const sIndex = values.indexOf('S');
    const mIndex = values.indexOf('M');
    const lIndex = values.indexOf('L');

    expect(sIndex).toBeLessThan(mIndex);
    expect(mIndex).toBeLessThan(lIndex);
  });

  it('sortiert Widerstandsstufen von leicht nach stark', () => {
    const groups = buildFilterGroups(getProducts(), ['resistance']);
    const values = groups[0]!.options.map((option) => option.value);

    expect(values.indexOf('leicht')).toBeLessThan(values.indexOf('mittel'));
    expect(values.indexOf('mittel')).toBeLessThan(values.indexOf('stark'));
  });
});

describe('applyFilters', () => {
  const products = getProducts();

  it('gibt ohne Filter alles zurück', () => {
    expect(applyFilters(products, {})).toHaveLength(products.length);
  });

  it('verknüpft Werte innerhalb eines Filters mit ODER', () => {
    const result = applyFilters(products, { bodyRegion: ['knie', 'sprunggelenk'] });
    expect(
      result.every(
        (product) =>
          product.bodyRegionSlugs.includes('knie') ||
          product.bodyRegionSlugs.includes('sprunggelenk'),
      ),
    ).toBe(true);
    expect(result.length).toBeGreaterThan(
      applyFilters(products, { bodyRegion: ['knie'] }).length,
    );
  });

  it('verknüpft verschiedene Filter mit UND', () => {
    const result = applyFilters(products, {
      bodyRegion: ['knie'],
      purpose: ['stabilisieren'],
    });
    expect(
      result.every(
        (product) =>
          product.bodyRegionSlugs.includes('knie') && product.purposes.includes('stabilisieren'),
      ),
    ).toBe(true);
  });

  it('liefert bei unmöglichen Kombinationen ein leeres Ergebnis', () => {
    expect(applyFilters(products, { bodyRegion: ['knie'], size: ['XXXL'] })).toHaveLength(0);
  });

  it('ignoriert leere Filterlisten', () => {
    expect(applyFilters(products, { bodyRegion: [] })).toHaveLength(products.length);
  });
});

describe('sortProducts', () => {
  const products = getProducts();

  it('sortiert nach Preis aufsteigend', () => {
    const sorted = sortProducts(products, 'preis-auf');
    for (let i = 1; i < sorted.length; i += 1) {
      expect(sorted[i]!.priceCents).toBeGreaterThanOrEqual(sorted[i - 1]!.priceCents);
    }
  });

  it('sortiert nach Preis absteigend', () => {
    const sorted = sortProducts(products, 'preis-ab');
    for (let i = 1; i < sorted.length; i += 1) {
      expect(sorted[i]!.priceCents).toBeLessThanOrEqual(sorted[i - 1]!.priceCents);
    }
  });

  it('stellt bei "empfohlen" die redaktionellen Favoriten nach vorn', () => {
    const sorted = sortProducts(products, 'empfohlen');
    const lastPick = sorted.findLastIndex((product) => product.isEditorsPick);
    const firstOther = sorted.findIndex((product) => !product.isEditorsPick);
    expect(lastPick).toBeLessThan(firstOther);
  });

  it('verändert die Eingabeliste nicht', () => {
    const before = products.map((product) => product.slug);
    sortProducts(products, 'preis-ab');
    expect(products.map((product) => product.slug)).toEqual(before);
  });
});

describe('URL-Anbindung', () => {
  it('liest den Filterzustand aus den Query-Parametern', () => {
    const state = parseFilterState({ koerperregion: 'knie,sprunggelenk', groesse: 'M' });
    expect(state.bodyRegion).toEqual(['knie', 'sprunggelenk']);
    expect(state.size).toEqual(['M']);
  });

  it('ignoriert unbekannte und leere Parameter', () => {
    const state = parseFilterState({ unsinn: 'wert', groesse: '' });
    expect(state).toEqual({});
  });

  it('erzeugt aus dem Zustand wieder einen Query-String', () => {
    const query = buildQueryString({ bodyRegion: ['knie'], size: ['M', 'L'] }, 'preis-auf');
    expect(query).toContain('koerperregion=knie');
    expect(query).toContain('groesse=M%2CL');
    expect(query).toContain('sortierung=preis-auf');
  });

  it('lässt die Standardsortierung aus dem Query-String weg', () => {
    expect(buildQueryString({}, 'empfohlen')).toBe('');
  });

  it('ist verlustfrei: parse(build(state)) === state', () => {
    const state = { bodyRegion: ['knie', 'huefte'], purpose: ['stabilisieren'] };
    const query = buildQueryString(state);
    const params = Object.fromEntries(new URLSearchParams(query.slice(1)));
    expect(parseFilterState(params)).toEqual(state);
  });

  it('fällt bei unbekannter Sortierung auf "empfohlen" zurück', () => {
    expect(parseSortKey({ sortierung: 'quatsch' })).toBe('empfohlen');
    expect(parseSortKey({})).toBe('empfohlen');
    expect(parseSortKey({ sortierung: 'preis-ab' })).toBe('preis-ab');
  });
});

describe('toggleFilterValü', () => {
  it('fügt einen Wert hinzu', () => {
    expect(toggleFilterValü({}, 'size', 'M')).toEqual({ size: ['M'] });
  });

  it('entfernt einen bereits gesetzten Wert', () => {
    expect(toggleFilterValü({ size: ['M', 'L'] }, 'size', 'M')).toEqual({ size: ['L'] });
  });

  it('entfernt den Filter komplett, wenn kein Wert übrig bleibt', () => {
    expect(toggleFilterValü({ size: ['M'] }, 'size', 'M')).toEqual({});
  });

  it('verändert den ursprünglichen Zustand nicht', () => {
    const state = { size: ['M'] };
    toggleFilterValü(state, 'size', 'L');
    expect(state).toEqual({ size: ['M'] });
  });
});

describe('countActiveFilters', () => {
  it('zählt alle ausgewählten Werte', () => {
    expect(countActiveFilters({ size: ['M', 'L'], bodyRegion: ['knie'] })).toBe(3);
    expect(countActiveFilters({})).toBe(0);
  });
});
