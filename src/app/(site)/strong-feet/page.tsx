import Link from 'next/link';
import { ProductGrid } from '@/components/shop/ProductCard';
import { CheckList } from '@/components/ui/Accordion';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { HealthNote } from '@/components/ui/HealthNote';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import { getExercises, getStrongFeetProducts } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'STRONG FEET – STRONG BODY',
  description:
    'Sensomotorisches Training für Fuß, Sprunggelenk und Knie: Balance Pads, Wackelbretter, weiche Sensomotorikmatten, Fußtrainer und Igelbälle – plus die passenden Übungen.',
  path: '/strong-feet',
});

export default function StrongFeetPage() {
  const products = getStrongFeetProducts();
  const exercises = getExercises().filter((exercise) =>
    exercise.bodyRegionSlugs.some((region) =>
      ['fuss', 'sprunggelenk', 'ferse', 'knie'].includes(region),
    ),
  );

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Strong Feet – Strong Body', href: '/strong-feet' }]} />

      <section className="bg-ink py-14 text-white md:py-20">
        <div className="ha-container">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12">
            <Icon name="foot" size={28} />
          </span>
          <p className="ha-eyebrow mt-6 text-white/50">Themenbereich</p>
          <h1 className="mt-3 text-display-xl">
            STRONG FEET
            <br />
            STRONG <span className="text-signal">BODY.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Deine Füße tragen jeden Schritt – und liefern die Informationen, aus denen dein Körper
            Gleichgewicht macht. Wer unten stabil ist, bewegt sich oben sicherer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#produkte" className="ha-btn ha-btn-primary">
              Produkte ansehen
            </Link>
            <Link href="/koerper/fuss" className="ha-btn ha-btn-sm border border-white/25 px-6 text-white hover:bg-white/10">
              Körperregion Fuß
            </Link>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-display-md">Warum ausgerechnet die Füße?</h2>
            <div className="ha-prose mt-5">
              <p>
                Das Sprunggelenk ist die am häufigsten verletzte Struktur im Sport. Nach einem
                Umknickereignis bleibt oft ein Unsicherheitsgefühl zurück – auch dann, wenn keine
                Schmerzen mehr da sind.
              </p>
              <p>
                Der Grund liegt selten in der Kraft allein: Es fehlt die feine Ansteuerung, also die
                Fähigkeit, schnell und präzise auf Unebenheiten zu reagieren. Genau diese
                Fähigkeit trainiert man mit instabilen Unterlagen.
              </p>
              <p>
                Und weil Fuß, Knie und Hüfte eine Kette bilden, wirkt Fußtraining weit über den
                Fuß hinaus.
              </p>
            </div>
          </div>

          <div className="ha-card p-6 md:p-8">
            <p className="ha-eyebrow mb-4">Die Progression in vier Stufen</p>
            <CheckList
              items={[
                'Stufe 1: Barfuß auf festem Boden – Zehen ansteuern, Einbeinstand halten',
                'Stufe 2: Balance Pad – weiche Unterlage, beidbeinig und dann einbeinig',
                'Stufe 3: Wackelbrett oder Sensomotorikmatte – Bewegung in alle Richtungen',
                'Stufe 4: Balance-Halbball mit Zusatzaufgabe – Ball fangen, Augen schließen, Sprungtraining',
              ]}
            />
            <p className="mt-5 text-xs leading-relaxed text-slate-soft">
              Steigere erst dann, wenn die aktuelle Stufe ruhig und kontrolliert gelingt. Halte
              immer eine Haltemöglichkeit in Reichweite.
            </p>
          </div>
        </div>
      </Section>

      <Section id="produkte" tone="white">
        <SectionHeading
          eyebrow="Produkte"
          title="Balance, Koordination & Fußtraining"
          action={{ label: 'Kategorie ansehen', href: '/shop/balance-koordination' }}
        />
        <div className="mt-8">
          <ProductGrid products={products} priorityCount={4} />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Übungen"
          title="Die passenden Übungen"
          action={{ label: 'Alle Übungen', href: '/uebungen' }}
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <li key={exercise.slug}>
              <Link
                href={`/uebungen/${exercise.slug}`}
                className="ha-card ha-card-hover flex h-full flex-col p-5"
              >
                <span className="ha-eyebrow capitalize">{exercise.difficulty}</span>
                <span className="mt-1.5 font-display text-base font-extrabold text-ink">
                  {exercise.name}
                </span>
                <span className="mt-1.5 text-sm text-graphite">{exercise.teaser}</span>
              </Link>
            </li>
          ))}
        </ul>
        <HealthNote className="mt-12" />
      </Section>
    </>
  );
}
