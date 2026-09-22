import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGrid } from '@/components/shop/ProductCard';
import { Accordion, CheckList } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { JsonLd } from '@/components/ui/JsonLd';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getCategory, getGuideArticle, getGuideArticles, getProductsBySlugs } from '@/lib/catalog';
import { buildMetadata, faqJsonLd } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getGuideArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) return buildMetadata({ title: 'Guide', description: '', path: '/guide' });

  return buildMetadata({
    title: article.title,
    description: `${article.teaser} ${article.intro[0] ?? ''}`,
    path: `/guide/${article.slug}`,
    type: 'article',
  });
}

export default async function GuideArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) notFound();

  const products = getProductsBySlugs(article.relatedProductSlugs);
  const categories = article.relatedCategorySlugs.map(getCategory).filter(Boolean);
  const others = getGuideArticles().filter((entry) => entry.slug !== article.slug);

  return (
    <>
      {article.faq && article.faq.length > 0 && <JsonLd data={faqJsonLd(article.faq)} />}

      <Breadcrumbs
        crumbs={[
          { name: 'Guide', href: '/guide' },
          { name: article.title, href: `/guide/${article.slug}` },
        ]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <article>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-ink">
              <Icon name={article.icon} size={24} />
            </span>
            <p className="ha-eyebrow mt-5">HEAL ACTIVE Guide · {article.readingMinutes} Min.</p>
            <h1 className="mt-2 text-display-lg">{article.title}</h1>
            <p className="mt-4 font-display text-lg font-bold text-graphite">{article.teaser}</p>

            <div className="ha-prose mt-6">
              {article.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-xl font-extrabold text-ink md:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="ha-prose mt-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <div className="mt-4">
                      <CheckList items={section.bullets} />
                    </div>
                  )}
                  {section.note && (
                    <p className="mt-4 rounded-2xl border border-beam/40 bg-beam-soft px-4 py-3 text-sm leading-relaxed text-graphite">
                      <strong className="text-ink">Hinweis:</strong> {section.note}
                    </p>
                  )}
                </section>
              ))}
            </div>

            {article.faq && article.faq.length > 0 && (
              <div className="mt-12">
                <h2 className="text-display-md">Häufige Fragen</h2>
                <div className="mt-4">
                  {article.faq.map((item) => (
                    <Accordion key={item.question} title={item.question}>
                      <p>{item.answer}</p>
                    </Accordion>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <HealthNote />

            {categories.length > 0 && (
              <div className="ha-card p-5">
                <p className="ha-eyebrow mb-3">Passende Kategorien</p>
                <ul className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <li key={category!.slug}>
                      <Link href={`/shop/${category!.slug}`} className="ha-chip">
                        {category!.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="ha-card p-5">
              <p className="ha-eyebrow mb-3">Weitere Artikel</p>
              <ul className="space-y-2">
                {others.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/guide/${entry.slug}`}
                      className="block rounded-xl border border-chalk px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
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

      {products.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Passend dazu" title="Produkte aus diesem Artikel" />
          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </Section>
      )}
    </>
  );
}
