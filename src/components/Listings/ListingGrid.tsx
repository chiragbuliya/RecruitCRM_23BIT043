import React from 'react';
import { useApp } from '../../context/AppContext';
import { ListingCard } from './ListingCard';
import { Sparkles, Heart, Calendar, Home as HomeIcon } from 'lucide-react';

export const ListingGrid: React.FC = () => {
  const {
    listings,
    activeCategory,
    searchFilter,
    activeTab,
    favorites,
    reservations,
    currentUser,
    cancelReservation,
    deleteListing,
    resetSearchFilter,
    setIsRentModalOpen
  } = useApp();

  // Filter listings for explore tab
  let filteredListings = listings;

  if (activeCategory) {
    filteredListings = filteredListings.filter(l => l.category.toLowerCase() === activeCategory.toLowerCase());
  }

  if (searchFilter.locationValue) {
    const loc = searchFilter.locationValue.toLowerCase();
    filteredListings = filteredListings.filter(
      l => l.locationLabel.toLowerCase().includes(loc) || l.locationValue.toLowerCase().includes(loc)
    );
  }

  if (searchFilter.guestCount) {
    filteredListings = filteredListings.filter(l => l.guestCount >= (searchFilter.guestCount || 1));
  }

  if (searchFilter.roomCount) {
    filteredListings = filteredListings.filter(l => l.roomCount >= (searchFilter.roomCount || 1));
  }

  if (searchFilter.bathroomCount) {
    filteredListings = filteredListings.filter(l => l.bathroomCount >= (searchFilter.bathroomCount || 1));
  }

  // Handle distinct tab views
  if (activeTab === 'favorites') {
    const favoriteListings = listings.filter(l => favorites.includes(l.id));

    if (favoriteListings.length === 0) {
      return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="p-4 bg-rose-50 rounded-full text-airbnb-primary mb-4">
            <Heart size={40} />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">No favorites saved yet</h2>
          <p className="text-neutral-500 mt-2 max-w-sm">
            Click the heart icon on any listing to save your favorite stays for later!
          </p>
        </div>
      );
    }

    return (
      <div className="pt-28 pb-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">My Favorites</h1>
          <p className="text-neutral-500 mt-1">Listings you have saved to your wishlist</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {favoriteListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'trips') {
    const myReservations = reservations.filter(r => r.userId === (currentUser?.id || 'guest'));

    if (myReservations.length === 0) {
      return (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="p-4 bg-rose-50 rounded-full text-airbnb-primary mb-4">
            <Calendar size={40} />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">No trips booked</h2>
          <p className="text-neutral-500 mt-2 max-w-sm">
            Looks like you haven't reserved any trips. Time to dust off your bags and start planning!
          </p>
        </div>
      );
    }

    return (
      <div className="pt-28 pb-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">My Trips</h1>
          <p className="text-neutral-500 mt-1">Where you've been and where you're going</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {myReservations.map(res => (
            <ListingCard
              key={res.id}
              listing={res.listing}
              actionLabel="Cancel Reservation"
              onAction={() => cancelReservation(res.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'reservations') {
    return (
      <div className="pt-28 pb-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Property Reservations</h1>
          <p className="text-neutral-500 mt-1">Bookings made by guests on your properties</p>
        </div>
        {reservations.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-semibold text-neutral-700">No reservations found on your properties</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map(res => (
              <ListingCard
                key={res.id}
                listing={res.listing}
                actionLabel="Cancel Guest Booking"
                onAction={() => cancelReservation(res.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'properties') {
    const myProperties = listings.filter(l => l.host.name === currentUser?.name);

    return (
      <div className="pt-28 pb-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
        <div className="flex flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">My Properties</h1>
            <p className="text-neutral-500 mt-1">Listings you manage on Airbnb</p>
          </div>
          <button
            onClick={() => setIsRentModalOpen(true)}
            className="px-5 py-2.5 bg-airbnb-primary hover:bg-rose-600 text-white font-semibold rounded-lg shadow transition cursor-pointer"
          >
            + Create New Listing
          </button>
        </div>

        {myProperties.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-neutral-100 rounded-full mb-3 text-neutral-500">
              <HomeIcon size={36} />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800">No properties listed yet</h3>
            <p className="text-neutral-500 mt-1">Click above to list your home on Airbnb!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {myProperties.map(property => (
              <ListingCard
                key={property.id}
                listing={property}
                actionLabel="Delete Property"
                onAction={() => deleteListing(property.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Default Explore view
  if (filteredListings.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="p-4 bg-rose-50 rounded-full text-airbnb-primary mb-4">
          <Sparkles size={40} />
        </div>
        <h2 className="text-2xl font-bold text-neutral-800">No exact matches found</h2>
        <p className="text-neutral-500 mt-2 max-w-sm">
          Try changing or clearing your search filters to explore available properties.
        </p>
        <button
          onClick={resetSearchFilter}
          className="mt-6 px-6 py-2.5 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-neutral-800 transition cursor-pointer"
        >
          Remove all filters
        </button>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-16 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {filteredListings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};
