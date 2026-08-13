# Interactive Proposal App — Saaga Wealth (Design Spec)

**Date:** 2026-08-13
**Status:** Approved for planning

## Purpose

Marketingverse wants client sales proposals delivered as interactive, step-through
experiences instead of static decks or documents — more engaging, more "show don't
tell," and consistent with the brand. Saaga Wealth is the first client proposal to
build. This spec covers both the reusable proposal system and the specific content
for the Saaga instance.

Source content: `Saaga_Interactive_Proposal_Content.md` (scene-by-scene content spec)
and `Saaga_Implementation_Proposal.docx` (source Word proposal — content matches the
md spec; both were reviewed and reconciled during design).

## Goals

- Build a reusable "Proposal Deck" system: the shell/navigation/scene-type components
  are generic; a specific client proposal is a content file. The next client proposal
  should mostly be a data file + a two-line HTML/TSX entry, not a rebuild.
- Ship the Saaga proposal as the first, fully-content-complete instance.
- Use Marketingverse's real, existing brand system — not a new or Saaga-flavored one.
  This is Marketingverse's pitch, not a preview of Saaga's future brand.
- Client-driven pacing: information reveals as the viewer actively moves through the
  proposal, not passively auto-playing.

## Non-goals (explicitly out of scope for this build)

- No working AI concierge/chat embedded in the proposal — Scene 6 (Phase 1B) describes
  it as content only (with a static, clearly-illustrative mockup), not a live LLM demo.
- No working "hidden cost" calculator — illustrated/mocked only, same reasoning.
- No brand mood-board / palette-swatch "what Saaga's brand could feel like" moment
  anywhere in the deck, including in the Phase 0 Brand Identity section — stays
  text-only, per explicit client instruction.
- No EN/ES language toggle for v1. (Saaga's own future site/app are bilingual per the
  proposal's scope — the proposal document itself doesn't need to demonstrate that.)
- No per-client theming system. `ProposalDeck` takes content, not a theme. If a future
  proposal needs different visual treatment, that's a deliberate extension then, not
  speculative now.
- No backend, no database, no lead-capture form. Fully static, client-side only —
  same operating model as the existing `avanti-way` page.

## Architecture

Builds inside the existing `Marketingverse-Home` repo (React 18 + TypeScript + Vite 5
+ Tailwind 3), following the precedent already established by `avanti-way.html` /
`avanti-way.tsx`: a client-specific page as its own Vite multi-page entry, sharing the
site's real brand system (fonts, Tailwind config, shared components), rather than a
new repo or a new stack.

```
Marketingverse-Home/
  saaga.html                    New HTML entry: noindex, own <title>/OG tags,
                                 same font-preload pattern as index.html
                                 (Geist + Instrument Serif via Google Fonts).
  saaga.tsx                     Mounts <ProposalDeck scenes={saagaProposal} />.

  components/proposal/
    ProposalDeck.tsx            Shell: { sceneIndex, beatIndex } state machine,
                                 keyboard (←/→), tap/click forward zone + chevron,
                                 touch swipe, progress dots (15, click-to-jump),
                                 thin gradient progress line, scene transition
                                 (crossfade + slide, matching RevealOnScroll easing).
    scenes/
      HeroScene.tsx
      RichTextScene.tsx         Overview / Terms — prose + ticking checklist beats.
      PipelineTableScene.tsx    8-row table, staggered multi-row beats.
      PhaseScene.tsx            Timeframe badge + grouped glass-card sub-sections,
                                 used for Phases 0-4 (6 scenes).
      CardGridScene.tsx         Add-ons, 3 cards.
      TimelineScene.tsx         Horizontal Gantt-style bar, 6 segments draw in.
      InvestmentScene.tsx       Big numbers count up on beat entry.
      ChecklistScene.tsx        Checkmarks tick in, grouped by section.
      CTAScene.tsx               Headline + 3-step + booking button.

  data/proposals/
    types.ts                    Discriminated-union Scene type (one variant per
                                 scene type above), each carrying its own beats array.
    saaga.ts                    The 15 Saaga scenes as typed data.
```

`ProposalDeck` has no knowledge of Saaga-specific content — it renders whatever scene
array it receives via a `type` switch. A second client proposal is:
`data/proposals/<client>.ts` (content) + `<client>.html`/`<client>.tsx` (two-line
entry reusing `ProposalDeck`) + one `vercel.json` rewrite line + one `vite.config.ts`
build-input line.

## Visual system (pulled from the real site, not invented)

- **Body font:** Geist. **Accent/headline font:** Instrument Serif italic
  (`font-serif italic`), the same treatment used for "verse" in the main site's
  wordmark and headline emphasis ("Too Powerful to Ignore.", etc.). Loaded via the
  same Google Fonts preload pattern as `index.html`.
- **Color system:** the site's existing neutral scale + indigo/violet/sky gradient
  accents (`from-indigo-500 via-violet-500 to-sky-400` progress bar, `mv-shimmer`
  gradient text, `from-violet-400 to-purple-600` accents). No new palette.
- **Surfaces:** `mv-glass` glassmorphism cards, `mv-lift` hover-lift, blob-drift
  background (`mv-drift1/2/3`) reused from `index.css` for the hero and ambient
  background — not Saaga-specific imagery (no Saaga photography/assets exist yet;
  those come out of Discovery, which is itself one of the things being pitched).
