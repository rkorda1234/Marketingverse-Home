import React from 'react';

// Shared placeholder for every "screenshot" slide in this deck. Real
// screenshots weren't available at build time, so this stands in: a thin
// 1px-bordered frame (no drop shadow, per the build brief) with a muted
// hatch fill where the image will go, a small page label, and — the whole
// point of these slides — the red annotation call-out that would sit on
// the real screenshot once it's dropped in.
export const ShotFrame: React.FC<{
  label: string;
  annotation?: string;
  aspect?: string;
  big?: boolean;
  tone?: 'problem' | 'neutral';
}> = ({ label, annotation, aspect = '4/3', big = false, tone = 'problem' }) => (
  <div>
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{
        aspectRatio: aspect,
        border: '1px solid var(--pg-border)',
        background:
          'repeating-linear-gradient(135deg, rgba(244,241,236,0.045) 0px, rgba(244,241,236,0.045) 1px, transparent 1px, transparent 10px), var(--pg-bg-raise)',
      }}
    >
      <span
        className="absolute top-2 left-2.5 text-[10px] uppercase tracking-[0.15em]"
        style={{ color: 'var(--pg-text-dimmer)' }}
      >
        {label}
      </span>
      <span
        className="absolute bottom-2 right-2.5 text-[10px] uppercase tracking-[0.15em]"
        style={{ color: 'var(--pg-text-dimmer)' }}
      >
        image pending
      </span>
    </div>
    {annotation && (
      <p
        className={`mt-2.5 ${big ? 'text-base' : 'text-[13px]'} leading-snug pl-2.5`}
        style={
          tone === 'problem'
            ? { color: 'var(--pg-red)', borderLeft: '2px solid var(--pg-red)' }
            : { color: 'var(--pg-text-dim)', borderLeft: '2px solid var(--pg-border)' }
        }
      >
        {annotation}
      </p>
    )}
  </div>
);
