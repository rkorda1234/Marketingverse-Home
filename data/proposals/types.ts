// Shared content model for the interactive Proposal Deck system.
//
// Every scene owns an ordered `beats` array. `ProposalDeck` only ever needs
// `scenes[i].beats.length` and `scenes[i].type` — it has no per-client knowledge.
// Each scene component renders `beats.slice(0, revealCount)` and knows how to
// draw its own beat shapes.

export interface HeroBeat {
  kind: 'eyebrow' | 'headline' | 'subhead' | 'footer';
  text: string;
}

export interface HeroScene {
  id: string;
  type: 'hero';
  beats: HeroBeat[];
}

// RichText: used for prose scenes (Overview, Terms) where each beat is a
// heading + paragraphs + an optional list (rendered as a ticking checklist).
export interface RichTextBeat {
  heading?: string;
  paragraphs?: string[];
  list?: { text: string }[];
  listStyle?: 'check' | 'bullet';
}

export interface RichTextScene {
  id: string;
  type: 'richText';
  eyebrow: string;
  title: string;
  beats: RichTextBeat[];
}

// PipelineTable: a headline beat, N row-group beats, a closing-line beat.
export interface PipelineRow {
  asset: string;
  job: string;
}

export type PipelineTableBeat =
  | { kind: 'headline'; text: string }
  | { kind: 'rows'; rows: PipelineRow[] }
  | { kind: 'closing'; text: string };

export interface PipelineTableScene {
  id: string;
  type: 'pipelineTable';
  eyebrow: string;
  title: string;
  beats: PipelineTableBeat[];
}

// Phase: persistent chrome (eyebrow/title/timeframe), then beats for intro,
// labeled sections (each with its own item list), and the closing deliverable.
export type PhaseBeat =
  | { kind: 'intro'; text: string }
  | { kind: 'section'; heading: string; items: string[]; note?: string }
  | { kind: 'deliverable'; text: string };

export interface PhaseScene {
  id: string;
  type: 'phase';
  eyebrow: string;
  title: string;
  timeframe: string;
  beats: PhaseBeat[];
}

// CardGrid: one card revealed per beat.
export interface CardGridCard {
  title: string;
  body: string;
  meta?: string;
}

export interface CardGridScene {
  id: string;
  type: 'cardGrid';
  eyebrow: string;
  title: string;
  intro?: string;
  beats: CardGridCard[];
}

// Timeline: an intro beat, then one beat that draws in all segments.
export interface TimelineSegment {
  phase: string;
  timeframe: string;
  milestone: string;
}

export type TimelineBeat =
  | { kind: 'intro'; text: string }
  | { kind: 'segments'; segments: TimelineSegment[] };

export interface TimelineScene {
  id: string;
  type: 'timeline';
  eyebrow: string;
  title: string;
  beats: TimelineBeat[];
}

// Investment: big numbers that count up, each with a supporting scope list.
export type InvestmentBeat =
  | { kind: 'number'; amount: number; prefix?: string; suffix?: string; label: string; items: string[] }
  | { kind: 'line'; text: string };

export interface InvestmentScene {
  id: string;
  type: 'investment';
  eyebrow: string;
  title: string;
  intro?: string;
  beats: InvestmentBeat[];
}

// Checklist: grouped checkmark items, one group per beat.
export interface ChecklistBeat {
  heading: string;
  items: string[];
  variant: 'included' | 'recommended';
}

export interface ChecklistScene {
  id: string;
  type: 'checklist';
  eyebrow: string;
  title: string;
  intro?: string;
  beats: ChecklistBeat[];
}

// CTA: headline, a 3-step beat, then the button beat.
export type CTABeat =
  | { kind: 'headline'; text: string }
  | { kind: 'steps'; steps: { title: string; text: string }[] }
  | { kind: 'button'; label: string; url: string };

export interface CTAScene {
  id: string;
  type: 'cta';
  beats: CTABeat[];
}

// About: who's building this — location, work to look at, past-client
// wordmarks, and the team. One beat per sub-topic.
export type AboutBeat =
  | { kind: 'location'; heading: string; text: string }
  | { kind: 'previews'; heading: string; text?: string; links: { label: string; url: string }[] }
  | { kind: 'logos'; heading: string; text?: string; logos: { name: string; subtitle?: string }[] }
  | { kind: 'team'; heading: string; members: { name: string; role: string; photo: string }[] };

export interface AboutScene {
  id: string;
  type: 'about';
  eyebrow: string;
  title: string;
  beats: AboutBeat[];
}

export type Scene =
  | HeroScene
  | RichTextScene
  | PipelineTableScene
  | PhaseScene
  | CardGridScene
  | TimelineScene
  | InvestmentScene
  | ChecklistScene
  | AboutScene
  | CTAScene;

export interface ProposalMeta {
  client: string;
  title: string;
}

export interface Proposal {
  meta: ProposalMeta;
  scenes: Scene[];
}