- **Icons:** `lucide-react`, already a project dependency.
- **Motion:** `RevealOnScroll`'s IntersectionObserver + fade/translate/blur pattern is
  the base primitive scene content beats reuse for their reveal-in animation. Full
  scene transitions are a crossfade + slight vertical slide.

## Interaction model — client-driven reveal

Each scene owns an ordered list of **beats** (see the scene → beat table below).
`ProposalDeck` state is `{ sceneIndex, beatIndex }`:

- Forward (→ / tap / swipe-left / forward chevron): reveals the current scene's next
  beat. When beats are exhausted, the next forward action transitions to the next
  scene (`beatIndex` resets to 0).
- Back (← / swipe-right / back chevron): reverses the same path — hides the last
  revealed beat, or steps back into the previous scene's final beat.
- Progress dots (15, one per scene) are always clickable to jump directly to a scene.
  Jumping via a dot reveals that scene's beats fully (all shown at once) rather than
  resetting to beat 0 — dot navigation means "go review this section," not "step
  through it again from scratch."
- A first-visit hint ("tap or press → to continue") shows once and fades after the
  first interaction, stored in a `useState` (not persisted — reappears on reload,
  which is fine for a low-frequency, per-viewing document).

Beat granularity is a judgment call made per scene type, favoring natural content
chunks (a phase's week, a table's row-group, a checklist's section) over
single-item beats — enough that the client is actively driving the reveal, not so
granular that advancing becomes tedious. The table below is the source of truth.

### Scene → type → beats

| # | Scene | Type | Beats |
|---|---|---|---|
| 1 | Title / Hero | Hero | eyebrow → headline → subhead → footer |
| 2 | Why This Plan, and In This Order | RichText | intro paragraph → "in this order" paragraph → what's-included list (ticking in) |
| 3 | How This Fills Your Pipeline | PipelineTable | headline → 8 rows in 2-3 row groups → closing line |
| 4 | Phase 0, Discovery & Strategic Foundation | Phase | intro → Week 1 → Week 2 → Brand Identity/Message/Tone/Narrative callout → deliverable |
| 5 | Phase 1A, Website with an AI Concierge | Phase | intro → Design → AI Concierge → Build & Launch → deliverable |
| 6 | Phase 1B, Interactive AI Sales Presentation | Phase | intro → What It Does (illustrated-only calculator + concierge mockups) → Build → deliverable |
| 7 | Phase 2, Podcast & Video Content Production | Phase | intro → Pre-Production → Production Day → Post-Production → deliverable |
| 8 | Phase 3, Launch | Phase | intro → 5-item launch checklist (ticking in) → deliverable |
| 9 | Phase 4, Ongoing Growth Partnership | Phase | intro → Monthly → Quarterly → Twice a Year → deliverable |
| 10 | Recommended Add-Ons | CardGrid | 3 cards, one per beat |
| 11 | Timeline, the Full Arc at a Glance | Timeline | intro → 6 phase segments draw in left-to-right |
| 12 | Investment Summary | Investment | $42,000 counts up + build scope list → $4,000/mo + partnership scope list → $5,800/shoot line |
| 13 | Everything In This Package | Checklist | Build items → Partnership items → Also Included → Recommended For Later |
| 14 | Payment Schedule & Terms | RichText | Build Phase schedule → Growth Partnership terms → Notes |
| 15 | Let's Get Started (Close / CTA) | CTA | headline → 3-step "how we start" → CTA button |

All content is taken verbatim (or lightly adapted for on-screen brevity where the
source is a full paragraph, e.g. table cell text) from the reconciled proposal
content — nothing summarized away, nothing added.

## Navigation, access, deploy

- **Route:** `the-marketingverse.com/saaga`. New `saaga.html` + `saaga.tsx`, added to
  `vite.config.ts`'s `rollupOptions.input` and to `vercel.json`'s rewrite exclusion
  list, matching how `avanti-way` was added.
- **Access:** unlisted + `<meta name="robots" content="noindex">`. No login. Shared
  only via direct link (email).
- **CTA target:** `https://api.leadconnectorhq.com/widget/bookings/ricardo`.
- **Responsive:** desktop and mobile both supported (touch swipe + tap zones);
  content and motion should degrade gracefully on mobile (no pinned-scroll tricks
  that fight the step-through model).
- **Build safety:** run `npm run build` locally before pushing, since Vite's
  multi-page build compiles all entries together — a break in the new entry could
  otherwise fail the whole site's build.

## Testing / verification approach

- `npm run build` succeeds with the new entry included.
- `tsc --noEmit` (the repo's existing `type-check`/`lint` script) passes.
- Manual pass through all 15 scenes and their beats via keyboard, click, and touch
  emulation, forward and backward, plus dot-jumping, in a local `vite` dev server.
- Visual check against the real site/`avanti-way` for font, color, and glass/lift
  consistency.

## Open questions / risks carried into planning

None outstanding — all forks raised during design were resolved with the client:
reusable system (yes), repo (Marketingverse-Home), format (step-through with
beat-level reveal), access (unlisted/noindex), calculator/concierge (illustrated
only), mood-board moment (excluded), language (English-only v1), CTA link (provided).
