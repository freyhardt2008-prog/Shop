import { AdminCell, AdminTable, ReadOnlyNotice } from '@/components/admin/AdminTable';
import { manufacturerStatusLabels } from '@/data/manufacturers';
import { getManufacturers } from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin – Hersteller',
  description: 'Interner Bereich.',
  path: '/admin/hersteller',
  noIndex: true,
});

export default function AdminManufacturersPage() {
  const manufacturers = getManufacturers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-md">Hersteller & Lieferanten</h1>
        <p className="ha-prose mt-2 text-sm">
          Internes Lieferantenmanagement. Hier laufen Recherche, Erstkontakt, Konditionen und
          Freigabe zusammen. Die eigentliche Rechercheliste wird in{' '}
          <code className="rounded bg-sand px-1.5 py-0.5 text-xs">SUPPLIERS.md</code> geführt.
        </p>
      </div>

      <ReadOnlyNotice>
        Alle Datensätze sind neutrale Platzhalter. Es bestehen keine Herstellerbeziehungen, es
        wurden keine Konditionen verhandelt und keine Kontaktdaten hinterlegt.
      </ReadOnlyNotice>

      <AdminTable
        columns={[
          'Hersteller',
          'Marke',
          'Status',
          'Land',
          'Ansprechpartner',
          'E-Mail',
          'Telefon',
          'B2B',
          'Dropshipping',
          'MBW',
          'Rabatt',
          'Kategorien',
        ]}
        caption="Herstellerliste"
      >
        {manufacturers.map((manufacturer) => (
          <tr key={manufacturer.id}>
            <AdminCell className="font-semibold text-ink">{manufacturer.manufacturerName}</AdminCell>
            <AdminCell>{manufacturer.brand}</AdminCell>
            <AdminCell>
              <span className="inline-flex whitespace-nowrap rounded-full bg-chalk/60 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide text-graphite">
                {manufacturerStatusLabels[manufacturer.status]}
              </span>
            </AdminCell>
            <AdminCell>{manufacturer.country}</AdminCell>
            <AdminCell className="text-slate-soft">{manufacturer.contactName || '–'}</AdminCell>
            <AdminCell className="text-slate-soft">{manufacturer.email || '–'}</AdminCell>
            <AdminCell className="text-slate-soft">{manufacturer.phone || '–'}</AdminCell>
            <AdminCell className="text-slate-soft">
              {manufacturer.b2bAvailable === null ? 'offen' : manufacturer.b2bAvailable ? 'ja' : 'nein'}
            </AdminCell>
            <AdminCell className="text-slate-soft">
              {manufacturer.dropshippingAvailable === null
                ? 'offen'
                : manufacturer.dropshippingAvailable
                  ? 'ja'
                  : 'nein'}
            </AdminCell>
            <AdminCell className="text-slate-soft">
              {manufacturer.minimumOrderCents === null ? 'offen' : manufacturer.minimumOrderCents}
            </AdminCell>
            <AdminCell className="text-slate-soft">
              {manufacturer.dealerDiscountPercent === null
                ? 'offen'
                : `${manufacturer.dealerDiscountPercent} %`}
            </AdminCell>
            <AdminCell className="text-xs text-slate-soft">
              {manufacturer.productCategories.join(', ')}
            </AdminCell>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
