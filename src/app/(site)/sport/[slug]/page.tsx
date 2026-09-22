import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductListing } from '@/components/shop/ProductListing';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import {
  getBackToSportProgram,
  getBodyRegion,
  getExercises,
  getProductsBySport,
  getSport,
  getSports,
} from '@/lib/catalog';
import { parseFilterState, parseSortKey } from '@/lib/filters';
import { buildMetadata } from '@/lib/seo';
import type { FilterKey } from '@/lib/types';

type Params = { slug: string };
type Search = Record<string, string | string[] | undefined>;

const sportFilterKeys: FilterKey[] = [
  'bodyRegion',
  'purpose',
  'gender',
  'size',
  'brand',
  'price',
  'resistance',
  'trainingLevel',
];

export function generateStaticParams(): Params[] {
  return getSports().map((sport) => ({ slug: sport.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sport = getSport(slug);
  if (!sport) return buildMetadata({ title: 'Sportart', description: '', path: '/sport' });

  return buildMetadata({
    title: `${sport.name} – Produkte, Regionen & Übungen`,
    description: `${sport.teaser} ${sport.description}`,
    path: `/sport/${sport.slug}`,
  });
}

export default async function SportPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { slug } = await params;
  const sport = getSport(slug);
  if (!sport) notFound();

  const search = await searchParams;
  const state = parseFilterState(search);
  const sortKey = parseSortKey(search);
  const products = getProductsBySport(sport.slug);
  const basePath = `/sport/${sport.slug}`;
  const regions = sport.focusRegionSlugs.map(getBodyRegion).filter(Boolean);
  const program = sport.backToSportSlug ? getBackToSportProgram(sport.backToSportSlug) : undefined;
  const exercises = getExercises().filter((exercise) => exercise.sportSlugs.includes(sport.slug));

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: 'Sportart', href: '/sport' },
          { name: sport.name, href: basePath },
        ]}
      />

      <Section>
        <div className="flex items-start gap-5">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sand text-ink sm:inline-flex">
            <Icon name={sport.icon} size={28} />
          </span>
          <div>
            <p className="ha-eyebrow">Sportart</p>
            <h1 className="mt-2 text-display-lg">{sport.name}</h1>
            <p className="mt-3 font-display text-lg font-bold text-graphite">{sport.teaser}</p>
            <p className="ha-prose mt-4 max-w-2xl">{sport.description}</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <span className="ha-eyebrow mr-1">Im Fokus:</span>
          {regions.map((region) => (
            <Link key={region!.slug} href={`/koerper/${region!.slug}`} className="ha-chip">
              {region!.name}
            </Link>
          ))}
        </div>

        {program && (
          <div className="mt-8 rounded-2xl bg-ink p-6 text-white md:p-8">
            <p className="ha-eyebrow text-white/50">Back to Sport</p>
            <p className="mt-2 font-display text-2xl font-extrabold">{program.name}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">{program.claim}</p>
            <Link href={`/back-to-sport/${program.slug}`} className="ha-btn ha-btn-primary mt-5">
              Programm ansehen <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        <div className="mt-10">
          <ProductListing
            products={products}
            filterKeys={sportFilterKeys}
            state={state}
            sortKey={sortKey}
            basePath={basePath}
          />
        </div>
      </Section>

      {exercises.length > 0 && (
        <Section tone="white">
          <SectionHeading
            eyebrow="Übungen"
            title={`Übungen für ${sport.name}`}
            action={{ label: 'Alle Übungen', href: '/uebungen' }}
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <li key={exercise.slug}>
                <Link
                  href={`/uebungen/${exercise.slug}`}
                  className="ha-card ha-card-hover flex h-full flex-col p-5"
                >
                  <span className="ha-eyebrow capitalize">{exercise.difficulty}</span>
                  <span className="mt-1.5 font-display text-base font-extrabold text-ink">
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
