
import React from 'react'
import { Link } from 'react-router-dom'
import MobileImg from './ProductsImage/PhoneImage.webp'
import LaptopImg from './ProductsImage/LaptopImage.webp'
import SmartWatchImg from './ProductsImage/SmartWatch.webp'
import SoundImg from './ProductsImage/Sounds.webp'

function ProductHome() {
  const categories = [
    { name: "Mobiles", img: MobileImg, path: "/category/mobile" },
    { name: "Laptops", img: LaptopImg, path: "/category/laptop" },
    { name: "Smartwatches", img: SmartWatchImg, path: "/category/smartwatch" }, // Spelling Fixed
    { name: "Headphones", img: SoundImg, path: "/category/headphone" },
  ];

  return (
    <div className='px-4 md:px-16 py-8'> {/* Side padding badhayi taaki desktop pe chipke nahi */}
      
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
        {categories.map((item, index) => (
          <Link 
            to={item.path} 
            key={index}
            // "group" class hover effect ke liye zaroori hai
            className='group block bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300'
          >
              {/* --- IMAGE CONTAINER --- */}
              {/* md:h-48 use kiya taaki desktop par height fix rahe aur chapti na ho */}
              <div className='h-32 md:h-56 w-full bg-gray-50 dark:bg-gray-800 overflow-hidden relative'>
                  <img 
                    // object-cover: Image ko kaat ke frame fill karega (chapti nahi hogi)
                    className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-500'  
                    src={item.img}
                    alt={item.name} 
                  />
                  
                  {/* Overlay (Optional: Thoda dark shade taaki text pop ho) */}
                  <div className='absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors'></div>
              </div>
              
              {/* --- NAME SECTION --- */}
              <div className='p-4 text-center'>
                 <p className='text-sm md:text-lg font-semibold text-gray-700 dark:text-gray-200 tracking-wide'>
                    {item.name}
                 </p>
                 <p className='text-xs text-orange-600 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0'>
                    Explore Now →
                 </p>
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductHome