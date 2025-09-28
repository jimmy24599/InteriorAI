import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, placeholder, rows = 4 }) => {
  return (
    <div>
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
        Describe your vision
      </label>
      <textarea
        id="prompt"
        rows={rows}
        className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-md p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder={placeholder || "e.g., 'A cozy, modern living room with a fireplace and plenty of natural light.'"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};