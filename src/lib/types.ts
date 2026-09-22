/**
 * HEAL ACTIVE – zentrales Datenmodell
 * ---------------------------------------------------------------------------
 * Alle Inhalte (Produkte, Körperregionen, Beschwerden, Ziele, Sportarten,
 * Übungen, Tape-Anleitungen, Hersteller) sind bewusst als reine, serialisier-
 * bare TypeScript-Strukturen modelliert. Dadurch können die Mock-Daten unter
 * `src/data` später 1:1 gegen eine Datenbank, ein Headless-Commerce-System
 * oder ein CMS getauscht werden, ohne dass die UI angepasst werden muss.
 *
 * Wichtig: Alle ausgelieferten Produkt- und Herstellerdatensätze sind
 * BEISPIELDATEN (`isDemoData: true` bzw. Status "Noch nicht kontaktiert").
 */

/** Ein URL-tauglicher Bezeichner, z. B. "kniebandage-aktiv". */
export type Slug = string;

/** Preise werden konsequent in Cent gespeichert (keine Float-Rundungsfehler). */
export type Cents = number;

/* ==========================================================================
   Navigation & Taxonomien
   ========================================================================== */

export type BodyRegionGroup = 'obere-extremitaet' | 'rumpf' | 'untere-extremitaet';

/** Auf welcher Silhouette die Region im Körpernavigator liegt. */
export type BodyView = 'front' | 'back';

export interface BodyRegion {
  slug: Slug;
  /** Anzeigename, z. B. "Sprunggelenk". */
  name: string;
  /** Kurzform für enge Layouts (Chips, Mobile). */
  shortName: string;
  group: BodyRegionGroup;
  view: BodyView;
  /** Ein Satz, der die Region im Shop-Kontext einordnet. */
  teaser: string;
  /** Redaktioneller Einstiegstext auf /koerper/[region]. */
  intro: string;
  /** Typische Anlässe – bewusst ohne Diagnosecharakter formuliert. */
  typicalTopics: string[];
  /** Beschwerde-Slugs, die dieser Region zugeordnet sind. */
  conditionSlugs: Slug[];
  /** Kategorien, die auf der Regionsseite prominent angeboten werden. */
  highlightCategorySlugs: Slug[];
}

export interface Condition {
  slug: Slug;
  name: string;
  regionSlug: Slug;
  teaser: string;
  /** Mehrere Absätze, bewusst beschreibend statt diagnostisch. */
  description: string[];
  /** "Worauf es in der Bewegung oft ankommt" – keine Therapieanweisung. */
  focusPoints: string[];
  goalSlugs: Slug[];
  sportSlugs: Slug[];
  /** Verwendungszwecke, über die passende Produkte gefunden werden. */
  purposes: ProductPurpose[];
  exerciseSlugs: Slug[];
  tapeGuideSlugs: Slug[];
  faq?: { question: string; answer: string }[];
}

export interface Goal {
  slug: Slug;
  name: string;
  claim: string;
  description: string;
  /** Schlüsselwort für das Icon-Set in `components/Icon.tsx`. */
  icon: IconName;
  purposes: ProductPurpose[];
}

export interface Sport {
  slug: Slug;
  name: string;
  icon: IconName;
  teaser: string;
  description: string;
  /** Regionen, die in dieser Sportart erfahrungsgemäß häufig Thema sind. */
  focusRegionSlugs: Slug[];
  backToSportSlug?: Slug;
}

/* ==========================================================================
   Produktkatalog
   ========================================================================== */

export interface Subcategory {
  slug: Slug;
  name: string;
  teaser: string;
  /** Optional: direkt zugeordnete Körperregion (z. B. Bandagen → Knie). */
  bodyRegionSlug?: Slug;
}

export interface Category {
  slug: Slug;
  name: string;
  tagline: string;
  description: string;
  icon: IconName;
  /** Reihenfolge in der Shop-Navigation. */
  order: number;
  subcategories: Subcategory[];
  /**
   * Welche Filter in dieser Kategorie überhaupt sinnvoll sind.
   * Die Filterleiste blendet zusätzlich alle Filter aus, die im aktuellen
   * Ergebnis weniger als zwei unterschiedliche Ausprägungen hätten.
   */
  filterKeys: FilterKey[];
}

export type Gender = 'damen' | 'herren' | 'unisex';

/** Verwendungszweck – die Brücke zwischen Beschwerde/Ziel und Produkt. */
export type ProductPurpose =
  | 'stabilisieren'
  | 'entlasten'
  | 'mobilisieren'
  | 'aktivieren'
  | 'kraeftigen'
  | 'balance'
  | 'koordination'
  | 'regeneration'
  | 'return-to-sport'
  | 'praevention'
  | 'taping'
  | 'heimtraining';

export type ResistanceLevel =
  | 'sehr-leicht'
  | 'leicht'
  | 'mittel'
  | 'stark'
  | 'sehr-stark';

