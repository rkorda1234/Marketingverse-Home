import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { CountUp } from '../../proposal/CountUp';
import { SceneHeader } from '../SceneHeader';
import type { StatGridScene } from '../../../data/proposals/prime-group.types';

export const StatGridSceneView: React.FC<{ scene: StatGridScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);
  const isCenter = scene.align === 'center';

  return (
    <div className={`max-w-4xl mx-auto ${isCenter ? 'text-center' : ''}`}>
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} align={scene.align} />
      <div className="space-y-6 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'stats') {
            return (
              <BeatIn key={i}>
                <div
                  className={`grid gap-4 ${isCenter ? 'justify-center' : ''}`}
                  style={{ gridTemplateColumns: `repeat(auto-fit, minmax(9.5rem, ${isCenter ? '11rem' : '1fr'}))` }}
                >
                  {beat.stats.map((s, j) => (
                    <BeatIn key={j} delay={j * 80}>
                      <div className="pg-panel rounded-sm p-5">
                        <p className="pg-serif text-4xl md:text-5xl font-normal mb-2" style={{ color: 'var(--pg-accent)' }}>
                          <CountUp to={s.value} prefix={s.prefix ?? ''} suffix={s.suffix ?? ''} decimals={s.decimals ?? 0} />
                        </p>
                        <p className="text-sm leading-snug" style={{ color: 'var(--pg-text-dim)' }}>
                          {s.label}
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
              <p className="text-sm" style={{ color: 'var(--pg-text-dimmer)' }}>
                {beat.text}
              </p>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
