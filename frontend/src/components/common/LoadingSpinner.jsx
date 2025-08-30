import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 sm:border-6 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
