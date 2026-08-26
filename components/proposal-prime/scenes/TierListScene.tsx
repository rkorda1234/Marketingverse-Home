import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { TierListScene } from '../../../data/proposals/prime-group.types';

export const TierListSceneView: React.FC<{ scene: TierListScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className="space-y-3 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'tier') {
            return (
              <BeatIn key={i} delay={i * 100}>
                <div className="flex gap-4 pg-panel rounded-sm p-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] flex-shrink-0 w-20 pt-0.5" style={{ color: 'var(--pg-accent)' }}>
                    {beat.label}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--pg-text)' }}>
                      {beat.heading}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
                      {beat.body}
                    </p>
                  </div>
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {beat.groups.map((g, j) => (
                  <div key={j} className="rounded-sm px-4 py-3" style={{ border: '1px solid var(--pg-border)' }}>
                    <p className="text-[11px] font-bold uppercase tracking-wide mb-1" style={{ color: 'var(--pg-text)' }}>
                      {g.label}
                    </p>
                    <p className="text-xs mb-1" style={{ color: 'var(--pg-text-dimmer)' }}>
                      {g.venues}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--pg-accent)' }}>
                      {g.metric}
                    </p>
                  </div>
                ))}
              </div>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
