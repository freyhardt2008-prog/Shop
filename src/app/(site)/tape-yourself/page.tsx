import Link from 'next/link';
import { ProductRail } from '@/components/shop/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Section, SectionHeading } from '@/components/ui/Section';
import { WarningList } from '@/components/ui/Accordion';
import { getBodyRegion, getProductsByCategory, getTapeGuides } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'TAPE YOURSELF – Tape-Anleitungen Schritt für Schritt',
  description:
    'Sprunggelenk, Knie, Achillessehne, Schulter, Rücken und mehr selbst tapen: Anleitungen mit Materialliste, Tape-Länge, Schritten, Hinweisen und Kontraindikationen.',
  path: '/tape-yourself',
});

export default function TapeYourselfPage() {
  const guides = getTapeGuides();
  const tapeProducts = getProductsByCategory('tapes');

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Tape Yourself', href: '/tape-yourself' }]} />

      <Section>
        <SectionHeading
          eyebrow="Tape Yourself"
          title="Tape dich selbst."
          description="Tapen ist kein Geheimwissen. Mit sauberer Vorbereitung, der richtigen Länge und ein bisschen Übung bekommst du die gängigen Anlagen selbst hin. Jede Anleitung nennt Material, Schritte, Hinweise und Gegenanzeigen."
          as="h1"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => {
            const region = getBodyRegion(guide.bodyRegionSlug);
            return (
              <Link
                key={guide.slug}
                href={`/tape-yourself/${guide.slug}`}
                className="ha-card ha-card-hover group flex h-full flex-col p-5 md:p-6"
              >
                {region && <span className="ha-eyebrow">{region.name}</span>}
                <span className="mt-1.5 font-display text-lg font-extrabold text-ink">
                  {guide.name}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-graphite">{guide.teaser}</span>
                <span className="mt-4 flex items-center gap-3 text-xs text-slate-soft">
                  <span>ca. {guide.durationMinutes} Min.</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{guide.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>{guide.steps.length} Schritte</span>
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-signal">
                  Anleitung öffnen{' '}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow="Grundlagen" title="Was du vor der ersten Anlage wissen solltest" />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="ha-card p-5">
            <p className="font-display text-base font-extrabold text-ink">1. Haut vorbereiten</p>
            <p className="ha-prose mt-2 text-sm">
              Reinigen, trocknen, fettfrei halten. Cremes und Öle verhindern die Haftung. Starke
              Behaarung vorher kürzen.
            </p>
          </div>
          <div className="ha-card p-5">
            <p className="font-display text-base font-extrabold text-ink">2. Ecken abrunden</p>
            <p className="ha-prose mt-2 text-sm">
              Abgerundete Enden lösen sich deutlich seltener – besonders an Fuß und Schulter.
            </p>
          </div>
          <div className="ha-card p-5">
            <p className="font-display text-base font-extrabold text-ink">3. Zugfrei beginnen</p>
            <p className="ha-prose mt-2 text-sm">
              Die ersten und letzten Zentimeter immer ohne Zug ankleben. Zug gehört nur in den
              mittleren Teil – und auch dort sparsam.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <WarningList
            title="Wann du nicht tapen solltest"
            items={[
              'Offene Wunden, frische Narben oder gereizte Haut im Klebebereich',
              'Bekannte Allergie gegen Acrylatkleber',
              'Unklare Schwellung, starke Schmerzen oder Verdacht auf eine Fraktur – erst ärztlich abklären lassen',
              'Durchblutungs- oder Sensibilitätsstörungen ohne ärztliche Rücksprache',
              'Bei Taubheitsgefühl, Kribbeln oder Hautverfärbung das Tape sofort entfernen',
            ]}
          />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Material"
          title="Passendes Tape kaufen"
          action={{ label: 'Alle Tapes', href: '/shop/tapes' }}
        />
        <div className="mt-8">
          <ProductRail products={tapeProducts} />
        </div>
        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
