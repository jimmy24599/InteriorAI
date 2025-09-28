'use client'

import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { PromptInput } from '../components/PromptInput';
import { GenerateButton } from '../components/GenerateButton';
import { VideoResultDisplay } from '../components/VideoResultDisplay';
import { ErrorMessage } from '../components/ErrorMessage';
import { AspectRatioSelector } from '../components/AspectRatioSelector';
import { Header } from '../components/Header';
import { generateVideo } from '../../services/geminiService';

export default function VideoPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get theme from localStorage on client side
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate a video.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedVideo(null);
    setProgressMessage('Starting process...');

    try {
      const result = await generateVideo(prompt, imageFile, aspectRatio, setProgressMessage);
      if (result) {
        setGeneratedVideo(result);
      } else {
        setError('Failed to generate video. The model did not return a video.');
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
      setProgressMessage('');
    }
  };

  const handleNavigate = (page: string) => {
    window.location.href = `/${page}`;
  };

  const isGenerateDisabled = !prompt || isLoading;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans transition-colors duration-300">
      <Header 
        currentPage="video" 
        onNavigate={handleNavigate} 
        theme={theme} 
        setTheme={setTheme} 
      />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-8 bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Video Studio</h1>
            <ImageUploader onImageUpload={setImageFile} />
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              placeholder="e.g., 'A cinematic fly-through of a modern, minimalist living room.'"
            />
            <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
            <GenerateButton onClick={handleGenerate} isLoading={isLoading} disabled={isGenerateDisabled}>
              Generate Video
            </GenerateButton>
            {error && <ErrorMessage message={error} />}
          </div>

          {/* Right Column: Results */}
          <div className="mt-8 md:mt-0 sticky top-24">
            <VideoResultDisplay
              generatedVideo={generatedVideo}
              isLoading={isLoading}
              progressMessage={progressMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
