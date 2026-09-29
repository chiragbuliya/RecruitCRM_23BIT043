import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Share, Heart, X } from 'lucide-react';

interface RoomBlock {
  type: 'full' | 'pair';
  images: string[];
}

interface RoomSection {
  title: string;
  features: string;
  blocks: RoomBlock[];
}

interface PhotoTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  if (e.currentTarget.src !== FALLBACK_IMAGE) {
    e.currentTarget.src = FALLBACK_IMAGE;
  }
};

const ROOM_SECTIONS: RoomSection[] = [
  {
    title: 'Living room 1',
    features: 'Sofa · Air conditioning · Ceiling fan · TV',
    blocks: [
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        ],
      },
    ],
  },
  {
    title: 'Living room 2',
    features: 'Ceiling fan · Hot tub',
    blocks: [
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        ],
      },
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        ],
      },
    ],
  },
  {
    title: 'Full kitchen',
    features: 'Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery',
    blocks: [
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80',
        ],
      },
    ],
  },
  {
    title: 'Bedroom',
    features: 'Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi',
    blocks: [
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&w=800&q=80',
        ],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
        ],
      },
    ],
  },
  {
    title: 'Full bathroom',
    features: 'Hairdryer · Hot water · Shampoo · Shower gel',
    blocks: [
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'],
      },
    ],
  },
  {
    title: 'Gym',
    features: 'Air conditioning · Gym · Exercise equipment · Ceiling fan',
    blocks: [
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80',
        ],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        ],
      },
    ],
  },
  {
    title: 'Exterior',
    features: '',
    blocks: [
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        ],
      },
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        ],
      },
    ],
  },
  {
    title: 'Pool',
    features: 'Private pool · Pool towels',
    blocks: [
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1572331165267-854da2b021b1?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
        ],
      },
    ],
  },
  {
    title: 'Additional photos',
    features: '',
    blocks: [
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
        ],
      },
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        ],
      },
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'],
      },
      {
        type: 'pair',
        images: [
          'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        ],
      },
      {
        type: 'full',
        images: ['https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80'],
      },
    ],
  },
];

// Flatten all images for Lightbox navigation
const ALL_IMAGES: { src: string; title: string }[] = ROOM_SECTIONS.flatMap((room) =>
  room.blocks.flatMap((block) => block.images.map((src) => ({ src, title: room.title })))
);

