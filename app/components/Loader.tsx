import React from 'react';

interface LoaderProps {
  small?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ small = false }) => {
  const sizeClasses = small ? 'h-5 w-5 border-2' : 'h-12 w-12 border-4';
  const containerClasses = small ? '' : 'flex justify-center items-center py-8';
  
  return (
    <div className={containerClasses}>
      <div
        className={`animate-spin rounded-full ${sizeClasses} border-amber-400 border-t-transparent`}
      ></div>
    </div>
  );
};