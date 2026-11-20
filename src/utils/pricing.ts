import { ExperienceType, AddonsState } from '../types';

export interface PriceBreakdown {
  isContactSales: boolean;
  baseFare: number;
  adultFareTotal: number;
  kidFareTotal: number;
  totalGuests: number;
  pickupVehiclesCount: number;
  pickupFare: number;
  pujaFare: number;
  souvenirFare: number;
  photoFare: number;
  addonsTotal: number;
  subtotal: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
}

export const BOOKING_RATE_DETAILS = {
  shared: { adult: 2500, minor: 1700 },
  private: { firstAdult: 3600, additionalAdult: 2200, minor: 1500 },
  group10To17: { adult: 2200, minor: 1700 },
  group18To25: { adult: 2000, minor: 1500 },
  vipMinimumGuests: 26,
  gstRate: 0.05,
} as const;

export function calculatePricing(
  type: ExperienceType,
  adults: number,
  kids: number,
  addons: AddonsState
): PriceBreakdown {
  const totalGuests = Math.max(1, adults + kids);

  // Check group > 25 condition
  if (type === 'group' && totalGuests >= BOOKING_RATE_DETAILS.vipMinimumGuests) {
    return {
      isContactSales: true,
      baseFare: 0,
      adultFareTotal: 0,
      kidFareTotal: 0,
      totalGuests,
      pickupVehiclesCount: Math.ceil(totalGuests / 3),
      pickupFare: 0,
      pujaFare: 0,
      souvenirFare: 0,
      photoFare: 0,
      addonsTotal: 0,
      subtotal: 0,
      gstRate: 0.05,
      gstAmount: 0,
      totalAmount: 0,
    };
  }

  let adultFareTotal = 0;
  let kidFareTotal = 0;

  if (type === 'private') {
    if (adults > 0) {
      adultFareTotal = BOOKING_RATE_DETAILS.private.firstAdult + Math.max(0, adults - 1) * BOOKING_RATE_DETAILS.private.additionalAdult;
    }
    kidFareTotal = kids * BOOKING_RATE_DETAILS.private.minor;
  } else if (type === 'shared') {
    adultFareTotal = adults * BOOKING_RATE_DETAILS.shared.adult;
    kidFareTotal = kids * BOOKING_RATE_DETAILS.shared.minor;
  } else if (type === 'group') {
    if (totalGuests >= 10 && totalGuests <= 17) {
      adultFareTotal = adults * BOOKING_RATE_DETAILS.group10To17.adult;
      kidFareTotal = kids * BOOKING_RATE_DETAILS.group10To17.minor;
    } else if (totalGuests >= 18 && totalGuests <= 25) {
      adultFareTotal = adults * BOOKING_RATE_DETAILS.group18To25.adult;
      kidFareTotal = kids * BOOKING_RATE_DETAILS.group18To25.minor;
    } else {
      adultFareTotal = adults * BOOKING_RATE_DETAILS.group10To17.adult;
      kidFareTotal = kids * BOOKING_RATE_DETAILS.group10To17.minor;
    }
  }

  const baseFare = adultFareTotal + kidFareTotal;

  // Pickup & Drop Off:
  // Vijayawada: ₹1,800 per 3 guests
  // Guntur: ₹2,300 per 3 guests
  const pickupVehiclesCount = Math.ceil(totalGuests / 3);
  let pickupFare = 0;
  if (addons.pickupLocation === 'vijayawada') {
    pickupFare = pickupVehiclesCount * 1800;
  } else if (addons.pickupLocation === 'guntur') {
    pickupFare = pickupVehiclesCount * 2300;
  }

  // Special Puja Tickets: ₹500 each
  const pujaFare = (addons.specialPujaTickets || 0) * 500;

  // Souvenir Kits: ₹1,000 per unit
  const souvenirFare = (addons.souvenirKits || 0) * 1000;

  // Photography / Reels: ₹1,500 (flat)
  const photoFare = addons.photographyReels ? 1500 : 0;

  const addonsTotal = pickupFare + pujaFare + souvenirFare + photoFare;
  const subtotal = baseFare + addonsTotal;
  const gstRate = BOOKING_RATE_DETAILS.gstRate;
  const gstAmount = Math.round(subtotal * gstRate);
  const totalAmount = subtotal + gstAmount;

  return {
    isContactSales: false,
    baseFare,
    adultFareTotal,
    kidFareTotal,
    totalGuests,
    pickupVehiclesCount,
    pickupFare,
    pujaFare,
    souvenirFare,
    photoFare,
    addonsTotal,
    subtotal,
    gstRate,
    gstAmount,
    totalAmount,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
