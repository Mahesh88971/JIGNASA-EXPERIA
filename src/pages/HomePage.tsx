import React from 'react';
import { Hero } from '../components/Hero';
import { HeritageStory } from '../components/HeritageStory';
import { FeaturedExperiences } from '../components/FeaturedExperiences';
import { WhyAndhraDarsan } from '../components/WhyAndhraDarsan';
import { Testimonials } from '../components/Testimonials';
import { CallToAction } from '../components/CallToAction';
import { Language } from '../data/translations';

interface HomePageProps {
  currentLang: Language;
  onNavigate: (page: string, experienceSlug?: string) => void;
  onOpenCurator: () => void;
  onOpenPlanPrivate: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  onNavigate,
  onOpenCurator,
  onOpenPlanPrivate,
}) => {
  return (
    <div className="min-h-screen">
      {/* 1.1 Hero Block */}
      <Hero
        currentLang={currentLang}
        onExploreClick={() => onNavigate('experiences')}
        onPlanPrivateClick={onOpenPlanPrivate}
      />

      {/* 1.2 Living Heritage Photo Story */}
      <HeritageStory
        currentLang={currentLang}
        onExploreClick={() => onNavigate('experiences')}
      />

      {/* 1.3 Featured Experiences */}
      <FeaturedExperiences
        currentLang={currentLang}
        onSelectExperience={(slug) => onNavigate('experience-detail', slug)}
        onExploreAll={() => onNavigate('experiences')}
      />

      {/* 1.4 Why Jignasa Experia */}
      <WhyAndhraDarsan
        currentLang={currentLang}
        onExploreClick={() => onNavigate('experiences')}
      />

      {/* 1.5 Testimonials */}
      <Testimonials currentLang={currentLang} />

      {/* 1.6 Call to Action */}
      <CallToAction
        currentLang={currentLang}
        onExploreClick={() => onNavigate('experiences')}
        onContactCurator={onOpenCurator}
      />
    </div>
  );
};
