# Marketingverse Proposal Deck — Style & System Guide

A portable reference for reproducing the look, feel, and interaction model of
the Saaga interactive proposal (`/saaga`) for a new client. This covers
**style and architecture only** — no client content. Hand this to a fresh
session along with "build an interactive proposal for [client]" and it should
be able to reproduce the same experience.

> **If you're working inside the `Marketingverse-Home` repo:** the actual
> reusable system already exists at `components/proposal/` and
> `data/proposals/`. Don't rebuild it — copy the pattern used for Saaga: add
> `data/proposals/<client>.ts` (content only) plus a two-file entry
> (`<client>.html` + `<client>.tsx` that mounts `<ProposalDeck proposal={...}
/>`), then wire it into `vite.config.ts`'s build inputs and `vercel.json`'s
> rewrites. Everything below documents what that system already does, for
> anyone rebuilding it elsewhere or from scratch.

## Brand Identity

- **Body font:** Geist (weights 300–800). **Accent font:** Instrument Serif,
  italic, used for headline emphasis and the "verse" treatment in the
  Marketingverse wordmark. Both loaded via Google Fonts with a preload trick:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="preload" as="style"
    href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript><link href="[same URL]" rel="stylesheet" /></noscript>
  ```
  ```css
  body { font-family: 'Geist', ui-sans-serif, system-ui, sans-serif; }
  .font-serif { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-weight: 400; }
  ```
  Usage pattern: plain sans-serif for body copy and structure; drop into
  `font-serif italic font-normal` for the emotional/emphasis word in a
  headline (e.g. *"Financial Hospitality, **Made Visible.**"*, "Too Powerful
  to **Ignore.**"). Not every headline needs it — reserve it for the word
  that should land hardest.

- **Palette:** neutral grayscale base (`#fafafa` background, near-black text)
  with an indigo → violet → sky gradient as the single accent running
  through the whole system. No other brand colors. Exact stops:
  `from-indigo-500 via-violet-500 to-sky-400` (Tailwind), or raw:
  indigo `#6366f1`, violet `#8b5cf6` / `#a855f7`, sky `#38bdf8`.

- **Tone:** confident, editorial, non-generic. Short declarative sentences.
  Headlines get the serif-italic treatment; body copy stays plain and direct.

## Core Visual Primitives (exact CSS)

```css
/* Glass card — the base surface for every card/panel in the deck */
.mv-glass {
  background: rgba(255, 255, 255, 0.66);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 18px 50px -22px rgba(15, 23, 42, 0.28);
}

/* Hover lift — the standard interactive-card affordance */
.mv-lift {
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.mv-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.7) inset, 0 34px 70px -28px rgba(15, 23, 42, 0.4);
}

/* Shimmer text — for the one or two numbers/words that should feel alive */
@keyframes mv-shimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
.mv-shimmer {
  background: linear-gradient(110deg, #111 30%, #6366f1 48%, #a855f7 56%, #111 70%);
  background-size: 220% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: mv-shimmer 7s linear infinite;
}

/* Ambient background blobs — ONE per corner is plenty, never more than 2 */
@keyframes mv-drift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(4vw, 6vh) scale(1.07); }
  66% { transform: translate(-3vw, 3vh) scale(0.95); }
}
/* (mv-drift2, mv-drift3 are the same shape with different vw/vh/scale values,
   used on the opposite corner so the two blobs don't move in sync) */
```
Blob usage: two large (`w-[36rem]`–`w-[40rem]`), heavily blurred
(`blur-3xl`), very low-opacity gradient circles, one anchored past the
top-left corner, one past the bottom-right, each on a 22–26s drift loop.
They should be barely noticeable — ambience, not decoration.

```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```
Used everywhere a container scrolls but shouldn't show a scrollbar (the deck
never shows a visible scrollbar anywhere).

## Structure: Step-Through Deck, Not a Scrolling Page

The proposal is a full-viewport, one-scene-at-a-time deck — not a long
scrolling page. Fixed shell:

- Root container: `h-[100dvh] w-full overflow-hidden bg-[#fafafa]`
- A **thin gradient progress line** pinned to the very top edge
  (`h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400`),
  width driven by overall progress (scene + fractional beat progress within
  it), animated with `transition-all duration-300`.
- **Progress dots** bottom-center, one per scene: active dot is a wide pill
  (`w-6 bg-neutral-900`), inactive dots are small circles
  (`w-1.5 bg-neutral-300`). Clickable to jump straight to any scene.
- **Prev/next chevron buttons**, desktop only, `mv-glass` circles pinned to
  the left/right edges, vertically centered. Disabled (faded to invisible)
  at the very start/end of the deck.
- **Mobile**: no visible chevrons; instead, invisible tap zones on the left
  and right ~25% of the screen (swipe also works, ~40px threshold).
- **Small persistent corner mark**, top-left, present on every scene: your
  own logo + a thin vertical divider + the client's small wordmark. This is
  the one place the client's brand appears throughout; everything else stays
  in your own visual system.

## The Reveal Model: Beats

This is the core interaction idea, and it's what makes the deck feel
interactive rather than just a slideshow. **Every scene owns an ordered list
of "beats."** Advancing (tap, arrow key, swipe) reveals the *next beat within
the current scene* before moving to the next scene at all:

- State is `{ sceneIndex, beatIndex }`.
- Forward: if the current scene has unrevealed beats, reveal the next one.
  Only once the scene is fully revealed does forward move to the next scene
  (landing on its first beat).
