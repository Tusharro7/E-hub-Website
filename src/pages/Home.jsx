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
import React, { Suspense, lazy } from 'react'

// 1. HeroSection ko dynamic (lazy) import karein
const HeroSection = lazy(() => import('../components/Home/HeroSection'))

// ProductHome ko normal hi rakhein agar wo immediately dikhana hai
import ProductHome from '../components/Home/ProductHome'

function Home() {
  return (
    <>
      <div className='gap-2'>
        {/* 2. Suspense wrapper lagayein aur fallback (loader) define karein */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading Banner...</div>}>
          <HeroSection />
        </Suspense>

        <ProductHome />
      </div>
    </>
  )
}

export default Home