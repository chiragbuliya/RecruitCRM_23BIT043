import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { Map } from '../Map/Map';

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5
} as const;

type StepType = typeof STEPS[keyof typeof STEPS];

const PRESET_LOCATIONS = [
  { label: 'Cancún, Mexico', value: 'MX', latlng: [21.1619, -86.8515] as [number, number] },
  { label: 'Paris, France', value: 'FR', latlng: [48.8566, 2.3522] as [number, number] },
  { label: 'Kyoto, Japan', value: 'JP', latlng: [35.0116, 135.7681] as [number, number] },
  { label: 'Maui, Hawaii, USA', value: 'US', latlng: [20.7984, -156.3319] as [number, number] },
  { label: 'Cape Town, South Africa', value: 'ZA', latlng: [-33.9249, 18.4241] as [number, number] },
  { label: 'Bali, Indonesia', value: 'ID', latlng: [-8.4095, 115.1889] as [number, number] },
  { label: 'Sydney, Australia', value: 'AU', latlng: [-33.8688, 151.2093] as [number, number] }
];

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
];

export const RentModal: React.FC = () => {
  const { isRentModalOpen, setIsRentModalOpen, createListing, setActiveTab } = useApp();
  const [step, setStep] = useState<StepType>(STEPS.CATEGORY);

  const [category, setCategory] = useState('Beach');
  const [location, setLocation] = useState(PRESET_LOCATIONS[0]);
  const [guestCount, setGuestCount] = useState(4);
  const [roomCount, setRoomCount] = useState(2);
  const [bathroomCount, setBathroomCount] = useState(2);
  const [imageSrc, setImageSrc] = useState(PRESET_IMAGES[0]);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(250);

  if (!isRentModalOpen) return null;

  const onBack = () => setStep(prev => (prev - 1) as StepType);
  const onNext = () => setStep(prev => (prev + 1) as StepType);

  const onSubmit = () => {
    const finalImage = customImageUrl.trim() ? customImageUrl.trim() : imageSrc;
    createListing({
      title: title || 'Stunning Luxury Retreat',
      description: description || 'Enjoy an unforgettable stay in this handcrafted designer retreat.',
      imageSrc: [finalImage, PRESET_IMAGES[1], PRESET_IMAGES[2]],
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      locationLabel: location.label,
      latlng: location.latlng,
      price
    });

    setIsRentModalOpen(false);
    setStep(STEPS.CATEGORY);
    setActiveTab('properties');
  };

  const actionLabel = step === STEPS.PRICE ? 'Create Listing' : 'Next';
  const secondaryActionLabel = step === STEPS.CATEGORY ? undefined : 'Back';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-modal-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <button
            onClick={() => setIsRentModalOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer"
          >
            <X size={18} />
          </button>
          <div className="text-base font-extrabold text-neutral-800">Airbnb your home</div>
          <div className="w-8" />
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 0: CATEGORY */}
          {step === STEPS.CATEGORY && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Which of these best describes your place?</h2>
                <p className="text-neutral-500 text-sm mt-1">Pick a category</p>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
                {CATEGORIES.map(item => (
                  <div
                    key={item.label}
                    onClick={() => setCategory(item.label)}
                    className={`
                      p-4 rounded-xl border-2 flex flex-col gap-2 cursor-pointer transition hover:border-neutral-800
                      ${category === item.label ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200'}
                    `}
                  >
                    <span className="font-bold text-sm text-neutral-900">{item.label}</span>
                    <span className="text-xs text-neutral-500 line-clamp-2">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: LOCATION */}
          {step === STEPS.LOCATION && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Where is your place located?</h2>
                <p className="text-neutral-500 text-sm mt-1">Help guests find you!</p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-neutral-700 uppercase">Select Location</label>
                <select
                  value={location.label}
                  onChange={e => {
                    const loc = PRESET_LOCATIONS.find(l => l.label === e.target.value);
                    if (loc) setLocation(loc);
                  }}
                  className="p-3 border border-neutral-300 rounded-xl font-semibold text-neutral-800 outline-none cursor-pointer"
                >
                  {PRESET_LOCATIONS.map(loc => (
                    <option key={loc.label} value={loc.label}>{loc.label}</option>
                  ))}
                </select>
              </div>
              <Map center={location.latlng} zoom={10} label={location.label} />
            </div>
          )}

          {/* STEP 2: INFO COUNTERS */}
          {step === STEPS.INFO && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Share some basics about your place</h2>
                <p className="text-neutral-500 text-sm mt-1">What amenities do you offer?</p>
              </div>

              {/* Counter Row: Guests */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                  <div className="font-bold text-base text-neutral-900">Guests</div>
                  <div className="text-xs text-neutral-500">How many guests do you allow?</div>
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

              {/* Counter Row: Rooms */}
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <div>
                  <div className="font-bold text-base text-neutral-900">Rooms</div>
                  <div className="text-xs text-neutral-500">How many bedrooms do you have?</div>
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

              {/* Counter Row: Bathrooms */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-bold text-base text-neutral-900">Bathrooms</div>
                  <div className="text-xs text-neutral-500">How many bathrooms do you have?</div>
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

          {/* STEP 3: IMAGES */}
          {step === STEPS.IMAGES && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Add a photo of your place</h2>
                <p className="text-neutral-500 text-sm mt-1">Show guests what your place looks like!</p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-neutral-700 uppercase">Option A: Select a Preset Photo</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_IMAGES.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setImageSrc(img);
                        setCustomImageUrl('');
                      }}
                      className={`
                        aspect-video rounded-lg overflow-hidden border-2 cursor-pointer relative transition
                        ${imageSrc === img && !customImageUrl ? 'border-airbnb-primary ring-2 ring-rose-400' : 'border-transparent opacity-80'}
                      `}
                    >
                      <img src={img} alt="Preset" className="w-full h-full object-cover" />
                      {imageSrc === img && !customImageUrl && (
                        <div className="absolute top-1 right-1 bg-airbnb-primary text-white rounded-full p-0.5">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center font-bold text-xs text-neutral-400 my-1">— OR —</div>

                <label className="text-xs font-bold text-neutral-700 uppercase">Option B: Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={customImageUrl}
                  onChange={e => setCustomImageUrl(e.target.value)}
                  className="p-3 border border-neutral-300 rounded-xl text-sm font-semibold outline-none focus:border-neutral-800"
                />
              </div>
            </div>
          )}

          {/* STEP 4: DESCRIPTION */}
          {step === STEPS.DESCRIPTION && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">How would you describe your place?</h2>
                <p className="text-neutral-500 text-sm mt-1">Short and sweet works best!</p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-neutral-700 uppercase">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Modern Villa with Sunset Views"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="p-3 border border-neutral-300 rounded-xl text-sm font-semibold outline-none focus:border-neutral-800"
                />

                <label className="text-xs font-bold text-neutral-700 uppercase">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your place, surrounding nature, nearby attractions, and guest experience..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="p-3 border border-neutral-300 rounded-xl text-sm font-medium outline-none focus:border-neutral-800"
                />
              </div>
            </div>
          )}

          {/* STEP 5: PRICE */}
          {step === STEPS.PRICE && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Now, set your price</h2>
                <p className="text-neutral-500 text-sm mt-1">How much do you want to charge per night?</p>
              </div>

              <div className="flex items-center justify-center p-8 bg-rose-50/50 rounded-2xl border border-rose-100 my-4">
                <span className="text-3xl font-extrabold text-neutral-800 mr-2">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="text-4xl font-extrabold text-airbnb-primary outline-none bg-transparent w-36 text-center"
                />
                <span className="text-base text-neutral-500 font-semibold ml-2">/ night</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-neutral-100 flex items-center justify-between bg-white">
          {secondaryActionLabel ? (
            <button
              onClick={onBack}
              className="px-5 py-2.5 border border-neutral-300 hover:bg-neutral-100 font-bold rounded-xl text-sm transition cursor-pointer"
            >
              {secondaryActionLabel}
            </button>
          ) : <div />}

          <button
            onClick={step === STEPS.PRICE ? onSubmit : onNext}
            className="px-6 py-3 bg-airbnb-primary hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg transition text-sm cursor-pointer"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
