import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import { CartProvider } from '@/components/providers/CartProvider';
import { FavoritesProvider } from '@/components/providers/FavoritesProvider';
import { JsonLd } from '@/components/ui/JsonLd';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';
import './globals.css';

/**
 * Wurzel-Layout.
 *
 * Enthält nur, was wirklich global gilt: Schriften, Metadaten und die beiden
 * Zustandsprovider (Warenkorb, Favoriten). Header, Footer und Cookie-Banner
 * liegen im Layout der Route Group `(site)`, damit der Admin-Bereich sie nicht
 * erbt.
 *
 * Schriften werden von Next.js selbst gehostet – es geht zur Laufzeit kein
 * Request an Google Fonts, was auch datenschutzrechtlich die saubere Variante
 * ist.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-heal-sans',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-heal-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.claim}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    'Bandagen',
    'Kinesiologie-Tape',
    'Balance Training',
    'Faszienrolle',
    'Massagepistole',
    'Return to Sport',
    'Rehabilitation',
    'Recovery',
    'Mobility',
  ],
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} – ${site.claim}`,
    description: site.description,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b1220',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${inter.variable} ${archivo.variable}`}>
      <body className="antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <FavoritesProvider>
          <CartProvider>{children}</CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
