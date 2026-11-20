import React from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { ConfirmedBooking } from '../types';
import { formatINR } from '../utils/pricing';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: ConfirmedBooking | null;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#966000] overflow-hidden flex flex-col max-h-[95vh]">
        {/* Modal Top Actions */}
        <div className="bg-[#211915] text-[#FFF8EA] px-6 py-3.5 flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-[#966000]" />
            <span>Tax Invoice / Cultural Travel Pass</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#FFF8EA]/10 hover:bg-[#FFF8EA]/20 text-white text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-full text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="p-8 overflow-y-auto flex-1 bg-white text-[#211915] text-xs font-sans space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-[#A52B23] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#A52B23] flex items-center justify-center text-white font-serif font-bold text-base">
                  JE
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-[#211915]">
                  Jignasa Experia
                </span>
              </div>
              <p className="text-[11px] text-[#66574A] max-w-xs leading-tight">
                Cultural Conservancy & Heritage Tourism Atelier<br />
                Amaravati Heritage Corridor, Mangalagiri Ghat Road, AP 522503<br />
                GSTIN: 37AAACJ4892M1ZX | SAC Code: 998555
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded text-[11px] uppercase tracking-wider mb-1.5">
                PAID & CONFIRMED
              </span>
              <div className="font-serif text-lg font-bold text-[#A52B23]">
                {booking.bookingCode}
              </div>
              <div className="text-[11px] text-[#766452]">
                Date of Issue: {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Billed To & Journey Details */}
          <div className="grid grid-cols-2 gap-6 bg-[#FFF8EA] p-4 rounded-xl border border-[#E9D4B2]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#766452] block mb-1">
                Guest / Patron Details
              </span>
              <div className="font-serif text-sm font-bold text-[#211915]">{booking.customer.fullName}</div>
              <div className="text-[#66574A]">{booking.customer.phone}</div>
              <div className="text-[#66574A]">{booking.customer.email}</div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#766452] block mb-1">
                Experience Scheduled
              </span>
              <div className="font-serif text-sm font-bold text-[#A52B23]">{booking.experience.title}</div>
              <div className="text-[#66574A]">
                <strong>Date & Time:</strong> {booking.date} | {booking.timeSlot}
              </div>
              <div className="text-[#66574A]">
                <strong>Guests:</strong> {booking.adults} Adults, {booking.kids} Kids ({booking.experienceType.toUpperCase()} TOUR)
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-[#E9D4B2] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F7EEDC] border-b border-[#E9D4B2] text-[#766452] text-[11px]">
                  <th className="py-2.5 px-4 font-semibold">Service Description</th>
                  <th className="py-2.5 px-4 font-semibold text-center">Unit / Qty</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5E6CA] text-xs">
                <tr>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#211915] block">{booking.experience.title}</span>
                    <span className="text-[11px] text-[#766452]">
                      {booking.experienceType === 'private' ? 'Private Custom Tour Protocol' : booking.experienceType === 'shared' ? 'Shared Cultural Immersion' : 'Group Charter'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-[#66574A]">
                    {booking.adults} Adults + {booking.kids} Kids
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-[#211915]">
                    {formatINR(booking.pricing.baseFare)}
                  </td>
                </tr>

                {booking.pricing.pickupFare > 0 && (
                  <tr>
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#211915]">Private Chauffeur Pickup & Drop</span>
                      <span className="text-[11px] text-[#766452] block">
                        Location: {booking.addons.pickupLocation.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-[#66574A]">
                      {Math.ceil((booking.adults + booking.kids) / 3)} Vehicle(s)
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#211915]">
                      {formatINR(booking.pricing.pickupFare)}
                    </td>
                  </tr>
                )}

                {booking.pricing.pujaFare > 0 && (
                  <tr>
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#211915]">Special Sanctum Archana Puja Tickets</span>
                    </td>
                    <td className="py-3 px-4 text-center text-[#66574A]">
                      {booking.addons.specialPujaTickets} Tickets
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#211915]">
                      {formatINR(booking.pricing.pujaFare)}
                    </td>
                  </tr>
                )}

                {booking.pricing.souvenirFare > 0 && (
                  <tr>
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#211915]">GI-Certified Keepsake Souvenir Kits</span>
                    </td>
                    <td className="py-3 px-4 text-center text-[#66574A]">
                      {booking.addons.souvenirKits} Kits
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-[#211915]">
                      {formatINR(booking.pricing.souvenirFare)}
                    </td>
                  </tr>
                )}

                {booking.pricing.photoFare > 0 && (
                  <tr>
                    <td className="py-3 px-4">
                      <span className="font-medium text-[#211915]">Cinematic Photography & Reels Package</span>
                      <span className="text-[11px] text-[#766452] block">10 Curated Portraits + 2 Color-Graded Reels</span>
                    </td>
                    <td className="py-3 px-4 text-center text-[#66574A]">1 Package</td>
                    <td className="py-3 px-4 text-right font-medium text-[#211915]">
                      {formatINR(booking.pricing.photoFare)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex justify-end">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#766452]">
                <span>Taxable Subtotal:</span>
                <span>{formatINR(booking.pricing.baseFare + booking.pricing.addonsTotal)}</span>
              </div>
              <div className="flex justify-between text-[#766452]">
                <span>GST @ 5% (SGST 2.5% + CGST 2.5%):</span>
                <span>{formatINR(booking.pricing.gstAmount)}</span>
              </div>
              <div className="flex justify-between font-serif text-base font-bold text-[#A52B23] pt-2 border-t border-[#A52B23]">
                <span>Total Amount Paid:</span>
                <span>{formatINR(booking.pricing.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Footer Notes & Authenticity seal */}
          <div className="pt-6 border-t border-[#F5E6CA] flex items-center justify-between text-[11px] text-[#766452]">
            <div className="max-w-xs space-y-1">
              <p className="font-semibold text-[#211915]">Authenticity & Verification Notice</p>
              <p>Please present this digital pass or booking code to your Cultural Facilitator upon arrival.</p>
            </div>
            <div className="text-right">
              <div className="font-serif italic font-bold text-[#A52B23] text-sm">Jignasa Experia</div>
              <div className="text-[10px] text-[#B4A28A]">Digitally Certified by Cultural Custodian Office</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
