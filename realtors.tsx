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
      <section className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 text-center max-w-4xl mx-auto">
        <RevealOnScroll>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-6">Social Media for Real Estate Agents</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 md:mb-8">
            The social presence<br />that earns trust<br />
            <span className="font-serif font-normal italic">before the call.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-xl mx-auto leading-relaxed mb-10 md:mb-12">
            When a buyer or seller finds you online, they're deciding in seconds whether they feel a connection. We make sure that answer is yes.
          </p>
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-8 md:px-10 py-4 md:py-5 rounded-full hover:bg-neutral-800 transition-all hover:scale-105 text-base md:text-lg shadow-xl shadow-black/10"
          >
            Book a call to learn the secret
          </button>
        </RevealOnScroll>
      </section>

      {/* ── Why Social ── */}
      <section className="py-16 md:py-24 px-6 bg-neutral-950 text-white">
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
      </section>

      {/* ── Real Accounts. Real Results. ── */}
      <section className="py-16 md:py-24 px-6">
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
      </section>

      {/* ── Client Wins ── */}
      <section className="py-16 md:py-24 px-6 bg-neutral-50">
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
      </section>

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
