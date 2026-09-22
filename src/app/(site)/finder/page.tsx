import Link from 'next/link';
import { ProductGrid } from '@/components/shop/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import {
  getBodyRegion,
  getBodyRegions,
  getCategories,
  getCategory,
  getGoal,
  getGoals,
  getProducts,
  getSport,
  getSports,
} from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import type { Product } from '@/lib/types';

/**
 * HEAL ACTIVE FINDER
 * ---------------------------------------------------------------------------
 * Geführte Produktsuche in vier Schritten:
 *   1. Wo liegt dein Problem?   → Körperregion
 *   2. Was möchtest du erreichen? → Ziel
 *   3. Welche Sportart?         → optional
 *   4. Welche Produktart?       → optional
 *
 * Bewusst ohne Client-JavaScript: Jeder Schritt ist ein Link, der Zustand
 * steht in der URL. Dadurch ist jeder Zwischenstand teilbar, der Zurück-Button
 * funktioniert wie erwartet und die Seite läuft auch ohne JS.
 *
 * WICHTIG: Der Finder stellt keine Diagnose. Er ordnet lediglich Produkte nach
 * den ausgewählten Merkmalen und zeigt, was inhaltlich dazu passen könnte.
 */

export const metadata = buildMetadata({
  title: 'HEAL ACTIVE Finder – in vier Schritten zum Produkt',
  description:
    'Körperregion, Ziel, Sportart und Produktart auswählen – der Finder zeigt dir Produkte, die zu deiner Situation passen könnten. Keine Diagnose, keine Heilversprechen.',
  path: '/finder',
});

type Search = Record<string, string | string[] | undefined>;

