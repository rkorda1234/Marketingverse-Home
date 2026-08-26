import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { DiagramCompareScene, DiagramItem } from '../../../data/proposals/prime-group.types';

// A block (the budget) narrowing or widening into a flow (what it actually
// buys) — 'thin' is a wide block collapsing into a narrow trickle, 'wide'
// is a narrow block fanning out into broad reach.
const BlockFlow: React.FC<{ shape: 'thin' | 'wide' }> = ({ shape }) => {
  const topW = shape === 'thin' ? 150 : 70;
  const botW = shape === 'thin' ? 26 : 160;
  const cx = 100;
  return (
    <svg viewBox="0 0 200 130" className="w-full h-28">
      <rect x={cx - topW / 2} y={6} width={topW} height={16} fill="rgba(244,241,236,0.85)" rx="1" />
      <polygon
        points={`${cx - topW / 2},22 ${cx + topW / 2},22 ${cx + botW / 2},110 ${cx - botW / 2},110`}
        fill="rgba(244,241,236,0.10)"
        stroke="rgba(244,241,236,0.25)"
        strokeWidth="1"
      />
    </svg>
  );
};

export const DiagramCompareSceneView: React.FC<{ scene: DiagramCompareScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="space-y-6 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'pair') {
            return (
              <BeatIn key={i}>
                <div className="grid sm:grid-cols-2 gap-6">
                  {beat.items.map((item: DiagramItem, j) => (
                    <BeatIn key={j} delay={j * 120}>
                      <div className="pg-panel rounded-sm p-5">
                        <BlockFlow shape={item.shape} />
                        <h3 className="text-sm font-semibold mt-3 mb-1.5" style={{ color: 'var(--pg-text)' }}>
                          {item.heading}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
                          {item.body}
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
              <p className="text-base" style={{ color: 'var(--pg-accent)' }}>
                {beat.text}
              </p>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
