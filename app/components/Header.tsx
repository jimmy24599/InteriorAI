import React from 'react';
import { ModernLogoIcon } from './icons/ModernLogoIcon';
import { ImageIcon } from './icons/ImageIcon';
import { VideoIcon } from './icons/VideoIcon';
import { PlanIcon } from './icons/PlanIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

type Page = 'landing' | 'image' | 'video' | 'plan';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const NavItem: React.FC<{
  page: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ page, currentPage, onNavigate, icon, label }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onNavigate(page)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-amber-500 text-white font-semibold'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <ModernLogoIcon className="w-8 h-8 text-gray-800 dark:text-white" />
          <span className="font-semibold text-xl text-gray-800 dark:text-white hidden sm:block">Interior AI</span>
        </div>
        <nav className="flex items-center justify-center p-1 rounded-lg bg-gray-100 dark:bg-gray-800 space-x-1">
          <NavItem page="image" currentPage={currentPage} onNavigate={onNavigate} icon={<ImageIcon className="w-5 h-5" />} label="Image" />
          <NavItem page="video" currentPage={currentPage} onNavigate={onNavigate} icon={<VideoIcon className="w-5 h-5" />} label="Video" />
          <NavItem page="plan" currentPage={currentPage} onNavigate={onNavigate} icon={<PlanIcon className="w-5 h-5" />} label="Plan" />
        </nav>
        <div className="flex items-center">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                    <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                    <MoonIcon className="w-6 h-6 text-gray-700" />
                )}
            </button>
        </div>
      </div>
    </header>
  );
};
