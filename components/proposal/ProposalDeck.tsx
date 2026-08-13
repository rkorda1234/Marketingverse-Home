import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Proposal, Scene } from '../../data/proposals/types';
import { SceneScrollArea } from './SceneScrollArea';
import { HeroSceneView } from './scenes/HeroScene';
import { RichTextSceneView } from './scenes/RichTextScene';
import { PipelineTableSceneView } from './scenes/PipelineTableScene';
import { PhaseSceneView } from './scenes/PhaseScene';
import { CardGridSceneView } from './scenes/CardGridScene';
import { TimelineSceneView } from './scenes/TimelineScene';
import { InvestmentSceneView } from './scenes/InvestmentScene';
import { ChecklistSceneView } from './scenes/ChecklistScene';
import { AboutSceneView } from './scenes/AboutScene';
import { CTASceneView } from './scenes/CTAScene';

function renderScene(scene: Scene, revealCount: number) {
  switch (scene.type) {
    case 'hero':
      return <HeroSceneView scene={scene} revealCount={revealCount} />;
    case 'richText':
      return <RichTextSceneView scene={scene} revealCount={revealCount} />;
    case 'pipelineTable':
      return <PipelineTableSceneView scene={scene} revealCount={revealCount} />;
    case 'phase':
      return <PhaseSceneView scene={scene} revealCount={revealCount} />;
    case 'cardGrid':
      return <CardGridSceneView scene={scene} revealCount={revealCount} />;
    case 'timeline':
      return <TimelineSceneView scene={scene} revealCount={revealCount} />;
    case 'investment':
      return <InvestmentSceneView scene={scene} revealCount={revealCount} />;
    case 'checklist':
      return <ChecklistSceneView scene={scene} revealCount={revealCount} />;
    case 'about':
      return <AboutSceneView scene={scene} revealCount={revealCount} />;
    case 'cta':
      return <CTASceneView scene={scene} revealCount={revealCount} />;
  }
}

const TRANSITION_MS = 380;

// Stagger for the nav-arrow intro's particle trail — matches the 0.3s
// button delay set in index.css, spaced out a bit further so each dot
// reads as a distinct spark rather than a blur.
const TRAIL_DELAYS = [340, 400, 470, 550, 640];

type TransitionPhase = 'idle' | 'leaving' | 'entering';

