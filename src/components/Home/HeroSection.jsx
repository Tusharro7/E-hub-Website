import React from 'react';
import BannerWeb from '../../assets/Banners/Webbanner.webp';
import BannerMobile from '../../assets/Banners/MobileBanner.webp';

const HeroSection = ({ onBannerLoad }) => {
  return (
    <section className='px-4 py-2 md:px-16 md:py-8'>
      
      {/* --- Desktop Banner --- */}
      <img 
        src={BannerWeb} 
        alt="Exclusive Offers and Deals" 
        className='w-full h-auto hidden md:block object-cover rounded-lg shadow-sm'
        
        fetchpriority="high" 
        loading="eager"
        
        onLoad={onBannerLoad}
        onError={onBannerLoad}
      />

      {/* --- Mobile Banner --- */}
      <img 
        src={BannerMobile} 
        alt="Exclusive Offers and Deals" 
        className='w-full h-[50vh] block md:hidden object-cover rounded-lg shadow-sm'
        
        fetchpriority="high"
        loading="eager"
        
        onLoad={onBannerLoad}
        onError={onBannerLoad}
      />

    </section>
  );
}

export default HeroSection;