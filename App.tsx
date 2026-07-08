import React, { useState, useEffect, useMemo, useRef, useCallback, Component } from 'react';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
          <h2 className="text-2xl font-bold">Oops — something went wrong.</h2>
          <button
            className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-neutral-800 transition-colors"
            onClick={() => { window.location.href = '/'; }}
          >
            Return Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
import { Menu, X, ArrowRight, Check, ExternalLink, Instagram, Facebook, PenTool, Cpu, Layers, TrendingUp, Heart, Maximize2, ClipboardList, Megaphone, Calculator, MessageSquare, Headphones, Briefcase, Users, Quote, Shield, Plus, ArrowUp, ShoppingCart, Trash2, ChevronLeft, ChevronRight, Mic, Wand2, Sparkles, Loader2, RotateCcw, Lock, Settings, Video, Image as ImageIcon, Save, Play, Copy, Calendar, User as UserIcon, Star, Bell, Target, Zap, Building2, LayoutDashboard, Smartphone, Mail, Share2, MessageCircle, Globe, CreditCard, Bot, Phone, FileText, CheckCircle2, Tag, GitBranch, RefreshCcw, UserPlus, MapPin, Linkedin, Youtube, Twitter } from 'lucide-react';
import { AIBot } from './components/AIBot';
import { ReviewsWidget } from './components/ReviewsWidget';
import { CustomCursor } from './components/CustomCursor';
import { RevealOnScroll } from './components/RevealOnScroll';
import { WorkflowSimulator } from './components/WorkflowSimulator';
import { N8NWorkflowVisualizer } from './components/N8NWorkflowVisualizer';
import { AbstractBackground } from './components/AbstractBackground';
import { TypewriterText } from './components/TypewriterText';
import { Plan, Project, Service, WorkflowCategory, BlogPost } from './types';
import { GoogleGenAI } from "@google/genai";

// --- Helper Functions ---

const openPaymentPopup = (url: string) => {
  const width = 600;
  const height = 800;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);
  window.open(
    url,
    'MarketingversePayment',
    `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
  );
};

// --- Initial Data ---

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Neon Commerce Scale-up',
    category: 'Social Media',
    description: 'Increased organic reach by 400% in 3 months for a streetwear brand.',
    imageUrl: 'https://picsum.photos/600/400?random=1'
  },
  {
    id: 'p2',
    title: 'FinTech AI Support',
    category: 'AI Automation',
    description: 'Deployed a custom Gemini-powered support bot reducing ticket volume by 60%.',
    imageUrl: 'https://picsum.photos/600/400?random=2'
  }
];

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The "Lazy" CEO’s Guide to AI: Why Working Hard is So 2023',
    excerpt: 'Hustle culture lied to you. You don\'t need to wake up at 4 AM to dominate your market—you just need better scripts.',
    content: `Let’s be honest: "Hustle Culture" is exhausted. If you're still bragging about 80-hour work weeks in Miami or Manhattan, you're not winning; you're inefficient. The era of the "Grind" is dead, replaced by the era of the "Flow."

Enter the "Lazy" CEO. This isn't about sitting on a beach (though that's a nice perk); it's about leverage. AI agent swarms don't sleep, they don't complain about coffee breaks, and they process data faster than your entire ops team combined.

We recently helped a logistics firm in Austin replace their entire manual dispatch system with an N8N workflow. The result? The owner went from answering calls at 2 AM to… sleeping. 

The secret isn't working harder. It's building systems that work so you don't have to. If your business can't run for a week without you, you don't own a business; you own a job. Time to fire yourself from the grunt work.`,
    date: 'Dec 12, 2024',
    category: 'Productivity',
    author: 'Marketingverse Team',
    imageUrl: 'https://picsum.photos/800/600?random=101'
  },
  {
    id: 'b2',
    title: 'Your Brand Voice Sounds Like a Robot (Here’s How to Fix It)',
    excerpt: 'If I see one more LinkedIn post starting with "Delve into the landscape," I might actually scream. Authenticity is the new currency.',
    content: `We need to talk about "ChatGPT Voice." You know what I mean. The sentences are too perfect. The adjectives are "robust" and "transformative." It feels like a corporate press release written by a calculator.

In a world drowning in synthetic content, the most valuable asset you have is your humanity. But wait—doesn't Marketingverse sell AI? Yes. But we sell *smart* AI.

The trick isn't asking AI to "write a post." It's about Fine-Tuning. We take your last 500 emails, your Slack history, and your transcripts, and we build a "Style LoRA" (Low-Rank Adaptation) that actually sounds like *you*.

Don't let default settings destroy your brand equity. If your AI sounds like a robot, it’s not the AI’s fault. It’s your prompt’s fault.`,
    date: 'Dec 08, 2024',
    category: 'Branding',
    author: 'Elena Vance',
    imageUrl: 'https://picsum.photos/800/600?random=102'
  },
  {
    id: 'b3',
    title: 'SEO in the Age of SGE: Why "Keywords" Are Dying',
    excerpt: 'Google is changing. Search Generative Experience (SGE) means users might never visit your website. Here is how to survive.',
    content: `The old SEO playbook: Stuff keywords, buy backlinks, pray to the Google Gods. 
    
    The new SEO playbook: Information Gain.
    
    With Google's SGE (Search Generative Experience), the search engine gives the answer directly. If your blog just regurgitates what everyone else says, you are invisible. You need to provide unique data, contrarian opinions, or personal anecdotes that an LLM cannot hallucinate.

    For local businesses—from London dentists to Toronto roofers—this means "Entity Authority." Does the Knowledge Graph know who you are? Are your reviews responding automatically with semantic richness? 
    
    Stop optimizing for robots. Start optimizing for the "Click-Through to Reality."`,
    date: 'Nov 28, 2024',
    category: 'Marketing',
    author: 'Marketingverse Team',
    imageUrl: 'https://picsum.photos/800/600?random=103'
  },
  {
    id: 'b4',
    title: 'Content Alchemy: Turning One Zoom Call into 30 Assets',
    excerpt: 'Stop creating content from scratch every day. It is inefficient and painful. Learn the "Waterfall" method.',
    content: `Here is a tragedy I see every day: A founder gives a brilliant 30-minute talk on a Zoom call, and it vanishes into the ether. Gone forever.

    This is waste. At Marketingverse, we practice "Content Alchemy." 
    
    1. **The Source:** Record the video.
    2. **The Transmute:** AI extracts the transcript.
    3. **The Distill:** Gemini Pro summarizes it into a LinkedIn Carousel.
    4. **The Spark:** Claude 3.5 Sonnet writes a witty Twitter thread.
    5. **The Visual:** Midjourney creates a thumb-stopping cover image.
    6. **The Clip:** Opus Clip cuts the video into 5 viral TikToks.

    One input. Thirty outputs. Total time cost: 0 minutes (if you automate it). Welcome to the machine.`,
    date: 'Nov 15, 2024',
    category: 'Content',
    author: 'Elena Vance',
    imageUrl: 'https://picsum.photos/800/600?random=104'
  },
  {
    id: 'b5',
    title: 'The Math of Missed Calls: Why Your Voicemail is Burning Cash',
    excerpt: 'If you are a local service business, a missed call is a missed mortgage payment. AI Voice Agents are the receptionists that never sleep.',
    content: `Let’s do some napkin math. You run an HVAC company in Phoenix. Average job value: $450. You miss 3 calls a day because you're on a job site. That’s $1,350/day. That’s nearly $40k/month in lost revenue.

    Why? Because modern consumers don't leave voicemails. They hang up and call the next guy on Google Maps.

    This is where AI Voice Agents shine. We aren't talking about "Press 1 for Sales." We're talking about a human-sounding voice that picks up on the first ring, qualifies the lead, checks your calendar, and books the appointment directly into your CRM.

    It’s not "cool tech." It’s defensive revenue protection.`,
    date: 'Oct 30, 2024',
    category: 'Business',
    author: 'Marketingverse Team',
    imageUrl: 'https://picsum.photos/800/600?random=105'
  },
  {
    id: 'b6',
    title: 'Miami to Manhattan: The "Static-to-Video" Revolution in Real Estate',
    excerpt: 'Listing photos are boring. Drones are expensive. AI is animating the immobile and selling homes faster.',
    content: `Real Estate is a visual game. But for years, agents have been held hostage by videographer schedules and $2,000 drone packages. 

    Not anymore. New generative video models (like the ones powering our "Property Launchpad") can take a still image of a living room and generate a realistic camera pan, complete with shifting light and parallax depth.

    You can now turn a folder of iPhone photos into a cinematic 4K tour in minutes. For brokers in competitive markets like Miami or NYC, speed is everything. Getting a "video" listing up on TikTok before the photographer even edits their first photo? That's how you win the listing presentation.`,
    date: 'Oct 12, 2024',
    category: 'Real Estate',
    author: 'Marketingverse Team',
    imageUrl: 'https://picsum.photos/800/600?random=106'
  },
  {
    id: 'b7',
    title: 'Prediction: The Rise of the "One-Person Unicorn"',
    excerpt: 'Sam Altman predicts we will see a billion-dollar company run by a single person. Here is how they will do it.',
    content: `It sounds insane. A billion-dollar valuation with one employee? But look at the trajectory.
    
    Instagram had 13 employees when it was bought for $1B. WhatsApp had 55 when it sold for $19B. The headcount required to generate massive value is collapsing.

    The "One-Person Unicorn" won't be a genius coder doing it all. They will be a genius *orchestrator*. They will manage a fleet of AI agents: a Marketing Agent, a Sales Agent, a fulfillment bot, and a finance algorithm. 

    The skill of the future isn't "doing." It's "directing." Are you ready to be the conductor of your own digital orchestra?`,
    date: 'Sep 28, 2024',
    category: 'Future Trends',
    author: 'Elena Vance',
    imageUrl: 'https://picsum.photos/800/600?random=107'
  },
  {
    id: 'b8',
    title: 'TikTok SEO: The Hidden Goldmine You’re Ignoring',
    excerpt: 'Gen Z does not Google it. They TikTok it. If your video scripts aren\'t optimized for search, you don\'t exist.',
    content: `Google has a problem. Young people don't trust it. They trust faces. They trust video. When they want to know "Best brunch in Chicago" or "How to invest in stocks," they go to TikTok.

    But here is what most marketers miss: TikTok is a Search Engine, not just a viral slot machine. 

    The words you speak in your video, the text on screen, and your caption are all indexed. If you aren't treating your script like an SEO blog post, you are missing 50% of the traffic. 

    We use AI to reverse-engineer trending search queries and inject them naturally into video scripts. It’s not about dancing; it’s about answering questions.`,
    date: 'Sep 15, 2024',
    category: 'Social Media',
    author: 'Marketingverse Team',
    imageUrl: 'https://picsum.photos/800/600?random=108'
  },
  {
    id: 'b9',
    title: 'Hyper-Personalization: Stalking (Legally) at Scale',
    excerpt: 'Cold email is dead. Long live "Warm AI." How to automate networking without losing your soul.',
    content: `Nobody reads generic cold emails. "I hope this email finds you well" is the digital equivalent of a limp handshake.

    But imagine this: You receive an email that references the podcast you appeared on last week, compliments a specific point you made about supply chains, and relates it to a solution. You'd reply, right?

    Now imagine doing that for 1,000 people a day. That is "Warm AI." By combining scraping tools (like Clay or Apollo) with LLMs, we can analyze a prospect's entire digital footprint and generate a "p.s." line that proves you did your homework.

    It’s scaling intimacy. And it converts like crazy.`,
    date: 'Aug 30, 2024',
    category: 'Sales',
    author: 'Elena Vance',
    imageUrl: 'https://picsum.photos/800/600?random=109'
  },
  {
    id: 'b10',
    title: 'The Death of the Stock Photo: Why Generative Imagery Wins',
    excerpt: 'Generic men in blue suits shaking hands? Boring. Visuals are the first hook, and custom generation is the only way to stand out.',
    content: `We have all seen it. The "Corporate Happy Team" photo. The "Woman Laughing at Salad." Stock photos are the elevator music of the internet—inoffensive, ubiquitous, and completely ignored.

    Generative AI (Midjourney, Flux, Imagen) allows brands to create visuals that actually *mean* something. You can create a mascot in your brand colors, a surreal landscape that stops the scroll, or a hyper-specific diagram that explains your product perfectly.

    Your visual identity is the first thing a customer judges. Don't let it be generic. In the Marketingverse, we believe every pixel should fight for attention.`,
    date: 'Aug 14, 2024',
    category: 'Design',
    author: 'Marketingverse Team',
    imageUrl: 'https://picsum.photos/800/600?random=110'
  }
];

const SERVICES: Service[] = [
  {
    id: 'social',
    title: 'Social Media',
    description: 'We build your community and amplify your voice across all major platforms.',
    icon: 'Instagram',
    features: ['Content Calendar', 'Community Engagement', 'Analytics Reporting']
  },
  {
    id: 'content',
    title: 'Content Marketing',
    description: 'Strategic storytelling that ranks high and converts readers into loyal customers.',
    icon: 'PenTool',
    features: ['SEO Blog Writing', 'Email Newsletters', 'Whitepapers & E-books']
  },
  {
    id: 'ai',
    title: 'AI Automations',
    description: 'Future-proof your workflows with custom AI agents and process automation.',
    icon: 'Cpu',
    features: ['Custom Chatbots', 'Workflow Automation', 'CRM Integration']
  },
  {
    id: 'crm',
    title: 'Broker CRM',
    description: 'Complete CRM and marketing suite designed specifically for Real Estate Brokers.',
    icon: 'Building2',
    features: ['Agent Management', 'Automated Workflows', 'Reputation Management']
  }
];

const SOCIAL_PLANS: Plan[] = [
  {
    name: 'Growth',
    price: '$450',
    description: 'Aggressive growth strategy for brands ready to scale rapidly.',
    recommended: true,
    features: ['1-1 Coaching', 'Brand Creation', 'Monthly Content shoot', '8 Video Posts', 'Community Management', '2 IG Boosts'],
    paymentLink: 'https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/SocialMediaGrowth'
  },
  {
    name: 'Dominance',
    price: '$850',
    description: 'Full-service content production and viral strategy.',
    features: ['Everything in Growth plan', 'Extra Video Content Shoot', 'Email Marketing', 'TikTok & GMB', '4 IG Boosts'],
    paymentLink: 'https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/SocualMediaDominance'
  }
];

const AI_PLANS: Plan[] = [
  {
    name: 'Pilot',
    price: '$1,500',
    description: 'Entry-level automation to solve specific bottlenecks.',
    features: ['1 Custom AI Workflow', 'Chatbot Integration (Web)', 'Basic CRM Connection', 'Training & Handoff', 'Standard Maintenance'],
    paymentLink: 'https://buy.stripe.com/test_pilot'
  },
  {
    name: 'Efficiency',
    price: '$4,500',
    description: 'Department-wide overhaul to maximize productivity.',
    recommended: true,
    features: ['3 Complex AI Workflows', 'Omnichannel AI Agents', 'Full CRM/ERP Integration', 'Staff AI Training', 'Priority Support & Updates'],
    paymentLink: 'https://buy.stripe.com/test_efficiency'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Fully autonomous agent swarms for large organizations.',
    features: ['Unlimited Workflows', 'Custom LLM Fine-tuning', 'On-premise Deployment', 'Dedicated Engineer', 'White-label Options'],
    paymentLink: '#ai-consultation'
  }
];

const BROKER_CRM_PLANS: Plan[] = [
  {
    name: 'Broker CRM Essential',
    price: '$450',
    description: 'The essential toolkit for modern brokerages.',
    features: [
      'Monthly Newsletter',
      '2 Email Campaigns',
      '2 SMS Cold Reach',
      'Landing Page',
      'Social Media Management Platform',
      'Reputation Management (Google & FB)',
      'Review Request Links',
      'Chat Widget',
      '10 Forms, 10 Custom Fields',
      '10 Trigger Links, 3 QR Codes',
      '3 Calendars',
      '2 Automated Workflows',
      'Access To Email & Website Templates'
    ],
    paymentLink: 'https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/CRM_Essential_Brokers'
  },
  {
    name: 'Broker CRM Pro',
    price: '$850',
    description: 'Advanced marketing and analytics for Brokers and their agents.',
    recommended: true,
    features: [
      'Everything in Essential, plus:',
      'Broker Branded Landing Page For Agents',
      '6 Broker Branded Emails For Agents',
      'Whatsapp Integration',
      'Google & FB Ads Analytics Setup',
      'Bi-Weekly Newsletter',
      '+1 Email Campaign',
      '+3 Automation Workflows',
      '+4 SMS Campaigns',
      '+2 Calendars',
      'Landing Page Tweaks',
      'Unlimited Forms, QR Codes, Custom Fields'
    ],
    paymentLink: 'https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/CRM_Brokers_Pro'
  },
  {
    name: 'Broker CRM Dominance',
    price: '$3000',
    description: 'Full-scale automation and AI agents for market leaders.',
    features: [
      'Everything in Pro, plus:',
      'Ai Voice & Conversation Agent',
      'Ads Manager',
      'Weekly Newsletter',
      '+1 Landing Page',
      '+2 Emails Campaigns',
      '+2 Automation Workflows',
      '+4 SMS Campaigns',
      'Broker Branded Marketing Templates',
      'CRM Setup for up to 10 Agents ($80/ea addl.)'
    ],
    paymentLink: 'https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/CRM_Broker_Dominance'
  }
];

