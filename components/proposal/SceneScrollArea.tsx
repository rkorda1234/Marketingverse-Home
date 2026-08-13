import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Wraps every scene's rendered content. Handles three things once, for all
// scene types, instead of each scene managing its own overflow:
//  - caps content to the viewport so nothing renders unreachable
//  - auto-scrolls a newly revealed beat into view as the viewer advances,
//    so tapping/pressing forward always shows what just appeared
//  - shows a small "more below" cue (a bouncing chevron, in normal flow
//    below the scroll box — never overlapping content) when there's more
//    to see and the viewer hasn't scrolled to the end yet
//
// Mounted fresh per scene (parent keys the wrapper by scene.id), so scroll
// position and the cue both reset naturally on scene change.
export const SceneScrollArea: React.FC<{ beatIndex: number; children: React.ReactNode }> = ({
  beatIndex,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const isFirstBeat = useRef(true);
  const [showCue, setShowCue] = useState(false);

  const checkCue = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowCue(el.scrollHeight - el.scrollTop - el.clientHeight > 24);
  };

  useLayoutEffect(() => {
    checkCue();
  }, [beatIndex]);

  useEffect(() => {
    if (isFirstBeat.current) {
      // Don't scroll on the scene's first beat — it's already at the top
      // from the fresh mount, and the scene transition itself is the motion.
      isFirstBeat.current = false;
      return;
    }
    anchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [beatIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkCue, { passive: true });
    window.addEventListener('resize', checkCue);
    return () => {
      el.removeEventListener('scroll', checkCue);
      window.removeEventListener('resize', checkCue);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div ref={containerRef} className="max-h-[70dvh] overflow-y-auto px-1 scrollbar-hide">
        {children}
        <div ref={anchorRef} />
      </div>
      <div className={`flex justify-center transition-all duration-300 ${showCue ? 'h-6 opacity-100' : 'h-0 opacity-0'}`}>
        <ChevronDown size={16} className="text-neutral-400 animate-bounce" />
      </div>
    </div>
  );
};
