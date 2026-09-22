/**
 * FEHLERTOLERANTE SUCHE
 * ---------------------------------------------------------------------------
 * Die Suche durchsucht Produkte UND redaktionelle Inhalte (Körperregionen,
 * Beschwerden, Ziele, Sportarten, Übungen, Tape-Anleitungen, Back-to-Sport).
 *
 * Toleranz entsteht durch drei Mechanismen:
 *   1. Normalisierung (Umlaute, Groß-/Kleinschreibung, Sonderzeichen)
 *   2. Synonym- und Umgangssprache-Mapping ("Knieschmerzen" → knie + schmerz)
 *   3. Levenshtein-Distanz für Tippfehler ("Massagepistole" vs. "Massagepistol")
 *
 * Für einen größeren Katalog lässt sich diese Schicht später gegen eine
 * Suchmaschine (Typesense, Meilisearch, Algolia) tauschen – die Signatur von
 * `search()` bleibt dabei gleich.
 */

import { normalize } from './format';
import {
  getBackToSportPrograms,
  getBodyRegions,
  getCategories,
  getConditions,
  getExercises,
  getGoals,
  getProducts,
  getSports,
  getTapeGuides,
} from './catalog';
import { purposeLabels } from './labels';
import type { SearchDocument, SearchResult } from './types';

/**
 * Synonyme und umgangssprachliche Begriffe.
 * Key = normalisierter Suchbegriff, Value = zusätzliche Suchbegriffe.
 */
export const synonyms: Record<string, string[]> = {
  knieschmerzen: ['knie', 'schmerz', 'patella', 'bandage'],
  knieschmerz: ['knie', 'schmerz', 'patella'],
  kniebandage: ['knie', 'bandage', 'support'],
  meniskus: ['knie', 'meniskusthemen', 'bandage'],
  kreuzband: ['knie', 'instabilitaet', 'return to sport'],
  patella: ['knie', 'kniescheibe', 'patellabeschwerden'],
  kniescheibe: ['patella', 'knie'],
  achillessehne: ['achilles', 'sehne', 'wade', 'laufen'],
  achillessehnenentzündung: ['achillessehne', 'ueberlastung'],
  umgeknickt: ['sprunggelenk', 'umknickverletzung', 'bandage'],
  umknicken: ['sprunggelenk', 'umknickverletzung'],
  bandriss: ['sprunggelenk', 'instabilitaet'],
  fersensporn: ['ferse', 'fusssohle', 'fersenbelastung'],
  plantarfasziitis: ['ferse', 'fusssohle', 'fuss'],
  hexenschuss: ['ruecken', 'lendenwirbelsaeule', 'verspannung'],
  ischias: ['ruecken', 'lendenwirbelsaeule'],
  rückenschmerzen: ['ruecken', 'verspannung', 'lendenwirbelsaeule'],
  nackenschmerzen: ['nacken', 'verspannung', 'schulter'],
  tennisarm: ['ellenbogen', 'ueberlastung', 'spange'],
  golferarm: ['ellenbogen', 'ueberlastung', 'unterarm'],
  mausarm: ['unterarm', 'handgelenk', 'ueberlastung'],
  schulterschmerzen: ['schulter', 'ueberlastung', 'stabilisierung'],
  impingement: ['schulter', 'ueberlastung', 'beweglichkeit'],
  zerrung: ['muskel', 'oberschenkel', 'wade', 'regeneration'],
  muskelkater: ['regeneration', 'faszienrolle', 'massage'],
  verspannung: ['massage', 'faszienrolle', 'regeneration'],
  faszien: ['faszienrolle', 'massage', 'regeneration'],
  blackroll: ['faszienrolle', 'massage'],
  massagegun: ['massagepistole', 'massage', 'recovery'],
  massagepistole: ['massage', 'recovery', 'perkussion'],
  theraband: ['trainingsband', 'uebungsband', 'widerstandsband'],
  gummiband: ['trainingsband', 'theraband', 'loop'],
  widerstandsband: ['trainingsband', 'resistance band'],
  gymnastikball: ['pezziball', 'balance'],
  sitzball: ['pezziball', 'gymnastikball'],
  bosu: ['balance halbball', 'balance trainer'],
  wackelbrett: ['balance', 'kreisel', 'propriozeption'],
  kreisel: ['wackelbrett', 'sprunggelenk'],
  fusstraining: ['fuss', 'fussmuskulatur', 'sensomotorik', 'strong feet'],
  barfuß: ['fuss', 'fussmuskulatur', 'sensomotorik'],
  plattfuss: ['fuss', 'fussgewoelbe', 'fusstraining'],
  senkfuss: ['fuss', 'fussgewoelbe', 'fusstraining'],
  tape: ['kinesiologie', 'taping', 'sporttape'],
  kinesiotape: ['kinesiologie tape', 'tape'],
  tapen: ['tape', 'taping', 'tape yourself'],
  ems: ['elektrostimulation', 'muskelstimulation'],
  tens: ['elektrostimulation', 'nervenstimulation'],
  reha: ['rehabilitation', 'return to sport', 'uebungen'],
  physio: ['uebungen', 'rehabilitation'],
  yogamatte: ['yoga', 'matte', 'mobility'],
  dehnen: ['mobilitaet', 'stretching', 'mobility'],
  beweglichkeit: ['mobilitaet', 'mobility', 'dehnen'],
  gleichgewicht: ['balance', 'koordination', 'propriozeption'],
  laufen: ['running', 'joggen', 'laufsport'],
  joggen: ['laufen', 'running'],
  running: ['laufen'],
};