const AI_WORKFLOWS: WorkflowCategory[] = [
  {
    title: "Sales",
    icon: "TrendingUp",
    items: [
      "Niche study", "Market report", "Competition listening", "Analyze sales calls", 
      "Train team", "Follow up", "Appointments", "Sales Scripts", "Notes", "Reports", 
      "CRM integration", "Order fulfillment", "Price adjustment based on market", "Presentations"
    ]
  },
  {
    title: "Administrative",
    icon: "ClipboardList",
    items: [
      "Email labeling and forwarding", "Input data & organize", "Events and Appts in calendar", 
      "Meeting analysis and tasks", "Assistant tasks", "Upload to drive", 
      "Make confirmation calls", "Presentations",
      "Document parsing & OCR", "Travel & Itinerary planning", "Expense report generation",
      "Meeting transcription & summaries", "Vendor contract management"
    ]
  },
  {
    title: "Marketing",
    icon: "Megaphone",
    items: [
      "Lead generation", "Content creation", "Content repurposing", "Blogs, social, videos, x", 
      "Avatar creation", "Scraping and listening", "Market research & competitive analysis", 
      "Trend listening", "Campaign analytics", "Ad campaign creation and optimization", 
      "CRM integration", "AI widgets to website", "GEO/SEO", "Presentations", 
      "Email newsletters, offers, fun"
    ]
  },
  {
    title: "Accounting",
    icon: "Calculator",
    items: [
      "Compare vendors and notify if better ones enter market", 
      "Tax analysis and recommendations", "New important laws monitoring",
      "Automated invoice processing", "Expense categorization", "Cash flow forecasting",
      "Fraud detection alerts", "Payroll automation assistance", "Receipt scanning & entry"
    ]
  },
  {
    title: "Communication",
    icon: "MessageSquare",
    items: [
      "Relay messages based on context", "Natural conversations with clients", 
      "Onboard and classify clients", "Video Avatars for questions, coaching, announcements",
      "Real-time translation", "Sentiment analysis on client messages", 
      "Internal knowledge base Q&A", "Voice note transcription", "Slack/Teams workflow bots"
    ]
  },
  {
    title: "Customer Service",
    icon: "Headphones",
    items: [
      "Avatars", "Bots", "Call analysis", "Personalized follow ups", 
      "AI surveys", "Social listening for client insights"
    ]
  },
  {
    title: "Fulfillment",
    icon: "Briefcase",
    items: [
      "Personal assistant", "Call notes", "Reminders", "Follow ups", "Appointments", 
      "Access to company data (pulse of company)", "Travel reservations", 
      "Lunch reservations", "Coaching", "Email summaries and analysis", 
      "Reply to emails", "Research", "Compare vendors"
    ]
  },
  {
    title: "Human Resources",
    icon: "Users",
    items: [
      "Days off tracking", "Hiring process", "Pre-interview qualification", 
      "Interview analysis", "Social listening to qualify", "Rate candidates", 
      "Onboarding", "Training", "Offboarding", "Reports"
    ]
  },
  {
    title: "IT Operations",
    icon: "Shield",
    items: [
      "Automated ticket routing", "Password reset bots", "System uptime monitoring",
      "Security anomaly detection", "Log analysis & reporting", "Software license tracking",
      "Database maintenance automation", "Phishing threat detection", "Access control audits"
    ]
  },
  ];

const A_LA_CARTE_ITEMS = [
  { id: 'content-gen', title: 'Content Gen Suite', title_original: 'Content Gen Suite', description: 'Automated Blogs, Social Posts, Video Scripts & HeyGen Avatars' },
  { id: 'scrape-content', title: 'Scrape & Create Engine', description: 'Turn Apify scraped data into engaging content automatically' },
  { id: 'prop-pres', title: 'Property Launchpad', description: 'Generate stunning presentations & landing pages instantly' },
  { id: 'tour-followup', title: 'Tour Feedback Loop', description: 'Tour presentations with automated follow-up survey emails' },
  { id: 'voice-assist', title: 'AI Voice Assistant', description: 'Intelligent voice interface for hands-free operations' },
  { id: 'pic-video', title: 'Static-to-Video AI', description: 'Transform property photos into dynamic video tours' },
  { id: 'avatar-post', title: 'Avatar Auto-Poster', description: 'Create HeyGen videos and automatically post them' },
  { id: 'trend-leads', title: 'Trend Hunter', description: 'Scrape Google Trends to identify and capture new leads' },
  { id: 'content-cal', title: 'Content Ops Center', description: 'Generate content calendars & send WhatsApp alerts' },
  { id: 'market-intel', title: 'Market Intel Bot', description: 'Research trends & write updated market report emails' },
  { id: 'auto-sched', title: 'Auto-Scheduler', description: 'Email coordination for seamless appointment booking' },
  { id: 'monthly-reps', title: 'Owner Reporter', description: 'Send monthly property reports based on market comps' },
  { id: 'deal-arch', title: 'Deal Architect', description: 'Analyze offers, prepare counter-offers & draft emails' },
  { id: 'invest-anal', title: 'Investment Analyzer', description: 'Analyze OM presentations & email investment insights' },
  { id: 'voice-agent', title: 'Conversational Voice Agent', description: 'Advanced AI agent for handling inbound/outbound calls' },
];

// --- Sub-Components ---

