import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Download, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  Sparkles,
  Ticket
} from 'lucide-react';
import { ConfirmedBooking, AddonsState } from '../types';
import { formatINR } from '../utils/pricing';
import { Language } from '../data/translations';

interface CustomerDashboardPageProps {
  currentLang: Language;
  bookings: ConfirmedBooking[];
  onUpdateBookingAddons: (bookingId: string, updatedAddons: AddonsState) => void;
  onCancelBooking: (bookingId: string) => void;
  onDownloadInvoice: (booking: ConfirmedBooking) => void;
  onExploreMore: () => void;
}

export const CustomerDashboardPage: React.FC<CustomerDashboardPageProps> = ({
  currentLang,
  bookings,
  onUpdateBookingAddons,
  onCancelBooking,
  onDownloadInvoice,
  onExploreMore,
}) => {
  // Booking ID Lookup state (for guests looking up by code)
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupFeedback, setLookupFeedback] = useState<string | null>(null);

  // Interactive Add-ons Editor State (till 24 hours before)
  const [editingBooking, setEditingBooking] = useState<ConfirmedBooking | null>(null);
  const [tempAddons, setTempAddons] = useState<AddonsState | null>(null);

  // Cancel Modal State
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const openAddonsEditor = (b: ConfirmedBooking) => {
    setEditingBooking(b);
    setTempAddons({ ...b.addons });
  };

  const saveEditedAddons = () => {
    if (editingBooking && tempAddons) {
      onUpdateBookingAddons(editingBooking.id, tempAddons);
      setEditingBooking(null);
      setTempAddons(null);
    }
  };

  const handleConfirmCancel = () => {
    if (cancellingBookingId) {
      onCancelBooking(cancellingBookingId);
      setCancellingBookingId(null);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const query = lookupQuery.trim().toLowerCase();
    const found = bookings.find(
      (b) =>
        b.bookingCode.toLowerCase() === query ||
        b.customer.phone.toLowerCase().includes(query) ||
        b.customer.email.toLowerCase() === query
    );
    if (found) {
      setLookupFeedback(`Found booking for ${found.customer.fullName} (${found.experience.title})`);
    } else {
      setLookupFeedback('No active booking matching that reference ID or phone number.');
    }
  };

  return (
    <div className="bg-[#FFF8EA] min-h-screen py-12 text-[#211915]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Ribbon */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9D4B2] shadow-cultural flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#A52B23] text-white flex items-center justify-center font-serif font-bold text-sm">
                AT
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#211915]">
                {currentLang === 'en' ? 'Your Reserved Experiences' : 'మీ రిజర్వ్ చేయబడిన అనుభవాలు'}
              </h1>
            </div>
            <p className="text-xs text-[#66574A]">
              Direct access to your digital passes, tax invoices, and 24-hour enhancement adjustments. No login required.
            </p>
          </div>

          <button
            onClick={onExploreMore}
            className="px-5 py-2.5 rounded-full bg-[#A52B23] hover:bg-[#791F1A] text-white text-xs font-semibold shadow-xs transition-all"
          >
            Explore More Experiences
          </button>
        </div>

        {/* If no bookings yet, show friendly empty state with quick lookup */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E9D4B2] shadow-cultural space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FFF8EA] text-[#A52B23] mx-auto flex items-center justify-center border-2 border-[#966000]">
              <Ticket className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h2 className="font-serif text-2xl font-bold text-[#211915]">
                No Bookings in this Session
              </h2>
              <p className="text-xs text-[#66574A] leading-relaxed">
                You do not need to create an account or log in to book. Choose any of our 9 curated cultural immersions and complete instant guest checkout.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreMore}
                className="px-8 py-3.5 bg-[#A52B23] hover:bg-[#791F1A] text-white rounded-full text-xs font-bold tracking-wide shadow-md transition-all"
              >
                Explore Curated Journeys & Book Directly
              </button>
            </div>

            {/* Quick Lookup Card for returning patrons */}
            <div className="pt-8 border-t border-[#F5E6CA] max-w-md mx-auto text-left space-y-3">
              <span className="text-xs font-bold text-[#211915] block uppercase tracking-wider">
                Already have a Booking Code?
              </span>
              <form onSubmit={handleLookup} className="flex gap-2">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="e.g. JE-2026-9812 or Phone"
                  className="flex-1 bg-[#FFF8EA] border border-[#CFB48C] rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#A52B23]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#211915] text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors"
                >
                  Lookup
                </button>
              </form>
              {lookupFeedback && (
                <p className="text-xs text-[#A52B23] font-medium">{lookupFeedback}</p>
              )}
            </div>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-6">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E9D4B2] shadow-cultural space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-[#F5E6CA]">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A52B23] bg-[#FFF8EA] px-2 py-0.5 rounded border border-[#E9D4B2]">
                        {b.experience.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#966000]">
                        {b.bookingCode}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#211915]">
                      {b.experience.title}
                    </h3>
                    <p className="text-xs text-[#66574A] mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#A52B23]" />
                      <span>{b.experience.city}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span className="text-[11px] text-[#766452]">Total Amount</span>
                    <span className="font-serif text-2xl font-bold text-[#A52B23]">
                      {formatINR(b.pricing.totalAmount)}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                      {b.status}
                    </span>
                  </div>
                </div>

                {/* Trip Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#66574A]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#766452] block">Date</span>
                    <span className="font-semibold text-[#211915] flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-[#A52B23]" />
                      {b.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#766452] block">Time Slot</span>
                    <span className="font-semibold text-[#211915] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-[#A52B23]" />
                      {b.timeSlot}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#766452] block">Patrons</span>
                    <span className="font-semibold text-[#211915] mt-0.5 block">
                      {b.adults} Adults, {b.kids} Children
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#766452] block">Guest Name</span>
                    <span className="font-semibold text-[#211915] mt-0.5 block">
                      {b.customer.fullName}
                    </span>
                  </div>
                </div>

                {/* Add-ons summary box with edit trigger */}
                <div className="bg-[#FFF8EA] rounded-xl p-4 border border-[#E9D4B2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-[#211915] block">Configured Enhancements & Add-ons:</span>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#66574A]">
                      <span>• Chauffeur: {b.addons.pickupLocation.toUpperCase()}</span>
                      <span>• Puja Tickets: {b.addons.specialPujaTickets}</span>
                      <span>• Keepsakes: {b.addons.souvenirKits}</span>
                      <span>• Photography: {b.addons.photographyReels ? 'Included' : 'None'}</span>
                    </div>
                  </div>

                  {b.canEditAddons && b.status !== 'Cancelled' && (
                    <button
                      onClick={() => openAddonsEditor(b)}
                      className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#A52B23] text-[#A52B23] hover:text-white border border-[#A52B23] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Add-ons (24hr window)</span>
                    </button>
                  )}
                </div>

                {/* Actions: Invoice, Cancel / Modify */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDownloadInvoice(b)}
                      className="px-4 py-2.5 rounded-xl bg-[#211915] hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5 text-[#966000]" />
                      <span>Download Tax Invoice & Digital Pass</span>
                    </button>
                  </div>

                  {b.status !== 'Cancelled' && (
                    <div className="flex items-center gap-3 text-xs">
                      <button
                        onClick={() => setCancellingBookingId(b.id)}
                        className="text-[#A52B23] hover:underline font-semibold"
                      >
                        Cancel or Reschedule Immersion
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Add-ons Editor Modal */}
      {editingBooking && tempAddons && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFF8EA] w-full max-w-lg rounded-2xl shadow-2xl border border-[#966000] p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9D4B2]">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#211915]">
                  Modify Add-ons & Enhancements
                </h3>
                <p className="text-xs text-[#66574A]">
                  {editingBooking.bookingCode} • {editingBooking.experience.title}
                </p>
              </div>
              <button
                onClick={() => setEditingBooking(null)}
                className="text-[#766452] hover:text-[#211915]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#211915] mb-1">Chauffeured Pickup</label>
                <select
                  value={tempAddons.pickupLocation}
                  onChange={(e) =>
                    setTempAddons({ ...tempAddons, pickupLocation: e.target.value as any })
                  }
                  className="w-full bg-white border border-[#CFB48C] rounded-xl p-2 text-xs"
                >
                  <option value="none">No Pickup (Self-Drive)</option>
                  <option value="vijayawada">Vijayawada (₹1,800/3 guests)</option>
                  <option value="guntur">Guntur (₹2,300/3 guests)</option>
                </select>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#CFB48C]">
                <span>Special Puja Tickets (₹500 each)</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setTempAddons({
                        ...tempAddons,
                        specialPujaTickets: Math.max(0, tempAddons.specialPujaTickets - 1),
                      })
                    }
                    className="w-6 h-6 rounded bg-[#FFF8EA] border border-[#CFB48C] font-bold"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-bold">{tempAddons.specialPujaTickets}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setTempAddons({
                        ...tempAddons,
                        specialPujaTickets: tempAddons.specialPujaTickets + 1,
                      })
                    }
                    className="w-6 h-6 rounded bg-[#FFF8EA] border border-[#CFB48C] font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#CFB48C]">
                <span>Souvenir Keepsake Kits (₹1,000 each)</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setTempAddons({
                        ...tempAddons,
                        souvenirKits: Math.max(0, tempAddons.souvenirKits - 1),
                      })
                    }
                    className="w-6 h-6 rounded bg-[#FFF8EA] border border-[#CFB48C] font-bold"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-bold">{tempAddons.souvenirKits}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setTempAddons({
                        ...tempAddons,
                        souvenirKits: tempAddons.souvenirKits + 1,
                      })
                    }
                    className="w-6 h-6 rounded bg-[#FFF8EA] border border-[#CFB48C] font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <label className="flex items-center justify-between bg-white p-3 rounded-xl border border-[#CFB48C] cursor-pointer">
                <span>Photography & Cinematic Reels (₹1,500)</span>
                <input
                  type="checkbox"
                  checked={tempAddons.photographyReels}
                  onChange={(e) =>
                    setTempAddons({ ...tempAddons, photographyReels: e.target.checked })
                  }
                  className="rounded text-[#A52B23]"
                />
              </label>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingBooking(null)}
                className="px-4 py-2 rounded-full border border-[#CFB48C] text-xs font-semibold text-[#66574A]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEditedAddons}
                className="px-6 py-2 rounded-full bg-[#A52B23] hover:bg-[#791F1A] text-white text-xs font-semibold"
              >
                Save & Update Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-red-200 space-y-4 text-xs">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#211915]">
                Cancel or Reschedule Immersion?
              </h3>
              <p className="text-[#66574A] leading-relaxed">
                As this booking is more than 24 hours away, a 100% full refund of the amount will be reversed to your original payment method, or you may freely reschedule to another date via our curator.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCancellingBookingId(null)}
                className="flex-1 py-2.5 rounded-full border border-[#CFB48C] font-semibold text-[#66574A]"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-full bg-red-700 hover:bg-red-800 text-white font-semibold"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
