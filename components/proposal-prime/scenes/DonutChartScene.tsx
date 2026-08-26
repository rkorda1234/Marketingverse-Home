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

const R_OUTER = 84;
const R_INNER = 54;
const CX = 100;
const CY = 100;

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
    return { start, end, mid, fill, s };
  });

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--pg-text-dimmer)' }}>
        {label}
      </p>
      <svg viewBox="0 0 200 200" className="w-56 h-56 md:w-64 md:h-64 overflow-visible">
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
          const isRight = a.mid <= 180;
          const labelPos = polar(CX, CY, R_OUTER + 20, a.mid);
          return (
            <text
              key={`lbl-${i}`}
              x={labelPos.x}
              y={labelPos.y}
              textAnchor={isRight ? 'start' : 'end'}
              dominantBaseline="middle"
              fontSize="9"
              fill={a.s.highlight ? 'var(--pg-accent)' : 'var(--pg-text-dim)'}
            >
              {a.s.label} · {a.s.pct}%
            </text>
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
      <div className={`flex flex-wrap justify-center gap-10 md:gap-16 ${donutCount > 1 ? '' : ''}`}>
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
