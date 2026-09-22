import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/shop/ProductCard';
import { CheckList, WarningList } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { JsonLd } from '@/components/ui/JsonLd';
import { Section, SectionHeading } from '@/components/ui/Section';
import {
  getBodyRegion,
  getExercise,
  getExercises,
  getGoal,
  getProductsBySlugs,
  getSport,
} from '@/lib/catalog';
import { difficultyLabels } from '@/lib/labels';
import { buildMetadata, howToJsonLd } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getExercises().map((exercise) => ({ slug: exercise.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const exercise = getExercise(slug);
  if (!exercise) return buildMetadata({ title: 'Übung', description: '', path: '/uebungen' });

  return buildMetadata({
    title: `${exercise.name} – Übung richtig ausführen`,
    description: `${exercise.teaser} Ausgangsposition, Durchführung, Wiederholungen, häufige Fehler und passendes Equipment.`,
    path: `/uebungen/${exercise.slug}`,
    type: 'article',
  });
}

export default async function ExercisePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const exercise = getExercise(slug);
  if (!exercise) notFound();

  const regions = exercise.bodyRegionSlugs.map(getBodyRegion).filter(Boolean);
  const goals = exercise.goalSlugs.map(getGoal).filter(Boolean);
  const sports = exercise.sportSlugs.map(getSport).filter(Boolean);
  const products = getProductsBySlugs(exercise.relatedProductSlugs);
  const related = getExercises().filter(
    (entry) =>
      entry.slug !== exercise.slug &&
      entry.bodyRegionSlugs.some((region) => exercise.bodyRegionSlugs.includes(region)),
  );

  return (
    <>
      <JsonLd
        data={howToJsonLd({
          name: exercise.name,
          description: exercise.teaser,
          supplies: exercise.equipment,
          steps: exercise.execution.map((step, index) => ({
            name: `Schritt ${index + 1}`,
            text: step,
          })),
        })}
      />

      <Breadcrumbs
        crumbs={[
          { name: 'Übungen', href: '/uebungen' },
          { name: exercise.name, href: `/uebungen/${exercise.slug}` },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <p className="ha-eyebrow">Übung · {difficultyLabels[exercise.difficulty]}</p>
            <h1 className="mt-2 text-display-lg">{exercise.name}</h1>
            <p className="mt-4 font-display text-lg font-bold text-graphite">{exercise.teaser}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {regions.map((region) => (
                <li key={region!.slug}>
                  <Link href={`/koerper/${region!.slug}`} className="ha-chip">
                    {region!.name}
                  </Link>
                </li>
              ))}
              {goals.map((goal) => (
                <li key={goal!.slug}>
                  <Link href={`/ziel/${goal!.slug}`} className="ha-chip">
                    {goal!.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Medien-Platzhalter */}
            <div className="mt-8 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-card border border-dashed border-chalk bg-white p-6 text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-slate-soft" aria-hidden="true">
                <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
                <path d="m10 9.5 5 2.5-5 2.5Z" />
              </svg>
              <p className="text-sm font-semibold text-graphite">Video/Foto folgt</p>
              <p className="max-w-md text-xs leading-relaxed text-slate-soft">
                Motivbriefing: {exercise.mediaHint}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="ha-card p-5">
                <p className="ha-eyebrow mb-2">Equipment</p>
                <CheckList items={exercise.equipment} />
              </div>
              <div className="ha-card p-5">
                <p className="ha-eyebrow mb-2">Dosierung</p>
                <p className="text-sm leading-relaxed text-graphite">{exercise.dosage}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-pulse-soft p-5 md:p-6">
              <p className="ha-eyebrow mb-2 text-pulse-dark">Ausgangsposition</p>
              <p className="text-sm leading-relaxed text-graphite">{exercise.startPosition}</p>
            </div>

            <div className="mt-10">
              <h2 className="text-display-md">Durchführung</h2>
              <ol className="mt-5 space-y-3">
                {exercise.execution.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-2xl border border-chalk bg-white p-4 md:p-5">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-graphite">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8">
              <WarningList title="Häufige Fehler" items={exercise.commonMistakes} />
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <HealthNote />

            {sports.length > 0 && (
              <div className="ha-card p-5">
                <p className="ha-eyebrow mb-3">Passende Sportarten</p>
                <ul className="flex flex-wrap gap-2">
                  {sports.map((sport) => (
                    <li key={sport!.slug}>
                      <Link href={`/sport/${sport!.slug}`} className="ha-chip">
                        {sport!.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {products.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Equipment" title="Passende Produkte" />
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Weitere Übungen" title="Passt zur selben Körperregion" />
          <ul className="mt-6 flex flex-wrap gap-2">
            {related.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/uebungen/${entry.slug}`} className="ha-chip">
                  {entry.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
