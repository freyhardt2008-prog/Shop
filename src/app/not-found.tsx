import Link from 'next/link';
import { LogoMark } from '@/components/brand/LogoMark';

/**
 * 404-Seite.
 * Liegt bewusst im Wurzel-Layout (ohne Shop-Chrome), damit sie auch für
 * Admin-Routen und API-Fehlwege funktioniert.
 */
export default function NotFound() {
  const suggestions = [
    { label: 'Startseite', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Wo tut es weh?', href: '/koerper' },
    { label: 'HEAL ACTIVE Finder', href: '/finder' },
    { label: 'Alle Produkte A–Z', href: '/produkte-a-z' },
    { label: 'Suche', href: '/suche' },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <LogoMark className="mx-auto h-24 w-24 text-chalk" />
        <p className="ha-eyebrow mt-8">Fehler 404</p>
        <h1 className="mt-3 text-display-lg">Hier geht es nicht weiter.</h1>
        <p className="ha-prose mx-auto mt-4 max-w-md">
          Diese Seite existiert nicht oder wurde verschoben. Kein Grund stehenzubleiben – hier sind
          ein paar Wege zurück in Bewegung.
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="ha-chip">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="ha-btn ha-btn-primary mt-8">
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
