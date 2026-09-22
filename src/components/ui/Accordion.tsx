/**
 * Aufklappbarer Inhaltsabschnitt auf Basis von `<details>`.
 *
 * Bewusst nativ umgesetzt: kein JavaScript, vollständig zugänglich, und die
 * Inhalte stehen für Suchmaschinen immer im HTML – wichtig für die langen
 * Produkttexte ("Was kann das Produkt?", "Welche Größe brauche ich?" …).
 */
export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-chalk py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base font-extrabold text-ink md:text-lg">
        {title}
        <span
          aria-hidden="true"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-chalk text-slate-soft transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="ha-prose pb-5 text-sm md:text-base">{children}</div>
    </details>
  );
}

/** Aufzählung mit Haken-Markierung, z. B. für "Was kann das Produkt?". */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-pulse-dark"
          >
            <path d="m4.5 12.5 5 5 10-11" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Warn-/Sicherheitsliste mit deutlicher visüller Abgrenzung. */
export function WarningList({ items, title }: { items: string[]; title?: string }) {
  return (
    <div className="rounded-2xl border border-signal/25 bg-signal-soft p-4 md:p-5">
      {title && <p className="ha-eyebrow mb-2 text-signal-dark">{title}</p>}
      <ul className="space-y-2 text-sm leading-relaxed text-graphite">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
