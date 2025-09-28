import React from 'react';
import { LandingHeader } from './landing/LandingHeader';
import { HeroSection } from './landing/HeroSection';
import { ExamplesSection } from './landing/ExamplesSection';
import { HowItWorksSection } from './landing/HowItWorksSection';
import { FinalCTASection } from './landing/FinalCTASection';
import { LandingFooter } from './landing/LandingFooter';

interface LandingPageProps {
  onStartCreating: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartCreating }) => {
  return (
    <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 left-0 right-0 h-[100vh] bg-gradient-to-br from-amber-50 dark:from-slate-900 via-white dark:via-slate-900 to-white dark:to-slate-800 -z-10"></div>
        <LandingHeader onStartCreating={onStartCreating} />
        <main>
            <HeroSection onStartCreating={onStartCreating} />
            <ExamplesSection />
            <HowItWorksSection />
            <FinalCTASection onStartCreating={onStartCreating} />
        </main>
        <LandingFooter />
    </div>
  );
};
