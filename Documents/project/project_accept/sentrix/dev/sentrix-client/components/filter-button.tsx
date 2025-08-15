import { useEffect, useState } from 'react';

import { useFilterStore } from '@/store/filter-store';

import IconFilter from './icon/icon-filter';

const FilterButton = () => {
  const { openSidebar, filters } = useFilterStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== '' && value !== null && value !== undefined;
  }).length;

  return (
    <button
      onClick={openSidebar}
      className={`
        fixed ${scrolled ? 'top-[4.7rem]' : 'top-[6.7rem]'} right-5 w-32 px-2 rounded-md gap-2 h-8 z-50 outline outline-[#2196F3]
        text-black bg-white shadow-lg hover:shadow-xl
        flex items-center justify-between
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        group
      `}
      style={{
        transition: 'top 0.3s ease-in-out',
      }}
    >
      <span className="font-semibold capitalize ml-2">filter</span>
      <IconFilter className="size-6" />

      {activeFiltersCount > 0 && (
        <span
          className="
          absolute -top-2 -right-2
          bg-red-500 text-white text-xs
          rounded-full size-5
          flex items-center justify-center
          font-medium shadow-md
          animate-pulse
        "
        >
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
};

export default FilterButton;
