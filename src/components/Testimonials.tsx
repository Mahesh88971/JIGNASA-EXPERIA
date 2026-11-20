import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface TestimonialsProps {
  currentLang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: currentLang === 'en'
        ? '“Not a tour, but a cultural initiation into Andhra.”'
        : '“ఇది కేవలం ఒక పర్యటన కాదు; ఆంధ్ర సజీవ సంస్కృతిలోకి ఒక దివ్య ప్రవేశం.”',
      author: 'Kishore & Deepa Vuyyuru',
      role: 'NRI Traveller, Singapore',
      experience: 'Handloom Heritage – Mangalagiri',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      rating: 5,
    },
    {
      quote: currentLang === 'en'
        ? '“Seeing the master weavers at work and partaking in the Panakam ritual at dawn moved our entire family to tears.”'
        : '“ఉదయపు పానకాల స్వామి ప్రసాదం, చేనేత మగ్గాల సవ్వడి మా కుటుంబానికి ఎన్నటికీ మరపురాని అనుభూతిని ఇచ్చింది.”',
      author: 'Dr. Radhika & Vikram Reddy',
      role: 'Physician & Tech Leader, San Jose, CA',
      experience: 'Lakshmi Narasimha Temple Experience',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      rating: 5,
    },
    {
      quote: currentLang === 'en'
        ? '“The culinary session with Gongura stone grinding opened a dimension of Indian food anthropology I had never witnessed before.”'
        : '“రాతి రోటిలో గోంగూర నూరడం మరియు సాంప్రదాయ అరటి ఆకు భోజనం అత్యద్భుతం.”',
      author: 'Julian Vance & Siobhan',
      role: 'Cultural Anthropologists, Oxford, UK',
      experience: 'Culinary Andhra – Amaravati',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      rating: 5,
    },
    {
      quote: currentLang === 'en'
        ? '“We were dreading long temple lines with our 80-year-old mother. Jignasa Experia’s facilitators treated us with royal dignity and reverence.”'
        : '“వృద్ధులైన మా అమ్మగారితో తిరుపతి నగర యాత్ర అత్యంత ప్రశాంతంగా, గౌరవప్రదంగా జరిగింది.”',
      author: 'Col. Ravindra Varma (Retd.)',
      role: 'Senior Veteran, Hyderabad',
      experience: 'Tirupati City Cultural Tour',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      rating: 5,
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#FFF8EA] text-[#211915] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Carousel Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest font-bold text-[#A52B23] mb-2">
              {t.testimonialsTitle}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#211915]">
              {currentLang === 'en'
                ? 'Stories carried across oceans.'
                : 'యాత్రికుల హృదయాలలో నిలిచిన జ్ఞాపకాలు.'}
            </h2>
            <p className="mt-2 text-sm text-[#66574A]">
              {t.testimonialsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 self-end">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#CFB48C] hover:border-[#A52B23] hover:bg-[#A52B23] hover:text-white text-[#211915] flex items-center justify-center transition-all shadow-xs"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#CFB48C] hover:border-[#A52B23] hover:bg-[#A52B23] hover:text-white text-[#211915] flex items-center justify-center transition-all shadow-xs"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[320px] sm:min-w-[400px] md:min-w-[460px] bg-white rounded-2xl p-8 border border-[#E9D4B2] shadow-cultural flex flex-col justify-between snap-start"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#966000] text-[#966000]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#A52B23]/20" />
                </div>

                <p className="font-serif text-lg sm:text-xl font-medium text-[#211915] leading-relaxed italic">
                  {item.quote}
                </p>

                <div className="text-[11px] font-semibold text-[#A52B23] bg-[#FFF8EA] px-3 py-1 rounded-full inline-block border border-[#E9D4B2]">
                  {item.experience}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F5E6CA] flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#966000]"
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#211915]">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#66574A]">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
