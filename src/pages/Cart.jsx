import React, { useContext } from 'react'
import { CartContext } from '../context/cart/CartContex' // Context Import
import { Link } from 'react-router-dom'
import { BiMinus, BiPlus, BiTrash } from 'react-icons/bi' // Icons

const Cart = () => {
  // 1. CHANGE: Extract 'cartItems' instead of 'cart'
  const { cartItems, removeFromCart, addToCart, decrement, clearCart } = useContext(CartContext);

  // 2. CHANGE: Use 'cartItems' for total price calculation
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // --- EMPTY STATE (Agar Cart Khali hai) ---
  // 3. CHANGE: Check 'cartItems.length'
  if (cartItems.length === 0) {
    return (
      <div className='min-h-[80vh] flex flex-col items-center justify-center text-center px-4'>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
          // src='https://www.flaticon.com/free-icon/shopping_13637462?term=cart&page=1&position=76&origin=tag&related_id=13637462'
          alt="Empty Cart" 
          className='w-40 h-40 mb-6 opacity-50'
        />
        <h2 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>Your Cart is Empty</h2>
        <p className='text-gray-500 mb-6'>Looks like you haven't added anything yet.</p>
        <Link to="/" className='bg-orange-600 text-white px-8 py-3 rounded-full hover:bg-orange-700 transition font-semibold shadow-lg'>
            Start Shopping
        </Link>
      </div>
    )
  }

  // MAIN CART 
  return (
    <div className='min-h-screen max-w-7xl mx-auto p-4 md:p-10'>
      
      {/* 4. CHANGE: Display 'cartItems.length' */}
      <h1 className='text-3xl font-bold mb-8 text-gray-800 dark:text-white'>Shopping Cart ({cartItems.length} items)</h1>

      <div className='flex flex-col md:flex-row gap-8'>
        
        {/* --- LEFT SIDE: CART ITEMS LIST --- */}
        <div className='w-full md:w-2/3 flex flex-col gap-4'>
            {/* 5. CHANGE: Map over 'cartItems' */}
            {cartItems.map((item) => (
               <div key={item.id} className='flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800'>
                  
                  {/* Image & Name */}
                  <div className='flex items-center gap-4 md:gap-6 flex-1'>
                      <div className='w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center p-2'>
                         <img src={item.image} alt={item.name} className='w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal'/>
                      </div>
                      <div>
                         <h3 className='font-bold text-gray-800 dark:text-white line-clamp-1'>{item.name}</h3>
                         <p className='text-sm text-gray-500'>{item.brand}</p>
                         <p className='font-bold text-orange-600 md:hidden mt-1'>₹{item.price.toLocaleString()}</p>
                      </div>
                  </div>

                  {/* Quantity Controls & Price (Desktop) */}
                  <div className='flex items-center gap-6'>
                      
                      {/* Plus/Minus Buttons */}
                      <div className='flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full'>
                          <button onClick={() => decrement(item.id)} className='p-1 hover:text-orange-600 dark:text-white transition'>
                             <BiMinus />
                          </button>
                          <span className='font-bold w-4 text-center dark:text-white'>{item.quantity}</span>
                          {/* addToCart ko hi use karke quantity badha rahe hain */}
                          <button onClick={() => addToCart(item)} className='p-1 hover:text-orange-600 dark:text-white transition'>
                             <BiPlus />
                          </button>
                      </div>

                      {/* Price (Desktop Only) */}
                      <p className='hidden md:block font-bold text-gray-800 dark:text-white text-lg w-24 text-right'>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>

                      {/* Delete Button */}
                      <button onClick={() => removeFromCart(item.id)} className='text-red-500 hover:bg-red-50 p-2 rounded-full transition'>
                          <BiTrash className='text-xl'/>
                      </button>
                  </div>

               </div>
            ))}

            {/* Clear Cart Button */}
            <button onClick={clearCart} className='text-red-500 text-sm font-semibold hover:underline self-start mt-2'>
                Clear Cart
            </button>
        </div>

        {/* --- RIGHT SIDE: BILL SUMMARY --- */}
        <div className='w-full md:w-1/3'>
           <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24'>
              <h2 className='text-xl font-bold mb-6 text-gray-800 dark:text-white'>Order Summary</h2>
              
              <div className='flex justify-between mb-4 text-gray-600 dark:text-gray-400'>
                 <span>Subtotal</span>
                 <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className='flex justify-between mb-4 text-gray-600 dark:text-gray-400'>
                 <span>Shipping</span>
                 <span className='text-green-600 font-medium'>Free</span>
              </div>
              <div className='flex justify-between mb-6 text-gray-600 dark:text-gray-400'>
                 <span>Tax (Included)</span>
                 <span>₹0</span>
              </div>
              
              <hr className='border-gray-200 dark:border-gray-700 mb-6'/>

              <div className='flex justify-between mb-6 text-xl font-bold text-gray-800 dark:text-white'>
                 <span>Total</span>
                 <span>₹{totalPrice.toLocaleString()}</span>
              </div>

              <button className='w-full bg-orange-600 text-white py-3.5 rounded-lg font-bold hover:bg-orange-700 transition shadow-lg active:scale-95'>
                 Proceed to Checkout
              </button>
           </div>
        </div>

      </div>
    </div>
  )
}

export default Cart