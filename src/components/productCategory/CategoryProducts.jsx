import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom' // 👈 CHANGE 1: Link Import kiya
import { allProducts } from './../../data/ProductsData'

const CategoryProducts = () => {
    const { categoryName } = useParams();

    // --- PAGINATION SETTINGS ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const categoryData = allProducts.filter(item => item.category === categoryName);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = categoryData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(categoryData.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [categoryName]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className='p-8 mt-5 '>
            <h1 className='text-3xl font-bold capitalize mb-8 text-center text-gray-800 dark:text-white'>
                {categoryName} Collection
                <span className='text-sm font-normal text-gray-500 ml-2 block mt-1'>
                    ({categoryData.length} Products found)
                </span>
            </h1>

            {/* --- GRID VIEW --- */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
                {currentProducts.map((item) => (


                    <Link
                        to={`/product/${item.id , item.name.toLowerCase().replace(/\s+/g, '-')}`} // Ye user ko /product/1 par le jayega
                        key={item.id}
                        className='bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group block'
                    >
                        {/* Image container */}
                        <div className='h-48 w-full bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4 overflow-hidden'>
                            <img
                                src={item.image}
                                alt={item.name}
                                className='h-40 w-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500'
                            />
                        </div>

                        <h3 className='font-semibold text-lg truncate dark:text-white mb-1'>{item.name}</h3>
                        <p className='text-slate-700 dark:text-gray-300 font-bold text-sm md:text-xl flex justify-between items-center '>₹{item.price.toLocaleString()}/-

                            {
                                item.oldPrice && (
                                    <span
                                        className='text-gray-900 font-normal     dark:text-gray-300 opacity-60 line-clamp-1 text-sm line-through '>₹{item.oldPrice}/-
                                    </span>
                                )
                            }
                        </p>
                    </Link>
                ))}
            </div>

            {currentProducts.length === 0 && <p className='text-center mt-10 text-gray-500'>No items found.</p>}

            {/* PAGINATION BUTTON */}
            {categoryData.length > itemsPerPage && (
                <div className='flex justify-center items-center gap-6 mt-16 mb-10'>
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`px-6 py-2 rounded-full border border-black font-medium transition-all duration-300 ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-black hover:text-white shadow-md'
                            }`}
                    >
                        ←
                    </button>

                    <span className='font-bold text-lg text-black dark:text-white'>
                        {currentPage} <span className='text-gray-400 font-normal text-sm'>/ {totalPages}</span>
                    </span>

                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`px-6 py-2 rounded-full border border-black font-medium transition-all duration-300 ${currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-black hover:text-white shadow-md'
                            }`}
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    )
}

export default CategoryProducts