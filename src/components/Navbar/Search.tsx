import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Search: React.FC = () => {
  const { searchFilter } = useApp();

  const locationLabel = searchFilter.locationValue ? searchFilter.locationValue : 'Anywhere';
  const dateLabel = searchFilter.startDate && searchFilter.endDate 
    ? `${searchFilter.startDate} - ${searchFilter.endDate}` 
    : 'Anytime';
  const guestLabel = searchFilter.guestCount 
    ? `${searchFilter.guestCount} guests` 
    : 'Add guests';

  return (
    <div
      className="border-[1px] border-neutral-300 w-full md:w-auto py-2 px-2 rounded-full shadow-2xs hover:shadow-md transition cursor-pointer bg-white"
    >
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="flex items-center gap-2.5 px-3">
          {/* Mini colored house graphic matching reference screenshot */}
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 32 32" className="w-6 h-6">
              <path d="M16 1L0.5 14.5h4V30h8.5V21h6v9h8.5V14.5h4L16 1z" fill="#FF385C" opacity="0.15"/>
              <path d="M16 1L0.5 14.5h4V30h8.5V21h6v9h8.5V14.5h4L16 1z" fill="none" stroke="#FF385C" strokeWidth="1.5"/>
              <rect x="13" y="21" width="6" height="9" fill="#FF385C" opacity="0.3"/>
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-semibold truncate max-w-[120px] sm:max-w-none text-neutral-900">
            {locationLabel}
          </span>
        </div>

        <div className="hidden sm:block text-sm font-semibold px-5 border-x-[1px] border-neutral-200 text-center truncate text-neutral-900">
          {dateLabel}
        </div>

        <div className="text-xs sm:text-sm pl-3 sm:pl-5 pr-1 text-neutral-500 flex flex-row items-center gap-3">
          <div className="hidden sm:block truncate text-neutral-500 font-medium">{guestLabel}</div>
          <div className="p-2.5 bg-[#FF385C] rounded-full text-white flex items-center justify-center shadow-xs hover:bg-[#E00B41] transition">
            <SearchIcon size={13} className="stroke-[3]" />
          </div>
        </div>
      </div>
    </div>
  );
};
