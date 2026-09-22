import { OrderConfirmationView } from '@/components/shop/OrderConfirmationView';
import { Section } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Bestellbestätigung',
  description: 'Bestätigung deiner Bestellung bei HEAL ACTIVE.',
  path: '/checkout/bestaetigung',
  noIndex: true,
});

export default function OrderConfirmationPage() {
  return (
    <Section>
      <OrderConfirmationView />
    </Section>
  );
}
