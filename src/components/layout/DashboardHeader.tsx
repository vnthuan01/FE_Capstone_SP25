import { useState } from 'react';
import { useTheme } from 'next-themes';
import React from 'react';

interface DashboardHeaderProps {
  onMenuClick?: () => void;
  searchPlaceholder?: string;
  // onSearchChange?: (_value: string) => void;
}

export function DashboardHeader({
  onMenuClick,
  searchPlaceholder = 'Tìm kiếm hàng hóa, danh mục...',
  // onSearchChange,
}: DashboardHeaderProps) {
  const [searchValue, setSearchValue] = useState('');
  const { theme, setTheme } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // onSearchChange?.(value);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-[#233648] bg-surface-light dark:bg-[#111a22] px-6 py-3">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden mr-4 text-slate-500 hover:text-primary transition-colors"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Search Bar */}
      <label className="flex flex-col min-w-40 h-10 w-full max-w-md">
        <div className="flex h-full rounded-lg bg-slate-100 dark:bg-[#233648] focus-within:ring-2 ring-primary/50">
          <div className="flex items-center pl-4 text-slate-400 dark:text-[#92adc9]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            className="flex-1 bg-transparent px-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92adc9] focus:ring-0"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
      </label>

      {/* Right Actions */}
      <div className="flex flex-1 justify-end items-center gap-4">
        {/* Toggle Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-slate-500 hover:text-primary dark:text-[#92adc9] dark:hover:text-white transition-colors"
          title="Toggle theme"
        >
          <span className="material-symbols-outlined">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-primary dark:text-[#92adc9] dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border-2 border-surface-light dark:border-[#111a22]" />
        </button>

        {/* Help */}
        <button className="p-2 text-slate-500 hover:text-primary dark:text-[#92adc9] dark:hover:text-white transition-colors">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </header>
  );
}
