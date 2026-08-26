import type { Proposal } from './prime-group.types';

// Prime Group × Marketingverse — the interactive proposal.
// On-screen content only: the narrative doc's "You say" talk track and
// "Why" notes are the presenter's script, not slide content, so neither
// appears here. Numbers marked exact in the build brief are kept exact;
// everything else (dashboard sample rows, per-venue ad-spend tiles beyond
// Yallah's known figure) is clearly illustrative.

export const primeGroupProposal: Proposal = {
  meta: {
    client: 'Prime Group',
    title: 'Prime Group × Marketingverse — Proposal',
  },
  scenes: [
    // ACT 0 — OPEN
    {
      id: 's1-hero',
      type: 'hero',
      beats: [
        { kind: 'headline', text: 'Prime Group' },
        { kind: 'sub', text: 'A marketing audit nobody asked us for' },
      ],
    },
    {
      id: 's2-what-we-looked-at',
      type: 'statGrid',
      eyebrow: 'ACT 0 — OPEN',
      title: 'What we looked at',
      beats: [
        {
          kind: 'stats',
          stats: [
            { value: 8, label: 'websites' },
            { value: 8, label: 'Instagram accounts' },
            { value: 8, label: 'Google Business Profiles' },
            { value: 40, suffix: '+', label: 'competitor venues' },
            { value: 4, label: 'reference brands you told us you love' },
          ],
        },
      ],
    },
    {
      id: 's3-short-version',
      type: 'statement',
      align: 'center',
      beats: [{ kind: 'line', text: "You're paying for marketing. You're receiving content. Those aren't the same thing." }],
    },

    // ACT 1 — THE MIRROR
    {
      id: 's4-whats-working',
      type: 'featureGrid',
      eyebrow: 'ACT 1 — THE MIRROR',
      title: "First, what's actually working",
      sub: 'Because the product is not your problem',
      beats: [
        { title: '4.9 average rating', body: 'Across the board — the food is landing.' },
        { title: 'Lucky Rabbit', body: '5.0 rating, ranked ~#2 of 303 on TripAdvisor.' },
        {
          title: 'Eight concepts, one group',
          body: "Multiple price points, a butcher, a private chef arm, food tours, cross-redeemable gift cards. Most groups don't have this.",
        },
        { title: 'Awards on the wall', body: 'Best New Restaurant 2025.' },
      ],
    },
    {
      id: 's5-uncomfortable-part',
      type: 'screenshotGrid',
      title: 'Now the uncomfortable part',
      beats: [
        { label: 'Prime Kitchen — "Book a chef now"', annotation: 'White-on-white on hover.' },
        { label: 'Boat catering page', annotation: 'No photos of the food.' },
        { label: 'Lucky Rabbit — phone number', annotation: 'Not clickable.' },
        { label: 'Reservation page', annotation: '"We\'ll respond within 12 hours."' },
        { label: 'Prime Kitchen — gallery', annotation: 'Same two dishes, twice.' },
      ],
    },
    {
      id: 's6-12-hours',
      type: 'spotlightShot',
      title: '"We\'ll respond within 12 hours"',
      sub: 'The most expensive sentence on your website',
      beats: [
        { kind: 'shot', caption: 'Live booking form copy, right now.' },
        {
          kind: 'timeline',
          steps: [
            { time: '8:14 PM', text: 'Guest wants a table tonight' },
            { time: '8:15 PM', text: 'Books somewhere else' },
          ],
        },
      ],
    },
    {
      id: 's7-every-room-empty',
      type: 'mediaCompare',
      title: 'Every room is empty',
      beats: [
        {
          label: 'YOU',
          shots: [{ caption: 'Yallah — empty tables' }, { caption: "Uncle Liu's — plated food" }, { caption: 'Lucky Rabbit — no people' }],
        },
        {
          label: 'THE ONES YOU SENT US',
          shots: [{ caption: 'Bagatelle — packed room' }, { caption: 'Blue Marlin — faces, motion' }, { caption: 'La Guérite — night energy' }],
        },
      ],
    },
    {
      id: 's8-why-empty',
      type: 'statGrid',
      title: 'So why do the rooms look empty?',
      sub: 'Two photoshoots a year. For eight restaurants.',
      beats: [
        { kind: 'stats', stats: [{ value: 2, label: 'photoshoots per year' }] },
        { kind: 'line', text: '8 concepts · 365 nights · roughly one visual refresh every six months.' },
      ],
    },

    // ACT 2 — THE INVERSION
    {
      id: 's9-where-money-goes',
      type: 'donutChart',
      eyebrow: 'ACT 2 — THE INVERSION',
      title: 'Where the money goes',
      beats: [
        {
          kind: 'donut',
          label: 'Annual marketing spend',
          totalValue: 215796,
          totalPrefix: '$',
          segments: [
            { label: 'Agency fee', value: 135600, pct: 63, highlight: true },
            { label: 'Ads', value: 38376, pct: 18 },
            { label: 'Guerrilla', value: 34440, pct: 16 },
            { label: 'Print', value: 7380, pct: 3 },
          ],
        },
      ],
    },
    {
      id: 's10-yallah',
      type: 'barRatio',
      title: 'Yallah',
      sub: '$27,120 in fees. $3,444 in ads.',
      beats: [
        {
          kind: 'bars',
          ratio: '8 : 1',
          items: [
            { label: 'Agency fees', value: 27120, prefix: '$' },
            { label: 'Ad spend', value: 3444, prefix: '$', highlight: true },
          ],
        },
      ],
    },
    {
      id: 's11-per-restaurant',
      type: 'tileStat',
      title: 'Per restaurant, per year, you spend about $4,800 on ads',
      sub: "That's $400 a month to reach an island of 72,000 people and 450,000 visitors",
      beats: [
        {
          kind: 'tiles',
          tiles: [
            { label: 'Prime Kitchen', value: '~$400/mo' },
            { label: "Uncle Liu's", value: '~$400/mo' },
            { label: 'Lucky Rabbit', value: '~$400/mo' },
            { label: 'Coconut Room', value: '~$400/mo' },
            { label: 'Yallah', value: '$3,444/yr' },
            { label: 'San Si Wu', value: '~$400/mo' },
            { label: 'Smash', value: '~$400/mo' },
            { label: 'Boat Catering', value: '~$400/mo' },
          ],
        },
        {
          kind: 'callout',
          value: 450441,
          label: '2025 stayover visitors',
          context: '82% from the US — an island of 72,000 residents, reachable for $400/mo per venue.',
        },
      ],
    },
    {
      id: 's12-not-about-agency',
      type: 'diagramCompare',
      title: "To be clear: this isn't about your agency",
      sub: "It's about the shape of the budget",
      beats: [
        {
          kind: 'pair',
          items: [
            { heading: 'Retainer-shaped budget', body: 'A big block of fee, a thin trickle of media out the bottom.', shape: 'thin' },
            { heading: 'Media-shaped budget', body: 'A smaller block of fee, a wide flow of working media out the bottom.', shape: 'wide' },
          ],
        },
      ],
    },
    {
      id: 's13-good-news',
      type: 'statGrid',
      title: 'The good news',
      sub: "Your budget is the right size. It's just pointed at the wrong things.",
      beats: [
        { kind: 'stats', stats: [{ value: 3.08, suffix: '%', decimals: 2, label: 'of revenue — $215,796 ÷ $7M' }] },
        { kind: 'line', text: 'Healthy restaurant marketing benchmark ≈ 3–6% of revenue.' },
      ],
    },

    // ACT 3 — WHERE DINNER DECISIONS ACTUALLY HAPPEN
    {
      id: 's14-how-someone-picks',
      type: 'flowSteps',
      eyebrow: 'ACT 3 — WHERE DINNER DECISIONS ACTUALLY HAPPEN',
      title: 'How someone actually picks where to eat tonight',
      beats: [
        {
          kind: 'steps',
          steps: [
            { label: 'Concierge / Google Maps' },
            { label: 'Reviews' },
            { label: 'Your Instagram', note: 'This is where nearly all your money goes.' },
            { label: 'Booking' },
          ],
        },
      ],
    },
    {
      id: 's15-ssw-vs-anchor',
      type: 'barRatio',
      title: 'San Si Wu has 41 reviews',
      sub: 'Anchor & Den has about 1,996',
      beats: [
        {
          kind: 'bars',
          items: [
            { label: 'San Si Wu', value: 41, highlight: true },
            { label: 'Anchor & Den', value: 1996 },
          ],
        },
      ],
    },
    {
      id: 's16-already-onto-this',
      type: 'featureGrid',
      title: "You're already onto this",
      sub: "The waiter review system is the right instinct. Let's scale it.",
      beats: [
        { title: 'Track by name', body: 'Parse every new review for staff names. Servers compete on mentions.' },
        { title: 'Ask on WhatsApp, not at the table', body: 'People review from the couch, not the chair.' },
        { title: 'Reward the ask, never the review', body: 'Google penalises incentivised reviews — this keeps the profiles safe.' },
        { title: 'Read them with AI', body: 'Monthly theme report across all 8 venues: service, wait times, dishes, noise.' },
      ],
    },
    {
      id: 's17-google-profiles',
      type: 'beforeAfter',
      title: 'Eight Google profiles, none of them finished',
      beats: [
        {
          kind: 'rows',
          rows: [
            { label: 'Categories' },
            { label: 'Hours' },
            { label: 'Photos' },
            { label: 'Menu' },
            { label: 'Attributes' },
            { label: 'Q&A' },
            { label: 'Posts' },
          ],
        },
      ],
    },
    {
      id: 's18-whatsapp-os',
      type: 'phoneMock',
      title: "WhatsApp is the island's operating system",
      sub: "So let's actually build on it",
      beats: [
        { label: 'Booking', preview: 'Table for 4 tonight at 8? — Yes! Confirmed, see you soon.' },
        { label: 'Review request', preview: 'Thanks for dining with us — mind leaving a quick review?' },
        { label: 'Concierge enquiry', preview: "Ritz concierge: table for 2 at Liu's, 7:30?" },
        { label: 'Loyalty offer', preview: "You've earned a free appetizer at Coconut Room." },
      ],
    },

    // ACT 4 — THE ASSET YOU'RE NOT USING
    {
      id: 's19-eight-strangers',
      type: 'logoChaos',
      eyebrow: "ACT 4 — THE ASSET YOU'RE NOT USING",
      title: 'Right now you\'re running eight strangers',
      beats: [
        {
          kind: 'logos',
          names: ['Prime Kitchen', "Uncle Liu's", 'Lucky Rabbit', 'Coconut Room', 'Yallah', 'San Si Wu', 'Smash', 'Boat Catering'],
        },
      ],
    },
    {
      id: 's20-food-network-chef',
      type: 'portraitNote',
      title: 'You have a Food Network chef and almost nobody knows',
      beats: [
        { kind: 'portrait', initials: 'D', caption: 'Fire Masters · portrait pending' },
        {
          kind: 'note',
          text: "This is the most under-used asset in the group — mentioned nowhere on most venue homepages.",
        },
      ],
    },
    {
      id: 's21-two-layers',
      type: 'layerStack',
      title: 'Two layers',
      beats: [
        {
          label: 'Layer 1',
          heading: 'Dylan is the proof',
          body: 'Credibility, press, the reason to trust a new concept. Advertise it hard, now.',
        },
        {
          label: 'Layer 2',
          heading: 'Prime Group is the asset',
          body: 'The venues, the loyalty base, the reviews, the concierge network. Owned by the company, transferable, still standing if anything changes.',
        },
      ],
    },
    {
      id: 's22-idea-underneath',
      type: 'statement',
      align: 'center',
      beats: [
        { kind: 'line', text: 'People don’t choose a restaurant. They choose the version of the night they want to have.' },
        { kind: 'sub', text: 'The lifestyle you came for. Come live it.' },
      ],
    },

    // ACT 5 — THE PLAN
    {
      id: 's23-days-1-30',
      type: 'checklistBoard',
      eyebrow: 'ACT 5 — THE PLAN',
      title: 'Days 1–30: the floor',
      sub: "Boring, cheap, and it moves money",
      beats: [
        {
          kind: 'items',
          items: [
            '8 Google Business Profiles built properly',
            'Review engine live, baselined, per venue',
            'Website conversion fixes across all sites — clickable phones, real addresses, offers above the fold, no dead buttons',
            'Instagram bios, highlights, pinned posts rebuilt',
            'Awards surfaced everywhere they should be',
          ],
        },
      ],
    },
    {
      id: 's24-content-model',
      type: 'compareTable',
      title: 'The content model',
      sub: '12 shoots a year instead of 2 — plus someone there every week',
      beats: [
        {
          kind: 'rows',
          rows: [
            { label: 'Full production shoots', now: '2/year', withUs: '12/year', highlight: true },
            { label: 'Weekly capture visits', now: '—', withUs: 'Every week, on rotation', highlight: true },
            { label: 'Posts per venue', now: '2–3/wk, inconsistent', withUs: '3/wk, consistent' },
            { label: 'Stories per venue', now: 'ad hoc', withUs: '4/wk' },
            { label: 'Video minimum', now: '—', withUs: '3 of 3 posts' },
            { label: 'People in frame', now: 'rare', withUs: '40% minimum', highlight: true },
          ],
        },
      ],
    },
    {
      id: 's25-all-eight-or-none',
      type: 'pathCompare',
      title: 'All eight, or none',
      sub: "A pilot sounds safer. It's actually more work for you.",
      beats: [
        {
          label: 'Split it',
          tone: 'warn',
          points: [
            'Two agencies, two brand voices, two reporting formats, two invoices',
            'Somebody at Prime refereeing',
            'Group campaigns impossible',
            'Loyalty programme impossible',
            "Your own Restaurant Month impossible",
          ],
        },
        {
          label: 'Move it',
          tone: 'good',
          points: ['One voice, one calendar, one report, one number', 'Everything cross-promotes', 'The group behaves like a group'],
        },
      ],
    },
    {
      id: 's25b-liu-start',
      type: 'rolloutTimeline',
      title: "But Liu's is where we start",
      sub: "You're betting on it. So are we.",
      beats: [
        {
          kind: 'sequence',
          items: [
            { label: 'Heaviest media', detail: "Liu's gets the largest share of spend from day one." },
            { label: 'First show-night', detail: 'The first full production push happens here.' },
            { label: 'First full content system', detail: 'Weekly capture, 12 shoots/year, the whole model — proven here first.' },
            { label: 'First concierge push', detail: 'Hotel concierge network built and tested on this venue.' },
          ],
        },
        {
          kind: 'bar',
          segments: [
            { label: "Liu's — heaviest" },
            { label: 'Lucky + Coconut Room' },
            { label: 'Yallah + SSW + Smash' },
            { label: 'Prime Kitchen network — ongoing' },
          ],
        },
      ],
    },
    {
      id: 's26-where-media-goes',
      type: 'featureGrid',
      title: 'Where the media actually goes',
      sub: 'Small island. Spend accordingly.',
      beats: [
        {
          title: 'In-market geofencing',
          body: 'Seven Mile Beach hotels, condos, the airport. People who are already here and hungry tonight.',
        },
        { title: 'Google Search', body: 'High-intent terms. "Chinese food near me," "private chef Cayman," "boat catering."' },
        { title: 'Local retargeting', body: '72,000 residents. Small pool, so frequency-capped and rotated.' },
        { title: 'Creators', body: 'In a market this size, a local creator with 20k followers is a media buy.' },
      ],
    },
    {
      id: 's27-network',
      type: 'networkDiagram',
      title: "The network nobody's working",
      sub: 'This is where Prime Kitchen gets big',
      beats: [
        { kind: 'hub', label: 'Prime Kitchen' },
        {
          kind: 'spokes',
          groups: [
            { label: 'Hotel concierges', items: ['Ritz', 'Seafire', 'Westin', 'Marriott', 'Palm Heights'] },
            { label: 'Airbnb & villa hosts', items: ['Seven Mile Beach'] },
            { label: 'Villa companies', items: ['Cayman Villas', 'Rental Escapes', 'Isle Blue'] },
            { label: 'Yacht charters', items: ['Cobalt', 'Cayman Luxury', 'Crystal'] },
            { label: 'Travel agents & DMCs', items: ['Inbound tour operators'] },
            { label: 'Corporate', items: ['Law firms', 'Funds', 'Insurers'] },
          ],
        },
      ],
    },

    // ACT 6 — HOW YOU'LL KNOW IT'S WORKING
    {
      id: 's28-never-see-results',
      type: 'statement',
      align: 'left',
      eyebrow: "ACT 6 — HOW YOU'LL KNOW IT'S WORKING",
      beats: [
        { kind: 'line', text: 'You told us you never see campaign results' },
        { kind: 'meta', text: 'Every month, on a call, no exceptions.' },
      ],
    },
    {
      id: 's29-three-tiers',
      type: 'tierList',
      title: 'Three tiers of honesty',
      beats: [
        { kind: 'tier', label: 'Tier 1', heading: 'Hard numbers', body: 'Bookings with a source tag, click ID, or promo code. Provable.' },
        {
          kind: 'tier',
          label: 'Tier 2',
          heading: 'Directional',
          body: 'Google profile actions: calls, direction requests, website taps. Not reservations, but they move together.',
        },
        { kind: 'tier', label: 'Tier 3', heading: 'The truth', body: 'Covers vs. same period last year.' },
        {
          kind: 'split',
          groups: [
            { label: 'Booking venues', venues: "Liu's, Coconut Room, Prime Kitchen", metric: 'Cost per reservation' },
            { label: 'Walk-in venues', venues: 'Lucky, San Si Wu, Smash', metric: 'GBP actions, calls, covers' },
          ],
        },
      ],
    },
    {
      id: 's30-dashboard',
      type: 'dashboardMock',
      title: "The dashboard you've never had",
      sub: 'Sample data, illustrative of the live view every venue will share.',
      beats: [
        {
          kind: 'dashboard',
          updated: 'today',
          venues: [
            { name: 'Prime Kitchen', covers: '1,240', reservations: '410', reviews: '+18', ratingTrend: '4.9 ↑', gbpActions: '612', spend: '$390', cpr: '$0.95' },
            { name: "Uncle Liu's", covers: '2,860', reservations: '890', reviews: '+34', ratingTrend: '4.8 ↑', gbpActions: '1,204', spend: '$1,850', cpr: '$2.08' },
            { name: 'Lucky Rabbit', covers: '1,980', reservations: '—', reviews: '+22', ratingTrend: '5.0 →', gbpActions: '940', spend: '$390', cpr: '—' },
            { name: 'Coconut Room', covers: '1,510', reservations: '520', reviews: '+15', ratingTrend: '4.7 ↑', gbpActions: '705', spend: '$420', cpr: '$0.81' },
            { name: 'Yallah', covers: '640', reservations: '190', reviews: '+9', ratingTrend: '4.9 ↑', gbpActions: '388', spend: '$3,444/yr', cpr: '$1.51' },
            { name: 'San Si Wu', covers: '710', reservations: '—', reviews: '+6', ratingTrend: '4.9 →', gbpActions: '301', spend: '$390', cpr: '—' },
            { name: 'Smash', covers: '890', reservations: '—', reviews: '+11', ratingTrend: '4.8 ↑', gbpActions: '415', spend: '$390', cpr: '—' },
            { name: 'Boat Catering', covers: '96', reservations: '32', reviews: '+3', ratingTrend: '4.9 →', gbpActions: '158', spend: '$390', cpr: '$9.75' },
          ],
        },
      ],
    },

    // ACT 7 — THE MONEY
    {
      id: 's31-same-budget',
      type: 'donutChart',
      eyebrow: 'ACT 7 — THE MONEY',
      title: 'Same budget. Different shape.',
      beats: [
        {
          kind: 'donut',
          label: 'Today — $215,796',
          totalValue: 215796,
          totalPrefix: '$',
          segments: [
            { label: 'Agency fee', value: 135600, pct: 63 },
            { label: 'Ads', value: 38376, pct: 18 },
            { label: 'Guerrilla', value: 34440, pct: 16 },
            { label: 'Print', value: 7380, pct: 3 },
          ],
        },
        {
          kind: 'donut',
          label: 'Proposed — $215,796',
          totalValue: 215796,
          totalPrefix: '$',
          segments: [
            { label: 'Agency retainer', value: 94950, pct: 44 },
            { label: 'Content production', value: 30211, pct: 14 },
            { label: 'Working media', value: 90635, pct: 42, highlight: true },
          ],
        },
        { kind: 'line', text: "Media and production go from 18% → 56%. You don't spend a dollar more." },
      ],
    },
    {
      id: 's32-what-you-pay',
      type: 'pricingBreakdown',
      title: 'What you pay us, and what you pay everyone else',
      beats: [
        {
          kind: 'section',
          heading: 'To Marketingverse — $10,500/mo',
          lines: [
            { label: 'Retainer — strategy, social across 8 venues, community management, print & collateral design, monthly reporting', amount: '$8,000' },
            { label: 'Content production — 1 full production shoot + 4 capture visits per month', amount: '$2,500' },
          ],
          total: { label: 'Monthly total', amount: '$10,500' },
        },
        {
          kind: 'section',
          heading: 'Paid directly by you',
          lines: [
            { label: 'Ad spend — platforms bill you, we manage it, you see every dollar' },
            { label: 'Creator fees' },
            { label: 'Actual printing' },
          ],
        },
        {
          kind: 'note',
          text: "Plus Foundation, Phase 1 — $2,000 one-time: GBP builds, website conversion fixes, review engine, brand platform. Phase 2 — booking system, site rebuilds, AI tooling — scoped separately once we've earned it.",
        },
      ],
    },
    {
      id: 's33-fee-goes-down',
      type: 'stepChart',
      title: 'And the fee goes down',
      sub: 'Something no agency will ever offer you',
      beats: [
        {
          kind: 'steps',
          steps: [
            { label: 'Months 1–6', value: '$8,000' },
            { label: 'Month 7+', value: 'Steps down — diff moves to media', active: true },
          ],
        },
      ],
    },

    // ACT 8 — THE BRAINSTORM
    {
      id: 's34-brainstorm',
      type: 'featureGrid',
      eyebrow: 'ACT 8 — THE BRAINSTORM',
      title: "Things we're not proposing yet",
      sub: "But we're going to keep bringing you",
      variant: 'sketchy',
      beats: [
        {
          title: 'Prime Restaurant Month',
          body: "Your own fixed-price month across all eight venues. A single restaurant can't do this. You have eight. Miami Spice, but it's yours.",
        },
        {
          title: 'Dinner becomes the show',
          body: "Bagatelle-style — the DJ arrives, the room turns, people end up on their feet. Upscale at Liu's, looser at Coconut Room where karaoke already gets you halfway.",
          meta: 'Needs an entertainment/liquor licence check and a noise conversation at Caribbean Plaza first.',
        },
        { title: 'Prime Passport', body: 'One loyalty account, eight venues. Your gift cards already prove the plumbing works.' },
        { title: 'Concierge portal', body: 'Hotel staff book any Prime venue in one place. Be the path of least resistance.' },
        {
          title: 'AI concierge on WhatsApp',
          body: 'Hours, menus, allergens, bookings — answered instantly, across all eight, no more 12-hour replies.',
        },
        {
          title: 'Press',
          body: 'You should be in Caribbean Journal, Travel + Leisure, Condé Nast Traveller. Earned coverage is credibility, ad creative, and concierge ammunition in one.',
        },
        {
          title: 'In-venue analytics',
          body: 'Cameras + AI for dwell time, peak flow, table turns.',
          meta: "Phase 2 only — Cayman's Data Protection Act means consent, signage, and retention get sorted before anything switches on.",
        },
        {
          title: 'Creator programme, done compliantly',
          body: "Work permits make this tricky here. We structure it around comped visits with genuine organic posting, contracting through creators' own entities, and paying for content licensing rather than services performed on-island — verified with local counsel.",
          meta: "Compliant is slower. It's also the version that doesn't blow up.",
        },
      ],
    },

    // CLOSE
    {
      id: 's35-close',
      type: 'statement',
      align: 'center',
      beats: [
        { kind: 'line', text: 'Same money. One agency. Ninety days to judge us.' },
        { kind: 'meta', text: "Let's start Monday." },
      ],
    },
  ],
};