export type TrainingLevel = 'einsteiger' | 'fortgeschritten' | 'profi';

export type BodySide = 'links' | 'rechts' | 'beidseitig';

/** Frei kombinierbare Attribute – Basis für die intelligenten Filter. */
export interface ProductAttributes {
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  sides?: BodySide[];
  resistances?: ResistanceLevel[];
  lengthsCm?: number[];
  trainingLevels?: TrainingLevel[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  /** EAN der Beispieldaten – bewusst als Platzhalter gekennzeichnet. */
  ean: string;
  size?: string;
  color?: string;
  side?: BodySide;
  resistance?: ResistanceLevel;
  lengthCm?: number;
  /** Abweichender Verkaufspreis; ohne Angabe gilt `Product.priceCents`. */
  priceCents?: Cents;
  stock: number;
}

export interface ProductImage {
  /** Pfad oder CDN-URL. Demo-Bilder werden prozedural als SVG erzeugt. */
  src: string;
  alt: string;
  /** Bildmotiv-Hinweis für die spätere Redaktion. */
  kind?: 'produkt' | 'anwendung' | 'detail';
}

export interface ProductSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

export interface Product {
  id: string;
  slug: Slug;

  /* --- Stammdaten --- */
  sku: string;
  ean: string;
  name: string;
  manufacturerId: string;
  brand: string;
  categorySlug: Slug;
  subcategorySlug: Slug;

  /* --- Einordnung / Navigation --- */
  bodyRegionSlugs: Slug[];
  conditionSlugs: Slug[];
  purposes: ProductPurpose[];
  sportSlugs: Slug[];
  goalSlugs: Slug[];
  gender: Gender;

  /* --- Varianten & Attribute --- */
  attributes: ProductAttributes;
  variants: ProductVariant[];

  /* --- Preise & Logistik --- */
  /** Einkaufspreis netto – nur im Admin sichtbar, nie im Storefront. */
  purchasePriceCents: Cents;
  /** Verkaufspreis brutto. */
  priceCents: Cents;
  /** Unverbindliche Preisempfehlung brutto (optional). */
  rrpCents?: Cents;
  /** Mehrwertsteuersatz in Prozent (DE: 19 oder 7). */
  vatRate: number;
  stock: number;
  minStock: number;
  /** Lieferzeit in Werktagen, z. B. [2, 4]. */
  deliveryDays: [number, number];
  dropshipping: boolean;

  /* --- Inhalte --- */
  images: ProductImage[];
  shortDescription: string;
  longDescription: string[];
  whatItDös: string[];
  useCases: string[];
  howToUse: ProductSection;
  sizeGuide?: ProductSection;
  safetyNotes: string[];

  /* --- Verknüpfungen --- */
  exerciseSlugs: Slug[];
  relatedProductSlugs: Slug[];
  accessoryProductSlugs: Slug[];

  /* --- Meta --- */
  badges?: string[];
  isFavorite?: boolean;
  /** Redaktionelle Empfehlung für "HEAL ACTIVE FAVORITES". */
  isEditorsPick?: boolean;
  /** Alle ausgelieferten Produkte sind Beispieldaten. */
  isDemoData: true;
}

/* ==========================================================================
   Filter
   ========================================================================== */

export type FilterKey =
  | 'gender'
  | 'bodyRegion'
  | 'condition'
  | 'purpose'
  | 'sport'
  | 'size'
  | 'color'
  | 'resistance'
  | 'length'
  | 'trainingLevel'
  | 'brand'
  | 'material'
  | 'price';

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  key: FilterKey;
  label: string;
  options: FilterOption[];
}

export type SortKey = 'empfohlen' | 'preis-auf' | 'preis-ab' | 'name-az' | 'neu';

/* ==========================================================================
   Redaktionelle Inhalte
   ========================================================================== */

export type Difficulty = 'leicht' | 'mittel' | 'anspruchsvoll';

export interface Exercise {
  slug: Slug;
  name: string;
  teaser: string;
  bodyRegionSlugs: Slug[];
  goalSlugs: Slug[];
  sportSlugs: Slug[];
  difficulty: Difficulty;
  /** Benötigtes Equipment als Kategorie-/Produktgruppen-Bezeichner. */
  equipment: string[];
  startPosition: string;
  execution: string[];
  dosage: string;
  commonMistakes: string[];
  /** Platzhalter für Foto/Video – Motivbeschreibung für die Redaktion. */
  mediaHint: string;
  relatedProductSlugs: Slug[];
}

export interface TapeGuide {
  slug: Slug;
  name: string;
  bodyRegionSlug: Slug;
  teaser: string;
  /** Benötigtes Material inkl. Längenangaben. */
  material: string[];
  tapeLength: string;
  preparation: string[];
  startPosition: string;
  steps: { title: string; body: string; mediaHint: string }[];
  notes: string[];
  contraindications: string[];
  relatedProductSlugs: Slug[];
  difficulty: Difficulty;
  durationMinutes: number;
}

export interface BackToSportProgram {
  slug: Slug;
  name: string;
  sportSlug: Slug;
  claim: string;
  intro: string[];
  phases: {
    name: string;
    focus: string;
    description: string;
    exerciseSlugs: Slug[];
    productSlugs: Slug[];
  }[];
  checklist: string[];
  relatedRegionSlugs: Slug[];
}

/* ==========================================================================
   Hersteller / Lieferantenmanagement
   ========================================================================== */

export type ManufacturerStatus =
  | 'nicht-kontaktiert'
  | 'kontakt-aufgenommen'
  | 'unterlagen-angefordert'
  | 'konditionen-erhalten'
  | 'verhandlung'
  | 'freigeschaltet'
  | 'abgelehnt';

export interface Manufacturer {
  id: string;
  manufacturerName: string;
  brand: string;
  website: string;
  country: string;
  contactName: string;
  email: string;
  phone: string;
  dealerContact: string;
  b2bAvailable: boolean | null;
  dropshippingAvailable: boolean | null;
  minimumOrderCents: Cents | null;
  dealerDiscountPercent: number | null;
  shippingConditions: string;
  productCategories: Slug[];
  notes: string;
  status: ManufacturerStatus;
  /** Alle ausgelieferten Hersteller sind neutrale Platzhalter. */
  isPlaceholder: true;
}

/* ==========================================================================
   Warenkorb & Checkout
   ========================================================================== */

export interface CartLine {
  productSlug: Slug;
  variantId: string;
  quantity: number;
}

export interface ResolvedCartLine extends CartLine {
  product: Product;
  variant: ProductVariant;
  unitPriceCents: Cents;
  lineTotalCents: Cents;
}

export interface CartTotals {
  itemCount: number;
  subtotalCents: Cents;
  shippingCents: Cents;
  totalCents: Cents;
  /** Aufschlüsselung der enthaltenen Mehrwertsteuer nach Satz. */
  vatBreakdown: { rate: number; amountCents: Cents }[];
  freeShippingThresholdCents: Cents;
  amountToFreeShippingCents: Cents;
}

export type ShippingMethodId = 'standard' | 'express' | 'abholung';

export interface ShippingMethod {
  id: ShippingMethodId;
  name: string;
  description: string;
  priceCents: Cents;
  deliveryDays: [number, number];
}

export type PaymentMethodId =
  | 'rechnung'
  | 'kreditkarte'
  | 'paypal'
  | 'sofort'
  | 'apple-pay'
  | 'vorkasse';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  description: string;
  /** Provider-Anbindung ist vorbereitet, aber noch nicht aktiv. */
  status: 'vorbereitet';
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  houseNumber: string;
  addition?: string;
  zip: string;
  city: string;
  country: string;
}

export interface CheckoutDraft {
  email: string;
  phone?: string;
  shippingAddress: Address;
  billingAddress?: Address;
  billingSameAsShipping: boolean;
  shippingMethod: ShippingMethodId;
  paymentMethod: PaymentMethodId;
  acceptedTerms: boolean;
  acceptedWithdrawal: boolean;
  note?: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  createdAt: string;
  email: string;
  totals: CartTotals;
  lines: {
    name: string;
    variantLabel: string;
    quantity: number;
    lineTotalCents: Cents;
  }[];
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  /** Kennzeichnung: Es wurde KEINE echte Bestellung ausgelöst. */
  isDemoOrder: true;
}

/* ==========================================================================
   Suche
   ========================================================================== */

export type SearchResultKind =
  | 'produkt'
  | 'kategorie'
  | 'koerperregion'
  | 'beschwerde'
  | 'ziel'
  | 'sportart'
  | 'uebung'
  | 'tape-anleitung'
  | 'back-to-sport';

export interface SearchDocument {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  href: string;
  /** Alle durchsuchbaren Begriffe inkl. Synonymen. */
  keywords: string[];
  /** Grundgewicht, damit Produkte bei Gleichstand vorne liegen. */
  boost: number;
}

export interface SearchResult extends SearchDocument {
  score: number;
  matchedTerms: string[];
}

/* ==========================================================================
   Icons
   ========================================================================== */

export type IconName =
  | 'shield'
  | 'tape'
  | 'band'
  | 'balance'
  | 'massage'
  | 'ems'
  | 'yoga'
  | 'lifestyle'
  | 'body'
  | 'target'
  | 'run'
  | 'walk'
  | 'football'
  | 'tennis'
  | 'padel'
  | 'golf'
  | 'swim'
  | 'bike'
  | 'fitness'
  | 'strength'
  | 'hike'
  | 'ski'
  | 'team'
  | 'spark'
  | 'move'
  | 'heart'
  | 'search'
  | 'cart'
  | 'user'
  | 'check'
  | 'foot';
