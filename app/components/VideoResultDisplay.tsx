import React from 'react';
import { Loader } from './Loader';
import { SparklesIcon } from './icons/SparklesIcon';

interface VideoResultDisplayProps {
  generatedVideo: string | null;
  isLoading: boolean;
  progressMessage: string;
}

export const VideoResultDisplay: React.FC<VideoResultDisplayProps> = ({ generatedVideo, isLoading, progressMessage }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700/50 rounded-lg p-4 h-full min-h-[400px] flex flex-col justify-center items-center">
      {isLoading && (
        <div className="text-center">
          <Loader />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-semibold">{progressMessage}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Video generation can take several minutes. Please be patient.</p>
        </div>
      )}
      
      {!isLoading && !generatedVideo && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <SparklesIcon className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your video awaits</h2>
          <p>Describe your vision to bring your room to life with video.</p>
        </div>
      )}

      {!isLoading && generatedVideo && (
        <video src={generatedVideo} controls autoPlay loop className="w-full h-full rounded-md" />
      )}
    </div>
  );
};
