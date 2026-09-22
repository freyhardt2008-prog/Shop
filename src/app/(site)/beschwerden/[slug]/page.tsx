import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/shop/ProductCard';
import { Accordion, CheckList } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { JsonLd } from '@/components/ui/JsonLd';
import { Section, SectionHeading } from '@/components/ui/Section';
import {
  getBodyRegion,
  getCondition,
  getConditions,
  getExercisesBySlugs,
  getGoal,
  getProductsByCondition,
  getProducts,
  getSport,
  getTapeGuidesBySlugs,
} from '@/lib/catalog';
import { purposeLabels } from '@/lib/labels';
import { buildMetadata, faqJsonLd } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getConditions().map((condition) => ({ slug: condition.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) return buildMetadata({ title: 'Thema', description: '', path: '/koerper' });

  return buildMetadata({
    title: `${condition.name} – Wissen, Übungen & Produkte`,
    description: `${condition.teaser} ${condition.description[0] ?? ''}`,
    path: `/beschwerden/${condition.slug}`,
    type: 'article',
  });
}

export default async function ConditionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) notFound();

  const region = getBodyRegion(condition.regionSlug);
  const exercises = getExercisesBySlugs(condition.exerciseSlugs);
  const tapeGuides = getTapeGuidesBySlugs(condition.tapeGuideSlugs);
  const goals = condition.goalSlugs.map(getGoal).filter(Boolean);
  const sports = condition.sportSlugs.map(getSport).filter(Boolean);

  // Direkt zugeordnete Produkte, ergänzt um passende Verwendungszwecke.
  const direct = getProductsByCondition(condition.slug);
  const byPurpose = getProducts().filter(
    (product) =>
      !direct.includes(product) &&
      product.bodyRegionSlugs.includes(condition.regionSlug) &&
      product.purposes.some((purpose) => condition.purposes.includes(purpose)),
  );
  const products = [...direct, ...byPurpose];

  return (
    <>
      {condition.faq && condition.faq.length > 0 && <JsonLd data={faqJsonLd(condition.faq)} />}

      <Breadcrumbs
        crumbs={[
          { name: 'Körper & Beschwerden', href: '/koerper' },
          ...(region ? [{ name: region.name, href: `/koerper/${region.slug}` }] : []),
          { name: condition.name, href: `/beschwerden/${condition.slug}` },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            {region && <p className="ha-eyebrow">{region.name}</p>}
            <h1 className="mt-2 text-display-lg">{condition.name}</h1>
            <p className="mt-4 font-display text-lg font-bold text-graphite">{condition.teaser}</p>

            <div className="ha-prose mt-6">
              {condition.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-chalk bg-white p-5 md:p-6">
              <p className="ha-eyebrow mb-3">Worauf es in der Bewegung oft ankommt</p>
              <CheckList items={condition.focusPoints} />
            </div>

            {condition.faq && condition.faq.length > 0 && (
              <div className="mt-10">
                <h2 className="text-display-md">Häufige Fragen</h2>
                <div className="mt-4">
                  {condition.faq.map((item) => (
                    <Accordion key={item.question} title={item.question}>
                      <p>{item.answer}</p>
                    </Accordion>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <HealthNote />

            <div className="ha-card p-5">
              <p className="ha-eyebrow mb-3">Passende Ziele</p>
              <ul className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <li key={goal!.slug}>
                    <Link href={`/ziel/${goal!.slug}`} className="ha-chip">
                      {goal!.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="ha-eyebrow mb-3 mt-5">Verwendungszweck</p>
              <ul className="flex flex-wrap gap-2">
                {condition.purposes.map((purpose) => (
                  <li key={purpose} className="ha-chip">
                    {purposeLabels[purpose]}
                  </li>
                ))}
              </ul>

              {sports.length > 0 && (
                <>
                  <p className="ha-eyebrow mb-3 mt-5">Häufig betroffene Sportarten</p>
                  <ul className="flex flex-wrap gap-2">
                    {sports.map((sport) => (
                      <li key={sport!.slug}>
                        <Link href={`/sport/${sport!.slug}`} className="ha-chip">
                          {sport!.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        </div>
      </Section>

      {products.length > 0 && (
        <Section tone="white">
          <SectionHeading
            eyebrow="Produkte"
            title="Produkte, die hier häufig zum Einsatz kommen"
            description="Eine Auswahl aus unseren Beispieldaten – keine Empfehlung für den Einzelfall."
          />
          <div className="mt-8">
            <ProductGrid products={products} priorityCount={4} />
          </div>
        </Section>
      )}

      {exercises.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Übungen"
            title="Übungen dazu"
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
        </Section>
      )}

      {tapeGuides.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Tape Yourself" title="Passende Tape-Anleitungen" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {tapeGuides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/tape-yourself/${guide.slug}`} className="ha-chip">
                  {guide.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
