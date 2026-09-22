'use client';

import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/**
 * Suchfeld. Übergibt die Anfrage an `/suche?q=` – die eigentliche,
 * fehlertolerante Suche läuft serverseitig (siehe `lib/search.ts`).
 */
export function SearchBox({
  autoFocus = false,
  placeholder = 'Suche nach Produkt, Körperregion oder Beschwerde …',
  onSubmitted,
  defaultValue = '',
  size = 'md',
}: {
  autoFocus?: boolean;
  placeholder?: string;
  onSubmitted?: () => void;
  defaultValue?: string;
  size?: 'md' | 'lg';
}) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const inputId = useId();

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const query = value.trim();
        if (!query) return;
        onSubmitted?.();
        router.push(`/suche?q=${encodeURIComponent(query)}`);
      }}
      className="relative w-full"
    >
      <label htmlFor={inputId} className="ha-sr-only">
        Suchbegriff
      </label>
      <Icon
        name="search"
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-soft"
      />
      <input
        id={inputId}
        type="search"
        name="q"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className={`ha-input pl-11 pr-24 ${size === 'lg' ? 'min-h-14 text-base' : ''}`}
        autoComplete="off"
      />
      <button
        type="submit"
        className="ha-btn ha-btn-dark ha-btn-sm absolute right-1.5 top-1/2 -translate-y-1/2"
      >
        Suchen
      </button>
    </form>
  );
}