const ClientsSection: React.FC = () => {
  const clients = [
    { name: "Avanti Way", logo: "AVANTI WAY" },
    { name: "Servat Group", logo: "SERVAT GROUP", subtitle: "luxury real estate" },
    { name: "Viacom", logo: "viacom" },
    { name: "Sony Music", logo: "SONY MUSIC" },
    { name: "Quaker", logo: "QUAKER" },
    { name: "Proper Cloth", logo: "PROPER CLOTH" },
    { name: "Havaianas", logo: "havaianas" },
    { name: "Nickelodeon", logo: "nickelodeon" },
    { name: "HBO", logo: "HBO" },
    { name: "Jessica Hausmann", logo: "JESSICA HAUSMANN", subtitle: "Elevated Real Estate" }
  ];

  return (
    <section className="py-24 bg-white/40 backdrop-blur-lg border-t border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Proven Performance</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by <span className="font-serif italic font-normal">Industry Leaders</span></h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              From global media giants to boutique luxury brands, we power the engines of tomorrow's market winners.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.map((client, i) => (
            <RevealOnScroll key={i} delay={i * 50}>
              <div className="aspect-video bg-white/60 border border-white/20 rounded-2xl flex flex-col items-center justify-center p-6 transition-all hover:shadow-xl hover:-translate-y-1 group grayscale hover:grayscale-0 backdrop-blur-sm">
                <span className={`font-black text-xl tracking-tighter text-center leading-none ${client.name === 'HBO' ? 'text-4xl' : ''}`}>
                  {client.logo}
                </span>
                {client.subtitle && (
                  <span className="text-[8px] uppercase tracking-widest text-neutral-400 mt-1 font-bold">
                    {client.subtitle}
                  </span>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const ZOHO_SCRIPT = 'https://static.zohocdn.com/zfwidgets/v1/hpwidgets/assets/js/zf-widget.js';

const ZohoWidget: React.FC<{ widgetId: string; digest: string }> = ({ widgetId, digest }) => {
  useEffect(() => {
    const tryInit = (attempts = 0) => {
      try {
        const ZF = (window as any).ZFWidget;
        if (ZF) {
          ZF.init();
          return;
        }
      } catch { /* ignore */ }
      if (attempts < 10) setTimeout(() => tryInit(attempts + 1), 300);
    };

    // Remove any existing Zoho script so it re-runs fresh on each mount
    const existing = document.querySelector(`script[src="${ZOHO_SCRIPT}"]`);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = ZOHO_SCRIPT;
    script.async = true;
    script.onload = () => setTimeout(tryInit, 100);
    document.body.appendChild(script);

    return () => {
      const s = document.querySelector(`script[src="${ZOHO_SCRIPT}"]`);
      if (s) s.remove();
    };
  }, [widgetId]);

  // dangerouslySetInnerHTML prevents React from reconciling Zoho's injected DOM
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<div id="${widgetId}" data-pricing-table="true" data-digest="${digest}" data-product_url="https://billing.zoho.com"></div>`
      }}
    />
  );
};

const SocialEcosystem: React.FC = () => {
  const feed = [
    { type: 'video', bg: 'from-rose-400 to-pink-600', label: 'Reel' },
    { type: 'photo', bg: 'from-violet-400 to-purple-600', label: '' },
    { type: 'photo', bg: 'from-amber-400 to-orange-500', label: '' },
    { type: 'video', bg: 'from-sky-400 to-blue-600', label: 'Reel' },
    { type: 'photo', bg: 'from-emerald-400 to-teal-600', label: '' },
    { type: 'video', bg: 'from-fuchsia-400 to-pink-500', label: 'Reel' },
  ];

  return (
    <div className="relative flex items-center justify-center py-8 select-none">
      {/* Soft glow behind phone */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#e879f940_0%,_#818cf820_40%,_transparent_70%)] pointer-events-none" />

      {/* ── Phone shell ── */}
      <div className="relative z-10" style={{ width: 240 }}>
        <div className="relative bg-neutral-900 rounded-[44px] shadow-[0_40px_100px_rgba(0,0,0,0.35)]" style={{ padding: '14px 10px' }}>
          {/* Buttons */}
          <div className="absolute -left-[3px] top-[88px] w-[3px] h-8 bg-neutral-700 rounded-l-full" />
          <div className="absolute -left-[3px] top-[126px] w-[3px] h-8 bg-neutral-700 rounded-l-full" />
          <div className="absolute -right-[3px] top-[108px] w-[3px] h-12 bg-neutral-700 rounded-r-full" />

          {/* Screen */}
          <div className="relative overflow-hidden rounded-[32px] bg-white" style={{ height: 480 }}>
            {/* Dynamic island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-20 h-5 bg-black rounded-full" />

            {/* Instagram header */}
            <div className="pt-9 px-3 pb-2 flex items-center justify-between border-b border-neutral-100">
              <span className="font-serif italic font-bold text-[15px] text-neutral-900">marketingverse</span>
              <div className="flex gap-2">
                <Heart size={16} className="text-neutral-700" />
                <MessageCircle size={16} className="text-neutral-700" />
              </div>
            </div>

            {/* Stories row */}
            <div className="flex gap-2 px-3 py-2 overflow-hidden">
              {['#f472b6','#818cf8','#34d399','#fb923c'].map((c, i) => (
                <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full ring-2 ring-offset-1" style={{ background: c, ringColor: c }} />
                  <span className="text-[8px] text-neutral-400 truncate w-9 text-center">{['brand','travel','food','life'][i]}</span>
                </div>
              ))}
            </div>

            {/* Feed grid */}
            <div className="grid grid-cols-3 gap-px bg-neutral-100 overflow-hidden" style={{ height: 330 }}>
              {feed.map((item, i) => (
                <div key={i} className={`relative bg-gradient-to-br ${item.bg} overflow-hidden`}>
                  {item.label && (
                    <div className="absolute bottom-1 left-1 flex items-center gap-0.5 bg-black/40 backdrop-blur-sm rounded px-1 py-0.5">
                      <Play size={7} className="text-white fill-white" />
                      <span className="text-[7px] text-white font-bold">{item.label}</span>
                    </div>
                  )}
                  {/* Abstract content shape */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-8 h-8 bg-white rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating engagement bubbles ── */}

      {/* Likes */}
      <div className="absolute top-10 -left-4 z-20 bg-white shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2 animate-[float_3s_ease-in-out_infinite]">
        <Heart size={14} className="text-rose-500 fill-rose-500" />
        <span className="text-xs font-bold text-neutral-800">4,821 <span className="text-neutral-400 font-normal">likes</span></span>
      </div>

      {/* Comment bubble */}
      <div className="absolute top-32 -right-6 z-20 bg-white shadow-xl rounded-2xl px-3 py-2 max-w-[130px] animate-[float_4s_ease-in-out_infinite_0.8s]">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-600" />
          <span className="text-[9px] font-bold text-neutral-700">@username</span>
        </div>
        <p className="text-[9px] text-neutral-500 leading-snug">This is exactly what I needed 🔥</p>
      </div>

      {/* Followers gained */}
      <div className="absolute bottom-32 -left-6 z-20 bg-white shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2 animate-[float_5s_ease-in-out_infinite_0.4s]">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
          <Users size={10} className="text-white" />
        </div>
        <div>
          <div className="text-[10px] font-bold text-neutral-800">+238</div>
          <div className="text-[8px] text-neutral-400">new followers</div>
        </div>
      </div>

      {/* Reach pill */}
      <div className="absolute bottom-20 -right-4 z-20 bg-black text-white shadow-xl rounded-full px-4 py-2 flex items-center gap-2 animate-[float_3.5s_ease-in-out_infinite_1.2s]">
        <TrendingUp size={12} className="text-green-400" />
        <span className="text-[10px] font-bold">Reach +450%</span>
      </div>

      {/* DM bubble */}
      <div className="absolute top-56 -left-2 z-20 bg-white shadow-xl rounded-2xl px-3 py-2 flex items-center gap-2 animate-[float_4.5s_ease-in-out_infinite_0.2s]">
        <MessageCircle size={13} className="text-blue-500" />
        <span className="text-[10px] font-bold text-neutral-700">12 new DMs</span>
      </div>

    </div>
  );
};

const SocialAdvantageSection: React.FC = () => {
  const items = [
    { icon: <Star size={20} />, title: "Dominant Branding", description: "Your 24/7 digital resume that builds instant trust with customers." },
    { icon: <Bell size={20} />, title: "Top-of-Mind Awareness", description: "Stay relevant to your target audience every single day, not just once a month." },
    { icon: <Users size={20} />, title: "Deepened Relationships", description: "Scale your personal touch and nurture past clients automatically." },
    { icon: <Target size={20} />, title: "Direct Prospecting", description: "High-velocity lead discovery through data-driven authority content." }
  ];

  return (
    <section className="py-24 bg-white/60 backdrop-blur-lg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <RevealOnScroll>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6 block">The Modern Business Engine</span>
              <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-8">
                Social Media is <br />
                <span className="font-serif italic font-normal">Too Powerful to Ignore.</span>
              </h2>
              <p className="text-lg text-neutral-500 mb-12 leading-relaxed max-w-lg">
                In today's fast-paced market, social media isn't just a platform—it's your digital storefront, your prospecting engine, and your primary relationship nurture tool.
              </p>
              
              <div className="space-y-8">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-white border border-neutral-100 flex items-center justify-center shrink-0 shadow-sm transition-all group-hover:bg-black group-hover:text-white group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column (The Stat Card) */}
          <RevealOnScroll delay={200}>
            <div className="relative">
              <div className="bg-neutral-900 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden group">
                {/* Header of card */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Users size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Consumer Choice</span>
                </div>

                {/* Big Stat */}
                <h3 className="text-8xl font-bold text-white mb-6">90%</h3>
                <p className="text-neutral-400 text-xl max-w-xs mb-12">
                  of consumers use social and web discovery to find their next brand partner.
                </p>

                <div className="h-px bg-white/10 mb-12" />

                {/* Previews */}
                <div className="grid grid-cols-3 gap-4 mb-10 items-start">
                   <div className="rounded-2xl overflow-hidden relative w-full border border-white/10 bg-black shadow-lg">
                     <VimeoFacade id="503202988" title="Casa Armani" />
                   </div>
                   <div className="rounded-2xl overflow-hidden relative w-full border border-white/10 bg-black shadow-lg">
                     <VimeoFacade id="878437211" title="Avanti" />
                   </div>
                   <div className="rounded-2xl overflow-hidden relative w-full border border-white/10 bg-black shadow-lg">
                     <VimeoFacade id="572254653" title="Artizan Film" />
                   </div>
                </div>

                {/* Footer text */}
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-600">Marketingverse Content Engine Preview</span>
                   <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                      <div className="w-6 h-1.5 rounded-full bg-white" />
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                   </div>
                </div>
              </div>

              {/* Decorative floating element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-neutral-100 rounded-full blur-3xl -z-10" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

const LiveAvatarDemo: React.FC = () => (
  <RevealOnScroll>
    <div className="mb-24">
      {/* Container: Frosted White */}
      <div className="bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative shadow-2xl">
        {/* Background blobs - adjusted for light theme */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        
        <div className="relative z-10 grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              {/* Badge */}
              <span className="px-3 py-1 bg-black/5 border border-black/5 text-black text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">Interactive Demo</span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                <span className="text-green-600 text-[10px] font-bold uppercase tracking-widest">Live</span>
              </div>
            </div>
            
            {/* Heading - Dark Text */}
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
              Meet Your <span className="font-serif italic font-normal">New</span> <br/>
              {/* Gradient text needs to be darker to read on white */}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">AI Support Agent</span>
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Experience the future of customer service. This autonomous interactive avatar can handle inquiries, book appointments, and provide 24/7 human-like support with zero latency.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-neutral-700 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center border border-white/60 shadow-sm">
                  <Mic size={14} className="text-black" />
                </div>
                <span>Microphone enabled conversation</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-700 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center border border-white/60 shadow-sm">
                  <Zap size={14} className="text-black" />
                </div>
                <span>Real-time emotional intelligence</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {/* Iframe container - Light glass */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-white/40 backdrop-blur-md relative" style={{ paddingTop: '56.25%' }}>
              <iframe 
                src="https://embed.liveavatar.com/v1/bb28ae02-2c79-41e6-a610-c104c8ad804e" 
                allow="microphone" 
                title="LiveAvatar Embed" 
                className="absolute top-0 left-0 w-full h-full border-none"
              ></iframe>
            </div>
            <div className="flex justify-between items-center mt-4 px-2">
              <p className="text-neutral-500 text-xs">
                * Click "Start" to begin the interaction
              </p>
               <span className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Powered by Marketingverse AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

// --- CRM Visualizer Components ---
const WorkflowNode = ({ icon, title, subtitle, type = 'default', active = false }: any) => (
  <div className={`
    relative z-10 flex items-center gap-3 p-4 rounded-xl border shadow-lg w-60 transition-all duration-500
    ${type === 'condition' ? 'bg-amber-50 border-amber-200' : 'bg-white border-neutral-100'}
    ${active ? 'scale-105 ring-2 ring-blue-500/20 shadow-blue-500/10' : 'scale-100 opacity-80'}
  `}>
    <div className={`
      w-10 h-10 rounded-lg flex items-center justify-center shadow-sm
      ${type === 'condition' ? 'bg-amber-100 text-amber-600' : 'bg-neutral-50 text-neutral-600'}
    `}>
      {icon}
    </div>
    <div>
      <div className="font-bold text-sm text-neutral-800">{title}</div>
      <div className="text-[10px] text-neutral-500 font-mono">{subtitle}</div>
    </div>
  </div>
);

const Connector = ({ vertical, small, active = false }: any) => (
  <div className={`flex justify-center items-center ${vertical ? (small ? 'h-8' : 'h-10') : 'w-8'}`}>
    <div className={`w-0.5 h-full transition-colors duration-500 ${active ? 'bg-blue-500' : 'bg-neutral-200'}`}></div>
  </div>
);

const CRMWorkflowVisualizer: React.FC = () => {
  const [activePath, setActivePath] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePath(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-20">
      <RevealOnScroll>
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold mb-4">Visual Workflow Builder</h3>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Design complex customer journeys with our drag-and-drop automation engine.
          </p>
        </div>
      </RevealOnScroll>

      <div className="w-full bg-neutral-50/90 backdrop-blur-md border border-neutral-200 rounded-3xl overflow-hidden relative min-h-[700px] flex flex-col shadow-xl">
        {/* Toolbar */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 p-4 flex justify-between items-center z-20 relative">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">Mverse Automations Builder</div>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-xs text-neutral-400">Last saved: Just now</span>
             <div className="px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full">Publish</div>
          </div>
        </div>
       
        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden bg-[radial-gradient(#e5e5e5_1px,transparent_1px)] [background-size:20px_20px] p-8 md:p-12 flex justify-center overflow-x-auto">
          <div className="flex flex-col items-center min-w-[800px] relative z-10">
             
             {/* Trigger Node */}
             <WorkflowNode 
               icon={<Tag size={18} className="text-blue-600" />} 
               title="Contact Tag Added" 
               subtitle="Tag: 'new lead'" 
               active={true}
             />
             
             <Connector vertical active={true} />
             
             {/* Action Node */}
             <WorkflowNode 
               icon={<Bot size={18} className="text-purple-600" />} 
               title="AI VerseBot" 
               subtitle="Action: Qualify Lead" 
               active={true}
             />
             
             <Connector vertical active={true} />
             
             {/* Condition Node */}
             <WorkflowNode 
               icon={<GitBranch size={18} className="text-amber-600" />} 
               title="Check Budget" 
               subtitle="Condition: > $5,000" 
               type="condition" 
               active={true}
             />
             
             {/* Branching Logic */}
             <div className="relative flex justify-center gap-12 mt-8 w-full">
                {/* SVG Connections for branches */}
                <svg className="absolute -top-8 left-0 w-full h-8 z-0 pointer-events-none overflow-visible">
                   {/* Base Lines */}
                   <path d="M 50% 0 L 50% 15 L 16% 15 L 16% 32" fill="none" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M 50% 0 L 50% 32" fill="none" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
                   <path d="M 50% 0 L 50% 15 L 84% 15 L 84% 32" fill="none" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                   
                   {/* Animated Highlighting Lines */}
                   {/* Left Path */}
                   <path 
                     d="M 50% 0 L 50% 15 L 16% 15 L 16% 32" 
                     fill="none" 
                     stroke={activePath === 0 ? "#3b82f6" : "transparent"} 
                     strokeWidth="3" 
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="transition-all duration-700"
                     style={{ 
                       strokeDasharray: '200',
                       strokeDashoffset: activePath === 0 ? '0' : '200',
                       opacity: activePath === 0 ? 1 : 0
                     }}
                   />
                   {/* Middle Path */}
                   <path 
                     d="M 50% 0 L 50% 32" 
                     fill="none" 
                     stroke={activePath === 1 ? "#3b82f6" : "transparent"} 
                     strokeWidth="3" 
                     strokeLinecap="round"
                     className="transition-all duration-700"
                     style={{ 
                       strokeDasharray: '100',
                       strokeDashoffset: activePath === 1 ? '0' : '100',
                       opacity: activePath === 1 ? 1 : 0
                     }}
                   />
                   {/* Right Path */}
                   <path 
                     d="M 50% 0 L 50% 15 L 84% 15 L 84% 32" 
                     fill="none" 
                     stroke={activePath === 2 ? "#3b82f6" : "transparent"} 
                     strokeWidth="3" 
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     className="transition-all duration-700"
                     style={{ 
                       strokeDasharray: '200',
                       strokeDashoffset: activePath === 2 ? '0' : '200',
                       opacity: activePath === 2 ? 1 : 0
                     }}
                   />
                </svg>

                {/* Branch 1: High Budget */}
                <div className={`flex flex-col items-center w-64 transition-all duration-500 ${activePath === 0 ? 'opacity-100 transform translate-y-0' : 'opacity-40 transform translate-y-2'}`}>
                   <div className="mb-3 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full shadow-sm">High Value Lead</div>
                   <WorkflowNode icon={<RefreshCcw size={16} />} title="Update Pipeline" subtitle="Stage: Hot Lead" active={activePath === 0} />
                   <Connector vertical small active={activePath === 0} />
                   <WorkflowNode icon={<UserPlus size={16} />} title="Assign Agent" subtitle="Round Robin: Luxury Team" active={activePath === 0} />
                   <Connector vertical small active={activePath === 0} />
                   <WorkflowNode icon={<MessageSquare size={16} />} title="SMS Intro" subtitle="Personalized Booking Link" active={activePath === 0} />
                </div>

                {/* Branch 2: Unsure */}
                <div className={`flex flex-col items-center w-64 transition-all duration-500 ${activePath === 1 ? 'opacity-100 transform translate-y-0' : 'opacity-40 transform translate-y-2'}`}>
                   <div className="mb-3 px-3 py-1 bg-neutral-200 text-neutral-600 text-[10px] font-bold uppercase rounded-full shadow-sm">Unknown Budget</div>
                   <WorkflowNode icon={<Bot size={16} />} title="AI Nurture" subtitle="Ask qualifying questions" active={activePath === 1} />
                   <Connector vertical small active={activePath === 1} />
                   <WorkflowNode icon={<Zap size={16} />} title="Wait" subtitle="24 Hours" active={activePath === 1} />
                   <Connector vertical small active={activePath === 1} />
                   <WorkflowNode icon={<Mail size={16} />} title="Follow-up Email" subtitle="Case study sent" active={activePath === 1} />
                </div>

                {/* Branch 3: Low Budget */}
                <div className={`flex flex-col items-center w-64 transition-all duration-500 ${activePath === 2 ? 'opacity-100 transform translate-y-0' : 'opacity-40 transform translate-y-2'}`}>
                   <div className="mb-3 px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded-full shadow-sm">Low Budget</div>
                   <WorkflowNode icon={<Tag size={16} />} title="Add Tag" subtitle="nurture-long-term" active={activePath === 2} />
                   <Connector vertical small active={activePath === 2} />
                   <WorkflowNode icon={<Mail size={16} />} title="Add to Newsletter" subtitle="Weekly drip campaign" active={activePath === 2} />
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPortal: React.FC<{ projects: Project[]; setProjects: React.Dispatch<React.SetStateAction<Project[]>>; onClose: () => void }> = ({ projects, setProjects, onClose }) => {
  const [newProject, setNewProject] = useState<Partial<Project>>({ title: '', category: '', description: '', imageUrl: '', videoUrl: '' });
  const [copied, setCopied] = useState(false);

  const handleAdd = () => {
    if (!newProject.title || !newProject.imageUrl) return;
    const p: Project = {
      ...newProject as Project,
      id: `p-${Date.now()}`
    };
    const updated = [p, ...projects];
    setProjects(updated);
    localStorage.setItem('mverse_projects', JSON.stringify(updated));
    setNewProject({ title: '', category: '', description: '', imageUrl: '', videoUrl: '' });
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('mverse_projects', JSON.stringify(updated));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(projects, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl p-6 md:p-12 overflow-y-auto animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Settings className="text-neutral-500" /> Project Command Center
            </h2>
            <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Marketingverse Admin Portal</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Add New Project</h3>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Project Title</label>
                <input value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none" placeholder="e.g. Real Estate AI Overhaul" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Category</label>
                <input value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none" placeholder="e.g. AI Automation" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Description</label>
                <textarea value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none h-32 resize-none" placeholder="Describe the impact..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Image URL</label>
                <input value={newProject.imageUrl} onChange={e => setNewProject({...newProject, imageUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none" placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-500 uppercase">Video URL (Optional)</label>
                <input value={newProject.videoUrl} onChange={e => setNewProject({...newProject, videoUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none" placeholder="https://..." />
              </div>
              <button onClick={handleAdd} className="w-full py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all">
                <Save size={18} /> Push Project to Site
              </button>
            </div>
            <button onClick={copyToClipboard} className="w-full py-4 bg-neutral-800 text-neutral-400 border border-neutral-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:text-white transition-all">
              {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copied JSON!' : 'Copy Code for Dev'}
            </button>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Active Portfolio ({projects.length})</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 group">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold truncate">{p.title}</h4>
                    <p className="text-neutral-500 text-xs mb-2">{p.category}</p>
                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div data-cursor="card" className="group relative bg-neutral-50/90 backdrop-blur-md rounded-3xl overflow-hidden border border-neutral-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="aspect-[16/10] overflow-hidden relative">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
        {project.videoUrl && (
          <button onClick={() => setShowVideo(true)} className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-transform">
              <Play className="text-black fill-current" size={24} />
            </div>
          </button>
        )}
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 block">{project.category}</span>
            <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
          </div>
          <button className="p-3 bg-white rounded-full border border-neutral-100 hover:bg-black hover:text-white transition-all shadow-sm">
            <ExternalLink size={18} />
          </button>
        </div>
        <p className="text-neutral-600 leading-relaxed">{project.description}</p>
      </div>
      {showVideo && (
        <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowVideo(false)}>
          <button aria-label="Close video" className="absolute top-8 right-8 text-white p-4 hover:bg-white/10 rounded-full transition-colors"><X size={32} /></button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <iframe src={project.videoUrl?.includes('vimeo') ? `${project.videoUrl}?autoplay=1` : project.videoUrl} className="w-full h-full" allow="autoplay; fullscreen" title={project.title} />
          </div>
        </div>
      )}
    </div>
  );
};

const VimeoFacade: React.FC<{ id: string; title?: string; aspect?: string }> = ({ id, title = '', aspect = '177.78%' }) => {
  const [active, setActive] = useState(false);
  const [thumb, setThumb] = useState('');
  const src = `https://player.vimeo.com/video/${id}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`;

  useEffect(() => {
    fetch(`https://vimeo.com/api/v2/video/${id}.json`)
      .then(r => r.json())
      .then(data => { if (data[0]?.thumbnail_large) setThumb(data[0].thumbnail_large); })
      .catch(() => {});
  }, [id]);

  return (
    <div style={{ paddingTop: aspect, position: 'relative' }} className="bg-neutral-900">
      {active ? (
        <iframe
          src={src}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          title={title}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      ) : (
        <button
          onClick={() => setActive(true)}
          aria-label={`Play ${title}`}
          className="absolute inset-0 w-full h-full group flex items-center justify-center"
          style={thumb ? {} : { background: 'linear-gradient(135deg, #a8edea 0%, #c9b8f5 40%, #f5c6d0 100%)' }}
        >
          {thumb && <img src={thumb} alt={title} className="absolute inset-0 w-full h-full object-cover" decoding="async" />}
          <span className="relative w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <Play size={22} className="text-black fill-current ml-0.5" />
          </span>
        </button>
      )}
    </div>
  );
};

const DeferredBgVideo: React.FC = () => {
  const [src, setSrc] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setSrc('https://player.vimeo.com/video/647525886?background=1&autoplay=1&loop=1&badge=0&autopause=0&player_id=0&app_id=58479'), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <section className="relative w-full h-[80vh] bg-black overflow-hidden" style={{ clipPath: 'inset(0)' }}>
      <div className="fixed inset-0 w-full h-full -z-10">
        {src && (
          <iframe
            src={src}
            className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            title="Avanti_AgentVideo_Guillermo Teran"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
};

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggle = () => setIsVisible(window.pageYOffset > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);
  return (
    <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 left-8 z-[90] p-4 bg-black text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-neutral-800 flex items-center justify-center ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <ArrowUp size={24} />
    </button>
  );
};

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden relative shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-neutral-100 transition-colors border border-neutral-200"><X size={24} /></button>
        <div className="w-full flex-1 overflow-hidden">
          <iframe src="https://api.leadconnectorhq.com/widget/booking/8pROsd9gdPhAtmnP5YHd" className="w-full border-none" style={{ height: 'calc(100% + 4px)', marginTop: '-4px' }} title="Booking Consultation" />
        </div>
      </div>
    </div>
  );
};

const ServiceIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'Instagram': return <Instagram size={32} />;
    case 'PenTool': return <PenTool size={32} />;
    case 'Cpu': return <Cpu size={32} />;
    case 'Building2': return <Building2 size={32} />;
    default: return <Layers size={32} />;
  }
};

const WorkflowIcon = ({ icon }: { icon: string }) => {
  const props = { size: 24 };
  switch (icon) {
    case 'TrendingUp': return <TrendingUp {...props} />;
    case 'ClipboardList': return <ClipboardList {...props} />;
    case 'Megaphone': return <Megaphone {...props} />;
    case 'Calculator': return <Calculator {...props} />;
    case 'MessageSquare': return <MessageSquare {...props} />;
    case 'Headphones': return <Headphones {...props} />;
    case 'Briefcase': return <Briefcase {...props} />;
    case 'Users': return <Users {...props} />;
    case 'Shield': return <Shield {...props} />;
    default: return <Layers {...props} />;
  }
};

const ConsultationCTA: React.FC<{ onBookConsultation: () => void }> = ({ onBookConsultation }) => (
  <RevealOnScroll delay={100}>
    <div className="w-full py-24 mv-glass rounded-[2.5rem] relative overflow-hidden mt-20 text-center px-8">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-indigo-200/50 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-violet-200/40 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-neutral-900">
          Ready To Take It <span className="font-serif italic font-normal text-violet-500">Up A Notch?</span>
        </h2>
        <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto">
          Book a free consultation to discuss your specific needs and find the perfect strategy for you.
        </p>
        <button
          onClick={onBookConsultation}
          data-cursor="magic"
          className="px-10 py-5 bg-neutral-950 text-white rounded-full font-bold text-lg hover:bg-black transition-all hover:scale-105 inline-flex items-center gap-3 shadow-xl"
        >
          Schedule Consultation <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </RevealOnScroll>
);

const CustomPlanBuilder: React.FC<{ onOrderNow: () => void }> = ({ onOrderNow }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isSummaryView, setIsSummaryView] = useState(false);

  const toggleItem = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleReviewSelection = () => {
    setIsSummaryView(true);
    const container = document.getElementById('plan-builder-container');
    if (container) container.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrder = () => {
    const selectedTitles = A_LA_CARTE_ITEMS.filter(i => selected.includes(i.id)).map(i => i.title).join(', ');
    const body = `Hi Marketingverse Team,%0D%0A%0D%0AI would like to order the following custom AI workflows:%0D%0A%0D%0A${selectedTitles}%0D%0A%0D%0APlease let me know the next steps.`;
    window.location.href = `mailto:hello@marketingverse.ai?subject=Order for Custom AI Workflows&body=${body}`;
    onOrderNow();
  };

  const selectedWorkflows = A_LA_CARTE_ITEMS.filter(item => selected.includes(item.id));

  return (
    <div id="plan-builder-container" className="py-20 border-t border-neutral-200 min-h-[600px]">
       {!isSummaryView ? (
         <>
           <RevealOnScroll>
             <div className="text-center mb-12">
               <h2 className="text-3xl font-bold mb-4">Build Your Custom A La Carte Plan</h2>
               <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                 Mix and match specific workflows to create a package that fits your exact needs.
               </p>
             </div>
           </RevealOnScroll>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
             {A_LA_CARTE_ITEMS.map((item, index) => {
                const isSelected = selected.includes(item.id);
                return (
                  <RevealOnScroll key={item.id} delay={index * 30}>
                    <div 
                      onClick={() => toggleItem(item.id)} 
                      className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 h-full flex flex-col relative group ${
                        isSelected 
                          ? 'bg-black text-white border-black shadow-lg transform scale-[1.02]' 
                          : 'bg-white/90 backdrop-blur-sm text-neutral-900 border-neutral-200 hover:border-black hover:shadow-md'
                      }`}
                      data-cursor="hover"
                    >
                       <div className="flex justify-between items-start mb-3">
                         <h3 className="font-bold text-lg pr-8">{item.title}</h3>
                         <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                           isSelected ? 'bg-white border-white' : 'border-neutral-300'
                         }`}>
                            {isSelected ? <Check size={14} className="text-black" /> : <Plus size={14} className="text-neutral-300 group-hover:text-black" />}
                         </div>
                       </div>
                       <p className={`text-sm leading-relaxed ${isSelected ? 'text-neutral-300' : 'text-neutral-600'}`}>
                         {item.description}
                       </p>
                    </div>
                  </RevealOnScroll>
                );
             })}
           </div>

           <div className={`fixed bottom-8 left-0 right-0 z-50 flex justify-center transition-all duration-500 transform ${selected.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
             <div className="bg-black text-white pl-6 pr-2 py-2 rounded-full shadow-2xl flex items-center gap-6 border border-neutral-800">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <ShoppingCart size={16} />
                   </div>
                   <span className="font-bold">{selected.length} Workflow{selected.length !== 1 && 's'} Selected</span>
                </div>
                <button 
                  onClick={handleReviewSelection}
                  className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2"
                >
                  Review Selection <ArrowRight size={16} />
                </button>
             </div>
           </div>
         </>
       ) : (
         <div className="animate-fade-in max-w-4xl mx-auto px-4">
            <button 
              onClick={() => setIsSummaryView(false)}
              className="mb-8 flex items-center gap-2 text-neutral-500 hover:text-black transition-colors font-medium"
            >
              <ChevronLeft size={20} /> Back to Selection
            </button>
            <div className="bg-neutral-50/90 backdrop-blur-md border border-neutral-200 rounded-3xl p-8 md:p-12 shadow-sm">
               <div className="flex justify-between items-end mb-10 border-b border-neutral-200 pb-8">
                  <div>
                     <h2 className="text-3xl font-bold mb-2">Custom Package Summary</h2>
                     <p className="text-neutral-600">Review your selected workflows before placing your order.</p>
                  </div>
               </div>
               <div className="space-y-6 mb-12">
                  {selectedWorkflows.map((item) => (
                    <div key={item.id} className="flex justify-between items-start gap-4 p-6 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                       <div>
                          <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                          <p className="text-neutral-500 text-sm">{item.description}</p>
                       </div>
                       <button 
                         onClick={() => {
                            toggleItem(item.id);
                            if (selected.length <= 1) setIsSummaryView(false);
                         }}
                         className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                       >
                         <Trash2 size={18} />
                       </button>
                    </div>
                  ))}
               </div>
               <div className="bg-black text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8">
                  <h3 className="text-xl font-bold">Ready to initiate your custom build?</h3>
                  <button 
                    onClick={handleOrder}
                    data-cursor="magic"
                    className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
                  >
                    Order Now <ArrowRight size={22} />
                  </button>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

const NAV_ITEMS = ['home', 'social', 'social-agents', 'crm', 'integrations', 'blog', 'projects', 'contact'] as const;
const navLabel = (id: string) => {
  if (id === 'social') return 'Social Media';
  if (id === 'social-agents') return 'For Agents';
  if (id === 'integrations') return 'AI Integrations';
  if (id === 'crm') return 'Broker CRM';
  if (id === 'projects') return 'Results';
  return id.charAt(0).toUpperCase() + id.slice(1);
};

interface SuccessMetric {
  label: string;
  growth: string;
  platform: string;
}

interface SuccessCase {
  client: string;
  niche: string;
  period: string;
  metrics: SuccessMetric[];
}

const SUCCESS_CASES: SuccessCase[] = [
  {
    client: 'Yael R.',
    niche: 'Real Estate Agent',
    period: 'Apr – Jun 2025',
    metrics: [
      { label: 'Instagram Views',        growth: '+44.8%',  platform: 'Instagram' },
      { label: 'Instagram Reach',        growth: '+562.1%', platform: 'Instagram' },
      { label: 'Instagram Interactions', growth: '+168.4%', platform: 'Instagram' },
      { label: 'Facebook Views',         growth: '+210%',   platform: 'Facebook'  },
      { label: 'Facebook Viewers',       growth: '+327.8%', platform: 'Facebook'  },
    ],
  },
  {
    client: 'Mauricio V.',
    niche: 'Real Estate Agent',
    period: 'Early Growth · Apr – Jun 2025',
    metrics: [
      { label: 'Facebook Views',         growth: '1.6K ↑273%',  platform: 'Facebook'  },
      { label: 'Facebook Viewers',       growth: '1.4K ↑396%',  platform: 'Facebook'  },
      { label: 'Instagram Views',        growth: '5.5K',         platform: 'Instagram' },
      { label: 'Instagram Reach',        growth: '1.8K ↑29%',   platform: 'Instagram' },
      { label: 'Content Interactions',   growth: '597 ↑20%',    platform: 'Instagram' },
    ],
  },
  {
    client: 'Mauricio V.',
    niche: 'Real Estate Agent',
    period: 'Growth Spike · May – Jun 2025',
    metrics: [
      { label: 'Facebook Views',         growth: '5.8K ↑325%',  platform: 'Facebook'  },
      { label: 'Facebook Viewers',       growth: '4.7K ↑336%',  platform: 'Facebook'  },
      { label: 'Instagram Views',        growth: '14.3K ↑20%',  platform: 'Instagram' },
      { label: 'Instagram Reach',        growth: '3.9K ↑30%',   platform: 'Instagram' },
    ],
  },
  {
    client: 'Judith A.',
    niche: 'Real Estate Agent',
    period: 'Launch Phase · Oct – Jan',
    metrics: [
      { label: 'Facebook Views',         growth: '106 ↑—',      platform: 'Facebook'  },
      { label: 'Facebook Reach',         growth: '32 ↑256%',    platform: 'Facebook'  },
      { label: 'Facebook Visits',        growth: '5 ↑150%',     platform: 'Facebook'  },
      { label: 'Instagram Views',        growth: '798 ↑418%',   platform: 'Instagram' },
      { label: 'Instagram Reach',        growth: '397 ↑1.8K%',  platform: 'Instagram' },
    ],
  },
  {
    client: 'Judith A.',
    niche: 'Real Estate Agent',
    period: 'Viral Moment · Feb – Mar 2025',
    metrics: [
      { label: 'Instagram Reach',        growth: '106.7K',       platform: 'Instagram' },
      { label: 'Reach Growth',           growth: '+11,400%',     platform: 'Instagram' },
      { label: 'Instagram Views',        growth: '125.8K',       platform: 'Instagram' },
      { label: 'Views Growth',           growth: '+2,000%',      platform: 'Instagram' },
    ],
  },
];

const PLATFORM_COLORS: Record<string, string> = {
  Instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  Facebook:  'bg-gradient-to-r from-blue-600 to-blue-400',
  LinkedIn:  'bg-gradient-to-r from-blue-800 to-cyan-500',
  TikTok:    'bg-gradient-to-r from-black to-neutral-600',
};

const SuccessCasesView: React.FC = () => (
  <div className="animate-fade-in relative z-10 pt-32 pb-24">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-20">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 block">Proven Results</span>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Client Wins</h2>
        <p className="text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Real numbers. Real agents. Here's what consistent, strategic content does to your metrics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {SUCCESS_CASES.map((sc, idx) => (
          <RevealOnScroll key={`${sc.client}-${idx}`} delay={idx * 60} className={SUCCESS_CASES.length % 2 !== 0 && idx === SUCCESS_CASES.length - 1 ? 'md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto' : ''}>
            <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{sc.client}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{sc.niche}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest bg-black text-white px-4 py-2 rounded-full">
                  {sc.period}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {sc.metrics.map((m) => (
                  <div key={m.label} className="bg-white border border-neutral-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${PLATFORM_COLORS[m.platform] ?? 'bg-neutral-400'}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{m.platform}</span>
                    </div>
                    <p className="text-3xl font-black text-black tracking-tight">{m.growth}</p>
                    <p className="text-xs text-neutral-500 mt-1 leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={200}>
        <div className="mt-20 rounded-3xl bg-black text-white p-12 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">Your turn</p>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to see your numbers move?</h3>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">Book a free strategy call and we'll map out a content plan built around your market.</p>
          <a
            href="https://api.leadconnectorhq.com/widget/booking/oyFVqTBrTOPpLRpShBRz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-neutral-100 transition-colors"
          >
            Book a Free Call
          </a>
        </div>
      </RevealOnScroll>
    </div>
  </div>
);

const NavBar: React.FC<{ active: string; setView: (v: string) => void; onBookConsultation: () => void }> = ({ active, setView, onBookConsultation }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const navigate = (id: string) => { setView(id); setMenuOpen(false); };

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100;
      setScrollPct(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 mv-glass border-b border-white/40" style={{ boxShadow: '0 1px 24px -16px rgba(15,23,42,.4)' }}>
      <div className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 transition-all duration-100" style={{ width: `${scrollPct}%` }} />
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        {/* Image logo with purple glow animation */}
        <button onClick={() => navigate('home')} data-cursor="magic" className="flex items-center">
          <img src="/logo.png" alt="Marketingverse" className="h-10 w-auto mv-logo-glow" />
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(id => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${active === id ? 'bg-black text-white' : 'text-neutral-500 hover:text-black hover:bg-neutral-100'}`}
            >
              {navLabel(id)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBookConsultation}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,.5)] transition-shadow"
          >
            Book a Strategy Call <ArrowRight size={15} />
          </button>
          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white/70"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/40 px-4 py-4 flex flex-col gap-1 animate-fade-in">
          {NAV_ITEMS.map(id => (
            <button
              key={id}
              onClick={() => navigate(id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${active === id ? 'bg-black text-white' : 'text-neutral-700 hover:bg-black hover:text-white'}`}
            >
              {navLabel(id)}
            </button>
          ))}
          <button
            onClick={() => { onBookConsultation(); setMenuOpen(false); }}
            className="mt-2 w-full bg-black text-white px-5 py-3 rounded-full text-sm font-bold hover:bg-neutral-800 transition-colors"
          >
            Book a Strategy Call
          </button>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC<{ onOpenAdmin: () => void; onNavigate: (v: string) => void }> = ({ onOpenAdmin, onNavigate }) => (
  <footer className="bg-black text-white pt-16 pb-10 border-t border-white/5 relative z-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
        {/* Brand */}
        <div className="flex flex-col gap-4 max-w-xs">
          <div className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
            Marketing<span className="font-serif font-normal" style={{ fontStyle: 'italic' }}>verse</span>
            <button onClick={onOpenAdmin} className="text-neutral-800 hover:text-neutral-500 transition-colors ml-1" title="Admin Portal">
              <Lock size={12} />
            </button>
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed">AI-native growth studio helping brokers, agents, and brands dominate their market.</p>
          <div className="flex gap-4 text-neutral-500 mt-1">
            <a href="https://www.facebook.com/themarketingverse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/the.marketingverse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={18} /></a>
          </div>
        </div>
        {/* Nav links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-1">Services</span>
            {[['Social Media', 'social'], ['Broker CRM', 'crm'], ['AI Integrations', 'integrations']].map(([label, view]) => (
              <button key={view} onClick={() => onNavigate(view)} className="text-neutral-400 hover:text-white transition-colors text-left">{label}</button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-1">Company</span>
            {[['Blog', 'blog'], ['Projects', 'projects'], ['Contact', 'contact']].map(([label, view]) => (
              <button key={view} onClick={() => onNavigate(view)} className="text-neutral-400 hover:text-white transition-colors text-left">{label}</button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 mb-1">Legal</span>
            <button onClick={() => onNavigate('privacy-policy')} className="text-neutral-400 hover:text-white transition-colors text-left">Privacy Policy</button>
            <button onClick={() => onNavigate('terms-and-conditions')} className="text-neutral-400 hover:text-white transition-colors text-left">Terms & Conditions</button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-neutral-600 text-xs">
        <span>© {new Date().getFullYear()} Marketingverse. All rights reserved.</span>
        <div className="flex gap-4">
          <button onClick={() => onNavigate('privacy-policy')} className="hover:text-neutral-400 transition-colors">Privacy Policy</button>
          <button onClick={() => onNavigate('terms-and-conditions')} className="hover:text-neutral-400 transition-colors">Terms & Conditions</button>
        </div>
      </div>
    </div>
  </footer>
);

/* ── Legal Pages ──────────────────────────────────────────────── */
const LegalPage: React.FC<{ title: string; lastUpdated: string; sections: { heading: string; body: string }[] }> = ({ title, lastUpdated, sections }) => (
  <div className="animate-fade-in relative z-10 pt-32 pb-24">
    <div className="max-w-3xl mx-auto px-4">
      <RevealOnScroll>
        <div className="mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          <p className="text-neutral-400 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </RevealOnScroll>
      <div className="space-y-10">
        {sections.map(({ heading, body }) => (
          <RevealOnScroll key={heading}>
            <div className="mv-glass rounded-3xl p-8">
              <h2 className="text-lg font-bold mb-3">{heading}</h2>
              <p className="text-neutral-600 leading-relaxed text-[15px] whitespace-pre-line">{body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </div>
);

const PRIVACY_SECTIONS = [
  { heading: '1. Information We Collect', body: 'We collect information you provide directly to us, such as when you fill out a contact form, book a consultation, or subscribe to our services. This may include your name, email address, phone number, company name, and any other information you choose to share.\n\nWe also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.' },
  { heading: '2. How We Use Your Information', body: 'We use the information we collect to:\n• Provide, maintain, and improve our services\n• Respond to your inquiries and fulfill your requests\n• Send you marketing communications (with your consent)\n• Analyze usage patterns to enhance user experience\n• Comply with legal obligations' },
  { heading: '3. Information Sharing', body: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and delivering our services, provided they agree to keep your information confidential.' },
  { heading: '4. Cookies & Tracking Technologies', body: 'We use cookies and similar tracking technologies to enhance your experience on our site. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our services may not function properly without cookies.' },
  { heading: '5. Data Security', body: 'We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.' },
  { heading: '6. Your Rights', body: 'Depending on your location, you may have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at hello@the-marketingverse.com. We will respond to your request within 30 days.' },
  { heading: '7. Third-Party Links', body: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.' },
  { heading: '8. Changes to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.' },
  { heading: '9. Contact Us', body: 'If you have questions about this Privacy Policy, please contact us at:\n\nMarketingverse\nhello@the-marketingverse.com\nhome.the-marketingverse.com' },
];

const TERMS_SECTIONS = [
  { heading: '1. Acceptance of Terms', body: 'By accessing or using the Marketingverse website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.' },
  { heading: '2. Services', body: 'Marketingverse provides social media management, broker CRM solutions, AI workflow integrations, and related marketing services. The specific scope, deliverables, and timelines for services are defined in individual service agreements or proposals agreed upon between Marketingverse and the client.' },
  { heading: '3. Client Responsibilities', body: 'You agree to:\n• Provide accurate and complete information as required for service delivery\n• Maintain the confidentiality of any account credentials\n• Use our services only for lawful purposes\n• Not attempt to interfere with the proper functioning of our platform\n• Obtain all necessary rights and permissions for content you provide to us' },
  { heading: '4. Intellectual Property', body: 'All content, designs, and materials created by Marketingverse remain our intellectual property until full payment is received. Upon receipt of full payment, ownership of deliverables transfers to the client as specified in the service agreement. Our proprietary tools, systems, and processes remain the exclusive property of Marketingverse.' },
  { heading: '5. Payment Terms', body: 'Payment terms are outlined in individual service agreements. Late payments may incur interest charges. Marketingverse reserves the right to pause or terminate services for accounts with outstanding balances. All fees are non-refundable unless otherwise specified in writing.' },
  { heading: '6. Confidentiality', body: 'Both parties agree to keep confidential any proprietary information shared during the course of the business relationship. This obligation survives the termination of any service agreement.' },
  { heading: '7. Limitation of Liability', body: 'Marketingverse shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the fees paid by the client in the three months preceding the claim.' },
  { heading: '8. Termination', body: 'Either party may terminate a service agreement with written notice as specified in that agreement. Upon termination, you remain responsible for any fees owed for services rendered up to the termination date.' },
  { heading: '9. Governing Law', body: 'These Terms and Conditions are governed by the laws of the State of Florida, United States. Any disputes shall be resolved in the courts of Miami-Dade County, Florida.' },
  { heading: '10. Changes to Terms', body: 'We reserve the right to modify these Terms at any time. Continued use of our services after changes are posted constitutes your acceptance of the revised terms.' },
  { heading: '11. Contact Us', body: 'For questions about these Terms and Conditions, contact us at:\n\nMarketingverse\nhello@the-marketingverse.com\nhome.the-marketingverse.com' },
];

// --- Voice Greeting ---
// Add your audio file URLs here. A random one plays once per session when
// the user scrolls past the hero. Rotate the array to add more greetings.
const GREETING_AUDIOS: string[] = [
  'https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/6a385aff1c5d711b35dec744.mp3',
  'https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/6a385b560a683b64fe5c053e.mp3',
  'https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/6a385c041c5d711b35ded514.mp3',
];

const VoiceGreeting: React.FC<{ heroRef: React.RefObject<HTMLElement | null> }> = ({ heroRef }) => {
  const [label, setLabel] = useState<string | null>(null);
  const played = useRef(false);

  useEffect(() => {
    if (!GREETING_AUDIOS.length) return;
    // Only play once per browser session
    if (sessionStorage.getItem('mv_greeted')) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !played.current) {
          played.current = true;
          sessionStorage.setItem('mv_greeted', '1');

          const src = GREETING_AUDIOS[Math.floor(Math.random() * GREETING_AUDIOS.length)];
          const audio = new Audio(src);
          audio.volume = 0.85;
          audio.play().catch(() => {}); // swallow autoplay blocks gracefully

          setLabel('🎙 A message for you');
          setTimeout(() => setLabel(null), 4000);
        }
      },
      { threshold: 0 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [heroRef]);

  if (!label) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-fade-in">
      <div className="flex items-center gap-3 bg-neutral-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-2xl backdrop-blur-sm border border-white/10">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        {label}
      </div>
    </div>
  );
};

// --- Views ---

const HomeView: React.FC<{ changeView: (v: string) => void; onBookConsultation: () => void }> = ({ changeView, onBookConsultation }) => {
  const heroRef = useRef<HTMLElement>(null);

  const handleServiceClick = (id: string) => {
    if (id === 'social') changeView('social-agents');
    else if (id === 'ai') changeView('integrations');
    else if (id === 'content') changeView('blog');
    else if (id === 'crm') changeView('crm');
  };

  return (
    <div className="animate-fade-in relative z-10">
      <VoiceGreeting heroRef={heroRef} />
      <section ref={heroRef} className="relative py-24 lg:py-36 text-center px-4">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-neutral-200/70 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
            </span>
            AI-Native Growth Studio
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-7 leading-[0.95]">
            Marketing<span className="mv-shimmer font-serif font-normal inline-block pr-2">verse</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">Scaling brands with <span className="font-serif italic">AI storytelling</span> and high-performance social workflows.</p>
          
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 mt-8 px-4">
            <button
              onClick={() => changeView('social-agents')}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-neutral-200 text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-50 hover:border-black hover:scale-105 transition-all shadow-sm group"
            >
              <Instagram size={20} className="group-hover:text-pink-400 transition-colors" />
              Social Media
            </button>
            <button
              onClick={() => changeView('crm')}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-neutral-200 text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-50 hover:border-black hover:scale-105 transition-all shadow-sm group"
            >
              <Building2 size={20} className="group-hover:text-blue-600 transition-colors" />
              Broker Engine
            </button>
            <button
              onClick={() => changeView('integrations')}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-neutral-200 text-black rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neutral-50 hover:border-black hover:scale-105 transition-all shadow-sm group"
            >
              <Bot size={20} className="group-hover:text-purple-600 transition-colors" />
              AI Automation
            </button>
          </div>

          <div className="mt-8">
             <button onClick={onBookConsultation} className="text-sm font-semibold text-neutral-400 hover:text-black flex items-center gap-2 mx-auto transition-colors group">
                 Not sure what you need? Book a Strategy Call <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
          </div>{/* end max-w-4xl */}
        </RevealOnScroll>
      </section>

      {/* 4-Step System Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">The Marketingverse Method</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                How You Go From <span className="font-serif italic font-normal">Invisible</span><br className="hidden md:block" /> to <span className="font-serif italic font-normal">Unforgettable</span>
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto text-lg">Four moves. No fluff. This is how brands stop chasing clients and start attracting them on repeat.</p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: <Wand2 size={22} />,
                color: 'from-violet-500/10 to-purple-500/5',
                accent: 'text-violet-600',
                ring: 'ring-violet-200',
                title: 'Clean Up Your Brand',
                subtitle: 'Make it feel like you.',
                body: 'Before you post a single thing, your brand needs to look, sound, and feel coherent. We align your visuals, voice, and story so that the moment someone lands on your page — they feel something. Because emotion is what converts.',
              },
              {
                step: '02',
                icon: <TrendingUp size={22} />,
                color: 'from-sky-500/10 to-blue-500/5',
                accent: 'text-sky-600',
                ring: 'ring-sky-200',
                title: 'Show Up Every Day',
                subtitle: 'Feed the algorithm. Build the audience.',
                body: "Consistency isn't optional — it's the whole game. Regular, high-quality content warms up the algorithm, grows your reach organically, and keeps you top-of-mind. You don't need to go viral. You need to show up.",
              },
              {
                step: '03',
                icon: <Target size={22} />,
                color: 'from-rose-500/10 to-pink-500/5',
                accent: 'text-rose-600',
                ring: 'ring-rose-200',
                title: 'Run Smarter Ads',
                subtitle: "Amplify what's already working.",
                body: "Once the algorithm knows you and your audience is warm, ads become a multiplier — not a gamble. We run targeted digital campaigns that bring the right people into your world at the right time, with a return that actually makes sense.",
              },
              {
                step: '04',
                icon: <Heart size={22} />,
                color: 'from-emerald-500/10 to-green-500/5',
                accent: 'text-emerald-600',
                ring: 'ring-emerald-200',
                title: 'Keep Them Close',
                subtitle: 'Leads today. Loyal clients forever.',
                body: "Social media, email, DMs, CRM — every channel working together to nurture your leads and keep your current clients engaged. The brands that win long-term aren't just good at getting attention. They're great at keeping it.",
              },
            ].map(({ step, icon, color, accent, ring, title, subtitle, body }, i) => (
              <RevealOnScroll key={step} delay={i * 80}>
                <div className={`mv-glass mv-lift rounded-3xl p-7 h-full flex flex-col group relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-11 h-11 rounded-2xl bg-white ring-1 ${ring} flex items-center justify-center shadow-sm ${accent} group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300`}>
                        {icon}
                      </div>
                      <span className="text-[11px] font-bold tracking-[0.15em] text-neutral-300 mt-1">{step}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-neutral-900">{title}</h3>
                    <p className={`text-xs font-semibold uppercase tracking-wider mb-4 ${accent}`}>{subtitle}</p>
                    <p className="text-neutral-500 text-sm leading-relaxed flex-1">{body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={320}>
            <div className="text-center mt-12">
              <button onClick={onBookConsultation} className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-black transition-all hover:scale-105 shadow-lg text-sm tracking-wide">
                <Sparkles size={16} />
                Let's Build Your System
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <SocialAdvantageSection />

      <DeferredBgVideo />

      <section id="ai-consultation" className="py-24 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
              <div>
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-3 block">Next-Gen Consulting</span>
                <h2 className="text-5xl font-bold mb-8 leading-tight">Identify Your Strategy.<br /><span className="font-serif italic font-normal">Instant & Live.</span></h2>
                <p className="text-xl text-neutral-600 mb-10 leading-relaxed">
                  Our advanced AI ecosystem is ready to analyze your challenges. Switch to <span className="font-bold text-black">Voice Mode</span> for a direct human-like conversation about your growth.
                </p>
                <div className="space-y-8">
                  <div className="flex gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                        <Check size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Instant Tailored Roadmaps</h4>
                        <p className="text-neutral-600">Get specific recommendations for your niche in seconds.</p>
                      </div>
                  </div>
                  <div className="flex gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                        <Mic size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Real-time Voice Interaction</h4>
                        <p className="text-neutral-600">Natural conversations powered by Gemini 2.5 Live API.</p>
                      </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-neutral-200/50 via-neutral-100 to-transparent rounded-[3rem] opacity-40 blur-3xl"></div>
                <div className="relative">
                  <AIBot />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <ClientsSection />

      <RevealOnScroll>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Social Proof</span>
              <h2 className="text-3xl font-bold">What Our <span className="font-serif italic font-normal">Clients Say</span></h2>
            </div>
            <ReviewsWidget />
          </div>
        </section>
      </RevealOnScroll>

      {/* Team Section */}
      <RevealOnScroll>
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">The Team</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
                We work with AI, yet we are{' '}
                <span className="font-serif italic font-normal text-indigo-500">real</span>{' '}people
              </h2>
              <p className="text-neutral-500 text-lg">Here's a few of them.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'Ricky', role: 'Founder & CEO', img: '/team/ricky.png', delay: 0 },
                { name: 'Mari', role: 'Creative Director', img: '/team/mari.png', delay: 80 },
                { name: 'Nati', role: 'Project Manager', img: '/team/nati.png', delay: 160 },
                { name: 'Vale', role: 'Content Creator', img: '/team/vale.png', delay: 240 },
                { name: 'Leo', role: 'Content Creator', img: '/team/leo.png', delay: 320 },
                { name: 'Adri', role: 'Marketing Specialist', img: '/team/adri.png', delay: 400 },
              ].map(({ name, role, img, delay }) => (
                <RevealOnScroll key={name} delay={delay}>
                  <div className="mv-glass mv-lift rounded-3xl p-5 flex flex-col items-center text-center gap-3 group">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/70 shadow-md group-hover:ring-indigo-300 transition-all duration-500">
                      <img src={img} alt={name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900 text-sm">{name}</p>
                      <p className="text-neutral-400 text-xs mt-0.5 leading-snug">{role}</p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      <ConsultationCTA onBookConsultation={onBookConsultation} />
    </div>
  );
};

const PLATFORM_SCREENSHOTS = [
  '1zua1KZ0kdOjyavKHk6T3PwiJAepMT_40',
  '1PW62Vg-lnLYOJJLXqr7IzQOim2sdbqxP',
  '1RMxRcXZaGDreI-XdXVY8VLUEeSBulccu',
  '1Rbx6FrGyv5YwrjgrmotBFo12sGVm5ZKi',
  '1SVCNivwN9Y7ZHBpfy4B4lVm9pWaHFmAB',
  '1YhM8-jDRHZWh9FQcC-G49SEtOkSL80qH',
  '1cpyUu5tYW9B7OKykt2py6Bf9EWxHE8l3',
  '1lmuEHb5vq1oqKBO4KT8BZ8YfmkEshi_O',
  '1p_S11_cufcMlkabH4_ggA7fHTNO3avJj',
  '1PLdY2W-QtF-f1p8rt86RqxGij-AAbaAQ',
  '1hPusT0hLpnzUWTpaUaSA0LeOdBFN3c0Z',
  '1LZiytgpYzC2BgEGmodF4DhSZh-QARJOh',
  '1gpsTE9yqWHk3WFlsmri_k86-oQTVG5TS',
  '1CW9HnPMRozlmrTIBWgOit30bB50C8zwd',
  '1Ce4iDMAkjnWz1qz44d2r-zmuiFiJk37F',
  '1Dy-TqjZ5rxA94zyukuPNRJgZniU3Zvqj',
  '1El6Lb9SWYC86Mz0iJOwZYERY2go1-jca',
  '1FfEwLWdKpW5bWFNl47nhbBd02Vps2LEa',
  '1HPvT-TJsWj_kOKqbHUW9_5NmVKOhtT2V',
  '1G3hRFaWb4lsO-8DbjRJmc9e1rRjIJ3zY',
  '1HVanPurQB3fYw64oeE1Zoat4gBTHzAcG',
  '17c4HaLjF9NbnLja-wjUr-xsU7QfbWkhH',
  '1JJHAppTLu96E37PIWDWBgdUTG37Efr3x',
  '1f551uHPbSRE0piP6L5Tlkv18EE3N3rv_',
  '1J-B8rVdMqP12dhaFF0a8Hxb-CdM_1qOX',
  '1QM-4lkFhsgkHTnY4KD4E8pEij8VEQRnH',
  '1bxnZBPVuwecatcM1oZqE8BMqDCGcAU8a',
  '1ARbO8smohhoJijcrEnzIJWvK0Dn5TjIp',
  '1EkC8inhMHjfw55V2elNEQ_t9ktVGw4O-',
  '1N11A_5KFcNuNQgznthOEcx9Yo4Y1KtYx',
  '1N5kPJ7C9aWO57ggH_y7qfOm3q3Jvg-Gk',
  '1trJY4vZP8aPkDPMo5PXL4weiqq_sG2M7',
  '1yujr3yBPgA9VmZuGUmI5AS3MCEEWEio2',
].map(id => `https://lh3.googleusercontent.com/d/${id}`);

const SCREENSHOT_LABELS: Record<string, string> = {
  '1xDZFHKKFD6OJbS5g_aYu7KVz5B2pYXC2': 'Agent Dashboard',
  '17RdtScq3RnbPt_55LLEAtCJYLFyLrM-T': 'Lead Pipeline',
  '1m0MuqRdFiuqBgaGsH_VBgHsEjXKVniPq': 'Marketing Automation',
  '1TFESSPkSSNsS7kZbYsZMfSmfLHI5MCOB': 'CRM Overview',
  '1a-Oam0bS5bMRX4xCxHMUJWJWomEwjd1q': 'Analytics Center',
  '14LZ5IUFaqHfj-4E7fHYj-g3ZmMGz-K3O': 'Listing Manager',
  '1RB_kz8_a-dMGUVwsmxDAJCpQMZSXNxCL': 'Agent Profiles',
  '1LExu3FbF2d1E5YRWVF-vJA7xV6SdKJyH': 'Task Automation',
  '1nIxqq9RDkfixFMVCM2fDw2BIQ-GWjdHO': 'Communication Hub',
  '1aqJ3UYGefRG4sSZbLBmMFGv5qlz7s-Oo': 'Performance Reports',
  '1N1muFMuWJ8DniPBFWfPLDlQvjzJYLd0N': 'Campaign Builder',
  '1e9kRzUy_juwYpAJa8-5JZXSGgmZBRcj9': 'Property Alerts',
  '1W8MK56AaU2mWfSmT5-5B2jL4pXzBHPLN': 'Client Portal',
  '1ePXKu32jMk6JmVtZr7IkmQeONi4NXXZ5': 'Social Media Sync',
  '1m_Hl9_6rXFVvPUgPMk8-GxIV6kLCsKEt': 'Email Sequences',
  '11g-sR_-LkRU4i2t_fH4RFkLo7g_HUMBt': 'Transaction Tracker',
  '1hU_yxF6Fg30Qv8hg_Fo0_KTD8pQ8k4ZQ': 'Revenue Dashboard',
  '1_5Ber5JE_YH5Dme9R3a4T2ZjUPBV5kl7': 'Market Intelligence',
  '1EuqnL6b5YIrNGS0kISe2t0QUmWUmInEW': 'Open House Tools',
  '1yOTjkDLfLuRmk4P0JlvLi6Mv5X1hUJpP': 'Referral Network',
  '1kGEFLQHyJpO5c8tQOxBHMUyOgEcfqJ4r': 'Document Center',
  '1vM_k5m0-2aU8ygXNrp78j8L14HRkWqzb': 'Notification Center',
  '1KXF4lf98Jvnp-AEeTrJLmXqJ0cJuRKaY': 'Settings & Roles',
  '14qY-D1C-hfyqJGk9vxsJsPdz_tW-3Iw7': 'Integrations Hub',
  '1t2J8vIoH_-a2fAn5J67e4YUCWsJRhVkF': 'Compliance Tools',
  '1GxM0sZ_U3hjp-sYRukmZ2d1tMiEy9uBe': 'Buyer Journey',
  '1wNpk_vxIDZ3lH9FwEU-3rGqC8LHv9pQN': 'Seller Tools',
  '1FNnQXbHKXqZ4NTsYVb2IJeHAoTFBikAf': 'AI Recommendations',
  '1B4mN5q8oW0JqyRrKVEUwT_RHmSIxzm2K': 'Mobile Access',
  '18XwxVqPzHBLjEmC9G_0kQi6EbGjxDMZn': 'Workflow Designer',
  '1A2y5ZkTQJl0kB4NcF3SLR4N9EeB3Mrll': 'Calendar & Scheduling',
  '1s0vR7OBRhJzNpXQLYGNFnCVMcJDyoHnz': 'Contact Intelligence',
  '1yujr3yBPgA9VmZuGUmI5AS3MCEEWEio2': 'Brokerage Command Center',
};

const PlatformCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const total = PLATFORM_SCREENSHOTS.length;
  const prev = () => setCurrent(p => (p - 1 + total) % total);
  const next = () => setCurrent(p => (p + 1) % total);

  const fileId = PLATFORM_SCREENSHOTS[current].split('/d/')[1];
  const label = SCREENSHOT_LABELS[fileId] ?? `Screen ${current + 1}`;

  return (
    <div className="relative select-none">
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.18)]" style={{ aspectRatio: '1636/1035' }}>
        {PLATFORM_SCREENSHOTS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={label}
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      {/* Pill caption below image */}
      <div className="mt-4 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-neutral-100 rounded-full px-4 py-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400">Platform</span>
          <span className="w-px h-3 bg-neutral-300" />
            <span className="text-xs font-semibold text-neutral-700">{label}</span>
          </div>
        </div>

        {/* Controls: progress bar + dots + arrows */}
        <div className="mt-4 flex flex-col gap-3">
          <div className="w-full h-px bg-neutral-100 relative overflow-hidden rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-neutral-900 transition-all duration-500 rounded-full"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <button onClick={prev} aria-label="Previous" className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {PLATFORM_SCREENSHOTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-neutral-900' : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'}`}
                />
              ))}
            </div>
            <button onClick={next} aria-label="Next" className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
  );
};

const PHONE_SCREENSHOTS = [
  '1n78_3nyIxRJ7bRzUv-6xFfPJnD-jQCmL',
  '1pss2l8EBl3EpYvmSkcQs1jyjEsQbEOeu',
  '1trJY4vZP8aPkDPMo5PXL4weiqq_sG2M7',
  '1N5kPJ7C9aWO57ggH_y7qfOm3q3Jvg-Gk',
  '1N11A_5KFcNuNQgznthOEcx9Yo4Y1KtYx',
].map(id => `https://lh3.googleusercontent.com/d/${id}`);

const PHONE_LABELS = [
  'Agent Overview',
  'Lead Activity',
  'Contact Details',
  'Task Manager',
  'Performance Stats',
];

const PhoneCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const total = PHONE_SCREENSHOTS.length;
  const prev = () => setCurrent(p => (p - 1 + total) % total);
  const next = () => setCurrent(p => (p + 1) % total);

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      {/* Main image area — bg-white so corner bleed is invisible */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.18)]" style={{ aspectRatio: '9/19.5' }}>
        {PHONE_SCREENSHOTS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={PHONE_LABELS[i]}
            className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Bottom gradient + label */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none rounded-b-2xl" />
        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">Mobile</span>
          <span className="w-px h-3 bg-white/20" />
          <span className="text-sm font-semibold text-white">{PHONE_LABELS[current]}</span>
        </div>
        <div className="absolute bottom-5 right-5 z-20 text-[11px] font-bold text-white/40 tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>

      {/* Controls: progress bar + dots + arrows together */}
      <div className="mt-5 flex flex-col gap-3">
        <div className="w-full h-px bg-neutral-100 relative overflow-hidden rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-neutral-900 transition-all duration-500 rounded-full"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {PHONE_SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-neutral-900' : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── FAQ Section ─────────────────────────────────────────────── */
const PresentationBanner: React.FC<{ href: string; eyebrow?: string }> = ({ href, eyebrow = 'Dig Deeper' }) => (
  <RevealOnScroll>
    <div className="mb-20">
      <div className="mv-glass rounded-[2.5rem] px-10 py-14 md:px-16 relative overflow-hidden">
        {/* subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* soft blob */}
        <div className="absolute -top-16 -right-16 w-72 h-72 bg-indigo-200/40 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-violet-200/30 rounded-full blur-[70px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/80 border border-white/70 shadow-sm flex items-center justify-center shrink-0">
              <Sparkles size={28} className="text-indigo-500" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-1 block">{eyebrow}</span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                Interactive <span className="font-serif italic font-normal">Presentation</span>
              </h3>
              <p className="text-neutral-500 mt-1 text-sm max-w-md">
                Walk through a fully interactive deck built to show you exactly how this works — at your own pace, in under 10 minutes.
              </p>
            </div>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="magic"
            className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-black transition-all hover:scale-105 shadow-lg text-sm tracking-wide whitespace-nowrap"
          >
            <Sparkles size={17} />
            Open Presentation
          </a>
        </div>
      </div>
    </div>
  </RevealOnScroll>
);

const FAQSection: React.FC<{ items: { q: string; a: string }[]; label?: string }> = ({ items, label = 'Questions, Answered' }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <RevealOnScroll>
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-[240px_1fr] gap-12 items-start">
            <div className="lg:sticky lg:top-28">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">{label}</span>
              <h2 className="text-3xl font-bold leading-tight">Quick <span className="font-serif italic font-normal">Answers</span></h2>
            </div>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="mv-glass rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-neutral-900 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <span>{item.q}</span>
                    <span className={`shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
                      <Plus size={18} />
                    </span>
                  </button>
                  {open === i && (
                    <div className="px-6 pb-6 text-neutral-600 leading-relaxed text-[15px] border-t border-white/50 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </RevealOnScroll>
  );
};

const BROKER_FAQS = [
  {
    q: 'Do I still need my other subscriptions, or can this replace my current tech stack?',
    a: 'Our Broker CRM Suite is designed to be your all-in-one solution, allowing you to cancel almost every other subscription you\'re currently paying for. We replace the need for separate CRM platforms, Zapier integrations, email marketing tools, ad managers, phone systems, and transaction management software. By consolidating your stack into one powerhouse platform, you save thousands in monthly overhead while eliminating the headache of managing ten different logins.',
  },
  {
    q: 'I\'m not a "tech person." How hard is this to manage?',
    a: 'You don\'t need to be. We provide a "Done-For-You" onboarding experience. We handle the technical heavy lifting and setup so you can focus on your clients, not troubleshooting software. If you can check your email, you can use our systems.',
  },
  {
    q: 'How will this help me grow my brand and local market share?',
    a: 'Whether you are an individual agent or an independent broker, our systems are designed to build authority. We use targeted lead capture and high-value content like Seller Guides and Market Reports to ensure that when homeowners in your area think of real estate, they think of your brand first.',
  },
  {
    q: 'How much of my marketing can be automated without losing my "personal touch"?',
    a: 'We automate the repetitive tasks like initial lead follow-ups, long-term nurturing, and social scheduling so you have more time for the human tasks like showings, listings, and closings. Your brand voice stays consistent, but your manual workload disappears.',
  },
  {
    q: 'Is it difficult to switch my database over to your platform?',
    a: 'It\'s incredibly easy. We handle the heavy lifting for you. Our team manages the migration of your existing contacts and lead flow from your current CRM, ensuring a seamless transition with zero downtime for your business. We bridge the gap so you can start seeing results on day one.',
  },
  {
    q: 'What kind of ROI can I realistically expect?',
    a: 'Most brokerages see a positive ROI within the first 60–90 days. By replacing 5–8 separate tools, the monthly savings alone often cover the platform cost. Add in the revenue from better lead conversion and agent retention — and the numbers become very compelling. We\'ll walk you through a custom projection on your strategy call.',
  },
];

const SOCIAL_FAQS = [
  {
    q: 'Will the content actually sound like me, or will it feel generic and robotic?',
    a: 'Every piece of content we create is rooted in your brand voice, your stories, and your market. Our onboarding process is specifically designed to extract your personality, opinions, and differentiators — so what goes out looks and sounds like you, even when you\'re busy closing deals.',
  },
  {
    q: 'How quickly will I start seeing real results from social media?',
    a: 'Organic growth is a long game, but our clients typically start seeing measurable engagement increases within the first 30 days and meaningful lead activity within 60–90 days. Social media compounds over time — the earlier you start, the stronger your position becomes.',
  },
  {
    q: 'What if I don\'t have time to film content or send you material?',
    a: 'We\'ve built our process around busy professionals. We can work with short voice notes, existing photos, repurposed listings, and market data to build a full content calendar. For clients who want high-production video, we coordinate shoot schedules that fit around your work — not the other way around.',
  },
  {
    q: 'How is this different from just hiring a social media manager?',
    a: 'A single social media manager is one person with one skillset. Our team includes strategists, designers, video editors, copywriters, and data analysts working together on your account. You get an entire creative department at a fraction of the cost of a full in-house hire — plus AI-powered tools no freelancer can match.',
  },
  {
    q: 'Which platforms do you manage, and do I need to be on all of them?',
    a: 'We manage Instagram, Facebook, TikTok, LinkedIn, YouTube Shorts, and more. We don\'t believe in spreading thin — we\'ll audit your audience and recommend the 2–3 platforms where your ideal clients actually spend time, then dominate those before expanding.',
  },
  {
    q: 'Can social media actually generate real estate leads, or is it just brand awareness?',
    a: 'Both — and the combination is what makes it powerful. We pair organic authority-building with targeted lead-capture strategies (lead magnets, DM funnels, story CTAs) that convert followers into booked consultations. Social media is not just vanity metrics for us; it\'s a business development engine.',
  },
];

const AI_FAQS = [
  {
    q: 'Will AI automation replace my team, or does it work alongside them?',
    a: 'AI workflows are designed to eliminate the repetitive, low-value tasks that drain your team\'s time — data entry, follow-up sequences, report generation, appointment reminders. Your team focuses on judgment calls, relationships, and creative work. The result is the same headcount producing significantly more output without burnout.',
  },
  {
    q: 'My business is unique. Can AI workflows actually be customized for how we operate?',
    a: 'That\'s exactly what we build. We start with a deep audit of your current processes, identify every manual bottleneck, and design workflows that map to your specific systems — not a generic template. Whether you\'re a real estate team, a law firm, or an e-commerce brand, the automation is built around your reality.',
  },
  {
    q: 'What platforms and tools does your AI infrastructure connect with?',
    a: 'We integrate with virtually any tool in your stack — CRMs like HubSpot, Salesforce, and GoHighLevel; communication tools like Slack, Gmail, and SMS platforms; scheduling tools, payment processors, spreadsheets, and custom databases. If it has an API, we can wire it in. If it doesn\'t, we build the bridge.',
  },
  {
    q: 'How long does it take to go from strategy to live automation?',
    a: 'Most single-workflow automations go live within 1–2 weeks. Full AI suite buildouts — covering multiple departments — are typically deployed over 4–8 weeks in prioritized phases, so you start seeing ROI immediately rather than waiting for the entire project to complete.',
  },
  {
    q: 'What happens if something breaks or the AI makes a mistake?',
    a: 'Every workflow we build includes error-handling logic, human-approval checkpoints for sensitive actions, and monitoring alerts. Nothing mission-critical runs fully "dark." We also provide ongoing support and quarterly reviews to refine workflows as your business evolves.',
  },
  {
    q: 'Is there a minimum size business that makes sense for AI automation?',
    a: 'Not really — even a solo operator or small team of 3–5 can see dramatic time savings from the right automation. The ROI threshold is lower than most people think. If you\'re spending more than 5 hours a week on a repeatable task, there\'s almost certainly a workflow that can reclaim that time at a fraction of the cost.',
  },
];

const BrokerCRMView: React.FC<{ onSubscribe: (plan: Plan) => void; onBookConsultation: () => void }> = ({ onSubscribe, onBookConsultation }) => (
  <div className="animate-fade-in py-20 relative z-10">
    <div className="max-w-7xl mx-auto px-4">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Broker <span className="font-serif italic font-normal">CRM Suite</span></h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Empower your agents, automate your marketing, and dominate your local market with our all-in-one brokerage operating system.
          </p>
        </div>
      </RevealOnScroll>

      {/* Visual Showcase Section */}
      <div className="mb-32 space-y-24">
        {/* Section 1 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll className="relative group">
              <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20 rounded-full"></div>
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl">
                <video src="https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/6a39c34521502f4c61070c35.mp4" autoPlay muted loop playsInline className="w-full" />
              </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
              <h3 className="text-3xl font-bold mb-4">The Command Center Your Brokerage Deserves</h3>
              <p className="text-lg text-neutral-600 mb-6">Gain complete visibility into your agents' performance. From lead distribution to pipeline value, manage your entire organization from a single, intuitive dashboard.</p>
              <ul className="space-y-4">
                <li className="flex gap-3 items-center"><div data-cursor="magic" className="p-1"><CheckCircle2 className="text-blue-500" size={24} /></div> <span className="font-bold text-lg">Global Analytics & Reporting</span></li>
                <li className="flex gap-3 items-center"><div data-cursor="magic" className="p-1"><CheckCircle2 className="text-blue-500" size={24} /></div> <span className="font-bold text-lg">Route Leads & Track Activity</span></li>
                <li className="flex gap-3 items-center"><div data-cursor="magic" className="p-1"><CheckCircle2 className="text-blue-500" size={24} /></div> <span className="font-bold text-lg">Cohesive Branding & Marketing</span></li>
              </ul>
          </RevealOnScroll>
        </div>

        {/* Section 2 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll className="lg:order-2 relative group">
              <div className="absolute inset-0 bg-purple-600 blur-[100px] opacity-20 rounded-full"></div>
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl">
                <video src="https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/6a39c0cb610e9ace506d9de4.mp4" autoPlay muted loop playsInline className="w-full" />
              </div>
          </RevealOnScroll>
          <RevealOnScroll delay={200} className="lg:order-1">
              <h3 className="text-3xl font-bold mb-4">Equip Every Agent with Enterprise-Grade Marketing</h3>
              <p className="text-lg text-neutral-600 mb-6">Don't just hire agents—empower them. Provide a full marketing suite including landing pages, email automation, and social planners instantly upon onboarding.</p>
              <ul className="space-y-4">
                <li className="flex gap-3 items-center"><div data-cursor="magic" className="p-1"><CheckCircle2 className="text-purple-500" size={24} /></div> <span className="font-bold text-lg">Personalized Agent Sub-accounts</span></li>
                <li className="flex gap-3 items-center"><div data-cursor="magic" className="p-1"><CheckCircle2 className="text-purple-500" size={24} /></div> <span className="font-bold text-lg">One-Click Marketing Funnels</span></li>
                <li className="flex gap-3 items-center"><div data-cursor="magic" className="p-1"><CheckCircle2 className="text-purple-500" size={24} /></div> <span className="font-bold text-lg">Built-in Dialer & SMS</span></li>
              </ul>
          </RevealOnScroll>
        </div>
      </div>

      <RevealOnScroll>
        <div className="text-center mb-16 h-32 flex flex-col justify-center">
           <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">Powerful Capabilities</p>
           <h3 className="text-4xl md:text-6xl font-bold">
             <span className="text-neutral-400">You can </span>
             <TypewriterText 
                texts={[
                  "Automate Lead Follow-ups", 
                  "Track Agent Performance", 
                  "Launch Facebook Ads", 
                  "Collect 5-Star Reviews", 
                  "Build Custom Funnels",
                  "Send SMS Campaigns"
                ]} 
                className="text-black" 
             />
           </h3>
        </div>
      </RevealOnScroll>

      <div className="mb-20 rounded-3xl overflow-hidden">
        <ZohoWidget
          widgetId="zf-widget-root-id-prxgvpvhz"
          digest="2-fa4c5864403ccd92903c484486c00aa55f13a369d0cdf3ce22d19dc62443cb22437c90e9c79f8ee4b737c2b253195bdf012b590903e576e248bf2deb26f7ad42"
        />
      </div>

      {/* Video background divider */}
      <div className="relative mb-20 rounded-[2.5rem] overflow-hidden h-[420px] md:h-[520px]">
        <video
          src="https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/69bdaac00a14d5e14304c315.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[2px]" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 block">Features</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            An <span className="font-serif italic font-normal text-blue-300">integrated</span> ecosystem<br className="hidden md:block" /> to claim your time back
          </h2>
          <p className="text-neutral-300 text-lg max-w-2xl leading-relaxed">
            Get the leads, nurture them, service them powerfully, stay in touch, get their reviews, sign the contracts, manage the team.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
         {[
            { icon: <LayoutDashboard size={24} />, title: "Agent Dashboards", desc: "Individual logins and lead tracking for every agent." },
            { icon: <Smartphone size={24} />, title: "Mobile App", desc: "Manage leads, calls, and tasks on the go." },
            { icon: <Share2 size={24} />, title: "Social Planner", desc: "Plan, schedule and post content across all channels." },
            { icon: <Target size={24} />, title: "Ads Launcher", desc: "Launch Facebook & Google ads in 3 clicks with real-time analytics." },
            { icon: <Mail size={24} />, title: "Email Marketing", desc: "Drag-and-drop builder for newsletters and automated blasts." },
            { icon: <MessageCircle size={24} />, title: "SMS & WhatsApp", desc: "Direct 2-way messaging automated for higher response rates." },
            { icon: <Globe size={24} />, title: "Website Builder", desc: "High-converting landing pages and funnels for every listing." },
            { icon: <Calendar size={24} />, title: "Smart Calendars", desc: "Automated booking and round-robin scheduling for teams." },
            { icon: <Zap size={24} />, title: "Automations", desc: "Trigger actions based on lead behavior automatically." },
            { icon: <Users size={24} />, title: "Community Hub", desc: "Unified inbox for all your social interactions and DMs." },
            { icon: <Star size={24} />, title: "Reputation Mgmt", desc: "Auto-request reviews to boost Google ranking." },
            { icon: <CreditCard size={24} />, title: "Payments", desc: "Send invoices and collect payments seamlessly." },
            { icon: <Bot size={24} />, title: "AI Agents", desc: "24/7 intelligent assistants to qualify leads instantly." },
            { icon: <Phone size={24} />, title: "VoIP System", desc: "Dedicated business lines with call recording and tracking." },
            { icon: <Video size={24} />, title: "TikTok Ads", desc: "Sync leads directly from your viral video campaigns." },
            { icon: <FileText size={24} />, title: "Quickbooks", desc: "Seamless accounting integration for commissions." }
         ].map((feat, i) => (
            <RevealOnScroll key={i} delay={i * 50}>
               <div className="p-6 bg-neutral-50/80 backdrop-blur-sm rounded-2xl border border-neutral-100 text-center hover:bg-white hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 mx-auto bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-neutral-800">
                     {feat.icon}
                  </div>
                  <h4 className="font-bold mb-2">{feat.title}</h4>
                  <p className="text-sm text-neutral-500">{feat.desc}</p>
               </div>
            </RevealOnScroll>
         ))}
      </div>
      
      {/* Mobile Powerhouse */}
      <RevealOnScroll>
        <div className="mb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <img
              src="https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/69b99fb6dac584678da72f91.png"
              alt="Broker mobile app"
              className="max-w-[320px] w-full rounded-3xl shadow-2xl"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-500 mb-4 block">Mobile Powerhouse</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Brokerage, In<br />
              <span className="text-blue-500">Your Pocket</span>.
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              Empower your agents to work from anywhere. Our white-labeled mobile app gives your team instant access to leads, conversations, and calendars on the go.
            </p>
            <ul className="space-y-4">
              {[
                'Instant Push Notifications for New Leads',
                '2-Way SMS & Calling Directly from the App',
                'Manage Appointments & Tasks Anywhere',
                'Real-time Pipeline Tracking',
                'Unified Inbox for All Social DMs',
              ].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
                  <span className="font-semibold text-neutral-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealOnScroll>

      {/* Avanti Way Case Study */}
      <RevealOnScroll>
        <div className="mb-20 rounded-[2.5rem] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left: dark storytelling panel */}
            <div className="bg-neutral-950 text-white p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-6 block">The Case Study</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
                  We helped them grow<br />
                  from <span className="text-blue-400">500</span> to <span className="text-blue-400">2,000+</span><br />
                  Agents
                </h2>
                <p className="text-2xl font-bold tracking-widest text-neutral-400 mb-8 uppercase">Avanti Way</p>
                <p className="text-neutral-400 leading-relaxed">
                  We provided <span className="text-white font-bold">Avanti Way Realty</span> with the exact Broker Engine Platform and Content Marketing Strategies we now offer to independent brokers. By equipping their team with cutting-edge tech and ready-made content, they transformed into one of the fastest-growing brokerages in the nation.
                </p>
              </div>
            </div>
            {/* Right: glass results panel */}
            <div className="mv-glass p-12 md:p-16 flex flex-col justify-center gap-6">
              {[
                { icon: <Users size={22} />, title: 'Nurturing Leads', desc: 'Automated follow-ups and lead routing' },
                { icon: <ClipboardList size={22} />, title: 'Managing Operations', desc: 'Streamlined transactions via the platform' },
                { icon: <Megaphone size={22} />, title: 'Content That Converted', desc: 'Equipping agents with ready-made marketing' },
                { icon: <MessageCircle size={22} />, title: 'Internal Communications', desc: 'Seamless team and agent collaboration' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-5 group">
                  <div className="p-3 rounded-2xl bg-white/60 border border-white/70 text-blue-500 shadow-sm shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    {icon}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{title}</p>
                    <p className="text-sm text-neutral-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <CRMWorkflowVisualizer />

      {/* Platform Screenshot Carousel */}
      <RevealOnScroll>
        <div className="mb-20 px-4 md:px-0 md:-mx-8 lg:-mx-16 xl:-mx-24">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Inside The Platform</span>
            <h2 className="text-4xl font-bold mb-4">See It <span className="font-serif italic font-normal">In Action</span></h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">A look inside the Broker CRM engine — built for modern brokerages that refuse to be outpaced.</p>
          </div>
          <PlatformCarousel />

        </div>
      </RevealOnScroll>

      {/* Sales Presentation CTA */}
      <RevealOnScroll>
        <div className="mb-20 rounded-[2.5rem] overflow-hidden bg-black text-white p-12 md:p-16 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3b82f6_0%,_transparent_60%)] opacity-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-4 block">Dig Deeper</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Understand The <span className="font-serif italic font-normal">Full Opportunity</span></h2>
              <p className="text-lg text-neutral-400 leading-relaxed">Ready to see exactly how this platform transforms your brokerage's revenue? Walk through our full sales deck — built specifically for broker-owners who want the whole picture.</p>
            </div>
            <a
              href="https://presentations.the-marketingverse.com/decks/deck-broker.html"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="magic"
              className="flex-shrink-0 flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              <FileText size={22} />
              View Your Interactive Use Case
            </a>
          </div>
        </div>
      </RevealOnScroll>

      <PresentationBanner href="https://presentations.the-marketingverse.com/decks/deck-broker-light.html" eyebrow="Broker Engine" />

      <FAQSection items={BROKER_FAQS} label="Broker Questions, Answered" />

      <ConsultationCTA onBookConsultation={onBookConsultation} />
    </div>
  </div>
);

/* ── Social Brands FAQ ───────────────────────────────────────── */
const SOCIAL_BRANDS_FAQS = [
  {
    q: 'I\'m not a big brand. Does social media actually work for small businesses?',
    a: 'Absolutely — in fact, smaller brands often have the biggest advantage. People buy from people they know and trust, and social media is the fastest way to build that relationship at scale. A local restaurant, boutique, coach, or service business with a consistent, authentic presence will consistently outperform a faceless brand with a bigger ad budget.',
  },
  {
    q: 'How is this different from just posting on Instagram myself?',
    a: 'Posting is the easy part. What we bring is strategy: knowing what to post, when, in what format, with what hook, and how to turn that content into actual business. We also bring production quality, consistency, and data-driven iteration — the combination that turns a dormant account into a lead-generating machine.',
  },
  {
    q: 'What kind of results can I realistically expect in the first 90 days?',
    a: 'Most of our brand clients see meaningful follower growth, increased engagement, and inbound DM inquiries within the first 30–60 days. The first 90 days are about building a foundation: dialing in the brand voice, identifying the content formats your audience responds to, and building consistency. Revenue impact typically follows by month 3–4 as your audience warms up.',
  },
  {
    q: 'Do I need to be on camera or participate in content creation?',
    a: 'Only as much as you want to be. For personal brands, on-camera content tends to perform best — but we can build around voice notes, repurposed photos, your product, your workspace, and your story. We work around your availability and comfort level. For business accounts, we can create compelling content entirely from your brand assets.',
  },
  {
    q: 'Which platforms should my business be on?',
    a: 'That depends entirely on where your audience spends time and what your content naturally fits. We\'ll audit your business, audience, and competitors in week one and recommend 2–3 platforms to dominate rather than spreading thin across all of them. Quality beats quantity every time.',
  },
  {
    q: 'What\'s included in your social media management?',
    a: 'We handle the full production cycle: content strategy, copywriting, design, video editing, scheduling, community engagement, hashtag research, and monthly analytics reports. You get a complete content team — not just someone who presses "post."',
  },
];

/* ── Social Brands View ──────────────────────────────────────── */
const SocialBrandsView: React.FC<{ onBookConsultation: () => void }> = ({ onBookConsultation }) => (
  <div className="animate-fade-in py-20 relative z-10">
    <div className="max-w-7xl mx-auto px-4">

      {/* Hero intro */}
      <RevealOnScroll>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative group">
            <SocialEcosystem />
          </div>
          <div className="lg:pl-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600 mb-6 block">Social Media Management</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Turn Your Brand Into<br />
              <span className="font-serif italic font-normal">A Movement.</span>
            </h2>
            <div className="space-y-5 text-lg text-neutral-600 leading-relaxed">
              <p>
                Whether you're a personal brand, a boutique, a service business, or a growing startup — your social media is your most powerful sales tool. Most small brands post and hope. We build and <span className="text-black font-bold">convert.</span>
              </p>
              <p>
                We create content that makes your audience feel something — and feeling is what drives follows, saves, shares, and ultimately, <span className="text-black font-bold">purchases.</span>
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="p-5 bg-neutral-50/80 backdrop-blur-sm rounded-2xl border border-neutral-100 hover:border-violet-400 transition-colors group">
                <div className="mb-3 p-2 bg-white rounded-lg w-fit shadow-sm text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <TrendingUp size={20} />
                </div>
                <h4 className="font-bold mb-1">Audience Growth</h4>
                <p className="text-xs text-neutral-500">Real followers who actually buy.</p>
              </div>
              <div className="p-5 bg-neutral-50/80 backdrop-blur-sm rounded-2xl border border-neutral-100 hover:border-violet-400 transition-colors group">
                <div className="mb-3 p-2 bg-white rounded-lg w-fit shadow-sm text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <Heart size={20} />
                </div>
                <h4 className="font-bold mb-1">Brand Love</h4>
                <p className="text-xs text-neutral-500">Content that creates real connection.</p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Why social for brands */}
      <RevealOnScroll>
        <div className="mb-32">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600 mb-4 block">The Marketingverse Way</span>
            <h2 className="text-4xl font-bold mb-4">Why Social? <span className="font-serif italic font-normal">Our Unique Approach.</span></h2>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100 bg-black max-w-sm mx-auto">
            <VimeoFacade id="1203822578" title="Why Social? Marketingverse Approach" />
          </div>
        </div>
      </RevealOnScroll>

      {/* Authority banner */}
      <RevealOnScroll>
        <div className="mb-20 rounded-[2.5rem] overflow-hidden relative bg-neutral-950 text-white px-8 py-20 md:px-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(139,92,246,0.3)_0%,_transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(236,72,153,0.2)_0%,_transparent_55%)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              The Brands That Win Aren't<br />
              <span className="font-serif italic font-normal text-neutral-400">the Loudest. They're the Most Consistent.</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your competitors are either invisible online or posting without strategy. Either way, that's your opportunity. We help you show up every day — with purpose, quality, and a point of view.
            </p>
            <button
              onClick={onBookConsultation}
              data-cursor="magic"
              className="inline-flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl tracking-wide uppercase text-sm"
            >
              Book a Free Strategy Call
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* 4 pillars */}
      <RevealOnScroll>
        <div className="mb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              The Real Reason <span className="text-violet-500">Small Brands Stay Small</span>
            </h2>
            <p className="font-bold text-neutral-900 mb-4">It's not the product. It's the presence.</p>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>The brands dominating your market right now aren't necessarily better than you. They're more visible, more consistent, and more connected to their audience. Social media done right doesn't just build followers — it builds a community that sells for you.</p>
              <p>We don't post to fill a calendar. We build a brand people can't stop talking about.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <TrendingUp size={22} />, title: 'Market Visibility', desc: 'Become the go-to name in your niche before a customer ever searches for you.', color: 'text-violet-500 group-hover:bg-violet-500' },
              { icon: <Shield size={22} />, title: 'Trust at Scale', desc: 'Content that builds credibility, warms up cold leads, and turns strangers into buyers.', color: 'text-indigo-500 group-hover:bg-indigo-500' },
              { icon: <Layers size={22} />, title: 'Brand Consistency', desc: 'A cohesive look, voice, and feel across every platform — so your brand works while you sleep.', color: 'text-sky-500 group-hover:bg-sky-500' },
              { icon: <Heart size={22} />, title: 'Community & Loyalty', desc: "People don't just buy products. They join brands they believe in. We build that belief.", color: 'text-pink-500 group-hover:bg-pink-500' },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className="mv-glass mv-lift rounded-3xl p-5 group">
                <div className={`mb-3 p-2.5 bg-neutral-100 rounded-xl w-fit ${color} transition-all duration-300 group-hover:text-white`}>
                  {icon}
                </div>
                <h4 className="font-bold mb-2 text-sm">{title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Content showcase */}
      <RevealOnScroll>
        <div className="mb-32">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Cinematic Excellence</span>
            <h2 className="text-4xl font-bold mb-4">Content That <span className="font-serif italic font-normal">Stops The Scroll</span></h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">See what we've done for our clients</p>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100 bg-black">
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe src="https://vimeo.com/showcase/9806547/embed2" allow="autoplay; fullscreen; picture-in-picture" frameBorder={0} loading="lazy" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} title="Marketingverse Video Showcase" />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Growth section */}
      <RevealOnScroll>
        <div className="mb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500 mb-4 block">A Powerful Digital Storefront</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Our clients see <span className="text-violet-500">growth</span> in the first month.
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              We guide you with the right strategy, tools, and creative direction. Your job is to show up as yourself and let us handle the rest.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: <Cpu size={22} />, label: 'Brand Identity & Voice' },
              { icon: <Users size={22} />, label: 'Strategy & Coaching' },
              { icon: <Wand2 size={22} />, label: 'Content Concept Creation' },
              { icon: <Video size={22} />, label: 'Video & Photo Production' },
              { icon: <ImageIcon size={22} />, label: 'Editing & Graphics' },
              { icon: <Calendar size={22} />, label: 'Scheduling at Peak Times' },
              { icon: <TrendingUp size={22} />, label: 'Analytics & Monthly Reporting' },
            ].map(({ icon, label }, i) => (
              <RevealOnScroll key={label} delay={i * 60}>
                <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
                  <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 shrink-0">
                    {icon}
                  </div>
                  <span className="font-semibold text-neutral-900">{label}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Pricing */}
      <RevealOnScroll>
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Pricing / Membership Tiers</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Competitors Are Online.<br />
            <span className="text-violet-500">Are You?</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Every month without a strong content presence is a month your competitors earn the trust that should be yours. Choose the plan that fits where you are today.
          </p>
        </div>
      </RevealOnScroll>
      <div className="mb-20 rounded-3xl overflow-hidden">
        <ZohoWidget
          widgetId="zf-widget-root-id-38zcrwakz"
          digest="2-fa4c5864403ccd92bf50b11e166685c2c2663351fc6f31f604172c46c40c00c6d7ce03e345f9b239b737c2b253195bdf012b590903e576e248bf2deb26f7ad42"
        />
      </div>

      <RevealOnScroll>
        <section className="py-16">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Social Proof</span>
            <h2 className="text-3xl font-bold">What Our <span className="font-serif italic font-normal">Clients Say</span></h2>
          </div>
          <ReviewsWidget />
        </section>
      </RevealOnScroll>

      <PresentationBanner href="https://presentations.the-marketingverse.com/decks/deck-smallbiz-light.html" eyebrow="Social Media" />

      <FAQSection items={SOCIAL_BRANDS_FAQS} label="Brand Questions, Answered" />

      {/* CTA */}
      <RevealOnScroll delay={100}>
        <div className="w-full py-20 mv-glass rounded-[2.5rem] relative overflow-hidden mt-20 text-center px-8">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-violet-100/60 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-pink-100/50 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Ready to Build a Brand <span className="text-violet-500">People Actually Remember?</span>
            </h2>
            <p className="text-neutral-500 mb-10 text-lg">No long-term contract. Just a 20-minute call to show you exactly how we'd grow your brand.</p>
            <button
              onClick={onBookConsultation}
              data-cursor="magic"
              className="px-10 py-5 bg-neutral-950 text-white rounded-full font-bold text-lg hover:bg-neutral-800 transition-all hover:scale-105 inline-flex items-center gap-3 shadow-xl uppercase tracking-wide text-sm"
            >
              Book a Free Demo Call <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </RevealOnScroll>

    </div>
  </div>
);

const SocialMediaView: React.FC<{ onInitiateGrowth: (plan: Plan) => void; onBookConsultation: () => void }> = ({ onInitiateGrowth, onBookConsultation }) => (
  <div className="animate-fade-in py-20 relative z-10">
    <div className="max-w-7xl mx-auto px-4">
      {/* New Intro Section */}
      <RevealOnScroll>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
           <div className="relative group">
              <SocialEcosystem />
           </div>
           
           <div className="lg:pl-8">
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-6 block">The Core Engine</span>
             <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
               Your Digital Storefront <br/>
               <span className="font-serif italic font-normal">To The World.</span>
             </h2>
             <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
               <p>
                 We don't view social media as a side dish; we see it as the main course. It is the single most powerful engine to merge the <span className="text-black font-bold">personal</span> and <span className="text-black font-bold">professional</span> sides of your business and the people behind it.
               </p>
               <p>
                 In a digital-first world, your feed is your handshake. It works tirelessly as branding, top-of-mind awareness, relationship building, prospecting, and entertainment. By educating while you entertain, we build the one thing AI can't fake: <span className="text-black font-bold">Trust and Connection.</span>
               </p>
               <p>
                 Beyond human connection, high-quality social presence warms up the algorithms, maximizing ROI for every other marketing dollar you spend. It is the heartbeat of your growth.
               </p>
             </div>
             
             <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="p-5 bg-neutral-50/80 backdrop-blur-sm rounded-2xl border border-neutral-100 hover:border-black transition-colors group">
                  <div className="mb-3 p-2 bg-white rounded-lg w-fit shadow-sm text-blue-600 group-hover:bg-black group-hover:text-white transition-colors">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="font-bold mb-1">Algorithm Warm-up</h4>
                  <p className="text-xs text-neutral-500">Consistent signals boost organic reach.</p>
                </div>
                <div className="p-5 bg-neutral-50/80 backdrop-blur-sm rounded-2xl border border-neutral-100 hover:border-black transition-colors group">
                  <div className="mb-3 p-2 bg-white rounded-lg w-fit shadow-sm text-purple-600 group-hover:bg-black group-hover:text-white transition-colors">
                    <Shield size={20} />
                  </div>
                  <h4 className="font-bold mb-1">Trust Architecture</h4>
                  <p className="text-xs text-neutral-500">Authenticity scales conversion.</p>
                </div>
             </div>
           </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mb-32">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-4 block">The Marketingverse Way</span>
            <h2 className="text-4xl font-bold mb-4">Why Social? <span className="font-serif italic font-normal">Our Unique Approach.</span></h2>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100 bg-black max-w-sm mx-auto">
            <VimeoFacade id="1203822578" title="Why Social? Marketingverse Approach" />
          </div>
        </div>
      </RevealOnScroll>

      {/* Authority Hero Banner */}
      <RevealOnScroll>
        <div className="mb-20 rounded-[2.5rem] overflow-hidden relative bg-neutral-950 text-white px-8 py-20 md:px-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.25)_0%,_transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.2)_0%,_transparent_55%)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Building the Authority That Wins Listings
              <br />
              <span className="font-serif italic font-normal text-neutral-400">Before You Ever Pick Up the Phone.</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Buyers and sellers are checking your Instagram before they call you. If they don't like what they see, they call someone else. We turn your social media into your most powerful listing tool.
            </p>
            <button
              onClick={onBookConsultation}
              data-cursor="magic"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl tracking-wide uppercase text-sm"
            >
              Book a Free Strategy Call
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* Real Reason + 4 Pillars */}
      <RevealOnScroll>
        <div className="mb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              The Real Reason{' '}
              <span className="text-indigo-500">Agents Lose Deals</span>
            </h2>
            <p className="font-bold text-neutral-900 mb-4">It's not your skills. It's your social proof.</p>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>The best agents in your market aren't necessarily the most experienced — they're the most visible. Social media isn't about likes and followers. It's about being the first name your sphere, your farm area, and every referral thinks of when it's time to buy or sell.</p>
              <p>We don't post generic content. We build your brand as the only logical choice in your territory.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <TrendingUp size={22} />,
                title: 'Market Authority',
                desc: 'Become the agent everyone in your ZIP code already knows, likes, and trusts — before they ever need to buy or sell.',
                color: 'text-indigo-500 group-hover:bg-indigo-500',
              },
              {
                icon: <Shield size={22} />,
                title: 'Trust Architecture',
                desc: 'Content that makes past clients refer you, future clients choose you, and your sphere never forget you.',
                color: 'text-violet-500 group-hover:bg-violet-500',
              },
              {
                icon: <Layers size={22} />,
                title: 'Brand Consistency',
                desc: "A polished, professional presence across every platform so your brand works for you 24/7 — even when you're at a closing.",
                color: 'text-sky-500 group-hover:bg-sky-500',
              },
              {
                icon: <Heart size={22} />,
                title: 'Emotional Connection',
                desc: 'People don\'t hire agents. They hire people they feel connected to. We create content that builds that relationship at scale.',
                color: 'text-rose-500 group-hover:bg-rose-500',
              },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className="mv-glass mv-lift rounded-3xl p-5 group">
                <div className={`mb-3 p-2.5 bg-neutral-100 rounded-xl w-fit ${color} transition-all duration-300 group-hover:text-white`}>
                  {icon}
                </div>
                <h4 className="font-bold mb-2 text-sm">{title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div className="mb-32">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Cinematic Excellence</span>
            <h2 className="text-4xl font-bold mb-4">Content That <span className="font-serif italic font-normal">Stops The Scroll</span></h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              See what we've done for our clients
            </p>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100 bg-black">
            <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
              <iframe src='https://vimeo.com/showcase/9806547/embed2' allow='autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer; clipboard-write; encrypted-media; web-share' frameBorder='0' loading="lazy" style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}} title="Marketingverse Video Showcase"></iframe>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Instagram Feed Showcase — 3 phone mockup videos */}
      <RevealOnScroll>
        <div className="mb-32">
          <div className="text-center mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Strategies In Action</span>
            <h2 className="text-4xl font-bold mb-4">Real Accounts. <span className="font-serif italic font-normal">Real Results.</span></h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Three different account types, three winning playbooks — each tailored to how the audience discovers and converts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 items-end justify-items-center">
            {[
              {
                vimeoId: '1173074414',
                tag: 'Fun & Elegant',
                tagColor: 'text-rose-500 bg-rose-50 border-rose-200',
                glow: 'rgba(244,114,182,0.2)',
                featured: false,
              },
              {
                vimeoId: '1173074396',
                tag: 'Polished & Professional',
                tagColor: 'text-slate-600 bg-slate-50 border-slate-200',
                glow: 'rgba(100,116,139,0.18)',
                featured: true,
              },
              {
                vimeoId: '1173074432',
                tag: 'Bold & Witty',
                tagColor: 'text-orange-500 bg-orange-50 border-orange-200',
                glow: 'rgba(249,115,22,0.22)',
                featured: false,
              },
            ].map(({ vimeoId, tag, tagColor, glow, featured }) => (
              <div key={vimeoId} className={`flex flex-col items-center gap-4 w-full max-w-[240px] ${featured ? 'md:-mt-10' : ''}`}>
                <div
                  className="relative w-full overflow-hidden rounded-2xl"
                  style={{
                    aspectRatio: '9/19.5',
                    boxShadow: `0 24px 60px -16px ${glow}, 0 6px 20px -6px rgba(0,0,0,0.14)`,
                  }}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1`}
                    allow="autoplay; fullscreen"
                    className="absolute inset-0 w-full h-full"
                    frameBorder={0}
                    title={tag}
                  />
                </div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${tagColor}`}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Growth in first month section */}
      <RevealOnScroll>
        <div className="mb-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-4 block">A Powerful Digital Storefront</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Our clients see <span className="text-indigo-500">growth</span> in the first month.
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Ideally, we reach a powerful collaboration. Our job is to guide you and elevate you with the right inspiration, tools, motivation, and accountability. Your job is to be yourself and enjoy the process.
            </p>
          </div>
          <div className="space-y-5">
            {[
              { icon: <Cpu size={22} />, label: 'Brand Identity' },
              { icon: <Users size={22} />, label: 'Coaching' },
              { icon: <Wand2 size={22} />, label: 'Concept Creation' },
              { icon: <Video size={22} />, label: 'Content Shoot' },
              { icon: <ImageIcon size={22} />, label: 'Editing & Graphics' },
              { icon: <Calendar size={22} />, label: 'Post At Ideal Times' },
              { icon: <TrendingUp size={22} />, label: 'Results Analytics & Tracking' },
            ].map(({ icon, label }, i) => (
              <RevealOnScroll key={label} delay={i * 60}>
                <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
                  <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shrink-0">
                    {icon}
                  </div>
                  <span className="font-semibold text-neutral-900">{label}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Pricing section */}
      <RevealOnScroll>
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Pricing / Membership Tiers</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Market Isn't Waiting.{' '}
            <span className="text-indigo-500">Neither Should You.</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Every month without a strong social presence is a month your competitors are taking deals that should be yours. Choose the plan that fits where you are today.
          </p>
        </div>
      </RevealOnScroll>
      <div className="mb-20 rounded-3xl overflow-hidden">
        <ZohoWidget
          widgetId="zf-widget-root-id-38zcrwakz"
          digest="2-fa4c5864403ccd92bf50b11e166685c2c2663351fc6f31f604172c46c40c00c6d7ce03e345f9b239b737c2b253195bdf012b590903e576e248bf2deb26f7ad42"
        />
      </div>

      <RevealOnScroll>
        <section className="py-16">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Social Proof</span>
            <h2 className="text-3xl font-bold">What Our <span className="font-serif italic font-normal">Clients Say</span></h2>
          </div>
          <ReviewsWidget />
        </section>
      </RevealOnScroll>

      <PresentationBanner href="https://presentations.the-marketingverse.com/decks/deck-agents-light.html" eyebrow="For Realtors" />

      <FAQSection items={SOCIAL_FAQS} label="Social Media Questions, Answered" />

      {/* Social-specific CTA */}
      <RevealOnScroll delay={100}>
        <div className="w-full py-20 mv-glass rounded-[2.5rem] relative overflow-hidden mt-20 text-center px-8">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-indigo-100/60 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-violet-100/50 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Ready to Become <span className="text-indigo-500">the Most Recognizable Agent in Your Market?</span>
            </h2>
            <p className="text-neutral-500 mb-10 text-lg">No long-term contract. Just a 20-minute call to show you exactly how we'd build your brand.</p>
            <button
              onClick={onBookConsultation}
              data-cursor="magic"
              className="px-10 py-5 bg-neutral-950 text-white rounded-full font-bold text-lg hover:bg-neutral-800 transition-all hover:scale-105 inline-flex items-center gap-3 shadow-xl uppercase tracking-wide text-sm"
            >
              Book a Free Demo Call <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </div>
);

const AIWorkflowsView: React.FC<{ onInitiateRequest: (plan: Plan) => void; onBookConsultation: () => void }> = ({ onInitiateRequest, onBookConsultation }) => (
  <div className="animate-fade-in py-20 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">AI <span className="font-serif italic font-normal">Integration Workflows</span></h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">Revolutionize your operations with our comprehensive suite of AI-powered integrations.</p>
        </div>
      </RevealOnScroll>
      
      <LiveAvatarDemo />

      <RevealOnScroll>
        <div className="mb-16">
           <h3 className="text-2xl mb-6 text-center uppercase tracking-widest text-black font-serif italic">Workflow in Action</h3>
           <div className="rounded-3xl overflow-hidden shadow-lg border border-neutral-100 bg-black">
             <VimeoFacade id="1112989697" title="Workflow in Action" aspect="56.25%" />
           </div>
        </div>
      </RevealOnScroll>
      <div className="py-20 border-b border-neutral-100 mb-16">
        <div className="text-center mb-10"><h3 className="text-2xl font-bold">Choose Your Integration Level</h3></div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {AI_PLANS.map((plan, index) => (
            <RevealOnScroll key={index} delay={index * 150} className="h-full">
              <div data-cursor="card" className={`rounded-3xl p-8 border h-full transition-all duration-300 hover:shadow-2xl flex flex-col ${plan.recommended ? 'bg-black text-white border-black shadow-2xl scale-105' : 'bg-white/90 backdrop-blur-sm hover:-translate-y-2'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className={`text-sm opacity-50`}>+ Development</span>}
                </div>
                <p className={`mb-8 leading-relaxed opacity-80`}>{plan.description}</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={14} className="mt-1" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => onInitiateRequest(plan)} 
                  data-cursor="magic"
                  className={`w-full py-4 rounded-xl font-bold transition-transform active:scale-95 ${plan.recommended ? 'bg-white text-black hover:bg-neutral-100' : 'bg-black text-white hover:bg-neutral-800'}`}
                >
                  Request Integration
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
         {AI_WORKFLOWS.map((category, index) => (
            <RevealOnScroll key={category.title} delay={index * 50} className="h-full">
              <div data-cursor="card" className="mv-glass mv-lift rounded-3xl p-8 h-full group">
                  <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-neutral-900 text-white rounded-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                          <WorkflowIcon icon={category.icon} />
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                      {category.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-neutral-500">
                              <div className="w-1 h-1 bg-neutral-300 rounded-full mt-2 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                          </li>
                      ))}
                  </ul>
              </div>
            </RevealOnScroll>
         ))}
      </div>
      <WorkflowSimulator />
      <N8NWorkflowVisualizer />
      <CustomPlanBuilder onOrderNow={onBookConsultation} />

      {/* AI Automation Suite Builder CTA */}
      <RevealOnScroll>
        <div className="mb-20">
          <div className="relative rounded-[2.5rem] border border-neutral-200 overflow-hidden px-8 py-16 md:px-16 text-center backdrop-blur-sm">
            {/* Subtle decorative blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100/60 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/60 rounded-full blur-[80px] translate-y-1/2 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6 block">AI Automation Suite</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Build Your <span className="font-serif italic font-normal">Custom AI Suite</span>
              </h2>
              <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                Audit your company's bottlenecks in 2 minutes. Receive custom-tailored AI workflow agents, calculate real-time monthly ROI, and deploy your custom automations instantly.
              </p>
              <a
                href="https://proposal.the-marketingverse.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="magic"
                className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-all hover:scale-105 shadow-xl"
              >
                Build My AI Suite <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <FAQSection items={AI_FAQS} label="AI Workflow Questions, Answered" />

      <ConsultationCTA onBookConsultation={onBookConsultation} />
    </div>
  </div>
);

const BlogView: React.FC<{ blogs: BlogPost[]; onReadMore: (blog: BlogPost) => void }> = ({ blogs, onReadMore }) => (
  <div className="animate-fade-in py-20 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold mb-4">The Verse Journal</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Insights, strategies, and futurist predictions from the Marketingverse team.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <RevealOnScroll key={blog.id} delay={i * 50}>
            <div
              onClick={() => onReadMore(blog)}
              className="group cursor-pointer mv-glass mv-lift rounded-3xl overflow-hidden h-full flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {blog.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4 font-bold uppercase tracking-widest">
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {blog.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-black opacity-60 group-hover:opacity-100 transition-opacity">
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </div>
);

const ThankYouView: React.FC = () => (
  <div className="animate-fade-in min-h-screen flex items-center justify-center py-32 relative z-10">
    <div className="max-w-2xl mx-auto px-4 text-center">
      {/* Checkmark */}
      <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center mx-auto mb-10 shadow-2xl">
        <Check size={44} className="text-white" strokeWidth={3} />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-6 block">You're In</span>

      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        We'll Be In <span className="font-serif italic font-normal">Touch Soon.</span>
      </h1>

      <p className="text-xl text-neutral-600 leading-relaxed mb-6 max-w-lg mx-auto">
        Your strategy call is booked. Our team will review your business before we meet so we can hit the ground running.
      </p>

      <p className="text-base text-neutral-500 mb-14">
        Check your email for a confirmation and calendar invite. In the meantime, feel free to explore what we do.
      </p>

      {/* What happens next */}
      <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
        {[
          { step: '01', title: 'Confirmation Email', desc: "You'll receive a calendar invite with all the details." },
          { step: '02', title: 'We Prep Your Profile', desc: "We research your brand and market before the call." },
          { step: '03', title: 'Strategy Session', desc: 'We show up ready with a tailored growth roadmap for you.' },
        ].map(({ step, title, desc }) => (
          <div key={step} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest block mb-3">{step}</span>
            <h4 className="font-bold mb-2">{title}</h4>
            <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <a
        href="/"
        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all hover:scale-105 shadow-lg"
      >
        Back to Home <ArrowRight size={18} />
      </a>
    </div>
  </div>
);

const ContactView: React.FC = () => (
  <div className="animate-fade-in py-20 relative z-10">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <RevealOnScroll>
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Get In Touch</span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Let's Build Something <span className="font-serif italic font-normal">Great.</span>
          </h2>
          <p className="text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Whether you have a question about our services, pricing, or just want to talk strategy — we're here.
          </p>
        </div>
      </RevealOnScroll>

      {/* Contact cards row */}
      <RevealOnScroll>
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: <Mail size={22} />,
              label: 'Email Us',
              value: 'hello@the-marketingverse.com',
              href: 'mailto:hello@the-marketingverse.com',
            },
            {
              icon: <Phone size={22} />,
              label: 'Call Us',
              value: '+1 (786) 705-3154',
              href: 'tel:+17867053154',
            },
            {
              icon: <MapPin size={22} />,
              label: 'HQ Location',
              value: '8400 NW 33rd St, Suite 104\nDoral, FL 33122',
              href: 'https://maps.google.com/?q=8400+NW+33rd+St+Suite+104+Doral+FL+33122',
              external: true,
            },
          ].map(({ icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="mv-glass mv-lift rounded-3xl p-8 flex flex-col gap-4 group"
            >
              <div className="p-3 rounded-2xl bg-neutral-100 text-neutral-500 w-fit group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                {icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">{label}</p>
                <p className="font-semibold text-neutral-900 leading-snug whitespace-pre-line">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </RevealOnScroll>

      {/* Social row */}
      <RevealOnScroll delay={80}>
        <div className="mv-glass rounded-3xl p-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">Connect on Social</p>
            <p className="font-semibold text-neutral-700">Follow us for daily insights and behind-the-scenes content.</p>
          </div>
          <div className="flex gap-3">
            {[
              { icon: <Instagram size={20} />, href: 'https://www.instagram.com/the.marketingverse' },
              { icon: <Facebook size={20} />, href: 'https://www.facebook.com/themarketingverse' },
              { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/company/marketingverse' },
              { icon: <Youtube size={20} />, href: 'https://www.youtube.com/@marketingverse' },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-900 hover:text-white transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Map */}
      <RevealOnScroll delay={160}>
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-200 h-[420px] w-full">
          <iframe
            src="https://maps.google.com/maps?q=8400%20NW%2033rd%20St%20Suite%20104%20Doral%20FL%2033122&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Marketingverse HQ Map"
          />
        </div>
      </RevealOnScroll>

    </div>
  </div>
);

// ── SEO ──────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://home.the-marketingverse.com';
const DEFAULT_IMAGE = 'https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/6a189e3df58810f313b623a3.png';

interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  schema: object;
}

const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: 'Marketingverse | AI Social Media & CRM for Realtors',
    description: 'Marketingverse gives Florida real estate agents automated social media, a broker CRM, and AI tools — all in one membership. Book a demo.',
    keywords: 'real estate marketing, social media for real estate, broker CRM, AI real estate tools, real estate automation, AI marketing for realtors',
    canonical: `${BASE_URL}/`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Marketingverse',
      url: BASE_URL,
      logo: DEFAULT_IMAGE,
      description: 'AI-powered social media, broker CRM, and marketing automation for Florida real estate agents.',
      contactPoint: { '@type': 'ContactPoint', telephone: '+1-786-705-3154', contactType: 'sales', email: 'hello@the-marketingverse.com' },
      sameAs: ['https://www.instagram.com/themarketingverse', 'https://www.facebook.com/themarketingverse'],
    },
  },
  social: {
    title: 'Social Media Marketing for Realtors | Marketingverse',
    description: 'AI-powered social media management built for real estate agents. We create, post, and optimize content that builds trust, grows your audience, and drives inbound leads.',
    keywords: 'social media for real estate agents, realtor social media management, real estate Instagram marketing, AI content for realtors, social media automation real estate',
    canonical: `${BASE_URL}/#social`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Social Media Marketing for Real Estate',
      provider: { '@type': 'Organization', name: 'Marketingverse', url: BASE_URL },
      description: 'Done-for-you social media management for Florida real estate agents — content creation, scheduling, analytics, and AI-powered storytelling.',
      areaServed: { '@type': 'State', name: 'Florida' },
      serviceType: 'Social Media Management',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        description: 'Monthly social media management packages for real estate professionals.',
      },
    },
  },
  crm: {
    title: 'Broker CRM Suite for Real Estate Brokerages | Marketingverse',
    description: 'All-in-one brokerage CRM with AI marketing, lead routing, agent dashboards, automated campaigns, and cohesive branding. Built for Florida brokerages.',
    keywords: 'broker CRM, real estate CRM, brokerage management software, real estate lead management, agent performance dashboard, real estate marketing automation',
    canonical: `${BASE_URL}/#crm`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Marketingverse Broker CRM Suite',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      description: 'All-in-one CRM platform for real estate brokerages — lead routing, agent dashboards, social media planner, email and SMS marketing, and AI-powered campaigns.',
      provider: { '@type': 'Organization', name: 'Marketingverse', url: BASE_URL },
      featureList: ['Agent Dashboards', 'Lead Routing', 'Social Media Planner', 'Email Marketing', 'SMS & WhatsApp', 'Ads Launcher', 'Mobile App'],
      offers: { '@type': 'Offer', priceCurrency: 'USD' },
    },
  },
  integrations: {
    title: 'AI Workflow Automation for Real Estate | Marketingverse',
    description: 'Custom AI integrations and workflow automation for real estate professionals — from intelligent lead triage and content generation to CRM sync and multi-channel outreach.',
    keywords: 'AI real estate automation, AI workflow real estate, real estate AI tools, lead triage automation, AI content generation real estate, CRM automation realtors',
    canonical: `${BASE_URL}/#integrations`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'AI Workflow Automation for Real Estate',
      provider: { '@type': 'Organization', name: 'Marketingverse', url: BASE_URL },
      description: 'Custom AI-powered workflow automations for real estate agents and brokerages — lead qualification, content pipelines, CRM integrations, and intelligent follow-up systems.',
      serviceType: 'AI Automation & Systems Integration',
      areaServed: { '@type': 'Country', name: 'United States' },
    },
  },
  blog: {
    title: 'Real Estate Marketing Blog & Insights | Marketingverse',
    description: 'Expert articles on real estate marketing, AI automation, social media strategy, and growth tactics — straight from the Marketingverse team.',
    keywords: 'real estate marketing blog, realtor marketing tips, AI real estate content, social media strategy realtors, real estate growth tactics',
    canonical: `${BASE_URL}/#blog`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Marketingverse Marketing Intelligence',
      description: 'Insights, trends, and strategies in real estate marketing and AI automation.',
      url: `${BASE_URL}/#blog`,
      publisher: { '@type': 'Organization', name: 'Marketingverse', logo: DEFAULT_IMAGE },
    },
  },
  contact: {
    title: 'Contact Marketingverse | Book a Free Strategy Call',
    description: 'Ready to scale your real estate brand? Book a free strategy call with Marketingverse or send us a message — we\'ll build a tailored growth roadmap for your business.',
    keywords: 'contact Marketingverse, book real estate marketing consultation, real estate marketing strategy call, hire real estate marketing agency',
    canonical: `${BASE_URL}/#contact`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Marketingverse',
      url: `${BASE_URL}/#contact`,
      description: 'Get in touch with the Marketingverse team to book a free strategy call or send us a message.',
      mainEntity: {
        '@type': 'Organization',
        name: 'Marketingverse',
        telephone: '+1-786-705-3154',
        email: 'hello@the-marketingverse.com',
      },
    },
  },
  projects: {
    title: 'Our Work & Client Results | Marketingverse',
    description: 'See how Marketingverse has helped real estate agents and brokerages scale through AI-powered marketing, cinematic content, and smart automation.',
    keywords: 'real estate marketing portfolio, realtor marketing results, Marketingverse client work, real estate content examples, social media real estate case studies',
    canonical: `${BASE_URL}/#projects`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Marketingverse Featured Work',
      url: `${BASE_URL}/#projects`,
      description: 'Portfolio of real estate marketing campaigns, social media content, and AI workflow projects by Marketingverse.',
      provider: { '@type': 'Organization', name: 'Marketingverse', url: BASE_URL },
    },
  },
};

