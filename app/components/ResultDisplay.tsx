import React from 'react';
import { Loader } from './Loader';
import { ImageSlider } from './ImageSlider';
import { SparklesIcon } from './icons/SparklesIcon';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700/50 rounded-lg p-4 h-full min-h-[400px] flex flex-col justify-center items-center">
      {isLoading && <Loader />}
      
      {!isLoading && !generatedImage && (
        <div className="text-center text-gray-500 dark:text-gray-400">
            <SparklesIcon className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your new room awaits</h2>
            <p>Upload an image and describe your style to see the magic happen.</p>
        </div>
      )}

      {!isLoading && originalImage && generatedImage && (
        <ImageSlider
          originalImage={originalImage}
          generatedImage={generatedImage}
        />
      )}
    </div>
  );
};