import React from 'react';

export const AbstractBackground: React.FC = () => {
  return (
    <div
      className="pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: '#fafafa',
        overflow: 'hidden',
      }}
    >
      {/* Blobs */}
      <div style={{
        position: 'absolute',
        borderRadius: '9999px',
        filter: 'blur(72px)',
        mixBlendMode: 'multiply',
        opacity: 0.42,
        background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,.85), transparent 62%)',
        width: '48vw',
        height: '48vw',
        top: '-8vw',
        left: '-6vw',
        animation: 'mv-drift1 26s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        borderRadius: '9999px',
        filter: 'blur(72px)',
        mixBlendMode: 'multiply',
        opacity: 0.42,
        background: 'radial-gradient(circle at 60% 40%, rgba(168,85,247,.7), transparent 62%)',
        width: '42vw',
        height: '42vw',
        top: '18vh',
        right: '-8vw',
        animation: 'mv-drift2 32s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        borderRadius: '9999px',
        filter: 'blur(72px)',
        mixBlendMode: 'multiply',
        opacity: 0.42,
        background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,.6), transparent 62%)',
        width: '40vw',
        height: '40vw',
        bottom: '-10vw',
        left: '24vw',
        animation: 'mv-drift3 38s ease-in-out infinite',
      }} />
      {/* Dot grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(15,23,42,.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />
    </div>
  );
};
