import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductListing } from '@/components/shop/ProductListing';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import {
  getCategories,
  getCategory,
  getProductsByCategory,
  getSubcategory,
} from '@/lib/catalog';
import { parseFilterState, parseSortKey } from '@/lib/filters';
import { buildMetadata } from '@/lib/seo';

type Params = { category: string; subcategory: string };
type Search = Record<string, string | string[] | undefined>;

export function generateStaticParams(): Params[] {
  return getCategories().flatMap((category) =>
    category.subcategories.map((sub) => ({
      category: category.slug,
      subcategory: sub.slug,
    })),
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { category: categorySlug, subcategory: subSlug } = await params;
  const category = getCategory(categorySlug);
  const sub = getSubcategory(categorySlug, subSlug);
  if (!category || !sub) {
    return buildMetadata({ title: 'Unterkategorie', description: '', path: '/shop' });
  }

  return buildMetadata({
    title: `${sub.name} – ${category.name}`,
    description: `${sub.teaser} Jetzt ${sub.name} aus der Kategorie ${category.name} bei HEAL ACTIVE entdecken.`,
    path: `/shop/${category.slug}/${sub.slug}`,
  });
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { category: categorySlug, subcategory: subSlug } = await params;
  const category = getCategory(categorySlug);
  const sub = getSubcategory(categorySlug, subSlug);
  if (!category || !sub) notFound();

  const search = await searchParams;
  const state = parseFilterState(search);
  const sortKey = parseSortKey(search);
  const products = getProductsByCategory(category.slug, sub.slug);
  const basePath = `/shop/${category.slug}/${sub.slug}`;

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: 'Shop', href: '/shop' },
          { name: category.name, href: `/shop/${category.slug}` },
          { name: sub.name, href: basePath },
        ]}
      />

      <Section>
        <SectionHeading eyebrow={category.name} title={sub.name} description={sub.teaser} as="h1" />

        {sub.bodyRegionSlug && (
          <p className="mt-4 text-sm text-graphite">
            Passende Themen, Übungen und Tape-Anleitungen findest du auf der Seite{' '}
            <Link href={`/koerper/${sub.bodyRegionSlug}`} className="font-bold text-signal hover:underline">
              Körperregion {sub.name}
            </Link>
            .
          </p>
        )}

        <nav aria-label="Weitere Unterkategorien" className="mt-7">
          <ul className="flex flex-wrap gap-2">
            {category.subcategories.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/shop/${category.slug}/${entry.slug}`}
                  className={`ha-chip ${entry.slug === sub.slug ? 'ha-chip-active' : ''}`}
                >
                  {entry.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10">
          <ProductListing
            products={products}
            filterKeys={category.filterKeys}
            state={state}
            sortKey={sortKey}
            basePath={basePath}
            emptyHint={
              <p className="mt-5 text-sm text-slate-soft">
                In dieser Unterkategorie liegen noch keine Beispieldaten. Sobald echte Produktdaten
                eingepflegt sind, erscheinen sie hier automatisch.
              </p>
            }
          />
        </div>

        <HealthNote className="mt-14" />
      </Section>
    </>
  );
}
