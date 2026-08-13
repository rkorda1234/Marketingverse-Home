import React from 'react';
import { Check } from 'lucide-react';
import { BeatIn } from '../BeatIn';
import type { PhaseScene } from '../../../data/proposals/types';

export const PhaseSceneView: React.FC<{ scene: PhaseScene; revealCount: number }> = ({ scene, revealCount }) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto max-h-[78dvh] overflow-y-auto pr-1 scrollbar-hide">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-600">{scene.eyebrow}</span>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-900 text-white">
          {scene.timeframe}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
        <span className="font-serif italic font-normal">{scene.title}</span>
      </h2>

      <div className="space-y-5 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'intro') {
            return (
              <BeatIn key={i}>
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed">{beat.text}</p>
              </BeatIn>
            );
          }
          if (beat.kind === 'section') {
            return (
              <BeatIn key={i}>
                <div className="mv-glass rounded-2xl p-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 mb-3">{beat.heading}</h3>
                  <ul className="space-y-2.5">
                    {beat.items.map((item, j) => (
                      <BeatIn key={j} delay={j * 70}>
                        <li className="flex items-start gap-2.5">
                          <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                            <Check size={9} className="text-white" />
                          </span>
                          <span className="text-sm text-neutral-700 leading-relaxed">{item}</span>
                        </li>
                      </BeatIn>
                    ))}
                  </ul>
                  {beat.note && <p className="mt-3 text-xs italic text-neutral-400">{beat.note}</p>}
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <p className="text-sm font-semibold text-neutral-500">
                <span className="text-neutral-900">Deliverable:</span> {beat.text}
              </p>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
