# HEAL ACTIVE

**GET BACK IN MOTION.**
Online-Shop für Bewegung, Recovery, Rehabilitation & Sport.

---

## 1. Projektbeschreibung

HEAL ACTIVE ist kein gewöhnlicher Produktkatalog. Der Shop ist um eine
Customer Journey herum gebaut:

```
ICH HABE EIN PROBLEM
   ↓  ICH WÄHLE MEINE KÖRPERREGION
   ↓  ICH WÄHLE MEIN ZIEL
   ↓  ICH ERHALTE INFORMATIONEN
   ↓  ICH FINDE PASSENDE PRODUKTE
   ↓  ICH LERNE DIE RICHTIGE ANWENDUNG
   ↓  ICH KOMME WIEDER IN BEWEGUNG
```

Verkauft wird deshalb nicht „eine Kniebandage", sondern „mein Weg zurück zur
Bewegung". Technisch heißt das: Jedes Produkt ist mit Körperregionen,
Beschwerdebildern, Zielen, Sportarten, Übungen und Tape-Anleitungen verknüpft –
und über all diese Achsen auffindbar.

### Markenhaltung

Der Shop soll sich **nicht** wie Arztpraxis, Apotheke, Sanitätshaus oder
Krankenhaus anfühlen, sondern wie eine Kombination aus
**Sport + Recovery + Mobility + Rehabilitation + Active Lifestyle**.

Das Markenzeichen ist ein **laufendes Skelett** – dynamisch, sportlich,
grafisch reduziert und sympathisch (siehe `src/components/brand/LogoMark.tsx`).
Es steht für Bewegung trotz Verletzung.

### Verbindliche Redaktionsregeln

Diese Regeln sind im Code und in den Inhalten konsequent umgesetzt:

* **keine Heilversprechen**
* **keine Diagnosen**
* **keine Aussage, dass ein Produkt eine ärztliche Untersuchung oder Therapie ersetzt**
* Der Gesundheitshinweis (`healthDisclaimer` in `src/lib/site.ts`) erscheint auf
  allen Produkt- und Inhaltsseiten.
* Alle Rechtstexte sind als **Entwurf** gekennzeichnet und müssen vor dem
  Livegang juristisch geprüft werden.
* Alle Produkte, Marken, Preise und Hersteller sind **Beispieldaten** und als
  solche im UI sichtbar markiert.

---

## 2. Installation

Voraussetzungen: **Node.js ≥ 20** und npm.

```bash
git clone <repository-url>
cd Shop
npm install
cp .env.example .env.local     # Werte nach Bedarf anpassen
```

## 3. Lokaler Start

```bash
npm run dev        # Entwicklungsserver auf http://localhost:3000
npm run build      # Produktions-Build
npm run start      # Produktionsserver
npm run lint       # ESLint
npm run typecheck  # TypeScript ohne Emit
npm test           # Vitest (105 Tests)
```

---

## 4. Projektstruktur

