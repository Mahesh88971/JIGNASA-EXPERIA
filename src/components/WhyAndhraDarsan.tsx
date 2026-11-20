import React from 'react';
import { Sparkles, Users, Key, Gift, Compass, Flame } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface WhySectionProps {
  currentLang: Language;
  onExploreClick: () => void;
}

export const WhyAndhraDarsan: React.FC<WhySectionProps> = ({ currentLang, onExploreClick }) => {
  const t = TRANSLATIONS[currentLang];

  const blocks = [
    {
      icon: Users,
      title: t.whyBlocks[0].title,
      description: t.whyBlocks[0].description,
      tag: currentLang === 'en' ? 'Living Heritage' : 'సజీవ వారసత్వం',
    },
    {
      icon: Flame,
      title: t.whyBlocks[1].title,
      description: t.whyBlocks[1].description,
      tag: currentLang === 'en' ? 'Hands-on Immersion' : 'ప్రత్యక్ష అభ్యాసం',
    },
    {
      icon: Key,
      title: t.whyBlocks[2].title,
      description: t.whyBlocks[2].description,
      tag: currentLang === 'en' ? 'Queue-Free Sanctuaries' : 'గౌరవప్రద దర్శనం',
    },
    {
      icon: Gift,
      title: t.whyBlocks[3].title,
      description: t.whyBlocks[3].description,
      tag: currentLang === 'en' ? 'Blessed Keepsakes' : 'పవిత్ర జ్ఞాపికలు',
    },
  ];

  return (
    <section id="why-andhra" className="py-24 bg-[#F7EEDC] border-y border-[#F0DDBA] relative overflow-hidden">
      {/* Decorative subtle kolam pattern background */}
      <div className="absolute inset-0 bg-pattern-kolam opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#A52B23] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#966000]" />
            <span>{t.whyTitle}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#211915] leading-tight">
            {currentLang === 'en'
              ? 'A philosophy rooted in reverence, not commercial tourism.'
              : 'వ్యాపార పర్యాటకం కాదు; సజీవ సాంస్కృతిక దీక్ష.'}
          </h2>
          <p className="mt-4 text-base text-[#66574A] font-light leading-relaxed">
            {t.whySubtitle}
          </p>
        </div>

        {/* 4 Premium Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-[#E9D4B2] shadow-cultural hover:shadow-cultural-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#FFF8EA] border border-[#E9D4B2] flex items-center justify-center text-[#A52B23] group-hover:bg-[#A52B23] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#966000] bg-[#FFF8EA] px-2.5 py-1 rounded-full border border-[#E9D4B2]">
                      {block.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#211915] mb-3 leading-snug group-hover:text-[#A52B23] transition-colors">
                    {block.title}
                  </h3>

                  <p className="text-xs text-[#66574A] leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F7EEDC] flex items-center text-[11px] font-semibold text-[#A52B23]">
                  <span>0{idx + 1} &mdash; Pillar</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
