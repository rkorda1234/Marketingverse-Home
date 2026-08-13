import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { BeatIn } from '../BeatIn';
import type { AboutScene } from '../../../data/proposals/types';

export const AboutSceneView: React.FC<{ scene: AboutScene; revealCount: number }> = ({ scene, revealCount }) => {
  const shown = scene.beats.slice(0, revealCount);

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-600 mb-3">{scene.eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
        <span className="font-serif italic font-normal">{scene.title}</span>
      </h2>

      <div className="space-y-8 pb-4">
        {shown.map((beat, i) => {
          if (beat.kind === 'location') {
            return (
              <BeatIn key={i}>
                <div className="mv-glass mv-lift rounded-2xl p-5 flex items-start gap-4">
                  <span className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <MapPin size={16} className="text-white" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 mb-1.5">
                      {beat.heading}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{beat.text}</p>
                  </div>
                </div>
              </BeatIn>
            );
          }

          if (beat.kind === 'previews') {
            return (
              <BeatIn key={i}>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 mb-1.5">
                    {beat.heading}
                  </h3>
                  {beat.text && <p className="text-sm text-neutral-600 leading-relaxed mb-4">{beat.text}</p>}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {beat.links.map((link, j) => (
                      <BeatIn key={j} delay={j * 70}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="magic"
                          className="mv-glass mv-lift rounded-xl px-4 py-3 flex items-center justify-between gap-2 group"
                        >
                          <span className="text-sm font-semibold text-neutral-800">{link.label}</span>
                          <ArrowUpRight
                            size={15}
                            className="text-neutral-400 group-hover:text-violet-600 transition-colors flex-shrink-0"
                          />
                        </a>
                      </BeatIn>
                    ))}
                  </div>
                </div>
              </BeatIn>
            );
          }

          if (beat.kind === 'logos') {
            return (
              <BeatIn key={i}>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 mb-1.5">
                    {beat.heading}
                  </h3>
                  {beat.text && <p className="text-sm text-neutral-600 leading-relaxed mb-4">{beat.text}</p>}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {beat.logos.map((logo, j) => (
                      <BeatIn key={j} delay={j * 50}>
                        <div className="aspect-video bg-white/60 border border-white/40 rounded-xl flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all">
                          <span
                            className={`font-black tracking-tighter text-center leading-none ${
                              logo.name === 'HBO' ? 'text-3xl' : 'text-lg'
                            }`}
                          >
                            {logo.name}
                          </span>
                          {logo.subtitle && (
                            <span className="text-[8px] uppercase tracking-widest text-neutral-400 mt-1 font-bold">
                              {logo.subtitle}
                            </span>
                          )}
                        </div>
                      </BeatIn>
                    ))}
                  </div>
                </div>
              </BeatIn>
            );
          }

          return (
            <BeatIn key={i}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-900 mb-4">{beat.heading}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {beat.members.map((member, j) => (
                    <BeatIn key={j} delay={j * 60}>
                      <div className="mv-glass mv-lift rounded-2xl p-3 flex flex-col items-center text-center gap-2">
                        <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/70 shadow-md">
                          <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 text-xs">{member.name}</p>
                          <p className="text-neutral-400 text-[10px] mt-0.5 leading-snug">{member.role}</p>
                        </div>
                      </div>
                    </BeatIn>
                  ))}
                </div>
              </div>
            </BeatIn>
          );
        })}
      </div>
    </div>
  );
};
