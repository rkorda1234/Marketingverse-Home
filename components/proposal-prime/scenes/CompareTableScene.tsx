import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { CompareTableScene } from '../../../data/proposals/prime-group.types';

export const CompareTableSceneView: React.FC<{ scene: CompareTableScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="pg-panel rounded-sm overflow-hidden">
        <div
          className="grid grid-cols-[1.4fr_1fr_1fr] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em]"
          style={{ borderBottom: '1px solid var(--pg-border)', color: 'var(--pg-text-dimmer)' }}
        >
          <span></span>
          <span>Now</span>
          <span style={{ color: 'var(--pg-accent)' }}>With us</span>
        </div>
        {shown
          .filter((b) => b.kind === 'rows')
          .flatMap((b) => b.rows)
          .map((row, j) => (
            <BeatIn key={j} delay={j * 80}>
              <div
                className="grid grid-cols-[1.4fr_1fr_1fr] px-4 py-3 items-center"
                style={{ borderTop: j === 0 ? 'none' : '1px solid var(--pg-border)' }}
              >
                <span className="text-sm" style={{ color: 'var(--pg-text)' }}>
                  {row.label}
                </span>
                <span className="text-sm" style={{ color: 'var(--pg-text-dimmer)' }}>
                  {row.now}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: row.highlight ? 'var(--pg-accent)' : 'var(--pg-text)' }}
                >
                  {row.withUs}
                </span>
              </div>
            </BeatIn>
          ))}
      </div>
      {shown
        .filter((b) => b.kind === 'line')
        .map((b, i) => (
          <BeatIn key={`l-${i}`}>
            <p className="mt-5 text-sm" style={{ color: 'var(--pg-text-dim)' }}>
              {(b as { text: string }).text}
            </p>
          </BeatIn>
        ))}
    </div>
  );
};
