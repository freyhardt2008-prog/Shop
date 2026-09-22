import Link from 'next/link';
import { ProductGrid } from '@/components/shop/ProductCard';
import { CheckList } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getCategory, getExercises, getProductsByCategory } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Recovery – Massage, Faszien & Regeneration',
  description:
    'Massagepistolen, Faszienrollen, Massagebälle und Triggerpunkt-Tools: Produkte und Wissen für die Zeit nach der Belastung.',
  path: '/recovery',
});

export default function RecoveryPage() {
  const category = getCategory('massage-recovery');
  const products = getProductsByCategory('massage-recovery');
  const exercises = getExercises().filter((exercise) =>
    exercise.goalSlugs.includes('regeneration'),
  );

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Recovery', href: '/recovery' }]} />

      <Section>
        <SectionHeading
          eyebrow="Recovery"
          title="Erholung ist Teil des Trainings."
          description="Nicht die Belastung macht dich stärker, sondern die Anpassung danach. Recovery-Tools helfen dir, diese Phase bewusst zu gestalten."
          as="h1"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="ha-card p-6">
            <p className="font-display text-lg font-extrabold text-ink">Vor der Belastung</p>
            <p className="ha-prose mt-2 text-sm">
              Kurze, lockere Anwendungen auf niedriger Stufe – als Teil des Aufwärmens, nicht als
              Ersatz dafür.
            </p>
          </div>
          <div className="ha-card p-6">
            <p className="font-display text-lg font-extrabold text-ink">Nach der Belastung</p>
            <p className="ha-prose mt-2 text-sm">
              Faszienrolle und Massagepistole in angenehmer Intensität, danach Bewegung in
              kleinem Umfang.
            </p>
          </div>
          <div className="ha-card p-6">
            <p className="font-display text-lg font-extrabold text-ink">An Ruhetagen</p>
            <p className="ha-prose mt-2 text-sm">
              Mobility, Spaziergänge und Schlaf sind die wirksamsten Recovery-Werkzeuge –
              Tools ergänzen sie.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-chalk bg-white p-6 md:p-8">
          <p className="ha-eyebrow mb-3">Grundregeln für Selbstmassage</p>
          <CheckList
            items={[
              'Immer auf der niedrigsten Intensität beginnen',
              'Knochen, Gelenke, Sehnenansätze und die Wirbelsäule aussparen',
              'Nicht länger als etwa eine Minute auf einer Stelle bleiben',
              'Ruhig weiteratmen – wer die Luft anhält, arbeitet zu intensiv',
              'Nicht auf Schwellungen, Blutergüssen oder frischen Verletzungen anwenden',
            ]}
          />
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow={category?.tagline ?? 'Massage & Recovery'}
          title="Recovery-Produkte"
          action={{ label: 'Kategorie ansehen', href: '/shop/massage-recovery' }}
        />
        <div className="mt-8">
          <ProductGrid products={products} priorityCount={4} />
        </div>
      </Section>

      {exercises.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Anwendung" title="Passende Übungen & Anwendungen" />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <li key={exercise.slug}>
                <Link
                  href={`/uebungen/${exercise.slug}`}
                  className="ha-card ha-card-hover flex h-full flex-col p-5"
                >
                  <span className="font-display text-base font-extrabold text-ink">
                    {exercise.name}
                  </span>
                  <span className="mt-1.5 text-sm text-graphite">{exercise.teaser}</span>
                </Link>
              </li>
            ))}
          </ul>
          <HealthNote className="mt-12" />
        </Section>
      )}
    </>
  );
}
