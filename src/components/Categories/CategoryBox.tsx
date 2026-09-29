import React from 'react';
import {
  Palmtree,
  Wind,
  Building2,
  Trees,
  Waves,
  Sun,
  Compass,
  Snowflake,
  Castle,
  Tent,
  Mountain,
  SunMedium,
  Home,
  Sparkles
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CategoryBoxProps {
  label: string;
  iconName: string;
  selected?: boolean;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Palmtree,
  Wind,
  Building2,
  Trees,
  Waves,
  Sun,
  Compass,
  Snowflake,
  Castle,
  Tent,
  Mountain,
  SunMedium,
  Home,
  Sparkles
};

export const CategoryBox: React.FC<CategoryBoxProps> = ({ label, iconName, selected }) => {
  const { activeCategory, setActiveCategory, setActiveTab } = useApp();
  const Icon = ICON_MAP[iconName] || Home;

  const handleClick = () => {
    setActiveTab('explore');
    if (activeCategory === label) {
      setActiveCategory(null);
    } else {
      setActiveCategory(label);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer select-none min-w-[70px]
        ${selected ? 'border-neutral-800 text-neutral-800 font-bold' : 'border-transparent text-neutral-500 font-medium'}
      `}
    >
      <Icon size={26} className={selected ? 'text-neutral-900' : 'text-neutral-500'} />
      <div className="text-xs tracking-tight whitespace-nowrap">{label}</div>
    </div>
  );
};
