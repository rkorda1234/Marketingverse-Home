import React from 'react';

// Prime Group has no supplied logo file, so the corner mark and hero use a
// plain type wordmark in the deck's own display serif — consistent with the
// "no client branding beyond a small corner mark" rule, and avoids faking a
// logo that doesn't exist.
export const PrimeLogo: React.FC<{ size?: 'lg' | 'sm'; className?: string }> = ({ size = 'sm', className = '' }) => {
  const textClass = size === 'lg' ? 'text-2xl md:text-3xl tracking-[0.02em]' : 'text-[13px] md:text-sm tracking-[0.03em]';

  return (
    <span className={`pg-serif italic font-normal whitespace-nowrap ${textClass} ${className}`} style={{ color: 'var(--pg-text)' }}>
      Prime Group
    </span>
  );
};
