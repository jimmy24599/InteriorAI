import React from 'react';
import { Loader } from './Loader';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  children?: React.ReactNode;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, isLoading, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full flex items-center justify-center py-3 px-6 bg-amber-500 text-white font-bold rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900 focus:ring-amber-500 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-wider text-sm"
    >
      {isLoading ? (
        <>
          <Loader small={true} />
          <span className="ml-2">Generating...</span>
        </>
      ) : (
        <>
          <span>{children || 'Generate'}</span>
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </>
      )}
    </button>
  );
};
