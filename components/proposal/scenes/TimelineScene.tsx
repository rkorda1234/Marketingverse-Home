import React, { useEffect, useState } from 'react';
import { BeatIn } from '../BeatIn';
import type { TimelineScene, TimelineBeat } from '../../../data/proposals/types';

export const TimelineSceneView: React.FC<{ scene: TimelineScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);
  const introBeat = shown.find((b): b is Extract<TimelineBeat, { kind: 'intro' }> => b.kind === 'intro');
  const segmentsBeat = shown.find(
    (b): b is Extract<TimelineBeat, { kind: 'segments' }> => b.kind === 'segments'
  );

  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (!segmentsBeat) return;
    const t = window.setTimeout(() => setDrawn(true), 30);
    return () => window.clearTimeout(t);
  }, [segmentsBeat]);

  return (
    <div className="max-w-5xl mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-600 mb-3">{scene.eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
        <span className="font-serif italic font-normal">{scene.title}</span>
      </h2>

      {introBeat && (
        <BeatIn>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-10 max-w-2xl">{introBeat.text}</p>
        </BeatIn>
      )}

      {segmentsBeat && (
        <div className="relative">
          <div className="hidden md:block absolute top-[5px] left-0 right-0 h-px bg-neutral-200">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 origin-left transition-transform duration-[1200ms] ease-out"
              style={{ transform: `scaleX(${drawn ? 1 : 0})` }}
            />
          </div>
          <div className="grid md:grid-cols-6 gap-5 md:gap-3">
            {segmentsBeat.segments.map((seg, i) => (
              <BeatIn key={i} delay={i * 110}>
                <div className="relative">
                  <div className="hidden md:block w-2.5 h-2.5 rounded-full bg-violet-600 mb-3 ring-4 ring-violet-100" />
                  <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-900 mb-1">{seg.phase}</p>
                  <p className="text-[11px] text-neutral-500 mb-1.5">{seg.timeframe}</p>
                  <p className="text-xs text-neutral-600 leading-snug">{seg.milestone}</p>
                </div>
              </BeatIn>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
