import React from 'react';
import { Check, Plus } from 'lucide-react';
import { BeatIn } from '../BeatIn';
import type { ChecklistScene } from '../../../data/proposals/types';

export const ChecklistSceneView: React.FC<{ scene: ChecklistScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto max-h-[80dvh] overflow-y-auto pr-1 scrollbar-hide">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-600 mb-3">{scene.eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
        <span className="font-serif italic font-normal">{scene.title}</span>
      </h2>
      {scene.intro && <p className="text-base text-neutral-600 leading-relaxed mb-8 max-w-2xl">{scene.intro}</p>}

      <div className="grid sm:grid-cols-2 gap-5 pb-4">
        {shown.map((beat, i) => (
          <BeatIn key={i} delay={i * 80}>
            <div className="mv-glass rounded-2xl p-5">
              <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 mb-3">{beat.heading}</h3>
              <ul className="space-y-2.5">
                {beat.items.map((item, j) => (
                  <BeatIn key={j} delay={j * 90}>
                    <li className="flex items-start gap-2.5">
                      {beat.variant === 'included' ? (
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                          <Check size={9} className="text-white" />
                        </span>
                      ) : (
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border-2 border-neutral-300 flex items-center justify-center">
                          <Plus size={8} className="text-neutral-400" />
                        </span>
                      )}
                      <span
                        className={`text-sm leading-relaxed ${
                          beat.variant === 'included' ? 'text-neutral-700' : 'text-neutral-500'
                        }`}
                      >
                        {item}
                      </span>
                    </li>
                  </BeatIn>
                ))}
              </ul>
            </div>
          </BeatIn>
        ))}
      </div>
    </div>
  );
};
