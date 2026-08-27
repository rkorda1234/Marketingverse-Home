// Content model for the Prime Group proposal deck.
//
// This is a deliberately separate vocabulary from data/proposals/types.ts
// (the Saaga-style system). That system is light/Geist/indigo-violet-sky and
// content-only by design; this deck runs a bespoke dark/amber editorial look
// per its own build brief, so it gets its own scene shapes rather than
// bending the shared ones. The *architecture* (beats, one-scene-at-a-time,
// step-through nav) is still the same idea — see components/proposal-prime/.
//
// Every scene owns an ordered `beats` array; PrimeDeck only needs
// `scenes[i].beats.length` and `scenes[i].type`.

export type Align = 'left' | 'center';

// 1. Hero — the open. Each line is its own beat for bookend drama.
export type HeroBeat = { kind: 'eyebrow' | 'headline' | 'sub' | 'mark'; text: string };
export interface HeroScene {
  id: string;
  type: 'hero';
  beats: HeroBeat[];
}

// 2. Statement — one big line, centered or left. Used for the thesis slide,
// the big idea slide, the "you told us" slide, and the close.
export type StatementBeat = { kind: 'eyebrow' | 'line' | 'sub' | 'meta'; text: string };
export interface StatementScene {
  id: string;
  type: 'statement';
  align: Align;
  beats: StatementBeat[];
}

// 3. StatGrid — count-up stat tiles with a closing line.
export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
}
export type StatGridBeat = { kind: 'stats'; stats: Stat[] } | { kind: 'line'; text: string };
export interface StatGridScene {
  id: string;
  type: 'statGrid';
  eyebrow?: string;
  title?: string;
  sub?: string;
  align?: Align;
  beats: StatGridBeat[];
}

// 4. FeatureGrid — cards, one revealed per beat.
export interface FeatureCard {
  title: string;
  body: string;
  meta?: string;
}
export interface FeatureGridScene {
  id: string;
  type: 'featureGrid';
  eyebrow?: string;
  title: string;
  sub?: string;
  variant?: 'clean' | 'sketchy';
  beats: FeatureCard[];
}

// 5. ScreenshotGrid — annotated placeholder screenshot frames. Most shots
// flag a problem (red annotation); `tone: 'neutral'` is for a shot that's
// just illustrating a sequence, not calling out an issue. An optional
// trailing `items` beat adds a follow-up checklist below the grid.
export type ScreenshotGridBeat =
  | { kind: 'shot'; label: string; annotation: string; tone?: 'problem' | 'neutral' }
  | { kind: 'items'; items: string[] };
export interface ScreenshotGridScene {
  id: string;
  type: 'screenshotGrid';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: ScreenshotGridBeat[];
}

// 6. SpotlightShot — one big screenshot placeholder + a small timeline.
export type SpotlightBeat =
  | { kind: 'shot'; caption: string }
  | { kind: 'timeline'; steps: { time: string; text: string }[] };
export interface SpotlightShotScene {
  id: string;
  type: 'spotlightShot';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: SpotlightBeat[];
}

// 7. MediaCompare — two labeled columns of placeholder shot cards.
export interface MediaCompareBeat {
  label: string;
  shots: { caption: string }[];
}
export interface MediaCompareScene {
  id: string;
  type: 'mediaCompare';
  eyebrow?: string;
  title: string;
  beats: MediaCompareBeat[];
}

// 8. DonutChart — one donut per beat, direct-labeled segments, no legend.
export interface DonutSegment {
  label: string;
  value: number;
  pct: number;
  highlight?: boolean;
}
export type DonutBeat =
  | { kind: 'donut'; label: string; totalValue: number; totalPrefix?: string; segments: DonutSegment[] }
  | { kind: 'line'; text: string };
export interface DonutChartScene {
  id: string;
  type: 'donutChart';
  eyebrow?: string;
  title: string;
  beats: DonutBeat[];
}

