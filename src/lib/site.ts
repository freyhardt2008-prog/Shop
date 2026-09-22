/** Globale Markenkonstanten und Navigation. */

export const site = {
  name: 'HEAL ACTIVE',
  claim: 'GET BACK IN MOTION.',
  subClaim: 'Support. Recover. Move.',
  description:
    'HEAL ACTIVE – Produkte und Wissen für Bewegung, Recovery, Rehabilitation und Sport. Finde nach Körperregion, Ziel oder Sportart, was dich auf deinem Weg zurück in die Bewegung unterstützt.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'de_DE',
  /** Platzhalter – vor dem Livegang durch echte Daten ersetzen. */
  contact: {
    email: 'hallo@example.com',
    phone: '',
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

/** Hauptnavigation gemäß Markenkonzept. */
export const mainNavigation: NavItem[] = [
  { label: 'Shop', href: '/shop', description: 'Alle Produktkategorien' },
  { label: 'Körper & Beschwerden', href: '/koerper', description: 'Wo tut es weh?' },
  { label: 'Dein Ziel', href: '/ziel', description: 'Was möchtest du erreichen?' },
  { label: 'Sportart', href: '/sport', description: 'Passend zu deinem Sport' },
  { label: 'Tape Yourself', href: '/tape-yourself', description: 'Selbst tapen lernen' },
  { label: 'Übungen', href: '/uebungen', description: 'HEAL ACTIVE Exercises' },
  { label: 'Recovery', href: '/recovery', description: 'Erholung & Regeneration' },
  { label: 'Back to Sport', href: '/back-to-sport', description: 'Der Weg zurück' },
  { label: 'Guide', href: '/guide', description: 'HEAL ACTIVE Guide' },
];

/** Rechtliche Seiten – im Footer und im Checkout verlinkt. */
export const legalNavigation: NavItem[] = [
  { label: 'Impressum', href: '/rechtliches/impressum' },
  { label: 'Datenschutz', href: '/rechtliches/datenschutz' },
  { label: 'AGB', href: '/rechtliches/agb' },
  { label: 'Widerrufsrecht', href: '/rechtliches/widerruf' },
  { label: 'Versand', href: '/rechtliches/versand' },
  { label: 'Zahlung', href: '/rechtliches/zahlung' },
  { label: 'Produktsicherheit', href: '/rechtliches/produktsicherheit' },
  { label: 'Barrierefreiheit', href: '/rechtliches/barrierefreiheit' },
  { label: 'Cookie-Einstellungen', href: '/rechtliches/cookies' },
];

export const serviceNavigation: NavItem[] = [
  { label: 'HEAL ACTIVE Finder', href: '/finder' },
  { label: 'Alle Produkte A–Z', href: '/produkte-a-z' },
  { label: 'Strong Feet – Strong Body', href: '/strong-feet' },
  { label: 'Suche', href: '/suche' },
  { label: 'Kundenkonto', href: '/konto' },
  { label: 'Favoriten', href: '/favoriten' },
];

/**
 * Gesundheitsbezogener Standardhinweis.
 * Wird auf allen Inhalts- und Produktseiten ausgegeben.
 */
export const healthDisclaimer =
  'HEAL ACTIVE stellt keine Diagnosen und gibt keine Heilversprechen. Alle Inhalte sind allgemeine Informationen rund um Bewegung, Training und Recovery und ersetzen weder eine ärztliche Untersuchung noch eine Behandlung oder Therapie. Bei unklaren, starken oder anhaltenden Beschwerden wende dich bitte an ärztliches oder physiotherapeutisches Fachpersonal.';

/** Hinweis auf Beispieldaten – solange keine echten Produktdaten vorliegen. */
export const demoDataNotice =
  'Beispieldaten: Produkte, Marken, Preise und Verfügbarkeiten in dieser Vorschau sind Platzhalter und keine verbindlichen Angebote.';
