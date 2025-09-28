import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md my-4" role="alert">
      <strong className="font-bold text-red-100">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
