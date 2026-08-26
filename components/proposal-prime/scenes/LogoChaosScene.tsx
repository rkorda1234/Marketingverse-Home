import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { LogoChaosScene } from '../../../data/proposals/prime-group.types';

// Eight names, deliberately mismatched — different weights, sizes, and a
// slight scatter of rotation/offset per chip — to read as "no shared
// system," not as a designed grid.
const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4];
const SIZES = ['text-lg', 'text-2xl', 'text-base', 'text-xl', 'text-sm', 'text-2xl', 'text-lg', 'text-xl'];
const WEIGHTS = ['font-light', 'font-bold', 'font-normal', 'font-semibold', 'font-light', 'font-bold', 'font-normal', 'font-semibold'];
const FONTS = ['pg-serif italic', '', 'pg-serif', '', '', 'pg-serif italic', '', 'pg-serif'];

export const LogoChaosSceneView: React.FC<{ scene: LogoChaosScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      {shown.map((beat, i) => (
        <div key={i} className="flex flex-wrap items-center gap-x-8 gap-y-6 justify-center py-6">
          {beat.names.map((name, j) => (
            <BeatIn key={j} delay={j * 90}>
              <span
                className={`inline-block ${SIZES[j % SIZES.length]} ${WEIGHTS[j % WEIGHTS.length]} ${FONTS[j % FONTS.length]}`}
                style={{ transform: `rotate(${ROTATIONS[j % ROTATIONS.length]}deg)`, color: 'var(--pg-text-dim)' }}
              >
                {name}
              </span>
            </BeatIn>
          ))}
        </div>
      ))}
    </div>
  );
};
