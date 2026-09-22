import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  createSessionToken,
  isAdminConfigured,
  isValidPassword,
} from '@/lib/admin-auth';

/**
 * Anmeldung für den Admin-Bereich (Platzhalter-Implementierung).
 * Siehe die Sicherheitshinweise in `src/lib/admin-auth.ts`.
 */
export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error:
          'Der Admin-Bereich ist nicht konfiguriert. Setze ADMIN_PASSWORD und ADMIN_SESSION_SECRET in .env.local.',
      },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  if (!body.password || !isValidPassword(body.password)) {
    // Bewusst unspezifische Fehlermeldung.
    return NextResponse.json({ error: 'Anmeldung fehlgeschlagen.' }, { status: 401 });
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json({ error: 'Serverkonfiguration unvollständig.' }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

/** Abmeldung: Cookie löschen. */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE);
  return response;
}
