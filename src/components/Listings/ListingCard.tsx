import React, { useState } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Listing } from '../../types';
import { useApp } from '../../context/AppContext';

interface ListingCardProps {
  listing: Listing;
  onAction?: () => void;
  actionLabel?: string;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onAction,
  actionLabel
}) => {
  const { favorites, toggleFavorite, setSelectedListing } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorited = favorites.includes(listing.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % listing.imageSrc.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? listing.imageSrc.length - 1 : prev - 1));
  };

  return (
    <div
      onClick={() => setSelectedListing(listing)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Image Container with Slider & Heart */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-neutral-200">
          <img
            src={listing.imageSrc[currentImageIndex] || listing.imageSrc[0]}
            alt={listing.title}
            className="object-cover h-full w-full group-hover:scale-105 transition duration-300"
          />

          {/* Heart Button */}
          <div
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 transition hover:opacity-85 cursor-pointer z-10"
          >
            <Heart
              size={24}
              className={`
                stroke-white stroke-[2] drop-shadow-md transition-all
                ${isFavorited ? 'fill-airbnb-primary stroke-airbnb-primary' : 'fill-neutral-500/50'}
              `}
            />
          </div>

          {/* Image Navigation Arrows */}
          {listing.imageSrc.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="opacity-0 group-hover:opacity-100 transition absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md z-10 text-neutral-800"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextImage}
                className="opacity-0 group-hover:opacity-100 transition absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md z-10 text-neutral-800"
              >
                <ChevronRight size={14} />
              </button>

              {/* Slider Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-row gap-1 z-10">
                {listing.imageSrc.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentImageIndex ? 'w-3 bg-white' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-row items-center justify-between mt-1">
          <div className="font-bold text-base text-neutral-900 truncate pr-2">
            {listing.locationLabel}
          </div>
          <div className="flex flex-row items-center gap-1 text-sm font-semibold text-neutral-800">
            <Star size={14} className="fill-neutral-900 text-neutral-900" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>

        <div className="font-normal text-neutral-500 text-sm truncate">
          {listing.category} · {listing.guestCount} guests
        </div>

        <div className="font-normal text-neutral-500 text-sm">
          Available now
        </div>

        <div className="flex flex-row items-center gap-1 mt-0.5">
          <span className="font-bold text-neutral-900 text-base">${listing.price}</span>
          <span className="font-normal text-neutral-600 text-sm">night</span>
        </div>

        {onAction && actionLabel && (
          <button
            onClick={e => {
              e.stopPropagation();
              onAction();
            }}
            className="mt-2 w-full py-2 bg-rose-50 hover:bg-rose-100 text-airbnb-primary font-semibold text-sm rounded-lg border border-rose-200 transition"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
