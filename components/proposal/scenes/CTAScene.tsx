import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BeatIn } from '../BeatIn';
import type { CTAScene, CTABeat } from '../../../data/proposals/types';

export const CTASceneView: React.FC<{ scene: CTAScene; revealCount: number }> = ({ scene, revealCount }) => {
  const shown = scene.beats.slice(0, revealCount);
  const headlineBeat = shown.find((b): b is Extract<CTABeat, { kind: 'headline' }> => b.kind === 'headline');
  const stepsBeat = shown.find((b): b is Extract<CTABeat, { kind: 'steps' }> => b.kind === 'steps');
  const buttonBeat = shown.find((b): b is Extract<CTABeat, { kind: 'button' }> => b.kind === 'button');

  return (
    <div className="max-w-2xl mx-auto text-center">
      {headlineBeat && (
        <BeatIn>
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-10 leading-tight">
            <span className="font-serif italic font-normal">{headlineBeat.text}</span>
          </h2>
        </BeatIn>
      )}

      {stepsBeat && (
        <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
          {stepsBeat.steps.map((step, i) => (
            <BeatIn key={i} delay={i * 100}>
              <div className="mv-glass mv-lift rounded-2xl p-4 h-full">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold mb-2">
                  {i + 1}
                </span>
                <h3 className="text-sm font-bold text-neutral-900 mb-1">{step.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{step.text}</p>
              </div>
            </BeatIn>
          ))}
        </div>
      )}

      {buttonBeat && (
        <BeatIn>
          <a
            href={buttonBeat.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magic"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-neutral-800 transition-colors"
          >
            {buttonBeat.label} <ArrowRight size={18} />
          </a>
        </BeatIn>
      )}
    </div>
  );
};
