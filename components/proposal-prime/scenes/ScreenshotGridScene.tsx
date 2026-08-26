import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import { ShotFrame } from '../ShotFrame';
import type { ScreenshotGridScene } from '../../../data/proposals/prime-group.types';

// S5 — the "uncomfortable part" grid. Real screenshots aren't in hand yet,
// so each tile is a clearly-labeled placeholder frame (thin 1px border, no
// drop shadow, per the build brief) carrying the exact annotation call-out
// that would sit on the real screenshot, in red.
export const ScreenshotGridSceneView: React.FC<{ scene: ScreenshotGridScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-5xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 pb-4">
        {shown.map((shot, i) => (
          <BeatIn key={i} delay={i * 90}>
            <ShotFrame label={shot.label} annotation={shot.annotation} />
          </BeatIn>
        ))}
      </div>
    </div>
  );
};
