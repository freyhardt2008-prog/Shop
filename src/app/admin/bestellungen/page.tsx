import { ReadOnlyNotice } from '@/components/admin/AdminTable';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin – Bestellungen',
  description: 'Interner Bereich.',
  path: '/admin/bestellungen',
  noIndex: true,
});

/**
 * Bestellverwaltung – bewusst noch ohne Funktion.
 * Bestellungen entstehen erst mit einer persistenten Datenbank; bis dahin
 * erzeugt der Checkout ausschließlich Demo-Bestätigungen ohne Speicherung.
 */
export default function AdminOrdersPage() {
  const plannedFields = [
    'Bestellnummer, Datum, Status (offen, bezahlt, versendet, storniert, retourniert)',
    'Kunde, Liefer- und Rechnungsadresse',
    'Positionen mit SKU, Variante, Menge, Einzel- und Gesamtpreis',
    'Zahlungsart, Zahlungsstatus, Transaktions-ID des Zahlungsanbieters',
    'Versandart, Versanddienstleister, Sendungsnummer',
    'Rechnungs- und Lieferscheindokumente',
    'Retouren und Gutschriften',
    'Interne Notizen und Bearbeitungsverlauf',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display-md">Bestellungen</h1>
        <p className="ha-prose mt-2 text-sm">
          Es liegen keine Bestellungen vor. Der Checkout läuft im Demo-Modus und speichert
          bewusst nichts.
        </p>
      </div>

      <ReadOnlyNotice>
        Die Bestellverwaltung wird mit der Datenbank- und Payment-Anbindung aktiviert.
      </ReadOnlyNotice>

      <div className="ha-card p-6">
        <h2 className="font-display text-lg font-extrabold text-ink">Geplante Felder je Bestellung</h2>
        <ul className="ha-prose mt-4 list-disc space-y-1.5 pl-5 text-sm">
          {plannedFields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
