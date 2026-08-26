import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { DashboardMockScene } from '../../../data/proposals/prime-group.types';

const COLS: { key: keyof import('../../../data/proposals/prime-group.types').DashboardVenue; label: string }[] = [
  { key: 'covers', label: 'Covers' },
  { key: 'reservations', label: 'Reservations' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'ratingTrend', label: 'Rating' },
  { key: 'gbpActions', label: 'GBP actions' },
  { key: 'spend', label: 'Ad spend' },
  { key: 'cpr', label: 'Cost / res.' },
];

// The one mock built to look like a real product, not a placeholder — the
// build brief flags this slide as doing heavy lifting on its own.
export const DashboardMockSceneView: React.FC<{ scene: DashboardMockScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-5xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      {shown.map((beat, i) => (
        <BeatIn key={i}>
          <div className="rounded-sm overflow-hidden" style={{ border: '1px solid var(--pg-border)' }}>
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ background: 'var(--pg-bg-raise)', borderBottom: '1px solid var(--pg-border)' }}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--pg-text)' }}>
                Prime Group · all venues
              </span>
              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide" style={{ color: 'var(--pg-accent)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--pg-accent)' }} />
                Live · {beat.updated}
              </span>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--pg-border)' }}>
                    <th className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap" style={{ color: 'var(--pg-text-dimmer)' }}>
                      Venue
                    </th>
                    {COLS.map((c) => (
                      <th
                        key={c.key}
                        className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap"
                        style={{ color: 'var(--pg-text-dimmer)' }}
                      >
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {beat.venues.map((v, j) => (
                    <tr key={v.name} style={{ borderTop: j === 0 ? 'none' : '1px solid var(--pg-border)' }}>
                      <td className="px-4 py-2.5 text-[13px] font-semibold whitespace-nowrap" style={{ color: 'var(--pg-text)' }}>
                        {v.name}
                      </td>
                      {COLS.map((c) => (
                        <td key={c.key} className="px-3 py-2.5 text-[13px] whitespace-nowrap" style={{ color: 'var(--pg-text-dim)' }}>
                          {v[c.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </BeatIn>
      ))}
    </div>
  );
};
