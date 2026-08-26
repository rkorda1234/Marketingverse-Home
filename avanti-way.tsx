import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowRight, Check, Instagram, Facebook, X, ArrowUp,
  CreditCard, Layers, Layout, FileText, PenTool, Upload, Camera,
  Cpu, Users, Wand2, Video, ImageIcon, Calendar, TrendingUp,
  Shield, Heart, CheckCircle2, Star, Zap, Bot, Building2, Play,
  MessageSquare, ClipboardList, Headphones, Megaphone
} from 'lucide-react';
import { RevealOnScroll } from './components/RevealOnScroll';
import { AIBot } from './components/AIBot';
import { CustomCursor } from './components/CustomCursor';
import './index.css';

// ── Constants ──────────────────────────────────────────────────────────────
const AVANTI_LOGO = 'https://storage.googleapis.com/msgsndr/CFAAUO2gnPooyim4LdoM/media/6944c02faca6ab53cc7aa4b9.png';
const ORDER_URL   = 'https://billing.zohosecure.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/StartUpPackageAvanti';
const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/8pROsd9gdPhAtmnP5YHd';

// ── Start-Up Package deliverables ──────────────────────────────────────────
const DELIVERABLES = [
  { id: 'cards',    icon: <CreditCard size={22} />, title: 'Business Card Template',    desc: "Personalization of Avanti's business card templates plus coordination with printer.",          img: 'https://storage.googleapis.com/msgsndr/CFAAUO2gnPooyim4LdoM/media/69456bedaca6ab79968e82b2.png' },
  { id: 'social',   icon: <Instagram  size={22} />, title: '3 Social Media Posts',      desc: 'Launch your presence with professionally curated authority-building content.',                 img: 'https://storage.googleapis.com/msgsndr/CFAAUO2gnPooyim4LdoM/media/694570f91739662c88a8907a.png' },
  { id: 'logo',     icon: <Layers     size={22} />, title: 'Logo Broker Integration',   desc: 'Seamlessly blend your identity with the Avanti Way brokerage brand.',                        img: 'https://storage.googleapis.com/msgsndr/CFAAUO2gnPooyim4LdoM/media/69457dbb0190af17b5f0e5d6.png' },
  { id: 'profiles', icon: <Layout     size={22} />, title: 'Online RE Profiles',        desc: 'On-brand setup for your Zillow, Realtor.com and Trulia profiles.',                           img: 'https://storage.googleapis.com/msgsndr/CFAAUO2gnPooyim4LdoM/media/69457f639a634f21631c0f60.png' },
  { id: 'flyer',    icon: <FileText   size={22} />, title: 'Digital Flyer Design',      desc: 'Luxury digital flyer personalization from Avanti Templates.',                                 img: 'https://storage.googleapis.com/msgsndr/CFAAUO2gnPooyim4LdoM/media/69457c3c8cae8f853cf05b25.png' },
  { id: 'bios',     icon: <PenTool    size={22} />, title: 'Professional Profile Bios', desc: 'Strategic storytelling that highlights your expertise and local market authority.',            img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800' },
  { id: 'crm',      icon: <Upload     size={22} />, title: 'Avex CRM Contact Upload',   desc: 'Instant contact sync — we handle the heavy lifting of your Avex CRM migration.',             img: 'https://storage.googleapis.com/msgsndr/CFAAUO2gnPooyim4LdoM/media/69458154106fdc613f031b71.png' },
  { id: 'photo',    icon: <Camera     size={22} />, title: 'Photo Appt. Coordination',  desc: 'Help coordinate your professional shoot with any of the preferred photographers.',            img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800' },
];

// ── Pricing plans ──────────────────────────────────────────────────────────
const GROWTH_URL    = 'https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/smproavanti';
const DOMINANCE_URL = 'https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/SocialPlusAvanti';

const PLANS = [
  {
    name: 'Growth',
    price: '$340',
    period: '/mo',
    badge: 'Agentpreneur Rate',
    features: [
      'Full brand identity setup',
      '8 posts/month (Reels + Statics)',
      '12 IG Stories/month',
      'Professional video & photo editing',
      'AI caption & hashtag optimization',
      '2 IG Boosts/month',
      'Strategy & coaching sessions',
    ],
    paymentUrl: GROWTH_URL,
    dark: false,
  },
  {
    name: 'Dominance',
    price: '$750',
    period: '/mo',
    badge: 'Most Popular',
    features: [
      '12 IG/FB Posts/month',
      '4 LinkedIn Posts/month',
      '20 IG/FB Stories/month',
      'Strategy & coaching sessions',
      '4 IG Boosts/month',
      'Professional video & photo editing',
      'AI caption & hashtag optimization',
    ],
    paymentUrl: DOMINANCE_URL,
    dark: true,
  },
  {
    name: 'Brand Authority',
    price: 'Custom',
    period: '',
    badge: 'Full Service',
    features: [
      'Everything in Dominance',
      'Custom content shoots monthly',
      'Full-service ad management',
      'AI Automation workflows',
      'Dedicated account manager',
      'Quarterly brand audits',
    ],
    paymentUrl: null,
    dark: false,
  },
];

// ── VimeoFacade ───────────────────────────────────────────────────────────
const VimeoFacade: React.FC<{ id: string; title: string; aspect?: string }> = ({ id, title, aspect = '177.78%' }) => {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState('');
  useEffect(() => {
    fetch('https://vimeo.com/api/oembed.json?url=https://vimeo.com/' + id + '&width=640')
      .then(r => r.json())
      .then(d => { if (d.thumbnail_url) setThumb(d.thumbnail_url.replace(/_\d+x\d+/, '_640')); })
      .catch(() => {});
  }, [id]);
  if (playing) {
    return (
      <div style={{ padding: aspect + ' 0 0 0', position: 'relative' }}>
        <iframe
          src={'https://player.vimeo.com/video/' + id + '?autoplay=1&loop=1&badge=0&autopause=0&player_id=0&app_id=58479'}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title={title}
        />
      </div>
    );
  }
  return (
    <div style={{ paddingTop: aspect, position: 'relative' }} className="cursor-pointer group" onClick={() => setPlaying(true)}>
      {thumb && <img src={thumb} alt={title} className="absolute inset-0 w-full h-full object-cover" />}
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="relative w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl mv-gi-rotate transition-all duration-300">
          <Play size={22} className="text-black fill-current ml-0.5" />
        </span>
      </span>
    </div>
  );
};

// ── BackToTop ─────────────────────────────────────────────────────────────
const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', t);
    return () => window.removeEventListener('scroll', t);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={'fixed bottom-8 left-8 z-[90] p-4 bg-black text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-neutral-800 ' + (visible ? 'opacity-100' : 'opacity-0 pointer-events-none')}
    >
      <ArrowUp size={24} />
    </button>
  );
};

