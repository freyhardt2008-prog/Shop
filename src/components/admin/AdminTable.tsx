/** Schlichte, horizontal scrollbare Tabelle für den Admin-Bereich. */
export function AdminTable({
  columns,
  children,
  caption,
}: {
  columns: string[];
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-chalk bg-white">
      <table className="w-full min-w-3xl border-collapse text-left text-sm">
        {caption && <caption className="ha-sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-chalk bg-sand/60">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="whitespace-nowrap px-4 py-3 text-[0.6875rem] font-bold uppercase tracking-wider text-slate-soft"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-chalk">{children}</tbody>
      </table>
    </div>
  );
}

export function AdminCell({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

/** Kennzahlen-Kachel für das Dashboard. */
export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="ha-card p-5">
      <p className="ha-eyebrow">{label}</p>
      <p className="mt-2 font-display text-3xl font-extrabold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-soft">{hint}</p>}
    </div>
  );
}

/** Hinweis darauf, dass eine Funktion noch nicht schreibend arbeitet. */
export function ReadOnlyNotice({ children }: { children?: React.ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-chalk bg-beam-soft/60 px-4 py-3 text-sm leading-relaxed text-graphite">
      <strong className="text-ink">Nur Lesezugriff:</strong>{' '}
      {children ??
        'Diese Ansicht zeigt die Datenstruktur auf Basis der Mock-Daten. Bearbeiten, Anlegen und Löschen werden mit der Datenbank-Anbindung aktiviert.'}
    </p>
  );
}
