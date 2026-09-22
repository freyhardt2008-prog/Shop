import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductListing } from '@/components/shop/ProductListing';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getConditions, getExercises, getGoal, getGoals, getProductsByGoal } from '@/lib/catalog';
import { parseFilterState, parseSortKey } from '@/lib/filters';
import { buildMetadata } from '@/lib/seo';
import type { FilterKey } from '@/lib/types';

type Params = { slug: string };
type Search = Record<string, string | string[] | undefined>;

const goalFilterKeys: FilterKey[] = [
  'bodyRegion',
  'purpose',
  'sport',
  'brand',
  'price',
  'size',
  'resistance',
  'trainingLevel',
];

export function generateStaticParams(): Params[] {
  return getGoals().map((goal) => ({ slug: goal.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const goal = getGoal(slug);
  if (!goal) return buildMetadata({ title: 'Ziel', description: '', path: '/ziel' });

  return buildMetadata({
    title: `${goal.name} – ${goal.claim}`,
    description: goal.description,
    path: `/ziel/${goal.slug}`,
  });
}

export default async function GoalPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;
  const goal = getGoal(slug);
  if (!goal) notFound();

  const search = await searchParams;
  const state = parseFilterState(search);
  const sortKey = parseSortKey(search);
  const products = getProductsByGoal(goal.slug);
  const basePath = `/ziel/${goal.slug}`;

  const relatedConditions = getConditions().filter((condition) =>
    condition.goalSlugs.includes(goal.slug),
  );
  const relatedExercises = getExercises().filter((exercise) =>
    exercise.goalSlugs.includes(goal.slug),
  );

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: 'Dein Ziel', href: '/ziel' },
          { name: goal.name, href: basePath },
        ]}
      />

      <Section>
        <div className="flex items-start gap-5">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pulse-soft text-pulse-dark sm:inline-flex">
            <Icon name={goal.icon} size={28} />
          </span>
          <div>
            <p className="ha-eyebrow">Dein Ziel</p>
            <h1 className="mt-2 text-display-lg">{goal.name}</h1>
            <p className="mt-3 font-display text-lg font-bold text-graphite">{goal.claim}</p>
            <p className="ha-prose mt-4 max-w-2xl">{goal.description}</p>
          </div>
        </div>

        <div className="mt-10">
          <ProductListing
            products={products}
            filterKeys={goalFilterKeys}
            state={state}
            sortKey={sortKey}
            basePath={basePath}
          />
        </div>
      </Section>

      {relatedConditions.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Themen" title={`Themen mit dem Ziel „${goal.name}“`} />
          <ul className="mt-6 flex flex-wrap gap-2">
            {relatedConditions.map((condition) => (
              <li key={condition.slug}>
                <Link href={`/beschwerden/${condition.slug}`} className="ha-chip">
                  {condition.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {relatedExercises.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Übungen"
            title="Passende Übungen"
            action={{ label: 'Alle Übungen', href: '/uebungen' }}
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedExercises.map((exercise) => (
              <li key={exercise.slug}>
                <Link
                  href={`/uebungen/${exercise.slug}`}
                  className="ha-card ha-card-hover flex h-full flex-col p-5"
                >
                  <span className="font-display text-base font-extrabold text-ink">
                    {exercise.name}
                  </span>
                  <span className="mt-1.5 text-sm text-graphite">{exercise.teaser}</span>
                </Link>
              </li>
            ))}
          </ul>
          <HealthNote className="mt-12" />
        </Section>
      )}
    </>
  );
}