/* --------------------------------------------------------- Index-Erstellung */

let cachedIndex: SearchDocument[] | null = null;

/** Baut den Suchindex aus allen Inhaltstypen (einmalig, danach gecached). */
export function buildSearchIndex(): SearchDocument[] {
  if (cachedIndex) return cachedIndex;

  const documents: SearchDocument[] = [];

  for (const product of getProducts()) {
    documents.push({
      id: `produkt:${product.slug}`,
      kind: 'produkt',
      title: product.name,
      subtitle: product.shortDescription,
      href: `/produkt/${product.slug}`,
      boost: product.isEditorsPick ? 12 : 10,
      keywords: [
        product.name,
        product.brand,
        product.categorySlug,
        product.subcategorySlug,
        product.shortDescription,
        ...product.bodyRegionSlugs,
        ...product.conditionSlugs,
        ...product.sportSlugs,
        ...product.purposes.map((p) => purposeLabels[p]),
        ...(product.attributes.materials ?? []),
        ...(product.attributes.colors ?? []),
        ...product.whatItDös,
        ...product.useCases,
      ],
    });
  }

  for (const category of getCategories()) {
    documents.push({
      id: `kategorie:${category.slug}`,
      kind: 'kategorie',
      title: category.name,
      subtitle: category.tagline,
      href: `/shop/${category.slug}`,
      boost: 8,
      keywords: [
        category.name,
        category.tagline,
        category.description,
        ...category.subcategories.map((sub) => sub.name),
      ],
    });
  }

  for (const region of getBodyRegions()) {
    documents.push({
      id: `koerperregion:${region.slug}`,
      kind: 'koerperregion',
      title: region.name,
      subtitle: region.teaser,
      href: `/koerper/${region.slug}`,
      boost: 9,
      keywords: [region.name, region.shortName, region.teaser, ...region.typicalTopics],
    });
  }

  for (const condition of getConditions()) {
    documents.push({
      id: `beschwerde:${condition.slug}`,
      kind: 'beschwerde',
      title: condition.name,
      subtitle: condition.teaser,
      href: `/beschwerden/${condition.slug}`,
      boost: 9,
      keywords: [condition.name, condition.teaser, condition.regionSlug, ...condition.focusPoints],
    });
  }

  for (const goal of getGoals()) {
    documents.push({
      id: `ziel:${goal.slug}`,
      kind: 'ziel',
      title: goal.name,
      subtitle: goal.claim,
      href: `/ziel/${goal.slug}`,
      boost: 7,
      keywords: [goal.name, goal.claim, goal.description],
    });
  }

  for (const sport of getSports()) {
    documents.push({
      id: `sportart:${sport.slug}`,
      kind: 'sportart',
      title: sport.name,
      subtitle: sport.teaser,
      href: `/sport/${sport.slug}`,
      boost: 7,
      keywords: [sport.name, sport.teaser, sport.description],
    });
  }

  for (const exercise of getExercises()) {
    documents.push({
      id: `uebung:${exercise.slug}`,
      kind: 'uebung',
      title: exercise.name,
      subtitle: exercise.teaser,
      href: `/uebungen/${exercise.slug}`,
      boost: 6,
      keywords: [
        exercise.name,
        exercise.teaser,
        ...exercise.bodyRegionSlugs,
        ...exercise.equipment,
        ...exercise.goalSlugs,
      ],
    });
  }

  for (const guide of getTapeGuides()) {
    documents.push({
      id: `tape:${guide.slug}`,
      kind: 'tape-anleitung',
      title: guide.name,
      subtitle: guide.teaser,
      href: `/tape-yourself/${guide.slug}`,
      boost: 8,
      keywords: [guide.name, guide.teaser, guide.bodyRegionSlug, 'tapen', 'tape', 'anleitung'],
    });
  }

  for (const program of getBackToSportPrograms()) {
    documents.push({
      id: `b2s:${program.slug}`,
      kind: 'back-to-sport',
      title: program.name,
      subtitle: program.claim,
      href: `/back-to-sport/${program.slug}`,
      boost: 7,
      keywords: [program.name, program.claim, program.sportSlug, 'return to sport', 'wiedereinstieg'],
    });
  }

  cachedIndex = documents;
  return documents;
}

/* ---------------------------------------------------------- Scoring-Helfer */

