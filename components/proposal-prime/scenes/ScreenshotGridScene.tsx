import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import { ShotFrame } from '../ShotFrame';
import type { ScreenshotGridScene } from '../../../data/proposals/prime-group.types';

// Annotated placeholder-screenshot grid. Most beats are `shot` (a problem
// call-out, red); an optional trailing `items` beat adds a follow-up
// checklist below the grid — used for the format-anatomy slide where a
// sequence of stills is followed by a list of what makes it work.
export const ScreenshotGridSceneView: React.FC<{ scene: ScreenshotGridScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);
  const shots = shown.filter((b) => b.kind === 'shot');
  const itemsBeats = shown.filter((b) => b.kind === 'items');

  return (
    <div className="max-w-5xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 pb-4">
        {shots.map((shot, i) => (
          <BeatIn key={i} delay={i * 90}>
            <ShotFrame label={shot.label} annotation={shot.annotation} tone={shot.tone} />
          </BeatIn>
        ))}
      </div>
      {itemsBeats.map((beat, i) => (
        <BeatIn key={`items-${i}`}>
          <ul className="pg-panel rounded-sm p-5 space-y-2.5 mt-2">
            {beat.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-3.5 h-3.5 rounded-full" style={{ border: '1.5px solid var(--pg-accent)' }} />
                <span className="text-sm leading-relaxed" style={{ color: 'var(--pg-text)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </BeatIn>
      ))}
    </div>
  );
};
