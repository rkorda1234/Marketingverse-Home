import React from 'react';
import { Check } from 'lucide-react';
import { BeatIn } from '../BeatIn';
import { CountUp } from '../CountUp';
import type { InvestmentScene } from '../../../data/proposals/types';

export const InvestmentSceneView: React.FC<{ scene: InvestmentScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-600 mb-3">{scene.eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
        <span className="font-serif italic font-normal">{scene.title}</span>
      </h2>
      {scene.intro && <p className="text-base text-neutral-600 leading-relaxed mb-8 max-w-2xl">{scene.intro}</p>}

      <div className="space-y-6 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'number') {
            return (
              <BeatIn key={i}>
                <div className="mv-glass mv-lift rounded-2xl p-6">
                  <p className="text-4xl md:text-6xl font-bold text-neutral-900 mb-1 mv-shimmer inline-block">
                    <CountUp to={beat.amount} prefix={beat.prefix ?? '$'} suffix={beat.suffix ?? ''} />
                  </p>
                  <p className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-4">{beat.label}</p>
                  <ul className="space-y-2">
                    {beat.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                          <Check size={9} className="text-white" />
                        </span>
                        <span className="text-sm text-neutral-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <p className="text-base font-semibold text-neutral-800">{beat.text}</p>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
