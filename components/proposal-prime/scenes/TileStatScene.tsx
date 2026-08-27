import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { CountUp } from '../../proposal/CountUp';
import { SceneHeader } from '../SceneHeader';
import type { TileStatScene } from '../../../data/proposals/prime-group.types';

export const TileStatSceneView: React.FC<{ scene: TileStatScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="space-y-8 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'tiles') {
            return (
              <BeatIn key={i}>
                <div className="grid grid-cols-4 gap-2.5">
                  {beat.tiles.map((t, j) => (
                    <BeatIn key={j} delay={j * 60}>
                      <div className="pg-panel rounded-sm px-2.5 py-3 text-center">
                        <p className="text-[10px] uppercase tracking-wide mb-1 truncate" style={{ color: 'var(--pg-text-dimmer)' }}>
                          {t.label}
                        </p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--pg-text)' }}>
                          {t.value}
                        </p>
                      </div>
                    </BeatIn>
                  ))}
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <div className="pg-panel rounded-sm p-6 text-center" style={{ borderColor: 'var(--pg-accent)' }}>
                <p className="pg-serif text-4xl md:text-5xl mb-2" style={{ color: 'var(--pg-accent)' }}>
                  <CountUp to={beat.value} prefix={beat.prefix ?? ''} suffix={beat.suffix ?? ''} decimals={beat.decimals ?? 0} />
                </p>
                <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--pg-text)' }}>
                  {beat.label}
                </p>
                <p className="text-xs" style={{ color: 'var(--pg-text-dim)' }}>
                  {beat.context}
                </p>
              </div>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
