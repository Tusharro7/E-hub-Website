import React from 'react'
import BannerWeb  from  '../../assets/Banners/Webbanner.webp'
import BannerMobile  from  '../../assets/Banners/Mobilebanner.webp'
const HeroSection = () => {
  return (
 <>
    <div 
    className='  px-4.5 py-2 rounded   md:px-16 md:py-8  '>
      <img 
        src={BannerWeb} 
        alt="Offers" 
        className='w-full h-auto hidden md:block object-cover rounded' 
      />
      <img 
        src={BannerMobile} 
        alt="Offers" 
        className='w-full h-[50vh] block md:hidden object-cover rounded-lg   shadow-2xs ' 
      />

    </div>
 </>
  )
}

export default HeroSection
