import React from 'react';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

interface HeroSectionProps {
  onStartCreating: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartCreating }) => {
  return (
    <section 
        className="pt-40 pb-20"
        style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1), transparent 70%)"
        }}
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tighter">
          Redesign Your Space <br/> with a Touch of AI
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload a photo of your room, describe your dream style, and let our AI generate stunning, realistic redesigns in seconds.
        </p>
        <div className="mt-10">
          <button
            onClick={onStartCreating}
            className="inline-flex items-center justify-center py-4 px-8 bg-amber-400 text-black font-bold rounded-md hover:bg-amber-500 transition-colors duration-300 uppercase tracking-wider text-base"
          >
            <span>Get Started For Free</span>
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};
