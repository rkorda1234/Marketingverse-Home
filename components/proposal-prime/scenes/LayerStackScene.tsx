import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { LayerStackScene } from '../../../data/proposals/prime-group.types';

export const LayerStackSceneView: React.FC<{ scene: LayerStackScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-2xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className="space-y-3">
        {shown.map((layer, i) => (
          <BeatIn key={i} delay={i * 130}>
            <div className="flex gap-4 pg-panel rounded-sm p-5">
              <span
                className="flex-shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] pt-0.5"
                style={{ color: 'var(--pg-accent)' }}
              >
                {layer.label}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold mb-1.5" style={{ color: 'var(--pg-text)' }}>
                  {layer.heading}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
                  {layer.body}
                </p>
              </div>
            </div>
          </BeatIn>
        ))}
      </div>
    </div>
  );
};
