import React from 'react';

// Saaga Family Wealth's real logo file (client-provided), cropped and cleaned up
// (the original had a checkerboard baked into its "transparent" background
// rather than real alpha) — see public/saaga-logo.png.
export const SaagaLogo: React.FC<{ size?: 'lg' | 'sm'; className?: string }> = ({
  size = 'lg',
  className = '',
}) => {
  const sizeClass = size === 'lg' ? 'w-56 md:w-64 mx-auto' : 'w-16 md:w-[4.5rem]';

  return (
    <img
      src="/saaga-logo.png"
      alt="Saaga Family Wealth"
      className={`${sizeClass} h-auto object-contain ${className}`}
    />
  );
};
