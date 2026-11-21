import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Language } from '../data/translations';
import { publicUrl } from '../utils/publicUrl';

interface HeritageStoryProps {
  currentLang: Language;
  onExploreClick: () => void;
}

export const HeritageStory: React.FC<HeritageStoryProps> = ({ currentLang, onExploreClick }) => {
  const isEnglish = currentLang === 'en';

  return (
    <section className="overflow-hidden bg-[#F8ECD5] py-16 sm:py-20 text-[#211915]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A52B23]">
            <Sparkles className="h-4 w-4 text-[#966000]" />
            <span>{isEnglish ? 'A living heritage' : 'సజీవ వారసత్వం'}</span>
          </div>
          <h2 className="font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {isEnglish
              ? 'A culture best experienced up close.'
              : 'దగ్గరగా అనుభవించినప్పుడే సంస్కృతి మనసుకు చేరుతుంది.'}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#66574A] sm:text-lg">
            {isEnglish
              ? 'From sacred hill temples to the artistry woven into everyday life, Andhra’s stories are best discovered with the people who keep them alive.'
              : 'పవిత్ర కొండ దేవాలయాల నుంచి నిత్యజీవితంలో నేసుకున్న కళల వరకు, ఆంధ్ర కథలు వాటిని నిలబెట్టే ప్రజలతో కలిసినప్పుడే నిజంగా అనుభూతి అవుతాయి.'}
          </p>
          <button
            onClick={onExploreClick}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#A52B23]/25 bg-[#FFF8EA] px-5 py-3 text-sm font-semibold text-[#A52B23] transition-all hover:border-[#A52B23] hover:bg-[#A52B23] hover:text-white"
          >
            <span>{isEnglish ? 'Explore the journeys' : 'ప్రయాణాలను చూడండి'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <figure className="group relative isolate overflow-hidden rounded-[1.75rem] border border-[#DDC8A6] bg-[#34251D] shadow-cultural-lg">
          <img
            src={publicUrl('/images/home/living-heritage.webp')}
            alt={isEnglish
              ? 'A Mangalagiri master weaver working at a traditional handloom'
              : 'సాంప్రదాయ మగ్గంపై పనిచేస్తున్న మంగళగిరి చేనేత నిపుణురాలు'}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-5 sm:p-6">
            <figcaption className="text-sm font-medium text-white sm:text-base">
              {isEnglish ? 'Mangalagiri handloom, Andhra Pradesh' : 'మంగళగిరి చేనేత, ఆంధ్రప్రదేశ్'}
            </figcaption>
            <span className="shrink-0 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
              {isEnglish ? 'Living craft' : 'సజీవ కళ'}
            </span>
          </div>
        </figure>
      </div>
    </section>
  );
};
