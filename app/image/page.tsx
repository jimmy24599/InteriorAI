'use client'

import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { PromptInput } from '../components/PromptInput';
import { GenerateButton } from '../components/GenerateButton';
import { ResultDisplay } from '../components/ResultDisplay';
import { ErrorMessage } from '../components/ErrorMessage';
import { Header } from '../components/Header';
import { redesignImage } from '../../services/geminiService';

export default function ImagePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
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

  useEffect(() => {
    // Clean up object URL when component unmounts or image changes
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(URL.createObjectURL(file));
  };

  const handleGenerate = async () => {
    if (!imageFile || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await redesignImage(imageFile, prompt);
      if (result) {
        setGeneratedImage(result);
      } else {
        setError('Failed to generate image. The model did not return an image.');
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (page: string) => {
    window.location.href = `/${page}`;
  };
  
  const isGenerateDisabled = !imageFile || !prompt || isLoading;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans transition-colors duration-300">
      <Header 
        currentPage="image" 
        onNavigate={handleNavigate} 
        theme={theme} 
        setTheme={setTheme} 
      />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Inputs */}
          <div className="flex flex-col gap-8 bg-white border border-gray-200 p-8 rounded-xl shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Image Studio</h1>
            <ImageUploader onImageUpload={handleImageUpload} />
            <PromptInput value={prompt} onChange={setPrompt} />
            <GenerateButton onClick={handleGenerate} isLoading={isLoading} disabled={isGenerateDisabled}>
              Redesign Image
            </GenerateButton>
            {error && <ErrorMessage message={error} />}
          </div>

          {/* Right Column: Results */}
          <div className="mt-8 md:mt-0 sticky top-24">
             <ResultDisplay
                originalImage={imagePreview}
                generatedImage={generatedImage ? `data:image/png;base64,${generatedImage}` : null}
                isLoading={isLoading}
             />
          </div>
        </div>
      </main>
    </div>
  );
}
