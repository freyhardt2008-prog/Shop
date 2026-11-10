# Plugins & Integrationen

Welche Dienste HEAL ACTIVE für den Livegang braucht, was davon schon im Code
steckt und was als Nächstes kommt. Jede Integration hängt an einer klar
abgegrenzten Stelle im Code. Ohne Konfiguration läuft der Shop weiter im
Demo-Modus.

| Bereich | Empfehlung | Alternativen | Status im Code |
|---|---|---|---|
| **Zahlung** | **Mollie**: in DE/EU stark, PayPal, Kreditkarte, Apple Pay, Klarna, Überweisung über eine Schnittstelle | Stripe, PayPal Checkout, Adyen | ✅ **Adapter umgesetzt**: `src/lib/commerce/providers/mollie.ts` |
| Datenbank | PostgreSQL + Prisma | Supabase, Neon | vorbereitet (`src/lib/types.ts` → Schema) |
| Commerce-Backend | Medusa (Open Source, headless) | Shopware 6 headless, Shopify Storefront API | vorbereitet (`src/lib/catalog.ts`) |
| CMS für Redaktion | Payload CMS (Next.js-nativ) | Storyblok, Sanity | vorbereitet (`src/data/*`) |
| Versand | Sendcloud (DHL, DPD, Hermes, GLS in einem) | Shipcloud, DHL-Direktanbindung | vorbereitet (`src/lib/commerce/shipping.ts`) |
| E-Mail | Resend oder Postmark (transaktional) | Brevo (inkl. Newsletter mit Double-Opt-in) | offen |
| Suche | eingebaute Suche reicht bis ca. 1.000 Produkte | Meilisearch, Algolia | ✅ eigene, fehlertolerante Suche |
| Consent | Klaro! (Open Source) | Usercentrics, Cookiebot | Banner vorhanden, CMP offen |
| Analytics | Plausible oder Matomo (ohne Cookies) | – | offen |
| Rechtstexte | Abo-Dienst mit Update-Service (z. B. IT-Recht Kanzlei, Händlerbund) | Anwalt | Entwürfe in `src/data/legal.ts` |
| Bewertungen | Trusted Shops (Gütesiegel und Käuferschutz) | eKomi | offen |
| Monitoring | Sentry | – | offen |

---

## Mollie aktivieren (umgesetzt)

1. Konto bei Mollie anlegen und im Dashboard den **Test-API-Key** (`test_…`) kopieren.
2. In `.env.local` (niemals ins Repository!):
   ```bash
   PAYMENT_PROVIDER="mollie"
   PAYMENT_API_KEY="test_…"
   NEXT_PUBLIC_SITE_URL="https://deine-domain.de"
   ```
3. Shop neu starten. Im Checkout werden Kundinnen jetzt zur Mollie-Bezahlseite weitergeleitet und kommen danach auf `/checkout/bestaetigung?order=…` zurück.
4. Mollie meldet Statusänderungen an `/api/payment/webhook`. Webhooks funktionieren nur mit einer öffentlich erreichbaren HTTPS-Adresse. Bei `localhost` lässt der Adapter den Webhook automatisch weg.

**Sicherheitsverhalten**
- Ohne `PAYMENT_PROVIDER` läuft der Demo-Provider, es wird keine Zahlung ausgelöst.
- Ist `mollie` gewählt, aber Key oder URL fehlen bzw. sind ungültig, bricht der Checkout mit einer Fehlermeldung ab (**fail-closed**) und fällt nicht still auf den Demo-Modus zurück.
- Mollie signiert Webhooks nicht. Der Adapter prüft die Echtheit deshalb, indem er die Zahlung mit dem eigenen Key erneut abruft. Manipulierte oder unbekannte IDs werden abgelehnt.
- Der Betrag wird immer serverseitig aus dem Katalog berechnet. `Idempotency-Key` = Bestellnummer verhindert Doppelbuchungen.

**Noch offen bis zum echten Verkauf**
- Bestellung und Zahlungsstatus in der Datenbank speichern (Webhook-Route hat dafür ein TODO).
- Warenkorb erst nach bestätigter Zahlung leeren, Bestand reservieren.
- Bestellbestätigung per E-Mail.
- Zahlarten im Mollie-Dashboard freischalten (Klarna und Rechnungskauf brauchen eine eigene Prüfung).

---

## Claude-Plugins für die Arbeit am Shop

Im Plugin-Verzeichnis von Claude Code gibt es ein **Mollie-Plugin**, das Claude mit dem Mollie-Konto verbindet (Zahlungen, Erstattungen, Fehlersuche). Das ist sinnvoll, sobald ein Mollie-Konto existiert.
