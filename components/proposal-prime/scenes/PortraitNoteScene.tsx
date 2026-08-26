import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { PortraitNoteScene } from '../../../data/proposals/prime-group.types';

export const PortraitNoteSceneView: React.FC<{ scene: PortraitNoteScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-2xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {shown.map((beat, i) => {
          if (beat.kind === 'portrait') {
            return (
              <BeatIn key={i}>
                <div className="flex-shrink-0 text-center">
                  <div
                    className="w-28 h-28 rounded-sm flex items-center justify-center mb-2"
                    style={{ border: '1px solid var(--pg-accent)', background: 'var(--pg-bg-raise)' }}
                  >
                    <span className="pg-serif text-3xl" style={{ color: 'var(--pg-accent)' }}>
                      {beat.initials}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--pg-text-dimmer)' }}>
                    {beat.caption}
                  </p>
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <p className="text-base leading-relaxed pt-1" style={{ color: 'var(--pg-text-dim)' }}>
                {beat.text}
              </p>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
