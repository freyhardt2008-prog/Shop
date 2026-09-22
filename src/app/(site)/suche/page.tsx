import Link from 'next/link';
import { SearchBox } from '@/components/layout/SearchBox';
import { ProductGrid } from '@/components/shop/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getProduct } from '@/lib/catalog';
import { searchKindLabels } from '@/lib/labels';
import { groupResults, popularSearches, search as runSearch } from '@/lib/search';
import { buildMetadata } from '@/lib/seo';
import type { Product } from '@/lib/types';

type Search = Record<string, string | string[] | undefined>;

export async function generateMetadata({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const raw = params.q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? '';

  return buildMetadata({
    title: query ? `Suche: ${query}` : 'Suche',
    description:
      'Durchsuche Produkte und redaktionelle Inhalte von HEAL ACTIVE – Bandagen, Tapes, Übungen, Tape-Anleitungen und Wissen zu Körperregionen.',
    path: '/suche',
    // Suchergebnisseiten gehören nicht in den Index (Duplicate Content).
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const raw = params.q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? '';

  const results = query ? runSearch(query, { limit: 60 }) : [];
  const { products: productResults, content } = groupResults(results);

  const products = productResults
    .map((result) => getProduct(result.id.replace('produkt:', '')))
    .filter((product): product is Product => Boolean(product));

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Suche', href: '/suche' }]} />

      <Section>
        <h1 className="text-display-md">Suche</h1>

        <div className="mt-6 max-w-2xl">
          <SearchBox defaultValue={query} size="lg" autoFocus={!query} />
        </div>

        {!query && (
          <div className="mt-10">
            <p className="ha-eyebrow mb-3">Häufig gesucht</p>
            <ul className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <li key={term}>
                  <Link href={`/suche?q=${encodeURIComponent(term)}`} className="ha-chip">
                    {term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {query && (
          <p className="mt-6 text-sm text-slate-soft">
            {results.length === 0
              ? `Keine Treffer für „${query}“.`
              : `${results.length} Treffer für „${query}“ – ${products.length} Produkte und ${content.length} Inhalte.`}
          </p>
        )}

        {query && results.length === 0 && (
          <div className="ha-card mt-8 p-8">
            <p className="font-display text-lg font-extrabold text-ink">
              Wir haben nichts Passendes gefunden.
            </p>
            <p className="ha-prose mt-2 text-sm">
              Versuche es mit einem allgemeineren Begriff – zum Beispiel „Knie“ statt einer genauen
              Produktbezeichnung. Unsere Suche verzeiht Tippfehler, aber sie kennt nur das, was im
              Shop vorhanden ist.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {popularSearches.slice(0, 6).map((term) => (
                <Link key={term} href={`/suche?q=${encodeURIComponent(term)}`} className="ha-chip">
                  {term}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/finder" className="ha-btn ha-btn-primary ha-btn-sm">
                Zum Finder
              </Link>
              <Link href="/koerper" className="ha-btn ha-btn-ghost ha-btn-sm">
                Körpernavigator
              </Link>
            </div>
          </div>
        )}
      </Section>

      {content.length > 0 && (
        <Section tone="white">
          <SectionHeading
            eyebrow="Inhalte"
            title="Wissen, Übungen & Anleitungen"
            description="Passende redaktionelle Inhalte zu deiner Suche."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.map((result) => (
              <li key={result.id}>
                <Link
                  href={result.href}
                  className="ha-card ha-card-hover flex h-full flex-col p-5"
                >
                  <span className="ha-eyebrow">{searchKindLabels[result.kind]}</span>
                  <span className="mt-1.5 font-display text-base font-extrabold text-ink">
                    {result.title}
                  </span>
                  <span className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-graphite">
                    {result.subtitle}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {products.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Produkte" title={`${products.length} passende Produkte`} />
          <div className="mt-8">
            <ProductGrid products={products} priorityCount={4} />
          </div>
          <HealthNote className="mt-12" />
        </Section>
      )}
    </>
  );
}
