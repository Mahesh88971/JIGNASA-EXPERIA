import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { FAQPage } from './pages/FAQPage';
import { CuratorChatModal } from './components/CuratorChatModal';
import { PlanPrivateModal } from './components/PlanPrivateModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { InvoiceModal } from './components/InvoiceModal';
import { EXPERIENCES_DATA } from './data/experiences';
import { Language } from './data/translations';
import { ConfirmedBooking, BookingState, AddonsState } from './types';
import { PriceBreakdown } from './utils/pricing';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { usePortalContent, savePortalContent } from './data/portalStore';

const DEFAULT_EXPERIENCE_SLUG = 'mangalagiri-sacred-hill-handloom';

function routeFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean).map(decodeURIComponent);

  if (segments[0] === 'experiences' && segments[1]) {
    return { page: 'experience-detail', experienceSlug: segments[1] };
  }
  if (segments[0] === 'experiences') return { page: 'experiences' };
  if (segments[0] === 'customer') return { page: 'customer' };
  if (segments[0] === 'faq') return { page: 'faq' };
  return { page: 'home' };
}

function pathForPage(page: string, experienceSlug: string) {
  if (page === 'experience-detail') return `/experiences/${encodeURIComponent(experienceSlug)}`;
  if (page === 'experiences') return '/experiences';
  if (page === 'customer') return '/customer';
  if (page === 'faq') return '/faq';
  return '/';
}

