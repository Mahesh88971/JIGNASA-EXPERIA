import React from 'react';
import { Clock, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';
import { usePortalContent } from '../data/portalStore';
import { formatINR } from '../utils/pricing';
import { publicUrl } from '../utils/publicUrl';

interface FeaturedExperiencesProps {
  currentLang: Language;
  onSelectExperience: (slug: string) => void;
  onExploreAll: () => void;
}

export const FeaturedExperiences: React.FC<FeaturedExperiencesProps> = ({
  currentLang,
  onSelectExperience,
  onExploreAll
}) => {
  const t = TRANSLATIONS[currentLang];
  const { experiences } = usePortalContent();
  const featured = experiences.filter((exp) => exp.featured).slice(0, 6);

  return (
    <section className="py-24 bg-[#FFF8EA] text-[#211915]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#A52B23] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#966000]" />
              <span>{t.featuredTitle}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#211915] leading-tight">
              {currentLang === 'en'
                ? 'Immersions crafted for curious souls.'
                : 'మన సాంస్కృతిక వైభవంలోకి ప్రత్యక్ష ప్రవేశం.'}
            </h2>
            <p className="mt-4 text-base text-[#66574A] font-light leading-relaxed">
              {t.featuredSubtitle}
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm font-semibold text-[#A52B23] hover:text-[#791F1A] group transition-colors pb-1 border-b-2 border-[#A52B23]/30 hover:border-[#A52B23]"
          >
            <span>{t.exploreAllBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid of 6 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((exp) => (
            <div
              key={exp.id}
              onClick={() => onSelectExperience(exp.slug)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E9D4B2] shadow-cultural hover:shadow-cultural-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5"
            >
              {/* Card Image & Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#34251D]">
                <img
                  src={publicUrl(exp.heroImage)}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#FFF8EA]/90 backdrop-blur-md text-[#A52B23] shadow-xs">
                    {exp.category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#211915]/80 text-[#FFF8EA] backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 fill-[#966000] text-[#966000]" />
                  <span>{exp.rating}</span>
                  <span className="text-[#A7947A] text-[10px]">({exp.reviewsCount})</span>
                </div>

                {/* City Overlay */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#F5E6CA]">
                  <MapPin className="w-3.5 h-3.5 text-[#F0B323]" />
                  <span>{exp.city}</span>
                </div>
                {exp.photoCredit && exp.photoCreditUrl && (
                  <a
                    href={exp.photoCreditUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="absolute bottom-3 right-4 max-w-[48%] truncate text-right text-[9px] text-white/80 underline decoration-white/40 underline-offset-2 hover:text-white"
                    title={`Photo credit: ${exp.photoCredit}`}
                  >
                    Photo: {exp.photoCredit}
                  </a>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#211915] group-hover:text-[#A52B23] transition-colors leading-snug">
                    {currentLang === 'en' ? exp.title : exp.teluguTitle}
                  </h3>
                  <p className="mt-2 text-xs text-[#66574A] line-clamp-2 leading-relaxed">
                    {currentLang === 'en' ? exp.tagline : exp.teluguTagline}
                  </p>
                </div>

                {/* Meta details */}
                <div className="pt-3 border-t border-[#F5E6CA] flex items-center justify-between text-xs text-[#66574A]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#A52B23]" />
                    <span>{exp.durationHours}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#95806B] mr-1">{t.startingFrom}</span>
                    <span className="font-serif text-base font-bold text-[#211915]">
                      {formatINR(exp.startingPrice)}
                    </span>
                  </div>
                </div>

                {/* View Experience Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectExperience(exp.slug);
                  }}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#FFF8EA] hover:bg-[#A52B23] text-[#211915] hover:text-white border border-[#E9D4B2] hover:border-[#A52B23] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{t.viewExperience}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
