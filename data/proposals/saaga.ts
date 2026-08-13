import type { Proposal } from './types';

const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/bookings/ricardo';

export const saagaProposal: Proposal = {
  meta: {
    client: 'Saaga Wealth',
    title: 'Marketingverse × Saaga Wealth — Implementation Proposal',
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
          text: "Prepared exclusively for Saaga Wealth and Juan Pablo Martinez-Blat: the scope of work, phased timeline, and investment for building the Financial Hospitality brand, digital presence, and content engine that earns every referral its trust.",
        },
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
            "This proposal turns the Financial Hospitality strategy into a working brand and marketing system: a website prospects trust the moment a referral sends them, an AI-guided sales experience advisors can lean on in the room, a library of educational video content built in a single efficient shoot day, and an ongoing content engine that keeps Saaga visible to the people who refer it.",
          ],
        },
        {
          paragraphs: [
            "Everything is scoped to be built in the order that compounds: Discovery and message architecture first, so the website, sales app, and content are all built on the same story; then the three flagship builds in parallel; then an ongoing partnership to keep the content and presence alive.",
          ],
        },
        {
          heading: "What's Included",
          listStyle: 'check',
          list: [
            { text: "A structured Discovery period to translate the Financial Hospitality strategy into a build-ready brief" },
            { text: "A bilingual (EN/ES) website with an AI concierge trained on Saaga's philosophy and service model" },
            { text: "An Interactive AI Sales Presentation app for use in prospect meetings and as a leave-behind" },
            { text: "A one-day podcast/video production shoot, edited into long-form education content and repurposed across platforms" },
            { text: "Social media management to keep that content, and Saaga's voice, consistently in front of clients and referral partners" },
            { text: "Recommended add-ons to round out the system later: Google Ads (Stage 3), next-gen program branding, and an event toolkit for referral-partner salons" },
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
            { asset: 'Website + AI Concierge', job: 'Answers "what do you actually do?" before the first call, so a warm referral does not stall during validation.' },
            { asset: 'Interactive AI Sales App', job: 'Turns one meeting into a decision, with proof in the room instead of a claim on a slide.' },
          ],
        },
        {
          kind: 'rows',
          rows: [
            { asset: 'Podcast & Video Content', job: 'Builds recognition with families and COIs before they ever need you, so the next referral starts warmer.' },
            { asset: 'Social Media Management', job: 'Keeps that recognition alive between production days, month after month.' },
            { asset: 'Sales, Referral & Print Collateral', job: 'Gives referral partners something physical to hand over, reinforcing the digital story in person.' },
          ],
        },
        {
          kind: 'rows',
          rows: [
            { asset: 'Email & Client Newsletter', job: 'Keeps referral partners and existing clients warm between meetings, without relying on a social algorithm.' },
            { asset: 'Google Ads (Stage 3)', job: 'Protects your name and captures intent once someone finally searches for you.' },
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
          text: "Marketingverse is headquartered in Miami — the same city as Saaga. Discovery interviews, the production shoot, and check-ins at your office aren't a video call away; we can be there in person whenever it's useful, not on a scheduled quarterly visit.",
        },
        {
          kind: 'bio',
          heading: 'Our Approach',
          paragraphs: [
            "Our team's background is in storytelling and film. We build every brand's story to form a real emotional connection with its audience — one that creates trust and sparks a visceral reaction, because that's what people actually remember.",
            'We also believe that today, the most effective approach merges high-production storytelling with raw, organic content — the kind that lets a prospective client feel the closeness and honesty of the brand and the team behind it, who they really are, without the full Hollywood production.',
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

    // 5 — Phase 0
    {
      id: 'phase-0',
      type: 'phase',
      eyebrow: 'Phase 0',
      title: 'Discovery & Strategic Foundation',
      timeframe: 'Weeks 1–2',
      beats: [
        { kind: 'intro', text: "Before any design or development begins, we align the whole team, Saaga's and ours, around one build-ready brief. This is the highest-leverage phase in the plan: it is what keeps the website, the AI sales app, and the content shoot from telling three slightly different stories." },
        {
          kind: 'section',
          heading: 'Week 1: Immersion & Architecture',
          items: [
            'Stakeholder interviews: Juan Pablo, senior team, and (with permission) 2-3 long-tenured clients or referral partners',
            "Saaga compiles its compliance requirements (from its compliance officer or counsel) into a checklist we'll use for every piece of content going forward",
            'Working session to pressure-test the Financial Hospitality positioning and the three-pain / three-service framework',
            'Content and asset audit: current website, brochures, deck, and any existing photo/video',
            'Final messaging architecture and voice guidelines, in English and Spanish',
          ],
        },
        {
          kind: 'section',
          heading: 'Week 2: Blueprint & Sign-off',
          items: [
            'Website sitemap and page-by-page content outline',
            'AI concierge conversation design: the questions it should answer, and where it should hand off to a human',
            "Sales app flow: how it adapts to a prospect's stated pain point in the room",
            'Presentation of the build-ready brief and written sign-off from Saaga before design and development begin',
          ],
        },
        {
          kind: 'section',
          heading: 'Brand Identity, Message, Tone & Narrative',
          items: [
            'Refined identity: color, type, and logo use',
            'The core message: the three-pain, three-service framework, in one page',
            "The tone: how Saaga sounds, in English and Spanish, everywhere",
            'The narrative: the Financial Hospitality story, start to finish',
          ],
          note: 'One short document, plain and easy to hand to anyone. Every deliverable that follows is built from this one source.',
        },
        { kind: 'deliverable', text: 'a single approved brief that every subsequent phase is built against.' },
      ],
    },

    // 6 — Phase 1A Website
    {
      id: 'phase-1a',
      type: 'phase',
      eyebrow: 'Phase 1A',
      title: 'Website with an AI Concierge',
      timeframe: 'Weeks 3–6',
      beats: [
        { kind: 'intro', text: 'The website is the single highest-leverage asset in this plan: it is what a referral checks before they ever reply to an introduction. It is built to validate trust, not to chase cold traffic.' },
        {
          kind: 'section',
          heading: 'Design',
          items: [
            "Visual identity applied to a full page system: home, services (mapped to Control / Confidence / Continuity), how-we're-paid, privacy & security, team, insights, contact",
            'Bilingual EN/ES throughout, including the AI concierge',
            'Calm, restrained, editorial design language, built to be read by a skeptical, discerning family, not to convert cold clicks',
          ],
        },
        {
          kind: 'section',
          heading: 'AI Concierge',
          items: [
            'A conversational assistant trained on Saaga\'s philosophy, service model, and fee structure, able to answer "What do you actually do?" and "How are you paid?" in plain language, day or night',
            'Configured to recognize when a conversation should become a human introduction, and to hand off cleanly with context',
            'Built with the same confidentiality posture as the rest of the brand: no client data collected or stored by the assistant',
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
        },
        { kind: 'deliverable', text: "a live, bilingual website with an integrated AI concierge, on Saaga's domain." },
      ],
    },

    // 7 — Phase 1B AI Sales App
    {
      id: 'phase-1b',
      type: 'phase',
      eyebrow: 'Phase 1B',
      title: 'Interactive AI Sales Presentation',
      timeframe: 'Weeks 6–7',
      beats: [
        { kind: 'intro', text: 'A tablet- and web-based app for use in prospect meetings and as a leave-behind, built to make the "show, don\'t tell" strategy tangible in the room, not just on a slide.' },
        {
          kind: 'section',
          heading: 'What It Does',
          items: [
            'Opens on the three pains (Control, Confidence, Continuity) and lets the advisor or the family select what matters most, adapting the walkthrough accordingly',
            'Includes an interactive "hidden cost" calculator: a family enters a rough portfolio size and sees an illustration of typical bank/MFO markup versus Saaga\'s flat-fee model',
            "An embedded AI assistant, trained on the same knowledge base as the website concierge, so it can answer follow-up questions live, letting the advisor stay in the conversation instead of flipping slides",
            'A leave-behind mode: a secure, trackable link the family can revisit after the meeting, so Saaga can see what resonated',
          ],
          note: 'Illustrative direction only — the calculator and AI assistant are built as part of Phase 1B; this proposal describes them rather than including a working demo.',
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
        { kind: 'deliverable', text: 'a branded, installable web app, plus a short training session for the team on how to use it in-meeting.' },
      ],
    },

    // 8 — Phase 2 Podcast/Video
    {
      id: 'phase-2',
      type: 'phase',
      eyebrow: 'Phase 2',
      title: 'Podcast & Video Content Production',
      timeframe: 'Week 8 (shoot), through Week 9 (edit)',
      beats: [
        { kind: 'intro', text: "One efficient production day at Saaga's own office (no location fee) built to generate a full quarter of educational content: the raw material for the LinkedIn thought-leadership and next-gen education programming recommended in the strategy phase." },
        {
          kind: 'section',
          heading: 'Pre-Production (Week 7-8)',
          items: [
            'Scripting and interview-question development for up to 6 segments, drawn directly from the Financial Hospitality content pillars: financial + emotional wealth, governance, the economics of independence, and cross-border LatAm planning',
            "A full shot list built around Saaga's own office; the client-provided location keeps the day efficient and the budget lean",
          ],
        },
        {
          kind: 'section',
          heading: 'Production Day (Week 8)',
          items: [
            'One full-day, multi-camera shoot (video + audio) on location at Saaga',
            'Up to 6 long-form segments (10-20 minutes each) featuring Juan Pablo and, if useful, senior team members or an outside guest',
            'B-roll capture for use across the website, sales app, and social content',
          ],
        },
        {
          kind: 'section',
          heading: 'Post-Production & Repurposing (Week 9)',
          items: [
            'Long-form edits of all segments, captioned in English and Spanish',
            '20-30 short-form clips cut for LinkedIn, Instagram, and YouTube Shorts: the content that carries the brand between production days',
            'Episode art, thumbnails, and a distribution-ready content calendar for the first repurposing cycle',
          ],
        },
        { kind: 'deliverable', text: "a quarter's worth of long- and short-form content, ready to publish or hand to the retainer team." },
      ],
    },

    // 9 — Phase 3 Launch
    {
      id: 'phase-3',
      type: 'phase',
      eyebrow: 'Phase 3',
      title: 'Launch',
      timeframe: 'Week 10',
      beats: [
        { kind: 'intro', text: 'A coordinated rollout, not a quiet flip of a switch. The website, sales app, and first content wave launch together so every audience sees one consistent story at once.' },
        {
          kind: 'section',
          heading: 'Launch Checklist',
          items: [
            'Website goes live; redirects and analytics confirmed',
            'Sales app deployed to the team, with a working session on how to use it in a live meeting',
            'First content wave published across LinkedIn (primary channel) and Instagram',
            'Printed pamphlet, pitch deck, and COI one-pager delivered print-ready, built from the same identity and messaging as everything else',
            'A short internal announcement kit so the team, and select clients, hear about the new presence directly from Saaga',
          ],
        },
        { kind: 'deliverable', text: "everything above, live, tested, and in the team's hands." },
      ],
    },

    // 10 — Phase 4 Growth Partnership
    {
      id: 'phase-4',
      type: 'phase',
      eyebrow: 'Phase 4',
      title: 'Ongoing Growth Partnership',
      timeframe: 'Month 3 onward',
      beats: [
        { kind: 'intro', text: 'The build phase creates the assets. This phase keeps them working: consistent presence, fresh content every month, and a larger production day twice a year so the library never goes stale.' },
        {
          kind: 'section',
          heading: 'Monthly',
          items: [
            'Social media management: content calendar, scheduling, and community management, LinkedIn-led, with Instagram in support',
            'A basic monthly content shoot: lightweight, phone-quality photo and video captured on-site each month, for real-time social content between the larger production days',
            'Repurposing of the existing video library into new posts, carousels, and clips',
            'Light website and AI concierge/app updates: new insights, refreshed FAQs, seasonal messaging',
            'Email and client newsletter, sent on a recurring schedule to clients and referral partners',
            "Compliance-ready first-pass review: Saaga provides its compliance requirements up front, and every piece of content is checked against that checklist before it moves to Saaga's compliance officer or counsel for final sign-off",
            "Monthly reporting: what was published, what resonated, and what we'd adjust",
          ],
        },
        {
          kind: 'section',
          heading: 'Quarterly',
          items: ["A strategy check-in to review what's working and re-prioritize the next quarter"],
        },
        {
          kind: 'section',
          heading: 'Twice a Year',
          items: ['A full production day, the same format as the founding shoot, to refresh the long-form library and keep it seasonal. Billed separately at $5,800 per shoot.'],
        },
        { kind: 'deliverable', text: 'a standing content and presence engine, reviewed and reported on monthly.' },
      ],
    },

    // 11 — Recommended Add-Ons
    {
      id: 'add-ons',
      type: 'cardGrid',
      eyebrow: 'Recommended Add-Ons',
      title: 'Rounding Out the System',
      intro: 'Not included in the core investment, but worth planning for: each of these extends the same brand and content system into a channel the strategy phase identified as high-value. Introduce after Stage 2 (the Growth Partnership) is running.',
      beats: [
        {
          title: 'Google Ads Management (Stage 3)',
          body: 'A narrow paid layer for branded search protection ("Saaga Wealth reviews," founder name), category-education intent ("outsourced family office Miami"), and senior-hire recruiting support — not broad UHNW prospecting, which stays referral-driven.',
          meta: '$1,500/mo management fee + $2,000-$3,000/mo ad spend',
        },
        {
          title: '"Saaga NextGen" Program Branding',
          body: "Packages Saaga's existing education sessions and book clubs for the 3rd and 4th generation of client families into something marketable: a program name and mark, a one-page overview, a short curriculum outline, and a website page tied to the Continuity pillar.",
        },
        {
          title: 'Referral-Partner Salon Toolkit',
          body: 'Invitation design, a simple event microsite, and a follow-up email sequence, ready to deploy whenever Saaga hosts an invitation-only dinner or salon for clients and COIs.',
        },
      ],
    },

    // 12 — Timeline
    {
      id: 'timeline',
      type: 'timeline',
      eyebrow: 'Timeline',
      title: 'The Full Arc, at a Glance',
      beats: [
        { kind: 'intro', text: "Discovery runs first and alone; the website build begins immediately after, with the sales app sprinting in behind it once the visual system and messaging are locked. Production is scheduled last, once the story is final, not a draft of it, and shot in a single day at Saaga's own office." },
        {
          kind: 'segments',
          segments: [
            { phase: '0 · Discovery & Strategy', timeframe: 'Weeks 1-2', milestone: 'Build-ready brief approved' },
            { phase: '1A · Website + AI Concierge', timeframe: 'Weeks 3-6', milestone: 'Site live, staging reviewed' },
            { phase: '1B · AI Sales App', timeframe: 'Weeks 6-7', milestone: 'App deployed & team trained' },
            { phase: '2 · Podcast / Video Production', timeframe: 'Week 8-9', milestone: 'Shoot day + first content wave edited' },
            { phase: '3 · Launch', timeframe: 'Week 10', milestone: 'Website, app & content go live together' },
            { phase: '4 · Growth Partnership', timeframe: 'Month 3 onward', milestone: 'Monthly management begins' },
          ],
        },
        { kind: 'intro', text: 'Total time to launch: approximately 10 weeks (about 2.5 months) from kickoff, with the retainer beginning immediately after.' },
      ],
    },

    // 13 — Investment Summary
    {
      id: 'investment',
      type: 'investment',
      eyebrow: 'Investment',
      title: 'Investment Summary',
      intro: 'Presented as a single build package and a single monthly partnership, not itemized line-by-line, because this is one integrated system, built and delivered together.',
      beats: [
        {
          kind: 'number',
          amount: 42000,
          prefix: '$',
          label: 'One-Time Build Investment',
          items: [
            'Discovery & Brand Foundation — stakeholder interviews, messaging architecture, sitemap, AI conversation design',
            'Brand Identity, Message & Narrative — visual identity guidelines, one-page messaging framework, voice and tone guide, and the Financial Hospitality narrative arc, EN/ES',
            'Website + AI Concierge — bilingual design & build, CMS, trained AI concierge, SEO foundation',
            'Interactive AI Sales App — adaptive presentation, cost calculator, embedded AI assistant, leave-behind mode',
            'Podcast & Video Production — one shoot day at Saaga\'s office, up to 6 long-form edits, 20-30 repurposed clips',
            'Sales, Referral & Print Collateral — final pitch deck, a COI one-pager, and printed pamphlet/brochure collateral',
          ],
        },
        {
          kind: 'number',
          amount: 4000,
          prefix: '$',
          suffix: '/mo',
          label: 'Monthly Partnership',
          items: [
            'Social Media Management — LinkedIn-led content calendar, scheduling, community management, monthly reporting',
            'Basic Monthly Content Shoot — lightweight, phone-quality photo & video capture each month',
            'Content & Web Maintenance — video repurposing, website & AI concierge updates',
            'Email & Newsletter Management — recurring send to clients and referral partners',
            "Compliance-Ready First-Pass Review — checked against Saaga's own compliance checklist before sign-off",
          ],
        },
        { kind: 'line', text: 'Production Day (twice a year, edited & repurposed): $5,800/shoot. Retainer begins at launch (Month 3) with a 3-month minimum commitment, then continues month-to-month.' },
      ],
    },

    // 14 — Everything In This Package
    {
      id: 'everything',
      type: 'checklist',
      eyebrow: 'At a Glance',
      title: 'Everything In This Package',
      intro: 'Every deliverable across the build and the ongoing partnership, in one place.',
      beats: [
        {
          heading: 'One-Time Build, $42,000',
          variant: 'included',
          items: [
            'Discovery & Brand Foundation',
            'Brand Identity, Message & Narrative',
            'Website + AI Concierge',
            'Interactive AI Sales App',
            'Podcast & Video Production (founding shoot)',
            'Sales, Referral & Print Collateral',
          ],
        },
        {
          heading: 'Monthly Partnership, $4,000/mo',
          variant: 'included',
          items: [
            'Social Media Management',
            'Basic Monthly Content Shoot',
            'Content & Web Maintenance',
            'Email & Newsletter Management',
            'Compliance-Ready First-Pass Review',
          ],
        },
        {
          heading: 'Also Included',
          variant: 'included',
          items: ['Production Day, twice a year ($5,800/shoot)'],
        },
        {
          heading: 'Recommended For Later',
          variant: 'recommended',
          items: ['Google Ads Management (Stage 3)', '"Saaga NextGen" Program Branding', 'Referral-Partner Salon Toolkit'],
        },
      ],
    },

    // 15 — Payment Schedule & Terms
    {
      id: 'terms',
      type: 'richText',
      eyebrow: 'Terms',
      title: 'Payment Schedule & Terms',
      beats: [
        {
          heading: 'Build Phase (Phases 0-3)',
          listStyle: 'bullet',
          list: [
            { text: '50% due at signing to begin Discovery and secure the production and design calendar' },
            { text: '25% due at design/content approval (end of Phase 1, before development and the production shoot)' },
            { text: '25% due at launch' },
          ],
        },
        {
          heading: 'Growth Partnership (Phase 4)',
          listStyle: 'bullet',
          list: [
            { text: "Billed monthly in advance; each semi-annual production day billed separately, at the time it's scheduled" },
            { text: '3-month minimum commitment, then month-to-month with 30 days\' notice to pause or cancel' },
          ],
        },
        {
          heading: 'Notes',
          listStyle: 'bullet',
          list: [
            { text: 'Figures assume content and access (logins, existing brand assets, client references for testimonials) are provided within 5 business days of request' },
            { text: 'Two rounds of revisions are included at each major milestone; additional rounds are billed at our standard hourly rate' },
            { text: "Saaga provides its compliance requirements up front; content is screened against that checklist before publication. Final compliance sign-off remains with Saaga's compliance officer or counsel, not Marketingverse" },
            { text: 'This proposal is valid for 30 days from the date on the cover' },
          ],
        },
      ],
    },

    // 16 — Let's Get Started
    {
      id: 'cta',
      type: 'cta',
      beats: [
        { kind: 'headline', text: "Let's Build the Confidence Saaga's Clients Already Feel." },
        {
          kind: 'steps',
          steps: [
            { title: 'Confirm scope', text: 'A short call to walk through this proposal together and adjust anything before signing.' },
            { title: 'Sign & schedule', text: 'Signed agreement and the first invoice; we schedule Discovery interviews and the production day around your calendar.' },
            { title: 'Kickoff', text: 'Week 1 begins with stakeholder interviews, and the clock starts.' },
          ],
        },
        { kind: 'button', label: 'Schedule the Kickoff Call', url: BOOKING_URL },
      ],
    },
  ],
};
