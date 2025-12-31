import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { allProducts } from '../data/ProductsData'

const SearchResults = () => {
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Safety check: if term undefined
    if(!term) return;

    const lowerTerm = term.toLowerCase();

    const data = allProducts.filter((item) => {
        // ⚠️ SAFETY CHECK ✅
        const name = item.name ? item.name.toLowerCase() : "";
        const category = item.category ? item.category.toLowerCase() : "";
        
        return name.includes(lowerTerm) || category.includes(lowerTerm);
    });
    setFilterData(data);
  }, [term]);

  return (
    <div className='w-full min-h-screen p-4 md:p-10'>
      
      <h1 className='text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white'>
         Search Results for : <span className='text-orange-600'>"{term}"</span>
         <span className='text-sm font-normal text-gray-500 block mt-2'>
            ({filterData.length} products found)
         </span>
      </h1>

      {filterData.length === 0 ? (
          <div className='text-center text-gray-500 mt-20'>
             <h2 className='text-2xl font-bold mb-4 dark:text-gray-400'>No products found 😢</h2>
             <p className='mb-6'>Try searching for "mobile", "Laptop", or "Watch"</p>
             <Link to="/" className='bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition'>
                Go Home
             </Link>
          </div>
      ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
             {filterData.map((item) => (
                <Link 
                    // ✅ Slug Link
                    to={`/product/${item.name.toLowerCase().replace(/\s+/g, '-')}`} 
                    key={item.id} 
                    className='bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 group'
                >
                   <div className='h-40 flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden'>
                       <img 
                          src={item.image} 
                          alt={item.name}
                          className='h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal'
                       />
                   </div>
                   <h3 className='font-semibold text-lg truncate text-gray-800 dark:text-white'>
                      {item.name}
                   </h3>
                   <p className='text-orange-600 font-bold text-lg'>
                      ₹{item.price.toLocaleString()}
                   </p>
                </Link>
             ))}
          </div>
      )}
    </div>
  )
}

export default SearchResults