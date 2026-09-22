/**
 * Rendert strukturierte Daten (schema.org) als JSON-LD.
 * Der Inhalt stammt ausschließlich aus eigenen, typisierten Daten.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
