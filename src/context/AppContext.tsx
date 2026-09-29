import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Listing, Reservation, SearchFilter, ActiveTab } from '../types';
import { INITIAL_LISTINGS } from '../data/mockListings';

const DEMO_USER: User = {
  id: 'user-demo-123',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  favorites: ['listing-1', 'listing-5']
};

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  searchFilter: SearchFilter;
  setSearchFilter: (filter: SearchFilter) => void;
  resetSearchFilter: () => void;
  listings: Listing[];
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  reservations: Reservation[];
  createReservation: (listingId: string, startDate: string, endDate: string, totalPrice: number) => void;
  cancelReservation: (id: string) => void;
  createListing: (newListing: Omit<Listing, 'id' | 'rating' | 'reviewCount' | 'host'>) => void;
  deleteListing: (id: string) => void;
  // Modal states
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (open: boolean) => void;
  isRentModalOpen: boolean;
  setIsRentModalOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('airbnb_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchFilter, setSearchFilterState] = useState<SearchFilter>({});

  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('airbnb_listings');
    return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('airbnb_favorites');
    return saved ? JSON.parse(saved) : ['listing-1', 'listing-5'];
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('airbnb_reservations');
    if (saved) return JSON.parse(saved);
    // Initial sample reservation
    return [
      {
        id: 'res-sample-1',
        userId: DEMO_USER.id,
        listingId: 'listing-1',
        startDate: '2026-09-10',
        endDate: '2026-09-15',
        totalPrice: 2250,
        createdAt: new Date().toISOString(),
        listing: INITIAL_LISTINGS[0]
      }
    ];
  });

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('airbnb_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('airbnb_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('airbnb_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('airbnb_reservations', JSON.stringify(reservations));
  }, [reservations]);

  const toggleFavorite = (listingId: string) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    setFavorites(prev => {
      if (prev.includes(listingId)) {
        return prev.filter(id => id !== listingId);
      } else {
        return [...prev, listingId];
      }
    });
  };

  const createReservation = (listingId: string, startDate: string, endDate: string, totalPrice: number) => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      listingId,
      startDate,
      endDate,
      totalPrice,
      createdAt: new Date().toISOString(),
      listing
    };

    setReservations(prev => [newRes, ...prev]);
  };

  const cancelReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  const createListing = (newListingData: Omit<Listing, 'id' | 'rating' | 'reviewCount' | 'host'>) => {
    const newListing: Listing = {
      ...newListingData,
      id: `listing-custom-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      host: {
        name: currentUser?.name || 'Alex Johnson',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        isSuperhost: true,
        joinedDate: 'Joined Recently'
      }
    };

    setListings(prev => [newListing, ...prev]);
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(l => l.id !== id));
    setReservations(prev => prev.filter(r => r.listingId !== id));
  };

  const setSearchFilter = (filter: SearchFilter) => {
    setSearchFilterState(filter);
  };

  const resetSearchFilter = () => {
    setSearchFilterState({});
    setActiveCategory(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeTab,
        setActiveTab,
        activeCategory,
        setActiveCategory,
        searchFilter,
        setSearchFilter,
        resetSearchFilter,
        listings,
        favorites,
        toggleFavorite,
        reservations,
        createReservation,
        cancelReservation,
        createListing,
        deleteListing,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isRegisterModalOpen,
        setIsRegisterModalOpen,
        isRentModalOpen,
        setIsRentModalOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        selectedListing,
        setSelectedListing
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
