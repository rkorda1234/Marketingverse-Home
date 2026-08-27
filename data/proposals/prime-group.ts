import type { Proposal } from './prime-group.types';

// Prime Group × Marketingverse — the interactive audit deck (narrative v2).
// On-screen content only: the doc's "You say" talk track and "Why" notes
// are the presenter's script, not slide content, so neither appears here.
// This is framed as an audit, not a pitch — no pricing, no scope. Figures
// marked "safe" in the doc's build brief (client's own sheet) are kept
// exact; the Google review counts are the ones verified 27 Aug 2026 in the
// doc itself. Nothing that still needed live verification (competitor
// review counts, Instagram followers) is used on any slide.

export const primeGroupProposal: Proposal = {
  meta: {
    client: 'Prime Group',
    title: 'Prime Group × Marketingverse — Marketing Audit',
  },
  scenes: [
    // ACT 0 — OPEN
    {
      id: 's1-hero',
      type: 'hero',
      beats: [
        { kind: 'headline', text: 'Prime Group' },
        { kind: 'sub', text: 'An outside look at the marketing' },
      ],
    },
    {
      id: 's2-what-we-went-through',
      type: 'statGrid',
      eyebrow: 'ACT 0 — OPEN',
      title: 'What we went through',
      beats: [
        {
          kind: 'stats',
          stats: [
            { value: 8, label: 'websites' },
            { value: 8, label: 'Instagram accounts' },
            { value: 8, label: 'Google profiles' },
            { value: 40, suffix: '+', label: 'competitor venues' },
            { value: 7, suffix: ' months', label: 'of your own sales and spend data' },
          ],
        },
      ],
    },
    {
      id: 's3-short-version',
      type: 'statement',
      align: 'center',
      beats: [
        {
          kind: 'line',
          text: "Your own data already shows where marketing is working. The spend hasn't caught up to it yet.",
        },
      ],
    },

    // ACT 1 — WHAT'S WORKING
    {
      id: 's4-start-with-obvious',
      type: 'featureGrid',
      eyebrow: "ACT 1 — WHAT'S WORKING",
      title: 'Start with the obvious',
      sub: "The product isn't the problem",
      beats: [
        {
          title: '1,196 Google reviews',
          body: 'Weighted average 4.87. Four of six venues sit at 4.9.',
        },
        {
          title: "Uncle Liu's 366 · Lucky Rabbit 337 · San Si Wu 238",
          body: 'In a market of 72,000 people. Real depth, not vanity.',
        },
        {
          title: 'Eight concepts, three price tiers',
          body: 'A private chef arm, a food truck, a ghost kitchen, cross-redeemable gift cards. Very few groups this size have this range.',
        },
        {
          title: 'Ten years of Prime Kitchen',
          body: "A decade of goodwill most competitors don't have.",
        },
      ],
    },

    // ACT 2 — WHAT THE NUMBERS ALREADY SAY
    {
      id: 's5-jan-jul',
      type: 'dataTable',
      eyebrow: 'ACT 2 — WHAT THE NUMBERS ALREADY SAY',
      title: 'January–July, 2025 vs 2026',
      columns: ['', 'Sales', 'Return per extra marketing $'],
      highlightCol: 2,
      beats: [
        {
          kind: 'rows',
          rows: [
            ["Uncle Liu's / Coconut Room / San Si Wu", '+26%', '$11.11'],
            ['Lucky Rabbit', '+10%', '$5.84'],
            ['Prime Kitchen', 'flat', '–13%'],
          ],
        },
      ],
    },
    {
      id: 's6-11-11',
      type: 'tileStat',
      title: '$11.11 back on every extra dollar',
      sub: 'The plaza is your best-performing marketing asset',
      beats: [
        { kind: 'callout', value: 11.11, prefix: '$', decimals: 2, label: 'return per extra dollar', context: 'Sales grew 26% over the same window.' },
        {
          kind: 'tiles',
          tiles: [
            { label: "Uncle Liu's", value: 'Indoor, dinner, upscale' },
            { label: 'Coconut Room', value: 'Covered outdoor, relaxed' },
            { label: 'San Si Wu', value: 'Delivery only' },
          ],
        },
      ],
    },
    {
      id: 's7-prime-kitchen-flat',
      type: 'barRatio',
      title: 'Prime Kitchen tripled its marketing spend and sales stayed flat',
      beats: [
        {
          kind: 'bars',
          items: [
            { label: 'Marketing spend', value: 300, suffix: '% of last year' },
            { label: 'Sales', value: 100, suffix: '% of last year — flat', highlight: true },
          ],
        },
      ],
    },
    {
      id: 's8-distribution-problem',
      type: 'pathCompare',
      title: "Prime Kitchen doesn't have a content problem",
      sub: 'It has a distribution problem',
      note: 'CURRENTLY UNWORKED',
      beats: [
        {
          label: 'Who actually books it',
          tone: 'neutral',
          points: [
            'Visitors staying in villas, condos and apartments',
            'Deciding before or during the trip',
          ],
        },
        {
          label: 'Who reaches them first',
          tone: 'neutral',
          points: [
            'Hotel concierges',
            'Villa companies',
            'Airbnb hosts',
            'Yacht charters, travel agents, DMCs',
          ],
        },
      ],
    },
    {
      id: 's8b-zero-reviews',
      type: 'barsAndList',
      title: 'Prime Kitchen has zero Google reviews',
      sub: 'Ten years. Highest margin in the group. Not one review.',
      beats: [
        {
          kind: 'bars',
          items: [
            { label: "Uncle Liu's", value: 366 },
            { label: 'Lucky Rabbit', value: 337 },
            { label: 'San Si Wu', value: 238 },
            { label: 'Yallah', value: 133 },
            { label: 'Coconut Room', value: 96 },
            { label: 'Carnivore Smash', value: 26 },
            { label: 'Prime Kitchen', value: 0, highlight: true },
          ],
        },
        {
          kind: 'items',
          heading: 'Fixable on the profile right now',
          items: [
            'No reviews at all, so no social proof at the moment of decision',
            'Listed at Caribbean Plaza rather than as a service-area business — the service travels to villas, homes and yachts, and Google has a business type built for exactly that',
            'Hours close at 5pm, for a company whose product is dinner',
            "No enquiry or quote button. Website, directions, call. That's it.",
          ],
        },
      ],
    },
    {
      id: 's9-budget-shape',
      type: 'donutChart',
      title: 'How the budget is shaped',
      beats: [
        {
          kind: 'donut',
          label: 'Annual marketing spend — 3.1% of revenue',
          totalValue: 215796,
          totalPrefix: '$',
          segments: [
            { label: 'Agency fee', value: 135600, pct: 63, highlight: true },
            { label: 'Social spend', value: 38376, pct: 18 },
            { label: 'Guerrilla', value: 34440, pct: 16 },
            { label: 'Print', value: 7380, pct: 3 },
          ],
        },
      ],
    },
    {
      id: 's9b-spend-by-venue',
      type: 'dataTable',
      title: 'Social spend by venue, per year',
      columns: ['Venue', 'Social/yr', 'Guerrilla/yr'],
      beats: [
        {
          kind: 'rows',
          rows: [
            ["Uncle Liu's", '$9,840', '$9,840'],
            ['Lucky Rabbit', '$9,840', '$9,840'],
            ['Prime Corporate', '$3,936', '—'],
            ['Coconut Room', '$3,444', '$6,888'],
            ['Yallah', '$3,444', '$4,920'],
            ['Prime Kitchen', '$2,952', '—'],
            ['San Si Wu', '$2,952', '—'],
            ['Carnivore Smash', '$1,968', '$2,952'],
          ],
        },
        {
          kind: 'line',
          text: 'Yallah is under four thousand a year for a concept less than a year old. Guerrilla totals $34,440 across the group — the least measurable line on the sheet, and nearly as large as all the social spend combined.',
        },
      ],
    },

    // ACT 3 — THE GAPS
    {
      id: 's10-fix-this-week',
      type: 'screenshotGrid',
      eyebrow: 'ACT 3 — THE GAPS',
      title: "Things we'd fix this week",
      beats: [
        { kind: 'shot', label: 'Prime Kitchen — footer "Book a chef now"', annotation: 'White-on-white on hover.' },
        { kind: 'shot', label: 'Boat catering page', annotation: 'No photos of plated food.' },
        { kind: 'shot', label: 'Lucky Rabbit — phone number', annotation: 'Not clickable.' },
        { kind: 'shot', label: 'Reservation form', annotation: '"We\'ll respond within 12 hours."' },
        { kind: 'shot', label: 'Prime Kitchen — gallery', annotation: 'Same two dishes, repeated.' },
        {
          kind: 'shot',
          label: 'Lucky Rabbit — offers',
          annotation: 'Below the fold, stray punctuation, repeated copy ("innovation," "meticulously").',
        },
      ],
    },
    {
      id: 's11-12-hours',
      type: 'spotlightShot',
      title: '"We\'ll respond within 12 hours"',
      beats: [
        { kind: 'shot', caption: 'Live reservation form copy, right now.' },
        {
          kind: 'timeline',
          steps: [
            { time: '8:14 PM', text: 'Guest wants a table tonight' },
            { time: '8:15 PM', text: 'Books elsewhere' },
          ],
        },
      ],
    },
    {
      id: 's12-rooms-empty',
      type: 'mediaCompare',
      title: 'The rooms look empty',
      beats: [
        {
          label: 'YOUR FEEDS',
          shots: [{ caption: 'Yallah — plate, no people' }, { caption: "Uncle Liu's — empty table" }, { caption: 'Lucky Rabbit — no people' }],
        },
        {
          label: 'THE ACCOUNTS THAT WORK',
          shots: [{ caption: 'Bagatelle — packed room' }, { caption: 'Blue Marlin — faces, motion' }, { caption: 'La Guérite — night energy' }],
        },
      ],
    },
    {
      id: 's13-why-empty',
      type: 'statGrid',
      title: 'Why the rooms look empty',
      sub: 'Two photoshoots a year, for eight concepts',
      beats: [
        { kind: 'stats', stats: [{ value: 2, label: 'photoshoots per year' }] },
        { kind: 'line', text: '8 concepts · 365 nights · one visual refresh every six months.' },
      ],
    },
    {
      id: 's14-profiles-honest',
      type: 'auditFindings',
      title: 'The Google profiles are in good shape',
      beats: [
        {
          kind: 'summary',
          heading: 'Working',
          text: "Every venue has hours, menu links, categories, price bands, photos, ordering or booking buttons. Smash is actively running Google Posts. Uncle Liu's and Coconut Room both have reserve-a-table live.",
        },
        {
          kind: 'issues',
          heading: 'Off, and fixable this week',
          items: [
            {
              lead: 'San Si Wu and Coconut Room publish the same phone number (345-516-6637).',
              detail: 'Google uses phone as an identity signal, and duplicates blur which business is which.',
            },
            {
              lead: 'Yallah says "Doesn\'t accept reservations"',
              detail: 'and simultaneously lists a reservation provider — contradictory signals on the profile.',
            },
            {
              lead: 'Smash\'s hours show "Confirmed by phone call 7 weeks ago."',
              detail: "That's Google telling you it isn't sure you're open.",
            },
            { lead: "Yallah's hours were last updated by the business 12 weeks ago.", detail: '' },
            {
              lead: 'San Si Wu lists Wi-Fi as a service option',
              detail: 'and leads with a dine-in interior photo — for a delivery-only kitchen.',
            },
            {
              lead: "San Si Wu's menu pages are indexed with the vendor's name in the title",
              detail: '("Created by ToctToc") — showing up in search results.',
            },
            {
              lead: 'Lucky Rabbit\'s website still has the default WordPress "Hello world!" post live and indexed',
              detail: 'comment and all.',
            },
          ],
        },
      ],
    },
    {
      id: 's15-coconut-vs-liu',
      type: 'barRatio',
      title: 'Coconut Room has 96 reviews. Uncle Liu\'s has 366.',
      sub: 'Same plaza. Same kitchen. Same phone number.',
      beats: [
        {
          kind: 'bars',
          items: [
            { label: "Uncle Liu's", value: 366 },
            { label: 'San Si Wu', value: 238 },
            { label: 'Coconut Room', value: 96, highlight: true },
          ],
        },
        { kind: 'line', text: "14% of the plaza's reviews." },
      ],
    },

    // ACT 4 — WHERE GUESTS ACTUALLY DECIDE
    {
      id: 's16-how-someone-picks',
      type: 'flowSteps',
      eyebrow: 'ACT 4 — WHERE GUESTS ACTUALLY DECIDE',
      title: 'How someone picks where to eat tonight',
      beats: [
        {
          kind: 'steps',
          steps: [
            { label: 'Concierge / host / Google Maps' },
            { label: 'Reviews' },
            { label: 'Instagram', note: 'Most of the budget lives here.' },
            { label: 'Booking or walk-in' },
          ],
        },
      ],
    },
    {
      id: 's17-how-to-collect',
      type: 'featureGrid',
      title: 'How to actually collect reviews',
      sub: 'At the table first. Follow-up second.',
      beats: [
        {
          title: 'At the table — the primary channel',
          body: 'QR on the check presenter, table tent, receipt. Server asks by name, after the compliment, before the bill.',
        },
        {
          title: 'Follow-up on WhatsApp — where you have the contact',
          body: 'Bookings, delivery orders, Prime Kitchen clients, corporate. Sent a few hours later, once they\'re home.',
        },
        {
          title: 'Track it',
          body: 'Parse new reviews for staff names; servers compete on mentions. Reward the ask, never the review.',
        },
      ],
    },
    {
      id: 's18-whatsapp-os',
      type: 'phoneMock',
      title: "WhatsApp is the island's operating system",
      beats: [
        { label: 'Booking', preview: 'Table for 4 tonight at 8? — Confirmed, see you soon.' },
        { label: 'Review follow-up', preview: 'Thanks for dining with us — mind leaving a quick review?' },
        { label: 'Concierge enquiry', preview: "Ritz concierge: table for 2 at Liu's, 7:30?" },
        { label: 'Prime Kitchen enquiry', preview: 'Villa rental, 6 guests, this Friday — private chef available?' },
      ],
    },
    {
      id: 's19-different-job',
      type: 'dataTable',
      title: 'Every venue is a different job',
      columns: ['Venue', 'What it actually is', "Who it's for", 'Where growth is'],
      beats: [
        {
          kind: 'rows',
          rows: [
            ["Uncle Liu's", 'Indoor, dinner only, upscale', 'Residents + SMB visitors', 'Reviews, bookings, occasion nights'],
            ['Coconut Room', 'Covered outdoor, relaxed', 'Residents, families, groups', 'Karaoke and events as ownable programming'],
            ['San Si Wu', 'Ghost kitchen, delivery only', 'Home delivery, offices', 'Delivery apps, search, packaging — not room ambience'],
            ['Lucky Rabbit', 'Neighbourhood bar/sushi, off-strip, ~3 yrs', 'Locals, repeat regulars', 'Loyalty, weeknight occasions, local search'],
            ['Yallah', 'Fast-casual Med at Camana Bay, <1 yr, lunch-led', 'Office workers, work-live-play residents', 'Lunch daypart, office catering, awareness'],
            ['Carnivore Smash', 'Food truck on Seven Mile Beach, <1 yr', 'Beach traffic, walk-ups, delivery', 'Location content, hours clarity, delivery'],
            ['Prime Kitchen', 'Private chef & catering, 10 yrs', 'Visitors in villas, condos, apartments', 'Hosts, concierges, villa companies, yachts'],
          ],
        },
      ],
    },

    // ACT 5 — THE GROUP STORY
    {
      id: 's20-eight-strangers',
      type: 'logoChaos',
      eyebrow: 'ACT 5 — THE GROUP STORY',
      title: 'These read as eight unrelated businesses',
      beats: [
        {
          kind: 'logos',
          names: ['Prime Kitchen', "Uncle Liu's", 'Lucky Rabbit', 'Coconut Room', 'Yallah', 'San Si Wu', 'Carnivore Smash', 'Prime Corporate'],
        },
      ],
    },
    {
      id: 's21-founder-story',
      type: 'portraitNote',
      title: 'The founder story is under-used',
      beats: [
        { kind: 'portrait', initials: 'D', caption: 'Fire Masters · portrait pending' },
        { kind: 'note', text: 'A Food Network chef founded this group and almost nothing says so. That\'s rare credibility, sitting unused — barely present across venue sites and profiles.' },
      ],
    },
    {
      id: 's22-two-layers',
      type: 'layerStack',
      title: 'Two layers',
      beats: [
        {
          label: 'Layer 1',
          heading: 'Dylan is the proof',
          body: 'Press, credibility, the reason a new concept gets trusted on day one. Use it hard, now.',
        },
        {
          label: 'Layer 2',
          heading: 'Prime Group is the asset',
          body: 'Venues, reviews, loyalty base, concierge and host network, gift-card ecosystem. Owned by the company. Transferable.',
        },
      ],
    },
    {
      id: 's22b-format',
      type: 'screenshotGrid',
      title: "The format we'd build around him",
      sub: "Dylan to camera, explaining why the dish is what it is — cut with the fire",
      beats: [
        { kind: 'shot', tone: 'neutral', label: '1 — To camera', annotation: 'Chef to camera, dish in front of him.' },
        { kind: 'shot', tone: 'neutral', label: '2 — Process', annotation: 'The meat hanging over open flame.' },
        { kind: 'shot', tone: 'neutral', label: '3 — The cut', annotation: 'The knife going through.' },
        { kind: 'shot', tone: 'neutral', label: '4 — The plate', annotation: 'Ends on the plate.' },
        {
          kind: 'items',
          items: [
            'He talks to camera, in the dining room — animated, hands moving, genuinely into it',
            'Cut with the process: flames, the rotisserie, the slice',
            'He explains why, not what — why this cut, why it hangs over fire, why it rests that long',
            'Ends on the plate. The one moment it looks like a food photo',
            'Lav mic, always',
          ],
        },
      ],
    },
    {
      id: 's23-idea-underneath',
      type: 'statement',
      align: 'center',
      beats: [
        { kind: 'line', text: "People don't choose a restaurant. They choose the version of the night they want to have." },
      ],
    },

    // ACT 6 — WHERE WE'D FOCUS
    {
      id: 's24-five-things',
      type: 'rolloutTimeline',
      eyebrow: "ACT 6 — WHERE WE'D FOCUS",
      title: 'Five things, in order of return',
      beats: [
        {
          kind: 'sequence',
          items: [
            { label: 'Follow your own data', detail: "Weight spend toward the plaza and Lucky, where returns are proven. Rebuild Prime Kitchen's channel before adding budget to it." },
            { label: 'Own discovery', detail: 'Google depth, review volume and recency, responses. Cheapest work on this list.' },
            { label: 'Fill the rooms in the content', detail: 'Regular presence, not two shoots a year.' },
            { label: 'Build the referral network', detail: "Hosts, concierges, villa companies, yachts, travel agents, corporate. Prime Kitchen's growth, and free to start." },
            { label: 'Make eight venues behave like one group', detail: 'Loyalty, cross-promotion, a shared story.' },
          ],
        },
      ],
    },
    {
      id: 's25-content-rhythm',
      type: 'compareTable',
      title: 'A realistic content rhythm',
      beats: [
        {
          kind: 'rows',
          rows: [
            { label: 'Full production shoots', now: '2/yr, group-wide', withUs: '3/yr, per venue' },
            { label: 'Capture visits', now: '—', withUs: '2/month, per venue', highlight: true },
            { label: 'Posts per venue', now: '2–3/wk, inconsistent', withUs: '3/wk, consistent' },
            { label: 'Stories', now: 'ad hoc', withUs: 'from the capture visits' },
            { label: 'Video', now: 'occasional', withUs: 'majority of posts' },
            { label: 'People in frame', now: 'rare', withUs: '40% minimum' },
            { label: 'Chef process pieces', now: '—', withUs: 'a batch every quarter' },
          ],
        },
      ],
    },
    {
      id: 's26-where-media-works',
      type: 'featureGrid',
      title: 'Where media works on an island this size',
      beats: [
        { title: 'In-market geofencing', body: 'Seven Mile Beach hotels, condos, the airport. People already here.' },
        { title: 'Search', body: 'High intent: "sushi near me," "private chef Cayman," "boat catering," "delivery."' },
        { title: 'Local retargeting', body: 'Small resident pool, so frequency-capped and rotated.' },
        { title: 'Creators', body: 'In a market this small, one local creator with real reach is a media buy.' },
        {
          title: 'Cut',
          body: "Chasing people in US source cities weeks before a trip. Expensive, unmeasurable, better handled by hosts and concierges once they've landed.",
          meta: 'Not recommended',
        },
      ],
    },
    {
      id: 's26b-creators',
      type: 'dataTable',
      title: 'Creators: small and local beats big and famous',
      sub: 'Especially on your budget',
      columns: ['Account', 'Followers', 'Note'],
      beats: [
        {
          kind: 'rows',
          rows: [
            ['@caymanislandsfoodie', '~20K', 'Largest dedicated Cayman food account'],
            ['@goodeatscayman', '~11K', 'Also active on TikTok; sponsors local food events'],
            ['@island_epicurean_cayman', '~6K', 'Chelsea Tennant — Caymanian, on camera, has judged food and mixology competitions'],
            ['@caymaneats', '~2.9K', 'Bio explicitly invites collaborations'],
          ],
        },
        {
          kind: 'line',
          text: "For high-end travel you don't want millions of followers who can't afford the trip — you want micro-influencers with an audience of wealthy travellers, because a shared stay reads like a recommendation from a friend.",
        },
      ],
    },
    {
      id: 's26c-dot',
      type: 'statGrid',
      title: "There's a free version of this",
      sub: 'The Department of Tourism is already flying influencers in',
      beats: [
        {
          kind: 'stats',
          stats: [
            { value: 540, label: 'posts' },
            { value: 296, suffix: 'M', label: 'estimated reach' },
            { value: 0, prefix: '$', label: 'creator fees' },
          ],
        },
        { kind: 'line', text: 'One Cayman DoT in-kind influencer partnership, as reported by the Cayman Compass.' },
      ],
    },
    {
      id: 's27-network',
      type: 'networkDiagram',
      title: "The network that isn't being worked",
      beats: [
        { kind: 'hub', label: 'Prime Kitchen' },
        {
          kind: 'spokes',
          groups: [
            { label: 'Hotel concierges', items: ['Ritz', 'Seafire', 'Westin', 'Marriott', 'Palm Heights'] },
            { label: 'Airbnb & villa hosts', items: ['Seven Mile Beach'] },
            { label: 'Villa companies', items: [] },
            { label: 'Yacht charters', items: [] },
            { label: 'Travel agents & DMCs', items: [] },
            { label: 'Corporate', items: [] },
          ],
        },
      ],
    },

    // ACT 7 — VISIBILITY
    {
      id: 's28-visible-monthly',
      type: 'tierList',
      eyebrow: 'ACT 7 — VISIBILITY',
      title: 'All of this should be visible monthly',
      beats: [
        { kind: 'tier', label: 'Tier 1', heading: 'Hard numbers', body: 'Bookings with a source tag, click ID, or promo code.' },
        { kind: 'tier', label: 'Tier 2', heading: 'Directional', body: 'Google profile actions — calls, direction requests, website taps.' },
        { kind: 'tier', label: 'Tier 3', heading: 'The honest one', body: 'Covers vs the same period last year.' },
        {
          kind: 'split',
          groups: [
            { label: 'Booking venues', venues: "Uncle Liu's, Coconut Room, Prime Kitchen", metric: 'Cost per reservation' },
            { label: 'Walk-in & delivery', venues: 'Lucky, San Si Wu, Smash, Yallah', metric: 'GBP actions, delivery orders, covers' },
          ],
        },
      ],
    },
    {
      id: 's29-dashboard',
      type: 'dashboardMock',
      title: 'One screen, eight venues',
      sub: 'Sample data, illustrative of the live view every venue would share.',
      beats: [
        {
          kind: 'dashboard',
          updated: 'today',
          venues: [
            { name: 'Prime Kitchen', covers: '—', reservations: '18', deliveryOrders: '—', reviews: '+0', ratingTrend: '— →', gbpActions: '84', spend: '$246', returnPerDollar: '$4.62' },
            { name: "Uncle Liu's", covers: '2,860', reservations: '890', deliveryOrders: '—', reviews: '+34', ratingTrend: '4.9 ↑', gbpActions: '1,204', spend: '$1,646', returnPerDollar: '$11.11' },
            { name: 'Lucky Rabbit', covers: '1,980', reservations: '—', deliveryOrders: '410', reviews: '+22', ratingTrend: '4.9 →', gbpActions: '940', spend: '$1,646', returnPerDollar: '$5.84' },
            { name: 'Coconut Room', covers: '1,510', reservations: '520', deliveryOrders: '—', reviews: '+15', ratingTrend: '4.9 ↑', gbpActions: '705', spend: '$862', returnPerDollar: '$11.11' },
            { name: 'San Si Wu', covers: '—', reservations: '—', deliveryOrders: '640', reviews: '+9', ratingTrend: '4.8 →', gbpActions: '388', spend: '$862', returnPerDollar: '$11.11' },
            { name: 'Yallah', covers: '640', reservations: '—', deliveryOrders: '120', reviews: '+4', ratingTrend: '4.9 →', gbpActions: '301', spend: '$698', returnPerDollar: '—' },
            { name: 'Carnivore Smash', covers: '890', reservations: '—', deliveryOrders: '96', reviews: '+3', ratingTrend: '4.5 ↑', gbpActions: '215', spend: '$410', returnPerDollar: '—' },
          ],
        },
      ],
    },

    // ACT 8 — IDEAS
    {
      id: 's30-ideas',
      type: 'featureGrid',
      eyebrow: 'ACT 8 — IDEAS',
      title: 'Things worth exploring',
      variant: 'sketchy',
      beats: [
        {
          title: 'A Prime fixed-price month',
          body: "Your own version across all eight, rather than only joining someone else's. Eight venues is the reason you can.",
        },
        {
          title: 'Dinner becomes the show',
          body: "Bagatelle-style — the DJ arrives, the room turns. Upscale at Liu's, looser at Coconut Room where karaoke already gets you halfway.",
          meta: 'Check entertainment/liquor licensing and Caribbean Plaza noise first',
        },
        { title: 'Prime Passport', body: 'One loyalty account across eight venues. The gift cards prove the plumbing works.' },
        { title: 'Host & concierge kit', body: "Airbnb hosts, villa companies, hotel desks. Prime Kitchen's biggest unworked channel." },
        { title: 'AI concierge on WhatsApp', body: 'Hours, menus, allergens, bookings — instant, across all eight.' },
        {
          title: 'Press',
          body: 'Caribbean Journal, Travel + Leisure, Condé Nast Traveller, plus local coverage. Credibility, ad creative and concierge ammunition at once.',
        },
        {
          title: 'In-venue analytics',
          body: 'Cameras and AI for dwell time, flow, table turns.',
          meta: "Cayman's Data Protection Act: consent, signage and retention first",
        },
        {
          title: 'Creator partnerships, structured properly',
          body: "Work permits complicate paid creator work here. Comped visits, genuine organic posting, contracting through creators' own entities, paying for content licensing.",
          meta: 'Worth confirming with local counsel',
        },
        {
          title: 'Alcohol promotion review',
          body: '"All you can drink" and party-format events both sit under Cayman\'s liquor advertising rules.',
          meta: 'Worth a quick legal read before amplifying either',
        },
      ],
    },

    // CLOSE
    {
      id: 's31-close',
      type: 'statGrid',
      align: 'center',
      eyebrow: 'THE SHORT VERSION, AGAIN',
      beats: [
        {
          kind: 'stats',
          stats: [
            { value: 11.11, prefix: '$', decimals: 2, label: 'return per $ — the plaza' },
            { value: 5.84, prefix: '$', decimals: 2, label: 'return per $ — Lucky Rabbit' },
            { value: -13, suffix: '%', label: 'Prime Kitchen — start there' },
          ],
        },
      ],
    },
  ],
};
