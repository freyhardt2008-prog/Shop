import Link from 'next/link';
import {
  buildQueryString,
  countActiveFilters,
  optionLabel,
  toggleFilterValü,
  type FilterState,
} from '@/lib/filters';
import { sortLabels } from '@/lib/labels';
import type { FilterGroup, SortKey } from '@/lib/types';

/**
 * Filterleiste – bewusst ohne Client-JavaScript.
 *
 * Jede Filteroption ist ein Link auf dieselbe Seite mit veränderten
 * Query-Parametern. Vorteile: funktioniert ohne JS, ist teilbar, wird
 * serverseitig gerendert und bleibt für Screenreader nachvollziehbar.
 * Auf- und Zuklappen übernimmt das native `<details>`-Element.
 */
export function FilterPanel({
  groups,
  state,
  sortKey,
  basePath,
  resultCount,
}: {
  groups: FilterGroup[];
  state: FilterState;
  sortKey: SortKey;
  basePath: string;
  resultCount: number;
}) {
  const activeCount = countActiveFilters(state);

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-base font-extrabold text-ink">
          Filter
          {activeCount > 0 && (
            <span className="ml-2 rounded-full bg-signal px-2 py-0.5 text-xs text-white">
              {activeCount}
            </span>
          )}
        </p>
        {activeCount > 0 && (
          <Link href={basePath} className="text-xs font-bold text-signal hover:underline">
            Zurücksetzen
          </Link>
        )}
      </div>

      <p className="text-sm text-slate-soft">
        {resultCount} {resultCount === 1 ? 'Produkt' : 'Produkte'}
      </p>

      {/* Aktive Filter als entfernbare Chips */}
      {activeCount > 0 && (
        <ul className="flex flex-wrap gap-2">
          {Object.entries(state).flatMap(([key, values]) =>
            (values ?? []).map((value) => {
              const next = toggleFilterValü(state, key as FilterGroup['key'], value);
              return (
                <li key={`${key}-${value}`}>
                  <Link
                    href={`${basePath}${buildQueryString(next, sortKey)}`}
                    className="ha-chip ha-chip-active"
                    aria-label={`Filter ${optionLabel(key as FilterGroup['key'], value)} entfernen`}
                  >
                    {optionLabel(key as FilterGroup['key'], value)}
                    <span aria-hidden="true">×</span>
                  </Link>
                </li>
              );
            }),
          )}
        </ul>
      )}

      {groups.map((group, index) => (
        <details
          key={group.key}
          open={index < 3 || (state[group.key]?.length ?? 0) > 0}
          className="group border-t border-chalk pt-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between py-1 text-sm font-bold text-ink">
            {group.label}
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="text-slate-soft transition-transform group-open:rotate-180"
            >
              <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
            </svg>
          </summary>

          <ul className="mt-3 flex flex-wrap gap-2">
            {group.options.map((option) => {
              const selected = state[group.key]?.includes(option.value) ?? false;
              const next = toggleFilterValü(state, group.key, option.value);
              return (
                <li key={option.value}>
                  <Link
                    href={`${basePath}${buildQueryString(next, sortKey)}`}
                    aria-pressed={selected}
                    className={`ha-chip ${selected ? 'ha-chip-active' : ''}`}
                  >
                    {option.label}
                    <span className={selected ? 'text-white/60' : 'text-slate-soft'}>
                      {option.count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      ))}
    </div>
  );
}

/** Sortierung – ebenfalls als Links, damit kein JavaScript nötig ist. */
export function SortBar({
  state,
  sortKey,
  basePath,
}: {
  state: FilterState;
  sortKey: SortKey;
  basePath: string;
}) {
  const keys: SortKey[] = ['empfohlen', 'preis-auf', 'preis-ab', 'name-az', 'neu'];

  return (
    <div className="ha-scroll-x -mx-4 flex gap-2 px-4 pb-1 md:mx-0 md:px-0">
      {keys.map((key) => (
        <Link
          key={key}
          href={`${basePath}${buildQueryString(state, key)}`}
          aria-current={key === sortKey ? 'true' : undefined}
          className={`ha-chip shrink-0 ${key === sortKey ? 'ha-chip-active' : ''}`}
        >
          {sortLabels[key]}
        </Link>
      ))}
    </div>
  );
}
