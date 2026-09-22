import Link from 'next/link';
import { CheckoutForm } from '@/components/shop/CheckoutForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Kasse',
  description: 'Bestellung abschließen bei HEAL ACTIVE.',
  path: '/checkout',
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { name: 'Warenkorb', href: '/warenkorb' },
          { name: 'Kasse', href: '/checkout' },
        ]}
      />
      <Section>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h1 className="text-display-md">Kasse</h1>
          <Link href="/warenkorb" className="text-sm font-bold text-signal hover:underline">
            ← Zurück zum Warenkorb
          </Link>
        </div>
        <div className="mt-8">
          <CheckoutForm />
        </div>
      </Section>
    </>
  );
}
