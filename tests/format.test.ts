import { describe, expect, it } from 'vitest';
import {
  discountPercent,
  formatDeliveryDays,
  formatPrice,
  initialLetter,
  normalize,
  slugify,
  truncate,
  vatAmountCents,
} from '@/lib/format';

describe('formatPrice', () => {
  it('formatiert Cent-Beträge als Euro', () => {
    expect(formatPrice(3995)).toMatch(/39,95/);
    expect(formatPrice(0)).toMatch(/0,00/);
  });
});

describe('vatAmountCents', () => {
  it('berechnet den im Bruttopreis enthaltenen Steueranteil', () => {
    expect(vatAmountCents(11900, 19)).toBe(1900);
    expect(vatAmountCents(10700, 7)).toBe(700);
  });
});

describe('discountPercent', () => {
  it('berechnet den Abschlag gegenüber der UVP', () => {
    expect(discountPercent(8000, 10000)).toBe(20);
  });

  it('liefert null, wenn es keinen Vorteil gibt', () => {
    expect(discountPercent(10000, 10000)).toBeNull();
    expect(discountPercent(10000)).toBeNull();
    expect(discountPercent(10000, 9000)).toBeNull();
  });
});

describe('formatDeliveryDays', () => {
  it('formatiert Spannen und Einzelwerte', () => {
    expect(formatDeliveryDays([2, 4])).toBe('2–4 Werktage');
    expect(formatDeliveryDays([3, 3])).toBe('3 Werktage');
  });
});

describe('normalize', () => {
  it('faltet Umlaute und Sonderzeichen', () => {
    expect(normalize('Füße')).toBe('fuesse');
    expect(normalize('Grüß-Gott!')).toBe('gruess gott');
    expect(normalize('  Knie  ')).toBe('knie');
  });

  it('ist idempotent', () => {
    const once = normalize('Achillessehne & Wade');
    expect(normalize(once)).toBe(once);
  });
});

describe('slugify', () => {
  it('erzeugt URL-taugliche Slugs', () => {
    expect(slugify('Kniebandage AKTIV')).toBe('kniebandage-aktiv');
    expect(slugify('Füße & Sprunggelenk')).toBe('fuesse-sprunggelenk');
  });
});

describe('truncate', () => {
  it('kürzt nur bei Bedarf', () => {
    expect(truncate('kurz', 10)).toBe('kurz');
    expect(truncate('viel zu langer Text', 10)).toHaveLength(10);
    expect(truncate('viel zu langer Text', 10).endsWith('…')).toBe(true);
  });
});

describe('initialLetter', () => {
  it('liefert den Anfangsbuchstaben für die A–Z-Navigation', () => {
    expect(initialLetter('Kniebandage')).toBe('K');
    expect(initialLetter('Übungsbuch')).toBe('U');
    expect(initialLetter('3D-Balance')).toBe('#');
  });
});