/** Levenshtein-Distanz mit frühem Abbruch bei Überschreitung von `max`. */
export function levenshtein(a: string, b: string, max = 3): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min(
        (current[j - 1] ?? 0) + 1,
        (previous[j] ?? 0) + 1,
        (previous[j - 1] ?? 0) + cost,
      );
      current[j] = value;
      if (value < rowMin) rowMin = value;
    }
    if (rowMin > max) return max + 1;
    previous = current;
  }

  return previous[b.length] ?? max + 1;
}

/** Erlaubte Tippfehler-Distanz abhängig von der Wortlänge. */
function allowedDistance(term: string): number {
  if (term.length <= 3) return 0;
  if (term.length <= 6) return 1;
  return 2;
}

/** Erweitert die Suchbegriffe um Synonyme. */
export function expandTerms(query: string): string[] {
  const normalized = normalize(query);
  if (!normalized) return [];

  const terms = new Set<string>();
  for (const term of normalized.split(' ')) {
    if (term.length < 2) continue;
    terms.add(term);
    for (const synonym of synonyms[term] ?? []) {
      for (const part of normalize(synonym).split(' ')) {
        if (part.length >= 2) terms.add(part);
      }
    }
  }

  // Ganze Phrase ebenfalls als Synonymschlüssel prüfen ("tape knie").
  const phraseKey = normalized.replace(/\s+/g, '');
  for (const synonym of synonyms[phraseKey] ?? []) {
    for (const part of normalize(synonym).split(' ')) terms.add(part);
  }

  return [...terms];
}

/** Bewertet ein Dokument gegen die (bereits erweiterten) Suchbegriffe. */
function scoreDocument(
  document: SearchDocument,
  originalTerms: string[],
  expandedTerms: string[],
): { score: number; matchedTerms: string[] } {
  const haystackTokens = new Set<string>();
  const titleTokens = new Set(normalize(document.title).split(' '));

  for (const keyword of [document.title, document.subtitle, ...document.keywords]) {
    for (const token of normalize(keyword).split(' ')) {
      if (token.length >= 2) haystackTokens.add(token);
    }
  }

  let score = 0;
  const matchedTerms: string[] = [];

  for (const term of expandedTerms) {
    const isOriginal = originalTerms.includes(term);
    const weight = isOriginal ? 1 : 0.55;
    let termScore = 0;

    if (titleTokens.has(term)) {
      termScore = 26;
    } else if (haystackTokens.has(term)) {
      termScore = 14;
    } else {
      // Präfix-Treffer (Tippen während der Eingabe).
      let prefixHit = false;
      for (const token of titleTokens) {
        if (token.startsWith(term) && term.length >= 3) {
          termScore = 18;
          prefixHit = true;
          break;
        }
      }
      if (!prefixHit) {
        for (const token of haystackTokens) {
          if (token.startsWith(term) && term.length >= 3) {
            termScore = 9;
            prefixHit = true;
            break;
          }
        }
      }
      // Tippfehler-Toleranz.
      if (!prefixHit) {
        const max = allowedDistance(term);
        if (max > 0) {
          for (const token of haystackTokens) {
            const distance = levenshtein(term, token, max);
            if (distance <= max) {
              termScore = Math.max(termScore, 8 - distance * 2);
              break;
            }
          }
        }
      }
    }

    if (termScore > 0) {
      score += termScore * weight;
      if (isOriginal) matchedTerms.push(term);
    }
  }

  return { score, matchedTerms };
}

/* ----------------------------------------------------------------- Suche */

export interface SearchOptions {
  limit?: number;
  kinds?: SearchResult['kind'][];
}

/** Hauptsuchfunktion. Liefert Produkte UND redaktionelle Inhalte. */
export function search(query: string, options: SearchOptions = {}): SearchResult[] {
  const { limit = 40, kinds } = options;
  const originalTerms = normalize(query).split(' ').filter((term) => term.length >= 2);
  if (originalTerms.length === 0) return [];

  const expandedTerms = expandTerms(query);
  const index = buildSearchIndex();

  const results: SearchResult[] = [];

  for (const document of index) {
    if (kinds && !kinds.includes(document.kind)) continue;
    const { score, matchedTerms } = scoreDocument(document, originalTerms, expandedTerms);
    if (score <= 0) continue;

    // Alle ursprünglichen Begriffe getroffen? Dann deutlich höher werten.
    const coverage = matchedTerms.length / originalTerms.length;
    const total = score * (0.6 + 0.8 * coverage) + document.boost;

    results.push({ ...document, score: total, matchedTerms });
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'de'))
    .slice(0, limit);
}

/** Gruppiert Ergebnisse nach Typ (Produkte vs. Inhalte) für die Ergebnisseite. */
export function groupResults(results: SearchResult[]) {
  const products = results.filter((result) => result.kind === 'produkt');
  const content = results.filter((result) => result.kind !== 'produkt');
  return { products, content };
}

/** Vorschläge für leere Suche / keine Treffer. */
export const popularSearches = [
  'Knieschmerzen',
  'Kniebandage',
  'Sprunggelenk',
  'Achillessehne',
  'Tape Knie',
  'Massagepistole',
  'Fußtraining',
  'Balance Pad',
  'Miniband',
  'Faszienrolle',
];
