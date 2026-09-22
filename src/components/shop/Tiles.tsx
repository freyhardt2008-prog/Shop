import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { Category, Goal, Sport } from '@/lib/types';

/** Kachel für eine Produktkategorie. */
export function CategoryTile({ category, compact = false }: { category: Category; compact?: boolean }) {
  return (
    <Link
      href={`/shop/${category.slug}`}
      className="ha-card ha-card-hover group flex flex-col justify-between gap-6 p-5 md:p-6"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-ink transition-colors group-hover:bg-signal group-hover:text-white">
        <Icon name={category.icon} size={24} />
      </span>
      <span>
        <span className="block font-display text-lg font-extrabold leading-tight text-ink md:text-xl">
          {category.name}
        </span>
        <span className="mt-1.5 block text-sm leading-relaxed text-graphite">
          {compact ? category.tagline : category.description}
        </span>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-signal">
          Ansehen <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}

/** Kachel für ein Ziel ("Dein Ziel"). */
export function GoalTile({ goal }: { goal: Goal }) {
  return (
    <Link
      href={`/ziel/${goal.slug}`}
      className="ha-card ha-card-hover group flex items-start gap-4 p-5"
    >
      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pulse-soft text-pulse-dark transition-colors group-hover:bg-pulse group-hover:text-white">
        <Icon name={goal.icon} size={22} />
      </span>
      <span>
        <span className="block font-display text-base font-extrabold text-ink">{goal.name}</span>
        <span className="mt-1 block text-sm leading-relaxed text-graphite">{goal.claim}</span>
      </span>
    </Link>
  );
}

/** Kachel für eine Sportart. */
export function SportTile({ sport }: { sport: Sport }) {
  return (
    <Link
      href={`/sport/${sport.slug}`}
      className="ha-card ha-card-hover group flex flex-col gap-3 p-5"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sand text-ink transition-colors group-hover:bg-ink group-hover:text-white">
        <Icon name={sport.icon} size={22} />
      </span>
      <span>
        <span className="block font-display text-base font-extrabold text-ink">{sport.name}</span>
        <span className="mt-1 block text-sm leading-relaxed text-graphite">{sport.teaser}</span>
      </span>
    </Link>
  );
}

/** Große Auswahlkachel für die drei Einstiege auf der Startseite. */
export function EntryCard({
  eyebrow,
  title,
  description,
  href,
  cta,
  icon,
  tone = 'white',
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: Parameters<typeof Icon>[0]['name'];
  tone?: 'white' | 'ink' | 'signal';
}) {
  const tones = {
    white: 'ha-card text-ink',
    ink: 'bg-ink text-white border border-ink rounded-card shadow-soft',
    signal: 'bg-signal text-white border border-signal rounded-card shadow-soft',
  } as const;

  const muted = tone === 'white' ? 'text-graphite' : 'text-white/75';
  const iconBg =
    tone === 'white' ? 'bg-sand text-ink' : 'bg-white/15 text-white backdrop-blur';

  return (
    <Link
      href={href}
      className={`ha-card-hover group flex min-h-[15rem] flex-col justify-between p-6 md:p-8 ${tones[tone]}`}
    >
      <div>
        <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}>
          <Icon name={icon} size={24} />
        </span>
        <p className={`ha-eyebrow mt-5 ${tone === 'white' ? '' : 'text-white/60'}`}>{eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight md:text-3xl">
          {title}
        </h3>
        <p className={`mt-2.5 text-sm leading-relaxed ${muted}`}>{description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
        {cta}
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
