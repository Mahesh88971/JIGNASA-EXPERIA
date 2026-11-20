import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  Clock, 
  MapPin, 
  Star, 
  ArrowRight, 
  Calendar as CalendarIcon, 
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { usePortalContent } from '../data/portalStore';
import { Category, LocationKey, DurationKey } from '../types';
import { formatINR } from '../utils/pricing';
import { Language, TRANSLATIONS } from '../data/translations';
import { getUpcomingWeekendDates } from '../utils/dates';

interface ExperiencesPageProps {
  currentLang: Language;
  onSelectExperience: (slug: string) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  currentLang,
  onSelectExperience,
}) => {
  const t = TRANSLATIONS[currentLang];

  // Fetch live experiences data
  const { experiences: liveExperiences, content } = usePortalContent();
  const blockedDates = content.blockedDates || [];
  const weekendDates = useMemo(() => getUpcomingWeekendDates(12), []);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<LocationKey[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<DurationKey[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available filter options according to specification
  const categoryOptions: Category[] = [
    'Temples & Spirituality',
    'Handlooms & Handicrafts',
    'Performing Arts',
    'Heritage',
    'Culinary',
    'Nature',
    'Mix',
  ];

  const locationOptions: LocationKey[] = [
    'Amaravati – Vijayawada',
    'Guntur',
    'Tirupati',
    'Vizag',
  ];

  const durationOptions: DurationKey[] = [
    'Under 2 hours',
    '2–4 hours',
    'Half-day',
    'Full-day',
  ];

  // Toggle helpers
  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleLocation = (loc: LocationKey) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const toggleDuration = (dur: DurationKey) => {
    setSelectedDurations((prev) =>
      prev.includes(dur) ? prev.filter((d) => d !== dur) : [...prev, dur]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedDurations([]);
    setSelectedDate('');
    setMaxPrice(10000);
    setSortBy('popular');
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedCategories.length +
    selectedLocations.length +
    selectedDurations.length +
    (selectedDate ? 1 : 0) +
    (maxPrice < 10000 ? 1 : 0);

  // Filtered & Sorted list
  const filteredExperiences = useMemo(() => {
    return liveExperiences.filter((exp) => {
      // Search matching title, tagline or city
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLocaleLowerCase();
        const searchableText = [
          exp.title,
          exp.teluguTitle,
          exp.tagline,
          exp.teluguTagline,
          exp.city,
          exp.location,
          exp.category,
          exp.description,
          ...exp.highlights,
        ].join(' ').toLocaleLowerCase();
        if (!searchableText.includes(query)) return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(exp.category)) {
        return false;
      }

      // Location filter
      if (selectedLocations.length > 0 && !selectedLocations.includes(exp.location)) {
        return false;
      }

      // Duration filter
      if (selectedDurations.length > 0 && !selectedDurations.includes(exp.duration)) {
        return false;
      }

      // Price filter
      if (exp.startingPrice > maxPrice) {
        return false;
      }

      // Blackout dates are managed centrally for all journeys.
      if (selectedDate && blockedDates.includes(selectedDate)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'price-desc') return b.startingPrice - a.startingPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular default
    });
  }, [searchQuery, selectedCategories, selectedLocations, selectedDurations, selectedDate, maxPrice, sortBy, liveExperiences, blockedDates]);

  return (
    <div className="bg-[#FFF8EA] min-h-screen py-12 text-[#211915]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left border-b border-[#E9D4B2] pb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#A52B23] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#966000]" />
            <span>{currentLang === 'en' ? 'Living Andhra Experiences' : 'సజీవ ఆంధ్ర అనుభవాలు'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#211915]">
            {currentLang === 'en' ? 'Curated Cultural Immersions' : 'విశిష్ట సాంస్కృతిక ప్రయాణాలు'}
          </h1>
          <p className="mt-3 text-sm text-[#66574A] max-w-2xl font-light">
            {currentLang === 'en'
              ? 'Select from our 9 flagship cultural journeys spanning sacred temple sanctums, 500-year-old pit looms, ancestral kitchens, and historic coastal waters.'
              : 'పవిత్ర ఆలయాలు, 500 ఏళ్ళ నాటి చేనేత మగ్గాలు, పాతకాలపు పాకశాలలు మరియు చారిత్రక తీర అనుభవాలు.'}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-[#CFB48C] text-xs font-bold shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#A52B23]" />
            <span>{mobileFilterOpen ? 'Hide Filters' : `Filters (${activeFiltersCount})`}</span>
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="py-2.5 px-3 rounded-xl bg-[#FFF8EA] border border-[#CFB48C] text-xs font-semibold text-[#A52B23] flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* 2.1 Layout: Left side filters, Right side cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 2.2 Left: Filters Panel */}
          <aside className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
            <div className="bg-white rounded-2xl p-6 border border-[#E9D4B2] shadow-cultural sticky top-28 space-y-6">
              {/* Filter Header & Reset */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F5E6CA]">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#A52B23]" />
                  <span className="font-serif font-bold text-base text-[#211915]">
                    {currentLang === 'en' ? 'Filters' : 'ఫిల్టర్లు'}
                  </span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#A52B23] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#A52B23] hover:underline flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t.resetFilters}</span>
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div>
                <label className="block text-xs font-bold text-[#211915] mb-2 uppercase tracking-wider">
                  {currentLang === 'en' ? 'Search Keyword' : 'వెతకండి'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={currentLang === 'en' ? 'e.g. Mangalagiri, Stupa, Toys...' : 'ఉదా. మంగళగిరి, బొమ్మలు...'}
                    className="w-full bg-[#FFF8EA] border border-[#CFB48C] rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-[#A52B23]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#766452] absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold text-[#211915] mb-2.5 uppercase tracking-wider">
                  {t.filterCategory}
                </label>
                <div className="space-y-2 text-xs">
                  {categoryOptions.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2.5 cursor-pointer text-[#524033] hover:text-[#A52B23]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="rounded border-[#CFB48C] text-[#A52B23] focus:ring-[#A52B23] w-3.5 h-3.5"
                      />
                      <span className="text-[12px]">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="pt-4 border-t border-[#F5E6CA]">
                <label className="block text-xs font-bold text-[#211915] mb-2.5 uppercase tracking-wider">
                  {t.filterLocation}
                </label>
                <div className="space-y-2 text-xs">
                  {locationOptions.map((loc) => (
                    <label
                      key={loc}
                      className="flex items-center gap-2.5 cursor-pointer text-[#524033] hover:text-[#A52B23]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc)}
                        onChange={() => toggleLocation(loc)}
                        className="rounded border-[#CFB48C] text-[#A52B23] focus:ring-[#A52B23] w-3.5 h-3.5"
                      />
                      <span className="text-[12px]">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="pt-4 border-t border-[#F5E6CA]">
                <label className="block text-xs font-bold text-[#211915] mb-2.5 uppercase tracking-wider">
                  {t.filterDuration}
                </label>
                <div className="space-y-2 text-xs">
                  {durationOptions.map((dur) => (
                    <label
                      key={dur}
                      className="flex items-center gap-2.5 cursor-pointer text-[#524033] hover:text-[#A52B23]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(dur)}
                        onChange={() => toggleDuration(dur)}
                        className="rounded border-[#CFB48C] text-[#A52B23] focus:ring-[#A52B23] w-3.5 h-3.5"
                      />
                      <span className="text-[12px]">{dur}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dates Calendar Selector (Saturdays & Sundays) */}
              <div className="pt-4 border-t border-[#F5E6CA]">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#211915] uppercase tracking-wider">
                    {t.filterDate}
                  </label>
                  <span className="text-[10px] text-[#A52B23] font-bold bg-[#A52B23]/10 px-2 py-0.5 rounded-full">
                    Weekends Only
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#FFF8EA] border border-[#CFB48C] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#A52B23]"
                  >
                    <option value="">All Open Weekend Dates</option>
                    {weekendDates.map((date) => (
                      <option
                        key={date.dateString}
                        value={date.dateString}
                        disabled={blockedDates.includes(date.dateString)}
                      >
                        {date.formattedDisplay}{blockedDates.includes(date.dateString) ? ' · Unavailable' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range Slider: ₹1,000 – ₹10,000+ */}
              <div className="pt-4 border-t border-[#F5E6CA]">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-[#211915] uppercase tracking-wider">
                    {t.filterPrice}
                  </label>
                  <span className="text-xs font-serif font-bold text-[#A52B23]">
                    Up to {formatINR(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-[#A52B23] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#766452] mt-1">
                  <span>₹1,000</span>
                  <span>₹10,000+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* 2.3 Right: Experience Cards Grid */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sorting bar & Count */}
            <div className="bg-white rounded-xl p-4 border border-[#E9D4B2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="text-[#66574A]">
                Showing <strong className="text-[#211915] font-serif text-sm">{filteredExperiences.length}</strong> of 9 Cultural Immersions
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-[#766452]">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FFF8EA] border border-[#CFB48C] rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-[#A52B23]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredExperiences.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E9D4B2] space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#FFF8EA] text-[#A52B23] mx-auto flex items-center justify-center">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#211915]">
                  No experiences match your criteria
                </h3>
                <p className="text-xs text-[#66574A] max-w-sm mx-auto">
                  Try adjusting your price slider, unchecking specific categories, or reset your filters to see all 9 curated journeys.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-[#A52B23] text-white rounded-full text-xs font-semibold hover:bg-[#791F1A] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Grid of Cards */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => onSelectExperience(exp.slug)}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#E9D4B2] shadow-cultural hover:shadow-cultural-lg transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1.5"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-4/3 overflow-hidden bg-[#34251D]">
                      <img
                        src={exp.heroImage}
                        alt={exp.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#FFF8EA]/90 backdrop-blur-md text-[#A52B23]">
                          {exp.category}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#211915]/80 text-[#FFF8EA] backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-[#966000] text-[#966000]" />
                        <span>{exp.rating}</span>
                        <span className="text-[#A7947A] text-[10px]">({exp.reviewsCount})</span>
                      </div>

                      {/* Location Chip */}
                      <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] text-[#FFF8EA]">
                        <MapPin className="w-3 h-3 text-[#F0B323]" />
                        <span>{exp.city}</span>
                      </div>
                      {exp.photoCredit && exp.photoCreditUrl && (
                        <a
                          href={exp.photoCreditUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="absolute bottom-2.5 right-3 max-w-[48%] truncate text-right text-[9px] text-white/80 underline decoration-white/40 underline-offset-2 hover:text-white"
                          title={`Photo credit: ${exp.photoCredit}`}
                        >
                          Photo: {exp.photoCredit}
                        </a>
                      )}
                    </div>

                    {/* Card Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#211915] group-hover:text-[#A52B23] transition-colors leading-snug">
                          {currentLang === 'en' ? exp.title : exp.teluguTitle}
                        </h3>
                        <p className="mt-1.5 text-xs text-[#66574A] line-clamp-2 leading-relaxed">
                          {currentLang === 'en' ? exp.tagline : exp.teluguTagline}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#F5E6CA] flex items-center justify-between text-xs text-[#66574A]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#A52B23]" />
                          <span>{exp.durationHours}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#766452] mr-1">{t.startingFrom}</span>
                          <span className="font-serif text-base font-bold text-[#211915]">
                            {formatINR(exp.startingPrice)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectExperience(exp.slug);
                        }}
                        className="w-full mt-1 py-2 px-3 rounded-xl bg-[#FFF8EA] hover:bg-[#A52B23] text-[#211915] hover:text-white border border-[#E9D4B2] hover:border-[#A52B23] text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>{t.viewExperience}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