export const PhotoTour: React.FC<PhotoTourProps> = ({ isOpen, onClose }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setLightboxIndex(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < ALL_IMAGES.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : ALL_IMAGES.length - 1));
      }
    },
    [lightboxIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  const scrollToRoom = (title: string) => {
    const el = document.getElementById(`photo-room-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openLightbox = (imgSrc: string) => {
    const idx = ALL_IMAGES.findIndex((item) => item.src === imgSrc);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev !== null && prev < ALL_IMAGES.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : ALL_IMAGES.length - 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1100px] mx-auto">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer"
          >
            <ChevronLeft size={20} className="text-neutral-800" />
          </button>

          {/* Title */}
          <span className="text-base font-bold text-neutral-900">Photo tour</span>

          {/* Share & Heart */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer">
              <Share size={18} className="text-neutral-700" />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer">
              <Heart size={18} className="text-neutral-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="max-w-[1100px] mx-auto px-6 pt-8 pb-6">
        <div className="flex flex-wrap gap-4">
          {ROOM_SECTIONS.map((room) => (
            <button
              key={room.title}
              onClick={() => scrollToRoom(room.title)}
              className="flex flex-col items-start gap-1.5 cursor-pointer group"
            >
              <div className="w-[100px] h-[72px] rounded-lg overflow-hidden bg-neutral-100">
                <img
                  src={room.blocks[0].images[0]}
                  alt={room.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:opacity-90 transition"
                />
              </div>
              <span className="text-sm font-semibold text-neutral-800 max-w-[100px] leading-tight text-left">{room.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Room Sections */}
      <div className="max-w-[1100px] mx-auto px-6 pb-20">
        {ROOM_SECTIONS.map((room) => (
          <div
            key={room.title}
            id={`photo-room-${room.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="py-10 border-t border-neutral-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Room name & features (sticky) */}
              <div>
                <div className="md:sticky md:top-20 flex flex-col justify-start pt-2">
                  <h2 className="text-[28px] md:text-3xl font-bold text-neutral-900 leading-tight">{room.title}</h2>
                  {room.features && (
                    <p className="text-base font-normal text-neutral-700 mt-2.5 leading-relaxed">{room.features}</p>
                  )}
                </div>
              </div>

              {/* Right: Photos grid */}
              <div className="flex flex-col gap-2">
                {room.blocks.map((block, bIdx) => {
                  if (block.type === 'full') {
                    return (
                      <div
                        key={`${room.title}-full-${bIdx}`}
                        onClick={() => openLightbox(block.images[0])}
                        className="rounded-xl overflow-hidden bg-neutral-100 cursor-pointer group"
                      >
                        <img
                          src={block.images[0]}
                          alt={`${room.title} photo`}
                          onError={handleImageError}
                          className="w-full object-cover rounded-xl group-hover:opacity-95 transition"
                          style={{ aspectRatio: '4/3' }}
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={`${room.title}-pair-${bIdx}`} className="grid grid-cols-2 gap-2">
                      {block.images.map((img, iIdx) => (
                        <div
                          key={`${room.title}-p-${bIdx}-${iIdx}`}
                          onClick={() => openLightbox(img)}
                          className="rounded-xl overflow-hidden bg-neutral-100 cursor-pointer group"
                        >
                          <img
                            src={img}
                            alt={`${room.title} photo`}
                            onError={handleImageError}
                            className="w-full h-full object-cover rounded-xl group-hover:opacity-95 transition"
                            style={{ aspectRatio: '4/3' }}
                          />
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Single-Photo Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-60 bg-white flex flex-col justify-between p-4 md:p-6 animate-fade-in select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-2 md:px-6 py-2 border-b border-transparent">
            {/* Left: Grid Icon (return to photo tour grid) */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 hover:bg-neutral-100 rounded-full transition cursor-pointer text-neutral-800"
              title="Show all photos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="4" cy="4" r="2" />
                <circle cx="12" cy="4" r="2" />
                <circle cx="20" cy="4" r="2" />
                <circle cx="4" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="20" cy="12" r="2" />
                <circle cx="4" cy="20" r="2" />
                <circle cx="12" cy="20" r="2" />
                <circle cx="20" cy="20" r="2" />
              </svg>
            </button>

            {/* Center: Title */}
            <span className="text-sm md:text-base font-semibold text-neutral-900">
              {ALL_IMAGES[lightboxIndex].title}
            </span>

            {/* Right: Counter and Close X */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-normal text-neutral-800">
                {lightboxIndex + 1} of {ALL_IMAGES.length}
              </span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 rounded-full transition cursor-pointer text-neutral-800"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Image View with Floating Circular Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-2 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={lightboxIndex === 0}
              className="absolute left-4 md:left-8 z-20 w-11 h-11 bg-white border border-neutral-300 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-neutral-50 transition cursor-pointer text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous (Left arrow)"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Centered High-Res Photo */}
            <img
              src={ALL_IMAGES[lightboxIndex].src}
              alt={ALL_IMAGES[lightboxIndex].title}
              onError={handleImageError}
              className="max-h-[80vh] max-w-[86vw] object-contain rounded-xl shadow-xs transition duration-200"
            />

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={lightboxIndex === ALL_IMAGES.length - 1}
              className="absolute right-4 md:right-8 z-20 w-11 h-11 bg-white border border-neutral-300 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-neutral-50 transition cursor-pointer text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Next (Right arrow)"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
