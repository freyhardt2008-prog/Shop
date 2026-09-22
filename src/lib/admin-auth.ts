/**
 * ADMIN-AUTHENTIFIZIERUNG – PLATZHALTER
 * ---------------------------------------------------------------------------
 * Dies ist BEWUSST eine minimale Lösung für die Entwicklungsphase:
 * ein gemeinsames Passwort aus der Umgebungsvariable `ADMIN_PASSWORD` und ein
 * HttpOnly-Session-Cookie.
 *
 * SIE IST NICHT PRODUKTIONSREIF. Vor dem Livegang zwingend ersetzen durch:
 * - echte Benutzerkonten mit individuellen Zugängen und Rollen,
 * - Passwort-Hashing (z. B. Argon2id) statt Vergleich im Klartext,
 * - Zwei-Faktor-Authentifizierung,
 * - Rate Limiting und Sperrung nach Fehlversuchen,
 * - Audit-Log für alle ändernden Aktionen.
 *
 * Sicherheitsvorgabe im aktuellen Stand:
 * Ist `ADMIN_PASSWORD` NICHT gesetzt, ist der Admin-Bereich vollständig
 * gesperrt (Fail-Closed). Es gibt kein Standardpasswort.
 */

export const ADMIN_COOKIE = 'ha_admin_session';

/** Ist der Admin-Bereich überhaupt konfiguriert? */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

/**
 * Erzeugt den Session-Token als HMAC über eine feste Nachricht.
 * WebCrypto läuft sowohl in der Node- als auch in der Edge-Runtime, damit
 * Middleware und Route Handler denselben Token berechnen können.
 */
export async function createSessionToken(): Promise<string | null> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode('heal-active:admin:v1'),
  );

  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** Prüft einen Cookie-Wert gegen den erwarteten Token (längenunabhängig). */
export async function isValidSessionToken(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const expected = await createSessionToken();
  if (!expected || expected.length !== value.length) return false;

  // Konstante Laufzeit, um Timing-Rückschlüsse zu vermeiden.
  let diff = 0;
  for (let i = 0; i < expected.length; i += 1) {
    diff |= expected.charCodeAt(i) ^ value.charCodeAt(i);
  }
  return diff === 0;
}

/** Vergleicht das eingegebene Passwort mit `ADMIN_PASSWORD`. */
export function isValidPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (expected.length !== input.length) return false;

  let diff = 0;
  for (let i = 0; i < expected.length; i += 1) {
    diff |= expected.charCodeAt(i) ^ input.charCodeAt(i);
  }
  return diff === 0;
}