// ── Nav ───────────────────────────────────────────────────────────────────
const scrollToSection = (id: string) => {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const Nav: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100 h-20 flex items-center">
    <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
      <div
        className="flex items-center gap-4 sm:gap-6 flex-shrink-0 cursor-pointer"
        onClick={() => scrollToSection('top')}
      >
        <img src="/logo.png" alt="Marketingverse" className="h-9 w-auto mv-logo-glow" />
        <div className="h-5 w-px bg-neutral-200 hidden sm:block" />
        <img src={AVANTI_LOGO} alt="Avanti Way" className="h-5 md:h-6 w-auto object-contain" />
      </div>
      <div className="hidden md:flex items-center gap-7">
        <button onClick={() => scrollToSection('top')} className="text-sm font-semibold text-neutral-500 hover:text-black transition-colors">Home</button>
        <button onClick={() => scrollToSection('startup')} className="text-sm font-semibold text-neutral-500 hover:text-black transition-colors">Start-Up Package</button>
        <button onClick={() => scrollToSection('social')} className="text-sm font-semibold text-neutral-500 hover:text-black transition-colors">Social</button>
        <button onClick={() => scrollToSection('ai')} className="text-sm font-semibold text-neutral-500 hover:text-black transition-colors">AI Integrations</button>
      </div>
      <button onClick={onBook} data-cursor="magic" className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-neutral-800 transition-colors flex items-center gap-2">
        Book a Call <ArrowRight size={14} />
      </button>
    </div>
  </nav>
);

// ── Footer ────────────────────────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer className="bg-black text-white py-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <img src="/logo.png" alt="Marketingverse" className="h-9 w-auto brightness-0 invert" />
            <div className="h-5 w-px bg-white/10" />
            <img src={AVANTI_LOGO} alt="Avanti Way" className="h-5 w-auto object-contain brightness-0 invert" />
          </div>
          <p className="text-neutral-500 max-w-xs leading-relaxed text-sm">The preferred marketing partner for Avanti Way Agentpreneurs.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/themarketingverse" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/themarketingverse/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-all" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
        </div>
        <div className="flex gap-16">
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-[10px] text-neutral-500">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="tel:+17867053154" className="hover:text-white transition-colors">+1 (786) 705-3154</a></li>
              <li><a href="mailto:hello@the-marketingverse.com" className="hover:text-white transition-colors">hello@the-marketingverse.com</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold uppercase tracking-widest text-[10px] text-neutral-500">Follow Us</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="https://www.instagram.com/themarketingverse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://www.facebook.com/themarketingverse/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[11px] text-neutral-600 font-medium uppercase tracking-[0.2em]">
        <span>© {new Date().getFullYear()} Marketingverse. The Preferred Avanti Way Marketing Partner.</span>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

// ── Booking Modal ─────────────────────────────────────────────────────────
const BookingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
    onClick={onClose}
  >
    <div
      className="bg-white w-full max-w-4xl h-[90vh] rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col"
      onClick={e => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 bg-white/90 text-black rounded-full hover:bg-neutral-100 transition-all border border-neutral-200">
        <X size={24} />
      </button>
      <div className="w-full flex-1 overflow-hidden">
        <iframe
          src={BOOKING_URL}
          className="w-full border-none"
          style={{ height: 'calc(100% + 4px)', marginTop: '-4px' }}
          title="Book a Strategy Call"
        />
      </div>
    </div>
  </div>
);

// ── Hero ──────────────────────────────────────────────────────────────────
const Hero: React.FC<{ onBook: () => void; onOrder: () => void }> = ({ onBook, onOrder }) => (
  <section id="top" className="relative py-28 lg:py-40 overflow-hidden">
    {/* Blobs */}
    <div className="absolute top-[-20vh] left-[-10vw] w-[60vw] h-[60vw] max-w-3xl rounded-full bg-indigo-200/40 blur-[120px] pointer-events-none" style={{ animation: 'mv-drift1 22s ease-in-out infinite' }} />
    <div className="absolute bottom-[-15vh] right-[-8vw]  w-[50vw] h-[50vw] max-w-2xl rounded-full bg-violet-200/35 blur-[100px] pointer-events-none" style={{ animation: 'mv-drift2 26s ease-in-out infinite' }} />

    <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
      <RevealOnScroll>
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="px-4 py-1.5 bg-neutral-100 text-neutral-500 text-[10px] font-bold uppercase tracking-widest rounded-full">Preferred Partner</span>
          <img src={AVANTI_LOGO} alt="Avanti Way" className="h-6 md:h-8 w-auto object-contain" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]">
          Built for
          <br />
          <span className="font-serif italic font-normal text-indigo-500">Agentpreneurs.</span>
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Exclusive marketing packages for Avanti Way agents. Social media that converts, branding that commands authority, and AI tools that never sleep.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={onBook} data-cursor="magic" className="px-10 py-5 bg-neutral-950 text-white rounded-full font-bold text-lg hover:bg-black transition-all hover:scale-105 inline-flex items-center gap-3 shadow-xl">
            Book a Free Strategy Call <ArrowRight size={20} />
          </button>
          <button onClick={() => scrollToSection('pricing')} className="px-10 py-5 bg-white border border-neutral-200 rounded-full font-bold text-lg hover:bg-neutral-50 hover:border-black transition-all inline-flex items-center gap-3">
            Growth Plans
          </button>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ── Start-Up Package ──────────────────────────────────────────────────────
