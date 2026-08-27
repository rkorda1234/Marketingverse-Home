import React, { useEffect, useState } from 'react';
import { BeatIn } from '../../proposal/BeatIn';
import { SceneHeader } from '../SceneHeader';
import type { DonutChartScene, DonutSegment } from '../../../data/proposals/prime-group.types';

// SVG <text> can't host the <span>-based CountUp component, so this is the
// same ease-out-cubic count-up logic, returning a plain number for use
// directly as SVG text content.
function useCountUp(to: number, durationMs = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, durationMs]);
  return value;
}

// Wide viewBox with generous margins on both sides — labels live in a fixed
// column well clear of the ring, not at a radial offset that scales with
// text length. That's what let long labels ("Content production · 14%")
// bleed back over the ring before: a radial offset is only as safe as the
// shortest label, and any longer one takes it back into the ring.
const VB_W = 340;
const VB_H = 220;
const CX = 170;
const CY = 110;
const R_OUTER = 62;
const R_INNER = 40;
const COL_MARGIN = 26; // leader-column clearance from the ring
const LABEL_LINE_GAP = 30; // minimum vertical space between stacked labels

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function sectorPath(startAngle: number, endAngle: number) {
  const so = polar(CX, CY, R_OUTER, endAngle);
  const eo = polar(CX, CY, R_OUTER, startAngle);
  const si = polar(CX, CY, R_INNER, endAngle);
  const ei = polar(CX, CY, R_INNER, startAngle);
  const large = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${so.x} ${so.y} A ${R_OUTER} ${R_OUTER} 0 ${large} 0 ${eo.x} ${eo.y} L ${ei.x} ${ei.y} A ${R_INNER} ${R_INNER} 0 ${large} 1 ${si.x} ${si.y} Z`;
}

// Pushes vertically-crowded labels on one side apart, keeping them sorted
// by their original angle so the leader lines never cross each other.
function declutter(ys: number[]): number[] {
  const order = ys.map((y, i) => i).sort((a, b) => ys[a] - ys[b]);
  const placed: number[] = new Array(ys.length);
  let lastY = -Infinity;
  for (const i of order) {
    const y = Math.max(ys[i], lastY + LABEL_LINE_GAP);
    placed[i] = y;
    lastY = y;
  }
  return placed;
}

const NEUTRAL_FILLS = ['rgba(244,241,236,0.30)', 'rgba(244,241,236,0.20)', 'rgba(244,241,236,0.13)', 'rgba(244,241,236,0.08)'];

const Donut: React.FC<{ label: string; totalValue: number; totalPrefix?: string; segments: DonutSegment[] }> = ({
  label,
  totalValue,
  totalPrefix,
  segments,
}) => {
  const displayTotal = useCountUp(totalValue);
  let cumulative = 0;
  let neutralIdx = 0;
  const arcs = segments.map((s) => {
    const start = cumulative;
    const end = cumulative + s.pct * 3.6;
    cumulative = end;
    const mid = (start + end) / 2;
    const fill = s.highlight ? 'var(--pg-accent)' : NEUTRAL_FILLS[neutralIdx++ % NEUTRAL_FILLS.length];
    const isRight = mid <= 180;
    const edge = polar(CX, CY, R_OUTER, mid);
    const bendY = polar(CX, CY, R_OUTER + 12, mid).y;
    return { start, end, mid, fill, s, isRight, edge, bendY };
  });

  const rightYs = declutter(arcs.filter((a) => a.isRight).map((a) => a.bendY));
  const leftYs = declutter(arcs.filter((a) => !a.isRight).map((a) => a.bendY));
  let ri = 0;
  let li = 0;
  const labelYs = arcs.map((a) => (a.isRight ? rightYs[ri++] : leftYs[li++]));

  const colRight = CX + R_OUTER + COL_MARGIN;
  const colLeft = CX - R_OUTER - COL_MARGIN;

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--pg-text-dimmer)' }}>
        {label}
      </p>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full max-w-sm h-auto">
        {arcs.map((a, i) => (
          <path key={i} d={sectorPath(a.start, a.end)} fill={a.fill} />
        ))}
        <text x={CX} y={CY - 5} textAnchor="middle" className="pg-serif" fontSize="22" fill="var(--pg-text)">
          {totalPrefix ?? ''}
          {displayTotal.toLocaleString('en-US')}
        </text>
        <text x={CX} y={CY + 14} textAnchor="middle" fontSize="8" letterSpacing="1.5" fill="var(--pg-text-dimmer)">
          TOTAL
        </text>
        {arcs.map((a, i) => {
          const colX = a.isRight ? colRight : colLeft;
          const labelY = labelYs[i];
          const midX = polar(CX, CY, R_OUTER + 12, a.mid).x;
          const color = a.s.highlight ? 'var(--pg-accent)' : 'var(--pg-text-dim)';
          return (
            <g key={`lbl-${i}`}>
              <polyline
                points={`${a.edge.x},${a.edge.y} ${midX},${a.bendY} ${colX},${labelY}`}
                fill="none"
                stroke="var(--pg-border)"
                strokeWidth="1"
              />
              <text
                x={colX + (a.isRight ? 4 : -4)}
                y={labelY - 3}
                textAnchor={a.isRight ? 'start' : 'end'}
                fontSize="10.5"
                fontWeight="600"
                fill={color}
              >
                {a.s.pct}%
              </text>
              <text
                x={colX + (a.isRight ? 4 : -4)}
                y={labelY + 9}
                textAnchor={a.isRight ? 'start' : 'end'}
                fontSize="8"
                fill="var(--pg-text-dimmer)"
              >
                {a.s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const DonutChartSceneView: React.FC<{ scene: DonutChartScene; revealCount: number }> = ({
  scene,
  revealCount,
}) => {
  const shown = scene.beats.slice(0, revealCount);
  const donutCount = shown.filter((b) => b.kind === 'donut').length;

  return (
    <div className="max-w-4xl mx-auto">
      <SceneHeader eyebrow={scene.eyebrow} title={scene.title} />
      <div className={`grid gap-x-8 gap-y-10 ${donutCount > 1 ? 'sm:grid-cols-2' : 'grid-cols-1 max-w-sm mx-auto'}`}>
        {shown.map((beat, i) => {
          if (beat.kind === 'donut') {
            return (
              <BeatIn key={i} delay={i * 120}>
                <Donut label={beat.label} totalValue={beat.totalValue} totalPrefix={beat.totalPrefix} segments={beat.segments} />
              </BeatIn>
            );
          }
          return null;
        })}
      </div>
      {shown
        .filter((b) => b.kind === 'line')
        .map((b, i) => (
          <BeatIn key={`line-${i}`}>
            <p className="text-center mt-8 text-base md:text-lg" style={{ color: 'var(--pg-text)' }}>
              {(b as { text: string }).text}
            </p>
          </BeatIn>
        ))}
    </div>
  );
};
