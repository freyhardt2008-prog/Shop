import Link from 'next/link';
import { BodyMap, BodyRegionList } from '@/components/body-map/BodyMap';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getBodyRegions, getConditions } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Wo tut es weh? – Körpernavigator',
  description:
    'Wähle deine Körperregion und finde passende Themen, Übungen, Tape-Anleitungen und Produkte – von Nacken und Schulter bis Sprunggelenk, Achillessehne und Fuß.',
  path: '/koerper',
});

export default function BodyPage() {
  const regions = getBodyRegions();
  const conditions = getConditions();

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Körper & Beschwerden', href: '/koerper' }]} />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Körpernavigator"
              title="Wo tut es weh?"
              description="Klicke direkt auf die Region, die dich beschäftigt – oder wähle sie unten aus der Liste. Du bekommst Themen, Übungen, Tape-Anleitungen und passende Produkte an einem Ort."
              as="h1"
            />
            <p className="mt-5 text-sm text-slate-soft">
              {regions.length} Körperregionen · {conditions.length} Themen
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/finder" className="ha-btn ha-btn-primary ha-btn-sm">
                Lieber geführt? Zum Finder
              </Link>
              <Link href="/ziel" className="ha-btn ha-btn-ghost ha-btn-sm">
                Nach Ziel suchen
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <BodyMap className="w-full max-w-lg" />
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Alle Regionen" title="Direkt auswählen" />
        <div className="mt-8">
          <BodyRegionList />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Themen"
          title="Häufige Anlässe"
          description="Alle Themen im Überblick – beschreibend formuliert, ohne Diagnosecharakter."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((condition) => (
            <li key={condition.slug}>
              <Link
                href={`/beschwerden/${condition.slug}`}
                className="ha-card ha-card-hover group flex h-full flex-col p-5"
              >
                <span className="ha-eyebrow">
                  {regions.find((region) => region.slug === condition.regionSlug)?.name}
                </span>
                <span className="mt-1.5 font-display text-base font-extrabold text-ink">
                  {condition.name}
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-graphite">
                  {condition.teaser}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
