import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BodyMap } from '@/components/body-map/BodyMap';
import { ProductGrid } from '@/components/shop/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import {
  getBodyRegion,
  getBodyRegions,
  getCategory,
  getConditionsForRegion,
  getExercises,
  getProductsByRegion,
  getTapeGuides,
} from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

type Params = { region: string };

export function generateStaticParams(): Params[] {
  return getBodyRegions().map((region) => ({ region: region.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { region: slug } = await params;
  const region = getBodyRegion(slug);
  if (!region) return buildMetadata({ title: 'Körperregion', description: '', path: '/koerper' });

  return buildMetadata({
    title: `${region.name} – Produkte, Übungen & Wissen`,
    description: `${region.teaser} ${region.intro}`,
    path: `/koerper/${region.slug}`,
  });
}

export default async function RegionPage({ params }: { params: Promise<Params> }) {
  const { region: slug } = await params;
  const region = getBodyRegion(slug);
  if (!region) notFound();

  const conditions = getConditionsForRegion(region.slug);
  const products = getProductsByRegion(region.slug);
  const exercises = getExercises().filter((exercise) =>
    exercise.bodyRegionSlugs.includes(region.slug),
  );
  const tapeGuides = getTapeGuides().filter((guide) => guide.bodyRegionSlug === region.slug);
  const categories = region.highlightCategorySlugs.map(getCategory).filter(Boolean);

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: 'Körper & Beschwerden', href: '/koerper' },
          { name: region.name, href: `/koerper/${region.slug}` },
        ]}
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <p className="ha-eyebrow">Körperregion</p>
            <h1 className="mt-2 text-display-lg">{region.name}</h1>
            <p className="mt-4 font-display text-lg font-bold text-graphite">{region.teaser}</p>
            <p className="ha-prose mt-5">{region.intro}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {region.typicalTopics.map((topic) => (
                <li key={topic} className="ha-chip">
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#produkte" className="ha-btn ha-btn-primary ha-btn-sm">
                Passende Produkte
              </Link>
              {tapeGuides[0] && (
                <Link href={`/tape-yourself/${tapeGuides[0].slug}`} className="ha-btn ha-btn-ghost ha-btn-sm">
                  {region.name} tapen
                </Link>
              )}
              {exercises.length > 0 && (
                <Link href="#übungen" className="ha-btn ha-btn-ghost ha-btn-sm">
                  Übungen ansehen
                </Link>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <BodyMap activeRegion={region.slug} className="w-full max-w-sm" />
          </div>
        </div>
      </Section>

      {conditions.length > 0 && (
        <Section tone="white">
          <SectionHeading
            eyebrow="Themen"
            title={`Häufige Anlässe rund um ${region.name}`}
            description="Beschreibende Einordnung, keine Diagnose. Bei unklaren oder anhaltenden Beschwerden gehört die Abklärung in fachliche Hände."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((condition) => (
              <li key={condition.slug}>
                <Link
                  href={`/beschwerden/${condition.slug}`}
                  className="ha-card ha-card-hover group flex h-full flex-col p-5"
                >
                  <span className="font-display text-base font-extrabold text-ink">
                    {condition.name}
                  </span>
                  <span className="mt-1.5 text-sm leading-relaxed text-graphite">
                    {condition.teaser}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-signal">
                    Mehr erfahren <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {categories.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Passende Bereiche" title="Hier lohnt sich der Blick" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category!.slug}>
                <Link href={`/shop/${category!.slug}`} className="ha-chip">
                  {category!.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="produkte" tone="white">
        <SectionHeading
          eyebrow="Produkte"
          title={`Produkte für ${region.name}`}
          description={`${products.length} Produkte aus unseren Beispieldaten sind dieser Region zugeordnet.`}
        />
        <div className="mt-8">
          {products.length > 0 ? (
            <ProductGrid products={products} priorityCount={4} />
          ) : (
            <p className="ha-card p-6 text-sm text-graphite">
              Für diese Region liegen noch keine Beispielprodukte vor. Schau in der{' '}
              <Link href="/shop" className="font-bold text-signal hover:underline">
                Shop-Übersicht
              </Link>{' '}
              oder nutze den{' '}
              <Link href="/finder" className="font-bold text-signal hover:underline">
                Finder
              </Link>
              .
            </p>
          )}
        </div>
      </Section>

      {exercises.length > 0 && (
        <Section id="uebungen">
          <SectionHeading
            eyebrow="HEAL ACTIVE Exercises"
            title={`Übungen für ${region.name}`}
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
                  <span className="mt-1.5 text-sm leading-relaxed text-graphite">
                    {exercise.teaser}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {tapeGuides.length > 0 && (
        <Section tone="white">
          <SectionHeading
            eyebrow="Tape Yourself"
            title={`${region.name} selbst tapen`}
            action={{ label: 'Alle Anleitungen', href: '/tape-yourself' }}
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tapeGuides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/tape-yourself/${guide.slug}`}
                  className="ha-card ha-card-hover flex h-full flex-col p-5"
                >
                  <span className="font-display text-base font-extrabold text-ink">
                    {guide.name}
                  </span>
                  <span className="mt-1.5 text-sm text-graphite">{guide.teaser}</span>
                  <span className="mt-3 text-xs text-slate-soft">
                    ca. {guide.durationMinutes} Min. · {guide.difficulty}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section>
        <HealthNote />
      </Section>
    </>
  );
}
