import Link from 'next/link';
import type { Crumb } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from './JsonLd';

/** Breadcrumb-Navigation inklusive strukturierter Daten. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length === 0) return null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Start', href: '/' }, ...crumbs])} />
      <nav aria-label="Breadcrumb" className="ha-container pt-5">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem] text-slate-soft">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              Start
            </Link>
          </li>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <span aria-hidden="true" className="text-chalk">
                  /
                </span>
                {isLast ? (
                  <span className="font-semibold text-ink" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="transition-colors hover:text-ink">
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
