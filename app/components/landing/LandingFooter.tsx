import React from 'react';
import { ModernLogoIcon } from '../icons/ModernLogoIcon';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-900">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <ModernLogoIcon className="w-7 h-7 text-gray-800 dark:text-white" />
          <span className="font-semibold text-lg text-gray-800 dark:text-white">Interior AI</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          © 2024 Interior AI. All rights reserved. AI for everyone.
        </p>
      </div>
    </footer>
  );
};