```
src/
├── app/                        Next.js App Router
│   ├── layout.tsx              Wurzel-Layout (Schriften, Metadaten, Provider)
│   ├── globals.css             Design-System (Tailwind v4 @theme)
│   ├── not-found.tsx           404
│   ├── sitemap.ts / robots.ts  SEO
│   ├── (site)/                 Öffentlicher Shop (eigenes Layout mit Header/Footer)
│   │   ├── page.tsx                    Startseite
│   │   ├── shop/                       Shop-Übersicht, Kategorie, Unterkategorie
│   │   ├── produkt/[slug]/             Produktdetailseite
│   │   ├── produkte-a-z/               Alle Produkte A–Z
│   │   ├── koerper/                    Körpernavigator + Regionsseiten
│   │   ├── beschwerden/[slug]/         Beschwerdebilder
│   │   ├── ziel/                       Ziele
│   │   ├── sport/                      Sportarten
│   │   ├── tape-yourself/              TAPE YOURSELF Anleitungen
│   │   ├── uebungen/                   HEAL ACTIVE EXERCISES
│   │   ├── back-to-sport/              BACK TO SPORT Programme
│   │   ├── strong-feet/                STRONG FEET – STRONG BODY
│   │   ├── recovery/ favorites/        Themenseiten
│   │   ├── finder/                     HEAL ACTIVE FINDER (4 Schritte)
│   │   ├── suche/                      Suchergebnisse
│   │   ├── warenkorb/ checkout/        Warenkorb & Checkout
│   │   ├── favoriten/ konto/           Merkzettel & Kundenkonto
│   │   └── rechtliches/                Rechtstexte
│   ├── admin/                  Geschützter Admin-Bereich (eigenes Layout)
│   └── api/                    Route Handler (Checkout, Admin-Login)
├── components/
│   ├── brand/                  Logo & Markenzeichen (laufendes Skelett)
│   ├── body-map/               Körpernavigator (SVG-Geometrie + Komponente)
│   ├── layout/                 Header, Footer, Navigation, Suche, Consent
│   ├── providers/              Warenkorb- und Favoriten-State
│   ├── shop/                   Produktkarten, Filter, Checkout, Warenkorb
│   ├── admin/                  Admin-Tabellen und -Formulare
│   └── ui/                     Icon, Badge, Accordion, Breadcrumbs, JSON-LD …
├── data/                       Inhalte & Katalog (heute Mock, später CMS/PIM)
│   ├── categories.ts           8 Kategorien mit Unterkategorien + Filterprofil
│   ├── products.ts             39 Beispielprodukte
│   ├── product-factory.ts      Varianten-/EAN-/Bild-Erzeugung
│   ├── body-regions.ts         20 Körperregionen
│   ├── conditions.ts           38 Beschwerdebilder
│   ├── goals.ts sports.ts      13 Ziele, 14 Sportarten
│   ├── exercises.ts            22 Übungen
│   ├── tape-guides.ts          10 Tape-Anleitungen
│   ├── back-to-sport.ts        5 Programme
│   ├── guide.ts                5 Wissensartikel
│   ├── manufacturers.ts        Hersteller-Platzhalter + Status-Workflow
│   └── legal.ts                Rechtstext-Entwürfe
├── lib/
│   ├── types.ts                Zentrales Datenmodell
│   ├── catalog.ts              Einzige Datenzugriffsschicht der UI
│   ├── filters.ts              Intelligente Produktfilter
│   ├── search.ts               Fehlertolerante Suche (Synonyme + Levenshtein)
│   ├── seo.ts site.ts          Metadaten, JSON-LD, Markenkonstanten
│   ├── format.ts labels.ts     Formatierung & Beschriftungen (i18n-Einstieg)
│   ├── admin-auth.ts           Admin-Session (Platzhalter)
│   └── commerce/               Warenkorb, Versand, Payment-Schnittstelle
├── middleware.ts               Zugriffsschutz für /admin
└── tests/                      Vitest-Suite
```

### Architekturprinzipien

1. **`lib/catalog.ts` ist die einzige Stelle, an der die UI Daten liest.**
   Beim Wechsel auf Datenbank oder Headless Commerce wird nur diese Schicht
   ausgetauscht (Funktionen werden `async`, Aufrufer `await`en sie).
2. **Der Zustand steckt in der URL.** Filter, Sortierung, Finder-Schritte und
   Übungsfilter laufen über Query-Parameter. Ergebnis: teilbar, serverseitig
   gerendert, funktioniert ohne JavaScript.
3. **Client-Komponenten nur dort, wo nötig** – Warenkorb, Favoriten, Header,
   Variantenwahl, Checkout. Der Katalog landet nie im Client-Bundle.
4. **Inhalte sind typisierte Daten, kein Markup.** Neue Beschwerdebilder,
   Übungen oder Sportarten brauchen einen Eintrag im jeweiligen Array – Routen,
   Navigation, Suche und Sitemap entstehen daraus automatisch.

---

## 5. Umgebungsvariablen

