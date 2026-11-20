import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Download, 
  Share2, 
  Smartphone, 
  Mail, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { formatINR } from '../utils/pricing';
import { ConfirmedBooking } from '../types';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: ConfirmedBooking;
  onGoToDashboard: () => void;
  onDownloadInvoice: (booking: ConfirmedBooking) => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  booking,
  onGoToDashboard,
  onDownloadInvoice,
}) => {
  if (!isOpen) return null;

  useEffect(() => {
    // Fire celebratory confetti on appearance
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A52B23', '#966000', '#FFF8EA', '#524033'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FFF8EA] w-full max-w-xl rounded-2xl shadow-2xl border-2 border-[#966000] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Ribbon */}
        <div className="bg-[#A52B23] text-white px-6 py-6 text-center relative border-b-2 border-[#966000]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-black/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-white text-[#A52B23] mx-auto flex items-center justify-center shadow-lg border-2 border-[#966000] mb-3">
            <CheckCircle2 className="w-8 h-8 text-[#A52B23]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#F0B323] block mb-1">
            Official Cultural Confirmation
          </span>
          <h3 className="font-serif text-2xl font-bold tracking-tight text-white">
            Your Journey Has Been Sanctified
          </h3>
          <p className="text-xs text-[#FFF8EA]/80 mt-1">
            Booking Reference: <span className="font-mono font-bold text-[#F0B323] text-sm">{booking.bookingCode}</span>
          </p>
        </div>

        {/* Content Details */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Experience Card summary */}
          <div className="bg-white rounded-xl p-4 border border-[#E9D4B2] shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A52B23] bg-[#FFF8EA] px-2 py-0.5 rounded border border-[#E9D4B2]">
                  {booking.experience.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#211915] mt-1.5">
                  {booking.experience.title}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#766452] block">Total Amount Paid</span>
                <span className="font-serif text-lg font-bold text-[#A52B23]">
                  {formatINR(booking.pricing.totalAmount)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F5E6CA] text-xs text-[#66574A]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#A52B23]" />
                <span className="font-medium text-[#211915]">{booking.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#A52B23]" />
                <span>{booking.timeSlot}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#A52B23]" />
                <span>{booking.adults} Adults, {booking.kids} Kids</span>
              </div>
            </div>

            {/* Facilitator assigned */}
            <div className="pt-2 border-t border-[#F5E6CA] flex items-center justify-between text-xs">
              <span className="text-[#766452]">Assigned Facilitator:</span>
              <span className="font-semibold text-[#211915]">
                {booking.experience.facilitator.name}
              </span>
            </div>
          </div>

          {/* Instant Dispatches notification banner */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 space-y-2 text-xs text-emerald-950">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>WhatsApp & Email Confirmation Dispatched</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-800">
              An instant WhatsApp alert and PDF pass have been sent to <strong>{booking.customer.phone}</strong> and <strong>{booking.customer.email}</strong> with meeting point GPS coordinates, recommended temple dress code, and your facilitator’s direct contact.
            </p>
          </div>

          {/* Included Add-ons summary if any */}
          {(booking.addons.pickupLocation !== 'none' ||
            booking.addons.specialPujaTickets > 0 ||
            booking.addons.souvenirKits > 0 ||
            booking.addons.photographyReels) && (
            <div className="bg-[#FFF8EA] rounded-xl p-3 border border-[#E9D4B2] text-xs space-y-1">
              <span className="font-bold text-[#211915] block mb-1">Confirmed Enhancements:</span>
              {booking.addons.pickupLocation !== 'none' && (
                <div className="text-[#66574A]">
                  • Private AC Chauffeur ({booking.addons.pickupLocation.toUpperCase()})
                </div>
              )}
              {booking.addons.specialPujaTickets > 0 && (
                <div className="text-[#66574A]">
                  • {booking.addons.specialPujaTickets}x Special Sanctum Archana Tickets
                </div>
              )}
              {booking.addons.souvenirKits > 0 && (
                <div className="text-[#66574A]">
                  • {booking.addons.souvenirKits}x Keepsake Memory Kits
                </div>
              )}
              {booking.addons.photographyReels && (
                <div className="text-[#66574A]">
                  • 10 High-res Portraits & 2 Cinematic Reels
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onDownloadInvoice(booking)}
              className="w-full py-3 rounded-full bg-[#211915] hover:bg-black text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4 text-[#966000]" />
              <span>Download Official Tax Invoice & Digital Pass</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onGoToDashboard();
              }}
              className="w-full py-3 rounded-full bg-[#A52B23] hover:bg-[#791F1A] text-white text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Manage in Customer Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
