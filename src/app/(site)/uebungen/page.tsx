import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getBodyRegion, getExercises, getGoals, getSports } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';
import { difficultyLabels } from '@/lib/labels';
import type { Difficulty } from '@/lib/types';

/**
 * HEAL ACTIVE EXERCISES – Übungsbibliothek mit Filtern.
 * Die Filter laufen wie im Shop über Query-Parameter, damit die Seite ohne
 * JavaScript funktioniert und Ergebnisse teilbar sind.
 */

export const metadata = buildMetadata({
  title: 'HEAL ACTIVE Exercises – Übungsbibliothek',
  description:
    'Übungen für Knie, Sprunggelenk, Schulter, Rücken und Fuß – filterbar nach Körperregion, Ziel, Sportart, Schwierigkeitsgrad und Equipment.',
  path: '/uebungen',
});

type Search = Record<string, string | string[] | undefined>;

function firstValue(search: Search, key: string): string | undefined {
  const raw = search[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.trim() || undefined;
}

export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const search = await searchParams;
  const regionFilter = firstValue(search, 'koerperregion');
  const goalFilter = firstValue(search, 'ziel');
  const sportFilter = firstValue(search, 'sportart');
  const difficultyFilter = firstValue(search, 'niveau') as Difficulty | undefined;
  const equipmentFilter = firstValue(search, 'equipment');

  const allExercises = getExercises();
  const goals = getGoals();
  const sports = getSports();

  const equipmentOptions = [
    ...new Set(allExercises.flatMap((exercise) => exercise.equipment)),
  ].sort((a, b) => a.localeCompare(b, 'de'));

  const regionOptions = [
    ...new Set(allExercises.flatMap((exercise) => exercise.bodyRegionSlugs)),
  ];

  const exercises = allExercises.filter((exercise) => {
    if (regionFilter && !exercise.bodyRegionSlugs.includes(regionFilter)) return false;
    if (goalFilter && !exercise.goalSlugs.includes(goalFilter)) return false;
    if (sportFilter && !exercise.sportSlugs.includes(sportFilter)) return false;
    if (difficultyFilter && exercise.difficulty !== difficultyFilter) return false;
    if (equipmentFilter && !exercise.equipment.includes(equipmentFilter)) return false;
    return true;
  });

  /** Baut einen Link mit verändertem bzw. entferntem Filter. */
  function filterHref(key: string, value: string) {
    const params = new URLSearchParams();
    const current = {
      koerperregion: regionFilter,
      ziel: goalFilter,
      sportart: sportFilter,
      niveau: difficultyFilter,
      equipment: equipmentFilter,
    } as Record<string, string | undefined>;

    for (const [entryKey, entryValue] of Object.entries(current)) {
      if (entryValue && entryKey !== key) params.set(entryKey, entryValue);
    }
    if (current[key] !== value) params.set(key, value);

    const query = params.toString();
    return query ? `/uebungen?${query}` : '/uebungen';
  }

  const hasFilter = Boolean(
    regionFilter || goalFilter || sportFilter || difficultyFilter || equipmentFilter,
  );

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Übungen', href: '/uebungen' }]} />

      <Section>
        <SectionHeading
          eyebrow="HEAL ACTIVE Exercises"
          title="Übungsbibliothek"
          description="Kombiniere Körperregion, Ziel und Equipment – zum Beispiel Knie + Stabilität + Resistance Band."
          as="h1"
        />

        {/* Filter */}
        <div className="mt-8 space-y-5">
          <FilterRow label="Körperregion">
            {regionOptions.map((slug) => {
              const region = getBodyRegion(slug);
              if (!region) return null;
              return (
                <Link
                  key={slug}
                  href={filterHref('koerperregion', slug)}
                  className={`ha-chip ${regionFilter === slug ? 'ha-chip-active' : ''}`}
                >
                  {region.name}
                </Link>
              );
            })}
          </FilterRow>

          <FilterRow label="Ziel">
            {goals.map((goal) => (
              <Link
                key={goal.slug}
                href={filterHref('ziel', goal.slug)}
                className={`ha-chip ${goalFilter === goal.slug ? 'ha-chip-active' : ''}`}
              >
                {goal.name}
              </Link>
            ))}
          </FilterRow>

          <FilterRow label="Sportart">
            {sports.map((sport) => (
              <Link
                key={sport.slug}
                href={filterHref('sportart', sport.slug)}
                className={`ha-chip ${sportFilter === sport.slug ? 'ha-chip-active' : ''}`}
              >
                {sport.name}
              </Link>
            ))}
          </FilterRow>

          <FilterRow label="Schwierigkeitsgrad">
            {(Object.keys(difficultyLabels) as Difficulty[]).map((level) => (
              <Link
                key={level}
                href={filterHref('niveau', level)}
                className={`ha-chip ${difficultyFilter === level ? 'ha-chip-active' : ''}`}
              >
                {difficultyLabels[level]}
              </Link>
            ))}
          </FilterRow>

          <FilterRow label="Equipment">
            {equipmentOptions.map((item) => (
              <Link
                key={item}
                href={filterHref('equipment', item)}
                className={`ha-chip ${equipmentFilter === item ? 'ha-chip-active' : ''}`}
              >
                {item}
              </Link>
            ))}
          </FilterRow>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-soft">
            {exercises.length} {exercises.length === 1 ? 'Übung' : 'Übungen'}
          </p>
          {hasFilter && (
            <Link href="/uebungen" className="text-sm font-bold text-signal hover:underline">
              Filter zurücksetzen
            </Link>
          )}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <li key={exercise.slug}>
              <Link
                href={`/uebungen/${exercise.slug}`}
                className="ha-card ha-card-hover group flex h-full flex-col p-5 md:p-6"
              >
                <span className="flex items-center gap-2">
                  <span className="ha-eyebrow">{difficultyLabels[exercise.difficulty]}</span>
                </span>
                <span className="mt-1.5 font-display text-lg font-extrabold leading-tight text-ink">
                  {exercise.name}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-graphite">{exercise.teaser}</span>
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {exercise.equipment.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-sand px-2 py-0.5 text-[0.6875rem] font-semibold text-slate-soft"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {exercises.length === 0 && (
          <p className="ha-card mt-6 p-8 text-center text-sm text-graphite">
            Keine Übung passt zu dieser Kombination.{' '}
            <Link href="/uebungen" className="font-bold text-signal hover:underline">
              Filter zurücksetzen
            </Link>
          </p>
        )}

        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="ha-eyebrow mb-2">{label}</p>
      <div className="ha-scroll-x -mx-4 flex gap-2 px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {children}
      </div>
    </div>
  );
}
