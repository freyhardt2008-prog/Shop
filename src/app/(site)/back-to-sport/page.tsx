import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getBackToSportPrograms, getSport } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'BACK TO SPORT – strukturiert zurück in dein Training',
  description:
    'Back to Running, Tennis, Football, Fitness und Swimming: Programme, die Information, Übungen, Mobility, Stabilität, Koordination, Recovery und passende Produkte verbinden.',
  path: '/back-to-sport',
});

export default function BackToSportPage() {
  const programs = getBackToSportPrograms();

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Back to Sport', href: '/back-to-sport' }]} />

      <Section>
        <SectionHeading
          eyebrow="Back to Sport"
          title="Der Weg zurück hat eine Struktur."
          description="Zwischen „im Alltag beschwerdefrei“ und „wieder voll im Sport“ liegt oft eine lange Strecke. Diese Programme zeigen, wie sich Produkte, Übungen und Belastungsaufbau sinnvoll kombinieren lassen – als Orientierung, nicht als Therapieplan."
          as="h1"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const sport = getSport(program.sportSlug);
            return (
              <Link
                key={program.slug}
                href={`/back-to-sport/${program.slug}`}
                className="ha-card ha-card-hover group flex h-full flex-col justify-between p-6 md:p-7"
              >
                <div>
                  {sport && (
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-ink transition-colors group-hover:bg-signal group-hover:text-white">
                      <Icon name={sport.icon} size={24} />
                    </span>
                  )}
                  <p className="mt-5 font-display text-xl font-extrabold leading-tight text-ink">
                    {program.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">{program.claim}</p>
                </div>
                <div className="mt-6">
                  <p className="text-xs text-slate-soft">
                    {program.phases.length} Phasen · {program.checklist.length} Checklistenpunkte
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-signal">
                    Programm ansehen{' '}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
