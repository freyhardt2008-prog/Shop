import Link from 'next/link';
import { AdminTable, AdminCell, ReadOnlyNotice, StatCard } from '@/components/admin/AdminTable';
import { manufacturerStatusLabels, manufacturerStatusOrder } from '@/data/manufacturers';
import { getCatalogStats, getManufacturers, getProducts } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin – Übersicht',
  description: 'Interner Bereich.',
  path: '/admin',
  noIndex: true,
});

export default function AdminDashboardPage() {
  const stats = getCatalogStats();
  const products = getProducts();
  const manufacturers = getManufacturers();

  const lowStock = products
    .filter((product) => product.stock <= product.minStock)
    .sort((a, b) => a.stock - b.stock);

  const inventoryValueCents = products.reduce(
    (sum, product) => sum + product.purchasePriceCents * product.stock,
    0,
  );

  const statusCounts = manufacturerStatusOrder.map((status) => ({
    status,
    count: manufacturers.filter((entry) => entry.status === status).length,
  }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-display-md">Übersicht</h1>
        <p className="ha-prose mt-2 text-sm">
          Kennzahlen auf Basis der aktuellen Beispieldaten. Sobald Warenwirtschaft und Datenbank
          angebunden sind, speisen sich diese Werte aus den echten Beständen.
        </p>
      </div>

      <ReadOnlyNotice />

      <section>
        <h2 className="ha-eyebrow mb-3">Katalog</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Produkte" value={stats.products} hint="inkl. aller Varianten" />
          <StatCard label="Kategorien" value={stats.categories} hint={`${stats.subcategories} Unterkategorien`} />
          <StatCard label="Körperregionen" value={stats.bodyRegions} hint={`${stats.conditions} Beschwerdebilder`} />
          <StatCard label="Hersteller" value={stats.manufacturers} hint="alle Platzhalter" />
        </div>
      </section>

      <section>
        <h2 className="ha-eyebrow mb-3">Inhalte & Lager</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Übungen" value={stats.exercises} />
          <StatCard label="Tape-Anleitungen" value={stats.tapeGuides} />
          <StatCard label="Artikel unter Mindestbestand" value={lowStock.length} hint="Nachbestellung prüfen" />
          <StatCard
            label="Lagerwert (EK)"
            value={formatPrice(inventoryValueCents)}
            hint="Beispieldaten"
          />
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h2 className="ha-eyebrow">Lieferanten-Pipeline</h2>
          <Link href="/admin/hersteller" className="text-sm font-bold text-signal hover:underline">
            Alle Hersteller
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {statusCounts.map((entry) => (
            <div key={entry.status} className="ha-card p-4">
              <p className="text-[0.6875rem] font-bold uppercase leading-tight tracking-wide text-slate-soft">
                {manufacturerStatusLabels[entry.status]}
              </p>
              <p className="mt-2 font-display text-2xl font-extrabold text-ink">{entry.count}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h2 className="ha-eyebrow">Bestand prüfen</h2>
          <Link href="/admin/produkte" className="text-sm font-bold text-signal hover:underline">
            Alle Produkte
          </Link>
        </div>

        {lowStock.length > 0 ? (
          <AdminTable
            columns={['Produkt', 'SKU', 'Bestand', 'Mindestbestand', 'Lieferzeit', 'Dropshipping']}
            caption="Produkte unter Mindestbestand"
          >
            {lowStock.map((product) => (
              <tr key={product.slug}>
                <AdminCell className="font-semibold text-ink">{product.name}</AdminCell>
                <AdminCell className="font-mono text-xs text-slate-soft">{product.sku}</AdminCell>
                <AdminCell className="font-bold text-signal-dark">{product.stock}</AdminCell>
                <AdminCell>{product.minStock}</AdminCell>
                <AdminCell>
                  {product.deliveryDays[0]}–{product.deliveryDays[1]} Tage
                </AdminCell>
                <AdminCell>{product.dropshipping ? 'ja' : 'nein'}</AdminCell>
              </tr>
            ))}
          </AdminTable>
        ) : (
          <p className="ha-card p-6 text-sm text-graphite">
            Aktuell liegt kein Produkt unter dem Mindestbestand.
          </p>
        )}
      </section>
    </div>
  );
}
