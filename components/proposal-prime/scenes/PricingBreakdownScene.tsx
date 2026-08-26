import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { PricingBreakdownScene } from '../../../data/proposals/prime-group.types';

export const PricingBreakdownSceneView: React.FC<{ scene: PricingBreakdownScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className="grid sm:grid-cols-2 gap-4 pb-4">
        {shown
          .filter((b) => b.kind === 'section')
          .map((b, i) => (
            <BeatIn key={i} delay={i * 110}>
              <div className="pg-panel rounded-sm p-5 h-full">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--pg-accent)' }}>
                  {b.heading}
                </p>
                <ul className="space-y-2 mb-3">
                  {b.lines.map((line, j) => (
                    <li key={j} className="flex items-baseline justify-between gap-3">
                      <span className="text-sm" style={{ color: 'var(--pg-text-dim)' }}>
                        {line.label}
                      </span>
                      {line.amount && (
                        <span className="text-sm flex-shrink-0" style={{ color: 'var(--pg-text)' }}>
                          {line.amount}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                {b.total && (
                  <div
                    className="flex items-baseline justify-between pt-3"
                    style={{ borderTop: '1px solid var(--pg-border)' }}
                  >
                    <span className="text-sm font-semibold" style={{ color: 'var(--pg-text)' }}>
                      {b.total.label}
                    </span>
                    <span className="pg-serif text-xl" style={{ color: 'var(--pg-accent)' }}>
                      {b.total.amount}
                    </span>
                  </div>
                )}
              </div>
            </BeatIn>
          ))}
      </div>
      {shown
        .filter((b) => b.kind === 'note')
        .map((b, i) => (
          <BeatIn key={`n-${i}`}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
              {(b as { text: string }).text}
            </p>
          </BeatIn>
        ))}
    </div>
  );
};
