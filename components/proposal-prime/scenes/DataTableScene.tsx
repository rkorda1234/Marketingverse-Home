import React from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { DataTableScene } from '../../../data/proposals/prime-group.types';

// A generic small data table — covers the audit's verified-numbers slides
// (sales performance, spend by venue, venue-by-job, content rhythm, the
// creator bench) without a bespoke scene type for each.
export const DataTableSceneView: React.FC<{ scene: DataTableScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);
  const rowBeats = shown.filter((b) => b.kind === 'rows');
  const lineBeats = shown.filter((b) => b.kind === 'line');
  const highlightCol = scene.highlightCol;

  return (
    <div className="max-w-5xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} sub={scene.sub} />
      <div className="pg-panel rounded-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--pg-border)' }}>
                {scene.columns.map((c, i) => (
                  <th
                    key={i}
                    className="px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: i === highlightCol ? 'var(--pg-accent)' : 'var(--pg-text-dimmer)' }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowBeats
                .flatMap((b) => b.rows)
                .map((row, j) => (
                  <BeatIn as="tr" key={j} delay={j * 60} className="align-top" style={{ borderTop: j === 0 ? 'none' : '1px solid var(--pg-border)' }}>
                    {row.map((cell, k) => (
                      <td
                        key={k}
                        className={`px-3.5 py-2.5 text-[12.5px] leading-snug align-top ${k === 0 ? 'font-semibold' : ''}`}
                        style={{ color: k === highlightCol ? 'var(--pg-accent)' : k === 0 ? 'var(--pg-text)' : 'var(--pg-text-dim)' }}
                      >
                        {cell}
                      </td>
                    ))}
                  </BeatIn>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {lineBeats.map((b, i) => (
        <BeatIn key={`l-${i}`}>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: 'var(--pg-text-dim)' }}>
            {b.text}
          </p>
        </BeatIn>
      ))}
    </div>
  );
};
