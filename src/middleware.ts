import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-auth';

/**
 * Schützt den gesamten Admin-Bereich.
 *
 * Fail-Closed: Ohne gültiges Session-Cookie führt jeder Aufruf unterhalb
 * von `/admin` zur Anmeldeseite. Ist der Admin-Bereich nicht konfiguriert
 * (keine Umgebungsvariablen gesetzt), kann kein gültiges Cookie entstehen –
 * der Bereich bleibt dann grundsätzlich gesperrt.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (await isValidSessionToken(token)) return NextResponse.next();

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('weiter', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
