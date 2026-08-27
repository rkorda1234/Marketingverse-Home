import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { PathCompareScene } from '../../../data/proposals/prime-group.types';

export const PathCompareSceneView: React.FC<{ scene: PathCompareScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-3xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="relative grid sm:grid-cols-2 gap-5 pb-4">
        {shown.map((path, i) => {
          const good = path.tone === 'good';
          const neutral = path.tone === 'neutral';
          return (
            <BeatIn key={i} delay={i * 130}>
              <div
                className="rounded-sm p-5 h-full"
                style={{
                  background: 'var(--pg-bg-raise)',
                  border: `1px solid ${good ? 'var(--pg-accent)' : 'var(--pg-border)'}`,
                }}
              >
                <h3
                  className="pg-serif text-xl mb-3"
                  style={{ color: good ? 'var(--pg-accent)' : neutral ? 'var(--pg-text)' : 'var(--pg-text-dim)' }}
                >
                  {path.label}
                </h3>
                <ul className="space-y-2">
                  {path.points.map((p, j) => (
                    <li key={j} className="text-sm leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </BeatIn>
          );
        })}
      </div>
      {scene.note && (
        <p className="text-center text-[11px] uppercase tracking-[0.2em] mt-1" style={{ color: 'var(--pg-accent)' }}>
          {scene.note}
        </p>
      )}
    </div>
  );
};
