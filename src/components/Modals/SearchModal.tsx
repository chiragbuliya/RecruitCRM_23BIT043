import React, { useState } from 'react';
import { X, Search as SearchIcon, Minus, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Map } from '../Map/Map';

const SEARCH_STEPS = {
  LOCATION: 0,
  DATE: 1,
  INFO: 2
} as const;

type SearchStepType = typeof SEARCH_STEPS[keyof typeof SEARCH_STEPS];

const POPULAR_DESTINATIONS = [
  { label: 'Cancún, Mexico', value: 'MX', latlng: [21.1619, -86.8515] as [number, number] },
  { label: 'New York, USA', value: 'US', latlng: [40.7128, -74.006] as [number, number] },
  { label: 'Santorini, Greece', value: 'GR', latlng: [36.3932, 25.4615] as [number, number] },
  { label: 'Zermatt, Switzerland', value: 'CH', latlng: [46.0207, 7.7491] as [number, number] },
  { label: 'Italy', value: 'IT', latlng: [43.3188, 11.3308] as [number, number] },
  { label: 'Maldives', value: 'MV', latlng: [5.1438, 73.0766] as [number, number] }
];

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, setSearchFilter, resetSearchFilter, setActiveTab } = useApp();
  const [step, setStep] = useState<SearchStepType>(SEARCH_STEPS.LOCATION);

  const [selectedDest, setSelectedDest] = useState(POPULAR_DESTINATIONS[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  if (!isSearchModalOpen) return null;

  const onNext = () => setStep(prev => (prev + 1) as SearchStepType);
  const onBack = () => setStep(prev => (prev - 1) as SearchStepType);

  const onSearch = () => {
    setSearchFilter({
      locationValue: selectedDest.label,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      guestCount,
      roomCount,
      bathroomCount
    });

    setIsSearchModalOpen(false);
    setStep(SEARCH_STEPS.LOCATION);
    setActiveTab('explore');
  };

  const handleReset = () => {
    resetSearchFilter();
    setIsSearchModalOpen(false);
    setStep(SEARCH_STEPS.LOCATION);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-modal-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer"
          >
            <X size={18} />
          </button>
          <div className="text-base font-extrabold text-neutral-800">Filters & Search</div>
          <button
            onClick={handleReset}
            className="text-xs font-bold text-neutral-500 hover:text-neutral-900 underline cursor-pointer"
          >
            Clear all
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 0: LOCATION */}
          {step === SEARCH_STEPS.LOCATION && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Where do you want to go?</h2>
                <p className="text-neutral-500 text-sm mt-1">Find the perfect location!</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-700 uppercase">Choose Destination</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {POPULAR_DESTINATIONS.map(dest => (
                    <div
                      key={dest.label}
                      onClick={() => setSelectedDest(dest)}
                      className={`
                        p-3 rounded-xl border-2 cursor-pointer transition flex flex-col items-center justify-center text-center
                        ${selectedDest.label === dest.label ? 'border-neutral-900 bg-neutral-50 font-bold' : 'border-neutral-200'}
                      `}
                    >
                      <span className="text-xs text-neutral-800 truncate w-full">{dest.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Map center={selectedDest.latlng} zoom={8} label={selectedDest.label} />
            </div>
          )}

          {/* STEP 1: DATES */}
          {step === SEARCH_STEPS.DATE && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">When do you plan to go?</h2>
                <p className="text-neutral-500 text-sm mt-1">Make sure everyone is free!</p>
              </div>

              <div className="grid grid-cols-2 gap-4 my-2">
                <div className="p-3 border border-neutral-300 rounded-xl">
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full text-sm font-semibold outline-none bg-transparent"
                  />
                </div>
                <div className="p-3 border border-neutral-300 rounded-xl">
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full text-sm font-semibold outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: GUEST COUNTS */}
          {step === SEARCH_STEPS.INFO && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">More information</h2>
                <p className="text-neutral-500 text-sm mt-1">Find your perfect stay!</p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                  <div className="font-bold text-base text-neutral-900">Guests</div>
                  <div className="text-xs text-neutral-500">How many guests are coming?</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-800 transition cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-base w-4 text-center">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-800 transition cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                  <div className="font-bold text-base text-neutral-900">Rooms</div>
                  <div className="text-xs text-neutral-500">How many rooms do you need?</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setRoomCount(Math.max(1, roomCount - 1))}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-800 transition cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-base w-4 text-center">{roomCount}</span>
                  <button
                    onClick={() => setRoomCount(roomCount + 1)}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-800 transition cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-bold text-base text-neutral-900">Bathrooms</div>
                  <div className="text-xs text-neutral-500">How many bathrooms do you need?</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBathroomCount(Math.max(1, bathroomCount - 1))}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-800 transition cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-base w-4 text-center">{bathroomCount}</span>
                  <button
                    onClick={() => setBathroomCount(bathroomCount + 1)}
                    className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-800 transition cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-neutral-100 flex items-center justify-between bg-white">
          {step !== SEARCH_STEPS.LOCATION ? (
            <button
              onClick={onBack}
              className="px-5 py-2.5 border border-neutral-300 hover:bg-neutral-100 font-bold rounded-xl text-sm transition cursor-pointer"
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={step === SEARCH_STEPS.INFO ? onSearch : onNext}
            className="px-6 py-3 bg-airbnb-primary hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg transition text-sm flex items-center gap-2 cursor-pointer"
          >
            {step === SEARCH_STEPS.INFO ? (
              <>
                <SearchIcon size={16} />
                <span>Search Properties</span>
              </>
            ) : (
              <span>Next</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
