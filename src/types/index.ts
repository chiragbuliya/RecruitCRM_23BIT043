export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favorites: string[];
}

export interface Category {
  label: string;
  iconName: string;
  description: string;
}

export interface HighlightItem {
  iconName: string;
  title: string;
  description: string;
}

export interface SleepingSpace {
  title: string;
  subtitle: string;
  imageSrc: string;
}

export interface AmenityItem {
  label: string;
  iconName: string;
  available?: boolean;
}

export interface Listing {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageSrc: string[];
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  bedCount?: number;
  locationValue: string;
  locationLabel: string;
  latlng: [number, number];
  price: number;
  currencySymbol?: string;
  totalNightsPrice?: number;
  nightsCount?: number;
  rating: number;
  reviewCount: number;
  isGuestFavourite?: boolean;
  host: {
    name: string;
    avatar: string;
    isSuperhost?: boolean;
    joinedDate?: string;
    hostingTenure?: string;
  };
  highlights?: HighlightItem[];
  sleepingSpaces?: SleepingSpace[];
  amenities?: AmenityItem[];
}

export interface Reservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  listing: Listing;
}

export interface SearchFilter {
  locationValue?: string;
  startDate?: string;
  endDate?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  category?: string;
}

export type ActiveTab = 'explore' | 'trips' | 'favorites' | 'reservations' | 'properties';
