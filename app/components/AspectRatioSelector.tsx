import React from 'react';

interface AspectRatioSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ratios = ["16:9", "9:16", "4:3", "3:4", "1:1"];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
        Aspect Ratio
      </label>
      <div className="grid grid-cols-5 gap-2">
        {ratios.map((ratio) => (
          <button
            key={ratio}
            type="button"
            onClick={() => onChange(ratio)}
            className={`py-2 px-3 rounded-md text-sm font-semibold transition-colors duration-200 ${
              value === ratio
                ? 'bg-amber-400 text-black'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {ratio}
          </button>
        ))}
      </div>
    </div>
  );
};
