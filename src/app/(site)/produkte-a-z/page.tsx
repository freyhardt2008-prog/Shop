import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getCategory, getProductsByLetter } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Alle Produkte A–Z',
  description:
    'Das komplette HEAL ACTIVE Sortiment alphabetisch sortiert – von Achillessehnenbandage bis Yogamatte.',
  path: '/produkte-a-z',
});

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ProductsAZPage() {
  const groups = getProductsByLetter();
  const available = new Set(groups.map((group) => group.letter));
  const total = groups.reduce((sum, group) => sum + group.products.length, 0);

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Alle Produkte A–Z', href: '/produkte-a-z' }]} />

      <Section>
        <SectionHeading
          eyebrow="Produktverzeichnis"
          title="Alle Produkte A–Z"
          description={`${total} Produkte alphabetisch sortiert. Praktisch, wenn du schon weißt, wonach du suchst.`}
          as="h1"
        />

        {/* Alphabet-Navigation */}
        <nav aria-label="Alphabetische Navigation" className="mt-8">
          <ul className="flex flex-wrap gap-1.5">
            {ALPHABET.map((letter) => {
              const enabled = available.has(letter);
              return (
                <li key={letter}>
                  {enabled ? (
                    <a
                      href={`#buchstabe-${letter}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-chalk bg-white font-display text-sm font-extrabold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                    >
                      {letter}
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-chalk/60 font-display text-sm font-extrabold text-chalk"
                    >
                      {letter}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Gruppen */}
        <div className="mt-12 space-y-10">
          {groups.map((group) => (
            <section key={group.letter} id={`buchstabe-${group.letter}`} className="scroll-mt-28">
              <div className="flex items-center gap-4">
                <h2 className="font-display text-4xl font-extrabold text-ink">{group.letter}</h2>
                <span className="h-px flex-1 bg-chalk" aria-hidden="true" />
                <span className="text-sm text-slate-soft">{group.products.length}</span>
              </div>

              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {group.products.map((product) => {
                  const category = getCategory(product.categorySlug);
                  return (
                    <li key={product.slug}>
                      <Link
                        href={`/produkt/${product.slug}`}
                        className="flex items-center justify-between gap-4 rounded-xl border border-chalk bg-white px-4 py-3 transition-colors hover:border-ink"
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-bold text-ink">{product.name}</span>
                          <span className="block truncate text-xs text-slate-soft">
                            {category?.name}
                          </span>
                        </span>
                        <span className="shrink-0 font-display text-sm font-extrabold text-ink">
                          {formatPrice(product.priceCents)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <HealthNote className="mt-14" />
      </Section>
    </>
  );
}
