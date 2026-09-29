import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { CategoryBox } from './CategoryBox';
import { useApp } from '../../context/AppContext';

export const Categories: React.FC = () => {
  const { activeCategory, activeTab } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (activeTab !== 'explore') {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20 bg-white border-b border-neutral-100 sticky top-16 z-30">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4 relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-300 rounded-full p-2 shadow-md hover:scale-105 transition cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Scrollable Categories Row */}
        <div
          ref={scrollRef}
          className="flex flex-row items-center justify-between overflow-x-auto no-scrollbar gap-4 md:gap-8 py-1"
        >
          {CATEGORIES.map(item => (
            <CategoryBox
              key={item.label}
              label={item.label}
              iconName={item.iconName}
              selected={activeCategory === item.label}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-neutral-300 rounded-full p-2 shadow-md hover:scale-105 transition cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