Vollständige Liste mit Erläuterungen: **`.env.example`**.
Kopiere die Datei nach `.env.local`. **Niemals echte Keys committen** –
`.env.local` ist über `.gitignore` ausgeschlossen.

| Variable | Zweck | Pflicht |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Basis-URL für Canonicals, Sitemap, OpenGraph | empfohlen |
| `ADMIN_PASSWORD` | Passwort für den Admin-Bereich (Platzhalterlösung) | nur für `/admin` |
| `ADMIN_SESSION_SECRET` | Secret für das Admin-Session-Cookie | nur für `/admin` |
| `DATABASE_URL` | Datenbank | später |
| `COMMERCE_*` / `CMS_*` | Headless Commerce / CMS | später |
| `PAYMENT_*` | Zahlungsanbieter | später |
| `SHIPPING_*` / `MAIL_*` | Versand, transaktionale E-Mails | später |

> **Sicherheitsverhalten:** Sind `ADMIN_PASSWORD` und `ADMIN_SESSION_SECRET`
> nicht gesetzt, ist `/admin` **vollständig gesperrt** (Fail-Closed). Es gibt
> kein Standardpasswort.

---

## 6. Deployment

Der Shop ist ein Standard-Next.js-Projekt und läuft auf jeder Node-Plattform
(Vercel, Netlify, Docker, eigener Server).

```bash
npm run build && npm run start
```

Beim Build entstehen aktuell **292 Seiten**, davon der überwiegende Teil
statisch vorgeneriert (Kategorien, Produkte, Regionen, Beschwerden, Übungen,
Tape-Anleitungen, Programme, Rechtstexte). Dynamisch gerendert werden nur
Suche und Übungsfilter.

Vor dem Produktivbetrieb zusätzlich einrichten:

* `NEXT_PUBLIC_SITE_URL` auf die echte Domain setzen
* HTTPS, Security-Header prüfen (Basis liegt in `next.config.ts`)
* Content Security Policy ergänzen
* Monitoring/Logging und Fehler-Tracking anbinden
* Backups für Datenbank und Medien

---

## 7. Datenbank

**Status: nicht angebunden.** Alle Inhalte liegen typisiert unter `src/data`.

Empfohlenes Vorgehen:

1. Schema aus `src/lib/types.ts` ableiten (z. B. Prisma + PostgreSQL).
   Die Typen sind bereits so geschnitten, dass sie 1:1 auf Tabellen passen:
   `products`, `product_variants`, `categories`, `body_regions`, `conditions`,
   `goals`, `sports`, `exercises`, `tape_guides`, `manufacturers`, `orders`.
2. Verknüpfungstabellen für die n:m-Beziehungen anlegen
   (Produkt ↔ Region, Produkt ↔ Beschwerde, Produkt ↔ Sportart …).
3. Die Funktionen in `src/lib/catalog.ts` auf Datenbankabfragen umstellen und
   `async` machen.
4. `tests/data-integrity.test.ts` als Migrationsschutz weiterverwenden – die
   Referenzprüfungen gelten unverändert.

## 8. Shop-Anbindung (Headless Commerce)

**Status: nicht angebunden.** Vorbereitet über `src/lib/catalog.ts` und
`src/lib/commerce/`.

* Produktkatalog: `catalog.ts` gegen die Provider-API austauschen.
* Warenkorb: `src/components/providers/CartProvider.tsx` hält heute den Zustand
  lokal. Mit Commerce-Backend wird dort die Cart-ID des Systems geführt; die
  Schnittstelle `useCart()` bleibt unverändert.
* Preise werden im Checkout **immer serverseitig neu berechnet**
  (`src/app/api/checkout/route.ts`) – Client-Preise werden ignoriert.

## 9. Payment-Anbindung

**Status: nicht angebunden. Es liegen keine Zugangsdaten im Repository.**

`src/lib/commerce/payment.ts` definiert das Interface `PaymentProvider`
(`createIntent`, `verifyWebhook`) sowie einen `mockPaymentProvider`, der
bewusst keine Zahlung auslöst. Für die Anbindung:

1. Adapter implementieren (Stripe, Mollie, PayPal, Adyen …).
2. In `getPaymentProvider()` registrieren, Auswahl über `PAYMENT_PROVIDER`.
3. Webhook-Route ergänzen und Signaturprüfung aktivieren.
4. Bestellstatus persistieren und Bestellbestätigung versenden.

## 10. CMS-Anbindung

**Status: nicht angebunden.** Redaktionelle Inhalte (Beschwerdebilder, Übungen,
Tape-Anleitungen, Back-to-Sport-Programme, Guide-Artikel) liegen als typisierte
Arrays vor und lassen sich direkt auf ein Headless CMS (Sanity, Storyblok,
Contentful, Payload) mappen. Die Typen in `src/lib/types.ts` und `src/data/guide.ts`
dienen als Schema-Vorlage.

---

## 11. Was bereits umgesetzt ist

| Bereich | Stand |
| --- | --- |
| Design-System | Tailwind v4 `@theme`, Marken-Token, Komponentenklassen |
| Logo | Laufendes Skelett als SVG-Komponente (austauschbar) |
| Navigation | 9 Hauptpunkte, Mega-Menü, Mobile-Drawer, Suche |
| Startseite | Hero, drei Einstiege, alle Themenbereiche |
| Shop | 8 Kategorien, 74 Unterkategorien, 39 Beispielprodukte |
| Produktseite | Galerie, Varianten, Warenkorb, 8 Inhaltsabschnitte, JSON-LD |
| Körpernavigator | 20 klickbare Regionen auf Vorder- und Rückansicht |
| Produkt-Finder | 4 Schritte, Zustand in der URL, ohne JavaScript nutzbar |
| Tape Yourself | 10 Anleitungen mit Material, Schritten, Kontraindikationen |
| Übungsbibliothek | 22 Übungen, 5 Filterachsen |
| Back to Sport | 5 Programme mit Phasen, Produkten, Checkliste |
| Suche | Synonyme, Tippfehlertoleranz, Produkte **und** Inhalte |
| Filter | Kategorieabhängig, blendet nutzlose Filter automatisch aus |
| Warenkorb/Checkout | Vollständiger Flow inkl. MwSt.-Aufschlüsselung (Demo) |
| Admin | Dashboard, Produkte, Hersteller, Bestellungen, Inhalte |
| Hersteller | Datenstruktur + Status-Pipeline für Lieferantenmanagement |
| SEO | Sprechende URLs, Metadaten, OpenGraph, JSON-LD, Sitemap, robots |
| Recht | Alle Pflichtseiten als gekennzeichnete Entwürfe |
| Tests | 105 Vitest-Tests (Daten, Suche, Filter, Warenkorb, Formatierung) |

## 12. Noch offene Punkte

* **Backend:** Datenbank, Warenwirtschaft, Bestandsführung, Bestellpersistenz
* **Payment:** Anbieterauswahl, Adapter, Webhooks, Rückerstattungen
* **Versand:** Dienstleister, Labels, Sendungsverfolgung, echte Versandkosten
* **Kundenkonto:** Registrierung, Anmeldung, Bestellhistorie, Adressbuch
* **Admin:** echte Benutzerverwaltung mit Rollen (aktuell Platzhalter), Schreibzugriff
* **Medien:** echte Produktfotos, Übungs- und Tape-Illustrationen inkl. Bildrechte
* **Produktdaten:** Herstellerangaben, Konformität, GPSR-Pflichtangaben
* **Consent:** vollwertige CMP, die das Laden von Skripten tatsächlich steuert
* **E-Mail:** Bestellbestätigung, Versandbenachrichtigung, Double-Opt-in
* **Recht:** anwaltliche Prüfung aller Texte
* **Accessibility:** Screenreader-Tests, Kontrastprüfung mit echten Inhalten
* **Performance:** Bildoptimierung mit echten Assets, Lighthouse-Audit

---

