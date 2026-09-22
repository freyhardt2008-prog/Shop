import Link from 'next/link';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

/** Einheitlicher Abschnittskopf für alle Seiten. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className = '',
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="ha-eyebrow mb-2">{eyebrow}</p>}
        <Tag className="text-display-md">{title}</Tag>
        {description && <p className="ha-prose mt-3 text-base">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="ha-btn ha-btn-ghost ha-btn-sm shrink-0">
          {action.label}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

/** Standardabstand für Seitenabschnitte. */
export function Section({
  children,
  className = '',
  tone = 'sand',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'sand' | 'white' | 'ink';
  id?: string;
}) {
  const tones = {
    sand: '',
    white: 'bg-white',
    ink: 'bg-ink text-white',
  } as const;

  return (
    <section id={id} className={`py-12 md:py-18 lg:py-24 ${tones[tone]} ${className}`}>
      <div className="ha-container">{children}</div>
    </section>
  );
}
