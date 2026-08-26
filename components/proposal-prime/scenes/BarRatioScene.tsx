import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { CountUp } from '../../proposal/CountUp';
import { SceneHeader } from '../SceneHeader';
import type { BarRatioScene } from '../../../data/proposals/prime-group.types';

export const BarRatioSceneView: React.FC<{ scene: BarRatioScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-2xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="space-y-5 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'bars') {
            const max = Math.max(...beat.items.map((b) => b.value));
            return (
              <BeatIn key={i}>
                {beat.ratio && (
                  <p className="pg-serif text-3xl mb-6" style={{ color: 'var(--pg-accent)' }}>
                    {beat.ratio}
                  </p>
                )}
                <div className="space-y-4">
                  {beat.items.map((item, j) => (
                    <BeatIn key={j} delay={j * 120}>
                      <div>
                        <div className="flex items-baseline justify-between mb-1.5">
                          <span className="text-sm" style={{ color: 'var(--pg-text-dim)' }}>
                            {item.label}
                          </span>
                          <span
                            className="pg-serif text-xl"
                            style={{ color: item.highlight ? 'var(--pg-accent)' : 'var(--pg-text)' }}
                          >
                            <CountUp to={item.value} prefix={item.prefix ?? ''} suffix={item.suffix ?? ''} />
                          </span>
                        </div>
                        <div className="h-2.5 rounded-sm overflow-hidden" style={{ background: 'rgba(244,241,236,0.08)' }}>
                          <div
                            className="h-full rounded-sm transition-all duration-1000 ease-out"
                            style={{
                              width: `${Math.max((item.value / max) * 100, 3)}%`,
                              background: item.highlight ? 'var(--pg-accent)' : 'rgba(244,241,236,0.35)',
                            }}
                          />
                        </div>
                      </div>
                    </BeatIn>
                  ))}
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <p className="text-base" style={{ color: 'var(--pg-text)' }}>
                {beat.text}
              </p>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
