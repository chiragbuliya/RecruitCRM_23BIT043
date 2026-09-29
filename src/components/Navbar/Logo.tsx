import React from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.png';

export const Logo: React.FC = () => {
  const { setActiveTab, setActiveCategory, resetSearchFilter } = useApp();

  const handleClick = () => {
    setActiveTab('explore');
    setActiveCategory(null);
    resetSearchFilter();
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center cursor-pointer select-none transition hover:opacity-90 py-0.5"
    >
      <img
        src={logoImg}
        alt="airbnb"
        className="h-9 md:h-10 lg:h-[42px] w-auto object-contain shrink-0"
      />
    </div>
  );
};
