import React from 'react';
import { BeatIn } from '../BeatIn';
import type { PipelineTableScene, PipelineTableBeat } from '../../../data/proposals/types';

export const PipelineTableSceneView: React.FC<{ scene: PipelineTableScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  const headlineBeat = shown.find(
    (b): b is Extract<PipelineTableBeat, { kind: 'headline' }> => b.kind === 'headline'
  );
  const closingBeat = shown.find(
    (b): b is Extract<PipelineTableBeat, { kind: 'closing' }> => b.kind === 'closing'
  );
  const rows = shown
    .filter((b): b is Extract<PipelineTableBeat, { kind: 'rows' }> => b.kind === 'rows')
    .flatMap((b) => b.rows);

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-600 mb-3">{scene.eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
        <span className="font-serif italic font-normal">{scene.title}</span>
      </h2>

      {headlineBeat && (
        <BeatIn>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-8 max-w-2xl">{headlineBeat.text}</p>
        </BeatIn>
      )}

      {rows.length > 0 && (
        <div className="mv-glass rounded-2xl overflow-hidden divide-y divide-neutral-200/60 mb-6">
          {rows.map((row, i) => (
            <BeatIn key={row.asset} delay={i * 70}>
              <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-1 md:gap-6 px-5 py-4">
                <span className="font-bold text-sm text-neutral-900">{row.asset}</span>
                <span className="text-sm text-neutral-600 leading-relaxed">{row.job}</span>
              </div>
            </BeatIn>
          ))}
        </div>
      )}

      {closingBeat && (
        <BeatIn>
          <p className="text-base font-semibold text-neutral-800 italic">{closingBeat.text}</p>
        </BeatIn>
      )}
    </div>
  );
};
