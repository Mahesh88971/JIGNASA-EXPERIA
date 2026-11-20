import React, { useEffect, useState } from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeroProps {
  currentLang: Language;
  onExploreClick: () => void;
  onPlanPrivateClick: () => void;
}

const heroBackgrounds = [
  '/images/home/amaravati-stupa.webp',
  '/images/home/mangalagiri-handloom.webp',
  '/images/home/krishna-river-sunset.webp',
];

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onExploreClick,
  onPlanPrivateClick,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [guestCount, setGuestCount] = useState(4200);
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGuestCount((previous) => (previous < 5000 ? Math.min(previous + 120, 5000) : 5000));
    }, 40);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBackgroundIndex((current) => (current + 1) % heroBackgrounds.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate flex min-h-[760px] items-center overflow-hidden bg-[#241813] text-[#FFF8EA] md:min-h-[86vh]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {heroBackgrounds.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full scale-[1.03] object-cover object-center brightness-90 transition-opacity duration-1000 motion-reduce:transition-none ${
              index === activeBackgroundIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#241813]/95 via-[#241813]/75 to-[#241813]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#241813]/80 via-transparent to-[#241813]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_45%,_transparent_0%,_rgba(36,24,19,0.12)_46%,_rgba(36,24,19,0.58)_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#F0B323]/45 bg-[#36231B]/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.19em] text-[#F7E6C7] shadow-lg shadow-black/10 backdrop-blur-md sm:text-xs">
            <Sparkles className="h-4 w-4 shrink-0 text-[#F0B323]" />
            <span>
              {currentLang === 'en'
                ? 'Curated cultural journeys · Andhra Pradesh'
                : 'విశిష్ట సాంస్కృతిక ప్రయాణాలు · ఆంధ్రప్రదేశ్'}
            </span>
          </div>

          <h1 className="max-w-4xl font-serif text-[2.85rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[#FFFDF8] drop-shadow-[0_3px_18px_rgba(0,0,0,0.28)] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            {currentLang === 'en' ? (
              <>
                <span className="block">Experience Andhra.</span>
                <span className="mt-1 block text-[#FFD979]">Become Andhra.</span>
              </>
            ) : (
              t.tagline
            )}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#F5E8D1] drop-shadow-sm sm:text-lg sm:leading-8">
            {t.subtext}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onExploreClick}
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FFF8EA] px-7 py-3.5 text-sm font-bold text-[#852922] shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_34px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD979] focus-visible:ring-offset-2 focus-visible:ring-offset-[#241813]"
            >
              <Compass className="h-4 w-4 text-[#A52B23] transition-transform group-hover:rotate-12" />
              <span>{t.exploreExperiences}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onPlanPrivateClick}
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-white/35 bg-white/[0.08] px-7 py-3.5 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:border-[#F0B323]/70 hover:bg-white/[0.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD979]"
            >
              <Sparkles className="h-4 w-4 text-[#F0B323]" />
              <span>{t.planPrivate}</span>
            </button>
          </div>

          <div className="mt-14 max-w-4xl border-t border-white/25 pt-6 sm:mt-16 sm:pt-7">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-5">
              <div>
                <div className="font-serif text-3xl font-semibold tracking-tight text-[#FFD979] sm:text-4xl">50+</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/70 sm:text-[11px]">
                  {t.quickStats.experiences}
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {guestCount.toLocaleString()}+
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/70 sm:text-[11px]">
                  {t.quickStats.guests}
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-semibold tracking-tight text-[#FFD979] sm:text-4xl">10+</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/70 sm:text-[11px]">
                  {t.quickStats.facilitators}
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">8+</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-white/70 sm:text-[11px]">
                  {t.quickStats.cities}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-6 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 backdrop-blur-md sm:bottom-9 sm:right-10">
        {heroBackgrounds.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveBackgroundIndex(index)}
            aria-label={`Show hero image ${index + 1}`}
            aria-pressed={index === activeBackgroundIndex}
            className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD979] ${
              index === activeBackgroundIndex ? 'w-7 bg-[#FFD979]' : 'w-1.5 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
