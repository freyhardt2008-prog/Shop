import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { getBodyRegions, getCategories } from '@/lib/catalog';
import { legalNavigation, serviceNavigation, healthDisclaimer, demoDataNotice } from '@/lib/site';

/** Footer mit Servicelinks, Rechtsnavigation und Gesundheitshinweis. */
export function SiteFooter() {
  const categories = getCategories();
  const regions = getBodyRegions().slice(0, 10);

  return (
    <footer className="mt-auto border-t border-chalk bg-white">
      <div className="ha-container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.4fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-graphite">
              HEAL ACTIVE bündelt Produkte und verständliches Wissen für alle, die nach
              Verletzung, Überlastung oder Trainingspause zurück in Bewegung kommen wollen.
            </p>
            <p className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink">
              GET BACK IN MOTION.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h2 className="ha-eyebrow mb-3">Shop</h2>
              <ul className="space-y-2 text-sm text-graphite">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/shop/${category.slug}`} className="transition-colors hover:text-ink">
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="ha-eyebrow mb-3">Körperregion</h2>
              <ul className="space-y-2 text-sm text-graphite">
                {regions.map((region) => (
                  <li key={region.slug}>
                    <Link href={`/koerper/${region.slug}`} className="transition-colors hover:text-ink">
                      {region.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/koerper" className="font-bold text-signal hover:underline">
                    Alle Regionen →
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="ha-eyebrow mb-3">Service & Wissen</h2>
              <ul className="space-y-2 text-sm text-graphite">
                {serviceNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/guide" className="transition-colors hover:text-ink">
                    HEAL ACTIVE Guide
                  </Link>
                </li>
                <li>
                  <Link href="/tape-yourself" className="transition-colors hover:text-ink">
                    Tape Yourself
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="ha-eyebrow mb-3">Rechtliches</h2>
              <ul className="space-y-2 text-sm text-graphite">
                {legalNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pflicht- und Transparenzhinweise */}
        <div className="mt-12 space-y-3 border-t border-chalk pt-8 text-xs leading-relaxed text-slate-soft">
          <p>
            <strong className="font-bold text-graphite">Gesundheitshinweis:</strong> {healthDisclaimer}
          </p>
          <p>
            <strong className="font-bold text-graphite">Hinweis zur Vorschau:</strong> {demoDataNotice}
          </p>
          <p>
            Alle Preise inkl. gesetzlicher Mehrwertsteuer zzgl.{' '}
            <Link href="/rechtliches/versand" className="underline hover:text-ink">
              Versandkosten
            </Link>
            .
          </p>
          <p className="pt-2">© {new Date().getFullYear()} HEAL ACTIVE. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
