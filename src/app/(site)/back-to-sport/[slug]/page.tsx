import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductRail } from '@/components/shop/ProductCard';
import { CheckList } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import {
  getBackToSportProgram,
  getBackToSportPrograms,
  getBodyRegion,
  getExercisesBySlugs,
  getProductsBySlugs,
  getSport,
} from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getBackToSportPrograms().map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const program = getBackToSportProgram(slug);
  if (!program) return buildMetadata({ title: 'Back to Sport', description: '', path: '/back-to-sport' });

  return buildMetadata({
    title: `${program.name} – ${program.claim}`,
    description: program.intro[0] ?? program.claim,
    path: `/back-to-sport/${program.slug}`,
    type: 'article',
  });
}

export default async function BackToSportProgramPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const program = getBackToSportProgram(slug);
  if (!program) notFound();

  const sport = getSport(program.sportSlug);
  const regions = program.relatedRegionSlugs.map(getBodyRegion).filter(Boolean);

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: 'Back to Sport', href: '/back-to-sport' },
          { name: program.name, href: `/back-to-sport/${program.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="bg-ink py-12 text-white md:py-16">
        <div className="ha-container">
          <p className="ha-eyebrow text-white/50">Back to Sport</p>
          <h1 className="mt-3 text-display-lg">{program.name}</h1>
          <p className="mt-4 max-w-2xl font-display text-lg font-bold text-white/80 md:text-xl">
            {program.claim}
          </p>
          <div className="ha-prose mt-6 max-w-2xl [&>p]:text-white/70">
            {program.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {sport && (
              <Link href={`/sport/${sport.slug}`} className="ha-btn ha-btn-primary ha-btn-sm">
                Produkte für {sport.name}
              </Link>
            )}
            {regions.map((region) => (
              <Link
                key={region!.slug}
                href={`/koerper/${region!.slug}`}
                className="ha-btn ha-btn-sm border border-white/25 text-white hover:bg-white/10"
              >
                {region!.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Phasen */}
      <Section>
        <SectionHeading
          eyebrow="Aufbau"
          title={`${program.phases.length} Phasen`}
          description="Jede Phase hat einen Schwerpunkt, passende Übungen und Produkte, die dabei häufig zum Einsatz kommen."
        />

        <div className="mt-10 space-y-8">
          {program.phases.map((phase, index) => {
            const exercises = getExercisesBySlugs(phase.exerciseSlugs);
            const products = getProductsBySlugs(phase.productSlugs);

            return (
              <article key={phase.name} className="ha-card overflow-hidden">
                <div className="border-b border-chalk bg-white p-6 md:p-8">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-signal font-display text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <h3 className="font-display text-xl font-extrabold text-ink md:text-2xl">
                      {phase.name}
                    </h3>
                  </div>
                  <p className="ha-eyebrow mt-3">{phase.focus}</p>
                  <p className="ha-prose mt-2 max-w-3xl text-sm md:text-base">{phase.description}</p>
                </div>

                <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_1.4fr]">
                  <div>
                    <p className="ha-eyebrow mb-3">Übungen</p>
                    <ul className="space-y-2">
                      {exercises.map((exercise) => (
                        <li key={exercise.slug}>
                          <Link
                            href={`/uebungen/${exercise.slug}`}
                            className="flex items-center justify-between gap-3 rounded-xl border border-chalk bg-white px-4 py-3 text-sm transition-colors hover:border-ink"
                          >
                            <span className="font-bold text-ink">{exercise.name}</span>
                            <span aria-hidden="true" className="text-signal">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="ha-eyebrow mb-3">Produkte</p>
                    <ProductRail products={products} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Checkliste */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Checkliste"
              title="Woran du merkst, dass der nächste Schritt dran ist"
              description="Diese Punkte sind eine Orientierung, kein medizinisches Kriterium. Die individuelle Freigabe trifft die Person, die dich betreut."
            />
            <div className="mt-6">
              <CheckList items={program.checklist} />
            </div>
          </div>
          <HealthNote />
        </div>
      </Section>
    </>
  );
}
