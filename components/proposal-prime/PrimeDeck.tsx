import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Proposal, Scene } from '../../data/proposals/prime-group.types';
import { SceneScrollArea } from '../proposal/SceneScrollArea';
import { PrimeLogo } from './PrimeLogo';
import { HeroSceneView } from './scenes/HeroScene';
import { StatementSceneView } from './scenes/StatementScene';
import { StatGridSceneView } from './scenes/StatGridScene';
import { FeatureGridSceneView } from './scenes/FeatureGridScene';
import { ScreenshotGridSceneView } from './scenes/ScreenshotGridScene';
import { SpotlightShotSceneView } from './scenes/SpotlightShotScene';
import { MediaCompareSceneView } from './scenes/MediaCompareScene';
import { DonutChartSceneView } from './scenes/DonutChartScene';
import { FlowStepsSceneView } from './scenes/FlowStepsScene';
import { BarRatioSceneView } from './scenes/BarRatioScene';
import { TileStatSceneView } from './scenes/TileStatScene';
import { DiagramCompareSceneView } from './scenes/DiagramCompareScene';
import { BeforeAfterSceneView } from './scenes/BeforeAfterScene';
import { PhoneMockSceneView } from './scenes/PhoneMockScene';
import { LogoChaosSceneView } from './scenes/LogoChaosScene';
import { PortraitNoteSceneView } from './scenes/PortraitNoteScene';
import { LayerStackSceneView } from './scenes/LayerStackScene';
import { ChecklistBoardSceneView } from './scenes/ChecklistBoardScene';
import { CompareTableSceneView } from './scenes/CompareTableScene';
import { PathCompareSceneView } from './scenes/PathCompareScene';
import { RolloutTimelineSceneView } from './scenes/RolloutTimelineScene';
import { NetworkDiagramSceneView } from './scenes/NetworkDiagramScene';
import { TierListSceneView } from './scenes/TierListScene';
import { DashboardMockSceneView } from './scenes/DashboardMockScene';
import { PricingBreakdownSceneView } from './scenes/PricingBreakdownScene';
import { StepChartSceneView } from './scenes/StepChartScene';

function renderScene(scene: Scene, revealCount: number) {
  switch (scene.type) {
    case 'hero':
      return <HeroSceneView scene={scene} revealCount={revealCount} />;
    case 'statement':
      return <StatementSceneView scene={scene} revealCount={revealCount} />;
    case 'statGrid':
      return <StatGridSceneView scene={scene} revealCount={revealCount} />;
    case 'featureGrid':
      return <FeatureGridSceneView scene={scene} revealCount={revealCount} />;
    case 'screenshotGrid':
      return <ScreenshotGridSceneView scene={scene} revealCount={revealCount} />;
    case 'spotlightShot':
      return <SpotlightShotSceneView scene={scene} revealCount={revealCount} />;
    case 'mediaCompare':
      return <MediaCompareSceneView scene={scene} revealCount={revealCount} />;
    case 'donutChart':
      return <DonutChartSceneView scene={scene} revealCount={revealCount} />;
    case 'flowSteps':
      return <FlowStepsSceneView scene={scene} revealCount={revealCount} />;
    case 'barRatio':
      return <BarRatioSceneView scene={scene} revealCount={revealCount} />;
    case 'tileStat':
      return <TileStatSceneView scene={scene} revealCount={revealCount} />;
    case 'diagramCompare':
      return <DiagramCompareSceneView scene={scene} revealCount={revealCount} />;
    case 'beforeAfter':
      return <BeforeAfterSceneView scene={scene} revealCount={revealCount} />;
    case 'phoneMock':
      return <PhoneMockSceneView scene={scene} revealCount={revealCount} />;
    case 'logoChaos':
      return <LogoChaosSceneView scene={scene} revealCount={revealCount} />;
    case 'portraitNote':
      return <PortraitNoteSceneView scene={scene} revealCount={revealCount} />;
    case 'layerStack':
      return <LayerStackSceneView scene={scene} revealCount={revealCount} />;
    case 'checklistBoard':
      return <ChecklistBoardSceneView scene={scene} revealCount={revealCount} />;
    case 'compareTable':
      return <CompareTableSceneView scene={scene} revealCount={revealCount} />;
    case 'pathCompare':
      return <PathCompareSceneView scene={scene} revealCount={revealCount} />;
    case 'rolloutTimeline':
      return <RolloutTimelineSceneView scene={scene} revealCount={revealCount} />;
    case 'networkDiagram':
      return <NetworkDiagramSceneView scene={scene} revealCount={revealCount} />;
    case 'tierList':
      return <TierListSceneView scene={scene} revealCount={revealCount} />;
    case 'dashboardMock':
      return <DashboardMockSceneView scene={scene} revealCount={revealCount} />;
    case 'pricingBreakdown':
      return <PricingBreakdownSceneView scene={scene} revealCount={revealCount} />;
    case 'stepChart':
      return <StepChartSceneView scene={scene} revealCount={revealCount} />;
  }
}