export const ProposalDeck: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
  const { scenes } = proposal;
  const [sceneIndex, setSceneIndex] = useState(0);
  const [beatIndex, setBeatIndex] = useState(1); // count of revealed beats in the current scene
  const [direction, setDirection] = useState<1 | -1>(1);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [hintVisible, setHintVisible] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const scene = scenes[sceneIndex];
  const totalBeats = scene.beats.length;
  const atSceneEnd = beatIndex >= totalBeats;
  const atFirstScene = sceneIndex === 0;
  const atLastScene = sceneIndex === scenes.length - 1;
  const isAnimating = phase !== 'idle';

  const dismissHint = useCallback(() => setHintVisible(false), []);

  const goToScene = useCallback(
    (index: number, dir: 1 | -1, beat: number) => {
      if (index < 0 || index >= scenes.length) return;
      setDirection(dir);
      setPhase('leaving');
      window.setTimeout(() => {
        setSceneIndex(index);
        setBeatIndex(beat);
        setPhase('entering');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setPhase('idle'));
        });
      }, TRANSITION_MS);
    },
    [scenes.length]
  );

  const advance = useCallback(() => {
    if (isAnimating) return;
    dismissHint();
    if (!atSceneEnd) {
      setBeatIndex((b) => b + 1);
      return;
    }
    if (!atLastScene) goToScene(sceneIndex + 1, 1, 1);
  }, [isAnimating, atSceneEnd, atLastScene, sceneIndex, goToScene, dismissHint]);

  const retreat = useCallback(() => {
    if (isAnimating) return;
    dismissHint();
    if (beatIndex > 1) {
      setBeatIndex((b) => b - 1);
      return;
    }
    if (!atFirstScene) goToScene(sceneIndex - 1, -1, scenes[sceneIndex - 1].beats.length);
  }, [isAnimating, beatIndex, atFirstScene, sceneIndex, scenes, goToScene, dismissHint]);

  const jumpToScene = useCallback(
    (index: number) => {
      if (isAnimating || index === sceneIndex) return;
      dismissHint();
      goToScene(index, index > sceneIndex ? 1 : -1, scenes[index].beats.length);
    },
    [isAnimating, sceneIndex, scenes, goToScene, dismissHint]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        advance();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        retreat();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [advance, retreat]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) advance();
    else retreat();
  };

  const progressPct = ((sceneIndex + (atSceneEnd ? 1 : beatIndex / totalBeats)) / scenes.length) * 100;

  const hiddenClass = direction === 1 ? 'opacity-0 translate-y-6' : 'opacity-0 -translate-y-6';
  const leavingClass = direction === 1 ? 'opacity-0 -translate-y-6' : 'opacity-0 translate-y-6';
  const sceneClass =
    phase === 'leaving' ? leavingClass : phase === 'entering' ? hiddenClass : 'opacity-100 translate-y-0';

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden bg-[#fafafa] select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient background — the site's existing blob-drift system */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-gradient-to-br from-indigo-200/50 to-violet-200/40 blur-3xl"
          style={{ animation: 'mv-drift1 22s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-sky-200/40 to-purple-200/40 blur-3xl"
          style={{ animation: 'mv-drift2 26s ease-in-out infinite' }}
        />
      </div>

      {/* Progress line */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 transition-all duration-300 z-30"
        style={{ width: `${progressPct}%` }}
      />

      {/* Scene content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-6 md:px-16 py-16">
        <div
          key={scene.id}
          className={`w-full max-w-5xl transition-all ease-out transform ${sceneClass}`}
          style={{ transitionDuration: `${TRANSITION_MS}ms` }}
        >
          <SceneScrollArea beatIndex={beatIndex}>{renderScene(scene, beatIndex)}</SceneScrollArea>
        </div>
      </div>

      {/* Forward / back (desktop), with a particle trail on the intro slide */}
      {TRAIL_DELAYS.map((ms) => (
        <span
          key={`trail-l-${ms}`}
          className="mv-nav-trail-dot mv-nav-trail-left hidden md:block z-20"
          style={{ animationDelay: `${ms}ms` }}
        />
      ))}
      <button
        aria-label="Previous"
        onClick={retreat}
        disabled={atFirstScene && beatIndex <= 1}
        className="mv-nav-intro-left hidden md:flex items-center justify-center absolute left-3 top-1/2 z-20 w-11 h-11 rounded-full mv-glass text-neutral-700 hover:text-black transition-opacity disabled:opacity-0"
      >
        <ChevronLeft size={20} />
      </button>
      {TRAIL_DELAYS.map((ms) => (
        <span
          key={`trail-r-${ms}`}
          className="mv-nav-trail-dot mv-nav-trail-right hidden md:block z-20"
          style={{ animationDelay: `${ms}ms` }}
        />
      ))}
      <button
        aria-label="Next"
        onClick={advance}
        disabled={atLastScene && atSceneEnd}
        className="mv-nav-intro-right hidden md:flex items-center justify-center absolute right-3 top-1/2 z-20 w-11 h-11 rounded-full mv-glass text-neutral-700 hover:text-black transition-opacity disabled:opacity-0"
      >
        <ChevronRight size={20} />
      </button>

      {/* Mobile tap zones */}
      <button aria-label="Previous" onClick={retreat} className="md:hidden absolute left-0 top-0 h-full w-1/4 z-10" />
      <button aria-label="Next" onClick={advance} className="md:hidden absolute right-0 top-0 h-full w-1/4 z-10" />

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 max-w-full overflow-x-auto scrollbar-hide">
        {scenes.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Go to section ${i + 1}`}
            onClick={() => jumpToScene(i)}
            className={`h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
              i === sceneIndex ? 'w-6 bg-neutral-900' : 'w-1.5 bg-neutral-300 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>

      {/* First-visit hint */}
      {hintVisible && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 text-[11px] uppercase tracking-[0.2em] text-neutral-400 animate-fade-in pointer-events-none whitespace-nowrap">
          Tap or press → to continue
        </div>
      )}
    </div>
  );
};
