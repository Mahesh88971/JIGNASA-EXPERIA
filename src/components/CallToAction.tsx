import React from 'react';
import { Compass, MessageSquareQuote, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface CallToActionProps {
  currentLang: Language;
  onExploreClick: () => void;
  onContactCurator: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({
  currentLang,
  onExploreClick,
  onContactCurator,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="py-20 bg-gradient-to-br from-[#A52B23] to-[#5D1917] text-[#FFF8EA] relative overflow-hidden">
      {/* Decorative radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#966000]/25 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-[#966000]/40 text-[#F0B323] text-xs uppercase tracking-widest font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{currentLang === 'en' ? 'Awaken Your Curiosity' : 'జిజ్ఞాసతో కూడిన ప్రయాణం'}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FFF8EA] leading-tight mb-6">
          {t.ctaHeadline}
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#F5E6CA]/90 font-light leading-relaxed mb-10">
          {t.ctaSubtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FFF8EA] hover:bg-[#FFFFFF] text-[#A52B23] font-bold text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#A52B23]" />
            <span>{t.exploreAllBtn}</span>
          </button>

          <button
            onClick={onContactCurator}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/30 hover:bg-black/50 text-[#FFF8EA] font-semibold text-sm tracking-wide border border-[#966000] shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageSquareQuote className="w-4 h-4 text-[#F0B323]" />
            <span>{t.contactCuratorBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
