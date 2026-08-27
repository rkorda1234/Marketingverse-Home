import React, { useEffect, useState } from 'react';

// Mount-triggered reveal for a single beat (or an item within a beat's internal
// stagger). Same fade/translate/blur language as RevealOnScroll, but fires on
// mount rather than on scroll-into-view, since reveals here are driven by the
// viewer's own tap/arrow/swipe advancing through the deck.
export const BeatIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  // Element tag to render as. Defaults to 'div'; pass 'tr' when wrapping a
  // table row — a <div> can't be a <tbody> child without the browser
  // silently repairing the table structure and breaking column alignment.
  as?: 'div' | 'tr';
}> = ({ children, delay = 0, className = '', style, as = 'div' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 20 + delay);
    return () => window.clearTimeout(t);
  }, [delay]);

  const cls = `transition-all duration-700 ease-out transform ${
    visible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-6 blur-[2px]'
  } ${className}`;

  if (as === 'tr') {
    return (
      <tr className={cls} style={style}>
        {children}
      </tr>
    );
  }
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
};
