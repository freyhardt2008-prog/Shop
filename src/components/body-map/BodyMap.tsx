import Link from 'next/link';
import { getBodyRegions } from '@/lib/catalog';
import type { BodyView } from '@/lib/types';
import {
  FIGURE_HEIGHT,
  FIGURE_WIDTH,
  figureShapes,
  footShapes,
  hotspotsFor,
  type Shape,
} from './geometry';

/**
 * KÖRPERNAVIGATOR – "Wo tut es weh?"
 *
 * Zwei stilisierte Silhouetten (Vorder- und Rückansicht) mit klickbaren
 * Regionen. Bewusst als Server Component ohne JavaScript umgesetzt:
 *
 * - Jede Region ist ein echtes `<a>` im SVG → crawlbar, funktioniert ohne JS.
 * - Hover- und Fokuszustand rein über CSS.
 * - Unter der Grafik steht zusätzlich eine vollständige Linkliste: für
 *   Screenreader, Tastaturnutzung und kleine Touchflächen auf dem Handy.
 */

function ShapeElement({
  shape,
  className,
  offsetX,
}: {
  shape: Shape;
  className: string;
  offsetX: number;
}) {
  switch (shape.kind) {
    case 'circle':
      return <circle cx={shape.cx + offsetX} cy={shape.cy} r={shape.r} className={className} />;
    case 'rect':
      return (
        <rect
          x={shape.x + offsetX}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          rx={shape.rx}
          className={className}
        />
      );
    case 'capsule':
      return (
        <line
          x1={shape.x1 + offsetX}
          y1={shape.y1}
          x2={shape.x2 + offsetX}
          y2={shape.y2}
          strokeWidth={shape.width}
          strokeLinecap="round"
          className={className}
        />
      );
  }
}

function Figure({
  view,
  offsetX,
  label,
  activeRegion,
}: {
  view: BodyView;
  offsetX: number;
  label: string;
  activeRegion?: string;
}) {
  const regions = getBodyRegions();
  const spots = hotspotsFor(view);

  return (
    <g>
      {/* Grundkörper */}
      <g className="fill-figure stroke-figure">
        {[...figureShapes, ...footShapes[view]].map((shape, index) => (
          <ShapeElement key={index} shape={shape} offsetX={offsetX} className="" />
        ))}
      </g>

      {/* Mittellinie als dezente Andeutung der Wirbelsäule (Rückansicht) */}
      {view === 'back' && (
        <line
          x1={100 + offsetX}
          y1={104}
          x2={100 + offsetX}
          y2={244}
          className="stroke-sand"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}

      {/* Klickbare Regionen */}
      {spots.map((hotspot) => {
        const region = regions.find((entry) => entry.slug === hotspot.regionSlug);
        if (!region) return null;
        const isActive = activeRegion === region.slug;

        return (
          <a
            key={`${view}-${region.slug}`}
            href={`/koerper/${region.slug}`}
            className="group cursor-pointer outline-none"
            aria-label={`${region.name} – passende Themen und Produkte anzeigen`}
          >
            <title>{region.name}</title>
            {hotspot.shapes.map((shape, index) => (
              <ShapeElement
                key={index}
                shape={shape}
                offsetX={offsetX}
                className={
                  shape.kind === 'capsule'
                    ? `fill-none transition-colors ${
                        isActive ? 'stroke-signal/70' : 'stroke-transparent'
                      } group-hover:stroke-signal/55 group-focus-visible:stroke-signal/75`
                    : `stroke-none transition-colors ${
                        isActive ? 'fill-signal/70' : 'fill-transparent'
                      } group-hover:fill-signal/55 group-focus-visible:fill-signal/75`
                }
              />
            ))}
          </a>
        );
      })}

      {/* Beschriftung der Ansicht */}
      <text
        x={100 + offsetX}
        y={FIGURE_HEIGHT - 8}
        textAnchor="middle"
        className="fill-slate-soft text-[13px] font-bold uppercase tracking-[0.18em]"
      >
        {label}
      </text>
    </g>
  );
}

export function BodyMap({
  activeRegion,
  className = '',
}: {
  activeRegion?: string;
  className?: string;
}) {
  const gap = 72;
  const totalWidth = FIGURE_WIDTH * 2 + gap;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${totalWidth} ${FIGURE_HEIGHT}`}
        className="h-auto w-full max-w-2xl"
        role="group"
        aria-label="Interaktiver Körpernavigator: Vorder- und Rückansicht"
      >
        <Figure view="front" offsetX={0} label="Vorderseite" activeRegion={activeRegion} />
        <Figure
          view="back"
          offsetX={FIGURE_WIDTH + gap}
          label="Rückseite"
          activeRegion={activeRegion}
        />
      </svg>
    </div>
  );
}

/**
 * Textliche Regionsliste – barrierefreie Alternative und zugleich die
 * bevorzugte Bedienung auf dem Smartphone (große Touchflächen).
 */
export function BodyRegionList({ activeRegion }: { activeRegion?: string }) {
  const regions = getBodyRegions();
  const groups = [
    { key: 'obere-extremitaet', title: 'Arm, Schulter & Hand' },
    { key: 'rumpf', title: 'Rumpf, Rücken & Nacken' },
    { key: 'untere-extremitaet', title: 'Bein, Knie & Fuß' },
  ] as const;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.key}>
          <h3 className="ha-eyebrow mb-3">{group.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {regions
              .filter((region) => region.group === group.key)
              .map((region) => (
                <li key={region.slug}>
                  <Link
                    href={`/koerper/${region.slug}`}
                    className={`ha-chip ${activeRegion === region.slug ? 'ha-chip-active' : ''}`}
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
