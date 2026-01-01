// import React from 'react'
// import BannerWeb  from  '../../assets/Banners/Webbanner.webp'
// import BannerMobile  from  '../../assets/Banners/MobileBanner.webp'
// const HeroSection = () => {
//   return (
//  <>
//     <div 
//     className='  px-4.5 py-2 rounded   md:px-16 md:py-8  '>
//       <img 
//         src={BannerWeb} 
//         alt="Offers" 
//         className='w-full h-auto hidden md:block object-cover rounded' 
//       />
//       <img 
//         src={BannerMobile} 
//         alt="Offers" 
//         className='w-full h-[50vh] block md:hidden object-cover rounded-lg   shadow-2xs ' 
//       />

//     </div>
//  </>
//   )
// }

// export default HeroSection
import React from 'react';
// Imports sahi hain
import BannerWeb from '../../assets/Banners/Webbanner.webp';
import BannerMobile from '../../assets/Banners/MobileBanner.webp';

const HeroSection = () => {
  return (
    // 'section' tag use karna SEO ke liye better hai bajaye simple 'div' ke
    <section className='px-4 py-2 md:px-16 md:py-8'>
      
      {/* --- Desktop Banner --- */}
      <img 
        src={BannerWeb} 
        alt="Exclusive Offers and Deals" // Thoda descriptive alt text
        className='w-full h-auto hidden md:block object-cover rounded-lg shadow-sm'
        fetchPriority="high" // Isse image jaldi load hogi
      />

      {/* --- Mobile Banner --- */}
      <img 
        src={BannerMobile} 
        alt="Exclusive Offers and Deals" 
        className='w-full h-[50vh] block md:hidden object-cover rounded-lg shadow-sm'
        fetchPriority="high"
      />

    </section>
  );
}

export default HeroSection;
