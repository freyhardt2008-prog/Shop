'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addLine, removeLine, setLineQuantity } from '@/lib/commerce/cart';
import type { CartLine } from '@/lib/types';

/**
 * Warenkorb-State.
 *
 * Persistenz aktuell im `localStorage` – ausreichend für einen Shop ohne
 * Backend. Bei Anbindung eines Commerce-Systems wird hier der Cart des
 * Systems (Cart-ID + API-Calls) gehalten; die Schnittstelle nach außen
 * (`useCart()`) bleibt unverändert.
 */

const STORAGE_KEY = 'heal-active:cart:v1';

interface CartContextValue {
  lines: CartLine[];
  /** Gesamtanzahl Artikel (Summe der Mengen). */
  count: number;
  /** True, sobald der Zustand aus dem Storage geladen wurde (Hydration). */
  ready: boolean;
  add: (line: CartLine) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  remove: (productSlug: string, variantId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is CartLine =>
        typeof entry === 'object' &&
        entry !== null &&
        typeof (entry as CartLine).productSlug === 'string' &&
        typeof (entry as CartLine).variantId === 'string' &&
        typeof (entry as CartLine).quantity === 'number',
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Speicher voll oder deaktiviert – der Warenkorb bleibt dann nur sitzungsweit erhalten.
    }
  }, [lines, ready]);

  const add = useCallback((line: CartLine) => {
    setLines((current) => addLine(current, line));
  }, []);

  const setQuantity = useCallback((productSlug: string, variantId: string, quantity: number) => {
    setLines((current) => setLineQuantity(current, productSlug, variantId, quantity));
  }, []);

  const remove = useCallback((productSlug: string, variantId: string) => {
    setLines((current) => removeLine(current, productSlug, variantId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      ready,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, ready, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart muss innerhalb von <CartProvider> verwendet werden.');
  return context;
}