const setMeta = (attr: string, key: string, value: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
};

const applyPageSEO = (view: string) => {
  const seo = PAGE_SEO[view] || PAGE_SEO.home;

  // Title
  document.title = seo.title;

  // Basic meta
  setMeta('name', 'description', seo.description);
  setMeta('name', 'keywords', seo.keywords);
  setMeta('name', 'robots', 'index, follow');

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = seo.canonical;

  // Open Graph
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:url', seo.canonical);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Marketingverse');
  setMeta('property', 'og:image', DEFAULT_IMAGE);

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', DEFAULT_IMAGE);

  // JSON-LD schema
  let schemaEl = document.getElementById('page-schema') as HTMLScriptElement | null;
  if (!schemaEl) {
    schemaEl = document.createElement('script');
    schemaEl.id = 'page-schema';
    schemaEl.type = 'application/ld+json';
    document.head.appendChild(schemaEl);
  }
  schemaEl.textContent = JSON.stringify(seo.schema);
};

// ─────────────────────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [view, setView] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '');
    if (path && path !== 'index.html') return path;
    return window.location.hash.replace('#', '') || 'home';
  });

  const navigate = useCallback((v: string) => {
    if (v === 'thank-you') {
      window.location.href = '/thank-you';
      return;
    }
    window.history.pushState({}, '', `/#${v}`);
    setView(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setView(hash);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Update all SEO meta tags whenever the view changes
  useEffect(() => { applyPageSEO(view); }, [view]);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('mverse_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (view !== 'blog') {
      setSelectedBlog(null);
    }
  }, [view]);

  // Scroll to top when opening a blog post
  useEffect(() => {
    if (selectedBlog) {
      window.scrollTo(0, 0);
    }
  }, [selectedBlog]);

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView changeView={navigate} onBookConsultation={() => setIsBookingOpen(true)} />;
      case 'thank-you':
        return <ThankYouView />;
      case 'contact':
        return <ContactView />;
      case 'social':
        return <SocialBrandsView onBookConsultation={() => setIsBookingOpen(true)} />;
      case 'social-agents':
        return <SocialMediaView onInitiateGrowth={() => setIsBookingOpen(true)} onBookConsultation={() => setIsBookingOpen(true)} />;
      case 'crm':
        return <BrokerCRMView onSubscribe={() => setIsBookingOpen(true)} onBookConsultation={() => setIsBookingOpen(true)} />;
      case 'integrations':
        return <AIWorkflowsView onInitiateRequest={() => setIsBookingOpen(true)} onBookConsultation={() => setIsBookingOpen(true)} />;
      case 'blog':
        if (selectedBlog) {
          return (
            <div className="animate-fade-in relative z-10 pt-32 pb-24">
               <div className="max-w-3xl mx-auto px-4">
                  <button onClick={() => setSelectedBlog(null)} className="mb-8 flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black transition-colors group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Articles
                  </button>
                  
                  <div className="mb-8 rounded-3xl overflow-hidden aspect-video shadow-lg">
                     <img src={selectedBlog.imageUrl} alt={selectedBlog.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs md:text-sm text-neutral-500 mb-6 font-bold uppercase tracking-widest">
                     <span>{selectedBlog.date}</span>
                     <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                     <span>{selectedBlog.category}</span>
                     <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                     <span>{selectedBlog.author}</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">{selectedBlog.title}</h1>
                  
                  <div className="prose prose-lg text-neutral-600 leading-relaxed whitespace-pre-line mb-16">
                     {selectedBlog.content}
                  </div>
                  
                  <div className="bg-neutral-50 rounded-[2.5rem] p-8 md:p-12 border border-neutral-200">
                     <h3 className="text-2xl font-bold mb-6">Have questions about this strategy?</h3>
                     <p className="text-neutral-600 mb-8">Our AI agent has read this article and can answer questions or help you implement these ideas.</p>
                     <AIBot context={`Article Title: ${selectedBlog.title}\n\nArticle Content:\n${selectedBlog.content}`} initialMessage="I've analyzed this article. What would you like to know about applying this strategy?" />
                  </div>
               </div>
            </div>
          );
        }
        return (
           <div className="animate-fade-in relative z-10 pt-32 pb-24">
              <div className="max-w-4xl mx-auto px-4">
                 <div className="text-center mb-20">
                   <h2 className="text-5xl font-bold mb-6">Marketing Intelligence</h2>
                   <p className="text-xl text-neutral-600">Insights, trends, and strategies from the Marketingverse team.</p>
                 </div>
                 <div className="space-y-16">
                   {INITIAL_BLOGS.map((blog) => (
                     <article 
                        key={blog.id} 
                        onClick={() => setSelectedBlog(blog)}
                        className="group cursor-pointer"
                     >
                        <div className="aspect-[2/1] rounded-3xl overflow-hidden mb-8 border border-neutral-200 shadow-sm relative">
                           <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                           <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">{blog.category}</div>
                        </div>
                        <div className="max-w-3xl mx-auto">
                           <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
                             <span>{blog.date}</span>
                             <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                             <span>{blog.author}</span>
                           </div>
                           <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                           <p className="text-neutral-600 leading-relaxed mb-6 text-lg">{blog.excerpt}</p>
                           <div className="flex items-center text-sm font-bold border-b border-black pb-1 w-fit group-hover:border-blue-600 group-hover:text-blue-600 transition-colors">
                             Read Full Article <ArrowRight size={16} className="ml-2" />
                           </div>
                        </div>
                     </article>
                   ))}
                 </div>
              </div>
           </div>
        );
      case 'projects':
        return <SuccessCasesView />;
      case 'privacy-policy':
        return <LegalPage title="Privacy Policy" lastUpdated="July 7, 2026" sections={PRIVACY_SECTIONS} />;
      case 'terms-and-conditions':
        return <LegalPage title="Terms & Conditions" lastUpdated="July 7, 2026" sections={TERMS_SECTIONS} />;
      default:
        return <HomeView changeView={navigate} onBookConsultation={() => setIsBookingOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <CustomCursor />
      <AbstractBackground />
      <NavBar active={view} setView={navigate} onBookConsultation={() => setIsBookingOpen(true)} />
      
      <main className="relative z-10 min-h-screen">
        <ErrorBoundary key={view}>
          {renderView()}
        </ErrorBoundary>
      </main>

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} onNavigate={navigate} />
      
      <BackToTop />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      {isAdminOpen && <AdminPortal projects={projects} setProjects={setProjects} onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
};

export default App;