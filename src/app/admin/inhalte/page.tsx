import Link from 'next/link';
import { AdminCell, AdminTable, ReadOnlyNotice } from '@/components/admin/AdminTable';
import {
  getBodyRegions,
  getConditions,
  getExercises,
  getGoals,
  getGuideArticles,
  getSports,
  getTapeGuides,
} from '@/lib/catalog';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Admin – Inhalte',
  description: 'Interner Bereich.',
  path: '/admin/inhalte',
  noIndex: true,
});

export default function AdminContentPage() {
  const groups = [
    {
      title: 'Körperregionen',
      items: getBodyRegions().map((entry) => ({
        name: entry.name,
        slug: entry.slug,
        href: `/koerper/${entry.slug}`,
        meta: entry.group,
      })),
    },
    {
      title: 'Beschwerdebilder',
      items: getConditions().map((entry) => ({
        name: entry.name,
        slug: entry.slug,
        href: `/beschwerden/${entry.slug}`,
        meta: entry.regionSlug,
      })),
    },
    {
      title: 'Übungen',
      items: getExercises().map((entry) => ({
        name: entry.name,
        slug: entry.slug,
        href: `/uebungen/${entry.slug}`,
        meta: entry.difficulty,
      })),
    },
    {
      title: 'Tape-Anleitungen',
      items: getTapeGuides().map((entry) => ({
        name: entry.name,
        slug: entry.slug,
        href: `/tape-yourself/${entry.slug}`,
        meta: entry.bodyRegionSlug,
      })),
    },
    {
      title: 'Guide-Artikel',
      items: getGuideArticles().map((entry) => ({
        name: entry.title,
        slug: entry.slug,
        href: `/guide/${entry.slug}`,
        meta: `${entry.readingMinutes} Min.`,
      })),
    },
    {
      title: 'Ziele',
      items: getGoals().map((entry) => ({
        name: entry.name,
        slug: entry.slug,
        href: `/ziel/${entry.slug}`,
        meta: entry.icon,
      })),
    },
    {
      title: 'Sportarten',
      items: getSports().map((entry) => ({
        name: entry.name,
        slug: entry.slug,
        href: `/sport/${entry.slug}`,
        meta: entry.icon,
      })),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display-md">Inhalte</h1>
        <p className="ha-prose mt-2 text-sm">
          Alle redaktionellen Inhalte im Überblick. Sie liegen aktuell als typisierte
          TypeScript-Dateien unter <code className="rounded bg-sand px-1.5 py-0.5 text-xs">src/data</code>{' '}
          und lassen sich später unverändert aus einem CMS beziehen.
        </p>
      </div>

      <ReadOnlyNotice>
        Redaktionelle Pflege erfolgt später im CMS. Bis dahin werden Inhalte direkt in den
        Datendateien gepflegt und mit dem Code versioniert.
      </ReadOnlyNotice>

      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="ha-eyebrow mb-3">
            {group.title} ({group.items.length})
          </h2>
          <AdminTable columns={['Titel', 'Slug', 'Merkmal', 'Ansehen']} caption={group.title}>
            {group.items.map((item) => (
              <tr key={item.slug}>
                <AdminCell className="font-semibold text-ink">{item.name}</AdminCell>
                <AdminCell className="font-mono text-xs text-slate-soft">{item.slug}</AdminCell>
                <AdminCell className="text-xs text-slate-soft">{item.meta}</AdminCell>
                <AdminCell>
                  <Link href={item.href} className="text-sm font-bold text-signal hover:underline">
                    öffnen
                  </Link>
                </AdminCell>
              </tr>
            ))}
          </AdminTable>
        </section>
      ))}
    </div>
  );
}
