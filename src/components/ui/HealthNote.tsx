import { healthDisclaimer } from '@/lib/site';

/**
 * Gesundheitshinweis.
 * Wird auf allen Produkt- und Inhaltsseiten ausgegeben und stellt sicher,
 * dass keine Heilversprechen entstehen und der Hinweis auf ärztliche
 * Abklärung überall sichtbar ist.
 */
export function HealthNote({
  variant = 'default',
  className = '',
}: {
  variant?: 'default' | 'compact';
  className?: string;
}) {
  if (variant === 'compact') {
    return (
      <p className={`text-xs leading-relaxed text-slate-soft ${className}`}>
        <strong className="font-bold text-graphite">Hinweis:</strong> {healthDisclaimer}
      </p>
    );
  }

  return (
    <aside
      className={`rounded-2xl border border-chalk bg-white p-5 md:p-6 ${className}`}
      aria-label="Gesundheitshinweis"
    >
      <p className="ha-eyebrow mb-2">Wichtiger Hinweis</p>
      <p className="text-sm leading-relaxed text-graphite">{healthDisclaimer}</p>
    </aside>
  );
}

/** Kennzeichnung von Beispieldaten auf Produktflächen. */
export function DemoDataNote({ className = '' }: { className?: string }) {
  return (
    <p
      className={`rounded-xl border border-dashed border-chalk bg-beam-soft/60 px-3 py-2 text-xs leading-relaxed text-graphite ${className}`}
    >
      <strong className="font-bold text-ink">Beispieldaten:</strong> Marke, Preis, Verfügbarkeit
      und Produktbilder sind Platzhalter. Es besteht keine Herstellerbeziehung und kein
      verbindliches Angebot.
    </p>
  );
}
