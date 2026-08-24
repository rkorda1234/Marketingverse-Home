import type { Proposal } from './types';

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/bookings/ricardo';

export const saagaProposal: Proposal = {
  meta: {
    client: 'Saaga Family Wealth',
    title: 'Marketingverse × Saaga Family Wealth — Stage 1 Implementation Proposal',
  },
  scenes: [
    // 1 — Hero
    {
      id: 'hero',
      type: 'hero',
      beats: [
        { kind: 'eyebrow', text: 'A Branding & Marketing Implementation Proposal' },
        { kind: 'headline', text: 'Financial Hospitality, Made Visible.' },
        {
          kind: 'subhead',
          text: 'Prepared exclusively for Saaga Family Wealth and Juan Pablo Martinez-Blat: the scope, timeline, and investment for Stage 1 of the Financial Hospitality build, with a clear view of what comes next.',
        },
        { kind: 'logo' },
        { kind: 'footer', text: 'Marketingverse  ·  Branding & Marketing Proposal  ·  August 2026  ·  Valid for 30 days' },
      ],
    },

    // 2 — Why This Plan
    {
      id: 'overview',
      type: 'richText',
      eyebrow: 'Overview',
      title: 'Why This Plan, and In This Order',
      beats: [
        {
          paragraphs: [
            "This proposal covers Stage 1 of the Financial Hospitality build: a refreshed brand, a website that earns trust before the first call, and an interactive sales presentation that makes \"show, don't tell\" real in the room. It's scoped to stand completely on its own, useful and launchable without anything beyond it.",
          ],
        },
        {
          paragraphs: [
            "Everything else, from AI-powered personalization to ongoing content and a growth partnership, is real and ready when you are. This proposal previews what that looks like, but nothing beyond Stage 1 is priced or committed here — that's a conversation for once Stage 1 is live and working.",
          ],
        },
        {
          heading: "What's Included",
          listStyle: 'check',
          list: [
            { text: 'A focused Discovery week to align on the brand and build-ready brief' },
            { text: "A refreshed brand identity, message, and narrative, built on what Saaga already has, not a rebuild from zero" },
            { text: 'A bilingual website that validates trust the moment a referral arrives' },
            { text: 'An interactive sales presentation: an app, a print-ready PDF, and a skimmable leave-behind summary, for use in prospect meetings' },
            { text: "A clear look at what becomes possible in later stages, once Stage 1 is live" },
          ],
        },
      ],
    },

    // 3 — Pipeline Impact
    {
      id: 'pipeline',
      type: 'pipelineTable',
      eyebrow: 'Pipeline Impact',
      title: 'How This Fills Your Pipeline',
      beats: [
        { kind: 'headline', text: 'Referrals still open the door. Here is the job each piece does once that door opens.' },
        {
          kind: 'rows',
          rows: [
            { asset: 'Brand Identity, Message & Narrative', job: 'Makes every touchpoint below sound and look like the same firm, so trust builds instead of resetting at each step.' },
            { asset: 'Website', job: 'Answers "what do you actually do?" before the first call, so a warm referral does not stall during validation.' },
          ],
        },
        {
          kind: 'rows',
          rows: [
            { asset: 'Interactive Sales Presentation', job: 'Turns one meeting into a decision, with proof in the room instead of a claim on a slide.' },
            { asset: 'Print PDF & Leave-Behind Summary', job: 'Gives every family something to review after the meeting, so the decision does not depend on remembering everything said in the room.' },
          ],
        },
        { kind: 'closing', text: 'None of this replaces referrals. It makes sure every referral that arrives finds a firm that already looks ready for them.' },
      ],
    },

    // 4 — About / Who's Building This
    {
      id: 'about',
      type: 'about',
      eyebrow: "Who's Building This",
      title: 'Marketingverse, in Miami',
      beats: [
        {
          kind: 'location',
          heading: 'Based in Miami',
          text: "Marketingverse is headquartered in Miami, the same city as Saaga. Discovery interviews, and check-ins at your office aren't a video call away; we can be there in person whenever it's useful, not on a scheduled quarterly visit.",
        },
        {
          kind: 'bio',
          heading: 'Our Approach',
          paragraphs: [
            "Our team's background is in storytelling and film. We build every brand's story to form a real emotional connection with its audience: one that creates trust and sparks a visceral reaction, because that's what people actually remember.",
            'We also believe that today, the most effective approach merges high-production storytelling with raw, organic content: the kind that lets a prospective client feel the closeness and honesty of the brand and the team behind it, who they really are, without the full Hollywood production.',
          ],
        },
        {
          kind: 'logos',
          heading: "Brands We've Worked With",
          logos: [
            { name: 'AVANTI WAY' },
            { name: 'SERVAT GROUP', subtitle: 'luxury real estate' },
            { name: 'viacom' },
            { name: 'SONY MUSIC' },
            { name: 'QUAKER' },
            { name: 'PROPER CLOTH' },
            { name: 'havaianas' },
            { name: 'nickelodeon' },
            { name: 'HBO' },
          ],
        },
        {
          kind: 'team',
          heading: 'Some of the Key Players',
          members: [
            { name: 'Ricky', role: 'Founder & CEO', photo: '/team/ricky.png' },
            { name: 'Mari', role: 'Creative Director', photo: '/team/mari.png' },
            { name: 'Nati', role: 'Project Manager', photo: '/team/nati.png' },
            { name: 'Vale', role: 'Content Creator', photo: '/team/vale.png' },
            { name: 'Leo', role: 'Content Creator', photo: '/team/leo.png' },
            { name: 'Adri', role: 'Marketing Specialist', photo: '/team/adri.png' },
          ],
        },
      ],
    },

    // 5 — Step 1, Discovery & Brand Direction
    {
      id: 'discovery',
      type: 'phase',
      eyebrow: 'Step 1',
      title: 'Discovery & Brand Direction',
      timeframe: 'Week 1',
      beats: [
        { kind: 'intro', text: "A focused week to align on the brand and build-ready brief. Lighter than a full strategic overhaul, because the foundation is already Saaga's own — we're refining it, not starting over." },
        {
          kind: 'section',
          heading: 'Stakeholder Alignment',
          items: [
            'Stakeholder interviews: Juan Pablo and senior team',
            'Working session to pressure-test the Financial Hospitality positioning and the three-pain / three-service framework',
            'Content and asset audit: current website, brochures, deck, and any existing photo/video',
          ],
        },
        {
          kind: 'section',
          heading: 'Blueprint',
          items: [
            'Website sitemap and page-by-page content outline',
            "Sales presentation flow: how it adapts to a prospect's stated pain point in the room",
            'Presentation of the build-ready brief and written sign-off from Saaga before design and development begin',
          ],
        },
        {
          kind: 'section',
          heading: 'Brand Refresh Direction',
          items: [
            'Refined identity: color, type, and logo use, built on what Saaga already has',
            'The core message: the three-pain, three-service framework, in one page',
            'The tone: how Saaga sounds, in English and Spanish, everywhere',
          ],
          note: 'A light revamp, not a rebuild. Every deliverable that follows is built from this one source.',
        },
        { kind: 'deliverable', text: 'a single approved brief that the website and sales presentation are built against.' },
      ],
    },

    // 6 — Step 2, Website
    {
      id: 'website',
      type: 'phase',
      eyebrow: 'Step 2',
      title: 'Website',
      timeframe: 'Weeks 2–4',
      beats: [
        { kind: 'intro', text: 'The website is the single highest-leverage asset in this plan: it is what a referral checks before they ever reply to an introduction. It is built to validate trust, not to chase cold traffic.' },
        {
          kind: 'section',
          heading: 'Design',
          items: [
            "Visual identity applied to a full page system: home, services (mapped to Control / Confidence / Continuity), how-we're-paid, privacy & security, team, insights, contact",
            'Bilingual EN/ES throughout',
            'Calm, restrained, editorial design language, built to be read by a skeptical, discerning family, not to convert cold clicks',
          ],
        },
        {
          kind: 'section',
          heading: 'Build & Launch',
          items: [
            'CMS so the team can publish insights and updates without a developer',
            'Technical SEO foundation and structured content so Saaga is well-represented when families and AI assistants research the category',
            'QA, staging review, and a guided launch',
          ],
          note: "Built ready to add an AI concierge later, if and when that's the right fit — not included in Stage 1.",
        },
        { kind: 'deliverable', text: "a live, bilingual website on Saaga's domain." },
      ],
    },

    // 7 — Step 3, Interactive Sales Presentation
    {
      id: 'sales-presentation',
      type: 'phase',
      eyebrow: 'Step 3',
      title: 'Interactive Sales Presentation',
      timeframe: 'Weeks 4–5',
      beats: [
        { kind: 'intro', text: 'A tablet- and web-based experience for prospect meetings, built the same way this proposal was: adaptive, visual, built to make "show, don\'t tell" real in the room, not just on a slide.' },
        {
          kind: 'section',
          heading: 'What It Does',
          items: [
            'Opens on the three pains (Control, Confidence, Continuity) and lets the advisor or the family select what matters most, adapting the walkthrough accordingly',
            "A side-by-side comparison of Saaga's model against traditional banks and MFOs",
            'A visual map of how each generation typically engages with wealth, and what a healthy governance structure looks like as it passes to the next',
            '24 years, one client departed: a simple, honest look at what that track record means',
            'A clear illustration of where fees go through intermediaries, and what changes with direct access to the same funds and managers',
          ],
          note: "Built once, with Saaga's own numbers and framework. Making these live and personal to each family in the room is a Stage 2 upgrade, previewed later in this proposal.",
        },
        {
          kind: 'section',
          heading: 'Build',
          items: [
            "iPad-optimized and web/desktop responsive, matching the website's visual system",
            'Content loaded from the same messaging architecture as the website: one source of truth, two experiences',
            'Password- or link-protected per prospect, so content can be lightly customized per family without rebuilding the app',
          ],
        },
        {
          kind: 'section',
          heading: 'Print & Leave-Behind Materials',
          items: [
            'A full, print-ready PDF version of the presentation, for prospects and referral partners who want a hard copy',
            "A short, skimmable leave-behind summary of the deck's main points, built like a FAQ, so a family can review and decide without sitting through the full presentation again",
          ],
        },
        { kind: 'deliverable', text: 'a branded, installable web app; a full print-ready PDF; a skimmable leave-behind summary; and a short training session for the team on how to use it in-meeting.' },
      ],
    },

    // 8 — Step 4, Launch
    {
      id: 'launch',
      type: 'phase',
      eyebrow: 'Step 4',
      title: 'Launch',
      timeframe: 'Week 6',
      beats: [
        { kind: 'intro', text: 'A coordinated rollout: the refreshed brand, the website, and the sales presentation go live together, so every audience sees one consistent story at once.' },
        {
          kind: 'section',
          heading: 'Launch Checklist',
          items: [
            'Website goes live; redirects and analytics confirmed',
            'Sales presentation deployed to the team, with a working session on how to use it in a live meeting',
            'Refreshed brand identity applied consistently across existing materials',
            'Leave-behind summary delivered print-ready',
            'A short internal announcement so the team hears about the new presence directly from Juan Pablo',
          ],
        },
        { kind: 'deliverable', text: "everything above, live, tested, and in the team's hands, with a clear view of what Stage 2 could add next." },
      ],
    },

    // 9 — What's Possible Next
    {
      id: 'whats-next',
      type: 'cardGrid',
      eyebrow: "What's Possible Next",
      title: "Where This Goes When You're Ready",
      intro: "Stage 1 stands on its own — nothing below is priced or committed here. But once it's live, here's what becomes possible.",
      beats: [
        {
          title: 'AI-Powered Personalization',
          body: "The comparison, generational map, and \"where the fees go\" tools in your sales presentation become live and personal to whoever's in the room: an advisor enters a specific family's numbers and structure, and each tool generates a result built for them, not an illustration. The website can add its own AI concierge too, for families who want a first answer at 2am.",
        },
        {
          title: 'Content & Visibility Engine',
          body: "A one-day podcast/video shoot at your own office, edited into a quarter's worth of long- and short-form content, plus ongoing social media management to keep that content, and Saaga's voice, in front of clients and referral partners month after month.",
        },
        {
          title: 'Additional Add-Ons',
          body: 'Branded search protection and category-education Google Ads once the organic engine is live; a named identity and curriculum for the NextGen program you already run; and a ready-to-deploy toolkit for referral-partner salons and dinners.',
        },
      ],
    },

    // 10 — Timeline
    {
      id: 'timeline',
      type: 'timeline',
      eyebrow: 'Timeline',
      title: 'Stage 1, at a Glance',
      beats: [
        { kind: 'intro', text: 'Discovery runs first and sets the direction; the website and sales presentation follow in sequence, then launch together.' },
        {
          kind: 'segments',
          segments: [
            { phase: '1 · Discovery & Brand Direction', timeframe: 'Week 1', milestone: 'Build-ready brief approved' },
            { phase: '2 · Website', timeframe: 'Weeks 2-4', milestone: 'Site live, staging reviewed' },
            { phase: '3 · Interactive Sales Presentation', timeframe: 'Weeks 4-5', milestone: 'App & leave-behind ready, team trained' },
            { phase: '4 · Launch', timeframe: 'Week 6', milestone: 'Brand, website & sales presentation live together' },
          ],
        },
        { kind: 'intro', text: "Total time to launch: approximately 6 weeks from kickoff. Stage 2 begins whenever you're ready." },
      ],
    },

    // 11 — Investment Summary
    {
      id: 'investment',
      type: 'investment',
      eyebrow: 'Investment',
      title: 'Stage 1 Investment',
      intro: 'Presented as a single build package, because Stage 1 is one integrated system, built and delivered together. Later stages are previewed, not priced, until you\'re ready for them.',
      beats: [
        {
          kind: 'number',
          amount: 18000,
          prefix: '$',
          label: 'Stage 1 Investment',
          items: [
            'Discovery & Brand Direction — stakeholder interviews, messaging, sitemap',
            "Brand Refresh — refined identity, messaging framework, voice & narrative, built on what Saaga already has",
            'Website — bilingual design & build, CMS, SEO foundation',
            "Interactive Sales Presentation — adaptive walkthrough, four illustrative tools built with Saaga's own numbers, a print-ready PDF, and a leave-behind summary",
          ],
        },
        {
          kind: 'line',
          text: "Later stages, AI-powered personalization, content production, an ongoing growth partnership, and additional add-ons, are previewed in this proposal but priced separately, once you're ready to move forward.",
        },
      ],
    },

    // 12 — Everything In This Package
    {
      id: 'everything',
      type: 'checklist',
      eyebrow: 'At a Glance',
      title: 'Everything In Stage 1',
      intro: 'Every deliverable in this stage, in one place.',
      beats: [
        {
          heading: 'Stage 1, $18,000',
          variant: 'included',
          items: [
            'Discovery & Brand Direction',
            'Brand Refresh (Identity, Message & Narrative)',
            'Website',
            'Interactive Sales Presentation (app + print PDF + leave-behind summary)',
          ],
        },
        {
          heading: "Also Possible, When You're Ready",
          variant: 'recommended',
          items: [
            'AI-Powered Personalization (live tools + concierge)',
            'Podcast & Video Content Production',
            'Ongoing Growth Partnership',
            'Google Ads, NextGen Branding & Referral-Partner Salon Toolkit',
          ],
        },
      ],
    },

    // 13 — Payment Schedule & Terms
    {
      id: 'terms',
      type: 'richText',
      eyebrow: 'Terms',
      title: 'Payment Schedule & Terms',
      beats: [
        {
          heading: 'Stage 1 Payment',
          listStyle: 'bullet',
          list: [
            { text: '50% due at signing to begin Discovery and lock the build calendar' },
            { text: '25% due at brand/design approval, before website and sales presentation development begin' },
            { text: '25% due at launch' },
          ],
        },
        {
          heading: 'Notes',
          listStyle: 'bullet',
          list: [
            { text: 'Figures assume content and access (logins, existing brand assets, client references for testimonials) are provided within 5 business days of request' },
            { text: 'Two rounds of revisions are included at each major milestone; additional rounds are billed at our standard hourly rate' },
            { text: 'This proposal is valid for 30 days from the date on the cover' },
          ],
        },
      ],
    },

    // 14 — Let's Get Started
    {
      id: 'cta',
      type: 'cta',
      beats: [
        { kind: 'headline', text: "Let's Build Stage 1, and See Where It Leads." },
        {
          kind: 'steps',
          steps: [
            { title: 'Confirm scope', text: 'A short call to walk through Stage 1 together and adjust anything before signing.' },
            { title: 'Sign & schedule', text: 'Signed agreement and the first invoice; we schedule Discovery around Saaga\'s calendar.' },
            { title: 'Kickoff', text: 'Week 1 begins with stakeholder interviews, and the clock starts.' },
          ],
        },
        { kind: 'button', label: 'Schedule the Kickoff Call', url: BOOKING_URL },
      ],
    },
  ],
};
