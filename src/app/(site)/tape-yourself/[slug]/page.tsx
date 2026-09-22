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
  getProductsBySlugs,
  getTapeGuide,
  getTapeGuides,
} from '@/lib/catalog';
import { buildMetadata, howToJsonLd } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getTapeGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getTapeGuide(slug);
  if (!guide) return buildMetadata({ title: 'Tape-Anleitung', description: '', path: '/tape-yourself' });

  return buildMetadata({
    title: `${guide.name} – Anleitung Schritt für Schritt`,
    description: `${guide.teaser} Material, Tape-Länge, ${guide.steps.length} Schritte, Hinweise und Kontraindikationen.`,
    path: `/tape-yourself/${guide.slug}`,
    type: 'article',
  });
}

export default async function TapeGuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guide = getTapeGuide(slug);
  if (!guide) notFound();

  const region = getBodyRegion(guide.bodyRegionSlug);
  const products = getProductsBySlugs(guide.relatedProductSlugs);
  const otherGuides = getTapeGuides().filter((entry) => entry.slug !== guide.slug);

  return (
    <>
      <JsonLd
        data={howToJsonLd({
          name: guide.name,
          description: guide.teaser,
          totalTimeMinutes: guide.durationMinutes,
          supplies: guide.material,
          steps: guide.steps.map((step) => ({ name: step.title, text: step.body })),
        })}
      />

      <Breadcrumbs
        crumbs={[
          { name: 'Tape Yourself', href: '/tape-yourself' },
          { name: guide.name, href: `/tape-yourself/${guide.slug}` },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            {region && (
              <Link href={`/koerper/${region.slug}`} className="ha-eyebrow hover:text-ink">
                {region.name}
              </Link>
            )}
            <h1 className="mt-2 text-display-lg">{guide.name}</h1>
            <p className="mt-4 font-display text-lg font-bold text-graphite">{guide.teaser}</p>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <dt className="ha-eyebrow">Dauer</dt>
                <dd className="font-display text-lg font-extrabold text-ink">
                  ca. {guide.durationMinutes} Min.
                </dd>
              </div>
              <div>
                <dt className="ha-eyebrow">Schwierigkeit</dt>
                <dd className="font-display text-lg font-extrabold capitalize text-ink">
                  {guide.difficulty}
                </dd>
              </div>
              <div>
                <dt className="ha-eyebrow">Tape-Länge</dt>
                <dd className="font-display text-lg font-extrabold text-ink">{guide.tapeLength}</dd>
              </div>
            </dl>

            {/* Material */}
            <div className="mt-8 rounded-2xl border border-chalk bg-white p-5 md:p-6">
              <p className="ha-eyebrow mb-3">Was du brauchst</p>
              <CheckList items={guide.material} />
            </div>

            {/* Vorbereitung */}
            <div className="mt-6">
              <h2 className="font-display text-xl font-extrabold text-ink">Vorbereitung</h2>
              <div className="mt-3">
                <CheckList items={guide.preparation} />
              </div>
            </div>

            {/* Ausgangsposition */}
            <div className="mt-8 rounded-2xl bg-pulse-soft p-5 md:p-6">
              <p className="ha-eyebrow mb-2 text-pulse-dark">Ausgangsposition</p>
              <p className="text-sm leading-relaxed text-graphite">{guide.startPosition}</p>
            </div>

            {/* Schritte */}
            <div className="mt-10">
              <h2 className="text-display-md">Anleitung</h2>
              <ol className="mt-6 space-y-5">
                {guide.steps.map((step, index) => (
                  <li key={step.title} className="ha-card overflow-hidden">
                    <div className="grid gap-0 sm:grid-cols-[1fr_11rem]">
                      <div className="p-5 md:p-6">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink font-display text-sm font-extrabold text-white">
                          {index + 1}
                        </span>
                        <p className="mt-3 font-display text-base font-extrabold text-ink">
                          {step.title}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-graphite">{step.body}</p>
                      </div>

                      {/* Platzhalter für Illustration – Motivbriefing sichtbar */}
                      <div className="flex min-h-[8rem] flex-col items-center justify-center gap-2 border-t border-chalk bg-sand p-4 text-center sm:border-l sm:border-t-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-soft" aria-hidden="true">
                          <rect x="3" y="4" width="18" height="16" rx="2.5" />
                          <circle cx="9" cy="10" r="1.8" />
                          <path d="m4 18 5-5 4 4 3-2.5 4 3.5" />
                        </svg>
                        <p className="text-[0.6875rem] leading-snug text-slate-soft">
                          Illustration folgt:
                          <br />
                          {step.mediaHint}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Hinweise */}
            <div className="mt-10">
              <h2 className="font-display text-xl font-extrabold text-ink">Wichtige Hinweise</h2>
              <div className="mt-3">
                <CheckList items={guide.notes} />
              </div>
            </div>

            <div className="mt-8">
              <WarningList title="Kontraindikationen – hier bitte nicht tapen" items={guide.contraindications} />
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="ha-card p-5">
              <p className="ha-eyebrow mb-3">Passendes Material</p>
              <ul className="space-y-2">
                {products.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/produkt/${product.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-chalk px-4 py-3 text-sm transition-colors hover:border-ink"
                    >
                      <span className="font-bold text-ink">{product.name}</span>
                      <span aria-hidden="true" className="text-signal">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/shop/tapes" className="ha-btn ha-btn-primary mt-4 w-full">
                Passendes Tape kaufen
              </Link>
            </div>

            <HealthNote />
          </aside>
        </div>
      </Section>

      {products.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Material" title="Produkte für diese Anlage" />
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </Section>
      )}

      <Section>
        <SectionHeading eyebrow="Weitere Anleitungen" title="Andere Körperregionen tapen" />
        <ul className="mt-6 flex flex-wrap gap-2">
          {otherGuides.map((entry) => (
            <li key={entry.slug}>
              <Link href={`/tape-yourself/${entry.slug}`} className="ha-chip">
                {entry.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
