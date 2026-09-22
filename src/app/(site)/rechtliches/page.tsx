import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section, SectionHeading } from '@/components/ui/Section';
import { legalPages, legalReviewNotice } from '@/data/legal';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Rechtliches',
  description: 'Impressum, Datenschutz, AGB, Widerrufsrecht, Versand, Zahlung, Produktsicherheit und Barrierefreiheit.',
  path: '/rechtliches',
});

export default function LegalIndexPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Rechtliches', href: '/rechtliches' }]} />

      <Section>
        <SectionHeading eyebrow="Rechtliches" title="Rechtliche Informationen" as="h1" />

        <div
          role="note"
          className="mt-6 max-w-3xl rounded-2xl border border-signal/30 bg-signal-soft p-5"
        >
          <p className="ha-eyebrow mb-2 text-signal-dark">Wichtiger Hinweis</p>
          <p className="text-sm leading-relaxed text-graphite">{legalReviewNotice}</p>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {legalPages.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/rechtliches/${page.slug}`}
                className="ha-card ha-card-hover flex h-full flex-col p-5"
              >
                <span className="font-display text-base font-extrabold text-ink">{page.title}</span>
                <span className="mt-1.5 text-sm leading-relaxed text-graphite">{page.summary}</span>
                {page.requiresLegalReview && (
                  <span className="mt-3 inline-flex w-fit rounded-full bg-beam-soft px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-ink">
                    Entwurf – Prüfung nötig
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
