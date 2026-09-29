import React from 'react';
import { Logo } from './Logo';
import { Search } from './Search';
import { UserMenu } from './UserMenu';

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-neutral-200">
      <div className="py-4">
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4">
          <div className="flex flex-row items-center gap-3 md:gap-0">
            {/* Left: Logo — flex-1 so it takes equal space as right side */}
            <div className="flex-1 flex items-center">
              <Logo />
            </div>

            {/* Center: Search pill — centered */}
            <Search />

            {/* Right: UserMenu — flex-1 so it mirrors left side width */}
            <div className="flex-1 flex items-center justify-end">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
