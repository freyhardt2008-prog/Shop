import Link from 'next/link';
import { ProductGrid } from '@/components/shop/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getEditorsPicks } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'HEAL ACTIVE Favorites – unsere Empfehlungen',
  description:
    'Die Produkte, die in fast jeder Situation eine sinnvolle Grundausstattung bilden – redaktionell ausgewählt.',
  path: '/favorites',
});

export default function EditorsPicksPage() {
  const picks = getEditorsPicks(24);

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'HEAL ACTIVE Favorites', href: '/favorites' }]} />

      <Section>
        <SectionHeading
          eyebrow="HEAL ACTIVE Favorites"
          title="Unsere Empfehlungen"
          description="Eine redaktionelle Auswahl aus den Beispieldaten – Produkte, die sich in vielen Situationen als sinnvoller Einstieg eignen. Keine Empfehlung für den Einzelfall."
          as="h1"
        />
        <div className="mt-10">
          <ProductGrid products={picks} priorityCount={4} />
        </div>

        <p className="mt-8 text-sm text-slate-soft">
          Du suchst deine eigene Merkliste? Die findest du unter{' '}
          <Link href="/favoriten" className="font-bold text-signal hover:underline">
            Favoriten
          </Link>
          .
        </p>

        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