const StartUpPackage: React.FC<{ onOrder: () => void }> = ({ onOrder }) => (
  <section id="startup" className="py-24 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-4 block">Launch Ready</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The Agentpreneur <span className="font-serif italic font-normal">Start-Up Package</span>
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            The all-in-one launch sequence for your personal real estate brand. We build the engine while you focus on the closing.
          </p>
        </div>
      </RevealOnScroll>

      {/* Price card + checklist */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <RevealOnScroll>
          <div>
            <h3 className="text-3xl font-bold mb-6 leading-tight">Launch-Ready. <br />Compliance-Perfect.</h3>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              In 7-10 business days, your digital and physical brand will be fully deployed within the Avanti ecosystem — co-branded, polished, and ready to win listings.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Check size={14} /></div><span className="text-sm font-medium text-neutral-700">Business Card Template</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Check size={14} /></div><span className="text-sm font-medium text-neutral-700">3 Social Media Posts</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Check size={14} /></div><span className="text-sm font-medium text-neutral-700">Logo Broker Integration</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Check size={14} /></div><span className="text-sm font-medium text-neutral-700">Online RE Profiles</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Check size={14} /></div><span className="text-sm font-medium text-neutral-700">Digital Flyer Design</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Check size={14} /></div><span className="text-sm font-medium text-neutral-700">Professional Profile Bios</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Check size={14} /></div><span className="text-sm font-medium text-neutral-700">Avex CRM Contact Upload</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Check size={14} /></div><span className="text-sm font-medium text-neutral-700">Photo Appt. Coordination</span></div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="bg-neutral-900 text-white rounded-[3rem] p-10 md:p-14 relative overflow-hidden shadow-2xl text-center">
            <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 block">Special Agentpreneur Offer</span>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-7xl md:text-8xl font-bold text-white">$340</span>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-2xl text-white/30 line-through font-bold">$400</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">Save $60</span>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-8 leading-relaxed">One-time investment. Delivered in 7-10 business days. Built exclusively for Avanti Way agents.</p>
              <button onClick={onOrder} data-cursor="magic" className="w-full py-5 bg-white text-black rounded-2xl font-bold text-xl hover:bg-neutral-100 transition-all shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                Get Start-Up Package <ArrowRight size={22} />
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Deliverables grid */}
      <RevealOnScroll>
        <h3 className="text-2xl font-bold text-center mb-12">What{"'"}s Included</h3>
      </RevealOnScroll>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RevealOnScroll delay={0}>
          <div className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={DELIVERABLES[0].img} alt={DELIVERABLES[0].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" /></div>
            <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2.5 bg-neutral-900 text-white rounded-xl">{DELIVERABLES[0].icon}</div><h4 className="font-bold text-sm">{DELIVERABLES[0].title}</h4></div><p className="text-neutral-500 text-xs leading-relaxed">{DELIVERABLES[0].desc}</p></div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={50}>
          <div className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={DELIVERABLES[1].img} alt={DELIVERABLES[1].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" /></div>
            <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2.5 bg-neutral-900 text-white rounded-xl">{DELIVERABLES[1].icon}</div><h4 className="font-bold text-sm">{DELIVERABLES[1].title}</h4></div><p className="text-neutral-500 text-xs leading-relaxed">{DELIVERABLES[1].desc}</p></div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={100}>
          <div className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={DELIVERABLES[2].img} alt={DELIVERABLES[2].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" /></div>
            <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2.5 bg-neutral-900 text-white rounded-xl">{DELIVERABLES[2].icon}</div><h4 className="font-bold text-sm">{DELIVERABLES[2].title}</h4></div><p className="text-neutral-500 text-xs leading-relaxed">{DELIVERABLES[2].desc}</p></div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={150}>
          <div className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={DELIVERABLES[3].img} alt={DELIVERABLES[3].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" /></div>
            <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2.5 bg-neutral-900 text-white rounded-xl">{DELIVERABLES[3].icon}</div><h4 className="font-bold text-sm">{DELIVERABLES[3].title}</h4></div><p className="text-neutral-500 text-xs leading-relaxed">{DELIVERABLES[3].desc}</p></div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <div className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={DELIVERABLES[4].img} alt={DELIVERABLES[4].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" /></div>
            <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2.5 bg-neutral-900 text-white rounded-xl">{DELIVERABLES[4].icon}</div><h4 className="font-bold text-sm">{DELIVERABLES[4].title}</h4></div><p className="text-neutral-500 text-xs leading-relaxed">{DELIVERABLES[4].desc}</p></div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={250}>
          <div className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={DELIVERABLES[5].img} alt={DELIVERABLES[5].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" /></div>
            <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2.5 bg-neutral-900 text-white rounded-xl">{DELIVERABLES[5].icon}</div><h4 className="font-bold text-sm">{DELIVERABLES[5].title}</h4></div><p className="text-neutral-500 text-xs leading-relaxed">{DELIVERABLES[5].desc}</p></div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={300}>
          <div className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={DELIVERABLES[6].img} alt={DELIVERABLES[6].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" /></div>
            <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2.5 bg-neutral-900 text-white rounded-xl">{DELIVERABLES[6].icon}</div><h4 className="font-bold text-sm">{DELIVERABLES[6].title}</h4></div><p className="text-neutral-500 text-xs leading-relaxed">{DELIVERABLES[6].desc}</p></div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={350}>
          <div className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="aspect-[4/3] overflow-hidden"><img src={DELIVERABLES[7].img} alt={DELIVERABLES[7].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" /></div>
            <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className="p-2.5 bg-neutral-900 text-white rounded-xl">{DELIVERABLES[7].icon}</div><h4 className="font-bold text-sm">{DELIVERABLES[7].title}</h4></div><p className="text-neutral-500 text-xs leading-relaxed">{DELIVERABLES[7].desc}</p></div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

// ── Social Section (For Agentpreneurs) ───────────────────────────────────
const SocialSection: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <section id="social" className="py-24 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">

      {/* Why Social vertical video */}
      <RevealOnScroll>
        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-4 block">The Marketingverse Way</span>
            <h2 className="text-4xl font-bold mb-4">Why Social? <span className="font-serif italic font-normal">Our Unique Approach.</span></h2>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100 bg-black max-w-sm mx-auto">
            <VimeoFacade id="1203822578" title="Why Social? Marketingverse Approach" />
          </div>
        </div>
      </RevealOnScroll>

      {/* Dark banner */}
      <RevealOnScroll>
        <div className="rounded-[2.5rem] bg-neutral-950 text-white p-14 md:p-20 mb-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.3)_0%,_transparent_55%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.2)_0%,_transparent_55%)] pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-6 block">Social Media</span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              The Agentpreneurs Who Win<br />
              <span className="font-serif italic font-normal text-neutral-400">Show Up Every Single Day.</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Buyers and sellers are checking your Instagram before they call you. Your co-branded presence as an Avanti Way Agentpreneur is your biggest competitive edge — and we{"'"}re here to make it undeniable.
            </p>
            <button
              onClick={onBook}
              data-cursor="magic"
              className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl tracking-wide uppercase text-sm"
            >
              Book a Free Strategy Call
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* 4 pillars */}
      <RevealOnScroll>
        <div className="mb-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              The Real Reason <span className="text-indigo-500">Most Agents Stay Invisible</span>
            </h2>
            <p className="font-bold text-neutral-900 mb-4">It{"'"}s not your listings. It{"'"}s your presence.</p>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>The Agentpreneurs dominating your market aren{"'"}t necessarily better than you — they{"'"}re more visible, more consistent, and more connected to their audience. Social media done right doesn{"'"}t just build followers — it builds a community that closes deals for you.</p>
              <p>We don{"'"}t post to fill a calendar. We build an Agentpreneur brand people can{"'"}t stop talking about.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mv-glass mv-lift rounded-3xl p-5 group">
              <div className="mb-3 p-2.5 bg-neutral-100 rounded-xl w-fit text-indigo-500 mv-gi-indigo transition-all duration-300"><TrendingUp size={22} /></div>
              <h4 className="font-bold mb-2 text-sm">Market Visibility</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">Become the go-to Agentpreneur in your market before a buyer ever searches for an agent.</p>
            </div>
            <div className="mv-glass mv-lift rounded-3xl p-5 group">
              <div className="mb-3 p-2.5 bg-neutral-100 rounded-xl w-fit text-violet-500 mv-gi-violet transition-all duration-300"><Shield size={22} /></div>
              <h4 className="font-bold mb-2 text-sm">Trust at Scale</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">Content that warms cold leads and turns strangers into loyal clients and referral sources.</p>
            </div>
            <div className="mv-glass mv-lift rounded-3xl p-5 group">
              <div className="mb-3 p-2.5 bg-neutral-100 rounded-xl w-fit text-sky-500 mv-gi-sky transition-all duration-300"><Layers size={22} /></div>
              <h4 className="font-bold mb-2 text-sm">Brand Consistency</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">A cohesive look and voice co-branded with Avanti Way — so your brand works while you close.</p>
            </div>
            <div className="mv-glass mv-lift rounded-3xl p-5 group">
              <div className="mb-3 p-2.5 bg-neutral-100 rounded-xl w-fit text-pink-500 mv-gi-pink transition-all duration-300"><Heart size={22} /></div>
              <h4 className="font-bold mb-2 text-sm">Community &amp; Loyalty</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">People don{"'"}t just hire agents. They choose the one they feel they know. We build that connection.</p>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Content showcase */}
      <RevealOnScroll>
        <div className="mb-24">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Cinematic Excellence</span>
            <h2 className="text-4xl font-bold mb-4">Content That <span className="font-serif italic font-normal">Stops The Scroll</span></h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">See what we{"'"}ve done for our clients</p>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-neutral-100 bg-black">
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe src="https://vimeo.com/showcase/9806547/embed2" allow="autoplay; fullscreen; picture-in-picture" frameBorder={0} loading="lazy" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} title="Marketingverse Video Showcase" />
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Real Accounts. Real Results. */}
      <RevealOnScroll>
        <div className="mb-24">
          <div className="text-center mb-14">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Strategies In Action</span>
            <h2 className="text-4xl font-bold mb-4">Real Accounts. <span className="font-serif italic font-normal">Real Results.</span></h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Three different account types, three winning playbooks — each tailored to how the audience discovers and converts.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 items-end justify-items-center">
            <div className="flex flex-col items-center gap-4 w-full max-w-[240px]">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '9/19.5', boxShadow: '0 24px 60px -16px rgba(244,114,182,0.2), 0 6px 20px -6px rgba(0,0,0,0.14)' }}>
                <iframe src="https://player.vimeo.com/video/1173074414?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute inset-0 w-full h-full" frameBorder={0} title="Fun and Elegant" />
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border text-rose-500 bg-rose-50 border-rose-200">Fun &amp; Elegant</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full max-w-[240px] md:-mt-10">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '9/19.5', boxShadow: '0 24px 60px -16px rgba(100,116,139,0.18), 0 6px 20px -6px rgba(0,0,0,0.14)' }}>
                <iframe src="https://player.vimeo.com/video/1173074396?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute inset-0 w-full h-full" frameBorder={0} title="Polished and Professional" />
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border text-slate-600 bg-slate-50 border-slate-200">Polished &amp; Professional</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-full max-w-[240px]">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '9/19.5', boxShadow: '0 24px 60px -16px rgba(249,115,22,0.22), 0 6px 20px -6px rgba(0,0,0,0.14)' }}>
                <iframe src="https://player.vimeo.com/video/1173074432?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute inset-0 w-full h-full" frameBorder={0} title="Bold and Witty" />
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border text-orange-500 bg-orange-50 border-orange-200">Bold &amp; Witty</span>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Growth section + service list */}
      <RevealOnScroll>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-4 block">What We Handle</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Our Agentpreneurs see <span className="text-indigo-500">growth</span> in the first month.
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              We guide you with the right strategy, creative direction, and Avanti Way co-branding. Your job is to show up as yourself and let us handle the rest.
            </p>
          </div>
          <div className="space-y-4">
            <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
              <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 mv-gi-indigo transition-all duration-300 shrink-0"><Cpu size={22} /></div>
              <span className="font-semibold text-neutral-900">Brand Identity &amp; Voice</span>
            </div>
            <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
              <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 mv-gi-indigo transition-all duration-300 shrink-0"><Users size={22} /></div>
              <span className="font-semibold text-neutral-900">Strategy &amp; Coaching</span>
            </div>
            <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
              <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 mv-gi-indigo transition-all duration-300 shrink-0"><Wand2 size={22} /></div>
              <span className="font-semibold text-neutral-900">Content Concept Creation</span>
            </div>
            <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
              <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 mv-gi-indigo transition-all duration-300 shrink-0"><Video size={22} /></div>
              <span className="font-semibold text-neutral-900">Video &amp; Photo Production</span>
            </div>
            <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
              <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 mv-gi-indigo transition-all duration-300 shrink-0"><ImageIcon size={22} /></div>
              <span className="font-semibold text-neutral-900">Editing &amp; Graphics</span>
            </div>
            <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
              <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 mv-gi-indigo transition-all duration-300 shrink-0"><Calendar size={22} /></div>
              <span className="font-semibold text-neutral-900">Scheduling at Peak Times</span>
            </div>
            <div className="mv-glass rounded-2xl px-6 py-4 flex items-center gap-4 group mv-lift">
              <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-500 mv-gi-indigo transition-all duration-300 shrink-0"><TrendingUp size={22} /></div>
              <span className="font-semibold text-neutral-900">Analytics &amp; Monthly Reporting</span>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ── Pricing ───────────────────────────────────────────────────────────────
