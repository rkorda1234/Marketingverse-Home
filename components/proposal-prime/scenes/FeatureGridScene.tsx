import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { FeatureGridScene } from '../../../data/proposals/prime-group.types';

export const FeatureGridSceneView: React.FC<{ scene: FeatureGridScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);
  const sketchy = scene.variant === 'sketchy';

  return (
    <div className="max-w-5xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="grid md:grid-cols-3 gap-4 pb-4">
        {shown.map((card, i) => (
          <BeatIn key={i} delay={i * 90}>
            <div
              className="rounded-sm p-5 h-full"
              style={{
                background: 'var(--pg-bg-raise)',
                border: `1px ${sketchy ? 'dashed' : 'solid'} var(--pg-border)`,
              }}
            >
              <h3 className="text-[15px] font-semibold mb-2" style={{ color: 'var(--pg-text)' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
                {card.body}
              </p>
              {card.meta && (
                <p className="mt-3 text-xs uppercase tracking-wide" style={{ color: 'var(--pg-accent)' }}>
                  {card.meta}
                </p>
              )}
            </div>
          </BeatIn>
        ))}
      </div>
    </div>
  );
};
