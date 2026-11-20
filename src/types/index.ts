export type ExperienceType = 'private' | 'shared' | 'group';

export type Category = 
  | 'Temples & Spirituality'
  | 'Handlooms & Handicrafts'
  | 'Performing Arts'
  | 'Heritage'
  | 'Culinary'
  | 'Nature'
  | 'Mix';

export type LocationKey = 
  | 'Amaravati – Vijayawada'
  | 'Guntur'
  | 'Tirupati'
  | 'Vizag';

export type DurationKey = 
  | 'Under 2 hours'
  | '2–4 hours'
  | 'Half-day'
  | 'Full-day';

export interface Facilitator {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  authorImage?: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  teluguTitle: string;
  category: Category;
  location: LocationKey;
  city: string;
  duration: DurationKey;
  durationHours: string;
  startingPrice: number;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  razorpayPageUrl?: string;
  photoCredit?: string;
  photoCreditUrl?: string;
  galleryImages: string[];
  tagline: string;
  teluguTagline: string;
  description: string;
  highlights: string[];
  whoIsThisFor: {
    title: string;
    description: string;
    icon: string;
  }[];
  whatsIncluded: string[];
  facilitator: Facilitator;
  itinerary: ItineraryItem[];
  reviews: Review[];
  featured?: boolean;
}

export interface AddonsState {
  pickupLocation: 'none' | 'vijayawada' | 'guntur';
  specialPujaTickets: number;
  souvenirKits: number;
  photographyReels: boolean;
}

export interface BookingState {
  experienceId: string;
  experienceType: ExperienceType;
  date: string;
  timeSlot: string;
  adults: number;
  kids: number;
  addons: AddonsState;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
    specialNotes: string;
  };
}

export interface ConfirmedBooking {
  id: string;
  bookingCode: string;
  experience: Experience;
  experienceType: ExperienceType;
  date: string;
  timeSlot: string;
  adults: number;
  kids: number;
  addons: AddonsState;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    specialNotes?: string;
  };
  pricing: {
    baseFare: number;
    addonsTotal: number;
    pickupFare: number;
    pujaFare: number;
    souvenirFare: number;
    photoFare: number;
    gstAmount: number;
    totalAmount: number;
  };
  status: 'Confirmed' | 'Completed' | 'Modified' | 'Cancelled';
  createdAt: string;
  canEditAddons: boolean;
}