- Backward is the exact mirror: step back through beats, and stepping back
  from a scene's first beat lands on the *previous* scene fully revealed
  (not its first beat) — this is what makes back-navigation feel natural
  instead of jarring.
- Jumping via a progress dot reveals that scene's beats **fully** at once
  (dot navigation means "go look at this section," not "replay it").
- Beat granularity is a judgment call: favor natural content chunks (a
  paragraph, a labeled sub-section, a row-group in a table) over
  single-sentence beats. Enough that the viewer is actively driving the
  reveal, not so granular that advancing feels tedious.

Each new beat fades/rises into place (see BeatIn below); already-revealed
beats stay static — nothing re-animates on subsequent advances.

## Motion Specifics (exact values)

**Beat reveal** (`BeatIn` — wraps each beat, and each item within a beat
that should stagger in):
```tsx
// mount-triggered, not scroll-triggered
className: transition-all duration-700 ease-out transform
hidden:  opacity-0 translate-y-6 blur-[2px]
visible: opacity-100 translate-y-0 blur-none
// flips to visible ~20ms + an optional `delay` after mount
```
For a staggered list within one beat (e.g. checklist items, table rows),
give each item `delay={index * 60to90}` (60–90ms works well; slower reads as
sluggish, faster loses the stagger entirely).

**Scene transition** (crossfade + slide, ~380ms):
- Advancing: outgoing scene exits with `opacity-0 -translate-y-6`, incoming
  scene enters from `opacity-0 translate-y-6` down to `opacity-100
translate-y-0`.
- Retreating: directions reverse.
- Implementation needs a real "leaving → entering → idle" 3-phase state
  (not just old/new), with a double-`requestAnimationFrame` between mounting
  the new scene at its hidden state and flipping it visible — otherwise the
  browser batches the change and it never animates in.

**Count-up numbers** (big investment figures): animate 0 → target over
~1400ms using `1 - (1-t)^3` ease-out-cubic, via `requestAnimationFrame`, not
a CSS transition (needs to render each intermediate integer as text).

**"More below" scroll cue**: every scene's content sits in a capped-height
(`max-h-[70dvh] overflow-y-auto`) container. When content overflows and
hasn't been scrolled to the bottom, a small bouncing chevron appears
**below the scroll box, in normal document flow** — never as an overlay on
top of the content, which would obscure real text. Also auto-scrolls the
newly-revealed beat into view on each advance (skip this on a scene's very
first beat — it's already at the top from the fresh mount).

**First-visit / discoverability cue**: on load, the prev/next arrows aren't
obviously clickable, so give them a one-time, unmistakable intro: slide in
from ~240px toward center → their resting position at the margin, ~1.3s,
`cubic-bezier(0.34, 1.56, 0.64, 1)` (a slight overshoot-and-settle "pop"),
plus a brief violet glow (`drop-shadow`) that fades by the time it lands. A
sparse particle trail (4–5 small radial-gradient dots, staggered ~60–70ms
apart, following the same path but fading out before arrival) makes the
motion read as unmistakable rather than a quick fade — worth doing if the
nav mechanism needs to be self-evident without instructions. Also show a
plain text hint ("Tap or press → to continue") until first interaction.

## Scene Types (the reusable vocabulary)

Nine scene shapes cover essentially any proposal:

1. **Hero** — eyebrow → headline (serif-italic) → subhead → optional client
   logo → footer, each its own beat (bookend scenes get full beat-by-beat
   drama; interior scenes don't need this).
2. **RichText** — prose + an optional ticking checklist. For overview/terms-
   style content.
3. **PipelineTable** — headline beat → row-group beats → closing line. Rows
   render as a single continuous `mv-glass` card with `divide-y` separators.
4. **Phase/Step** — persistent chrome (eyebrow + a small pill timeframe
   badge + title) with beats for an intro paragraph, then labeled sections
   (heading + checklist items, each its own `mv-glass mv-lift` card).
5. **CardGrid** — 3-column grid, one card revealed per beat. For add-ons,
   future-possibilities teasers, anything enumerable.
6. **Timeline** — intro beat, then all segments draw in together: a
   horizontal line with a `scaleX` reveal (`transform-origin: left`,
   animated via a mounted-state flag, not a raw CSS keyframe, to avoid
   fighting Tailwind's own transform utilities) and a dot + label per phase.
7. **Investment** — the one or two big numbers, count-up, each with its own
   supporting scope list below it in the same card. Keep the number
   moderately sized (`text-2xl`–`text-3xl` reads better than going huge —
   an oversized price number reads as pushy, not confident).
8. **Checklist** — grouped checkmark items. Support two visual variants:
   solid gradient check-circle for "included," an outlined circle with a
   small "+" for "recommended/future" — never present unbuilt items with the
   same visual weight as committed ones.
9. **CTA** — headline beat → a 3-step "how we start" grid → one real button
   linking to an actual booking URL.

All nine are content-driven (a TypeScript discriminated union works well:
`{ type: 'hero' | 'richText' | ... }`), so the shell component never needs
to know about any particular client's content — only `type` and `beats`.

## What NOT to Do

- Don't give the client's own brand more than a small corner mark plus one
  hero placement, unless the piece is explicitly about their future brand
  (and even then, label it illustrative). This is *your* pitch — it should
  look like your work, not a preview of theirs.
- Don't animate a big number without a clear reason — reserve
  count-up/shimmer for the 1–2 numbers that are actually the point.
- Don't let a "more content below" cue overlap real text — move it outside
  the scroll box, not on top of it.
- Don't reveal an entire dense scene at once if it's more than ~3 short
  chunks — split it into beats so the viewer is driving, not being talked at.
