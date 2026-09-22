import Link from 'next/link';
import { LogoMark } from './LogoMark';

interface LogoProps {
  /** `compact` zeigt nur das Markenzeichen (Mobile, Favicon-Kontext). */
  variant?: 'full' | 'compact';
  className?: string;
  /** Als Link zur Startseite rendern (Standard) oder als reine Grafik. */
  asLink?: boolean;
}

/**
 * Logo-Lockup: Markenzeichen + Wortmarke.
 * Die Wortmarke nutzt die Display-Schrift des Design-Systems, damit später
 * ein Custom-Font-Austausch automatisch greift.
 */
export function Logo({ variant = 'full', className = '', asLink = true }: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0 text-ink" withMotionLines={variant === 'full'} />
      {variant === 'full' && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.0625rem] font-extrabold tracking-[-0.03em] text-ink">
            HEAL<span className="text-signal">ACTIVE</span>
          </span>
          <span className="mt-0.5 hidden whitespace-nowrap text-[0.5625rem] font-bold tracking-[0.22em] text-slate-soft sm:block">
            GET BACK IN MOTION
          </span>
        </span>
      )}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link href="/" aria-label="HEAL ACTIVE – zur Startseite" className="group">
      {content}
    </Link>
  );
}
