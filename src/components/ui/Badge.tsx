type Tone = 'neutral' | 'signal' | 'pulse' | 'beam' | 'ink';

const tones: Record<Tone, string> = {
  neutral: 'bg-chalk/60 text-graphite',
  signal: 'bg-signal-soft text-signal-dark',
  pulse: 'bg-pulse-soft text-pulse-dark',
  beam: 'bg-beam-soft text-ink',
  ink: 'bg-ink text-white',
};

export function Badge({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
