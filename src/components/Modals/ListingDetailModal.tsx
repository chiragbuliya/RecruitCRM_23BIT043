import React, { useState } from 'react';
import { X, Heart, Star, ShieldCheck, DoorOpen, CheckCircle2, UserCheck, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Map } from '../Map/Map';

export const ListingDetailModal: React.FC = () => {
  const {
    selectedListing,
    setSelectedListing,
    favorites,
    toggleFavorite,
    createReservation,
    currentUser,
    setIsLoginModalOpen,
    setActiveTab
  } = useApp();

  const [startDate, setStartDate] = useState('2026-09-10');
  const [endDate, setEndDate] = useState('2026-09-15');
  const [guestCount, setGuestCount] = useState(2);
  const [isReserved, setIsReserved] = useState(false);

  if (!selectedListing) return null;

  const isFavorited = favorites.includes(selectedListing.id);

  // Calculate nights count
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(1000 * 60 * 60 * 24, end.getTime() - start.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const totalPrice = nights * selectedListing.price;

  const handleReserve = () => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }

    createReservation(selectedListing.id, startDate, endDate, totalPrice);
    setIsReserved(true);

    setTimeout(() => {
      setIsReserved(false);
      setSelectedListing(null);
      setActiveTab('trips');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl relative animate-modal-up">
        {/* Header */}
        <div className="sticky top-0 bg-white z-20 border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedListing(null)}
              className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-neutral-900 truncate max-w-[400px]">
              {selectedListing.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleFavorite(selectedListing.id)}
              className="flex items-center gap-1.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 px-3 py-1.5 rounded-full transition cursor-pointer"
            >
              <Heart
                size={18}
                className={isFavorited ? 'fill-airbnb-primary stroke-airbnb-primary' : 'stroke-neutral-700'}
              />
              <span>{isFavorited ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {/* Title & Location Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900">{selectedListing.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-neutral-700 mt-2">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-neutral-900 text-neutral-900" />
                <span>{selectedListing.rating.toFixed(2)}</span>
                <span className="text-neutral-500">({selectedListing.reviewCount} reviews)</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1 underline cursor-pointer">
                <MapPin size={16} />
                <span>{selectedListing.locationLabel}</span>
              </div>
              <span>·</span>
              <span className="text-airbnb-primary bg-rose-50 px-2.5 py-0.5 rounded-full font-bold">
                {selectedListing.category}
              </span>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden mb-8 max-h-[420px]">
            <div className="md:col-span-2 h-[260px] md:h-[420px]">
              <img
                src={selectedListing.imageSrc[0]}
                alt={selectedListing.title}
                className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
              />
            </div>
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-[420px]">
              {selectedListing.imageSrc.slice(1, 5).map((img, i) => (
                <img
                  key={i}
                  src={img || selectedListing.imageSrc[0]}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Grid Layout for Content & Booking Sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Left Content Column */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {/* Host Info */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    Hosted by {selectedListing.host.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    {selectedListing.guestCount} guests · {selectedListing.roomCount} bedrooms · {selectedListing.bathroomCount} baths
                  </p>
                </div>
                <img
                  src={selectedListing.host.avatar}
                  alt={selectedListing.host.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-rose-200 shadow-sm"
                />
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-4 pb-6 border-b border-neutral-200">
                <div className="flex items-start gap-4">
                  <UserCheck size={24} className="text-neutral-800 mt-1" />
                  <div>
                    <h4 className="font-bold text-neutral-900 text-base">{selectedListing.host.name} is a Superhost</h4>
                    <p className="text-sm text-neutral-500">Superhosts are experienced, highly rated hosts who are committed to providing great stays.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <DoorOpen size={24} className="text-neutral-800 mt-1" />
                  <div>
                    <h4 className="font-bold text-neutral-900 text-base">Self check-in</h4>
                    <p className="text-sm text-neutral-500">Check yourself in with the smart lock keypad.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ShieldCheck size={24} className="text-neutral-800 mt-1" />
                  <div>
                    <h4 className="font-bold text-neutral-900 text-base">Free cancellation for 48 hours</h4>
                    <p className="text-sm text-neutral-500">Get a full refund if you change your plans before check-in.</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pb-6 border-b border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">About this space</h3>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line text-base">
                  {selectedListing.description}
                </p>
              </div>

              {/* Map Section */}
              <div className="pb-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Where you'll be</h3>
                <p className="text-neutral-600 text-sm mb-4">{selectedListing.locationLabel}</p>
                <Map center={selectedListing.latlng} zoom={12} label={selectedListing.title} />
              </div>
            </div>

            {/* Right Booking Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-24 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xl flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold text-neutral-900">${selectedListing.price}</span>
                    <span className="text-neutral-500 font-normal text-sm"> / night</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star size={14} className="fill-neutral-900 text-neutral-900" />
                    <span>{selectedListing.rating.toFixed(2)}</span>
                  </div>
                </div>

                {/* Date Selection Box */}
                <div className="border border-neutral-300 rounded-xl overflow-hidden mt-2">
                  <div className="grid grid-cols-2 border-b border-neutral-300">
                    <div className="p-3 border-r border-neutral-300">
                      <label className="block text-[10px] font-extrabold uppercase text-neutral-700">Check-in</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="w-full text-xs font-semibold text-neutral-800 outline-none bg-transparent"
                      />
                    </div>
                    <div className="p-3">
                      <label className="block text-[10px] font-extrabold uppercase text-neutral-700">Checkout</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="w-full text-xs font-semibold text-neutral-800 outline-none bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-extrabold uppercase text-neutral-700">Guests</label>
                    <select
                      value={guestCount}
                      onChange={e => setGuestCount(Number(e.target.value))}
                      className="w-full text-sm font-semibold text-neutral-800 outline-none bg-transparent cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(g => (
                        <option key={g} value={g}>{g} guest{g > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reservation Action Button */}
                <button
                  onClick={handleReserve}
                  disabled={isReserved}
                  className={`
                    w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center gap-2 cursor-pointer
                    ${isReserved ? 'bg-emerald-600' : 'bg-airbnb-primary hover:bg-rose-600'}
                  `}
                >
                  {isReserved ? (
                    <>
                      <CheckCircle2 size={20} />
                      <span>Reserved Successfully!</span>
                    </>
                  ) : (
                    <span>Reserve Stay</span>
                  )}
                </button>

                <p className="text-center text-xs text-neutral-500 font-medium">You won't be charged yet</p>

                {/* Price Calculation Summary */}
                <div className="flex flex-col gap-2 pt-4 border-t border-neutral-100 text-sm text-neutral-700 font-medium">
                  <div className="flex justify-between">
                    <span className="underline">${selectedListing.price} x {nights} night{nights > 1 ? 's' : ''}</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>$85</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="underline">Airbnb service fee</span>
                    <span>$60</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-neutral-200 text-base font-bold text-neutral-900">
                  <span>Total before taxes</span>
                  <span>${totalPrice + 85 + 60}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
