import React from 'react';
import { BeatIn } from '../BeatIn';
import type { CardGridScene } from '../../../data/proposals/types';

export const CardGridSceneView: React.FC<{ scene: CardGridScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-600 mb-3">{scene.eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
        <span className="font-serif italic font-normal">{scene.title}</span>
      </h2>
      {scene.intro && <p className="text-base text-neutral-600 leading-relaxed mb-8 max-w-2xl">{scene.intro}</p>}

      <div className="grid md:grid-cols-3 gap-4">
        {shown.map((card, i) => (
          <BeatIn key={i} delay={i * 90}>
            <div className="mv-glass mv-lift rounded-2xl p-5 h-full">
              <h3 className="text-base font-bold text-neutral-900 mb-2">{card.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{card.body}</p>
              {card.meta && <p className="mt-3 text-xs font-semibold text-violet-600">{card.meta}</p>}
            </div>
          </BeatIn>
        ))}
      </div>
    </div>
  );
};
