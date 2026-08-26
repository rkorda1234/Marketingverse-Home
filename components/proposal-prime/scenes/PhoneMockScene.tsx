import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { PhoneMockScene } from '../../../data/proposals/prime-group.types';

export const PhoneMockSceneView: React.FC<{ scene: PhoneMockScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-2xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div
        className="mx-auto w-full max-w-xs rounded-2xl p-2.5"
        style={{ border: '1px solid var(--pg-border)', background: 'var(--pg-bg-raise)' }}
      >
        <div className="rounded-xl p-3 space-y-2.5" style={{ background: 'var(--pg-bg)' }}>
          {shown.map((t, i) => (
            <BeatIn key={i} delay={i * 100}>
              <div className="rounded-lg px-3.5 py-2.5" style={{ border: '1px solid var(--pg-border)' }}>
                <p className="text-[11px] font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--pg-accent)' }}>
                  {t.label}
                </p>
                <p className="text-[13px] leading-snug" style={{ color: 'var(--pg-text-dim)' }}>
                  {t.preview}
                </p>
              </div>
            </BeatIn>
          ))}
        </div>
      </div>
    </div>
  );
};
