import React from 'react';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

interface FinalCTASectionProps {
  onStartCreating: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onStartCreating }) => {
  return (
    <section 
        className="py-20"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter">
          Ready to See Your Dream Room?
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Stop wondering and start creating. Your new interior is just a click away.
        </p>
        <div className="mt-8">
          <button
            onClick={onStartCreating}
            className="inline-flex items-center justify-center py-4 px-8 bg-amber-400 text-black font-bold rounded-md hover:bg-amber-500 transition-colors duration-300 uppercase tracking-wider text-base"
          >
            <span>Start Designing Now</span>
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};