import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { CountUp } from '../../proposal/CountUp';
import { SceneHeader } from '../SceneHeader';
import type { BarsAndListScene } from '../../../data/proposals/prime-group.types';

// A bar comparison (e.g. review counts across every venue) followed by a
// short "here's what's fixable" list on the same slide — built for the
// Prime Kitchen zero-reviews finding.
export const BarsAndListSceneView: React.FC<{ scene: BarsAndListScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="space-y-6 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'bars') {
            const max = Math.max(...beat.items.map((b) => b.value), 1);
            return (
              <BeatIn key={i}>
                <div className="flex items-end gap-3 h-32">
                  {beat.items.map((item, j) => (
                    <BeatIn key={j} delay={j * 70} className="flex-1 h-full flex flex-col justify-end items-center">
                      <span
                        className="text-xs font-semibold mb-1.5"
                        style={{ color: item.highlight ? 'var(--pg-accent)' : 'var(--pg-text-dim)' }}
                      >
                        <CountUp to={item.value} prefix={item.prefix ?? ''} suffix={item.suffix ?? ''} />
                      </span>
                      <div
                        className="w-full rounded-t-sm transition-all duration-700"
                        style={{
                          height: `${Math.max((item.value / max) * 100, 3)}%`,
                          background: item.highlight ? 'var(--pg-accent)' : 'rgba(244,241,236,0.22)',
                        }}
                      />
                    </BeatIn>
                  ))}
                </div>
                <div className="flex gap-3 mt-2">
                  {beat.items.map((item, j) => (
                    <div key={j} className="flex-1 text-center">
                      <p className="text-[11px] leading-tight" style={{ color: 'var(--pg-text-dimmer)' }}>
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <div className="pg-panel rounded-sm p-5">
                {beat.heading && (
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--pg-accent)' }}>
                    {beat.heading}
                  </p>
                )}
                <ul className="space-y-2.5">
                  {beat.items.map((item, j) => (
                    <BeatIn key={j} delay={j * 80}>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full" style={{ border: '1.5px solid var(--pg-accent)' }} />
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--pg-text)' }}>
                          {item}
                        </span>
                      </li>
                    </BeatIn>
                  ))}
                </ul>
              </div>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
