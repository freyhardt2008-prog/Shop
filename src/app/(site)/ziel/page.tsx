import { GoalTile } from '@/components/shop/Tiles';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getGoals } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Dein Ziel – was möchtest du erreichen?',
  description:
    'Stabilisieren, mobilisieren, Kraft aufbauen, Balance verbessern, regenerieren oder zurück in den Sport: Finde Produkte passend zu deinem persönlichen Ziel.',
  path: '/ziel',
});

export default function GoalsPage() {
  const goals = getGoals();

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Dein Ziel', href: '/ziel' }]} />

      <Section>
        <SectionHeading
          eyebrow="Dein Ziel"
          title="Was möchtest du erreichen?"
          description="Nicht jede Suche beginnt mit einem Körperteil. Manchmal weißt du einfach, was du erreichen willst – und genau dort steigst du hier ein."
          as="h1"
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <GoalTile key={goal.slug} goal={goal} />
          ))}
        </div>
        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
