import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { StepChartScene } from '../../../data/proposals/prime-group.types';

export const StepChartSceneView: React.FC<{ scene: StepChartScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-2xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="space-y-6 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'steps') {
            const heights = beat.steps.map((_, idx) => 100 - idx * (60 / Math.max(beat.steps.length - 1, 1)));
            return (
              <BeatIn key={i}>
                <div className="flex items-end gap-4 h-40">
                  {beat.steps.map((s, j) => (
                    <BeatIn key={j} delay={j * 140} className="flex-1 h-full flex flex-col justify-end">
                      <div
                        className="w-full rounded-t-sm transition-all duration-700"
                        style={{
                          height: `${heights[j]}%`,
                          background: s.active ? 'var(--pg-accent)' : 'rgba(244,241,236,0.18)',
                        }}
                      />
                    </BeatIn>
                  ))}
                </div>
                <div className="flex gap-4 mt-2.5">
                  {beat.steps.map((s, j) => (
                    <div key={j} className="flex-1 text-center">
                      <p className="text-sm font-semibold" style={{ color: s.active ? 'var(--pg-accent)' : 'var(--pg-text)' }}>
                        {s.value}
                      </p>
                      <p className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--pg-text-dimmer)' }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <p className="text-sm" style={{ color: 'var(--pg-text-dim)' }}>
                {beat.text}
              </p>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