function firstValue(search: Search, key: string): string | undefined {
  const raw = search[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.trim() || undefined;
}

function buildHref(current: Record<string, string | undefined>, key: string, value: string) {
  const params = new URLSearchParams();
  for (const [entryKey, entryValue] of Object.entries(current)) {
    if (entryValue && entryKey !== key) params.set(entryKey, entryValue);
  }
  // Erneutes Klicken auf dieselbe Auswahl hebt sie auf.
  if (current[key] !== value) params.set(key, value);
  const query = params.toString();
  return query ? `/finder?${query}` : '/finder';
}

export default async function FinderPage({ searchParams }: { searchParams: Promise<Search> }) {
  const search = await searchParams;
  const state = {
    region: firstValue(search, 'region'),
    ziel: firstValue(search, 'ziel'),
    sportart: firstValue(search, 'sportart'),
    kategorie: firstValue(search, 'kategorie'),
  };

  const regions = getBodyRegions();
  const goals = getGoals();
  const sports = getSports();
  const categories = getCategories();

  const region = state.region ? getBodyRegion(state.region) : undefined;
  const goal = state.ziel ? getGoal(state.ziel) : undefined;
  const sport = state.sportart ? getSport(state.sportart) : undefined;
  const category = state.kategorie ? getCategory(state.kategorie) : undefined;

  const stepsDone = [region, goal].filter(Boolean).length;
  const showResults = Boolean(region || goal);

  /** Bewertet jedes Produkt nach der Übereinstimmung mit der Auswahl. */
  function scoreProduct(product: Product): number {
    let score = 0;
    if (region && product.bodyRegionSlugs.includes(region.slug)) score += 40;
    if (goal) {
      if (product.goalSlugs.includes(goal.slug)) score += 30;
      if (product.purposes.some((purpose) => goal.purposes.includes(purpose))) score += 20;
    }
    if (sport && product.sportSlugs.includes(sport.slug)) score += 15;
    if (category && product.categorySlug === category.slug) score += 25;
    if (product.isEditorsPick) score += 4;
    return score;
  }

  const results = showResults
    ? getProducts()
        .map((product) => ({ product, score: scoreProduct(product) }))
        .filter((entry) => entry.score >= (category ? 25 : 20))
        .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name, 'de'))
        .slice(0, 12)
        .map((entry) => entry.product)
    : [];

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'HEAL ACTIVE Finder', href: '/finder' }]} />

      <Section>
        <div className="max-w-3xl">
          <p className="ha-eyebrow">HEAL ACTIVE Finder</p>
          <h1 className="mt-3 text-display-lg">Vier Fragen. Eine Richtung.</h1>
          <p className="ha-prose mt-5">
            Beantworte, was du weißt – du musst nicht alles ausfüllen. Schon nach der ersten
            Auswahl siehst du Vorschläge. Der Finder stellt keine Diagnose, sondern sortiert
            Produkte nach den Merkmalen, die du angibst.
          </p>
        </div>

        {/* Fortschritt */}
        <div className="mt-8 flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className={`h-1.5 flex-1 rounded-full ${
                index < Math.max(stepsDone, Object.values(state).filter(Boolean).length)
                  ? 'bg-signal'
                  : 'bg-chalk'
              }`}
            />
          ))}
        </div>

        {/* Schritt 1 */}
        <FinderStep
          number={1}
          title="Wo liegt dein Problem?"
          hint="Wähle die Körperregion, die dich beschäftigt."
          selection={region?.name}
        >
          {regions.map((entry) => (
            <Link
              key={entry.slug}
              href={buildHref(state, 'region', entry.slug)}
              className={`ha-chip ${state.region === entry.slug ? 'ha-chip-active' : ''}`}
            >
              {entry.name}
            </Link>
          ))}
        </FinderStep>

        {/* Schritt 2 */}
        <FinderStep
          number={2}
          title="Was möchtest du erreichen?"
          hint="Ein Ziel genügt – du kannst es jederzeit wechseln."
          selection={goal?.name}
        >
          {goals.map((entry) => (
            <Link
              key={entry.slug}
              href={buildHref(state, 'ziel', entry.slug)}
              className={`ha-chip ${state.ziel === entry.slug ? 'ha-chip-active' : ''}`}
            >
              {entry.name}
            </Link>
          ))}
        </FinderStep>

        {/* Schritt 3 */}
        <FinderStep
          number={3}
          title="Welche Sportart betreibst du?"
          hint="Optional – hilft bei der Feinsortierung."
          selection={sport?.name}
        >
          {sports.map((entry) => (
            <Link
              key={entry.slug}
              href={buildHref(state, 'sportart', entry.slug)}
              className={`ha-chip ${state.sportart === entry.slug ? 'ha-chip-active' : ''}`}
            >
              {entry.name}
            </Link>
          ))}
        </FinderStep>

        {/* Schritt 4 */}
        <FinderStep
          number={4}
          title="Welche Produkte interessieren dich?"
          hint="Optional – grenzt das Ergebnis auf eine Kategorie ein."
          selection={category?.name}
        >
          {categories.map((entry) => (
            <Link
              key={entry.slug}
              href={buildHref(state, 'kategorie', entry.slug)}
              className={`ha-chip ${state.kategorie === entry.slug ? 'ha-chip-active' : ''}`}
            >
              <Icon name={entry.icon} size={15} />
              {entry.name}
            </Link>
          ))}
        </FinderStep>

        {Object.values(state).some(Boolean) && (
          <p className="mt-8">
            <Link href="/finder" className="text-sm font-bold text-signal hover:underline">
              Auswahl zurücksetzen
            </Link>
          </p>
        )}
      </Section>

      {/* Ergebnis */}
      <Section tone="white" id="ergebnis">
        {showResults ? (
          <>
            <p className="ha-eyebrow">Ergebnis</p>
            <h2 className="mt-2 text-display-md">Diese Produkte könnten zu deinem Ziel passen.</h2>
            <p className="ha-prose mt-4 max-w-2xl">
              Sortiert nach Übereinstimmung mit deiner Auswahl
              {region && <> für die Region <strong>{region.name}</strong></>}
              {goal && <> mit dem Ziel <strong>{goal.name}</strong></>}
              {sport && <> im Kontext <strong>{sport.name}</strong></>}. Das ist eine Orientierung,
              keine Diagnose und keine individuelle Empfehlung.
            </p>

            <div className="mt-8">
              {results.length > 0 ? (
                <ProductGrid products={results} priorityCount={4} />
              ) : (
                <p className="ha-card p-8 text-center text-sm text-graphite">
                  Mit dieser Kombination finden wir in den Beispieldaten nichts Passendes. Nimm eine
                  Auswahl heraus – oft hilft es, Sportart oder Kategorie wegzulassen.
                </p>
              )}
            </div>

            {region && (
              <div className="mt-10 rounded-2xl bg-sand p-6 md:p-8">
                <p className="ha-eyebrow">Mehr zum Thema</p>
                <p className="mt-2 font-display text-xl font-extrabold text-ink">
                  Wissen zu {region.name}
                </p>
                <p className="ha-prose mt-2 max-w-2xl text-sm">{region.teaser}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/koerper/${region.slug}`} className="ha-btn ha-btn-dark ha-btn-sm">
                    Zur Körperregion
                  </Link>
                  <Link href="/uebungen" className="ha-btn ha-btn-ghost ha-btn-sm">
                    Übungen ansehen
                  </Link>
                  <Link href="/tape-yourself" className="ha-btn ha-btn-ghost ha-btn-sm">
                    Tape-Anleitungen
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="ha-card p-8 text-center md:p-12">
            <p className="font-display text-xl font-extrabold text-ink">
              Wähle oben mindestens eine Körperregion oder ein Ziel.
            </p>
            <p className="ha-prose mx-auto mt-3 max-w-lg text-sm">
              Danach erscheinen hier automatisch passende Produkte. Du kannst die Auswahl jederzeit
              verändern – die Adresse dieser Seite merkt sich deinen Stand.
            </p>
          </div>
        )}

        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}

function FinderStep({
  number,
  title,
  hint,
  selection,
  children,
}: {
  number: number;
  title: string;
  hint: string;
  selection?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 border-t border-chalk pt-8">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-sm font-extrabold text-white">
          {number}
        </span>
        <h2 className="font-display text-xl font-extrabold text-ink md:text-2xl">{title}</h2>
        {selection && (
          <span className="rounded-full bg-pulse-soft px-3 py-1 text-xs font-bold text-pulse-dark">
            {selection}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-soft">{hint}</p>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </section>
  );
}
