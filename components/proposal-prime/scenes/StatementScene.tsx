import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import type { StatementScene } from '../../../data/proposals/prime-group.types';

// The centered/left-anchored single-line scene. Used for the thesis (S3),
// the big idea (S22), the "you told us" beat (S28), and the close (S35).
export const StatementSceneView: React.FC<{ scene: StatementScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);
  const isCenter = scene.align === 'center';

  return (
    <div className={isCenter ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-3xl'}>
      {shown.map((beat, i) => {
        if (beat.kind === 'eyebrow') {
          return (
            <BeatIn key={i} delay={i * 80}>
              <span
                className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] mb-6"
                style={{ color: 'var(--pg-accent)' }}
              >
                {beat.text}
              </span>
            </BeatIn>
          );
        }
        if (beat.kind === 'line') {
          return (
            <BeatIn key={i} delay={i * 80}>
              <p className="pg-serif text-3xl md:text-5xl font-normal leading-[1.15] mb-6" style={{ color: 'var(--pg-text)' }}>
                {beat.text}
              </p>
            </BeatIn>
          );
        }
        if (beat.kind === 'sub') {
          return (
            <BeatIn key={i} delay={i * 80}>
              <p
                className={`text-base md:text-lg leading-relaxed ${isCenter ? 'mx-auto' : ''}`}
                style={{ color: 'var(--pg-text-dim)', maxWidth: '38rem' }}
              >
                {beat.text}
              </p>
            </BeatIn>
          );
        }
        return (
          <BeatIn key={i} delay={i * 80}>
            <p
              className="mt-8 inline-block text-xs uppercase tracking-[0.25em] pb-1"
              style={{ color: 'var(--pg-accent)', borderBottom: '1px solid var(--pg-accent)' }}
            >
              {beat.text}
            </p>
          </BeatIn>
        );
      })}
    </div>
  );
};
