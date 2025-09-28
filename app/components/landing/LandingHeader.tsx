import React from 'react';
import { ModernLogoIcon } from '../icons/ModernLogoIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

interface LandingHeaderProps {
  onStartCreating: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onStartCreating }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 h-24 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <ModernLogoIcon className="w-8 h-8 text-gray-800 dark:text-white" />
          <span className="font-semibold text-xl text-gray-800 dark:text-white">Interior AI</span>
        </div>
        <button
            onClick={onStartCreating}
            className="hidden sm:inline-flex items-center justify-center py-2 px-5 bg-amber-400 text-black font-bold rounded-md hover:bg-amber-500 transition-colors duration-300 uppercase tracking-wider text-sm"
          >
            <span>Start Creating</span>
            <ArrowRightIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    </header>
  );
};
