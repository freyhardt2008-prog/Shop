import { SportTile } from '@/components/shop/Tiles';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getSports } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sportarten – Produkte passend zu deinem Sport',
  description:
    'Laufen, Fußball, Tennis, Padel, Golf, Schwimmen, Radfahren, Fitness, Krafttraining, Yoga, Wandern, Ski und Teamsport – finde Produkte und Wissen passend zu deiner Sportart.',
  path: '/sport',
});

export default function SportsPage() {
  const sports = getSports();

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Sportart', href: '/sport' }]} />

      <Section>
        <SectionHeading
          eyebrow="Sportart"
          title="Passend zu deinem Sport"
          description="Jede Sportart belastet andere Strukturen. Wähle deinen Sport und sieh, welche Regionen typischerweise im Mittelpunkt stehen."
          as="h1"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sports.map((sport) => (
            <SportTile key={sport.slug} sport={sport} />
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-soft">
          Deine Sportart fehlt? Die Datenstruktur ist offen angelegt – neue Sportarten lassen sich
          jederzeit ergänzen.
        </p>
        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