## 13. Checkliste: Was benötigt HEAL ACTIVE vor dem echten Launch?

### A. Unternehmen & Recht

- [ ] Rechtsform, Handelsregistereintrag, USt-IdNr.
- [ ] Impressum mit echten Daten (`src/data/legal.ts`)
- [ ] Datenschutzerklärung an die tatsächlichen Dienste angepasst
- [ ] AGB und Widerrufsbelehrung **anwaltlich geprüft**
- [ ] Widerrufsausschluss für Hygieneartikel juristisch geklärt
- [ ] Verbraucherstreitbeilegung: Teilnahme erklärt
- [ ] Verzeichnis von Verarbeitungstätigkeiten (DSGVO Art. 30)
- [ ] Auftragsverarbeitungsverträge mit allen Dienstleistern
- [ ] Prüfung Heilmittelwerbegesetz (HWG) für alle Produkttexte
- [ ] Klärung, ob einzelne Produkte Medizinprodukte sind (MDR)

### B. Produkte & Hersteller

- [ ] Herstellerrecherche abgeschlossen (siehe `SUPPLIERS.md`)
- [ ] Händlerkonditionen verhandelt und schriftlich bestätigt
- [ ] Echte Produktdaten: SKU, EAN, Maße, Gewicht, Material
- [ ] Bild- und Medienrechte schriftlich geklärt
- [ ] GPSR-Pflichtangaben je Produkt eingepflegt
- [ ] Konformitätserklärungen für Elektrogeräte (EMS/TENS)
- [ ] Sicherheitshinweise und Gebrauchsanweisungen in deutscher Sprache
- [ ] Einkaufspreise, Kalkulation und Mindestmargen festgelegt

### C. Technik

- [ ] Datenbank aufgesetzt und Katalog migriert
- [ ] Warenwirtschaft/ERP angebunden, Bestände live
- [ ] Zahlungsanbieter integriert und getestet (inkl. Fehlerfälle)
- [ ] Versanddienstleister angebunden, Labels und Tracking
- [ ] Transaktionale E-Mails eingerichtet
- [ ] Kundenkonto mit echter Authentifizierung
- [ ] Admin-Bereich mit Benutzerverwaltung, Rollen und Audit-Log
- [ ] Rate Limiting und Bot-Schutz auf Checkout und Login
- [ ] Backups, Monitoring, Fehler-Tracking
- [ ] Lasttest und Lighthouse-Audit

### D. Inhalte

- [ ] Produktfotos in einheitlicher Bildsprache
- [ ] Übungsvideos bzw. -fotos produziert
- [ ] Tape-Anleitungen illustriert
- [ ] Alle Texte redaktionell geprüft (keine Heilversprechen)
- [ ] Alternativtexte für alle Bilder
- [ ] Fachliche Gegenprüfung der Inhalte durch Physiotherapie/Sportmedizin

### E. Betrieb

- [ ] Domain, DNS, SSL
- [ ] Consent-Management-Plattform aktiv
- [ ] Analytics datenschutzkonform eingerichtet
- [ ] Kundenservice: Kanäle, Erreichbarkeit, Retourenprozess
- [ ] Testbestellungen über alle Zahlungs- und Versandarten
- [ ] Notfallplan: Rückruf, Produktsicherheitsmeldung, Ausfall

---

## 14. Hinweis zu den Beispieldaten

Alle ausgelieferten Produkte tragen `isDemoData: true`, alle Hersteller
`isPlaceholder: true` mit Status „Noch nicht kontaktiert“.
Marken heißen `MUSTERMARKE A` bis `MUSTERMARKE H`, EANs beginnen mit `9900000`
und sind keine echten GS1-Nummern. Es liegen **keine fremden Produktfotos** im
Repository – `<ProductImage />` erzeugt aus dem Präfix `demo:` eine
markenkonforme Platzhaltergrafik.

**Es werden keine Herstellerbeziehungen, Zulassungen, Preise oder
Händlerverträge dargestellt, die nicht existieren.**
