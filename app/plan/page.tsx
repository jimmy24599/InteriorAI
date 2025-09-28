'use client'

import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { GenerateButton } from '../components/GenerateButton';
import { PlanResultDisplay } from '../components/PlanResultDisplay';
import { ErrorMessage } from '../components/ErrorMessage';
import { Header } from '../components/Header';
import { analyzeHomePlan } from '../../services/geminiService';

export default function PlanPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
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
    if (!imageFile) {
      setError('Please upload a floor plan image to analyze.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    try {
      const result = await analyzeHomePlan(imageFile);
      if (result) {
        setGeneratedPlan(result);
      } else {
        setError('Failed to analyze plan. The model did not return a valid analysis.');
      }
    } catch (err: any)      {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (page: string) => {
    window.location.href = `/${page}`;
  };

  const isGenerateDisabled = !imageFile || isLoading;

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans transition-colors duration-300">
      <Header 
        currentPage="plan" 
        onNavigate={handleNavigate} 
        theme={theme} 
        setTheme={setTheme} 
      />
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* New Horizontal Input Card */}
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <ImageUploader onImageUpload={setImageFile} />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">Home Plan Analyzer</h1>
              <p className="text-gray-600">
                Upload a clear image of your floor plan. Our AI will analyze the layout, identify rooms, and extract measurements and key features for you.
              </p>
            </div>
          </div>

          {/* Centered Button */}
          <div className="w-full md:w-1/2 self-center">
              <GenerateButton onClick={handleGenerate} isLoading={isLoading} disabled={isGenerateDisabled}>
                  Analyze Plan
              </GenerateButton>
          </div>

          {error && <ErrorMessage message={error} />}

          {/* Results section now appears below */}
          {(isLoading || generatedPlan) && (
            <div className="mt-4">
              <PlanResultDisplay
                planJson={generatedPlan}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
