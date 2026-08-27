import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { AuditFindingsScene } from '../../../data/proposals/prime-group.types';

// "Credit where due" next to "here's what's actually off" — a summary
// paragraph beside a list of specific, fixable issues.
export const AuditFindingsSceneView: React.FC<{ scene: AuditFindingsScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-4xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className="space-y-4 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'summary') {
            return (
              <BeatIn key={i}>
                <div className="rounded-sm p-5" style={{ border: '1px solid var(--pg-border)' }}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--pg-text-dimmer)' }}>
                    {beat.heading}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
                    {beat.text}
                  </p>
                </div>
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <div className="pg-panel rounded-sm p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--pg-accent)' }}>
                  {beat.heading}
                </p>
                <ul className="space-y-3">
                  {beat.items.map((item, j) => (
                    <BeatIn key={j} delay={j * 80}>
                      <li className="text-sm leading-relaxed" style={{ color: 'var(--pg-text)' }}>
                        <strong className="font-semibold">{item.lead}</strong>
                        {item.detail ? <span style={{ color: 'var(--pg-text-dim)' }}> — {item.detail}</span> : null}
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
