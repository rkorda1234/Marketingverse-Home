import React from 'react';

// Persistent scene chrome shared by nearly every scene type in this deck:
// a small amber eyebrow, a left-anchored serif title, an optional dim sub
// line. Not wrapped in BeatIn — the scene-level crossfade in PrimeDeck is
// its entrance; only what's below it reveals beat by beat.
export const SceneHeader: React.FC<{ eyebrow?: string; title: string; sub?: string; className?: string }> = ({
  eyebrow,
  title,
  sub,
  className = 'mb-8',
}) => (
  <div className={className}>
    {eyebrow && (
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--pg-accent)' }}>
        {eyebrow}
      </p>
    )}
    <h2 className="pg-serif text-2xl md:text-4xl font-normal leading-[1.15] mb-3" style={{ color: 'var(--pg-text)' }}>
      {title}
    </h2>
    {sub && (
      <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--pg-text-dim)' }}>
        {sub}
      </p>
    )}
  </div>
);
