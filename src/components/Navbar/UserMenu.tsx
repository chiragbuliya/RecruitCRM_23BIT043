import React from 'react';
import { Menu, Globe } from 'lucide-react';

export const UserMenu: React.FC = () => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-neutral-900"
        >
          Become a host
        </button>

        <button className="p-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-full cursor-pointer transition text-neutral-700">
          <Globe size={18} />
        </button>

        <button className="p-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-full cursor-pointer transition text-neutral-700">
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
};
