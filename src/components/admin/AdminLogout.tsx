'use client';

export function AdminLogout() {
  /** Vollständige Navigation, damit kein Client-Router-Cache zurückbleibt. */
  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' });
    window.location.assign('/admin/login');
  }

  return (
    <button type="button" onClick={handleLogout} className="ha-btn ha-btn-ghost ha-btn-sm">
      Abmelden
    </button>
  );
}
