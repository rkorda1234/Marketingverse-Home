import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { captureAdAttribution, getGHLFormSrc } from './utils/adAttribution';
import {
  ArrowRight, Check, X, ChevronDown, Download, Play,
  TrendingUp, Users, Eye, Heart, Star, CheckCircle2,
  Instagram, Facebook, Zap, Target, Award, Camera
} from 'lucide-react';

// ── Constants ──────────────────────────────────────────────────────────────
const MV_LOGO = '/logo.png';
const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/8pROsd9gdPhAtmnP5YHd';
const VIMEO_SHOWCASE = 'https://vimeo.com/showcase/9806547/embed2';
const VIMEO_RESULTS: { id: string; label: string; accent: string }[] = [
  { id: '1173074414', label: 'Fun & Elegant', accent: 'from-rose-400 to-pink-600' },
  { id: '1173074396', label: 'Polished & Professional', accent: 'from-slate-400 to-slate-700' },
  { id: '1173074432', label: 'Bold & Witty', accent: 'from-orange-400 to-red-500' },
];

// ── Reveal on scroll ───────────────────────────────────────────────────────
const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ── Vimeo Facade ───────────────────────────────────────────────────────────
const VimeoFacade: React.FC<{ id: string; title?: string; aspect?: string }> = ({ id, title = 'Video', aspect = '177.78%' }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-black" style={{ paddingTop: aspect }}>
      {playing ? (
        <iframe className="absolute inset-0 w-full h-full" src={`https://player.vimeo.com/video/${id}?autoplay=1&muted=0&loop=0`} allow="autoplay; fullscreen" allowFullScreen title={title} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer group bg-neutral-900" onClick={() => setPlaying(true)}>
          <img src={`https://vumbnail.com/${id}.jpg`} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity" />
          <div className="relative z-10 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play size={24} className="text-black ml-1" fill="black" />
          </div>
        </div>
      )}
    </div>
  );
};

// ── Booking Modal ──────────────────────────────────────────────────────────
const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const src = getGHLFormSrc(BOOKING_URL);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col" style={{ maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow border border-neutral-200 hover:bg-neutral-100 transition-colors">
          <X size={18} />
        </button>
        <iframe src={src} allow="payment" className="w-full border-none" style={{ minHeight: '85vh', display: 'block' }} scrolling="no" title="Book a Strategy Call" />
      </div>
    </div>
  );
};

// ── Lead Magnet Modal ──────────────────────────────────────────────────────
const GUIDE_HOOKS = [
  { category: 'Fear Hook', example: '"Most agents post listings. Top agents post trust. Here\'s the difference."', why: 'Triggers identity contrast — agents self-identify as "top" and feel the gap.' },
  { category: 'Curiosity Hook', example: '"The one thing I stopped doing on social that doubled my referrals."', why: 'Opens a loop the brain needs to close. Works for Reels and carousels.' },
  { category: 'Contraste Hook', example: '"Bad: \'Just listed 3/2 in Brickell.\' Good: The story of the family who almost gave up — then found this home."', why: 'Side-by-side contrast is faster than explanation.' },
  { category: 'Identification Hook', example: '"If you\'ve ever felt like you\'re invisible online while other agents blow up — this is for you."', why: 'First line sounds like a DM to a friend. Zero sales energy.' },
  { category: 'Authority Hook', example: '"I\'ve sold $40M in the last 3 years. Social media was responsible for 60% of my pipeline. Here\'s how."', why: 'Numbers create credibility instantly without bragging.' },
  { category: 'Story Hook', example: '"My client almost bought the wrong house because of Zillow. What I showed her instead changed everything."', why: 'Conflict in line 1. Nobody stops scrolling mid-conflict.' },
];
const GUIDE_FORMATS = [
  { name: 'Narrated B-Roll', description: 'You record a voiceover over footage of the home, neighborhood, or your day. 3 seconds max per scene. No talking to camera required.', best: 'Listing highlights, neighborhood tours, market updates' },
  { name: 'Split Screen', description: 'Bad listing description left side / great story right side. Wrong way vs. right way. Before buyer mindset vs. after.', best: 'Busting myths, educating buyers/sellers, contraste content' },
  { name: 'Lo-Fi Talking Head', description: 'Phone propped up, natural light, no script — just you answering one question a client asked this week. Feels like a friend, not an ad.', best: 'Building trust, objection-busting, market Q&A' },
  { name: 'Behind the Scenes', description: 'Process before result. The staging chaos, the offer night, the inspection surprise. Show what happens before the sold sign.', best: 'Humanizing the brand, showing expertise in action' },
  { name: 'Análisis Estratégico', description: 'Break down why a home sold for $50K over ask. 3 reasons. Each reason = a reason to hire you. No direct pitch needed.', best: 'Authority content, sellers market, luxury tier' },
  { name: 'Client Story (Él→Yo→Tú)', description: 'Their situation → what you did → what\'s possible for the viewer. Never ask permission to tell a client\'s story — you tell the type, not the name.', best: 'Testimonial alternative, trust-building, first-time buyers' },
];

const LeadMagnetModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'guide'>('form');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setStep('guide'); }, 800);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative" style={{ maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
          <X size={18} />
        </button>

        {step === 'form' ? (
          <div className="p-8 md:p-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500 block mb-3">Free Guide</span>
            <h2 className="text-3xl font-bold mb-2 leading-tight">The Realtor's Social Media<br /><span className="font-serif italic font-normal">Hook & Format Playbook</span></h2>
            <p className="text-neutral-500 mb-8">6 hooks that stop the scroll + 6 formats any agent can produce. No studio. No team. No cringe.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl bg-black text-white font-bold text-sm tracking-wide hover:bg-neutral-800 transition-all disabled:opacity-60">
                {submitting ? 'Sending…' : 'Send Me the Playbook →'}
              </button>
            </form>
            <p className="text-neutral-400 text-xs mt-4 text-center">No spam. Just the guide and occasional insights for serious agents.</p>
          </div>
        ) : (
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 size={20} className="text-green-500" />
              <span className="text-sm font-semibold text-green-600">Guide unlocked — check your email too, {name.split(' ')[0]}.</span>
            </div>
            <h2 className="text-2xl font-bold mb-1">The Realtor's Hook & Format Playbook</h2>
            <p className="text-neutral-500 text-sm mb-8">By Marketingverse · For agents who are done being invisible online.</p>

            <div className="mb-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Zap size={18} className="text-indigo-500" /> Part 1: 6 Hooks That Stop the Scroll</h3>
              <div className="space-y-4">
                {GUIDE_HOOKS.map((h, i) => (
                  <div key={i} className="border border-neutral-100 rounded-2xl p-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 block mb-2">{h.category}</span>
                    <p className="text-sm font-medium text-neutral-800 mb-2 italic">"{h.example}"</p>
                    <p className="text-xs text-neutral-500"><span className="font-semibold">Why it works:</span> {h.why}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Camera size={18} className="text-violet-500" /> Part 2: 6 Formats Any Agent Can Produce</h3>
              <div className="space-y-4">
                {GUIDE_FORMATS.map((f, i) => (
                  <div key={i} className="border border-neutral-100 rounded-2xl p-5">
                    <span className="font-bold text-sm block mb-1">{f.name}</span>
                    <p className="text-sm text-neutral-600 mb-2">{f.description}</p>
                    <p className="text-xs text-indigo-600 font-medium">Best for: {f.best}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black text-white rounded-2xl p-6 text-center">
              <p className="font-bold mb-2">Ready to turn this into a system that runs itself?</p>
              <p className="text-neutral-400 text-sm mb-4">We do this for top agents every month. Book a free strategy call and we'll build your roadmap.</p>
              <button onClick={onClose} className="px-8 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-neutral-100 transition-all">
                Book a Strategy Call
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main App ───────────────────────────────────────────────────────────────
const RealtorsLanding: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    captureAdAttribution();
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBooking = () => setBookingOpen(true);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-neutral-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
            <img src={MV_LOGO} alt="Marketingverse" className="h-8 w-auto" />
          </button>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <button onClick={() => scrollTo('philosophy')} className="hover:text-black transition-colors">Our Approach</button>
            <button onClick={() => scrollTo('work')} className="hover:text-black transition-colors">Sample Work</button>
            <button onClick={() => scrollTo('plans')} className="hover:text-black transition-colors">Plans</button>
            <button onClick={() => setGuideOpen(true)} className="hover:text-black transition-colors text-indigo-600 font-semibold">Free Guide</button>
          </div>
          <button onClick={openBooking} className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-neutral-800 transition-all">
            Book Strategy Call
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-neutral-100">
            <div className="w-5 h-0.5 bg-black mb-1" /><div className="w-5 h-0.5 bg-black mb-1" /><div className="w-5 h-0.5 bg-black" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100 px-4 py-4 space-y-3">
            <button onClick={() => scrollTo('philosophy')} className="block w-full text-left text-sm font-medium py-2">Our Approach</button>
            <button onClick={() => scrollTo('work')} className="block w-full text-left text-sm font-medium py-2">Sample Work</button>
            <button onClick={() => scrollTo('plans')} className="block w-full text-left text-sm font-medium py-2">Plans</button>
            <button onClick={() => { setGuideOpen(true); setMenuOpen(false); }} className="block w-full text-left text-sm font-semibold text-indigo-600 py-2">Free Guide</button>
            <button onClick={() => { openBooking(); setMenuOpen(false); }} className="w-full py-3 bg-black text-white text-sm font-bold rounded-xl">Book Strategy Call</button>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50 pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-indigo-100/60 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-100/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-600 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Built Exclusively for Real Estate Agents
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Most agents post.<br />
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Top agents convert.</span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-12 leading-relaxed">
            Your next client is already on Instagram. They just don't know you exist yet. We fix that — with content that builds the trust that closes deals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={openBooking} className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-all hover:scale-105 shadow-xl">
              Book Your Free Strategy Call <ArrowRight size={20} />
            </button>
            <button onClick={() => setGuideOpen(true)} className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-neutral-200 text-neutral-800 rounded-2xl font-bold text-lg hover:border-indigo-300 hover:text-indigo-600 transition-all">
              <Download size={20} /> Get the Free Playbook
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[['150+', 'Agents Served'], ['4.8×', 'Avg. Engagement Lift'], ['$0', 'Ad Spend Required']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold text-black">{n}</div>
                <div className="text-xs text-neutral-500 mt-1">{l}</div>
              </div>
            ))}
          </div>

          <button onClick={() => scrollTo('philosophy')} className="mt-16 flex flex-col items-center gap-2 mx-auto text-neutral-400 hover:text-neutral-600 transition-colors group">
            <span className="text-xs uppercase tracking-widest font-medium">See how it works</span>
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section id="philosophy" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500 block mb-4">Our Approach</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Social media for realtors<br />
                <span className="font-serif italic font-normal">isn't about listings.</span>
              </h2>
              <p className="text-xl text-neutral-500 max-w-3xl mx-auto leading-relaxed">
                Every top agent we've worked with had the same problem: great at real estate, invisible online. The ones who win aren't posting the most — they're building the most trust.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              { icon: Eye, color: 'indigo', title: 'Market Visibility', body: "When a homeowner in your farm area thinks \"time to sell,\" your face comes to mind first — not because you bought ads, but because you've been showing up authentically every week." },
              { icon: Heart, color: 'rose', title: 'Trust at Scale', body: "Referrals used to be the only way to get warm leads. Now social media lets you build the same trust with hundreds of people simultaneously — people who've never met you but feel like they know you." },
              { icon: Award, color: 'violet', title: 'Niche Authority', body: "Luxury. First-time buyers. Relocation. Investors. The agents who dominate a niche do it by speaking directly to that audience's fears and desires — not by posting for everyone." },
              { icon: TrendingUp, color: 'emerald', title: 'Compounding Pipeline', body: "A listing you post disappears. A reputation you build compounds. Every piece of content we create adds to an asset that works for you 24/7, long after the post goes live." },
            ].map(({ icon: Icon, color, title, body }, i) => (
              <RevealOnScroll key={title} delay={i * 100}>
                <div className="p-8 rounded-3xl border border-neutral-100 hover:border-neutral-200 hover:shadow-lg transition-all h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-${color}-50 flex items-center justify-center mb-5`}>
                    <Icon size={22} className={`text-${color}-500`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{title}</h3>
                  <p className="text-neutral-500 leading-relaxed text-sm">{body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* The wrong vs. right split */}
          <RevealOnScroll>
            <div className="rounded-3xl overflow-hidden border border-neutral-100 shadow-sm">
              <div className="grid md:grid-cols-2">
                <div className="bg-neutral-50 p-8 md:p-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-4">What most agents do</span>
                  <ul className="space-y-3">
                    {['"Just listed" posts nobody saves', 'Generic market update graphics', 'Posting once a week when they remember', 'Content that looks like every other agent', 'Chasing followers instead of trust'].map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm text-neutral-500">
                        <X size={14} className="text-red-400 mt-0.5 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black text-white p-8 md:p-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-4">What Marketingverse agents do</span>
                  <ul className="space-y-3">
                    {['Stories that make clients feel seen before they call', 'Niche content that speaks to exactly one buyer profile', 'Consistent publishing — even when they\'re busy', 'A recognizable brand nobody else can copy', 'An audience that already trusts them before the first showing'].map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Check size={14} className="text-indigo-400 mt-0.5 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Sample Work ── */}
      <section id="work" className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500 block mb-4">Sample Work</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Real accounts.<br /><span className="font-serif italic font-normal">Real results.</span>
              </h2>
              <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Every brand looks different because every agent is different. Here's what we've built for agents across South Florida.</p>
            </div>
          </RevealOnScroll>

          {/* 3 phone mockups */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {VIMEO_RESULTS.map(({ id, label, accent }, i) => (
              <RevealOnScroll key={id} delay={i * 120}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-w-[260px] mx-auto">
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-neutral-900 bg-black aspect-[9/19.5]">
                      <VimeoFacade id={id} title={label} aspect="211%" />
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-white text-xs font-bold bg-gradient-to-r ${accent}`}>{label}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Showcase embed */}
          <RevealOnScroll>
            <div className="rounded-3xl overflow-hidden shadow-lg border border-neutral-100 bg-black aspect-video">
              <iframe src={VIMEO_SHOWCASE} className="w-full h-full border-none" allowFullScreen title="Marketingverse Showcase" />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Lead Magnet CTA Banner ── */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest block mb-2">Free Playbook</span>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">The Realtor's Hook & Format Guide</h3>
            <p className="text-indigo-200 text-sm">6 hooks that stop the scroll + 6 formats any agent can produce today.</p>
          </div>
          <button onClick={() => setGuideOpen(true)} className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-all hover:scale-105 shadow-xl whitespace-nowrap">
            <Download size={18} /> Get It Free
          </button>
        </div>
      </section>

      {/* ── Plans ── */}
      <section id="plans" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500 block mb-4">Social Media Plans</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Pick your level of<br /><span className="font-serif italic font-normal">market dominance.</span>
              </h2>
              <p className="text-neutral-500 max-w-xl mx-auto">Every plan includes brand setup, content strategy, and professional editing. No templates. No recycled content.</p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Growth',
                price: '$340',
                badge: 'Start Here',
                dark: false,
                features: ['Full brand identity setup', '8 Posts/month (Reels + Statics)', '12 IG Stories/month', 'Professional video & photo editing', 'AI caption & hashtag optimization', '2 IG Boosts/month', 'Strategy & coaching sessions'],
                cta: 'Get Started',
              },
              {
                name: 'Dominance',
                price: '$750',
                badge: 'Most Popular',
                dark: true,
                features: ['12 IG/FB Posts/month', '4 LinkedIn Posts/month', '20 IG/FB Stories/month', 'Strategy & coaching sessions', '4 IG Boosts/month', 'Professional video & photo editing', 'AI caption & hashtag optimization'],
                cta: 'Dominate Your Market',
              },
              {
                name: 'Brand Authority',
                price: 'Custom',
                badge: 'Full Service',
                dark: false,
                features: ['Everything in Dominance', 'Custom content shoots monthly', 'Full-service ad management', 'AI Automation workflows', 'Dedicated account manager', 'Quarterly brand audits'],
                cta: 'Let\'s Talk',
              },
            ].map(({ name, price, badge, dark, features, cta }, i) => (
              <RevealOnScroll key={name} delay={i * 100}>
                <div className={`rounded-3xl p-8 flex flex-col h-full border relative overflow-hidden ${dark ? 'bg-black text-white border-neutral-800' : 'bg-white text-neutral-900 border-neutral-200'}`}>
                  {dark && <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none" />}
                  <div className="relative z-10 flex flex-col h-full">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${dark ? 'text-indigo-400' : 'text-indigo-500'}`}>{badge}</span>
                    <h3 className="text-2xl font-bold mb-1">{name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-bold">{price}</span>
                      {price !== 'Custom' && <span className={`text-sm ${dark ? 'text-neutral-400' : 'text-neutral-500'}`}>/mo</span>}
                    </div>
                    <ul className="space-y-3 flex-1 mb-8">
                      {features.map(f => (
                        <li key={f} className={`flex items-start gap-3 text-sm ${dark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                          <Check size={14} className={`mt-0.5 shrink-0 ${dark ? 'text-indigo-400' : 'text-indigo-500'}`} />{f}
                        </li>
                      ))}
                    </ul>
                    <button onClick={openBooking} className={`w-full py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] ${dark ? 'bg-white text-black hover:bg-neutral-100' : 'bg-black text-white hover:bg-neutral-800'}`}>
                      {cta}
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial / Trust ── */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-500 block mb-4">Why Top Agents Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold">We don't run a content mill.<br /><span className="font-serif italic font-normal">We build brands that outlast listings.</span></h2>
            </div>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: '100%', label: 'Done-for-you', body: 'You send us your listings, your stories, your moments. We turn them into content. You close deals.' },
              { stat: '30 days', label: 'To see results', body: 'Most agents notice engagement and inbound DMs within their first 30 days of consistent publishing.' },
              { stat: '1 team', label: 'That knows RE', body: 'We work exclusively with real estate professionals. No learning curve. No generic advice.' },
            ].map(({ stat, label, body }, i) => (
              <RevealOnScroll key={stat} delay={i * 100}>
                <div className="bg-white rounded-3xl p-8 border border-neutral-100 text-center shadow-sm">
                  <div className="text-4xl font-bold text-indigo-600 mb-1">{stat}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">{label}</div>
                  <p className="text-neutral-500 text-sm leading-relaxed">{body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.2),_transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 block mb-6">Ready to be the most visible agent in your market?</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              One call.<br /><span className="font-serif italic font-normal">Your entire social roadmap.</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Book a free 30-minute strategy call. We'll review your current presence, identify what's costing you deals, and show you exactly what to do next — whether you work with us or not.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openBooking} className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-neutral-100 transition-all hover:scale-105 shadow-2xl">
                Book My Free Strategy Call <ArrowRight size={20} />
              </button>
              <button onClick={() => setGuideOpen(true)} className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-2xl font-bold text-base hover:bg-white/10 transition-all">
                <Download size={18} /> Free Hook Playbook
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-neutral-900 text-neutral-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={MV_LOGO} alt="Marketingverse" className="h-7 w-auto opacity-70" />
            <span className="text-xs">© {new Date().getFullYear()} Marketingverse. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/themarketingverse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/themarketingverse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={18} /></a>
            <a href="mailto:hello@the-marketingverse.com" className="text-xs hover:text-white transition-colors">hello@the-marketingverse.com</a>
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <LeadMagnetModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
    </div>
  );
};

// ── Mount ──────────────────────────────────────────────────────────────────
const root = document.getElementById('root');
if (root) ReactDOM.createRoot(root).render(<React.StrictMode><RealtorsLanding /></React.StrictMode>);