// 8b. FlowSteps — a horizontal step chain with an optional note under one step.
export type FlowStepsBeat = { kind: 'steps'; steps: { label: string; note?: string }[] };
export interface FlowStepsScene {
  id: string;
  type: 'flowSteps';
  eyebrow?: string;
  title: string;
  beats: FlowStepsBeat[];
}

// 9. BarRatio — a small set of paired bars with a ratio badge.
export interface BarItem {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  highlight?: boolean;
}
export type BarRatioBeat = { kind: 'bars'; items: BarItem[]; ratio?: string } | { kind: 'line'; text: string };
export interface BarRatioScene {
  id: string;
  type: 'barRatio';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: BarRatioBeat[];
}

// 10. TileStat — a grid of small tiles plus one contrasting callout number.
export interface Tile {
  label: string;
  value: string;
}
export type TileStatBeat =
  | { kind: 'tiles'; tiles: Tile[] }
  | { kind: 'callout'; value: number; prefix?: string; suffix?: string; decimals?: number; label: string; context: string };
export interface TileStatScene {
  id: string;
  type: 'tileStat';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: TileStatBeat[];
}

// 11. DiagramCompare — two labeled block-shape diagrams side by side.
export interface DiagramItem {
  heading: string;
  body: string;
  shape: 'thin' | 'wide';
}
export type DiagramCompareBeat = { kind: 'pair'; items: DiagramItem[] } | { kind: 'line'; text: string };
export interface DiagramCompareScene {
  id: string;
  type: 'diagramCompare';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: DiagramCompareBeat[];
}

// 13. PhoneMock — a phone frame with labeled chat threads.
export interface PhoneThread {
  label: string;
  preview: string;
}
export interface PhoneMockScene {
  id: string;
  type: 'phoneMock';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: PhoneThread[];
}

// 14. LogoChaos — scattered, deliberately mismatched logo chips.
export type LogoChaosBeat = { kind: 'logos'; names: string[] };
export interface LogoChaosScene {
  id: string;
  type: 'logoChaos';
  eyebrow?: string;
  title: string;
  beats: LogoChaosBeat[];
}

// 15. PortraitNote — a portrait placeholder + a short note.
export type PortraitBeat = { kind: 'portrait'; initials: string; caption: string } | { kind: 'note'; text: string };
export interface PortraitNoteScene {
  id: string;
  type: 'portraitNote';
  eyebrow?: string;
  title: string;
  beats: PortraitBeat[];
}

// 16. LayerStack — vertically stacked labeled layers.
export type LayerBeat = { label: string; heading: string; body: string };
export interface LayerStackScene {
  id: string;
  type: 'layerStack';
  eyebrow?: string;
  title: string;
  beats: LayerBeat[];
}

// 17. ChecklistBoard — one grouped, staggered ticklist.
export type ChecklistBoardBeat = { kind: 'items'; items: string[] };
export interface ChecklistBoardScene {
  id: string;
  type: 'checklistBoard';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: ChecklistBoardBeat[];
}

// 18. CompareTable — a small "now vs. with us" row table.
export interface CompareRow {
  label: string;
  now: string;
  withUs: string;
  highlight?: boolean;
}
export type CompareTableBeat = { kind: 'rows'; rows: CompareRow[] } | { kind: 'line'; text: string };
export interface CompareTableScene {
  id: string;
  type: 'compareTable';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: CompareTableBeat[];
}

// 19. PathCompare — named paths, each with a short list of consequences.
// tone 'neutral' is for two columns being contrasted without one being the
// "right" answer (e.g. "who books it" vs "who reaches them first").
export type PathBeat = { label: string; points: string[]; tone: 'warn' | 'good' | 'neutral' };
export interface PathCompareScene {
  id: string;
  type: 'pathCompare';
  eyebrow?: string;
  title: string;
  sub?: string;
  note?: string;
  beats: PathBeat[];
}

