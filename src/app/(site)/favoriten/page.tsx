import { FavoritesView } from '@/components/shop/FavoritesView';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { getProducts } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Favoriten',
  description: 'Deine gemerkten Produkte bei HEAL ACTIVE.',
  path: '/favoriten',
  noIndex: true,
});

export default function FavoritesPage() {
  // Der komplette Katalog wird serverseitig gerendert; der Client filtert nur.
  const products = getProducts();

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Favoriten', href: '/favoriten' }]} />
      <Section>
        <h1 className="text-display-md">Deine Favoriten</h1>
        <p className="ha-prose mt-3 max-w-2xl">
          Gemerkte Produkte werden lokal in deinem Browser gespeichert. Sobald es ein Kundenkonto
          gibt, wandert die Liste dorthin.
        </p>
        <div className="mt-8">
          <FavoritesView products={products} />
        </div>
      </Section>
    </>
  );
}
