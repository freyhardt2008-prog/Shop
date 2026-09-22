'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/lib/types';
import { CartBadge, FavoritesBadge } from './CartBadge';
import { SearchBox } from './SearchBox';

/**
 * Kopfbereich mit
 * - Desktop-Navigation inkl. Mega-Menü (Kategorien, Regionen, Ziele, Sport)
 * - Mobile-Drawer mit großen Touch-Flächen
 * - Suchoverlay
 *
 * Alle Menüdaten werden als serialisierbare Props aus Server Components
 * übergeben, damit der Katalog nicht in das Client-Bundle wandert.
 */

export interface MenuLink {
  label: string;
  href: string;
  icon?: IconName;
}

export interface MenuColumn {
  title: string;
  links: MenuLink[];
  moreHref?: string;
  moreLabel?: string;
}

export interface HeaderNavItem {
  label: string;
  href: string;
  columns?: MenuColumn[];
  /** Kurzer Teaser links im Mega-Menü. */
  feature?: { title: string; text: string; href: string; cta: string };
}

export function SiteHeader({ navigation }: { navigation: HeaderNavItem[] }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  // Navigation bei Seitenwechsel schließen.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Scroll sperren, solange der Mobile-Drawer offen ist.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Escape schließt alle Overlays.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpenMenu(null);
      setMobileOpen(false);
      setSearchOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-chalk bg-sand/85 backdrop-blur-md">
      <a
        href="#inhalt"
        className="ha-sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Zum Inhalt springen
      </a>

      <div className="ha-container">
        <div className="flex h-16 items-center gap-3 md:h-20 md:gap-5">
          {/* Mobile: Menü-Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-chalk/50 lg:hidden"
            aria-label="Menü öffnen"
            aria-expanded={mobileOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <Logo className="shrink-0" />

          {/* Dauerhaft sichtbares Suchfeld ab Tablet */}
          <div className="hidden min-w-0 flex-1 md:block">
            <SearchBox placeholder="Suche nach Produkt, Körperregion oder Beschwerde …" />
          </div>

          {/* Aktionen */}
          <div className="ml-auto flex items-center gap-0.5 md:ml-0">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-chalk/50 md:hidden"
              aria-label="Suche öffnen"
              aria-expanded={searchOpen}
            >
              <Icon name="search" size={22} />
            </button>
            <Link
              href="/konto"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-chalk/50 sm:inline-flex"
              aria-label="Kundenkonto"
            >
              <Icon name="user" size={22} />
            </Link>
            <FavoritesBadge className="hidden sm:inline-flex" />
            <CartBadge />
          </div>
        </div>
      </div>

      {/* Desktop-Navigation: eigene Zeile, damit alle neun Menüpunkte
          nebeneinander Platz finden, ohne umzubrechen. */}
      <nav aria-label="Hauptnavigation" className="hidden border-t border-chalk lg:block">
        <div className="ha-container">
            <ul className="flex items-center justify-center gap-0.5 py-1">
              {navigation.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const hasMenu = Boolean(item.columns?.length);

                return (
                  <li
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hasMenu && setOpenMenu(item.href)}
                    onMouseLeave={() => hasMenu && setOpenMenu(null)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={hasMenu ? openMenu === item.href : undefined}
                      onFocus={() => hasMenu && setOpenMenu(item.href)}
                      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[0.75rem] font-bold uppercase tracking-wide transition-colors xl:px-3.5 xl:text-[0.8125rem] ${
                        active ? 'text-signal' : 'text-ink hover:text-signal'
                      }`}
                    >
                      {item.label}
                      {hasMenu && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </Link>

                    {hasMenu && openMenu === item.href && (
                      <div className="absolute left-1/2 top-full z-40 w-[min(72rem,92vw)] -translate-x-1/2 pt-2">
                        <div className="ha-card overflow-hidden p-6 shadow-lift xl:p-8">
                          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
                            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                              {item.columns?.map((column) => (
                                <div key={column.title}>
                                  <p className="ha-eyebrow mb-2.5">{column.title}</p>
                                  <ul className="space-y-1">
                                    {column.links.map((link) => (
                                      <li key={link.href}>
                                        <Link
                                          href={link.href}
                                          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-graphite transition-colors hover:bg-sand hover:text-ink"
                                        >
                                          {link.icon && (
                                            <Icon name={link.icon} size={16} className="text-slate-soft" />
                                          )}
                                          {link.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  {column.moreHref && (
                                    <Link
                                      href={column.moreHref}
                                      className="mt-2 inline-block px-2 text-xs font-bold text-signal hover:underline"
                                    >
                                      {column.moreLabel ?? 'Alle anzeigen'} →
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>

                            {item.feature && (
                              <div className="flex flex-col justify-between rounded-2xl bg-ink p-6 text-white">
                                <div>
                                  <p className="font-display text-xl font-extrabold leading-tight">
                                    {item.feature.title}
                                  </p>
                                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    {item.feature.text}
                                  </p>
                                </div>
                                <Link
                                  href={item.feature.href}
                                  className="ha-btn ha-btn-primary ha-btn-sm mt-5 self-start"
                                >
                                  {item.feature.cta}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </nav>

      {/* Suchoverlay */}
      {searchOpen && (
        <div className="border-t border-chalk bg-white/95 py-4 backdrop-blur md:hidden">
          <div className="ha-container">
            <SearchBox autoFocus onSubmitted={() => setSearchOpen(false)} size="lg" />
            <p className="mt-2 text-xs text-slate-soft">
              Tipp: Suche auch nach Beschwerden wie „Knieschmerzen“ oder „Achillessehne“.
            </p>
          </div>
        </div>
      )}

      {/* Mobile-Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            aria-label="Menü schließen"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute inset-y-0 left-0 flex w-[min(24rem,92vw)] flex-col bg-sand shadow-lift"
            role="dialog"
            aria-modal="true"
            aria-label="Hauptmenü"
          >
            <div className="flex items-center justify-between border-b border-chalk px-4 py-3">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:bg-chalk/50"
                aria-label="Menü schließen"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="border-b border-chalk px-4 py-3">
              <SearchBox onSubmitted={() => setMobileOpen(false)} placeholder="Wonach suchst du?" />
            </div>

            <nav aria-label="Mobile Navigation" className="flex-1 overflow-y-auto px-2 py-3">
              <ul className="space-y-0.5">
                {navigation.map((item) => {
                  const expanded = mobileSection === item.href;
                  return (
                    <li key={item.href}>
                      <div className="flex items-stretch">
                        <Link
                          href={item.href}
                          className="flex-1 rounded-xl px-3 py-3.5 font-display text-base font-extrabold text-ink hover:bg-white"
                        >
                          {item.label}
                        </Link>
                        {item.columns?.length ? (
                          <button
                            type="button"
                            onClick={() => setMobileSection(expanded ? null : item.href)}
                            aria-expanded={expanded}
                            aria-label={`${item.label} Unterpunkte ${expanded ? 'schliessen' : 'oeffnen'}`}
                            className="inline-flex w-12 items-center justify-center rounded-xl text-graphite hover:bg-white"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              aria-hidden="true"
                              className={expanded ? 'rotate-180 transition-transform' : 'transition-transform'}
                            >
                              <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
                            </svg>
                          </button>
                        ) : null}
                      </div>

                      {expanded && item.columns && (
                        <div className="space-y-4 rounded-xl bg-white/70 px-3 py-3">
                          {item.columns.map((column) => (
                            <div key={column.title}>
                              <p className="ha-eyebrow mb-1.5">{column.title}</p>
                              <ul className="space-y-0.5">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="block rounded-lg px-2 py-2.5 text-sm text-graphite hover:bg-sand hover:text-ink"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              {column.moreHref && (
                                <Link
                                  href={column.moreHref}
                                  className="mt-1 inline-block px-2 text-xs font-bold text-signal"
                                >
                                  {column.moreLabel ?? 'Alle anzeigen'} →
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 space-y-0.5 border-t border-chalk pt-4">
                <Link href="/finder" className="block rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-white">
                  HEAL ACTIVE Finder
                </Link>
                <Link href="/produkte-a-z" className="block rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-white">
                  Alle Produkte A–Z
                </Link>
                <Link href="/favoriten" className="block rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-white">
                  Favoriten
                </Link>
                <Link href="/konto" className="block rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-white">
                  Kundenkonto
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
