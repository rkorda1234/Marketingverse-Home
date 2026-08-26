import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { FlowStepsScene } from '../../../data/proposals/prime-group.types';

export const FlowStepsSceneView: React.FC<{ scene: FlowStepsScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-4xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      {shown.map((beat, i) => (
        <BeatIn key={i}>
          <div className="flex flex-wrap items-start gap-3">
            {beat.steps.map((s, j) => (
              <React.Fragment key={j}>
                {j > 0 && (
                  <span className="self-center text-lg" style={{ color: 'var(--pg-text-dimmer)' }}>
                    →
                  </span>
                )}
                <BeatIn delay={j * 130}>
                  <div className="flex flex-col items-center text-center w-28">
                    <div
                      className="w-full pg-panel rounded-sm px-3 py-4 flex items-center justify-center"
                      style={{ borderColor: s.note ? 'var(--pg-accent)' : 'var(--pg-border)', minHeight: '4.5rem' }}
                    >
                      <span
                        className="text-sm font-semibold leading-snug"
                        style={{ color: s.note ? 'var(--pg-accent)' : 'var(--pg-text)' }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {s.note && (
                      <p className="mt-2 text-[11px] leading-snug" style={{ color: 'var(--pg-text-dim)' }}>
                        {s.note}
                      </p>
                    )}
                  </div>
                </BeatIn>
              </React.Fragment>
            ))}
          </div>
        </BeatIn>
      ))}
    </div>
  );
};
