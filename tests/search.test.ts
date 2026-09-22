import { describe, expect, it } from 'vitest';
import { expandTerms, groupResults, levenshtein, search } from '@/lib/search';

/** Die Suche muss vor allem eines: Umgangssprache und Tippfehler verzeihen. */

describe('levenshtein', () => {
  it('erkennt identische Zeichenketten', () => {
    expect(levenshtein('knie', 'knie')).toBe(0);
  });

  it('zählt einzelne Änderungen', () => {
    expect(levenshtein('knie', 'knei')).toBe(2); // Transposition = 2 Ersetzungen
    expect(levenshtein('tape', 'tap')).toBe(1);
  });

  it('bricht bei zu grossem Abstand früh ab', () => {
    expect(levenshtein('knie', 'massagepistole', 2)).toBeGreaterThan(2);
  });
});

describe('expandTerms', () => {
  it('normalisiert Umlaute und Groß-/Kleinschreibung', () => {
    expect(expandTerms('Füße')).toContain('fuesse');
  });

  it('ergänzt Synonyme für umgangssprachliche Begriffe', () => {
    const terms = expandTerms('Knieschmerzen');
    expect(terms).toContain('knieschmerzen');
    expect(terms).toContain('knie');
    expect(terms).toContain('patella');
  });

  it('ignoriert zu kurze Begriffe', () => {
    expect(expandTerms('a')).toHaveLength(0);
  });
});

describe('search', () => {
  it('liefert für eine leere Anfrage nichts', () => {
    expect(search('')).toHaveLength(0);
    expect(search('   ')).toHaveLength(0);
  });

  it('findet Produkte über den Produktnamen', () => {
    const results = search('Kniebandage');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((result) => result.href === '/produkt/kniebandage-aktiv')).toBe(true);
  });

  it('findet redaktionelle Inhalte, nicht nur Produkte', () => {
    const { content } = groupResults(search('Achillessehne'));
    expect(content.length).toBeGreaterThan(0);
    expect(content.some((result) => result.kind === 'koerperregion')).toBe(true);
  });

  it('versteht umgangssprachliche Beschwerden', () => {
    const results = search('Knieschmerzen');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((result) => result.href.includes('knie'))).toBe(true);
  });

  it('findet Themen über Synonyme, die nirgends wörtlich stehen', () => {
    const tennisarm = search('Tennisarm');
    expect(tennisarm.some((result) => result.href.includes('ellenbogen'))).toBe(true);

    const meniskus = search('Meniskus');
    expect(meniskus.some((result) => result.href.includes('knie'))).toBe(true);
  });

  it('verzeiht Tippfehler', () => {
    const results = search('Massagepistol');
    expect(results.some((result) => result.href.includes('massagepistole'))).toBe(true);
  });

  it('findet Tape-Anleitungen über zusammengesetzte Anfragen', () => {
    const results = search('Tape Knie');
    expect(results.some((result) => result.kind === 'tape-anleitung')).toBe(true);
  });

  it('bewertet vollständige Treffer höher als teilweise', () => {
    const results = search('Balance Pad');
    expect(results[0]?.href).toBe('/produkt/balance-pad-sensomotorik');
  });

  it('findet den Fußtraining-Themenbereich', () => {
    const results = search('Fußtraining');
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some((result) => result.href.includes('fuss') || result.href.includes('balance')),
    ).toBe(true);
  });

  it('respektiert das Limit', () => {
    expect(search('knie', { limit: 3 })).toHaveLength(3);
  });

  it('kann auf einen Inhaltstyp eingegrenzt werden', () => {
    const results = search('knie', { kinds: ['produkt'] });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.kind === 'produkt')).toBe(true);
  });

  it('liefert für sinnlose Anfragen keine Treffer', () => {
    expect(search('xqzptrvbn')).toHaveLength(0);
  });
});
