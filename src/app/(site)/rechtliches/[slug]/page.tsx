import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { legalPageBySlug, legalPages, legalReviewNotice } from '@/data/legal';
import { buildMetadata } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return legalPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = legalPageBySlug.get(slug);
  if (!page) return buildMetadata({ title: 'Rechtliches', description: '', path: '/rechtliches' });

  return buildMetadata({
    title: page.title,
    description: page.summary,
    path: `/rechtliches/${page.slug}`,
    // Entwürfe gehören nicht in den Index, solange sie nicht geprüft sind.
    noIndex: page.requiresLegalReview,
  });
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = legalPageBySlug.get(slug);
  if (!page) notFound();

  const others = legalPages.filter((entry) => entry.slug !== page.slug);

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: 'Rechtliches', href: '/rechtliches' },
          { name: page.title, href: `/rechtliches/${page.slug}` },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <article>
            <h1 className="text-display-md">{page.title}</h1>
            <p className="ha-prose mt-3">{page.summary}</p>

            {page.requiresLegalReview && (
              <div
                role="note"
                className="mt-6 rounded-2xl border border-signal/30 bg-signal-soft p-5"
              >
                <p className="ha-eyebrow mb-2 text-signal-dark">
                  Entwurf – noch nicht rechtsverbindlich
                </p>
                <p className="text-sm leading-relaxed text-graphite">{legalReviewNotice}</p>
              </div>
            )}

            <div className="mt-10 space-y-8">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-lg font-extrabold text-ink md:text-xl">
                    {section.heading}
                  </h2>
                  <div className="ha-prose mt-2 text-sm md:text-base">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="ha-prose mt-3 list-disc space-y-1.5 pl-5 text-sm md:text-base">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="ha-card p-5">
              <p className="ha-eyebrow mb-3">Weitere Seiten</p>
              <ul className="space-y-1.5">
                {others.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/rechtliches/${entry.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-graphite transition-colors hover:bg-sand hover:text-ink"
                    >
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
