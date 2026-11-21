import React, { useState } from 'react';
import {
  ArrowRight,
  Compass,
  Globe,
  Menu,
  MessageSquareQuote,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activePage: string;
  onNavigate: (page: string, experienceSlug?: string) => void;
  onOpenCurator: () => void;
  onOpenPlanPrivate: () => void;
  bookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activePage,
  onNavigate,
  onOpenCurator,
  onOpenPlanPrivate,
  bookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const navItems = [
    { page: 'home', label: t.navHome },
    { page: 'experiences', label: t.navExperiences },
    { page: 'faq', label: t.navFaq },
  ];

  const isActive = (page: string) =>
    activePage === page || (page === 'experiences' && activePage === 'experience-detail');

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8D3AF] bg-[#FFF8EA]/95 shadow-[0_4px_20px_rgba(39,35,31,0.04)] backdrop-blur-xl">
      <div className="bg-[#321E17] text-[#F6EBDC]">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.12em] sm:text-[11px]">
            <Sparkles className="h-3.5 w-3.5 text-[#F0B323]" />
            <span className="hidden sm:inline">
              {currentLang === 'en'
                ? 'CULTURAL JOURNEYS, THOUGHTFULLY HOSTED'
                : 'ఆత్మీయ ఆతిథ్యంతో సాంస్కృతిక ప్రయాణాలు'}
            </span>
            <span className="sm:hidden">
              {currentLang === 'en' ? 'DISCOVER ANDHRA' : 'ఆంధ్రను అన్వేషించండి'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onLanguageChange(currentLang === 'en' ? 'te' : 'en')}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-semibold text-white/90 transition-colors hover:border-[#F0B323]/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0B323]"
            title="Toggle language"
            aria-label={currentLang === 'en' ? 'Switch to Telugu' : 'Switch to English'}
          >
            <Globe className="h-3 w-3 text-[#F0B323]" />
            <span>{currentLang === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.5rem] items-center justify-between gap-4 sm:h-[5rem]">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex min-w-0 items-center gap-3 rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A52B23] focus-visible:ring-offset-4"
            aria-label={`${t.brandName} home`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#966000]/70 bg-gradient-to-br from-[#9F312B] to-[#631C18] font-serif text-sm font-bold tracking-tight text-[#FFF8EA] shadow-[0_5px_14px_rgba(165,43,35,0.2)] transition-transform group-hover:-rotate-3 group-hover:scale-105">
              AT
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif text-lg font-bold leading-tight tracking-tight text-[#2D1E18] transition-colors group-hover:text-[#A52B23] sm:text-xl">
                {t.brandName}
              </span>
              <span className="mt-0.5 hidden truncate font-serif text-[11px] italic leading-tight text-[#7D684F] sm:block">
                {t.tagline}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavClick(item.page)}
                aria-current={isActive(item.page) ? 'page' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A52B23] ${
                  isActive(item.page)
                    ? 'bg-[#A52B23]/[0.07] text-[#A52B23]'
                    : 'text-[#66574A] hover:bg-[#F7E9CD] hover:text-[#A52B23]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {bookingsCount > 0 && (
              <button
                type="button"
                onClick={() => handleNavClick('customer')}
                className={`inline-flex h-10 items-center gap-2 rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A52B23] ${
                  activePage === 'customer'
                    ? 'bg-[#2D1E18] text-white'
                    : 'text-[#654833] hover:bg-[#F7E9CD]'
                }`}
                aria-label={`My passes, ${bookingsCount} bookings`}
                title="View confirmed passes and invoices"
              >
                <Ticket className="h-4 w-4 text-[#A13A31]" />
                <span className="hidden xl:inline">My passes</span>
                <span className="rounded-full bg-[#A52B23] px-1.5 py-0.5 text-[10px] leading-none text-white">
                  {bookingsCount}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={onOpenCurator}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#E2C89A] px-3.5 text-xs font-semibold text-[#4D3829] transition-colors hover:border-[#C89D4D] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A52B23]"
              aria-label={t.talkToCurator}
            >
              <MessageSquareQuote className="h-4 w-4 text-[#A52B23]" />
              <span className="hidden xl:inline">{t.talkToCurator}</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('experiences')}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#A52B23] px-4 text-xs font-bold text-white shadow-[0_6px_16px_rgba(165,43,35,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#85251F] hover:shadow-[0_9px_20px_rgba(165,43,35,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A52B23] focus-visible:ring-offset-2"
            >
              <Compass className="h-3.5 w-3.5 text-[#FFD979]" />
              <span>{t.exploreExperiences}</span>
              <ArrowRight className="hidden h-3.5 w-3.5 sm:block" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <button
              type="button"
              onClick={onOpenCurator}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#A52B23] transition-colors hover:bg-[#F7E9CD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A52B23]"
              aria-label={t.talkToCurator}
            >
              <MessageSquareQuote className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#2D1E18] transition-colors hover:bg-[#F7E9CD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A52B23]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[#E8D3AF] bg-[#FFF8EA] px-4 pb-5 pt-3 shadow-lg md:hidden">
          <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavClick(item.page)}
                aria-current={isActive(item.page) ? 'page' : undefined}
                className={`rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A52B23] ${
                  isActive(item.page)
                    ? 'bg-[#A52B23] text-white'
                    : 'bg-white text-[#4D3829] hover:bg-[#F7E9CD]'
                }`}
              >
                {item.label}
              </button>
            ))}
            {bookingsCount > 0 && (
              <button
                type="button"
                onClick={() => handleNavClick('customer')}
                className="flex items-center justify-between rounded-xl bg-white px-3 py-3 text-left text-sm font-semibold text-[#4D3829] hover:bg-[#F7E9CD]"
              >
                <span>My passes</span>
                <span className="rounded-full bg-[#A52B23] px-2 py-0.5 text-xs text-white">{bookingsCount}</span>
              </button>
            )}
          </nav>
          <div className="mx-auto mt-3 grid max-w-7xl grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenCurator();
                setMobileMenuOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2C89A] bg-white px-3 py-3 text-xs font-semibold text-[#4D3829] hover:bg-[#FFF6E3]"
            >
              <MessageSquareQuote className="h-4 w-4 text-[#A52B23]" />
              <span>{t.talkToCurator}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenPlanPrivate();
                setMobileMenuOpen(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4E1BD] px-3 py-3 text-xs font-semibold text-[#4D3829] hover:bg-[#F1DFBF]"
            >
              <Sparkles className="h-4 w-4 text-[#704600]" />
              <span>{t.planPrivate}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
