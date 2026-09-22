import Link from 'next/link';
import { LogoMark } from '@/components/brand/LogoMark';
import { AdminLogout } from '@/components/admin/AdminLogout';

/**
 * Rahmen des Admin-Bereichs.
 * Der Zugriffsschutz liegt in `src/middleware.ts`; diese Datei kümmert sich
 * nur um Layout und Navigation.
 */

/**
 * Der Admin-Bereich wird immer pro Request gerendert.
 * Sonst würden Umgebungsvariablen (Admin-Konfiguration) und später die
 * Live-Daten aus Datenbank bzw. Warenwirtschaft zum Build-Zeitpunkt
 * eingefroren.
 */
export const dynamic = 'force-dynamic';

const navigation = [
  { label: 'Übersicht', href: '/admin' },
  { label: 'Produkte', href: '/admin/produkte' },
  { label: 'Hersteller', href: '/admin/hersteller' },
  { label: 'Bestellungen', href: '/admin/bestellungen' },
  { label: 'Inhalte', href: '/admin/inhalte' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand">
      <header className="border-b border-chalk bg-white">
        <div className="ha-container flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8 text-ink" withMotionLines={false} />
            <div>
              <p className="font-display text-base font-extrabold leading-none text-ink">
                HEAL ACTIVE Admin
              </p>
              <p className="mt-1 text-[0.6875rem] font-bold uppercase tracking-wider text-slate-soft">
                Interner Bereich
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-bold text-graphite hover:text-ink">
              Zum Shop
            </Link>
            <AdminLogout />
          </div>
        </div>

        <nav aria-label="Admin-Navigation" className="border-t border-chalk">
          <div className="ha-container">
            <ul className="ha-scroll-x flex gap-1 py-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex shrink-0 rounded-full px-4 py-2 text-sm font-bold text-graphite transition-colors hover:bg-sand hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <main className="ha-container py-8 md:py-12">{children}</main>
    </div>
  );
}
