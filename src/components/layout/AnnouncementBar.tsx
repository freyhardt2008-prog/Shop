import Link from 'next/link';

/**
 * Schmale Leiste über dem Header.
 * Transparent gekennzeichnet: Der Shop läuft mit Beispieldaten.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="ha-container flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-[0.6875rem] font-semibold uppercase tracking-wider md:text-xs">
        <span>Vorschau mit Beispieldaten</span>
        <span aria-hidden="true" className="text-white/30">
          •
        </span>
        <span>Versandkostenfrei ab 49 €</span>
        <span aria-hidden="true" className="hidden text-white/30 sm:inline">
          •
        </span>
        <Link href="/finder" className="hidden underline decoration-signal decoration-2 underline-offset-4 hover:text-signal sm:inline">
          Finde dein Produkt in 4 Schritten
        </Link>
      </div>
    </div>
  );
}