// 20. RolloutTimeline — a sequence list, then a rollout intensity bar.
export type RolloutBeat =
  | { kind: 'sequence'; items: { label: string; detail: string }[] }
  | { kind: 'bar'; segments: { label: string }[] };
export interface RolloutTimelineScene {
  id: string;
  type: 'rolloutTimeline';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: RolloutBeat[];
}

// 21. NetworkDiagram — hub-and-spoke.
export type NetworkBeat =
  | { kind: 'hub'; label: string }
  | { kind: 'spokes'; groups: { label: string; items: string[] }[] };
export interface NetworkDiagramScene {
  id: string;
  type: 'networkDiagram';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: NetworkBeat[];
}

// 22. TierList — labeled tiers, then a two-group split note.
export type TierBeat =
  | { kind: 'tier'; label: string; heading: string; body: string }
  | { kind: 'split'; groups: { label: string; venues: string; metric: string }[] };
export interface TierListScene {
  id: string;
  type: 'tierList';
  eyebrow?: string;
  title: string;
  beats: TierBeat[];
}

// 23. DashboardMock — the one fully custom-built mock UI. Single beat.
export interface DashboardVenue {
  name: string;
  covers: string;
  reservations: string;
  deliveryOrders: string;
  reviews: string;
  ratingTrend: string;
  gbpActions: string;
  spend: string;
  returnPerDollar: string;
}
export type DashboardBeat = { kind: 'dashboard'; venues: DashboardVenue[]; updated: string };
export interface DashboardMockScene {
  id: string;
  type: 'dashboardMock';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: DashboardBeat[];
}

// 24. DataTable — a generic small data table. Covers most of the audit's
// verified-numbers slides (sales performance, spend by venue, venue-by-job,
// content rhythm, the creator bench) without a bespoke type for each.
export type DataTableBeat = { kind: 'rows'; rows: string[][] } | { kind: 'line'; text: string };
export interface DataTableScene {
  id: string;
  type: 'dataTable';
  eyebrow?: string;
  title: string;
  sub?: string;
  columns: string[];
  highlightCol?: number;
  beats: DataTableBeat[];
}

// 25. AuditFindings — a "what's working" summary paragraph next to a list
// of specific, fixable issues. Used for the Google-profile honesty slide.
export type AuditFindingsBeat =
  | { kind: 'summary'; heading: string; text: string }
  | { kind: 'issues'; heading: string; items: { lead: string; detail: string }[] };
export interface AuditFindingsScene {
  id: string;
  type: 'auditFindings';
  eyebrow?: string;
  title: string;
  beats: AuditFindingsBeat[];
}

// 26. BarsAndList — a bar comparison (e.g. review counts across venues)
// followed by a short fixable-items list on the same slide.
export type BarsAndListBeat = { kind: 'bars'; items: BarItem[] } | { kind: 'items'; heading?: string; items: string[] };
export interface BarsAndListScene {
  id: string;
  type: 'barsAndList';
  eyebrow?: string;
  title: string;
  sub?: string;
  beats: BarsAndListBeat[];
}

export type Scene =
  | HeroScene
  | StatementScene
  | StatGridScene
  | FeatureGridScene
  | ScreenshotGridScene
  | SpotlightShotScene
  | MediaCompareScene
  | DonutChartScene
  | FlowStepsScene
  | BarRatioScene
  | TileStatScene
  | DiagramCompareScene
  | PhoneMockScene
  | LogoChaosScene
  | PortraitNoteScene
  | LayerStackScene
  | ChecklistBoardScene
  | CompareTableScene
  | PathCompareScene
  | RolloutTimelineScene
  | NetworkDiagramScene
  | TierListScene
  | DashboardMockScene
  | DataTableScene
  | AuditFindingsScene
  | BarsAndListScene;

export interface ProposalMeta {
  client: string;
  title: string;
}

export interface Proposal {
  meta: ProposalMeta;
  scenes: Scene[];
}
