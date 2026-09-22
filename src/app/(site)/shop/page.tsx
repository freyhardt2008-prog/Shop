import Link from 'next/link';
import { ProductRail } from '@/components/shop/ProductCard';
import { CategoryTile } from '@/components/shop/Tiles';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getCategories, getEditorsPicks, getProductsByCategory } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Shop – alle Kategorien',
  description:
    'Bandagen & Support, Tapes, Trainingsbänder, Balance & Koordination, Massage & Recovery, EMS & TENS, Yoga & Mobility sowie Sport & Lifestyle bei HEAL ACTIVE.',
  path: '/shop',
});

export default function ShopPage() {
  const categories = getCategories();
  const picks = getEditorsPicks(8);

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Shop', href: '/shop' }]} />

      <Section>
        <SectionHeading
          eyebrow="Shop"
          title="Alles für deinen Weg zurück in die Bewegung"
          description="Acht Kategorien, die aufeinander aufbauen: stabilisieren, trainieren, regenerieren. Du weißt nicht, wo du anfangen sollst? Starte beim Körpernavigator oder beim Finder."
          as="h1"
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/koerper" className="ha-btn ha-btn-dark ha-btn-sm">
            Wo tut es weh?
          </Link>
          <Link href="/finder" className="ha-btn ha-btn-ghost ha-btn-sm">
            HEAL ACTIVE Finder
          </Link>
          <Link href="/produkte-a-z" className="ha-btn ha-btn-ghost ha-btn-sm">
            Alle Produkte A–Z
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryTile key={category.slug} category={category} compact />
          ))}
        </div>
      </Section>

      {categories.map((category, index) => {
        const products = getProductsByCategory(category.slug);
        if (products.length === 0) return null;

        return (
          <Section key={category.slug} tone={index % 2 === 0 ? 'white' : 'sand'}>
            <SectionHeading
              eyebrow={category.tagline}
              title={category.name}
              description={category.description}
              action={{ label: 'Alle ansehen', href: `/shop/${category.slug}` }}
            />

            <ul className="mt-6 flex flex-wrap gap-2">
              {category.subcategories.slice(0, 8).map((sub) => (
                <li key={sub.slug}>
                  <Link href={`/shop/${category.slug}/${sub.slug}`} className="ha-chip">
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ProductRail products={products.slice(0, 8)} />
            </div>
          </Section>
        );
      })}

      <Section>
        <SectionHeading eyebrow="HEAL ACTIVE Favorites" title="Unsere Empfehlungen" />
        <div className="mt-8">
          <ProductRail products={picks} />
        </div>
        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
