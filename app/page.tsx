'use client'

import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [theme, setTheme] = useState('light');
  const router = useRouter();

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

  const handleStartCreating = () => {
    router.push('/image');
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans transition-colors duration-300">
      <LandingPage onStartCreating={handleStartCreating} />
    </div>
  );
}
