import { CartView } from '@/components/shop/CartView';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Warenkorb',
  description: 'Dein Warenkorb bei HEAL ACTIVE.',
  path: '/warenkorb',
  noIndex: true,
});

export default function CartPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Warenkorb', href: '/warenkorb' }]} />
      <Section>
        <h1 className="text-display-md">Warenkorb</h1>
        <div className="mt-8">
          <CartView />
        </div>
      </Section>
    </>
  );
}
