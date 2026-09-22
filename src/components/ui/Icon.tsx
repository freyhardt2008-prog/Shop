import type { IconName } from '@/lib/types';

/**
 * Icon-Set: bewusst reduzierte Strich-Icons (24er Raster, 1.75 Strichstärke).
 * Alle Icons erben die Textfarbe, damit sie sich in jede Fläche einfügen.
 */

const paths: Record<IconName, React.ReactNode> = {
  shield: <path d="M12 3l7 3v5.5c0 4.3-2.9 7.6-7 9.5-4.1-1.9-7-5.2-7-9.5V6l7-3Z" />,
  tape: (
    <>
      <path d="M4 8.5h16v7H4z" />
      <path d="M7.5 8.5v7M12 8.5v7M16.5 8.5v7" />
    </>
  ),
  band: <path d="M4 12c0-3 2-5 5-5s5 2 5 5 2 5 5 5" />,
  balance: (
    <>
      <circle cx="12" cy="9" r="4.5" />
      <path d="M4 17.5h16" />
    </>
  ),
  massage: (
    <>
      <path d="M9 4v8a3 3 0 0 0 6 0V4" />
      <path d="M12 15v5" />
      <path d="M8.5 20h7" />
    </>
  ),
  ems: <path d="M13 3 6 13h5l-1 8 8-10.5h-5L13 3Z" />,
  yoga: (
    <>
      <circle cx="12" cy="5.5" r="2" />
      <path d="M12 8v5M7 20l5-7 5 7M6.5 12h11" />
    </>
  ),
  lifestyle: (
    <>
      <path d="M8 3h8l-1 4H9L8 3Z" />
      <path d="M9 7v13a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V7" />
    </>
  ),
  body: (
    <>
      <circle cx="12" cy="4.5" r="2.2" />
      <path d="M12 7v7M5.5 10h13M9 21l3-7 3 7" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  run: (
    <>
      <circle cx="15" cy="4.5" r="2" />
      <path d="M13.5 8.5 9 11l1.5 4L8 21M10.5 15l4 1 1.5 5M9 11 5 9.5" />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="4.5" r="2" />
      <path d="M12.5 8 10 12l2.5 2 1 7M10 12 7 16M13.5 14l3-4" />
    </>
  ),
  football: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m12 8 3.5 2.5-1.3 4h-4.4L8.5 10.5 12 8Z" />
    </>
  ),
  tennis: (
    <>
      <ellipse cx="10" cy="9" rx="5" ry="6" transform="rotate(-30 10 9)" />
      <path d="m13.5 13.5 5.5 6" />
    </>
  ),
  padel: (
    <>
      <rect x="5" y="3" width="10" height="12" rx="5" />
      <path d="m12 15 4 6" />
    </>
  ),
  golf: (
    <>
      <path d="M11 20V4l7 4-7 3.5" />
      <path d="M7 20h10" />
    </>
  ),
  swim: (
    <>
      <circle cx="16" cy="6.5" r="1.8" />
      <path d="m4 13 3-2 4 2 4-2 4 2" />
      <path d="m4 18 3-2 4 2 4-2 4 2" />
      <path d="m8 11 4-4" />
    </>
  ),
  bike: (
    <>
      <circle cx="6" cy="16.5" r="3.5" />
      <circle cx="18" cy="16.5" r="3.5" />
      <path d="m6 16.5 5-7h4l3 7M9 9.5h5" />
    </>
  ),
  fitness: (
    <>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </>
  ),
  strength: (
    <>
      <path d="M3 10v4M6.5 7.5v9M17.5 7.5v9M21 10v4M6.5 12h11" />
    </>
  ),
  hike: (
    <>
      <path d="M3 19 9 7l5 12" />
      <path d="m11 13 3-5 7 11H3" />
    </>
  ),
  ski: (
    <>
      <path d="M4 19h16" />
      <path d="m7 19 6-12M17 7l-3 12" />
    </>
  ),
  team: (
    <>
      <circle cx="8" cy="7" r="2.5" />
      <circle cx="16" cy="7" r="2.5" />
      <path d="M3.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5M12.5 19c.3-2.8 2-5 4.5-5s4 2 4 5" />
    </>
  ),
  spark: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />,
  move: (
    <>
      <path d="M12 3v18M3 12h18" />
      <path d="m8 7 4-4 4 4M8 17l4 4 4-4M7 8l-4 4 4 4M17 8l4 4-4 4" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.5l2 11h10l2-8H6" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c.5-4 3.6-6 7.5-6s7 2 7.5 6" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  foot: (
    <>
      <path d="M8 21c-1.5-2-2-4-2-7 0-4 1-9 4.5-9 2.5 0 3.5 2.5 3.5 6 0 3 2 4 2 7 0 2-1.5 3-4 3Z" />
      <circle cx="16.5" cy="5" r="1.2" />
      <circle cx="18" cy="8" r="1.1" />
    </>
  ),
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  /** Größe in px (Standard 24). */
  size?: number;
}

export function Icon({ name, size = 24, className = '', ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
