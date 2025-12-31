import React, { useEffect } from 'react';

// 'onFinish' wo function hai jo App.jsx se aayega
const Loader = ({ onFinish }) => {

  useEffect(() => {
    // Logic wahi same hai
    const timerPromise = new Promise((resolve) => setTimeout(resolve, 1500));
    
    const loadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });

    Promise.all([timerPromise, loadPromise]).then(() => {
      // Jab dono kaam ho jaye, to Parent (App.jsx) ko bata do
      onFinish(); 
    });

  }, []); // Empty dependency array taaki sirf ek baar chale

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950">
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