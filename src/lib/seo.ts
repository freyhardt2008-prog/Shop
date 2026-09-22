import type { Metadata } from 'next';
import { site } from './site';
import { formatPrice, truncate } from './format';
import type { Product } from './types';

/**
 * SEO-Helfer: Metadaten, Breadcrumbs und strukturierte Daten (JSON-LD).
 */

interface MetaInput {
  title: string;
  description: string;
  path: string;
  /** Seiten ohne eigenständigen Indexwert (Warenkorb, Checkout, Konto). */
  noIndex?: boolean;
  type?: 'website' | 'article';
}

export function buildMetadata({
  title,
  description,
  path,
  noIndex,
  type = 'website',
}: MetaInput): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;
  const cleanDescription = truncate(description, 158);

  return {
    title: fullTitle,
    description: cleanDescription,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: cleanDescription,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: cleanDescription,
    },
  };
}

export interface Crumb {
  name: string;
  href: string;
}

/** BreadcrumbList nach schema.org. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.href}`,
    })),
  };
}

/**
 * Product nach schema.org.
 * Hinweis: Solange es sich um Beispieldaten handelt, wird das Schema zwar
 * erzeugt, aber die Demo-Seiten sind über `robots` nicht für die Indexierung
 * freigegeben, sobald `NEXT_PUBLIC_DEMO_MODE` gesetzt ist.
 */
export function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    gtin13: product.ean,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.categorySlug,
    offers: {
      '@type': 'Offer',
      url: `${site.url}/produkt/${product.slug}`,
      priceCurrency: 'EUR',
      price: (product.priceCents / 100).toFixed(2),
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}

/** FAQPage nach schema.org. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** HowTo nach schema.org – für Tape-Anleitungen und Übungen. */
export function howToJsonLd(input: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTimeMinutes?: number;
  supplies?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    ...(input.totalTimeMinutes ? { totalTime: `PT${input.totalTimeMinutes}M` } : {}),
    ...(input.supplies
      ? { supply: input.supplies.map((item) => ({ '@type': 'HowToSupply', name: item })) }
      : {}),
    step: input.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    slogan: site.claim,
    description: site.description,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/suche?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/** Hilfsfunktion für Preis-Range-Angaben in Listings. */
export function priceRangeLabel(prices: number[]): string {
  if (prices.length === 0) return '';
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatPrice(min) : `${formatPrice(min)} – ${formatPrice(max)}`;
}
