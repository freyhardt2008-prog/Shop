'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * COOKIE CONSENT – funktionsfähiger Rahmen, rechtlich noch zu prüfen
 * ---------------------------------------------------------------------------
 * Dieser Banner speichert die Auswahl lokal und blockiert damit heute nichts
 * Konkretes, weil noch keine Tracking- oder Marketing-Dienste eingebunden sind.
 *
 * VOR DEM LIVEGANG:
 * - Consent-Status muss tatsächlich das Laden von Skripten steuern
 *   (Consent Mode / Tag Manager oder eine CMP wie Usercentrics, Cookiebot).
 * - Die Auswahl muss protokolliert und widerrufbar sein.
 * - Die Kategorien und Texte gehören juristisch geprüft.
 */

const STORAGE_KEY = 'heal-active:consent:v1';

type ConsentValue = { necessary: true; statistics: boolean; marketing: boolean; at: string };

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);

  function save(value: Omit<ConsentValue, 'necessary' | 'at'>) {
    const payload: ConsentValue = { necessary: true, ...value, at: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ohne Storage bleibt die Auswahl nur für diese Sitzung bestehen.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-chalk bg-white/97 backdrop-blur-md"
    >
      <div className="ha-container py-4 md:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="consent-title" className="font-display text-base font-extrabold text-ink">
              Cookies & Datenschutz
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-graphite">
              Wir verwenden technisch notwendige Cookies, damit Warenkorb und Favoriten
              funktionieren. Optionale Cookies für Statistik und Marketing setzen wir nur mit
              deiner Einwilligung.{' '}
              <Link href="/rechtliches/datenschutz" className="underline hover:text-ink">
                Datenschutzerklärung
              </Link>
            </p>

            {details && (
              <div className="mt-3 space-y-2 rounded-xl bg-sand p-3 text-sm">
                <label className="flex items-start gap-2.5 text-graphite">
                  <input type="checkbox" checked disabled className="mt-1" />
                  <span>
                    <strong className="text-ink">Notwendig</strong> – Warenkorb, Favoriten,
                    Sicherheit. Immer aktiv.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-graphite">
                  <input
                    type="checkbox"
                    checked={statistics}
                    onChange={(event) => setStatistics(event.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <strong className="text-ink">Statistik</strong> – anonyme Reichweitenmessung.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 text-graphite">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <strong className="text-ink">Marketing</strong> – personalisierte Inhalte und
                    Werbung.
                  </span>
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDetails((open) => !open)}
              className="ha-btn ha-btn-ghost ha-btn-sm"
            >
              {details ? 'Details ausblenden' : 'Einstellungen'}
            </button>
            <button
              type="button"
              onClick={() => save({ statistics: false, marketing: false })}
              className="ha-btn ha-btn-ghost ha-btn-sm"
            >
              Nur notwendige
            </button>
            {details ? (
              <button
                type="button"
                onClick={() => save({ statistics, marketing })}
                className="ha-btn ha-btn-dark ha-btn-sm"
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                type="button"
                onClick={() => save({ statistics: true, marketing: true })}
                className="ha-btn ha-btn-primary ha-btn-sm"
              >
                Alle akzeptieren
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
