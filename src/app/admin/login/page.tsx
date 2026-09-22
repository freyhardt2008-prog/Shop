import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { isAdminConfigured } from '@/lib/admin-auth';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin-Anmeldung',
  description: 'Interner Bereich.',
  path: '/admin/login',
  noIndex: true,
});

export default function AdminLoginPage() {
  return (
    <div className="ha-container flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md">
        <p className="ha-eyebrow">Interner Bereich</p>
        <h1 className="mt-2 text-display-md">Admin-Anmeldung</h1>
        <p className="ha-prose mt-3 text-sm">
          Dieser Bereich ist nicht öffentlich. Die Anmeldung ist eine Platzhalter-Lösung für die
          Entwicklungsphase und wird vor dem Livegang durch eine echte Benutzerverwaltung ersetzt.
        </p>

        <div className="mt-8">
          <AdminLoginForm configured={isAdminConfigured()} />
        </div>
      </div>
    </div>
  );
}
