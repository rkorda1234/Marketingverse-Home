import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import { ShotFrame } from '../ShotFrame';
import type { SpotlightShotScene } from '../../../data/proposals/prime-group.types';

export const SpotlightShotSceneView: React.FC<{ scene: SpotlightShotScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-2xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="space-y-6 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'shot') {
            return (
              <BeatIn key={i}>
                <ShotFrame label="Booking form" annotation={beat.caption} aspect="16/9" big />
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <div className="flex items-center gap-3 flex-wrap">
                {beat.steps.map((s, j) => (
                  <React.Fragment key={j}>
                    {j > 0 && (
                      <span className="text-sm" style={{ color: 'var(--pg-text-dimmer)' }}>
                        →
                      </span>
                    )}
                    <div className="pg-panel rounded-sm px-3.5 py-2.5">
                      <p className="text-[11px] uppercase tracking-wide mb-0.5" style={{ color: 'var(--pg-accent)' }}>
                        {s.time}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--pg-text)' }}>
                        {s.text}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
