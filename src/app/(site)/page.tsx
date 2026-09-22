import Link from 'next/link';
import { BodyMap } from '@/components/body-map/BodyMap';
import { LogoMark } from '@/components/brand/LogoMark';
import { ProductRail } from '@/components/shop/ProductCard';
import { CategoryTile, EntryCard, GoalTile, SportTile } from '@/components/shop/Tiles';
import { HealthNote } from '@/components/ui/HealthNote';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import {
  getBackToSportPrograms,
  getCatalogStats,
  getCategories,
  getEditorsPicks,
  getGoals,
  getProductsByCategory,
  getSports,
  getStrongFeetProducts,
  getTapeGuides,
} from '@/lib/catalog';

/**
 * STARTSEITE
 * ---------------------------------------------------------------------------
 * Aufbau folgt der zentralen Customer Journey:
 * Problem → Körperregion → Ziel → Information → Produkt → Anwendung.
 * Deshalb stehen die drei Einstiege ("Wo tut es weh?", "Was möchtest du
 * erreichen?", "Was suchst du?") direkt unter dem Hero – noch vor jedem
 * Produktregal.
 */
export default function HomePage() {
  const categories = getCategories();
  const goals = getGoals();
  const sports = getSports();
  const favorites = getEditorsPicks(8);
  const strongFeet = getStrongFeetProducts().slice(0, 8);
  const recovery = getProductsByCategory('massage-recovery').slice(0, 8);
  const bandages = getProductsByCategory('bandagen-support').slice(0, 8);
  const training = [
    ...getProductsByCategory('trainingsbaender'),
    ...getProductsByCategory('yoga-mobility'),
  ].slice(0, 8);
  const emsTens = getProductsByCategory('ems-tens');
  const programs = getBackToSportPrograms();
  const tapeGuides = getTapeGuides().slice(0, 6);
  const stats = getCatalogStats();

  return (
    <>
      {/* ================================================================ HERO */}
      <section className="relative overflow-hidden border-b border-chalk bg-sand">
        {/* Dezente Hintergrundgrafik */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 text-chalk/60 lg:block"
        >
          <LogoMark className="h-[34rem] w-[34rem]" />
        </div>

        <div className="ha-container relative py-14 md:py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="ha-eyebrow animate-fade">
              Bewegung · Recovery · Rehabilitation · Sport
            </p>

            <h1 className="mt-4 text-display-xl animate-rise">
              GET BACK
              <br />
              IN <span className="text-signal">MOTION.</span>
            </h1>

            <p className="mt-6 font-display text-xl font-bold tracking-tight text-graphite md:text-2xl">
              Support. Recover. Move.
            </p>

            <p className="ha-prose mt-5 max-w-xl text-base md:text-lg">
              Du willst wieder los. Wir zeigen dir, welche Produkte dich dabei unterstützen
              können – sortiert nach Körperregion, Ziel und Sportart, erklärt in verständlicher
              Sprache.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/finder" className="ha-btn ha-btn-primary">
                Finde dein Produkt
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/koerper" className="ha-btn ha-btn-ghost">
                Wo tut es weh?
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="ha-eyebrow">Produkte</dt>
                <dd className="font-display text-xl font-extrabold text-ink">{stats.products}</dd>
              </div>
              <div>
                <dt className="ha-eyebrow">Körperregionen</dt>
                <dd className="font-display text-xl font-extrabold text-ink">{stats.bodyRegions}</dd>
              </div>
              <div>
                <dt className="ha-eyebrow">Übungen</dt>
                <dd className="font-display text-xl font-extrabold text-ink">{stats.exercises}</dd>
              </div>
              <div>
                <dt className="ha-eyebrow">Tape-Anleitungen</dt>
                <dd className="font-display text-xl font-extrabold text-ink">{stats.tapeGuides}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ================================================== DREI EINSTIEGE */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Wie möchtest du starten?"
          title="Drei Wege zu deinem Produkt"
          description="HEAL ACTIVE ist kein Katalog zum Durchblättern. Du startest bei deiner Situation – und landest bei dem, was zu dir passt."
        />

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
          <EntryCard
            eyebrow="Schritt 1"
            title="Wo tut es weh?"
            description="Wähle deine Körperregion auf der interaktiven Figur – von Nacken bis Ferse."
            href="/koerper"
            cta="Körper auswählen"
            icon="body"
            tone="ink"
          />
          <EntryCard
            eyebrow="Schritt 2"
            title="Was möchtest du erreichen?"
            description="Stabilisieren, mobilisieren, regenerieren oder zurück in deinen Sport."
            href="/ziel"
            cta="Ziel auswählen"
            icon="target"
          />
          <EntryCard
            eyebrow="Schritt 3"
            title="Was suchst du?"
            description="Alle Produkte alphabetisch von A bis Z – wenn du schon genau weißt, was du brauchst."
            href="/produkte-a-z"
            cta="Produkte A–Z"
            icon="search"
          />
        </div>
      </Section>

      {/* ===================================================== KÖRPERNAVIGATOR */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="ha-eyebrow">Körpernavigator</p>
            <h2 className="mt-3 text-display-lg">
              Zeig uns,
              <br />
              wo es zwickt.
            </h2>
            <p className="ha-prose mt-5 max-w-lg">
              Klicke direkt auf die Region, die dich beschäftigt. Du bekommst passende Themen,
              Übungen, Tape-Anleitungen und Produkte – ohne dich durch Kategorien arbeiten zu
              müssen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/koerper" className="ha-btn ha-btn-dark">
                Alle Regionen ansehen
              </Link>
              <Link href="/finder" className="ha-btn ha-btn-ghost">
                Lieber geführt? Zum Finder
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <BodyMap className="w-full max-w-md" />
          </div>
        </div>
      </Section>

      {/* ======================================================= BACK TO SPORT */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="Back to Sport"
          title="Der Weg zurück hat eine Struktur."
          description="Vier Phasen, klare Checkliste: So verbindest du Produkte, Übungen und Belastungsaufbau zu einem nachvollziehbaren Plan."
          action={{ label: 'Alle Programme', href: '/back-to-sport' }}
          className="[&_p.ha-prose]:text-white/70 [&_.ha-eyebrow]:text-white/50 [&_a]:border-white/25 [&_a]:text-white"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {programs.map((program) => (
            <Link
              key={program.slug}
              href={`/back-to-sport/${program.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-white/12 bg-white/5 p-5 transition-colors hover:border-signal hover:bg-white/10"
            >
              <span>
                <span className="block font-display text-lg font-extrabold leading-tight text-white">
                  {program.name}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-white/65">
                  {program.claim}
                </span>
              </span>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-signal">
                Programm ansehen
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ================================================ HEAL ACTIVE FAVORITES */}
      <Section tone="white">
        <SectionHeading
          eyebrow="HEAL ACTIVE Favorites"
          title="Unsere Empfehlungen zum Einstieg"
          description="Produkte, die in fast jeder Situation eine sinnvolle Grundausstattung bilden."
          action={{ label: 'Zum Shop', href: '/shop' }}
        />
        <div className="mt-8">
          <ProductRail products={favorites} />
        </div>
      </Section>

      {/* ============================================ STRONG FEET – STRONG BODY */}
      <Section>
        <div className="rounded-3xl bg-ink px-6 py-10 text-white md:px-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-14">
            <div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12">
                <Icon name="foot" size={24} />
              </span>
              <p className="ha-eyebrow mt-5 text-white/50">Themenbereich</p>
              <h2 className="mt-2 font-display text-display-md">
                STRONG FEET –
                <br />
                STRONG BODY.
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-white/70">
                Sprunggelenk, Achillessehne, Knie und Fußmuskulatur hängen zusammen. Wer unten
                stabil ist, bewegt sich oben sicherer. Balance Pads, Wackelbretter, weiche
                Sensomotorikmatten und Fußtrainer bilden das Herzstück dieses Bereichs.
              </p>
              <Link href="/strong-feet" className="ha-btn ha-btn-primary mt-7">
                Bereich entdecken
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 md:p-6">
              <ProductRail products={strongFeet} />
            </div>
          </div>
        </div>
      </Section>

      {/* ========================================================= TAPE YOURSELF */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Tape Yourself"
          title="Tape-Anlagen, die du selbst hinbekommst"
          description="Schritt für Schritt erklärt – mit Materialliste, Tape-Länge, Hinweisen und Kontraindikationen."
          action={{ label: 'Alle Anleitungen', href: '/tape-yourself' }}
        />

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tapeGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/tape-yourself/${guide.slug}`}
              className="ha-card ha-card-hover group flex items-center justify-between gap-4 p-5"
            >
              <span>
                <span className="block font-display text-base font-extrabold text-ink">
                  {guide.name}
                </span>
                <span className="mt-1 block text-sm text-graphite">{guide.teaser}</span>
                <span className="mt-2 flex items-center gap-3 text-xs text-slate-soft">
                  <span>ca. {guide.durationMinutes} Min.</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{guide.difficulty}</span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-signal transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ============================================================= RECOVERY */}
      <Section>
        <SectionHeading
          eyebrow="Recovery"
          title="Erholung ist Teil des Trainings"
          description="Massagepistolen, Faszienrollen und Triggerpunkt-Tools für die Zeit nach der Belastung."
          action={{ label: 'Zum Recovery-Bereich', href: '/recovery' }}
        />
        <div className="mt-8">
          <ProductRail products={recovery} />
        </div>
      </Section>

      {/* =================================================== BANDAGEN & SUPPORT */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Bandagen & Support"
          title="Führung und Entlastung für jedes Gelenk"
          action={{ label: 'Alle Bandagen', href: '/shop/bandagen-support' }}
        />
        <div className="mt-8">
          <ProductRail products={bandages} />
        </div>
      </Section>

      {/* ================================================== TRAINING & MOBILITY */}
      <Section>
        <SectionHeading
          eyebrow="Training & Mobility"
          title="Kraft aufbauen, beweglich bleiben"
          action={{ label: 'Trainingsbänder', href: '/shop/trainingsbaender' }}
        />
        <div className="mt-8">
          <ProductRail products={training} />
        </div>
      </Section>

      {/* ============================================================ EMS & TENS */}
      <Section tone="white">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-14">
          <div>
            <p className="ha-eyebrow">EMS & TENS</p>
            <h2 className="mt-2 text-display-md">Elektrostimulation – verständlich erklärt</h2>
            <p className="ha-prose mt-4">
              Was ist der Unterschied zwischen EMS und TENS? Wann wird was eingesetzt und worauf
              muss man achten? Wir erklären die Grundlagen in klarer Sprache – inklusive
              Sicherheitshinweisen und Gegenanzeigen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/shop/ems-tens" className="ha-btn ha-btn-dark">
                Zum Bereich
              </Link>
              <Link href="/guide/ems-tens" className="ha-btn ha-btn-ghost">
                EMS & TENS verstehen
              </Link>
            </div>
          </div>
          <ProductRail products={emsTens} />
        </div>
      </Section>

      {/* ========================================================== ZIELE / SPORT */}
      <Section>
        <SectionHeading
          eyebrow="Dein Ziel"
          title="Was möchtest du erreichen?"
          action={{ label: 'Alle Ziele', href: '/ziel' }}
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {goals.slice(0, 8).map((goal) => (
            <GoalTile key={goal.slug} goal={goal} />
          ))}
        </div>

        <SectionHeading
          eyebrow="Sportart"
          title="Passend zu deinem Sport"
          action={{ label: 'Alle Sportarten', href: '/sport' }}
          className="mt-16"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sports.slice(0, 8).map((sport) => (
            <SportTile key={sport.slug} sport={sport} />
          ))}
        </div>
      </Section>

      {/* ========================================================== KATEGORIEN */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Shop"
          title="Alle Kategorien"
          action={{ label: 'Shop-Übersicht', href: '/shop' }}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryTile key={category.slug} category={category} compact />
          ))}
        </div>
      </Section>

      {/* ============================================================== HINWEIS */}
      <Section>
        <HealthNote />
      </Section>
    </>
  );
}
