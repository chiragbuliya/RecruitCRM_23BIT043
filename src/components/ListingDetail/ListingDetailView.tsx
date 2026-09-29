import React, { useState, useEffect } from 'react';
import {
  Share,
  Heart,
  Star,
  Grid,
  Flame,
  Fan,
  DoorOpen,
  Utensils,
  Wifi,
  Laptop,
  Car,
  Waves,
  Bath,
  PawPrint,
  Video,
  BellOff,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Tag,
  Flag,
  Keyboard,
  CheckCircle2,
  Key,
  MessageSquare,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Shield,
  CalendarX,
  Check
} from 'lucide-react';
import { CANDOLIM_LISTING } from '../../data/mockListings';
import { useApp } from '../../context/AppContext';
import { Map } from '../Map/Map';
import { PhotoTour } from './PhotoTour';
import { AmenitiesModal } from './AmenitiesModal';

export const ListingDetailView: React.FC = () => {
  const { favorites, toggleFavorite } = useApp();
  const listing = CANDOLIM_LISTING;
  const isFavorited = favorites.includes(listing.id);

  const [activeTab, setActiveTab] = useState<'photos' | 'amenities' | 'reviews' | 'location'>('photos');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPhotoTour, setShowPhotoTour] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [nearbyPage, setNearbyPage] = useState<1 | 2>(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Handle scroll to show sticky sub-header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReserve = () => {
    setToastMessage("You won't be charged yet");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const scrollToSection = (id: string, tab: 'photos' | 'amenities' | 'reviews' | 'location') => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <div className="pt-6 pb-20 max-w-[1280px] mx-auto px-6 md:px-12 xl:px-20 font-sans bg-white text-neutral-900">
      {/* 1. Sticky Secondary Sub-Header Bar on Scroll (Fixed top-0 at z-40 when main navbar scrolls away) */}
      <div
        className={`
          fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 py-3 px-4 md:px-12 transition-all duration-300 shadow-xs
          ${showStickyHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Left Navigation Tabs */}
          <div className="flex items-center gap-6 text-sm font-semibold text-neutral-800">
            <button
              onClick={() => scrollToSection('photos-section', 'photos')}
              className={`py-2 border-b-2 transition cursor-pointer ${activeTab === 'photos' ? 'border-neutral-900 text-neutral-900 font-bold' : 'border-transparent text-neutral-600 hover:text-neutral-900'}`}
            >
              Photos
            </button>
            <button
              onClick={() => scrollToSection('amenities-section', 'amenities')}
              className={`py-2 border-b-2 transition cursor-pointer ${activeTab === 'amenities' ? 'border-neutral-900 text-neutral-900 font-bold' : 'border-transparent text-neutral-600 hover:text-neutral-900'}`}
            >
              Amenities
            </button>
            <button
              onClick={() => scrollToSection('reviews-section', 'reviews')}
              className={`py-2 border-b-2 transition cursor-pointer ${activeTab === 'reviews' ? 'border-neutral-900 text-neutral-900 font-bold' : 'border-transparent text-neutral-600 hover:text-neutral-900'}`}
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('location-section', 'location')}
              className={`py-2 border-b-2 transition cursor-pointer ${activeTab === 'location' ? 'border-neutral-900 text-neutral-900 font-bold' : 'border-transparent text-neutral-600 hover:text-neutral-900'}`}
            >
              Location
            </button>
          </div>

          {/* Right Sub-Header Booking Info */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-base font-bold text-neutral-900">
                ₹28,499 <span className="text-xs font-normal text-neutral-600">for 5 nights</span>
              </div>
              <div className="text-xs font-semibold text-neutral-700 flex items-center justify-end gap-1">
                <Star size={12} className="fill-neutral-900 text-neutral-900" />
                <span>4.95 · 19 reviews</span>
              </div>
            </div>
            <button
              onClick={handleReserve}
              className="px-6 py-2.5 bg-[#E00B41] hover:bg-[#D70466] text-white font-bold text-sm rounded-lg shadow-md transition cursor-pointer"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Header Title & Actions */}
      <div id="photos-section" className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <h1 className="text-2xl md:text-[26px] font-semibold text-neutral-900 tracking-tight leading-tight">
          {listing.title}
        </h1>
        <div className="flex items-center gap-4 text-sm font-semibold underline text-neutral-900">
          <button
            onClick={() => {
              setToastMessage('Share options');
              setTimeout(() => setToastMessage(null), 3000);
            }}
            className="flex items-center gap-1.5 hover:bg-neutral-100 px-2 py-1 rounded-md transition cursor-pointer"
          >
            <Share size={15} />
            <span>Share</span>
          </button>
          <button
            onClick={() => {
              const willBeFavorited = !isFavorited;
              toggleFavorite(listing.id);
              setToastMessage(willBeFavorited ? 'Saved to wishlist' : 'Removed from wishlist');
              setTimeout(() => setToastMessage(null), 3000);
            }}
            className="flex items-center gap-1.5 hover:bg-neutral-100 px-2 py-1 rounded-md transition cursor-pointer"
          >
            <Heart
              size={15}
              className={isFavorited ? 'fill-[#FF385C] stroke-[#FF385C]' : 'stroke-neutral-900'}
            />
            <span className={isFavorited ? 'text-[#FF385C]' : ''}>{isFavorited ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* 3. 5-Photo Gallery Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-1.5 rounded-xl overflow-hidden mb-8">
        {/* Large left image */}
        <div onClick={() => setShowPhotoTour(true)} className="md:col-span-2 md:row-span-2 overflow-hidden cursor-pointer">
          <img
            src={listing.imageSrc[0]}
            alt="Main Patio Lounge"
            className="w-full h-full object-cover hover:opacity-95 transition"
          />
        </div>
        {/* Top middle image */}
        <div onClick={() => setShowPhotoTour(true)} className="hidden md:block overflow-hidden cursor-pointer">
          <img
            src={listing.imageSrc[1]}
            alt="Patio seating"
            className="w-full h-full object-cover hover:opacity-95 transition aspect-square"
          />
        </div>
        {/* Top right image */}
        <div onClick={() => setShowPhotoTour(true)} className="hidden md:block overflow-hidden cursor-pointer">
          <img
            src={listing.imageSrc[2]}
            alt="Jacuzzi tub"
            className="w-full h-full object-cover hover:opacity-95 transition aspect-square"
          />
        </div>
        {/* Bottom middle image */}
        <div onClick={() => setShowPhotoTour(true)} className="hidden md:block overflow-hidden cursor-pointer">
          <img
            src={listing.imageSrc[3]}
            alt="Bedroom"
            className="w-full h-full object-cover hover:opacity-95 transition aspect-square"
          />
        </div>
        {/* Bottom right image */}
        <div className="hidden md:block relative overflow-hidden cursor-pointer">
          <img
            onClick={() => setShowPhotoTour(true)}
            src={listing.imageSrc[4]}
            alt="Building exterior"
            className="w-full h-full object-cover hover:opacity-95 transition aspect-square"
          />
          {/* Overlay Button */}
          <button
            onClick={() => setShowPhotoTour(true)}
            className="absolute bottom-4 right-4 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-900 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <Grid size={14} />
            <span>Show all photos</span>
          </button>
        </div>
      </div>

      {/* 4. MAIN STICKY GRID CONTAINER (60 : 40 Ratio) */}
      {/* Starts at "Entire serviced apartment..." and ENDS at bottom of "5 nights in Candolim" */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 xl:gap-12 relative">
        {/* Left Main Content Column (60%) */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Sub-header Title & Specs */}
          <div className="pb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">
              {listing.subtitle}
            </h2>
            <p className="text-sm text-neutral-700 mt-1">
              3 guests · 1 bedroom · 1 bed · 1 bathroom
            </p>
          </div>

          {/* Guest Favourite Badge Box */}
          <div className="my-3 py-4 px-6 md:px-7 border border-neutral-300 rounded-2xl flex items-center justify-between gap-4 bg-white shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-neutral-900">
                <svg width="18" height="28" viewBox="0 0 24 36" fill="none" className="text-neutral-900">
                  <path d="M18 4C15 7 11 11 10 17C9 23 10 28 14 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 6C11 5 7 7 6 10C9 11 13 10 14 6Z" fill="currentColor"/>
                  <path d="M11 13C7 13 4 16 3 19C7 19 10 17 11 13Z" fill="currentColor"/>
                  <path d="M10 21C6 22 4 26 4 30C8 29 11 26 10 21Z" fill="currentColor"/>
                </svg>
                <span className="font-semibold text-sm md:text-base leading-tight max-w-[80px] text-neutral-900 text-center px-1">
                  Guest favourite
                </span>
                <svg width="18" height="28" viewBox="0 0 24 36" fill="none" className="text-neutral-900 -scale-x-100">
                  <path d="M18 4C15 7 11 11 10 17C9 23 10 28 14 33" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 6C11 5 7 7 6 10C9 11 13 10 14 6Z" fill="currentColor"/>
                  <path d="M11 13C7 13 4 16 3 19C7 19 10 17 11 13Z" fill="currentColor"/>
                  <path d="M10 21C6 22 4 26 4 30C8 29 11 26 10 21Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-xs md:text-sm text-neutral-800 font-normal max-w-[240px] pl-3 border-l border-neutral-200">
                One of the most loved homes on Airbnb, according to guests
              </div>
            </div>

            <div className="flex items-center gap-6 text-center">
              <div>
                <div className="text-lg md:text-xl font-semibold text-neutral-900">4.95</div>
                <div className="flex items-center gap-0.5 text-[10px] text-neutral-900 justify-center">
                  {'★★★★★'}
                </div>
              </div>
              <div className="border-l border-neutral-200 pl-6">
                <div className="text-lg md:text-xl font-semibold text-neutral-900">19</div>
                <div className="text-xs font-semibold text-neutral-800 underline">Reviews</div>
              </div>
            </div>
          </div>

          {/* Host Info */}
          <div className="pt-2 pb-6 border-b border-neutral-200 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#113C34] text-white flex items-center justify-center font-bold text-xs tracking-tighter shadow-sm border border-emerald-900">
              MIRASHYA
            </div>
            <div>
              <h3 className="font-semibold text-base text-neutral-900">Hosted by Mirashya Homes</h3>
              <p className="text-xs text-neutral-500 font-medium">2 years hosting</p>
            </div>
          </div>

          {/* Highlights List */}
          <div className="py-8 border-b border-neutral-200 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <Flame size={24} className="text-neutral-800 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm text-neutral-900">Outdoor entertainment</h4>
                <p className="text-xs text-neutral-500 mt-0.5">The pool and alfresco dining are great for summer trips.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Fan size={24} className="text-neutral-800 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm text-neutral-900">Designed for staying cool</h4>
                <p className="text-xs text-neutral-500 mt-0.5">Beat the heat with the A/C and ceiling fan.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <DoorOpen size={24} className="text-neutral-800 mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm text-neutral-900">Self check-in</h4>
                <p className="text-xs text-neutral-500 mt-0.5">You can check in with the building staff.</p>
              </div>
            </div>
          </div>

          {/* Translation Notice Banner */}
          <div className="my-8 p-4 bg-neutral-100/70 rounded-xl text-xs md:text-sm text-neutral-700">
            Some info has been automatically translated.{' '}
            <button className="font-semibold underline text-neutral-900 cursor-pointer">Show original</button>
          </div>

          {/* Description & Show More / Show Less */}
          <div className="pb-10 border-b border-neutral-200">
            <div className="text-neutral-800 text-sm md:text-base leading-relaxed">
              <p>
                🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors.{' '}
                {!showFullDescription && (
                  <span>
                    Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s...
                  </span>
                )}
              </p>
              {showFullDescription && (
                <div className="mt-3 flex flex-col gap-3">
                  <p>
                    Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s the perfect luxury retreat in North Goa. Whether you want to relax by the pool, soak in the jacuzzi, or explore the lively Goan coastline, our home is fully equipped to make your vacation unforgettable.
                  </p>
                  <p>
                    Book your memorable getaway today and experience Goa with comfort, elegance, and warm hospitality!
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-4 font-bold text-base underline flex items-center gap-1 text-neutral-900 hover:opacity-80 cursor-pointer"
            >
              <span>{showFullDescription ? 'Show less' : 'Show more'}</span>
              {showFullDescription ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>

          {/* "Where you'll sleep" Section */}
          <div className="py-10 border-b border-neutral-200">
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-6">Where you'll sleep</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Bedroom Card */}
              <div className="flex flex-col gap-3">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-200 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
                    alt="Bedroom"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base text-neutral-900">Bedroom</h4>
                  <p className="text-xs text-neutral-500">1 double bed</p>
                </div>
              </div>

              {/* Living Room Card */}
              <div className="flex flex-col gap-3">
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-neutral-200 shadow-xs">
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
                    alt="Living room"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base text-neutral-900">Living room</h4>
                  <p className="text-xs text-neutral-500">1 sofa</p>
                </div>
              </div>
            </div>
          </div>

          {/* "What this place offers" Section (Amenities) */}
          <div id="amenities-section" className="py-10 border-b border-neutral-200">
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-6">What this place offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-neutral-800 text-sm">
              <div className="flex items-center gap-4">
                <Utensils size={20} className="text-neutral-800" />
                <span>Kitchen</span>
              </div>
              <div className="flex items-center gap-4">
                <Wifi size={20} className="text-neutral-800" />
                <span>Wifi</span>
              </div>
              <div className="flex items-center gap-4">
                <Laptop size={20} className="text-neutral-800" />
                <span>Dedicated workspace</span>
              </div>
              <div className="flex items-center gap-4">
                <Car size={20} className="text-neutral-800" />
                <span>Free parking on premises</span>
              </div>
              <div className="flex items-center gap-4">
                <Waves size={20} className="text-neutral-800" />
                <span>Pool</span>
              </div>
              <div className="flex items-center gap-4">
                <Bath size={20} className="text-neutral-800" />
                <span>Hot tub</span>
              </div>
              <div className="flex items-center gap-4">
                <PawPrint size={20} className="text-neutral-800" />
                <span>Pets allowed</span>
              </div>
              <div className="flex items-center gap-4">
                <Video size={20} className="text-neutral-800" />
                <span>Exterior security cameras on property</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-400 line-through">
                <BellOff size={20} />
                <span>Carbon monoxide alarm</span>
              </div>
              <div className="flex items-center gap-4 text-neutral-400 line-through">
                <BellOff size={20} />
                <span>Smoke alarm</span>
              </div>
            </div>

            <button
              onClick={() => setShowAmenitiesModal(true)}
              className="mt-8 px-6 py-3 border border-neutral-900 hover:bg-neutral-100 rounded-xl font-bold text-sm transition cursor-pointer text-neutral-900"
            >
              Show all 50 amenities
            </button>
          </div>

          {/* "5 nights in Candolim" Calendar Section */}
          <div className="py-10">
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-900">5 nights in Candolim</h3>
            <p className="text-sm text-neutral-500 mt-1 mb-6">18 Oct 2026 - 23 Oct 2026</p>

            {/* Borderless 2-Month Side-by-Side Calendar View */}
            <div className="bg-white max-w-[580px]">
              {/* Month Navigation Headers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
                {/* October Header */}
                <div className="flex items-center justify-between">
                  <button className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer text-neutral-800">
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-semibold text-base text-neutral-900 flex-1 text-center pr-6">
                    October 2026
                  </span>
                </div>

                {/* November Header */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base text-neutral-900 flex-1 text-center pl-6">
                    November 2026
                  </span>
                  <button className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer text-neutral-800">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* 2 Month Side-by-Side Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* October 2026 Grid */}
                <div>
                  <div className="grid grid-cols-7 text-center text-xs text-neutral-700 font-normal mb-3">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-medium text-neutral-900">
                    {/* 1 - 3 */}
                    <span className="col-start-5 h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">1</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">2</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">3</span>

                    {/* 4 - 10 */}
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">4</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">5</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">6</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">7</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">8</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">9</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">10</span>

                    {/* 11 - 17 */}
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">11</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">12</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">13</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">14</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">15</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">16</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">17</span>

                    {/* 18 - 23 (Selected range with strip) */}
                    <div className="h-9 flex items-center justify-center relative bg-gradient-to-r from-transparent to-neutral-100">
                      <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">18</div>
                    </div>
                    <div className="h-9 flex items-center justify-center bg-neutral-100 text-neutral-900 font-medium text-sm">19</div>
                    <div className="h-9 flex items-center justify-center bg-neutral-100 text-neutral-900 font-medium text-sm">20</div>
                    <div className="h-9 flex items-center justify-center bg-neutral-100 text-neutral-900 font-medium text-sm">21</div>
                    <div className="h-9 flex items-center justify-center bg-neutral-100 text-neutral-900 font-medium text-sm">22</div>
                    <div className="h-9 flex items-center justify-center relative bg-gradient-to-l from-transparent to-neutral-100">
                      <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">23</div>
                    </div>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">24</span>

                    {/* 25 - 31 */}
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">25</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">26</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">27</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">28</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">29</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">30</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full">31</span>
                  </div>
                </div>

                {/* November 2026 Grid */}
                <div>
                  <div className="grid grid-cols-7 text-center text-xs text-neutral-700 font-normal mb-3">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>
                  <div className="grid grid-cols-7 gap-y-1 text-center text-sm font-medium">
                    {/* 1 - 7 */}
                    <span className="col-start-1 h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">1</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">2</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">3</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">4</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">5</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">6</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">7</span>

                    {/* 8 - 14 */}
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">8</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">9</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">10</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">11</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">12</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">13</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">14</span>

                    {/* 15 - 21 */}
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">15</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">16</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">17</span>
                    <span className="h-9 flex items-center justify-center text-neutral-300">18</span>
                    <span className="h-9 flex items-center justify-center text-neutral-300">19</span>
                    <span className="h-9 flex items-center justify-center text-neutral-300">20</span>
                    <span className="h-9 flex items-center justify-center text-neutral-300">21</span>

                    {/* 22 - 28 */}
                    <span className="h-9 flex items-center justify-center text-neutral-300">22</span>
                    <span className="h-9 flex items-center justify-center text-neutral-300">23</span>
                    <span className="h-9 flex items-center justify-center text-neutral-300">24</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">25</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">26</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">27</span>
                    <span className="h-9 flex items-center justify-center cursor-pointer hover:bg-neutral-100 rounded-full text-neutral-900">28</span>

                    {/* 29 - 30 */}
                    <span className="h-9 flex items-center justify-center text-neutral-300">29</span>
                    <span className="h-9 flex items-center justify-center text-neutral-300">30</span>
                  </div>
                </div>
              </div>

              {/* Bottom Keyboard Icon and Clear Dates */}
              <div className="flex items-center justify-between pt-6 mt-2">
                <button className="p-2 border border-neutral-400/80 rounded-lg hover:bg-neutral-100 transition cursor-pointer text-neutral-800">
                  <Keyboard size={18} />
                </button>
                <button className="text-sm font-semibold underline text-neutral-900 hover:text-neutral-700 transition cursor-pointer">
                  Clear dates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Widget Box (40%) */}
        {/* Top offset sits at 24px (top of page) or 72px (when scrolled past 350px under sub-header bar) */}
        <div className="lg:col-span-4">
          <div
            style={{
              position: 'sticky',
              top: showStickyHeader ? '72px' : '24px'
            }}
            className="flex flex-col gap-4 z-30 transition-all duration-200 max-w-[360px] ml-auto"
          >
            {/* Top Discount Tag Card */}
            <div className="p-3.5 bg-white border border-neutral-200 rounded-2xl shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Tag size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-neutral-900">Get 10% off your next stay.</div>
                  <button className="text-[11px] font-bold underline text-neutral-800 hover:text-neutral-900 cursor-pointer">
                    Terms apply
                  </button>
                </div>
              </div>
              <button className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 font-bold text-xs rounded-lg text-neutral-900 transition cursor-pointer">
                Claim
              </button>
            </div>

            {/* Main Booking Card Box */}
            <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-xl flex flex-col gap-4">
              {/* Header Price */}
              <div>
                <span className="text-xl font-bold text-neutral-900 border-b-2 border-neutral-900 pb-0.5">
                  ₹28,499
                </span>
                <span className="text-xs font-normal text-neutral-600 ml-1.5">for 5 nights</span>
              </div>

              {/* Date & Guest Picker Box */}
              <div className="border border-neutral-300 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 border-b border-neutral-300">
                  <div className="p-2.5 border-r border-neutral-300">
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-neutral-800">
                      CHECK-IN
                    </label>
                    <input
                      type="text"
                      value="10/18/2026"
                      readOnly
                      className="w-full text-xs font-semibold text-neutral-900 bg-transparent outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                  <div className="p-2.5">
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-neutral-800">
                      CHECKOUT
                    </label>
                    <input
                      type="text"
                      value="10/23/2026"
                      readOnly
                      className="w-full text-xs font-semibold text-neutral-900 bg-transparent outline-none cursor-pointer mt-0.5"
                    />
                  </div>
                </div>

                <div className="p-2.5 flex items-center justify-between cursor-pointer hover:bg-neutral-50 transition">
                  <div>
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-neutral-800">
                      GUESTS
                    </label>
                    <span className="text-xs font-semibold text-neutral-900 block mt-0.5">2 guests</span>
                  </div>
                  <ChevronDown size={16} className="text-neutral-800" />
                </div>
              </div>

              {/* Free Cancellation Banner */}
              <div className="py-2.5 px-3 bg-neutral-100/90 rounded-xl text-center text-xs font-medium text-neutral-800">
                Free cancellation before <span className="font-bold text-neutral-900">17 October</span>
              </div>

              {/* Reserve Button */}
              <button
                onClick={handleReserve}
                className="w-full py-3 rounded-xl font-bold text-white shadow-md transition text-base cursor-pointer bg-[#E00B41] hover:bg-[#D70466]"
              >
                Reserve
              </button>

              <p className="text-center text-xs text-neutral-500 font-medium">
                You won't be charged yet
              </p>
            </div>

            {/* Bottom Report Link */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 mt-1">
              <Flag size={14} />
              <button className="underline cursor-pointer">Report this listing</button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SECTIONS BELOW '5 NIGHTS IN CANDOLIM' (Outside sticky grid - Full width) */}
      <div id="reviews-section" className="pt-12 border-t border-neutral-200 mt-12">
        {/* Large Guest Favourite Laurel Header */}
        <div className="flex flex-col items-center justify-center text-center my-6">
          <div className="flex items-center gap-6 mb-2">
            <svg width="48" height="72" viewBox="0 0 36 60" fill="none" className="text-neutral-800">
              <path d="M28 6C24 10 18 16 16 26C14 36 16 46 22 54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M22 10C17 9 11 12 9 17C14 18 20 16 22 10Z" fill="currentColor"/>
              <path d="M17 21C11 21 6 25 5 31C10 31 16 28 17 21Z" fill="currentColor"/>
              <path d="M16 34C10 36 6 42 7 48C12 47 17 42 16 34Z" fill="currentColor"/>
              <path d="M19 46C15 50 13 56 16 60C20 57 22 51 19 46Z" fill="currentColor"/>
              <path d="M28 5C26 1 20 0 16 2C17 6 22 8 28 5Z" fill="currentColor"/>
            </svg>
            <span className="text-6xl md:text-7xl font-extrabold text-neutral-900 tracking-tight">4.95</span>
            <svg width="48" height="72" viewBox="0 0 36 60" fill="none" className="text-neutral-800 -scale-x-100">
              <path d="M28 6C24 10 18 16 16 26C14 36 16 46 22 54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M22 10C17 9 11 12 9 17C14 18 20 16 22 10Z" fill="currentColor"/>
              <path d="M17 21C11 21 6 25 5 31C10 31 16 28 17 21Z" fill="currentColor"/>
              <path d="M16 34C10 36 6 42 7 48C12 47 17 42 16 34Z" fill="currentColor"/>
              <path d="M19 46C15 50 13 56 16 60C20 57 22 51 19 46Z" fill="currentColor"/>
              <path d="M28 5C26 1 20 0 16 2C17 6 22 8 28 5Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mt-2">Guest favourite</h3>
          <p className="text-sm text-neutral-600 mt-1 max-w-md">
            This home is a guest favourite based on ratings, reviews and reliability
          </p>
          <button className="text-xs font-semibold underline text-neutral-900 mt-2 hover:text-neutral-700 cursor-pointer">
            How reviews work
          </button>
        </div>

        {/* Rating Breakdown 7-Column Section (Larger & Centered) */}
        <div className="max-w-6xl mx-auto py-10 border-b border-neutral-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4 md:gap-0">
            {/* 1. Overall rating */}
            <div className="flex flex-col justify-between md:border-r md:border-neutral-200 md:pr-6 pb-4 md:pb-0">
              <span className="font-semibold text-sm text-neutral-900 mb-3">Overall rating</span>
              <div className="flex flex-col gap-2 w-full max-w-[130px]">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 text-xs text-neutral-800 font-medium">
                    <span className="w-2">{rating}</span>
                    <div className="h-1 bg-neutral-200 rounded-full flex-1 overflow-hidden">
                      <div
                        className={`h-full bg-neutral-900 ${
                          rating === 5 ? 'w-[95%]' : rating === 4 ? 'w-[5%]' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Cleanliness */}
            <div className="flex flex-col justify-between md:border-r md:border-neutral-200 md:px-6 pb-4 md:pb-0">
              <span className="font-semibold text-sm text-neutral-900">Cleanliness</span>
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-lg font-bold text-neutral-900 block">5.0</span>
                <Sparkles size={28} className="text-neutral-800 stroke-[1.5]" />
              </div>
            </div>

            {/* 3. Accuracy */}
            <div className="flex flex-col justify-between md:border-r md:border-neutral-200 md:px-6 pb-4 md:pb-0">
              <span className="font-semibold text-sm text-neutral-900">Accuracy</span>
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-lg font-bold text-neutral-900 block">5.0</span>
                <CheckCircle2 size={28} className="text-neutral-800 stroke-[1.5]" />
              </div>
            </div>

            {/* 4. Check-in */}
            <div className="flex flex-col justify-between md:border-r md:border-neutral-200 md:px-6 pb-4 md:pb-0">
              <span className="font-semibold text-sm text-neutral-900">Check-in</span>
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-lg font-bold text-neutral-900 block">5.0</span>
                <Key size={28} className="text-neutral-800 stroke-[1.5]" />
              </div>
            </div>

            {/* 5. Communication */}
            <div className="flex flex-col justify-between md:border-r md:border-neutral-200 md:px-6 pb-4 md:pb-0">
              <span className="font-semibold text-sm text-neutral-900">Communication</span>
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-lg font-bold text-neutral-900 block">5.0</span>
                <MessageSquare size={28} className="text-neutral-800 stroke-[1.5]" />
              </div>
            </div>

            {/* 6. Location */}
            <div className="flex flex-col justify-between md:border-r md:border-neutral-200 md:px-6 pb-4 md:pb-0">
              <span className="font-semibold text-sm text-neutral-900">Location</span>
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-lg font-bold text-neutral-900 block">4.8</span>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-800">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
              </div>
            </div>

            {/* 7. Value */}
            <div className="flex flex-col justify-between md:pl-6">
              <span className="font-semibold text-sm text-neutral-900">Value</span>
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-lg font-bold text-neutral-900 block">4.8</span>
                <Tag size={28} className="text-neutral-800 stroke-[1.5]" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Feature Pills (Horizontally Scrollable) */}
        <div className="py-6 border-b border-neutral-200 overflow-hidden">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1 px-1">
            {[
              { label: 'Comfort', count: '6', icon: '🛏️' },
              { label: 'Accuracy', count: '5', icon: '🎯' },
              { label: 'Hot tub', count: '5', icon: '🛁' },
              { label: 'Condition', count: '4', icon: '🎨' },
              { label: 'Hospitality', count: '8', icon: '🎁' },
              { label: 'Cleanliness', count: '4', icon: '🧴' },
              { label: 'Amenities', count: '2', icon: '🧼' },
              { label: 'Decor', count: '2', icon: '🖼️' },
              { label: 'Indoor spaces', count: '2', icon: '🛋️' },
              { label: 'Location', count: '2', icon: '📍' },
            ].map((pill) => (
              <button
                key={pill.label}
                className="flex items-center gap-2 px-4.5 py-2.5 border border-neutral-300 bg-white hover:bg-neutral-50 rounded-full text-xs md:text-sm font-semibold text-neutral-900 transition whitespace-nowrap shrink-0 cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <span className="text-base">{pill.icon}</span>
                <span>{pill.label}</span>
                <span className="text-neutral-500 font-normal ml-0.5">{pill.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6 Reviews Grid (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 py-10">
          {/* Review 1 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
                A
              </div>
              <div>
                <h4 className="font-bold text-base text-neutral-900">Amit</h4>
                <p className="text-xs text-neutral-500">2 months on Airbnb</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800">
              <span>★★★★★</span>
              <span className="text-neutral-400">·</span>
              <span>1 week ago</span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.
            </p>
          </div>

          {/* Review 2 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Aheesh"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-base text-neutral-900">Aheesh</h4>
                <p className="text-xs text-neutral-500">3 years on Airbnb</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800">
              <span>★★★★★</span>
              <span className="text-neutral-400">·</span>
              <span>2 weeks ago</span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.
            </p>
            <button className="text-sm font-semibold underline text-neutral-900 hover:text-neutral-700 text-left w-fit cursor-pointer">
              Show more
            </button>
          </div>

          {/* Review 3 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Samiksha"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-base text-neutral-900">Samiksha</h4>
                <p className="text-xs text-neutral-500">8 months on Airbnb</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800">
              <span>★★★★★</span>
              <span className="text-neutral-400">·</span>
              <span>May 2026</span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              the host nitish was really great help
            </p>
          </div>

          {/* Review 4 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-violet-100 text-violet-800 font-bold flex items-center justify-center text-sm">
                V
              </div>
              <div>
                <h4 className="font-bold text-base text-neutral-900">Vedant</h4>
                <p className="text-xs text-neutral-500">4 years on Airbnb</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800">
              <span>★★★★★</span>
              <span className="text-neutral-400">·</span>
              <span>May 2026</span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine....
            </p>
            <button className="text-sm font-semibold underline text-neutral-900 hover:text-neutral-700 text-left w-fit cursor-pointer">
              Show more
            </button>
          </div>

          {/* Review 5 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                alt="Vaibhav S"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-base text-neutral-900">Vaibhav S</h4>
                <p className="text-xs text-neutral-500">3 years on Airbnb</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800">
              <span>★★★★★</span>
              <span className="text-neutral-400">·</span>
              <span>May 2026</span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.
            </p>
          </div>

          {/* Review 6 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
                alt="Mohd"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <h4 className="font-bold text-base text-neutral-900">Mohd</h4>
                <p className="text-xs text-neutral-500">5 years on Airbnb</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-neutral-800">
              <span>★★★★★</span>
              <span className="text-neutral-400">·</span>
              <span>May 2026</span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              Great place. Exactly as described in the listing.
            </p>
          </div>
        </div>

        {/* Show all 19 reviews button */}
        <button className="px-6 py-3.5 border border-neutral-900 hover:bg-neutral-100 rounded-xl font-bold text-sm transition cursor-pointer text-neutral-900 mb-12">
          Show all 19 reviews
        </button>
      </div>

      {/* 6. WHERE YOU'LL BE (LOCATION & NEIGHBOURHOOD) */}
      <div id="location-section" className="pt-10 border-t border-neutral-200">
        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-2">Where you'll be</h3>
        <p className="text-sm text-neutral-700 mb-6">Candolim, Goa, India</p>
        
        {/* Interactive Map */}
        <div className="h-[420px] rounded-2xl overflow-hidden shadow-xs border border-neutral-200">
          <Map center={listing.latlng} zoom={14} label="Candolim, Goa" />
        </div>
        
        <p className="text-sm text-neutral-600 mt-4 mb-8">
          Exact location will be provided after booking.
        </p>

        {/* Neighbourhood highlights */}
        <div className="pt-6 border-t border-neutral-100">
          <h4 className="text-base font-bold text-neutral-900 mb-2">Neighbourhood highlights</h4>
          <p className="text-sm text-neutral-700 leading-relaxed max-w-3xl mb-3">
            Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
          </p>
          <button className="text-sm font-semibold underline text-neutral-900 hover:text-neutral-700 flex items-center gap-1 cursor-pointer">
            <span>Show more</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 7. MEET YOUR HOST SECTION */}
      <div className="pt-12 border-t border-neutral-200 mt-12">
        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-8">Meet your host</h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Host Profile Card & Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Host Badge Card */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-xl flex items-center justify-between gap-6 max-w-[380px]">
              {/* Avatar and Name */}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-[#1C3A27] text-white flex flex-col items-center justify-center font-bold tracking-wider text-[11px] p-2 text-center shadow-md">
                    <span className="font-serif tracking-widest text-[10px]">MIRASHYA</span>
                    <span className="text-[8px] font-sans tracking-tight text-neutral-300">HOMES</span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#E00B41] text-white rounded-full flex items-center justify-center shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-neutral-900 mt-4">Mirashya Homes</h4>
                <span className="text-xs font-semibold text-neutral-500">Host</span>
              </div>

              {/* Stats Column */}
              <div className="flex flex-col gap-4 border-l border-neutral-200 pl-6 text-left">
                <div>
                  <span className="text-xl font-bold text-neutral-900 block">1,463</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Reviews</span>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <span className="text-xl font-bold text-neutral-900 block">4.68★</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Rating</span>
                </div>
                <div className="border-t border-neutral-100 pt-3">
                  <span className="text-xl font-bold text-neutral-900 block">2</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Years hosting</span>
                </div>
              </div>
            </div>

            {/* Host Details List */}
            <div className="flex flex-col gap-4 pt-2 text-sm text-neutral-800">
              <div className="flex items-center gap-3">
                <span className="text-lg">♀</span>
                <span>Born in the 80s</span>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap size={20} className="text-neutral-800 stroke-[1.5]" />
                <span>Where I went to school: NICMAR GOA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Co-Hosts & Host Details */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Co-Hosts */}
            <div>
              <h4 className="text-base font-bold text-neutral-900 mb-4">Co-Hosts</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Sharath', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80' },
                  { name: 'Aman Dev Pahwa', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&q=80' },
                  { name: 'Maria Karen Priyanka', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
                  { name: 'Simran', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80' },
                  { name: 'Pallavi', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80' },
                  { name: 'Sanyukta', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80' },
                  { name: 'Shruti', initial: 'S', color: 'bg-pink-100 text-pink-700' },
                  { name: 'Amisha', initial: 'A', color: 'bg-sky-100 text-sky-700' },
                ].map((cohost) => (
                  <div key={cohost.name} className="flex items-center gap-3">
                    {cohost.img ? (
                      <img
                        src={cohost.img}
                        alt={cohost.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full ${cohost.color} font-bold text-sm flex items-center justify-center`}
                      >
                        {cohost.initial}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-neutral-800">{cohost.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Details & Message */}
            <div className="border-t border-neutral-100 pt-6">
              <h4 className="text-base font-bold text-neutral-900 mb-3">Host details</h4>
              <div className="flex flex-col gap-1 text-sm text-neutral-700 mb-6">
                <p>Response rate: 100%</p>
                <p>Responds within an hour</p>
              </div>

              <button className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 rounded-xl font-bold text-sm text-neutral-900 transition cursor-pointer">
                Message host
              </button>

              <div className="flex items-center gap-3 text-xs text-neutral-500 mt-6 pt-4 border-t border-neutral-100">
                <ShieldCheck size={20} className="text-neutral-800 stroke-[1.5] shrink-0" />
                <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. THINGS TO KNOW SECTION */}
      <div className="pt-12 border-t border-neutral-200 mt-12 mb-14">
        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-8">Things to know</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          {/* Cancellation policy */}
          <div className="flex flex-col gap-3">
            <div className="text-neutral-900">
              <CalendarX size={24} className="stroke-[1.5]" />
            </div>
            <h4 className="font-bold text-base text-neutral-900">Cancellation policy</h4>
            <p className="text-neutral-700 leading-relaxed">
              Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
            </p>
            <p className="text-neutral-700">Review this host’s full policy for details.</p>
            <button className="font-bold underline text-neutral-900 text-left cursor-pointer hover:text-neutral-700 mt-1">
              Learn more
            </button>
          </div>

          {/* House rules */}
          <div className="flex flex-col gap-3">
            <div className="text-neutral-900">
              <Key size={24} className="stroke-[1.5]" />
            </div>
            <h4 className="font-bold text-base text-neutral-900">House rules</h4>
            <p className="text-neutral-700">Check-in after 2:00 pm</p>
            <p className="text-neutral-700">Checkout before 11:00 am</p>
            <p className="text-neutral-700">3 guests maximum</p>
            <button className="font-bold underline text-neutral-900 text-left cursor-pointer hover:text-neutral-700 mt-1">
              Learn more
            </button>
          </div>

          {/* Safety & property */}
          <div className="flex flex-col gap-3">
            <div className="text-neutral-900">
              <Shield size={24} className="stroke-[1.5]" />
            </div>
            <h4 className="font-bold text-base text-neutral-900">Safety & property</h4>
            <p className="text-neutral-700">Carbon monoxide alarm not reported</p>
            <p className="text-neutral-700">Smoke alarm not reported</p>
            <p className="text-neutral-700">Exterior security cameras on property</p>
            <button className="font-bold underline text-neutral-900 text-left cursor-pointer hover:text-neutral-700 mt-1">
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* 9. MORE STAYS NEARBY SECTION */}
      <div className="pt-12 border-t border-neutral-200 mt-12 mb-16">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900">More stays nearby</h3>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-neutral-700">{nearbyPage} / 2</span>
            <button
              onClick={() => setNearbyPage(1)}
              disabled={nearbyPage === 1}
              className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-neutral-800"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setNearbyPage(2)}
              disabled={nearbyPage === 2}
              className="p-2 border border-neutral-300 rounded-full hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer text-neutral-800"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* 5-Column Grid of Nearby Stays */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {(nearbyPage === 1
            ? [
                {
                  title: 'Beautiful Studio with a view to die for',
                  price: '₹23,600',
                  rating: '4.91',
                  img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'NAQAB - 1bhk with private pool',
                  price: '₹42,218',
                  rating: '4.95',
                  img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Greentique Luxury Flat with plunge pool, Calangute',
                  price: '₹44,506',
                  rating: '4.94',
                  img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'The Tropical Studio | 5 mins to Beach',
                  price: '₹22,824',
                  rating: '4.96',
                  img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
                  price: '₹39,942',
                  rating: '4.95',
                  img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
                },
              ]
            : [
                {
                  title: 'The Tropical Studio | 5 mins to Beach',
                  price: '₹22,824',
                  rating: '4.96',
                  img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute',
                  price: '₹39,942',
                  rating: '4.95',
                  img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Kanso by Earthen Window | Jacuzzi | Terrace | Pool',
                  price: '₹45,648',
                  rating: '5.0',
                  img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Luxury Apt | Private Pool | 6 Mins from Beach',
                  price: '₹48,786',
                  rating: '4.93',
                  img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
                },
                {
                  title: 'Serendipity Cottage - Calm Stay in Calangute-Baga.',
                  price: '₹22,824',
                  rating: '4.92',
                  img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
                },
              ]
          ).map((stay) => (
            <div key={stay.title} className="flex flex-col gap-2 group cursor-pointer">
              <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src={stay.img}
                  alt={stay.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h4 className="text-xs md:text-sm font-semibold text-neutral-900 line-clamp-2 mt-1 leading-snug">
                {stay.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-neutral-800 font-medium">
                <span className="font-semibold">{stay.price}</span>
                <span>★ {stay.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Photo Tour Modal */}
      <PhotoTour isOpen={showPhotoTour} onClose={() => setShowPhotoTour(false)} />

      {/* Amenities Modal */}
      <AmenitiesModal isOpen={showAmenitiesModal} onClose={() => setShowAmenitiesModal(false)} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-neutral-800 text-white text-sm font-medium px-6 py-3 rounded-lg shadow-xl">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  );
};
