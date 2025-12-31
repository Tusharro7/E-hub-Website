import React from 'react'
import ProductHome from '../components/Home/ProductHome' 

function Category() {
  return (
    <div className='min-h-[80vh] w-full px-4 py-10 md:px-16 bg-white dark:bg-gray-950 transition-colors'>
      <div className='text-center mb-10'>
         <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>
            Explore Categories
         </h1>
         <p className='text-gray-500 dark:text-gray-400'>
            Select a category to view products
         </p>
      </div>
      <ProductHome />
    </div>
  )
}
  
export default Category