const TRANSITION_MS = 380;
const TRAIL_DELAYS = [340, 400, 470, 550, 640];

type TransitionPhase = 'idle' | 'leaving' | 'entering';

export const PrimeDeck: React.FC<{ proposal: Proposal }> = ({ proposal }) => {
  const { scenes } = proposal;
  const [sceneIndex, setSceneIndex] = useState(0);
  const [beatIndex, setBeatIndex] = useState(1);
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
      className="pg-root relative h-[100dvh] w-full overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Ambient background — barely-there, two corners only */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(200,150,62,0.10), transparent 70%)', animation: 'pg-drift1 24s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(200,150,62,0.07), transparent 70%)', animation: 'pg-drift2 28s ease-in-out infinite' }}
        />
      </div>

      {/* Corner mark — present every scene, this is the one place branding shows */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-2.5 opacity-90">
        <img src="/logo.png" alt="Marketingverse" className="h-5 md:h-6 w-auto" style={{ filter: 'invert(1) brightness(1.6)' }} />
        <div className="h-4 w-px" style={{ background: 'var(--pg-border)' }} />
        <PrimeLogo size="sm" />
      </div>

      {/* Progress line */}
      <div
        className="absolute top-0 left-0 h-[3px] transition-all duration-300 z-30"
        style={{ width: `${progressPct}%`, background: 'var(--pg-accent)' }}
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

      {TRAIL_DELAYS.map((ms) => (
        <span
          key={`trail-l-${ms}`}
          className="pg-nav-trail-dot pg-nav-trail-left hidden md:block z-20"
          style={{ animationDelay: `${ms}ms` }}
        />
      ))}
      <button
        aria-label="Previous"
        onClick={retreat}
        disabled={atFirstScene && beatIndex <= 1}
        className="pg-nav-intro-left hidden md:flex items-center justify-center absolute left-3 top-1/2 z-20 w-11 h-11 rounded-full pg-panel transition-opacity disabled:opacity-0"
        style={{ color: 'var(--pg-text)' }}
      >
        <ChevronLeft size={20} />
      </button>
      {TRAIL_DELAYS.map((ms) => (
        <span
          key={`trail-r-${ms}`}
          className="pg-nav-trail-dot pg-nav-trail-right hidden md:block z-20"
          style={{ animationDelay: `${ms}ms` }}
        />
      ))}
      <button
        aria-label="Next"
        onClick={advance}
        disabled={atLastScene && atSceneEnd}
        className="pg-nav-intro-right hidden md:flex items-center justify-center absolute right-3 top-1/2 z-20 w-11 h-11 rounded-full pg-panel transition-opacity disabled:opacity-0"
        style={{ color: 'var(--pg-text)' }}
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
            className="h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
            style={{
              width: i === sceneIndex ? '1.5rem' : '0.375rem',
              background: i === sceneIndex ? 'var(--pg-accent)' : 'rgba(244,241,236,0.22)',
            }}
          />
        ))}
      </div>

      {/* First-visit hint */}
      {hintVisible && (
        <div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 text-[11px] uppercase tracking-[0.2em] animate-fade-in pointer-events-none whitespace-nowrap"
          style={{ color: 'var(--pg-text-dimmer)' }}
        >
          Tap or press → to continue
        </div>
      )}
    </div>
  );
};
