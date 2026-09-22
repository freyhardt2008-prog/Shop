import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/shop/ProductGallery';
import { ProductGrid } from '@/components/shop/ProductCard';
import { ProductPurchase } from '@/components/shop/ProductPurchase';
import { Accordion, CheckList, WarningList } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DemoDataNote, HealthNote } from '@/components/ui/HealthNote';
import { JsonLd } from '@/components/ui/JsonLd';
import { Section, SectionHeading } from '@/components/ui/Section';
import {
  getBodyRegion,
  getCategory,
  getCondition,
  getExercisesBySlugs,
  getProduct,
  getProducts,
  getProductsBySlugs,
  getSport,
  getSubcategory,
  getTapeGuidesBySlugs,
} from '@/lib/catalog';
import { purposeLabels } from '@/lib/labels';
import { buildMetadata, productJsonLd } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return buildMetadata({ title: 'Produkt', description: '', path: '/shop' });

  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/produkt/${product.slug}`,
    type: 'article',
  });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const subcategory = getSubcategory(product.categorySlug, product.subcategorySlug);
  const regions = product.bodyRegionSlugs.map(getBodyRegion).filter(Boolean);
  const conditions = product.conditionSlugs.map(getCondition).filter(Boolean);
  const sports = product.sportSlugs.map(getSport).filter(Boolean);
  const exercises = getExercisesBySlugs(product.exerciseSlugs);
  const related = getProductsBySlugs(product.relatedProductSlugs);
  const accessories = getProductsBySlugs(product.accessoryProductSlugs);

  // Tape-Anleitungen, die zu den Regionen dieses Produkts passen.
  const tapeGuides = getTapeGuidesBySlugs(
    conditions.flatMap((condition) => condition!.tapeGuideSlugs),
  ).filter((guide, index, all) => all.findIndex((g) => g.slug === guide.slug) === index);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />

      <Breadcrumbs
        crumbs={[
          { name: 'Shop', href: '/shop' },
          ...(category ? [{ name: category.name, href: `/shop/${category.slug}` }] : []),
          ...(category && subcategory
            ? [{ name: subcategory.name, href: `/shop/${category.slug}/${subcategory.slug}` }]
            : []),
          { name: product.name, href: `/produkt/${product.slug}` },
        ]}
      />

      {/* ======================================================= KOPFBEREICH */}
      <section className="pb-10 pt-6 md:pb-14">
        <div className="ha-container">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
            <ProductGallery
              images={product.images}
              icon={category?.icon}
              label={product.brand.replace('MUSTERMARKE ', 'Marke ')}
            />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="ha-eyebrow">{product.brand}</p>
                {product.badges?.map((badge) => (
                  <Badge key={badge} tone="beam">
                    {badge}
                  </Badge>
                ))}
              </div>

              <h1 className="mt-2 text-display-md">{product.name}</h1>

              <p className="ha-prose mt-4 text-base">{product.shortDescription}</p>

              {/* Einordnung: Region, Zweck, Sport */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {regions.map((region) => (
                  <li key={region!.slug}>
                    <Link href={`/koerper/${region!.slug}`} className="ha-chip">
                      {region!.name}
                    </Link>
                  </li>
                ))}
                {product.purposes.slice(0, 4).map((purpose) => (
                  <li key={purpose}>
                    <span className="ha-chip">{purposeLabels[purpose]}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <ProductPurchase product={product} />
              </div>

              <DemoDataNote className="mt-6" />

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-chalk pt-5 text-sm">
                <div>
                  <dt className="ha-eyebrow">Artikelnummer</dt>
                  <dd className="mt-0.5 text-graphite">{product.sku}</dd>
                </div>
                <div>
                  <dt className="ha-eyebrow">EAN (Beispiel)</dt>
                  <dd className="mt-0.5 text-graphite">{product.ean}</dd>
                </div>
                <div>
                  <dt className="ha-eyebrow">Marke</dt>
                  <dd className="mt-0.5 text-graphite">{product.brand}</dd>
                </div>
                <div>
                  <dt className="ha-eyebrow">Versand</dt>
                  <dd className="mt-0.5 text-graphite">
                    {product.dropshipping ? 'Direktversand des Herstellers' : 'Versand aus eigenem Lager'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== INHALTSBLÖCKE */}
      <section className="border-t border-chalk bg-white py-10 md:py-14">
        <div className="ha-container">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <h2 className="ha-sr-only">Produktinformationen</h2>

              <Accordion title="Was kann das Produkt?" defaultOpen>
                {product.longDescription.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <CheckList items={product.whatItDös} />
              </Accordion>

              <Accordion title="Wofür kann ich es verwenden?">
                <CheckList items={product.useCases} />
                {conditions.length > 0 && (
                  <>
                    <p className="mt-4 font-semibold text-ink">Häufige Themen dazu:</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {conditions.map((condition) => (
                        <li key={condition!.slug}>
                          <Link href={`/beschwerden/${condition!.slug}`} className="ha-chip">
                            {condition!.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Accordion>

              <Accordion title="Wie benutze ich es?">
                {product.howToUse.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {product.howToUse.bullets && <CheckList items={product.howToUse.bullets} />}
              </Accordion>

              {product.sizeGuide && (
                <Accordion title="Welche Größe brauche ich?">
                  {product.sizeGuide.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {product.sizeGuide.bullets && (
                    <ul className="mt-3 divide-y divide-chalk overflow-hidden rounded-xl border border-chalk">
                      {product.sizeGuide.bullets.map((entry) => (
                        <li key={entry} className="bg-white px-4 py-2.5 text-sm">
                          {entry}
                        </li>
                      ))}
                    </ul>
                  )}
                </Accordion>
              )}

              {sports.length > 0 && (
                <Accordion title="Passende Sportarten">
                  <ul className="flex flex-wrap gap-2">
                    {sports.map((sport) => (
                      <li key={sport!.slug}>
                        <Link href={`/sport/${sport!.slug}`} className="ha-chip">
                          {sport!.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              )}

              {exercises.length > 0 && (
                <Accordion title="Passende Übungen">
                  <ul className="space-y-2">
                    {exercises.map((exercise) => (
                      <li key={exercise.slug}>
                        <Link
                          href={`/uebungen/${exercise.slug}`}
                          className="flex items-start justify-between gap-4 rounded-xl border border-chalk bg-white px-4 py-3 transition-colors hover:border-ink"
                        >
                          <span>
                            <span className="block font-bold text-ink">{exercise.name}</span>
                            <span className="mt-0.5 block text-sm text-graphite">
                              {exercise.teaser}
                            </span>
                          </span>
                          <span aria-hidden="true" className="text-signal">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              )}

              {tapeGuides.length > 0 && (
                <Accordion title="Passende Tape-Anleitungen">
                  <ul className="flex flex-wrap gap-2">
                    {tapeGuides.map((guide) => (
                      <li key={guide.slug}>
                        <Link href={`/tape-yourself/${guide.slug}`} className="ha-chip">
                          {guide.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              )}

              {accessories.length > 0 && (
                <Accordion title="Passendes Zubehör">
                  <ul className="space-y-2">
                    {accessories.map((accessory) => (
                      <li key={accessory.slug}>
                        <Link
                          href={`/produkt/${accessory.slug}`}
                          className="flex items-center justify-between gap-4 rounded-xl border border-chalk bg-white px-4 py-3 transition-colors hover:border-ink"
                        >
                          <span className="font-bold text-ink">{accessory.name}</span>
                          <span aria-hidden="true" className="text-signal">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              )}

              <Accordion title="Sicherheit & Hinweise" defaultOpen>
                <WarningList items={product.safetyNotes} title="Bitte beachten" />
                <p className="mt-4 text-xs leading-relaxed text-slate-soft">
                  Angaben zu Produktsicherheit und Herstellerinformationen nach der EU-Verordnung
                  über die allgemeine Produktsicherheit (GPSR) werden ergänzt, sobald die
                  Herstellerdaten vorliegen. Siehe auch{' '}
                  <Link href="/rechtliches/produktsicherheit" className="underline hover:text-ink">
                    Produktsicherheit
                  </Link>
                  .
                </p>
              </Accordion>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <HealthNote />

              <div className="ha-card p-5">
                <p className="ha-eyebrow mb-3">Material & Ausführung</p>
                <dl className="space-y-2 text-sm">
                  {product.attributes.materials?.length ? (
                    <div>
                      <dt className="font-semibold text-ink">Material</dt>
                      <dd className="text-graphite">{product.attributes.materials.join(', ')}</dd>
                    </div>
                  ) : null}
                  {product.attributes.sizes?.length ? (
                    <div>
                      <dt className="font-semibold text-ink">Größen</dt>
                      <dd className="text-graphite">{product.attributes.sizes.join(', ')}</dd>
                    </div>
                  ) : null}
                  {product.attributes.colors?.length ? (
                    <div>
                      <dt className="font-semibold text-ink">Farben</dt>
                      <dd className="text-graphite">{product.attributes.colors.join(', ')}</dd>
                    </div>
                  ) : null}
                  {product.attributes.resistances?.length ? (
                    <div>
                      <dt className="font-semibold text-ink">Widerstandsstufen</dt>
                      <dd className="text-graphite">
                        {product.attributes.resistances.join(', ').replace(/-/g, ' ')}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <Section>
          <SectionHeading eyebrow="Passt dazu" title="Das könnte dich auch interessieren" />
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </Section>
      )}

      {/* Abstand für die Sticky-Leiste auf Mobilgeräten */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
