import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import { ShotFrame } from '../ShotFrame';
import type { MediaCompareScene } from '../../../data/proposals/prime-group.types';

// S7 — "every room is empty" split. Two labeled columns, each a small grid
// of placeholder shots, revealed one column per beat.
export const MediaCompareSceneView: React.FC<{ scene: MediaCompareScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-5xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className="grid md:grid-cols-2 gap-6 pb-4">
        {shown.map((col, i) => (
          <BeatIn key={i} delay={i * 100}>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
                style={{ color: i === 0 ? 'var(--pg-text-dimmer)' : 'var(--pg-accent)' }}
              >
                {col.label}
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {col.shots.map((s, j) => (
                  <BeatIn key={j} delay={j * 70}>
                    <ShotFrame label={s.caption} aspect="3/4" />
                  </BeatIn>
                ))}
              </div>
            </div>
          </BeatIn>
        ))}
      </div>
    </div>
  );
};
