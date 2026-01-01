
import React from 'react';

// Ab yahan koi props ya logic nahi chahiye
const Loader = () => {
  return (
    // Fixed position zaroori hai taaki ye sabke upar dikhe
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-orange-600 rounded-full animate-spin"></div>
        
        {/* Text */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white animate-pulse">
          E-<span className="text-orange-600">Hub™</span>
        </h2>
        
      </div>
    </div>
  );
};

export default Loader;