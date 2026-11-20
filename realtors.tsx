import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { captureAdAttribution, getGHLFormSrc } from './utils/adAttribution';

const MV_LOGO = '/logo.png';
const MV_LOGO_FALLBACK = 'https://assets.cdn.filesafe.space/CFAAUO2gnPooyim4LdoM/media/6a189e3df58810f313b623a3.png';
const BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/8pROsd9gdPhAtmnP5YHd';

// ── Cursor fix (inherit system cursor) ────────────────────────────────────────
const CursorFix: React.FC = () => (
  <style>{`*, *::before, *::after { cursor: auto !important; } a, button, [role="button"] { cursor: pointer !important; }`}</style>
);

// ── Reviews Widget ─────────────────────────────────────────────────────────────
const ReviewsWidget: React.FC = () => {
  useEffect(() => {
    const src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <iframe
      className="lc_reviews_widget"
      src="https://reputationhub.site/reputation/widgets/review_widget/CFAAUO2gnPooyim4LdoM"
      frameBorder={0}
      scrolling="no"
      style={{ minWidth: '100%', width: '100%', border: 'none' }}
      title="Google Reviews"
    />
  );
};

// ── Video Card (click-to-play with Drive thumbnail) ──────────────────────────
const VideoCard: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-lg bg-neutral-900 cursor-pointer group"
      style={{ aspectRatio: '16/9' }}
      onClick={() => setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://drive.google.com/file/d/${id}/preview`}
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          title={label}
        />
      ) : (
        <>
          <img
            src={`https://drive.google.com/thumbnail?id=${id}&sz=w800`}
            alt={label}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="text-[9px] font-bold uppercase tracking-widest bg-black/60 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">{label}</span>
          </div>
        </>
      )}
    </div>
  );
};

// ── Reveal on scroll ──────────────────────────────────────────────────────────
const RevealOnScroll: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ── Booking modal ─────────────────────────────────────────────────────────────
const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);
  if (!isOpen) return null;
  const src = getGHLFormSrc(BOOKING_URL);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden" style={{ height: '92vh', maxHeight: 860 }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <iframe src={src} style={{ width: '100%', height: '100%', border: 'none' }} title="Book a call" />
      </div>
    </div>
  );
};

// ── Platform dot ──────────────────────────────────────────────────────────────
const PLATFORM_COLORS: Record<string, string> = {
  Instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  Facebook:  'bg-gradient-to-r from-blue-600 to-blue-400',
};

// ── Data ──────────────────────────────────────────────────────────────────────
const SUCCESS_CASES = [
  {
    client: 'Yael',
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
    client: 'Mauricio',
    period: 'Growth Spike · May – Jun 2025',
    metrics: [
      { label: 'Facebook Views',    growth: '5.8K ↑325%', platform: 'Facebook'  },
      { label: 'Facebook Viewers',  growth: '4.7K ↑336%', platform: 'Facebook'  },
      { label: 'Instagram Views',   growth: '14.3K ↑20%', platform: 'Instagram' },
      { label: 'Instagram Reach',   growth: '3.9K ↑30%',  platform: 'Instagram' },
    ],
  },
  {
    client: 'Judith',
    period: 'Viral Moment · Feb – Mar 2025',
    metrics: [
      { label: 'Instagram Reach',  growth: '106.7K',   platform: 'Instagram' },
      { label: 'Reach Growth',     growth: '+11,400%', platform: 'Instagram' },
      { label: 'Instagram Views',  growth: '125.8K',   platform: 'Instagram' },
      { label: 'Views Growth',     growth: '+2,000%',  platform: 'Instagram' },
    ],
  },
  {
    client: 'Yackie',
    period: 'Apr – Jun 2025',
    metrics: [
      { label: 'Instagram Views',       growth: '210.4K ↑124%', platform: 'Instagram' },
      { label: 'Instagram Reach',       growth: '126.3K',        platform: 'Instagram' },
      { label: 'Content Interactions',  growth: '11.6K ↑306%',  platform: 'Instagram' },
    ],
  },
];

