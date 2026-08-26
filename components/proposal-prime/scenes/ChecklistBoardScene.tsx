import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { ChecklistBoardScene } from '../../../data/proposals/prime-group.types';

export const ChecklistBoardSceneView: React.FC<{ scene: ChecklistBoardScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-2xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="pg-panel rounded-sm p-5">
        <ul className="space-y-3">
          {shown
            .filter((b) => b.kind === 'items')
            .flatMap((b) => b.items)
            .map((item, j) => (
              <BeatIn key={j} delay={j * 90}>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full"
                    style={{ border: '1.5px solid var(--pg-accent)' }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--pg-text)' }}>
                    {item}
                  </span>
                </li>
              </BeatIn>
            ))}
        </ul>
      </div>
    </div>
  );
};
