import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom' 
import { allProducts } from './../../data/ProductsData'
import Error404 from '../../pages/Error404';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';
import { CartContext } from '../../context/cart/CartContex';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebaseConfig'; 

const ProductInformation = () => {
  const { productName } = useParams();
  
  const { addToCart } = useContext(CartContext);
  
  const navigate = useNavigate();

  const [showDetails, setShowDetails] = useState(false);

  const product = allProducts.find(item => {
      const itemSlug = item.name ? item.name.toLowerCase().replace(/\s+/g, '-') : "";
      return itemSlug === productName;
  });

  const [relatedProducts, setRelatedProducts] = useState([]);

  // --- UPDATED HANDLER FUNCTION ---
  const handleAddToCart = () => {
    
    // Check: Kya user login hai?
    if (!auth.currentUser) {
      toast.error("Please Login first to add items! 🔒");
      
      // --- CHANGE: 3 Seconds (3000ms) Timer ---
      setTimeout(() => {
        navigate('/Profile');
      }, 3000);
      
      return; 
    }

    // Agar login hai, to cart mein add karo
    addToCart(product); 
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowDetails(false);

    if (product) {
      const related = allProducts.filter(item => 
          item.category === product.category && item.id !== product.id
      );
      
      const shuffled = related.sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffled.slice(0, 4));
    }
  }, [productName, product]);


  if (!product) {
    return <Error404 />
  }

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />

      <div className="min-h-screen w-full p-4 md:p-10">
        
        <div className="flex flex-col md:mt-10 md:flex-row gap-8 md:gap-16 items-start justify-center max-w-7xl mx-auto cursor-pointer"> 
          
          <div className="w-full md:w-1/2 flex justify-center md:sticky md:top-24 h-fit transition-all">
            <img src={product.image} alt={product.name} className="w-full max-w-md p-4 object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-300 max-h-[50vh]"/>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold capitalize">{product.name}</h2>
            <p className="text-2xl text-slate-700 dark:text-slate-300 font-bold">Price: ₹{product.price.toLocaleString()}</p>
            {product.ram && (
              <h1 className=" text-md gap-2 md:text-lg font-bold text-gray-800 dark:text-slate-300 border border-gray-300 p-2 rounded w-fit">
                {product.ram} | {product.storage} | {product.battery}
              </h1>
            )}
            <div className="mt-4">
              <span className="font-bold text-gray-800 dark:text-slate-300">About this item:</span>
              <p className="text-slate-400 mt-2 leading-relaxed text-justify">{product.about}</p>
            </div>
            
            {/* Button Function call */}
            <button 
                onClick={handleAddToCart}
                className="mt-6 w-full md:w-auto bg-orange-600 text-white py-3 px-8 rounded-lg hover:bg-orange-700 transition duration-300 font-semibold cursor-pointer active:scale-95 shadow-lg"
            >
                Add to Cart
            </button>
            
              <p className='flex w-full items-center justify-center text-center text-slate-700 dark:text-slate-300 mt-4 cursor-pointer hover:text-orange-600 select-none '
                onClick={() => setShowDetails(!showDetails)}
              > 
                {showDetails ? "Hide Details" : "Show more Details"}
                {showDetails ? <BiUpArrowAlt className='ml-1'/> : <BiDownArrowAlt className='ml-1'/>}
              </p>

             {showDetails && (
              <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 animate-fadeIn">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Technical Details:</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                     <li className='flex gap-2'><span className='font-semibold'>Brand:</span> {product.brand}</li>
                     {product.processor && <li className='flex gap-2'><span className='font-semibold'>Processor:</span> {product.processor}</li>}
                     {product.ram && <li className='flex gap-2'><span className='font-semibold'>Ram:</span> {product.ram}</li>}
                     {product.rom && <li className='flex gap-2'><span className='font-semibold'>Rom:</span> {product.rom}</li>}
                     {product.storage && <li className='flex gap-2'><span className='font-semibold'>Storage:</span> {product.storage}</li>}
                     {product.camera && <li className='flex gap-2'><span className='font-semibold'>Camera:</span> {product.camera}</li>}
                     {product.waterproof && <li className='flex gap-2'><span className='font-semibold'>Waterproof:</span> {product.waterproof}</li>}
                     {product.rating && <li className='flex gap-2'><span className='font-semibold'>Rating:</span> {product.rating}*</li>}
                  </ul>
              </div>
            )}

          </div>  
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className='mt-20 max-w-7xl mx-auto'>
            <h1 className='text-center text-2xl md:text-3xl capitalize font-semibold mb-8 text-gray-800 dark:text-white'>You might also like</h1>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8'>
              {relatedProducts.map((item) => (
                <Link 
                  to={`/product/${item.name.toLowerCase().replace(/\s+/g, '-')}`} 
                  key={item.id}
                  className='bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 group'
                >
                   <div className='h-32 md:h-40 flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-lg mb-3 overflow-hidden'>
                      <img src={item.image} alt={item.name} className='h-full w-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal'/>
                   </div>
                   <h3 className='font-semibold text-sm md:text-lg truncate text-gray-800 dark:text-white'>{item.name}</h3>
                   <p className='text-slate-900 dark:text-slate-300 font-bold text-sm md:text-base'>₹{item.price.toLocaleString()}/-</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductInformation