import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Icon } from '@/components/ui/Icon';
import { Section, SectionHeading } from '@/components/ui/Section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Kundenkonto',
  description: 'Dein HEAL ACTIVE Kundenkonto.',
  path: '/konto',
  noIndex: true,
});

/**
 * KUNDENKONTO – Platzhalter
 * ---------------------------------------------------------------------------
 * Die Registrierung und Anmeldung wird mit der Backend-Anbindung umgesetzt
 * (Auth-Lösung, Bestellhistorie, Adressbuch). Diese Seite beschreibt den
 * geplanten Funktionsumfang, damit die Navigation vollständig ist.
 */
export default function AccountPage() {
  const planned = [
    { icon: 'cart', title: 'Bestellungen', text: 'Bestellhistorie, Sendungsverfolgung, Rechnungen und Retouren.' },
    { icon: 'heart', title: 'Favoriten', text: 'Merkliste geräteübergreifend synchronisiert statt nur lokal.' },
    { icon: 'user', title: 'Adressen', text: 'Liefer- und Rechnungsadressen verwalten.' },
    { icon: 'target', title: 'Mein Weg', text: 'Gespeicherte Finder-Ergebnisse, Übungen und Back-to-Sport-Fortschritt.' },
  ] as const;

  return (
    <>
      <Breadcrumbs crumbs={[{ name: 'Kundenkonto', href: '/konto' }]} />

      <Section>
        <SectionHeading
          eyebrow="Kundenkonto"
          title="Dein Konto entsteht gerade."
          description="Der Shop läuft aktuell als Vorschau mit Beispieldaten. Anmeldung und Registrierung werden zusammen mit der Backend-Anbindung aktiviert."
          as="h1"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {planned.map((item) => (
            <div key={item.title} className="ha-card flex items-start gap-4 p-5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sand text-ink">
                <Icon name={item.icon} size={22} />
              </span>
              <div>
                <p className="font-display text-base font-extrabold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-graphite">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/favoriten" className="ha-btn ha-btn-dark">
            Zu deinen Favoriten
          </Link>
          <Link href="/warenkorb" className="ha-btn ha-btn-ghost">
            Zum Warenkorb
          </Link>
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-slate-soft">
          Hinweis: Favoriten und Warenkorb werden derzeit ausschließlich lokal in deinem Browser
          gespeichert. Es werden keine personenbezogenen Daten an einen Server übertragen, solange
          du keine Bestellung abschickst.
        </p>
      </Section>
    </>
  );
}
