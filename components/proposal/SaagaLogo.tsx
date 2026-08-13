import React from 'react';

// Saaga Wealth's wordmark, recreated as text rather than a raster image —
// it's flat, solid-color typography, so this renders crisp at any size and
// matches the same approach the main site already uses for client
// wordmarks (see ClientsSection in App.tsx). Colors are matched from the
// provided logo file.
const TAUPE = '#8B7B72';
const NAVY = '#1E3A66';

export const SaagaLogo: React.FC<{ size?: 'lg' | 'sm'; className?: string }> = ({
  size = 'lg',
  className = '',
}) => {
  const wordmarkClass = size === 'lg' ? 'text-3xl md:text-4xl' : 'text-sm';
  const subClass = size === 'lg' ? 'text-[11px] md:text-xs mt-1' : 'text-[6px] mt-0.5';
  const trackingSub = size === 'lg' ? 'tracking-[0.5em]' : 'tracking-[0.35em]';

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <span className={`${wordmarkClass} font-bold tracking-[0.12em]`}>
        <span style={{ color: TAUPE }}>SA</span>
        <span style={{ color: NAVY }}>A</span>
        <span style={{ color: TAUPE }}>GA</span>
      </span>
      <span className={`${subClass} ${trackingSub} font-semibold`} style={{ color: NAVY }}>
        FAMILY WEALTH
      </span>
    </div>
  );
};
