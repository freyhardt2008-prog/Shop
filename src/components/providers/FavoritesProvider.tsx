'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Favoriten (Merkzettel).
 * Persistenz im `localStorage`; bei späterer Kundenkonto-Anbindung wandert
 * die Liste ins Kundenprofil.
 */

const STORAGE_KEY = 'heal-active:favorites:v1';

interface FavoritesContextValue {
  slugs: string[];
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setSlugs(parsed.filter((entry): entry is string => typeof entry === 'string'));
      }
    } catch {
      setSlugs([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // Speicher nicht verfügbar – Favoriten bleiben nur für diese Sitzung erhalten.
    }
  }, [slugs, ready]);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback((slug: string) => {
    setSlugs((current) =>
      current.includes(slug) ? current.filter((entry) => entry !== slug) : [...current, slug],
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((current) => current.filter((entry) => entry !== slug));
  }, []);

  const clear = useCallback(() => setSlugs([]), []);

  const value = useMemo<FavoritesContextValue>(
    () => ({ slugs, ready, has, toggle, remove, clear }),
    [slugs, ready, has, toggle, remove, clear],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites muss innerhalb von <FavoritesProvider> verwendet werden.');
  }
  return context;
}
