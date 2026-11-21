import React, { useCallback, useEffect, useRef } from 'react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Gift, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';
import { Experience } from '../types';
import { BOOKING_RATE_DETAILS, formatINR } from '../utils/pricing';
import { Language, TRANSLATIONS } from '../data/translations';
import { LocationExplorer } from '../components/LocationExplorer';
import { publicUrl } from '../utils/publicUrl';

interface ExperienceDetailPageProps {
  experience: Experience;
  currentLang: Language;
  onNavigateBack: () => void;
  onOpenCurator: () => void;
}

export const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({
  experience,
  currentLang,
  onNavigateBack,
  onOpenCurator,
}) => {
  const t = TRANSLATIONS[currentLang];

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const moveGallery = useCallback((direction: 1 | -1) => {
    const gallery = galleryRef.current;
    const firstCard = gallery?.firstElementChild as HTMLElement | null;
    if (!gallery || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(gallery).columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const loopWidth = step * experience.galleryImages.length;

    if (direction > 0 && gallery.scrollLeft >= loopWidth - step * 0.5) {
      gallery.scrollLeft = 0;
    } else if (direction < 0 && gallery.scrollLeft <= step * 0.5) {
      gallery.scrollLeft = loopWidth;
    }

    gallery.scrollBy({ left: step * direction, behavior: 'smooth' });
  }, [experience.galleryImages.length]);

  useEffect(() => {
    const interval = window.setInterval(() => moveGallery(1), 3000);
    return () => window.clearInterval(interval);
  }, [moveGallery, experience.slug]);

  useEffect(() => {
    if (galleryRef.current) galleryRef.current.scrollLeft = 0;
  }, [experience.slug]);


  return (
    <div className="bg-[#FFF8EA] min-h-screen py-8 text-[#211915]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#66574A]">
          <button
            onClick={onNavigateBack}
            className="flex items-center gap-1.5 hover:text-[#A52B23] transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Experiences</span>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCurator}
              className="text-[#A52B23] hover:underline flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#966000]" />
              <span>Ask Curator About This Journey</span>
            </button>
          </div>
        </div>

        {/* Experience details followed by a full-width booking call to action */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 3.2 Left Column: Experience Content */}
          <div className="lg:col-span-12 space-y-10">
            {/* Title & Cultural Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#A52B23] text-white">
                  {experience.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E9D4B2] text-[#211915] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#A52B23]" />
                  {experience.city}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-[#E9D4B2] text-[#66574A] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#A52B23]" />
                  {experience.durationHours}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#211915] leading-tight">
                {currentLang === 'en' ? experience.title : experience.teluguTitle}
              </h1>

              <p className="font-serif italic text-base sm:text-lg text-[#A52B23]">
                {currentLang === 'en' ? experience.tagline : experience.teluguTagline}
              </p>

              {/* Rating & Review summary */}
              <div className="flex items-center gap-3 pt-1 text-xs">
                <div className="flex items-center gap-1 bg-[#211915] text-[#FFF8EA] px-2.5 py-1 rounded-full font-bold">
                  <Star className="w-3.5 h-3.5 fill-[#966000] text-[#966000]" />
                  <span>{experience.rating}</span>
                </div>
                <span className="text-[#66574A]">
                  Based on <strong>{experience.reviewsCount}</strong> verified patron reviews
                </span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> 100% Authentic Living Tradition
                </span>
              </div>
            </div>

            {/* Side-by-side, touch-friendly experience gallery */}
            <section aria-label={`${experience.title} photo gallery`} className="space-y-3">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A52B23]">Experience gallery</p>
                  <p className="mt-1 text-xs text-[#66574A]">Swipe or use arrows · photos auto-advance</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    aria-label="Scroll photos left"
                    onClick={() => moveGallery(-1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C7B0] bg-white text-[#211915] shadow-sm transition hover:border-[#A52B23] hover:text-[#A52B23]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Scroll photos right"
                    onClick={() => moveGallery(1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C7B0] bg-white text-[#211915] shadow-sm transition hover:border-[#A52B23] hover:text-[#A52B23]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div
                ref={galleryRef}
                className="no-scrollbar flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth pb-2"
              >
                {[...experience.galleryImages, ...experience.galleryImages].map((img, idx) => (
                  <figure
                    key={`${idx}-${img}`}
                    aria-hidden={idx >= experience.galleryImages.length}
                    className="group relative aspect-[16/10] flex-[0_0_100%] snap-start overflow-hidden rounded-2xl border border-[#E9D4B2] bg-[#34251D] shadow-cultural"
                  >
                    <img
                      src={publicUrl(img)}
                      alt={`${experience.title} — photo ${(idx % experience.galleryImages.length) + 1}`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                      {String((idx % experience.galleryImages.length) + 1).padStart(2, '0')} / {String(experience.galleryImages.length).padStart(2, '0')}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* Short Narrative Storytelling Paragraph */}
            <div className="bg-white rounded-2xl p-8 border border-[#E9D4B2] shadow-cultural space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#211915]">
                {currentLang === 'en' ? 'The Cultural Narrative' : 'సాంస్కృతిక ప్రయాణ నేపథ్యం'}
              </h2>
              <p className="text-sm sm:text-base text-[#524033] leading-relaxed font-light">
                {experience.description}
              </p>
            </div>

            <LocationExplorer location={experience.city} experienceTitle={experience.title} />

            {/* Highlights (Bullet Points) */}
            <div className="bg-[#FFF8EA] rounded-2xl p-8 border border-[#E9D4B2] shadow-xs space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#211915] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#966000]" />
                <span>{t.highlights}</span>
              </h2>
              <div className="grid grid-cols-1 gap-3.5">
                {experience.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#E9D4B2]">
                    <div className="w-5 h-5 rounded-full bg-[#A52B23]/10 text-[#A52B23] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#211915] font-medium leading-relaxed">
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who Is This For? (Text + Icons) */}
            <div className="bg-white rounded-2xl p-8 border border-[#E9D4B2] shadow-cultural space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211915]">
                  {t.whoIsThisFor}
                </h2>
                <p className="text-xs text-[#66574A] mt-1">
                  Carefully paced for those seeking deep connection rather than hurried sightseeing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {experience.whoIsThisFor.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-[#FFF8EA] border border-[#E9D4B2] flex flex-col justify-between space-y-2"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#A52B23] text-white flex items-center justify-center mb-1">
                      <Users className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[#211915]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#66574A] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-[#FFF8EA] rounded-2xl p-8 border border-[#E9D4B2] space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#211915] flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#A52B23]" />
                <span>{t.whatsIncluded}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {experience.whatsIncluded.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#E9D4B2]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-[#524033] font-medium">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Hour-by-Hour Itinerary */}
            <div className="bg-[#FFF8EA] rounded-2xl p-8 border border-[#E9D4B2] space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#211915]">
                  {t.detailedItinerary}
                </h2>
                <p className="text-xs text-[#66574A] mt-1">
                  An unhurried progression designed for reflection, immersion, and ritual participation.
                </p>
              </div>

              <div className="relative border-l-2 border-[#966000]/60 ml-4 space-y-6 pl-6">
                {experience.itinerary.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <span className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-[#A52B23] border-2 border-white shadow-xs" />
                    <span className="text-xs font-bold font-mono text-[#A52B23] tracking-wider block mb-0.5">
                      {step.time}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#211915]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#66574A] leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-8 border border-[#E9D4B2] shadow-cultural space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#211915]">
                    {t.reviews}
                  </h2>
                  <p className="text-xs text-[#66574A]">
                    Unedited words from cultural seekers who walked this path.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 font-serif text-lg font-bold text-[#A52B23]">
                  <Star className="w-5 h-5 fill-[#966000] text-[#966000]" />
                  <span>{experience.rating} / 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {experience.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-xl bg-[#FFF8EA] border border-[#E9D4B2] space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#211915]">
                          {rev.author}
                        </h4>
                        <span className="text-[11px] text-[#766452]">{rev.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#966000] text-[#966000]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#524033] italic leading-relaxed">
                      “{rev.comment}”
                    </p>
                    <span className="text-[10px] text-[#95806B] block pt-1">
                      Verified Cultural Immersion • {rev.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <section className="lg:col-span-12 overflow-hidden rounded-3xl border border-[#966000] bg-[#211915] p-6 shadow-cultural-lg sm:p-8">
            <div className="mb-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F0B323]">Prices & booking</span>
              <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">Choose your booking option</h2>
              <p className="text-sm text-white/70">Rates are per guest; minors are ages 3–11. Add 5% GST at checkout.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/15">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="bg-white/10 text-[11px] uppercase tracking-wider text-[#F0B323]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Booking option</th>
                    <th className="px-4 py-3 font-semibold">Adult (12+)</th>
                    <th className="px-4 py-3 font-semibold">Minor (3–11)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/85">
                  <tr>
                    <th className="px-4 py-3 font-medium text-white">Shared experience</th>
                    <td className="px-4 py-3">{formatINR(BOOKING_RATE_DETAILS.shared.adult)}</td>
                    <td className="px-4 py-3">{formatINR(BOOKING_RATE_DETAILS.shared.minor)}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 font-medium text-white">Private experience</th>
                    <td className="px-4 py-3">{formatINR(BOOKING_RATE_DETAILS.private.firstAdult)} first adult; {formatINR(BOOKING_RATE_DETAILS.private.additionalAdult)} each additional adult</td>
                    <td className="px-4 py-3">{formatINR(BOOKING_RATE_DETAILS.private.minor)}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 font-medium text-white">Group · 10–17 guests</th>
                    <td className="px-4 py-3">{formatINR(BOOKING_RATE_DETAILS.group10To17.adult)}</td>
                    <td className="px-4 py-3">{formatINR(BOOKING_RATE_DETAILS.group10To17.minor)}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 font-medium text-white">Group · 18–25 guests</th>
                    <td className="px-4 py-3">{formatINR(BOOKING_RATE_DETAILS.group18To25.adult)}</td>
                    <td className="px-4 py-3">{formatINR(BOOKING_RATE_DETAILS.group18To25.minor)}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-3 font-medium text-white">VIP charter · 26+ guests</th>
                    <td className="px-4 py-3 text-[#F0B323]" colSpan={2}>Custom quote</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-relaxed text-white/70">
                {experience.razorpayPageUrl
                  ? 'Complete your booking securely on Razorpay.'
                  : 'Razorpay booking link is not connected yet. Contact our curator to book in the meantime.'}
              </p>
              {experience.razorpayPageUrl ? (
                <a
                  href={experience.razorpayPageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#F0B323] px-7 py-3 text-sm font-bold text-[#211915] shadow-md transition hover:bg-[#ffd15c]"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={onOpenCurator}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#F0B323] px-7 py-3 text-sm font-bold text-[#211915] shadow-md transition hover:bg-[#ffd15c]"
                >
                  Book Now <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
