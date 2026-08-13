import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { BeatIn } from '../BeatIn';
import type { RichTextScene } from '../../../data/proposals/types';

export const RichTextSceneView: React.FC<{ scene: RichTextScene; revealCount: number }> = ({ scene, revealCount }) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-600 mb-3">{scene.eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">
        <span className="font-serif italic font-normal">{scene.title}</span>
      </h2>

      <div className="space-y-6">
        {shown.map((beat, i) => (
          <BeatIn key={i}>
            <div>
              {beat.heading && <h3 className="text-lg font-bold text-neutral-900 mb-2">{beat.heading}</h3>}
              {beat.paragraphs?.map((p, j) => (
                <p key={j} className="text-base md:text-lg text-neutral-600 leading-relaxed mb-3 last:mb-0">
                  {p}
                </p>
              ))}
              {beat.list && (
                <ul className="mt-4 space-y-3">
                  {beat.list.map((item, k) => (
                    <BeatIn key={k} delay={k * 90}>
                      <li className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                          {beat.listStyle === 'bullet' ? (
                            <ChevronRight size={12} className="text-white" />
                          ) : (
                            <Check size={12} className="text-white" />
                          )}
                        </span>
                        <span className="text-base text-neutral-700 leading-relaxed">{item.text}</span>
                      </li>
                    </BeatIn>
                  ))}
                </ul>
              )}
            </div>
          </BeatIn>
        ))}
      </div>
    </div>
  );
};
