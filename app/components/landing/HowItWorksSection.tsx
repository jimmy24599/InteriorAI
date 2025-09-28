import React from 'react';
import { UploadCloudIcon } from '../icons/UploadCloudIcon';
import { TypeIcon } from '../icons/TypeIcon';
import { SparklesIcon } from '../icons/SparklesIcon';

const steps = [
  {
    icon: UploadCloudIcon,
    title: '1. Upload Your Photo',
    description: 'Start with a picture of any room. Good lighting and a clear view will give you the best results.',
  },
  {
    icon: TypeIcon,
    title: '2. Describe Your Vision',
    description: 'Tell our AI what you want. Use descriptive words like "modern", "cozy", or "minimalist".',
  },
  {
    icon: SparklesIcon,
    title: '3. Generate Your Design',
    description: 'Our AI will generate a brand new design based on your photo and prompt in just a few seconds.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section 
        className="py-20"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Simple, Fast, and Magical
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Redesigning your home has never been this easy.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-900/50 border-2 border-amber-400/50 dark:border-amber-400/50 mb-6">
                <step.icon className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};