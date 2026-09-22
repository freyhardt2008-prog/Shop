import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getGuideArticles } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'HEAL ACTIVE Guide – Wissen verständlich erklärt',
  description:
    'EMS und TENS, die richtige Bandage, Tape-Grundlagen, Balancetraining und Recovery: verständliche Erklärungen ohne Fachjargon und ohne Heilversprechen.',
  path: '/guide',
});

export default function GuidePage() {
  const articles = getGuideArticles();

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Guide', href: '/guide' }]} />

      <Section>
        <SectionHeading
          eyebrow="HEAL ACTIVE Guide"
          title="Verstehen, bevor du kaufst."
          description="Was macht eine Pelotte? Wie viel Zug gehört auf ein Tape? Was unterscheidet EMS von TENS? Hier erklären wir die Grundlagen in klarer Sprache – ohne Fachjargon und ohne Versprechen."
          as="h1"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/guide/${article.slug}`}
              className="ha-card ha-card-hover group flex h-full flex-col justify-between p-6"
            >
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-ink transition-colors group-hover:bg-signal group-hover:text-white">
                  <Icon name={article.icon} size={24} />
                </span>
                <p className="mt-5 font-display text-lg font-extrabold leading-tight text-ink">
                  {article.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{article.teaser}</p>
              </div>
              <p className="mt-5 text-xs text-slate-soft">
                {article.readingMinutes} Min. Lesezeit · {article.sections.length} Abschnitte
              </p>
            </Link>
          ))}
        </div>

        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
