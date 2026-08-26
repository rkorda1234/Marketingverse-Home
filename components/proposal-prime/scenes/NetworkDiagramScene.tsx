import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { NetworkDiagramScene } from '../../../data/proposals/prime-group.types';

export const NetworkDiagramSceneView: React.FC<{ scene: NetworkDiagramScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-4xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'hub') {
            return (
              <BeatIn key={i}>
                <div className="flex justify-center mb-1">
                  <div
                    className="px-6 py-2.5 rounded-sm pg-serif text-lg"
                    style={{ border: '1px solid var(--pg-accent)', color: 'var(--pg-accent)' }}
                  >
                    {beat.label}
                  </div>
                </div>
                <div className="mx-auto w-px h-6" style={{ background: 'var(--pg-border)' }} />
                <div className="w-full h-px mb-6" style={{ background: 'var(--pg-border)' }} />
              </BeatIn>
            );
          }
          return (
            <BeatIn key={i}>
              <div className="grid sm:grid-cols-3 gap-4">
                {beat.groups.map((g, j) => (
                  <BeatIn key={j} delay={j * 90}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-px h-4" style={{ background: 'var(--pg-border)' }} />
                      <div className="pg-panel rounded-sm px-4 py-3.5 w-full">
                        <p className="text-[11px] font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--pg-text)' }}>
                          {g.label}
                        </p>
                        <ul className="space-y-1">
                          {g.items.map((it, k) => (
                            <li key={k} className="text-[13px] leading-snug" style={{ color: 'var(--pg-text-dim)' }}>
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </BeatIn>
                ))}
              </div>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
