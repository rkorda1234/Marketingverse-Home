import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { RolloutTimelineScene } from '../../../data/proposals/prime-group.types';

export const RolloutTimelineSceneView: React.FC<{ scene: RolloutTimelineScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="space-y-8 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'sequence') {
            return (
              <BeatIn key={i}>
                <div className="space-y-2.5">
                  {beat.items.map((item, j) => (
                    <BeatIn key={j} delay={j * 90}>
                      <div className="flex items-baseline gap-3">
                        <span className="pg-serif text-lg flex-shrink-0 w-6" style={{ color: 'var(--pg-accent)' }}>
                          {j + 1}
                        </span>
                        <span className="text-sm" style={{ color: 'var(--pg-text)' }}>
                          <strong className="font-semibold">{item.label}</strong> — {item.detail}
                        </span>
                      </div>
                    </BeatIn>
                  ))}
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <div className="flex rounded-sm overflow-hidden" style={{ border: '1px solid var(--pg-border)' }}>
                {beat.segments.map((seg, j) => (
                  <div
                    key={j}
                    className="flex-1 px-3 py-3 text-center text-[11px] leading-snug"
                    style={{
                      borderLeft: j === 0 ? 'none' : '1px solid var(--pg-border)',
                      background: j === 0 ? 'rgba(200,150,62,0.16)' : 'transparent',
                      color: j === 0 ? 'var(--pg-accent)' : 'var(--pg-text-dim)',
                    }}
                  >
                    {seg.label}
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