const Pricing: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <section id="pricing" className="py-24 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 block">Agentpreneur Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Market Isn{"'"}t Waiting. <span className="text-indigo-500">Neither Should You.</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Every month without a strong social presence is a month your competitors are taking deals that should be yours.
          </p>
        </div>
      </RevealOnScroll>
      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        <RevealOnScroll delay={0} className="h-full">
          <div className="rounded-3xl p-8 border border-neutral-200 bg-white/90 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-4 block">{PLANS[0].badge}</span>
            <h3 className="text-2xl font-bold mb-2">{PLANS[0].name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">{PLANS[0].price}</span>
              <span className="text-sm text-neutral-400">{PLANS[0].period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span>{PLANS[0].features[0]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span>{PLANS[0].features[1]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span>{PLANS[0].features[2]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span>{PLANS[0].features[3]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span>{PLANS[0].features[4]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span>{PLANS[0].features[5]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-500 mt-0.5 shrink-0" /><span>{PLANS[0].features[6]}</span></li>
            </ul>
            <a href={PLANS[0].paymentUrl!} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl font-bold bg-black text-white hover:bg-neutral-800 transition-all active:scale-95 text-center block">Get Growth</a>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={150} className="h-full">
          <div className="rounded-3xl p-8 bg-black text-white shadow-2xl scale-105 flex flex-col h-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-4 block">{PLANS[1].badge}</span>
            <h3 className="text-2xl font-bold mb-2">{PLANS[1].name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">{PLANS[1].price}</span>
              <span className="text-sm text-white/40">{PLANS[1].period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-400 mt-0.5 shrink-0" /><span>{PLANS[1].features[0]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-400 mt-0.5 shrink-0" /><span>{PLANS[1].features[1]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-400 mt-0.5 shrink-0" /><span>{PLANS[1].features[2]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-400 mt-0.5 shrink-0" /><span>{PLANS[1].features[3]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-400 mt-0.5 shrink-0" /><span>{PLANS[1].features[4]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-400 mt-0.5 shrink-0" /><span>{PLANS[1].features[5]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-indigo-400 mt-0.5 shrink-0" /><span>{PLANS[1].features[6]}</span></li>
            </ul>
            <a href={PLANS[1].paymentUrl!} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-neutral-100 transition-all active:scale-95 text-center block">Get Dominance</a>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={300} className="h-full">
          <div className="rounded-3xl p-8 border border-neutral-200 bg-white/90 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-violet-500 mb-4 block">{PLANS[2].badge}</span>
            <h3 className="text-2xl font-bold mb-2">{PLANS[2].name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">{PLANS[2].price}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" /><span>{PLANS[2].features[0]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" /><span>{PLANS[2].features[1]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" /><span>{PLANS[2].features[2]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" /><span>{PLANS[2].features[3]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" /><span>{PLANS[2].features[4]}</span></li>
              <li className="flex items-start gap-3 text-sm"><CheckCircle2 size={16} className="text-violet-500 mt-0.5 shrink-0" /><span>{PLANS[2].features[5]}</span></li>
            </ul>
            <button onClick={onBook} className="w-full py-4 rounded-xl font-bold bg-black text-white hover:bg-neutral-800 transition-all active:scale-95">Talk to Us</button>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </section>
);

// ── AI Integrations Section ───────────────────────────────────────────────
const AI_RE_CATEGORIES = [
  {
    icon: <TrendingUp size={22} />,
    title: 'Lead Generation',
    items: ['AI-powered lead capture forms', 'Automated follow-up sequences', 'CRM pipeline integration', 'Smart appointment scheduling bots', 'Lead scoring & prioritization'],
  },
  {
    icon: <MessageSquare size={22} />,
    title: 'Client Communication',
    items: ['24/7 AI chatbots on your site', 'Natural conversation flows', 'Personalized follow-up messages', 'Voice note transcription', 'Sentiment analysis on inquiries'],
  },
  {
    icon: <Calendar size={22} />,
    title: 'Scheduling & Admin',
    items: ['Auto-book showings & calls', 'Calendar sync across platforms', 'Reminder & confirmation sequences', 'Document automation', 'Transaction milestone alerts'],
  },
  {
    icon: <Megaphone size={22} />,
    title: 'Content Automation',
    items: ['AI listing descriptions', 'Social post generation', 'Email newsletter drafts', 'Video script creation', 'Market report automation'],
  },
  {
    icon: <Users size={22} />,
    title: 'Sphere Management',
    items: ['Automated referral outreach', 'Anniversary & milestone messages', 'Review collection workflows', 'Past client re-engagement', 'Sphere segmentation & tagging'],
  },
  {
    icon: <Zap size={22} />,
    title: 'Marketing Automation',
    items: ['Drip email campaigns', 'Retargeting ad workflows', 'Open house follow-up sequences', 'GEO/SEO automation', 'WhatsApp & SMS campaigns'],
  },
];

const AISection: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <section id="ai" className="py-24 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-4 block">AI Integrations</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Business, <span className="font-serif italic font-normal">On Autopilot.</span>
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            Custom AI agents that handle the repetitive work so you can focus on closing. Built specifically for Avanti Way Agentpreneurs.
          </p>
        </div>
      </RevealOnScroll>

      {/* Workflow categories grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <RevealOnScroll delay={0} className="h-full">
          <div className="mv-glass mv-lift rounded-3xl p-8 h-full group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neutral-900 text-white rounded-xl mv-gi-rotate transition-all duration-300">{AI_RE_CATEGORIES[0].icon}</div>
              <h3 className="text-lg font-bold">{AI_RE_CATEGORIES[0].title}</h3>
            </div>
            <ul className="space-y-2.5">
              {AI_RE_CATEGORIES[0].items.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm text-neutral-500"><div className="w-1 h-1 bg-neutral-300 rounded-full mt-2 shrink-0" /><span className="leading-relaxed">{item}</span></li>)}
            </ul>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={60} className="h-full">
          <div className="mv-glass mv-lift rounded-3xl p-8 h-full group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neutral-900 text-white rounded-xl mv-gi-rotate transition-all duration-300">{AI_RE_CATEGORIES[1].icon}</div>
              <h3 className="text-lg font-bold">{AI_RE_CATEGORIES[1].title}</h3>
            </div>
            <ul className="space-y-2.5">
              {AI_RE_CATEGORIES[1].items.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm text-neutral-500"><div className="w-1 h-1 bg-neutral-300 rounded-full mt-2 shrink-0" /><span className="leading-relaxed">{item}</span></li>)}
            </ul>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={120} className="h-full">
          <div className="mv-glass mv-lift rounded-3xl p-8 h-full group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neutral-900 text-white rounded-xl mv-gi-rotate transition-all duration-300">{AI_RE_CATEGORIES[2].icon}</div>
              <h3 className="text-lg font-bold">{AI_RE_CATEGORIES[2].title}</h3>
            </div>
            <ul className="space-y-2.5">
              {AI_RE_CATEGORIES[2].items.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm text-neutral-500"><div className="w-1 h-1 bg-neutral-300 rounded-full mt-2 shrink-0" /><span className="leading-relaxed">{item}</span></li>)}
            </ul>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={180} className="h-full">
          <div className="mv-glass mv-lift rounded-3xl p-8 h-full group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neutral-900 text-white rounded-xl mv-gi-rotate transition-all duration-300">{AI_RE_CATEGORIES[3].icon}</div>
              <h3 className="text-lg font-bold">{AI_RE_CATEGORIES[3].title}</h3>
            </div>
            <ul className="space-y-2.5">
              {AI_RE_CATEGORIES[3].items.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm text-neutral-500"><div className="w-1 h-1 bg-neutral-300 rounded-full mt-2 shrink-0" /><span className="leading-relaxed">{item}</span></li>)}
            </ul>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={240} className="h-full">
          <div className="mv-glass mv-lift rounded-3xl p-8 h-full group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neutral-900 text-white rounded-xl mv-gi-rotate transition-all duration-300">{AI_RE_CATEGORIES[4].icon}</div>
              <h3 className="text-lg font-bold">{AI_RE_CATEGORIES[4].title}</h3>
            </div>
            <ul className="space-y-2.5">
              {AI_RE_CATEGORIES[4].items.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm text-neutral-500"><div className="w-1 h-1 bg-neutral-300 rounded-full mt-2 shrink-0" /><span className="leading-relaxed">{item}</span></li>)}
            </ul>
          </div>
        </RevealOnScroll>
        <RevealOnScroll delay={300} className="h-full">
          <div className="mv-glass mv-lift rounded-3xl p-8 h-full group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-neutral-900 text-white rounded-xl mv-gi-rotate transition-all duration-300">{AI_RE_CATEGORIES[5].icon}</div>
              <h3 className="text-lg font-bold">{AI_RE_CATEGORIES[5].title}</h3>
            </div>
            <ul className="space-y-2.5">
              {AI_RE_CATEGORIES[5].items.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm text-neutral-500"><div className="w-1 h-1 bg-neutral-300 rounded-full mt-2 shrink-0" /><span className="leading-relaxed">{item}</span></li>)}
            </ul>
          </div>
        </RevealOnScroll>
      </div>

      {/* CTA card */}
      <RevealOnScroll>
        <div className="relative rounded-[2.5rem] border border-neutral-200 overflow-hidden px-8 py-16 md:px-16 text-center backdrop-blur-sm">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-100/60 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100/50 rounded-full blur-[80px] translate-y-1/2 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6 block">AI Automation Suite</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Build Your <span className="font-serif italic font-normal">Custom AI Suite</span>
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Audit your business bottlenecks in 2 minutes. Receive custom AI workflow recommendations, calculate your real-time monthly ROI, and deploy instantly.
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
      </RevealOnScroll>
    </div>
  </section>
);

// ── AI Bot Section ────────────────────────────────────────────────────────
const AskVerseBot: React.FC = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4">
      <div className="rounded-[2.5rem] bg-neutral-950 text-white p-12 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold">Ask VerseBot</h2>
              <div className="h-10 w-px bg-white/20 hidden sm:block" />
              <img src={AVANTI_LOGO} alt="Avanti Way" className="h-8 w-auto object-contain hidden sm:block brightness-0 invert" />
            </div>
            <p className="text-xl text-white/60 leading-relaxed">
              Curious how co-branding with Avanti Way works? Chat with our AI to understand the ROI and deployment process of any of our packages.
            </p>
          </div>
          <div>
            <AIBot initialMessage="Hi Agentpreneur! I'm VerseBot. I can help explain our packages, how we co-brand with Avanti Way, or answer any questions about growing your real estate brand. What's on your mind?" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Client Wins ───────────────────────────────────────────────────────────
const CLIENT_WINS = [
  {
    client: 'Yael R.',
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
    period: 'Growth Spike · May – Jun 2025',
    metrics: [
      { label: 'Facebook Views',    growth: '5.8K ↑325%', platform: 'Facebook'  },
      { label: 'Facebook Viewers',  growth: '4.7K ↑336%', platform: 'Facebook'  },
      { label: 'Instagram Views',   growth: '14.3K ↑20%', platform: 'Instagram' },
      { label: 'Instagram Reach',   growth: '3.9K ↑30%',  platform: 'Instagram' },
    ],
  },
  {
    client: 'Judith A.',
    period: 'Viral Moment · Feb – Mar 2025',
    metrics: [
      { label: 'Instagram Reach',  growth: '106.7K',   platform: 'Instagram' },
      { label: 'Reach Growth',     growth: '+11,400%', platform: 'Instagram' },
      { label: 'Instagram Views',  growth: '125.8K',   platform: 'Instagram' },
      { label: 'Views Growth',     growth: '+2,000%',  platform: 'Instagram' },
    ],
  },
  {
    client: 'Yackie L.',
    period: 'Apr – Jun 2025',
    metrics: [
      { label: 'Instagram Views',      growth: '210.4K ↑124%', platform: 'Instagram' },
      { label: 'Instagram Reach',      growth: '126.3K',        platform: 'Instagram' },
      { label: 'Content Interactions', growth: '11.6K ↑306%',  platform: 'Instagram' },
    ],
  },
];

const PLATFORM_DOT: Record<string, string> = {
  Instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  Facebook:  'bg-gradient-to-r from-blue-600 to-blue-400',
};

const ClientWins: React.FC = () => (
  <section className="py-24 bg-neutral-50">
    <div className="max-w-7xl mx-auto px-4">
      <RevealOnScroll>
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 block">Proven Results</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Client Wins</h2>
          <p className="text-neutral-500 text-lg max-w-md mx-auto">
            Real numbers. Real Avanti Way agents. What consistent, strategic content does to your metrics.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {CLIENT_WINS.map((sc, idx) => (
          <RevealOnScroll key={`${sc.client}-${idx}`} delay={idx * 80}>
            <div className="bg-white border border-neutral-100 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="mb-6">
                <h3 className="text-xl font-bold tracking-tight">{sc.client}</h3>
                <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-widest bg-black text-white px-3 py-1.5 rounded-full">{sc.period}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {sc.metrics.map((m) => (
                  <div key={m.label} className="bg-neutral-50 border border-neutral-100 rounded-xl p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${PLATFORM_DOT[m.platform] ?? 'bg-neutral-400'}`} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">{m.platform}</span>
                    </div>
                    <p className="text-2xl font-black text-black tracking-tight leading-none">{m.growth}</p>
                    <p className="text-[10px] text-neutral-500 mt-1 leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────────────────────────
const CTA: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4">
      <RevealOnScroll delay={100}>
        <div className="w-full py-24 mv-glass rounded-[2.5rem] relative overflow-hidden text-center px-8">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-indigo-200/50 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-violet-200/40 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <img src={AVANTI_LOGO} alt="Avanti Way" className="h-8 w-auto object-contain mx-auto mb-8 opacity-60" />
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-neutral-900">
              Ready to Become the <span className="font-serif italic font-normal text-violet-500">Most Recognizable Agent</span> in Your Market?
            </h2>
            <p className="text-xl text-neutral-500 mb-12 max-w-2xl mx-auto">
              Book a free 20-minute strategy call. We{"'"}ll show you exactly how we{"'"}d build your brand as an Avanti Way Agentpreneur.
            </p>
            <button onClick={onBook} data-cursor="magic" className="px-10 py-5 bg-neutral-950 text-white rounded-full font-bold text-lg hover:bg-black transition-all hover:scale-105 inline-flex items-center gap-3 shadow-xl">
              Book a Free Strategy Call <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  </section>
);

// ── App ───────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleOrder = () => {
    const w = 600, h = 800;
    const left = (window.screen.width  - w) / 2;
    const top  = (window.screen.height - h) / 2;
    window.open(ORDER_URL, 'OrderWindow', 'width=' + w + ',height=' + h + ',top=' + top + ',left=' + left + ',scrollbars=yes,resizable=yes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans overflow-x-hidden">
      <CustomCursor />
      <BackToTop />

      <Nav onBook={() => setBookingOpen(true)} />

      <main className="flex-grow">
        <Hero           onBook={() => setBookingOpen(true)} onOrder={handleOrder} />
        <StartUpPackage onOrder={handleOrder} />
        <SocialSection  onBook={() => setBookingOpen(true)} />
        <Pricing        onBook={() => setBookingOpen(true)} />
        <AISection      onBook={() => setBookingOpen(true)} />
        <AskVerseBot />
        <ClientWins />
        <CTA            onBook={() => setBookingOpen(true)} />
      </main>

      <Footer />

      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
