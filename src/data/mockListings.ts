import type { Listing } from '../types';

export const CANDOLIM_LISTING: Listing = {
  id: 'listing-candolim',
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  subtitle: 'Entire serviced apartment in Candolim, India',
  description: `Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's the perfect luxury retreat in North Goa.

Featuring a private outdoor terrace with a wooden jacuzzi tub, plush alfresco lounge seating, air-conditioned king suite, fully equipped kitchen, high-speed WiFi, and 24/7 building security staff.`,
  imageSrc: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', // Main Jacuzzi terrace
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', // Patio seating
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', // Jacuzzi tub
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80', // Bedroom
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'  // Exterior building
  ],
  category: 'Pools',
  roomCount: 1,
  bedCount: 1,
  bathroomCount: 1,
  guestCount: 3,
  locationValue: 'IN',
  locationLabel: 'Candolim, India',
  latlng: [15.518, 73.763],
  price: 5700,
  currencySymbol: '₹',
  totalNightsPrice: 28499,
  nightsCount: 5,
  rating: 4.95,
  reviewCount: 19,
  isGuestFavourite: true,
  host: {
    name: 'Mirashya Homes',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
    isSuperhost: true,
    joinedDate: 'Joined March 2022',
    hostingTenure: '2 years hosting'
  },
  highlights: [
    {
      iconName: 'Flame',
      title: 'Outdoor entertainment',
      description: 'The pool and alfresco dining are great for summer trips.'
    },
    {
      iconName: 'Fan',
      title: 'Designed for staying cool',
      description: 'Beat the heat with the A/C and ceiling fan.'
    },
    {
      iconName: 'DoorOpen',
      title: 'Self check-in',
      description: 'You can check in with the building staff.'
    }
  ],
  sleepingSpaces: [
    {
      title: 'Bedroom',
      subtitle: '1 double bed',
      imageSrc: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Living room',
      subtitle: '1 sofa',
      imageSrc: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    }
  ],
  amenities: [
    { label: 'Kitchen', iconName: 'Utensils', available: true },
    { label: 'Wifi', iconName: 'Wifi', available: true },
    { label: 'Dedicated workspace', iconName: 'Laptop', available: true },
    { label: 'Free parking on premises', iconName: 'Car', available: true },
    { label: 'Pool', iconName: 'Waves', available: true },
    { label: 'Hot tub', iconName: 'Bath', available: true },
    { label: 'Pets allowed', iconName: 'PawPrint', available: true },
    { label: 'Exterior security cameras on property', iconName: 'Video', available: true },
    { label: 'Carbon monoxide alarm', iconName: 'BellOff', available: false },
    { label: 'Smoke alarm', iconName: 'BellOff', available: false }
  ]
};

export const INITIAL_LISTINGS: Listing[] = [
  CANDOLIM_LISTING,
  {
    id: 'listing-1',
    title: 'Oceanfront Sunset Luxury Villa',
    subtitle: 'Entire villa in Cancún, Mexico',
    description: 'Experience pure paradise in this architectural masterpiece perched right above the turquoise waters. Features a private infinity pool, direct beach access, floor-to-ceiling glass walls, and a dedicated personal chef on call.',
    imageSrc: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Beach',
    roomCount: 4,
    bathroomCount: 4,
    guestCount: 8,
    locationValue: 'MX',
    locationLabel: 'Cancún, Mexico',
    latlng: [21.1619, -86.8515],
    price: 450,
    currencySymbol: '$',
    rating: 4.96,
    reviewCount: 84,
    host: {
      name: 'Sofia Martinez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Joined March 2020'
    }
  },
  {
    id: 'listing-2',
    title: 'Authentic Historic Windmill Retreat',
    subtitle: 'Entire windmill in Zaandam, Netherlands',
    description: 'Stay in a lovingly restored 18th-century windmill nestled amidst vibrant tulip fields. Features 360-degree countryside panoramas, cozy fireplace, vintage timber beams, and bike rentals included.',
    imageSrc: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Windmills',
    roomCount: 2,
    bathroomCount: 2,
    guestCount: 4,
    locationValue: 'NL',
    locationLabel: 'Zaandam, Netherlands',
    latlng: [52.442, 4.8292],
    price: 280,
    currencySymbol: '$',
    rating: 4.89,
    reviewCount: 62,
    host: {
      name: 'Jan Van Dijk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      isSuperhost: true,
      joinedDate: 'Joined August 2018'
    }
  }
];
