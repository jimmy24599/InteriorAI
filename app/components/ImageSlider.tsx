import React, { useState, useRef, MouseEvent, TouchEvent, useCallback } from 'react';

interface ImageSliderProps {
  originalImage: string;
  generatedImage: string;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ originalImage, generatedImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);
  
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    handleMove(e.clientX);
  }, [handleMove]);
  
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  };
  
  const handleTouchMove = useCallback((e: globalThis.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseMove, handleTouchMove]);


  return (
    <div className="w-full max-w-full aspect-square relative select-none"
        ref={imageContainerRef}
    >
        <img
            src={generatedImage}
            alt="Generated"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md pointer-events-none"
        />
        <div
            className="absolute top-0 left-0 w-full h-full object-cover rounded-md overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
            <img
                src={originalImage}
                alt="Original"
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
            />
        </div>
        <div
            className="absolute top-0 h-full w-1 bg-amber-400 cursor-ew-resize"
            style={{ left: `calc(${sliderPosition}% - 2px)` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 bg-amber-400 h-8 w-8 rounded-full flex items-center justify-center shadow-lg pointer-events-none">
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
            </div>
        </div>
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded pointer-events-none">BEFORE</div>
        <div className="absolute top-2 right-2 bg-amber-400 text-black text-xs font-bold px-2 py-1 rounded pointer-events-none">AFTER</div>
    </div>
  );
};