export function App() {
  const isAdminPortal = window.location.pathname === '/secure-operations';
  const [adminToken, setAdminToken] = useState<string | null>(() =>
    isAdminPortal ? sessionStorage.getItem('je_admin_token') : null
  );
  const { experiences: portalExperiences, content: portalContent } = usePortalContent();

  // Navigation State
  const [initialRoute] = useState(() => routeFromPath(window.location.pathname));
  const [activePage, setActivePage] = useState<string>(initialRoute.page);
  const [selectedExperienceSlug, setSelectedExperienceSlug] = useState<string>(
    initialRoute.experienceSlug || DEFAULT_EXPERIENCE_SLUG
  );

  // Language State with persistence
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('je_lang');
      return (saved === 'te' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  // Bookings Store (Starts with ZERO bookings as requested by user)
  const [bookings, setBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const saved = localStorage.getItem('je_bookings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Filter out any old mock bookings if present
        const filtered = Array.isArray(parsed) 
          ? parsed.filter((b: any) => !b.id.startsWith('bk-10')) 
          : [];
        return filtered;
      }
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('je_lang', currentLang);
    } catch {}
  }, [currentLang]);

  useEffect(() => {
    try {
      localStorage.setItem('je_bookings', JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  // Modals State
  const [isCuratorOpen, setIsCuratorOpen] = useState(false);
  const [isPlanPrivateOpen, setIsPlanPrivateOpen] = useState(false);

  // Checkout & Confirmation States
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<{
    booking: BookingState;
    pricing: PriceBreakdown;
  } | null>(null);

  const [confirmedBookingForModal, setConfirmedBookingForModal] = useState<ConfirmedBooking | null>(null);
  const [invoiceBookingForModal, setInvoiceBookingForModal] = useState<ConfirmedBooking | null>(null);

  // Scroll to top on navigation
  const handleNavigate = (page: string, experienceSlug?: string) => {
    const nextSlug = experienceSlug || selectedExperienceSlug;
    if (page === 'experience-detail' && experienceSlug) setSelectedExperienceSlug(experienceSlug);
    setActivePage(page);
    window.history.pushState({}, '', pathForPage(page, nextSlug));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExperience = (slug: string) => {
    handleNavigate('experience-detail', slug);
  };

  useEffect(() => {
    const syncRoute = () => {
      const route = routeFromPath(window.location.pathname);
      setActivePage(route.page);
      if (route.experienceSlug) setSelectedExperienceSlug(route.experienceSlug);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  // Find active experience object
  const currentExperience =
    portalExperiences.find((e) => e.slug === selectedExperienceSlug) || portalExperiences[0];

  // Initiate Payment from Experience Page
  const handleInitiatePayment = (booking: BookingState, pricing: PriceBreakdown) => {
    setPendingBooking({ booking, pricing });
    setIsPaymentOpen(true);
  };

  // On Payment Successful (Instant reservation without any login barrier)
  const handlePaymentSuccess = () => {
    if (!pendingBooking) return;
    const { booking, pricing } = pendingBooking;

    const newConfirmedBooking: ConfirmedBooking = {
      id: `bk-${Date.now()}`,
      bookingCode: `JE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      experience: currentExperience,
      experienceType: booking.experienceType,
      date: booking.date,
      timeSlot: booking.timeSlot,
      adults: booking.adults,
      kids: booking.kids,
      addons: booking.addons,
      customer: {
        fullName: booking.customer.fullName,
        email: booking.customer.email,
        phone: booking.customer.phone,
        specialNotes: booking.customer.specialNotes,
      },
      pricing: {
        baseFare: pricing.baseFare,
        addonsTotal: pricing.addonsTotal,
        pickupFare: pricing.pickupFare,
        pujaFare: pricing.pujaFare,
        souvenirFare: pricing.souvenirFare,
        photoFare: pricing.photoFare,
        gstAmount: pricing.gstAmount,
        totalAmount: pricing.totalAmount,
      },
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      canEditAddons: true,
    };

    setBookings((prev) => [newConfirmedBooking, ...prev]);
    setIsPaymentOpen(false);
    setConfirmedBookingForModal(newConfirmedBooking);
  };

  // Customer updating addons (up to 24hr window)
  const handleUpdateBookingAddons = (bookingId: string, updatedAddons: AddonsState) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;

        const totalGuests = b.adults + b.kids;
        const pickupCount = Math.ceil(totalGuests / 3);
        let newPickupFare = 0;
        if (updatedAddons.pickupLocation === 'vijayawada') newPickupFare = pickupCount * 1800;
        if (updatedAddons.pickupLocation === 'guntur') newPickupFare = pickupCount * 2300;

        const newPujaFare = updatedAddons.specialPujaTickets * 500;
        const newSouvenirFare = updatedAddons.souvenirKits * 1000;
        const newPhotoFare = updatedAddons.photographyReels ? 1500 : 0;
        const newAddonsTotal = newPickupFare + newPujaFare + newSouvenirFare + newPhotoFare;
        const newSubtotal = b.pricing.baseFare + newAddonsTotal;
        const newGst = Math.round(newSubtotal * 0.05);
        const newTotal = newSubtotal + newGst;

        return {
          ...b,
          addons: updatedAddons,
          status: 'Modified' as const,
          pricing: {
            ...b.pricing,
            pickupFare: newPickupFare,
            pujaFare: newPujaFare,
            souvenirFare: newSouvenirFare,
            photoFare: newPhotoFare,
            addonsTotal: newAddonsTotal,
            gstAmount: newGst,
            totalAmount: newTotal,
          },
        };
      })
    );
  };

  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b))
    );
  };

  // Secret-route administration is handled separately above.

  const handleUpdateBookingStatus = (bookingId: string, newStatus: ConfirmedBooking['status']) => {
    setBookings((prev) => prev.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const handleSavePortalContent = async (experiences: typeof portalExperiences, blockedDates: string[]) => {
    if (!adminToken) throw new Error('Admin session expired');
    await savePortalContent({ experiences, blockedDates }, adminToken);
  };

  if (isAdminPortal) {
    if (!adminToken) {
      return <AdminLoginPage onLogin={(token) => setAdminToken(token)} />;
    }
    return (
      <AdminPage
        currentLang={currentLang}
        bookings={bookings}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onOpenInvoice={(booking) => setInvoiceBookingForModal(booking)}
        initialExperiences={portalContent.experiences?.length ? portalContent.experiences : portalExperiences}
        initialBlockedDates={portalContent.blockedDates}
        onSaveContent={handleSavePortalContent}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8EA] text-[#211915]">
      {/* Top Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenCurator={() => setIsCuratorOpen(true)}
        onOpenPlanPrivate={() => setIsPlanPrivateOpen(true)}
        bookingsCount={bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Modified').length}
      />

      {/* Main Page Rendering */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            currentLang={currentLang}
            onNavigate={handleNavigate}
            onOpenCurator={() => setIsCuratorOpen(true)}
            onOpenPlanPrivate={() => setIsPlanPrivateOpen(true)}
          />
        )}

        {activePage === 'experiences' && (
          <ExperiencesPage
            currentLang={currentLang}
            onSelectExperience={handleSelectExperience}
          />
        )}

        {activePage === 'experience-detail' && (
          <ExperienceDetailPage
            experience={currentExperience}
            currentLang={currentLang}
            onNavigateBack={() => handleNavigate('experiences')}
            onOpenCurator={() => setIsCuratorOpen(true)}
          />
        )}

        {activePage === 'customer' && (
          <CustomerDashboardPage
            currentLang={currentLang}
            bookings={bookings}
            onUpdateBookingAddons={handleUpdateBookingAddons}
            onCancelBooking={handleCancelBooking}
            onDownloadInvoice={(b) => setInvoiceBookingForModal(b)}
            onExploreMore={() => handleNavigate('experiences')}
          />
        )}

        {activePage === 'faq' && (
          <FAQPage
            currentLang={currentLang}
            onOpenCurator={() => setIsCuratorOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenCurator={() => setIsCuratorOpen(true)}
      />

      {/* Global Floating "Talk to Experience Curator" Pill Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsCuratorOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#A52B23] hover:bg-[#791F1A] text-white shadow-2xl hover:scale-105 transition-all border-2 border-[#966000] cursor-pointer group"
          title="Talk to Cultural Concierge"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0B323] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F0B323]"></span>
          </span>
          <span className="font-serif font-bold text-xs tracking-wide">
            {currentLang === 'en' ? 'Talk to Experience Curator' : 'క్యూరేటర్‌తో సంప్రదించండి'}
          </span>
        </button>
      </div>

      {/* Curator Interactive Chat Modal */}
      <CuratorChatModal
        isOpen={isCuratorOpen}
        onClose={() => setIsCuratorOpen(false)}
        currentLang={currentLang}
        onSelectExperience={handleSelectExperience}
      />

      {/* Bespoke Private Experience Questionnaire Modal */}
      <PlanPrivateModal
        isOpen={isPlanPrivateOpen}
        onClose={() => setIsPlanPrivateOpen(false)}
        currentLang={currentLang}
      />

      {/* Step 8 Payment Gateway Simulation Modal (Direct guest checkout, zero login needed) */}
      {pendingBooking && (
        <PaymentGatewayModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          experience={currentExperience}
          booking={pendingBooking.booking}
          pricing={pendingBooking.pricing}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Step 9 Confirmation Screen Modal with Confetti & Digital Passes */}
      {confirmedBookingForModal && (
        <BookingConfirmationModal
          isOpen={!!confirmedBookingForModal}
          onClose={() => setConfirmedBookingForModal(null)}
          booking={confirmedBookingForModal}
          onGoToDashboard={() => {
            setConfirmedBookingForModal(null);
            handleNavigate('customer');
          }}
          onDownloadInvoice={(b) => setInvoiceBookingForModal(b)}
        />
      )}

      {/* Official Tax Invoice & Cultural Digital Pass Modal */}
      <InvoiceModal
        isOpen={!!invoiceBookingForModal}
        onClose={() => setInvoiceBookingForModal(null)}
        booking={invoiceBookingForModal}
      />
    </div>
  );
}

export default App;
