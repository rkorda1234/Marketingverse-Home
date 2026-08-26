import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import type { HeroScene } from '../../../data/proposals/prime-group.types';

export const HeroSceneView: React.FC<{ scene: HeroScene; revealCount: number }> = ({ scene, revealCount }) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="text-left max-w-3xl">
      {shown.map((beat, i) => {
        if (beat.kind === 'eyebrow') {
          return (
            <BeatIn key={i} delay={i * 80}>
              <span
                className="inline-block text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6"
                style={{ color: 'var(--pg-accent)' }}
              >
                {beat.text}
              </span>
            </BeatIn>
          );
        }
        if (beat.kind === 'headline') {
          return (
            <BeatIn key={i} delay={i * 80}>
              <h1 className="pg-serif text-5xl md:text-7xl font-normal leading-[1.05] mb-6" style={{ color: 'var(--pg-text)' }}>
                {beat.text}
              </h1>
            </BeatIn>
          );
        }
        if (beat.kind === 'sub') {
          return (
            <BeatIn key={i} delay={i * 80}>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
                {beat.text}
              </p>
            </BeatIn>
          );
        }
        return (
          <BeatIn key={i} delay={i * 80}>
            <p className="mt-10 text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--pg-text-dimmer)' }}>
              {beat.text}
            </p>
          </BeatIn>
        );
      })}
    </div>
  );
};
