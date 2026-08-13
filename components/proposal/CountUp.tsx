import React, { useEffect, useState } from 'react';

// Animates a number counting up from 0 on mount — used for the Investment
// scene's headline figures.
export const CountUp: React.FC<{
  to: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ to, durationMs = 1400, prefix = '', suffix = '', className = '' }) => {
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

  return (
    <span className={className}>
      {prefix}
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
};
