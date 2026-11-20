import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Globe, 
  CheckCircle2, 
  Sparkles,
  QrCode
} from 'lucide-react';
import { formatINR, PriceBreakdown } from '../utils/pricing';
import { Experience, BookingState } from '../types';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience: Experience;
  booking: BookingState;
  pricing: PriceBreakdown;
  onPaymentSuccess: () => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  experience,
  booking,
  pricing,
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'stripe'>('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('889');
  const [cardName, setCardName] = useState(booking.customer.fullName || 'Venkata Satyanarayana');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#966000] overflow-hidden flex flex-col max-h-[95vh]">
        {/* Payment Gateway Header */}
        <div className="bg-[#211915] text-[#FFF8EA] px-6 py-4 flex items-center justify-between border-b border-[#524033]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#A52B23] flex items-center justify-center text-white font-serif font-bold text-sm">
              JE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-white">Jignasa Experia Secure Checkout</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-700/50 px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                  <Lock className="w-2.5 h-2.5" /> 256-bit SSL
                </span>
              </div>
              <p className="text-[11px] text-[#B4A28A]">
                Razorpay & Stripe Verified Gateway
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#B4A28A] hover:text-white p-1 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Ribbon */}
        <div className="bg-[#FFF8EA] px-6 py-3 border-b border-[#E9D4B2] flex items-center justify-between text-xs">
          <div>
            <span className="text-[#766452]">Booking: </span>
            <span className="font-serif font-bold text-[#211915]">{experience.title}</span>
            <span className="text-[#A52B23] ml-2">({booking.date})</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#766452]">Total: </span>
            <span className="font-serif text-base font-bold text-[#A52B23]">
              {formatINR(pricing.totalAmount)}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Payment Method Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-[#211915] mb-2 uppercase tracking-wider">
              Select Payment Instrument
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#A52B23] bg-[#A52B23]/5 text-[#A52B23] font-bold shadow-xs'
                    : 'border-[#E9D4B2] text-[#66574A] hover:border-[#A52B23]/40'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#A52B23] bg-[#A52B23]/5 text-[#A52B23] font-bold shadow-xs'
                    : 'border-[#E9D4B2] text-[#66574A] hover:border-[#A52B23]/40'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-[#A52B23] bg-[#A52B23]/5 text-[#A52B23] font-bold shadow-xs'
                    : 'border-[#E9D4B2] text-[#66574A] hover:border-[#A52B23]/40'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'stripe'
                    ? 'border-[#A52B23] bg-[#A52B23]/5 text-[#A52B23] font-bold shadow-xs'
                    : 'border-[#E9D4B2] text-[#66574A] hover:border-[#A52B23]/40'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>NRI / Stripe</span>
              </button>
            </div>
          </div>

          {/* Form based on Selected Method */}
          <form onSubmit={handlePay} className="space-y-4">
            {paymentMethod === 'upi' && (
              <div className="bg-[#FFF8EA] p-4 rounded-xl border border-[#E9D4B2] space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#E9D4B2]">
                  <span className="font-semibold text-[#211915]">Scan & Pay with Any UPI App</span>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#66574A]">
                    <span className="font-semibold text-emerald-700">GPay</span> • 
                    <span className="font-semibold text-purple-700">PhonePe</span> • 
                    <span className="font-semibold text-sky-700">Paytm</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
                  <div className="w-28 h-28 bg-white border-2 border-dashed border-[#966000] rounded-xl flex flex-col items-center justify-center p-2 text-center shrink-0">
                    <QrCode className="w-16 h-16 text-[#A52B23]" />
                    <span className="text-[9px] text-[#66574A] mt-1">Instant QR Code</span>
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <label className="block text-xs font-medium text-[#211915]">
                      Or enter Virtual Payment Address (VPA)
                    </label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full bg-white border border-[#CFB48C] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#A52B23]"
                    />
                    <p className="text-[10px] text-[#766452]">
                      A payment request notification will be dispatched to your UPI app.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {(paymentMethod === 'card' || paymentMethod === 'stripe') && (
              <div className="bg-[#FFF8EA] p-4 rounded-xl border border-[#E9D4B2] space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-[#211915] mb-1">
                    Cardholder Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-white border border-[#CFB48C] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#A52B23]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#211915] mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-white border border-[#CFB48C] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#A52B23]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-[#211915] mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full bg-white border border-[#CFB48C] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#A52B23]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#211915] mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full bg-white border border-[#CFB48C] rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#A52B23]"
                    />
                  </div>
                </div>

                {paymentMethod === 'stripe' && (
                  <p className="text-[10px] text-[#766452] flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#966000]" />
                    Accepting USD, EUR, GBP, SGD, AUD, AED with automatic zero forex markup.
                  </p>
                )}
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="bg-[#FFF8EA] p-4 rounded-xl border border-[#E9D4B2] space-y-3 text-xs">
                <label className="block font-medium text-[#211915]">
                  Select Your Bank
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak', 'Others'].map((bank, i) => (
                    <button
                      type="button"
                      key={i}
                      className="py-2.5 px-2 bg-white hover:bg-[#FFF8EA] border border-[#CFB48C] rounded-lg text-center font-medium hover:border-[#A52B23] transition-colors"
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price breakdown recapitulation */}
            <div className="pt-2 text-xs space-y-1.5 border-t border-[#E9D4B2]">
              <div className="flex justify-between text-[#766452]">
                <span>Experience Base ({booking.adults} Adults, {booking.kids} Kids)</span>
                <span>{formatINR(pricing.baseFare)}</span>
              </div>
              {pricing.addonsTotal > 0 && (
                <div className="flex justify-between text-[#766452]">
                  <span>Add-ons (Pickup, Puja, Keepsakes)</span>
                  <span>{formatINR(pricing.addonsTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#766452]">
                <span>GST (5% Cultural Tourism Tax)</span>
                <span>{formatINR(pricing.gstAmount)}</span>
              </div>
              <div className="flex justify-between font-serif text-sm font-bold text-[#211915] pt-1 border-t border-[#E9D4B2]">
                <span>Total Payable</span>
                <span className="text-[#A52B23] text-base">{formatINR(pricing.totalAmount)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-full bg-[#A52B23] hover:bg-[#85251F] text-white font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Sacred Booking...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#966000]" />
                  <span>Pay {formatINR(pricing.totalAmount)} & Confirm Experience</span>
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] text-center text-[#766452] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Refundable up to 24 hours prior to immersion start time.
          </p>
        </div>
      </div>
    </div>
  );
};
