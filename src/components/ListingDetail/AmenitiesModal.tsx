import React, { useEffect } from 'react';
import {
  X,
  Wind,
  Sparkles,
  Droplets,
  Flame,
  Shirt,
  Layers,
  Sliders,
  Package,
  Baby,
  Tv,
  Snowflake,
  Fan,
  Video,
  BellOff,
  Wifi,
  Laptop,
  Utensils,
  Refrigerator,
  Microwave,
  Coffee,
  Wine,
  Car,
  Waves,
  Bath,
  DoorOpen,
  Calendar,
  Soup,
  Dumbbell,
  PawPrint,
  Flower2,
  DoorClosed
} from 'lucide-react';

interface AmenityItem {
  name: string;
  available: boolean;
  icon: React.ReactNode;
}

interface AmenityCategory {
  title: string;
  items: AmenityItem[];
}

const WashingMachineIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="12" cy="13" r="5" />
    <line x1="7" y1="6" x2="7.01" y2="6" />
    <line x1="11" y1="6" x2="11.01" y2="6" />
  </svg>
);

const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    title: 'Bathroom',
    items: [
      { name: 'Hairdryer', available: true, icon: <Wind size={22} className="stroke-[1.5]" /> },
      { name: 'Cleaning products', available: true, icon: <Sparkles size={22} className="stroke-[1.5]" /> },
      { name: 'Shampoo', available: true, icon: <Droplets size={22} className="stroke-[1.5]" /> },
      { name: 'Hot water', available: true, icon: <Flame size={22} className="stroke-[1.5]" /> },
      { name: 'Shower gel', available: true, icon: <Droplets size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Bedroom and laundry',
    items: [
      { name: 'Washing machine', available: true, icon: <WashingMachineIcon /> },
      { name: 'Hangers', available: true, icon: <Shirt size={22} className="stroke-[1.5]" /> },
      { name: 'Bed linen', available: true, icon: <Layers size={22} className="stroke-[1.5]" /> },
      { name: 'Room-darkening blinds', available: true, icon: <Sliders size={22} className="stroke-[1.5]" /> },
      { name: 'Iron', available: true, icon: <Sparkles size={22} className="stroke-[1.5]" /> },
      { name: 'Clothes storage', available: true, icon: <Package size={22} className="stroke-[1.5]" /> },
      { name: 'Cot', available: true, icon: <Baby size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Entertainment',
    items: [
      { name: 'TV', available: true, icon: <Tv size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Family',
    items: [
      { name: 'Cot', available: true, icon: <Baby size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Heating and cooling',
    items: [
      { name: 'Air conditioning', available: true, icon: <Snowflake size={22} className="stroke-[1.5]" /> },
      { name: 'Ceiling fan', available: true, icon: <Fan size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Home safety',
    items: [
      { name: 'Exterior security cameras on property', available: true, icon: <Video size={22} className="stroke-[1.5]" /> },
      { name: 'Carbon monoxide alarm', available: false, icon: <BellOff size={22} className="stroke-[1.5]" /> },
      { name: 'Smoke alarm', available: false, icon: <BellOff size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Internet and office',
    items: [
      { name: 'Wifi', available: true, icon: <Wifi size={22} className="stroke-[1.5]" /> },
      { name: 'Dedicated workspace', available: true, icon: <Laptop size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Kitchen and dining',
    items: [
      { name: 'Kitchen', available: true, icon: <Utensils size={22} className="stroke-[1.5]" /> },
      { name: 'Fridge', available: true, icon: <Refrigerator size={22} className="stroke-[1.5]" /> },
      { name: 'Freezer', available: true, icon: <Refrigerator size={22} className="stroke-[1.5]" /> },
      { name: 'Microwave', available: true, icon: <Microwave size={22} className="stroke-[1.5]" /> },
      { name: 'Cooking basics', available: true, icon: <Soup size={22} className="stroke-[1.5]" /> },
      { name: 'Crockery and cutlery', available: true, icon: <Utensils size={22} className="stroke-[1.5]" /> },
      { name: 'Kettle', available: true, icon: <Coffee size={22} className="stroke-[1.5]" /> },
      { name: 'Coffee', available: true, icon: <Coffee size={22} className="stroke-[1.5]" /> },
      { name: 'Wine glasses', available: true, icon: <Wine size={22} className="stroke-[1.5]" /> },
      { name: 'Toaster', available: true, icon: <Package size={22} className="stroke-[1.5]" /> },
      { name: 'Blender', available: true, icon: <Sliders size={22} className="stroke-[1.5]" /> },
      { name: 'Cooker', available: true, icon: <Flame size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Location features',
    items: [
      { name: 'Private entrance', available: true, icon: <DoorClosed size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Outdoor',
    items: [
      { name: 'Patio or balcony', available: true, icon: <Flower2 size={22} className="stroke-[1.5]" /> },
      { name: 'Outdoor dining area', available: true, icon: <Utensils size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Parking and facilities',
    items: [
      { name: 'Free parking on premises', available: true, icon: <Car size={22} className="stroke-[1.5]" /> },
      { name: 'Pool', available: true, icon: <Waves size={22} className="stroke-[1.5]" /> },
      { name: 'Hot tub', available: true, icon: <Bath size={22} className="stroke-[1.5]" /> },
      { name: 'Gym', available: true, icon: <Dumbbell size={22} className="stroke-[1.5]" /> },
    ],
  },
  {
    title: 'Services',
    items: [
      { name: 'Pets allowed', available: true, icon: <PawPrint size={22} className="stroke-[1.5]" /> },
      { name: 'Cleaning available during stay', available: true, icon: <Sparkles size={22} className="stroke-[1.5]" /> },
      { name: 'Long-term stays allowed', available: true, icon: <Calendar size={22} className="stroke-[1.5]" /> },
      { name: 'Self check-in', available: true, icon: <DoorOpen size={22} className="stroke-[1.5]" /> },
    ],
  },
];

interface AmenitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AmenitiesModal: React.FC<AmenitiesModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div
        className="relative w-full max-w-[780px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div className="p-6 pb-4 flex items-center border-b border-neutral-100 bg-white">
          <button
            onClick={onClose}
            className="p-2 -ml-2 hover:bg-neutral-100 rounded-full transition cursor-pointer text-neutral-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-8 py-6 overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">What this place offers</h2>

          <div className="flex flex-col gap-8">
            {AMENITY_CATEGORIES.map((category) => (
              <div key={category.title} className="pb-6 border-b border-neutral-200 last:border-b-0">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">{category.title}</h3>
                <div className="flex flex-col divide-y divide-neutral-100">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="py-4 flex items-center gap-4 text-neutral-800"
                    >
                      <div className="text-neutral-800">
                        {item.icon}
                      </div>
                      <span className="text-base font-normal">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
