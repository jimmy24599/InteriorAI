import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
      // Clean up previous preview URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files ? e.target.files[0] : null);
  };
  
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    handleFile(e.dataTransfer.files ? e.dataTransfer.files[0] : null);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
        isDragActive ? 'border-amber-400 bg-gray-100 dark:bg-gray-800/50' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="mx-auto max-h-64 rounded-md" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Drag & drop or click to replace image</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
          <UploadIcon className="w-12 h-12 mb-4" />
          <p className="font-semibold text-gray-800 dark:text-white">Drag & drop your image here</p>
          <p className="text-sm">or click to browse</p>
          <p className="text-xs mt-2">(PNG, JPG, WEBP recommended)</p>
        </div>
      )}
    </div>
  );
};