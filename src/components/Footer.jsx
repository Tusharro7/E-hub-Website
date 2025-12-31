import React from 'react'
import { useLocation } from 'react-router-dom' 

const Footer = () => {
  const location = useLocation(); 

  const hiddenRoutes = ["/login", "/signup", "/admin" , "/Profile","/Cart "];


  if (hiddenRoutes.includes(location.pathname)) {
    return null; 
  }

  return (
    <div className='w-full  flex flex-col justify-center items-center bg-gray-200 text-gray-950 dark:bg-slate-800 dark:text-slate-200   dark:border-gray-700 pb-[10vh] md:pb-2 md:bottom-0'>
      <p className='font-semibold'>
        E-Hub™
      </p>
      <p className='text-sm mt-1'>© 2025 All Rights Reserved</p>
      <p className='text-xs mt-2 text-gray-500 dark:text-gray-400'>
        Created with React & Tailwind by Tushar Makavana
      </p>
    </div>
  )
}

export default Footer