// ── App ───────────────────────────────────────────────────────────────────────
function RealtorsPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'social' | 'photography' | 'headshots'>('social');

  useEffect(() => {
    captureAdAttribution();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openBooking = () => setBookingOpen(true);

  return (
    <div className="bg-white text-neutral-900 font-sans antialiased">
      <CursorFix />

      {/* ── Nav ── */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-neutral-100' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>
          <a href="https://home.the-marketingverse.com" style={{ cursor: 'pointer' }}>
            <img src={MV_LOGO} alt="Marketingverse" className="h-9 w-auto" onError={e => { (e.currentTarget as HTMLImageElement).src = MV_LOGO_FALLBACK; }} />
          </a>
          <button
            onClick={openBooking}
            className="bg-black text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
          >
            Book a Call
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-32 md:pt-40 pb-10 md:pb-14 px-6 text-center max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-5">For Real Estate Agents</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
            What can we help<br />
            <span className="font-serif font-normal italic">you with today?</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Pick a service below and we'll show you exactly what we do — and how we can grow your business.
          </p>
        </RevealOnScroll>
      </section>

      {/* ── Service Picker ── */}
      <section id="service-picker" className="pb-16 md:pb-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {([
            {
              id: 'social' as const,
              label: 'Social Media',
              desc: 'Build a presence that earns trust before the call. Strategy, content shoots & full management.',
              color: 'indigo',
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              ),
              activeGrad: 'from-indigo-600 to-indigo-500',
              inactiveBg: 'bg-white hover:bg-indigo-50 border-indigo-100',
              inactiveText: 'text-indigo-600',
            },
            {
              id: 'photography' as const,
              label: 'Listing Photography',
              desc: 'HDR photos, aerials, 3D tours & cinematic walkthroughs that make buyers stop scrolling.',
              color: 'amber',
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ),
              activeGrad: 'from-amber-500 to-amber-400',
              inactiveBg: 'bg-white hover:bg-amber-50 border-amber-100',
              inactiveText: 'text-amber-600',
            },
            {
              id: 'headshots' as const,
              label: 'Headshots',
              desc: 'Professional headshots that reflect your brand and make you look like the go-to agent.',
              color: 'rose',
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              ),
              activeGrad: 'from-rose-600 to-rose-500',
              inactiveBg: 'bg-white hover:bg-rose-50 border-rose-100',
              inactiveText: 'text-rose-600',
            },
          ]).map((svc, i) => (
            <RevealOnScroll key={svc.id} delay={i * 80}>
              <button
                onClick={() => {
                  setActiveTab(svc.id);
                  document.getElementById('tab-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`w-full text-left rounded-3xl border-2 p-7 transition-all duration-300 group ${
                  activeTab === svc.id
                    ? `bg-gradient-to-br ${svc.activeGrad} border-transparent shadow-2xl scale-[1.02] text-white`
                    : `${svc.inactiveBg} border-neutral-200 hover:border-transparent hover:shadow-xl`
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                  activeTab === svc.id ? 'bg-white/20' : `bg-${svc.color}-50 ${svc.inactiveText}`
                }`}>
                  {svc.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${activeTab === svc.id ? 'text-white' : 'text-neutral-900'}`}>
                  {svc.label}
                </h3>
                <p className={`text-sm leading-relaxed mb-5 ${activeTab === svc.id ? 'text-white/80' : 'text-neutral-500'}`}>
                  {svc.desc}
                </p>
                <div className={`inline-flex items-center gap-1.5 text-sm font-bold ${activeTab === svc.id ? 'text-white' : svc.inactiveText}`}>
                  {activeTab === svc.id ? 'Viewing now' : 'Explore'}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
              </button>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ── Slim sticky nav (shows once inside content) ── */}
      <div id="tab-content" className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-xl border-b border-neutral-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex overflow-x-auto scrollbar-hide">
          {([
            { id: 'social' as const, label: 'Social Media', activeClass: 'border-b-[3px] border-indigo-500 text-indigo-600', inactiveClass: 'text-neutral-400 hover:text-neutral-700 border-b-[3px] border-transparent' },
            { id: 'photography' as const, label: 'Listing Photography', activeClass: 'border-b-[3px] border-amber-500 text-amber-600', inactiveClass: 'text-neutral-400 hover:text-neutral-700 border-b-[3px] border-transparent' },
            { id: 'headshots' as const, label: 'Headshots', activeClass: 'border-b-[3px] border-rose-500 text-rose-600', inactiveClass: 'text-neutral-400 hover:text-neutral-700 border-b-[3px] border-transparent' },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-5 py-3.5 text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? tab.activeClass : tab.inactiveClass}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Why Social ── */}
      {activeTab === 'social' && <section className="py-16 md:py-24 px-6 bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-6 text-center">Why Social?</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-10 md:mb-16 max-w-2xl mx-auto leading-tight">
              The only channel where personal and professional mix on purpose.
            </h2>
          </RevealOnScroll>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Vertical video — 9:16 */}
            <RevealOnScroll className="flex justify-center">
              <div className="rounded-3xl overflow-hidden bg-neutral-900 w-full max-w-[280px] sm:max-w-[320px]" style={{ aspectRatio: '9/16' }}>
                <iframe
                  src="https://player.vimeo.com/video/1203822578?autoplay=0&badge=0&autopause=0&player_id=0&app_id=58479"
                  allow="autoplay; fullscreen; picture-in-picture"
                  frameBorder={0}
                  style={{ width: '100%', height: '100%', display: 'block' }}
                  title="Why Social? Our Unique Approach"
                />
              </div>
            </RevealOnScroll>

            {/* Copy */}
            <RevealOnScroll delay={100}>
              <div className="space-y-6 text-neutral-300 text-base md:text-lg leading-relaxed">
                <p>
                  Your clients aren't just buying a house — they're betting their biggest financial decision on a person they need to trust completely. Social media is the only place where that trust forms at scale, before you ever pick up the phone.
                </p>
                <p>
                  It's where people watch how you think, how you talk about the market, how you treat people — all while being entertained. When someone finally reaches out, they already feel like they know you.
                </p>
                <p>
                  Done right, it becomes a machine: consistent content builds reputation, reputation drives referrals, referrals multiply reach. All without spending more on ads.
                </p>
                <div className="pt-4 border-t border-neutral-800">
                  <p className="text-white font-semibold">That machine is what we build for you.</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>}

      {/* ── Real Accounts. Real Results. ── */}
      {activeTab === 'social' && <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-10 md:mb-14">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4 block">Strategies In Action</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Accounts. <span className="font-serif italic font-normal">Real Results.</span></h2>
              <p className="text-base md:text-lg text-neutral-500 max-w-2xl mx-auto">Three different account types, three winning playbooks — each tailored to how the audience discovers and converts.</p>
            </div>
          </RevealOnScroll>

          {/* On mobile: single column centered; md+: 3-col staggered */}
          <div className="flex flex-col items-center gap-10 md:grid md:grid-cols-3 md:gap-10 md:items-end md:justify-items-center">
            <RevealOnScroll delay={0} className="flex flex-col items-center gap-4 w-full max-w-[260px] md:max-w-[240px]">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '9/19.5', boxShadow: '0 24px 60px -16px rgba(244,114,182,0.2), 0 6px 20px -6px rgba(0,0,0,0.14)' }}>
                <iframe src="https://player.vimeo.com/video/1173074414?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute inset-0 w-full h-full" frameBorder={0} title="Fun and Elegant" />
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border text-rose-500 bg-rose-50 border-rose-200">Fun &amp; Elegant</span>
            </RevealOnScroll>

            <RevealOnScroll delay={80} className="flex flex-col items-center gap-4 w-full max-w-[260px] md:max-w-[240px] md:-mt-10">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '9/19.5', boxShadow: '0 24px 60px -16px rgba(100,116,139,0.18), 0 6px 20px -6px rgba(0,0,0,0.14)' }}>
                <iframe src="https://player.vimeo.com/video/1173074396?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute inset-0 w-full h-full" frameBorder={0} title="Polished and Professional" />
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border text-slate-600 bg-slate-50 border-slate-200">Polished &amp; Professional</span>
            </RevealOnScroll>

            <RevealOnScroll delay={160} className="flex flex-col items-center gap-4 w-full max-w-[260px] md:max-w-[240px]">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '9/19.5', boxShadow: '0 24px 60px -16px rgba(249,115,22,0.22), 0 6px 20px -6px rgba(0,0,0,0.14)' }}>
                <iframe src="https://player.vimeo.com/video/1173074432?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" className="absolute inset-0 w-full h-full" frameBorder={0} title="Bold and Witty" />
              </div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border text-orange-500 bg-orange-50 border-orange-200">Bold &amp; Witty</span>
            </RevealOnScroll>
          </div>
        </div>
      </section>}

      {/* ── Client Wins ── */}
      {activeTab === 'social' && <section className="py-16 md:py-24 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 text-center">Proven Results</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-4">Client Wins</h2>
            <p className="text-neutral-500 text-base md:text-lg text-center max-w-md mx-auto mb-10 md:mb-16">
              Real numbers. Real agents. What consistent, strategic content does to your metrics.
            </p>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {SUCCESS_CASES.map((sc, idx) => (
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
                          <span className={`w-1.5 h-1.5 rounded-full ${PLATFORM_COLORS[m.platform] ?? 'bg-neutral-400'}`} />
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
      </section>}

      {/* ── Social Media Plans ── */}
      {activeTab === 'social' && <section className="py-16 md:py-24 px-6 bg-neutral-950 text-white">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 mb-4 text-center">Social Media Plans</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-4">
              Your Content.<br />
              <span className="font-serif font-normal italic">Our Strategy.</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg text-center max-w-xl mx-auto mb-12 md:mb-16">
              Monthly memberships that handle everything — brand creation, content shoots, editing, posting, and community management.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {/* Growth */}
            <RevealOnScroll delay={0}>
              <div className="relative flex flex-col border-2 border-indigo-500 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">Most Popular</div>
                <div className="bg-neutral-900 px-7 pt-8 pb-6 border-b border-neutral-800">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-400 mb-2">Growth</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-black tracking-tight text-white">$550</span>
                    <span className="text-neutral-500 text-sm mb-1">/mo</span>
                  </div>
                  <p className="text-xs text-neutral-500">Aggressive growth for agents ready to scale</p>
                </div>
                <div className="bg-neutral-900 px-7 py-6 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1 mb-8">
                    {['1-on-1 Coaching', 'Brand Creation', 'Monthly Content Shoot', '8 Video Posts', 'Community Management', '2 IG Boosts'].map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-300">
                        <svg className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" fill="none" viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/SocialMediaGrowth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm py-3.5 rounded-2xl transition-all"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            {/* Dominance */}
            <RevealOnScroll delay={80}>
              <div className="relative flex flex-col border border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="bg-neutral-900 px-7 pt-8 pb-6 border-b border-neutral-800">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400 mb-2">Dominance</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-black tracking-tight text-white">$750</span>
                    <span className="text-neutral-500 text-sm mb-1">/mo</span>
                  </div>
                  <p className="text-xs text-neutral-500">Full-scale production for market leaders</p>
                </div>
                <div className="bg-neutral-900 px-7 py-6 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1 mb-8">
                    {['Everything in Growth', 'Extra Video Content Shoot', 'Email Marketing', 'TikTok & GMB', '4 IG Boosts'].map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-300">
                        <svg className="w-4 h-4 mt-0.5 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://billing.the-marketingverse.com/subscribe/012b590903e576e21bb2f16ffd298a88a7726ba08b65d6ccad482bf477cf719e/SocualMediaDominance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-white text-black font-semibold text-sm py-3.5 rounded-2xl hover:bg-neutral-100 transition-all"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>}

      {/* ── Listing Photography & Videography ── */}
      {activeTab === 'photography' && <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4 text-center">Listing Media</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-4">
              Photography &amp; <span className="font-serif font-normal italic">Videography</span>
            </h2>
            <p className="text-neutral-500 text-base md:text-lg text-center max-w-xl mx-auto mb-12 md:mb-16">
              Professional listing media that makes buyers stop scrolling. HDR photos, aerials, floor plans, and cinematic walkthroughs — all in one shoot.
            </p>
          </RevealOnScroll>

          {/* Package Cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">

            {/* Sunrise */}
            <RevealOnScroll delay={0}>
              <div className="relative flex flex-col border border-neutral-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <img
                    src="https://drive.google.com/thumbnail?id=1T9LtrZBNGuO9VinpE974c93QHomdoOec&sz=w800"
                    alt="Sunrise listing interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 px-6 pb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-300 mb-1">Sunrise Package</p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black tracking-tight text-white">$225</span>
                    </div>
                    <p className="text-xs text-neutral-300">Up to 2,400 sq ft</p>
                  </div>
                </div>
                <div className="bg-white px-7 py-6 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1 mb-8">
                    {['25 HDR Professional Photos', '3 Aerial Photos', 'B&W Basic Floor Plan'].map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-700">
                        <svg className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://shop.mylisting.pro/PlaceOrder?package=1001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-black text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-neutral-800 transition-all"
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            {/* Noon — most popular */}
            <RevealOnScroll delay={80}>
              <div className="relative flex flex-col border-2 border-black rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="absolute top-4 right-4 z-10 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">Most Popular</div>
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <img
                    src="https://drive.google.com/thumbnail?id=1IJ39COxE96f9a9fuLqNbEAvLnqF1tzII&sz=w800"
                    alt="Noon listing HDR interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 px-6 pb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-300 mb-1">Noon Package</p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black tracking-tight text-white">$415</span>
                    </div>
                    <p className="text-xs text-neutral-400">Up to 2,400 sq ft</p>
                  </div>
                </div>
                <div className="bg-white px-7 py-6 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1 mb-8">
                    {['25 HDR Professional Photos', '3 Aerial Photos', 'Floor Plan Plus', '3D Tour (Small)'].map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-700">
                        <svg className="w-4 h-4 mt-0.5 text-black flex-shrink-0" fill="none" viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://shop.mylisting.pro/PlaceOrder?package=1002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-black text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-neutral-800 transition-all"
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            {/* Twilight */}
            <RevealOnScroll delay={160}>
              <div className="relative flex flex-col border border-neutral-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative overflow-hidden" style={{ height: 180 }}>
                  <img
                    src="https://drive.google.com/thumbnail?id=1rGPM5ye01q__8JYcfDEzhiS1uNgRKZfi&sz=w800"
                    alt="Twilight aerial drone shot"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-indigo-900/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 px-6 pb-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-300 mb-1">Twilight Package</p>
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-black tracking-tight text-white">$450</span>
                    </div>
                    <p className="text-xs text-neutral-300">Up to 2,400 sq ft</p>
                  </div>
                </div>
                <div className="bg-white px-7 py-6 flex-1 flex flex-col">
                  <ul className="space-y-3 flex-1 mb-8">
                    {['25 High Resolution Photos', '3 Aerial Photos', 'Floor Plan Plus', 'Pro Cinematic Video'].map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-700">
                        <svg className="w-4 h-4 mt-0.5 text-violet-500 flex-shrink-0" fill="none" viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://shop.mylisting.pro/PlaceOrder?package=1003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-black text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-neutral-800 transition-all"
                  >
                    Book This Package
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Overage note */}
          <RevealOnScroll>
            <p className="text-center text-sm text-neutral-500 mb-16 -mt-10">
              Properties over 2,400 sq ft: <span className="text-neutral-700 font-medium">+$50 per additional 1,000 sq ft</span> (Sunrise) · <span className="text-neutral-700 font-medium">+$80 per additional 1,000 sq ft</span> (Noon &amp; Twilight)
            </p>
          </RevealOnScroll>

          {/* Pay at Close */}
          <RevealOnScroll>
            <div className="max-w-2xl mx-auto mb-16 rounded-3xl border border-neutral-200 bg-neutral-50 px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-11 h-11 flex-shrink-0 rounded-2xl bg-black flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div className="flex-1">
                <p className="font-bold text-neutral-900 mb-0.5">Pay at Close</p>
                <p className="text-sm text-neutral-500">Defer your package cost until your listing sells. Rates start at 0% APR — no impact to your credit.</p>
              </div>
              <a href="https://www.gotitus.com/estimate/golden-light-studio" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-sm font-semibold bg-black text-white px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-all whitespace-nowrap">
                Check eligibility
              </a>
            </div>
          </RevealOnScroll>

          {/* Media showcase — real listing photos & video */}
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3 text-center">Our Work</p>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
              See the <span className="font-serif italic font-normal">difference</span>
            </h3>

            {/* Photo grid — masonry columns */}
            <div className="columns-2 md:columns-3 gap-3 mb-16 [column-gap:0.75rem]">
              {[
                { id: '1eAA9WIKkYpj_ugp8Uhyt38uPeLz3b8zs', label: 'Aerial', sz: 'w1200' },
                { id: '1IGjM4lHxBbxfri4DEZx98r6sIM2byiCc', label: 'HDR Interior', sz: 'w800' },
                { id: '1pNghgOHL8VjB2K06ixkDBEFlJ1EKDI6k', label: 'HDR Living', sz: 'w800' },
                { id: '1vkP4kJykb8MqiT6b8QnRp5ckFoLicQ7Y', label: 'Bedroom', sz: 'w800' },
                { id: '1K3rez-02C1NqIDwa8H2kcQK7Ql4_sEpe', label: 'Interior', sz: 'w800' },
                { id: '1kD7NwgNWRXMtudHSeTHOB3B6358_dW4R', label: 'Twilight', sz: 'w800' },
                { id: '1DTSMBxW7jCJH0GoAUIa5VmfEXwqNr3G6', label: 'Living Room', sz: 'w800' },
                { id: '1lgatZBGFFXc_rlbO2LExqJ6W_jGivvaq', label: 'Kitchen', sz: 'w800' },
                { id: '1YVLGAGxS2DWIcqnRFnqW5_YghAsZSXiR', label: 'HDR Exterior', sz: 'w800' },
                { id: '1BVS-He5FoUUzVCk7kqUKMFkKt31s-x1_', label: 'Detail', sz: 'w800' },
                { id: '1-DiMbkMyqkRxDb-fNiA-WQQM9zp7iW1O', label: 'Bathroom', sz: 'w800' },
                { id: '1SLkRLG21OoWGrbml3QWROZEfc_gOeou7', label: 'Drone', sz: 'w800' },
              ].map(({ id, label, sz }) => (
                <div key={id} className="overflow-hidden rounded-2xl mb-3 break-inside-avoid">
                  <img
                    src={`https://drive.google.com/thumbnail?id=${id}&sz=${sz}`}
                    alt={label}
                    className="w-full h-auto block hover:scale-105 transition-transform duration-700"
                  />
                  </div>
              ))}
            </div>
          </RevealOnScroll>

          {/* Video Library */}
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3 text-center">Video Library</p>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Cinematic <span className="font-serif italic font-normal">property tours</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: '1pZvWto7bMJtFSeKPdAwXNfP4Tn6eXYa1', label: 'Property Walkthrough' },
                { id: '1-Zcca9S9T7mD5YaHAu8rJQjuC9mqtX25', label: 'Cinematic Tour' },
                { id: '1a1vk80dHh-4ObbpCVT8ZZsNavIB8w-C9', label: 'Listing Showcase' },
                { id: '1SGDyhjgCW3sHsnlA7AJJBinI4m_n2DLA', label: 'Property Highlight' },
              ].map(({ id, label }) => (
                <VideoCard key={id} id={id} label={label} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>}

      {/* ── Headshots ── */}
      {activeTab === 'headshots' && <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">Personal Branding</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Headshots That <span className="font-serif font-normal italic">Close Deals</span>
              </h2>
              <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto">
                Your first impression is online. We shoot professional headshots that reflect your brand, build instant trust, and make you look like the go-to agent in your market.
              </p>
            </div>
          </RevealOnScroll>

          {/* Pricing card */}
          <RevealOnScroll>
            <div className="max-w-sm mx-auto mb-14">
              <div className="relative flex flex-col border-2 border-black rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-black px-8 pt-8 pb-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-2">Headshot Session</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-5xl font-black tracking-tight text-white">$185</span>
                  </div>
                  <p className="text-sm text-neutral-400">One session · all photos delivered</p>
                </div>
                <div className="bg-white px-8 py-6 flex flex-col gap-4">
                  <ul className="space-y-3">
                    {['35-minute session', '2 wardrobe changes', 'All edited photos delivered', 'Professional lighting setup'].map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm text-neutral-700">
                        <svg className="w-4 h-4 mt-0.5 text-black flex-shrink-0" fill="none" viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={openBooking}
                    className="block text-center bg-black text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-neutral-800 transition-all"
                  >
                    Book a Session
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Photo gallery — 8 real headshot samples */}
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3 text-center">Our Work</p>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Sample <span className="font-serif italic font-normal">sessions</span>
            </h3>
          </RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-16 max-w-5xl mx-auto">
            {[
              '1X-knZV-nrXcd1je5WoX5Y8YDRghLtzEP',
              '1MSrtaukT099U0oiiamD9do6vGTkf_qb8',
              '1wHmTzucCH677706tLQ80ybxE6Ta5yQ0j',
              '1ik_ekfGFnFhzDdsMKhyn8niyoUZX0YZ6',
              '1vEWWbZ9pkwOfI0LuNxNLKnsxqbH15f0x',
              '1UxUW6PSzWhrADo50AgxICTHDkvN07wNB',
              '1RvSzzlaRp5TrXBW3WWQcLs57sc3v-6R6',
              '1IXafeeW71y94ixnDSDCBveaGszqBYKMx',
            ].map((id, i) => (
              <RevealOnScroll key={id} delay={i * 50}>
                <div className="relative overflow-hidden rounded-2xl bg-neutral-100 group" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={`https://drive.google.com/thumbnail?id=${id}&sz=w600`}
                    alt={`Headshot sample ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>}

      {/* ── Google Reviews ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-8 text-center">What Our Clients Say</p>
            <ReviewsWidget />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 md:py-28 px-6 bg-neutral-50">
        <RevealOnScroll>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">Let's talk</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Ready to build a presence<br />
              <span className="font-serif font-normal italic">that closes deals?</span>
            </h2>
            <p className="text-neutral-500 text-base md:text-lg mb-10 max-w-sm mx-auto">
              30 minutes. No pitch. Just an honest conversation about what social can do for your market.
            </p>
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 bg-black text-white font-semibold px-8 md:px-12 py-4 md:py-5 rounded-full hover:bg-neutral-800 transition-all hover:scale-105 text-base md:text-lg shadow-xl shadow-black/10"
            >
              Book a call to learn the secret
            </button>
          </div>
        </RevealOnScroll>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="https://home.the-marketingverse.com" style={{ cursor: 'pointer' }}>
            <img src={MV_LOGO} alt="Marketingverse" className="h-7 w-auto opacity-70" onError={e => { (e.currentTarget as HTMLImageElement).src = MV_LOGO_FALLBACK; }} />
          </a>
          <p className="text-xs text-neutral-400">© {new Date().getFullYear()} Marketingverse. All rights reserved.</p>
        </div>
      </footer>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RealtorsPage />
  </React.StrictMode>
);
