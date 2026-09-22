import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProductListing } from '@/components/shop/ProductListing';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getCategories, getCategory, getProductsByCategory } from '@/lib/catalog';
import { parseFilterState, parseSortKey } from '@/lib/filters';
import { buildMetadata } from '@/lib/seo';

type Params = { category: string };
type Search = Record<string, string | string[] | undefined>;

/** Alle Kategorieseiten werden statisch vorgeneriert (SEO + Performance). */
export function generateStaticParams(): Params[] {
  return getCategories().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return buildMetadata({ title: 'Kategorie', description: '', path: '/shop' });

  return buildMetadata({
    title: `${category.name} – ${category.tagline}`,
    description: category.description,
    path: `/shop/${category.slug}`,
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const search = await searchParams;
  const state = parseFilterState(search);
  const sortKey = parseSortKey(search);
  const products = getProductsByCategory(category.slug);
  const basePath = `/shop/${category.slug}`;

  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: 'Shop', href: '/shop' },
          { name: category.name, href: basePath },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow={category.tagline}
          title={category.name}
          description={category.description}
          as="h1"
        />

        {/* Unterkategorien als schnelle Einstiege */}
        <nav aria-label="Unterkategorien" className="mt-7">
          <ul className="flex flex-wrap gap-2">
            {category.subcategories.map((sub) => (
              <li key={sub.slug}>
                <Link href={`${basePath}/${sub.slug}`} className="ha-chip">
                  {sub.name}
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
          />
        </div>

        <HealthNote className="mt-14" />
      </Section>
    </>
  );
}
