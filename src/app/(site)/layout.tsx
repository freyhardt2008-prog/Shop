import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { buildHeaderNavigation } from '@/components/layout/navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

/**
 * Layout des öffentlichen Shops.
 *
 * Bewusst als Route Group `(site)` umgesetzt: Der Admin-Bereich liegt
 * außerhalb dieser Gruppe und bekommt dadurch kein Shop-Chrome
 * (Header, Footer, Cookie-Banner) – bei identischer URL-Struktur.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const navigation = buildHeaderNavigation();

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <SiteHeader navigation={navigation} />
      <main id="inhalt" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <CookieConsent />
    </div>
  );
}
