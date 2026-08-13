import React from 'react';
import { BeatIn } from '../BeatIn';
import { SaagaLogo } from '../SaagaLogo';
import type { HeroScene } from '../../../data/proposals/types';

export const HeroSceneView: React.FC<{ scene: HeroScene; revealCount: number }> = ({ scene, revealCount }) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="text-center">
      {shown.map((beat, i) => {
        if (beat.kind === 'eyebrow') {
          return (
            <BeatIn key={i} delay={i * 60}>
              <span className="inline-block text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-violet-600 mb-6">
                {beat.text}
              </span>
            </BeatIn>
          );
        }
        if (beat.kind === 'headline') {
          return (
            <BeatIn key={i} delay={i * 60}>
              <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 leading-[1.08] mb-6">
                <span className="font-serif italic font-normal">{beat.text}</span>
              </h1>
            </BeatIn>
          );
        }
        if (beat.kind === 'subhead') {
          return (
            <BeatIn key={i} delay={i * 60}>
              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-10">
                {beat.text}
              </p>
            </BeatIn>
          );
        }
        if (beat.kind === 'logo') {
          return (
            <BeatIn key={i} delay={i * 60}>
              <div className="mb-10">
                <SaagaLogo size="lg" />
              </div>
            </BeatIn>
          );
        }
        return (
          <BeatIn key={i} delay={i * 60}>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{beat.text}</p>
          </BeatIn>
        );
      })}
    </div>
  );
};
