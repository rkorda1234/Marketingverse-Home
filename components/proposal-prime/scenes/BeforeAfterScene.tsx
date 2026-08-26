import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { BeforeAfterScene } from '../../../data/proposals/prime-group.types';

export const BeforeAfterSceneView: React.FC<{ scene: BeforeAfterScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-2xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className="flex items-center justify-end gap-8 mb-2 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--pg-text-dimmer)' }}>
        <span className="w-8 text-center">Before</span>
        <span className="w-8 text-center" style={{ color: 'var(--pg-accent)' }}>
          After
        </span>
      </div>
      <div className="pg-panel rounded-sm">
        {shown
          .filter((b) => b.kind === 'rows')
          .flatMap((b) => b.rows)
          .map((row, j) => (
            <BeatIn key={j} delay={j * 70}>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: j === 0 ? 'none' : '1px solid var(--pg-border)' }}
              >
                <span className="text-sm" style={{ color: 'var(--pg-text)' }}>
                  {row.label}
                </span>
                <div className="flex items-center gap-8">
                  <span className="w-8 text-center text-base" style={{ color: 'var(--pg-red)' }}>
                    ✕
                  </span>
                  <span className="w-8 text-center text-base" style={{ color: 'var(--pg-accent)' }}>
                    ✓
                  </span>
                </div>
              </div>
            </BeatIn>
          ))}
      </div>
    </div>
  );
};
