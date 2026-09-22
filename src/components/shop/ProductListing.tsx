import Link from 'next/link';
import { ProductGrid } from '@/components/shop/ProductCard';
import { applyFilters, buildFilterGroups, sortProducts, type FilterState } from '@/lib/filters';
import type { FilterKey, Product, SortKey } from '@/lib/types';
import { FilterPanel, SortBar } from './FilterPanel';

/**
 * Produktliste mit intelligenten Filtern.
 *
 * Die Filteroptionen werden aus der ungefilterten Produktmenge berechnet
 * (damit Nutzer:innen jederzeit umschalten können), das Ergebnis aus der
 * gefilterten. Filter mit weniger als zwei Ausprägungen blendet
 * `buildFilterGroups` automatisch aus.
 */
export function ProductListing({
  products,
  filterKeys,
  state,
  sortKey,
  basePath,
  emptyHint,
}: {
  products: Product[];
  filterKeys: FilterKey[];
  state: FilterState;
  sortKey: SortKey;
  basePath: string;
  emptyHint?: React.ReactNode;
}) {
  const groups = buildFilterGroups(products, filterKeys);
  const filtered = sortProducts(applyFilters(products, state), sortKey);

  return (
    <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
      {/* Filter: auf dem Handy eingeklappt, ab lg als Seitenspalte */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <details className="ha-card p-4 lg:hidden" open={false}>
          <summary className="flex cursor-pointer list-none items-center justify-between font-display text-base font-extrabold text-ink">
            Filter & Sortierung
            <span className="ha-btn ha-btn-ghost ha-btn-sm pointer-events-none">Öffnen</span>
          </summary>
          <div className="mt-4 space-y-5">
            <SortBar state={state} sortKey={sortKey} basePath={basePath} />
            <FilterPanel
              groups={groups}
              state={state}
              sortKey={sortKey}
              basePath={basePath}
              resultCount={filtered.length}
            />
          </div>
        </details>

        <div className="hidden lg:block">
          <FilterPanel
            groups={groups}
            state={state}
            sortKey={sortKey}
            basePath={basePath}
            resultCount={filtered.length}
          />
        </div>
      </aside>

      <div>
        <div className="mb-6 hidden lg:block">
          <SortBar state={state} sortKey={sortKey} basePath={basePath} />
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} priorityCount={4} />
        ) : (
          <div className="ha-card p-8 text-center">
            <p className="font-display text-lg font-extrabold text-ink">
              Keine Produkte mit dieser Kombination
            </p>
            <p className="ha-prose mt-2 text-sm">
              Nimm einen Filter heraus oder starte neu – vielleicht hilft dir auch der geführte
              Finder weiter.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href={basePath} className="ha-btn ha-btn-dark ha-btn-sm">
                Filter zurücksetzen
              </Link>
              <Link href="/finder" className="ha-btn ha-btn-ghost ha-btn-sm">
                Zum Finder
              </Link>
            </div>
            {emptyHint}
          </div>
        )}
      </div>
    </div>
  );
}
