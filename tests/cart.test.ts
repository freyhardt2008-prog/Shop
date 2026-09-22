import { describe, expect, it } from 'vitest';
import {
  addLine,
  calculateTotals,
  generateOrderNumber,
  removeLine,
  resolveCartLines,
  setLineQuantity,
} from '@/lib/commerce/cart';
import { FREE_SHIPPING_THRESHOLD_CENTS, shippingCostCents } from '@/lib/commerce/shipping';
import { getProduct } from '@/lib/catalog';
import type { CartLine } from '@/lib/types';

const knee = getProduct('kniebandage-aktiv')!;
const kneeVariant = knee.variants[0]!;
const book = getProduct('uebungsbuch-reha')!; // 7 % MwSt.
const bookVariant = book.variants[0]!;

function line(productSlug: string, variantId: string, quantity = 1): CartLine {
  return { productSlug, variantId, quantity };
}

describe('addLine', () => {
  it('legt eine neue Zeile an', () => {
    const result = addLine([], line(knee.slug, kneeVariant.id));
    expect(result).toHaveLength(1);
    expect(result[0]?.quantity).toBe(1);
  });

  it('erhöht die Menge bei identischer Variante', () => {
    const first = addLine([], line(knee.slug, kneeVariant.id, 2));
    const second = addLine(first, line(knee.slug, kneeVariant.id, 3));
    expect(second).toHaveLength(1);
    expect(second[0]?.quantity).toBe(5);
  });

  it('hält unterschiedliche Varianten auseinander', () => {
    const second = knee.variants[1]!;
    const result = addLine(addLine([], line(knee.slug, kneeVariant.id)), line(knee.slug, second.id));
    expect(result).toHaveLength(2);
  });

  it('erzwingt eine Mindestmenge von 1', () => {
    expect(addLine([], line(knee.slug, kneeVariant.id, 0))[0]?.quantity).toBe(1);
  });
});

describe('setLineQuantity / removeLine', () => {
  const start = addLine([], line(knee.slug, kneeVariant.id, 2));

  it('setzt die Menge', () => {
    expect(setLineQuantity(start, knee.slug, kneeVariant.id, 5)[0]?.quantity).toBe(5);
  });

  it('entfernt die Zeile bei Menge 0', () => {
    expect(setLineQuantity(start, knee.slug, kneeVariant.id, 0)).toHaveLength(0);
  });

  it('entfernt gezielt eine Zeile', () => {
    expect(removeLine(start, knee.slug, kneeVariant.id)).toHaveLength(0);
    expect(removeLine(start, knee.slug, 'gibt-es-nicht')).toHaveLength(1);
  });
});

describe('resolveCartLines', () => {
  it('reichert Zeilen mit Produkt, Variante und Summen an', () => {
    const resolved = resolveCartLines([line(knee.slug, kneeVariant.id, 2)]);
    expect(resolved).toHaveLength(1);
    expect(resolved[0]?.product.slug).toBe(knee.slug);
    expect(resolved[0]?.lineTotalCents).toBe(resolved[0]!.unitPriceCents * 2);
  });

  it('ignoriert unbekannte Produkte und Varianten', () => {
    expect(resolveCartLines([line('gibt-es-nicht', 'x')])).toHaveLength(0);
    expect(resolveCartLines([line(knee.slug, 'gibt-es-nicht')])).toHaveLength(0);
  });

  it('rundet gebrochene Mengen ab und hält mindestens 1', () => {
    expect(resolveCartLines([line(knee.slug, kneeVariant.id, 2.7)])[0]?.quantity).toBe(2);
    expect(resolveCartLines([line(knee.slug, kneeVariant.id, -3)])[0]?.quantity).toBe(1);
  });
});

describe('calculateTotals', () => {
  it('liefert für einen leeren Warenkorb Nullwerte ohne Versandkosten', () => {
    const totals = calculateTotals([], 'standard');
    expect(totals.itemCount).toBe(0);
    expect(totals.subtotalCents).toBe(0);
    expect(totals.shippingCents).toBe(0);
    expect(totals.totalCents).toBe(0);
  });

  it('summiert Zwischensumme, Versand und Gesamt', () => {
    const resolved = resolveCartLines([line(knee.slug, kneeVariant.id, 1)]);
    const totals = calculateTotals(resolved, 'standard');
    expect(totals.subtotalCents).toBe(resolved[0]!.lineTotalCents);
    expect(totals.totalCents).toBe(totals.subtotalCents + totals.shippingCents);
  });

  it('liefert Standardversand ab der Freigrenze kostenfrei', () => {
    const resolved = resolveCartLines([line(knee.slug, kneeVariant.id, 3)]);
    const totals = calculateTotals(resolved, 'standard');
    expect(totals.subtotalCents).toBeGreaterThanOrEqual(FREE_SHIPPING_THRESHOLD_CENTS);
    expect(totals.shippingCents).toBe(0);
    expect(totals.amountToFreeShippingCents).toBe(0);
  });

  it('berechnet Expressversand auch oberhalb der Freigrenze', () => {
    const resolved = resolveCartLines([line(knee.slug, kneeVariant.id, 3)]);
    expect(calculateTotals(resolved, 'express').shippingCents).toBeGreaterThan(0);
  });

  it('zeigt an, wie viel bis zum kostenfreien Versand fehlt', () => {
    const resolved = resolveCartLines([line(book.slug, bookVariant.id, 1)]);
    const totals = calculateTotals(resolved, 'standard');
    expect(totals.amountToFreeShippingCents).toBe(
      FREE_SHIPPING_THRESHOLD_CENTS - totals.subtotalCents,
    );
  });

  it('schlüsselt die Mehrwertsteuer nach Satz auf', () => {
    const resolved = resolveCartLines([
      line(knee.slug, kneeVariant.id, 1),
      line(book.slug, bookVariant.id, 1),
    ]);
    const totals = calculateTotals(resolved, 'abholung');
    const rates = totals.vatBreakdown.map((entry) => entry.rate);

    expect(rates).toContain(19);
    expect(rates).toContain(7);
    expect(totals.vatBreakdown.every((entry) => entry.amountCents > 0)).toBe(true);
  });

  it('weist die im Bruttopreis enthaltene MwSt. korrekt aus', () => {
    const resolved = resolveCartLines([line(book.slug, bookVariant.id, 1)]);
    const totals = calculateTotals(resolved, 'abholung');
    const expected = Math.round(
      totals.subtotalCents - totals.subtotalCents / 1.07,
    );
    expect(totals.vatBreakdown[0]?.amountCents).toBe(expected);
  });

  it('zählt die Artikelmenge über alle Zeilen', () => {
    const resolved = resolveCartLines([
      line(knee.slug, kneeVariant.id, 2),
      line(book.slug, bookVariant.id, 3),
    ]);
    expect(calculateTotals(resolved).itemCount).toBe(5);
  });
});

describe('shippingCostCents', () => {
  it('ist für Abholung immer kostenfrei', () => {
    expect(shippingCostCents('abholung', 0)).toBe(0);
  });

  it('berechnet Standardversand unterhalb der Freigrenze', () => {
    expect(shippingCostCents('standard', 1000)).toBeGreaterThan(0);
  });
});

describe('generateOrderNumber', () => {
  it('folgt dem Format HA-JJMMTT-XXXX', () => {
    const number = generateOrderNumber(new Date('2026-03-07T10:00:00Z'));
    expect(number).toMatch(/^HA-260307-\d{4}$/);
  });
});
