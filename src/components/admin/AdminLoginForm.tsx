'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function LoginForm({ configured }: { configured: boolean }) {
  const searchParams = useSearchParams();
  const target = searchParams.get('weiter') ?? '/admin';

  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!configured) {
    return (
      <div className="ha-card p-6">
        <p className="font-display text-base font-extrabold text-ink">
          Admin-Bereich nicht konfiguriert
        </p>
        <p className="ha-prose mt-2 text-sm">
          Setze in deiner <code className="rounded bg-sand px-1.5 py-0.5 text-xs">.env.local</code>{' '}
          die Variablen <code className="rounded bg-sand px-1.5 py-0.5 text-xs">ADMIN_PASSWORD</code>{' '}
          und{' '}
          <code className="rounded bg-sand px-1.5 py-0.5 text-xs">ADMIN_SESSION_SECRET</code> und
          starte den Server neu. Ohne diese Werte bleibt der Bereich aus Sicherheitsgründen
          vollständig gesperrt.
        </p>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data: { error?: string } = await response.json();
        setError(data.error ?? 'Anmeldung fehlgeschlagen.');
        setSubmitting(false);
        return;
      }

      // Bewusst eine vollständige Navigation statt router.push():
      // Der Client-Router hat die Zielseite vor der Anmeldung bereits
      // angefragt und die Weiterleitung auf /admin/login zwischengespeichert.
      // Ein harter Seitenwechsel umgeht diesen Cache zuverlässig.
      window.location.assign(target.startsWith('/admin') ? target : '/admin');
    } catch {
      setError('Verbindungsproblem. Bitte erneut versuchen.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ha-card space-y-4 p-6">
      <label className="block">
        <span className="ha-label">Passwort</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="ha-input"
          autoComplete="current-password"
          required
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-signal-soft px-3 py-2 text-sm text-signal-dark">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting} className="ha-btn ha-btn-primary w-full disabled:opacity-60">
        {submitting ? 'Wird geprüft …' : 'Anmelden'}
      </button>
    </form>
  );
}

export function AdminLoginForm({ configured }: { configured: boolean }) {
  return (
    <Suspense fallback={<div className="ha-card p-6 text-sm text-slate-soft">Wird geladen …</div>}>
      <LoginForm configured={configured} />
    </Suspense>
  );
}
