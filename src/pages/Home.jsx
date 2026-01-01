// import React from 'react'
// import HeroSection from '../components/Home/HeroSection'
// import ProductHome from '../components/Home/ProductHome'

// function Home() {
//   return (
// <>
// <div 
// className='gap-2'>
// <HeroSection />
// <ProductHome/>
// </div>
// </>
//   )
// }

// export default Home
// import React, { Suspense, lazy } from 'react'

// // 1. HeroSection ko dynamic (lazy) import karein
// const HeroSection = lazy(() => import('../components/Home/HeroSection'))

// // ProductHome ko normal hi rakhein agar wo immediately dikhana hai
// import ProductHome from '../components/Home/ProductHome'

// function Home() {
//   return (
//     <>
//       <div className='gap-2'>
//         {/* 2. Suspense wrapper lagayein aur fallback (loader) define karein */}
//         <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading Banner...</div>}>
//           <HeroSection />
//         </Suspense>

//         <ProductHome />
//       </div>
//     </>
//   )
// }
// export default Home

// import React, { useEffect, useState } from 'react'
// import HeroSection from '../components/Home/HeroSection'
// import ProductHome from '../components/Home/ProductHome'

// // props mein 'setGlobalLoading' receive karein jo App.js se aaya hai
// function Home({ setGlobalLoading }) {
  
//   const [isBannerLoaded, setIsBannerLoaded] = useState(false);

//   // Jab image load ho jaye, ye function call hoga
//   const handleBannerLoad = () => {
//     setIsBannerLoaded(true);
//   };

//   useEffect(() => {
//     if (isBannerLoaded) {
//       // Image load ho gayi! Ab Loader band kar do.
//       // Thoda smooth feel dene ke liye 500ms ka delay rakh sakte hain
//       setTimeout(() => {
//         if (setGlobalLoading) setGlobalLoading(false);
//       }, 500); 
//     }
    
//     // Safety Check: Agar 5 second tak image load na ho, tab bhi loader hata do
//     // (Taaki user phase na rahe)
//     const safetyTimer = setTimeout(() => {
//         if (setGlobalLoading) setGlobalLoading(false);
//     }, 5000);

//     return () => clearTimeout(safetyTimer);

//   }, [isBannerLoaded, setGlobalLoading]);

//   return (
//     <div className='gap-2'>
//       {/* onBannerLoad prop pass karein */}
//       <HeroSection onBannerLoad={handleBannerLoad} />
//       <ProductHome/>
//     </div>
//   )
// }

// export default Home
import React, { useEffect, useState } from 'react'
import HeroSection from '../components/Home/HeroSection'
import ProductHome from '../components/Home/ProductHome'

// 1. Hook import karein
import { useLoader } from '../context/Loader/LoaderContext';

function Home() {
  // 2. Context se function nikalein
  const { setIsLoading } = useLoader();
  const [isBannerLoaded, setIsBannerLoaded] = useState(false);

  const handleBannerLoad = () => {
    setIsBannerLoaded(true);
  };

  useEffect(() => {
    if (isBannerLoaded) {
      // Thoda smooth delay
      const timer = setTimeout(() => {
         setIsLoading(false); // Context ka function call kiya
      }, 500);
      return () => clearTimeout(timer);
    }

    // Safety timer (5 sec)
    const safety = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(safety);

  }, [isBannerLoaded, setIsLoading]);

  return (
    <div className='gap-2'>
      <HeroSection onBannerLoad={handleBannerLoad} />
      <ProductHome/>
    </div>
  )
}

export default Home