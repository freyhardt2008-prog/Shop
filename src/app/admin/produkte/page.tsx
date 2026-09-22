import Link from 'next/link';
import { AdminCell, AdminTable, ReadOnlyNotice } from '@/components/admin/AdminTable';
import { getCategory, getManufacturer, getProducts } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin – Produkte',
  description: 'Interner Bereich.',
  path: '/admin/produkte',
  noIndex: true,
});

export default function AdminProductsPage() {
  const products = getProducts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-md">Produkte</h1>
        <p className="ha-prose mt-2 text-sm">
          {products.length} Artikel aus den Beispieldaten. Einkaufspreise und Margen sind
          ausschließlich hier sichtbar – niemals im Storefront.
        </p>
      </div>

      <ReadOnlyNotice>
        Pflege von Stammdaten, Preisen, Beständen und Bildern erfolgt später über PIM bzw.
        Warenwirtschaft. Diese Tabelle zeigt, welche Felder dabei geführt werden.
      </ReadOnlyNotice>

      <AdminTable
        columns={[
          'Produkt',
          'SKU',
          'EAN',
          'Kategorie',
          'Hersteller',
          'EK',
          'VK',
          'Marge',
          'MwSt.',
          'Bestand',
          'Varianten',
        ]}
        caption="Produktliste"
      >
        {products.map((product) => {
          const category = getCategory(product.categorySlug);
          const manufacturer = getManufacturer(product.manufacturerId);
          const marginPercent = Math.round(
            ((product.priceCents / (1 + product.vatRate / 100) - product.purchasePriceCents) /
              (product.priceCents / (1 + product.vatRate / 100))) *
              100,
          );

          return (
            <tr key={product.slug}>
              <AdminCell>
                <Link href={`/produkt/${product.slug}`} className="font-semibold text-ink hover:text-signal">
                  {product.name}
                </Link>
                <span className="mt-0.5 block text-xs text-slate-soft">{product.brand}</span>
              </AdminCell>
              <AdminCell className="whitespace-nowrap font-mono text-xs text-slate-soft">
                {product.sku}
              </AdminCell>
              <AdminCell className="whitespace-nowrap font-mono text-xs text-slate-soft">
                {product.ean}
              </AdminCell>
              <AdminCell className="whitespace-nowrap">{category?.name}</AdminCell>
              <AdminCell className="whitespace-nowrap text-xs">
                {manufacturer?.manufacturerName ?? '–'}
              </AdminCell>
              <AdminCell className="whitespace-nowrap">{formatPrice(product.purchasePriceCents)}</AdminCell>
              <AdminCell className="whitespace-nowrap font-semibold text-ink">
                {formatPrice(product.priceCents)}
              </AdminCell>
              <AdminCell className={marginPercent >= 40 ? 'text-pulse-dark' : 'text-signal-dark'}>
                {marginPercent} %
              </AdminCell>
              <AdminCell>{product.vatRate} %</AdminCell>
              <AdminCell className={product.stock <= product.minStock ? 'font-bold text-signal-dark' : ''}>
                {product.stock}
              </AdminCell>
              <AdminCell>{product.variants.length}</AdminCell>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}
