// import React, { useContext, useState, useEffect } from 'react'
// import { BiCategory, BiHome } from 'react-icons/bi'
// import { BsMoonStars, BsMoonStarsFill } from 'react-icons/bs'
// import { CgProfile } from 'react-icons/cg'
// import { FcLike } from 'react-icons/fc'
// import { FiShoppingCart } from 'react-icons/fi'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { ThemeData } from '../context/Themes/ThemeContex'
// import { TbSearch, TbX } from 'react-icons/tb'
// import { FaChevronDown } from 'react-icons/fa' 
// import { allProducts } from '../data/ProductsData'

// function Navbar() {
//   const { theme, toggleTheme } = useContext(ThemeData);
//   const [showSearch, setShowSearch] = useState(false);
//   const navigate = useNavigate();

//   // --- STATES ---
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedTerm, setDebouncedTerm] = useState(""); 
//   const [suggestions, setSuggestions] = useState([]);

//   const categories = [
//     { name: "Mobiles", link: "/category/mobile" },
//     { name: "Laptops", link: "/category/laptop" },
//     { name: "Smartwatches", link: "/category/smartwatch" },
//     { name: "Headphones", link: "/category/headphone" },
//   ];

//   // --- LOGIC: DEBOUNCING ---
//   useEffect(() => {
//     const timerId = setTimeout(() => {
//         setDebouncedTerm(searchTerm); 
//     }, 300);

//     return () => {
//         clearTimeout(timerId);
//     };
//   }, [searchTerm]);

//   // --- LOGIC: FILTERING (With Safety Check ✅) ---
//   useEffect(() => {
//     if (debouncedTerm.length > 0) {
//         const lowerTerm = debouncedTerm.toLowerCase();
        
//         const filtered = allProducts.filter((item) => {
//             // ⚠️ FIX: Check kar rahe hain ki name/category exist karta hai ya nahi
//             const name = item.name ? item.name.toLowerCase() : "";
//             const category = item.category ? item.category.toLowerCase() : "";
            
//             return name.includes(lowerTerm) || category.includes(lowerTerm);
//         });
        
//         setSuggestions(filtered.slice(0, 5));
//     } else {
//         setSuggestions([]);
//     }
//   }, [debouncedTerm]);

//   // --- HANDLERS ---
//   const handleInput = (e) => {
//     setSearchTerm(e.target.value);
//   }

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//         navigate(`/search/${searchTerm}`);
//         setShowSearch(false);
//         setSuggestions([]);
//         setDebouncedTerm(searchTerm);
//     }
//   }

//   // ✅ UPDATED HANDLER: Product Name se URL banayega
//   const handleSuggestionClick = (item) => {
//      // Slug Creation: "iPhone 15" -> "iphone-15"
//      const slug = item.name.toLowerCase().replace(/\s+/g, '-');
     
//      navigate(`/product/${slug}`);
//      setShowSearch(false);
//      setSearchTerm("");
//      setSuggestions([]);
//   }

//   return (
//     <>
//       <div className='sticky top-0 z-50 bg-white dark:bg-gray-950 dark:text-white shadow-md transition-colors duration-300'>
        
//         <div className='h-[10vh] flex justify-between items-center px-4 md:px-16 border-b dark:border-gray-800'>
          
//           {/* LOGO (Original) */}
//           <Link to='/'>
//             <h1 className='text-2xl font-bold text-orange-600 dark:text-orange-500 cursor-pointer'>
//               E-<span className='font-semibold text-xl '>Hub™ </span>
//             </h1>
//           </Link>

//           {/* DESKTOP MENU */}
//           <div className='hidden gap-6 md:flex font-medium items-center'>
//             <NavLink to='/' className={({isActive}) => isActive ? "text-orange-600" : "hover:text-orange-600"}>Home</NavLink>

//             {/* DROPDOWN */}
//             <div className="relative group cursor-pointer h-full flex items-center">
//                 <div className="flex items-center gap-1 hover:text-orange-600 transition-colors py-4">
//                   <span>Category</span>
//                   <FaChevronDown className="text-xs group-hover:rotate-180 transition-transform duration-300" />
//                 </div>
//                 <div className="absolute top-full -left-4 pt-5 w-48 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50">
//                   <div className='bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg shadow-xl overflow-hidden'>
//                       <div className="absolute -top-1 left-8 w-3 h-3 bg-white dark:bg-gray-900 rotate-45 border-t border-l dark:border-gray-800"></div>
//                       <div className="flex flex-col py-2">
//                         {categories.map((cat, index) => (
//                           <Link key={index} to={cat.link} className="px-5 py-3 text-sm hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-600 dark:text-gray-300 transition-colors">
//                             {cat.name}
//                           </Link>
//                         ))}
//                       </div>
//                   </div>
//                 </div>
//             </div>

//             <NavLink to='/Contact' className={({isActive}) => isActive ? "text-orange-600" : "hover:text-orange-600"}>Contact</NavLink>
//           </div>

//           {/* --- DESKTOP SEARCH BAR --- */}
//           <div className='relative hidden md:block'>
//               <form onSubmit={handleSearchSubmit} className='flex gap-1 border dark:border-gray-600 rounded-lg px-2 py-1 text-center'>
//                 <input 
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleInput}
//                   className='bg-transparent outline-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 w-48'
//                   placeholder='Search Products...' 
//                 />
//                 <button type="submit" className='cursor-pointer text-orange-600 dark:text-orange-500'> 
//                   <TbSearch className='text-xl'/>
//                 </button>
//               </form>

//               {/* DESKTOP SUGGESTIONS */}
//               {suggestions.length > 0 && (
//                  <div className='absolute top-full left-0 w-full mt-2 rounded-lg shadow-xl overflow-hidden z-50
//                                  bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-700'>
//                     {suggestions.map((item) => (
//                         <div 
//                            key={item.id}
//                            // ✅ Pura item pass kiya
//                            onClick={() => handleSuggestionClick(item)}
//                            className='px-4 py-2 hover:bg-orange-50/50 dark:hover:bg-gray-800/50 cursor-pointer text-sm flex items-center gap-2 border-b border-gray-100/50 dark:border-gray-700/50 last:border-none'
//                         >
//                             <img src={item.image} alt="" className='w-8 h-8 object-contain mix-blend-multiply dark:mix-blend-normal'/>
//                             <span className='truncate font-medium'>{item.name}</span>
//                         </div>
//                     ))}
//                  </div>
//               )}
//           </div>

//           {/* RIGHT ICONS */}
//           <div className='flex items-center gap-5'>
//             <button onClick={() => setShowSearch(!showSearch)} className='md:hidden cursor-pointer text-orange-600 dark:text-orange-500'> 
//               <TbSearch className='text-2xl'/>
//             </button>
//             <Link to='/watchList' className='flex md:hidden'><FcLike className='text-2xl' /></Link>
//             <button onClick={toggleTheme} className='text-xl active:scale-95 cursor-pointer'>
//               {theme === "light" ? <BsMoonStarsFill/> :<BsMoonStars/> }
//             </button>
//             <Link to='/Cart' className='hidden md:flex relative'><FiShoppingCart className='text-xl' /></Link>
//             <Link to='/Profile' className='hidden md:flex text-center items-center gap-x-1'><CgProfile className='text-xl' /><span>Login</span></Link>
//           </div>
//         </div>

//         {/* --- MOBILE SEARCH BAR --- */}
//         {showSearch && (
//           <div className='md:hidden px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 animate-fade-in-down'>
              
//               <form onSubmit={handleSearchSubmit} className='flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-950'>
//                 <TbSearch className='text-gray-400 text-xl mr-2'/>
//                 <input 
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleInput}
//                   className='flex-1 bg-transparent outline-none text-sm dark:text-white'
//                   placeholder='Search for products...' 
//                   autoFocus 
//                 />
//                 <button type="button" onClick={() => {setShowSearch(false); setSuggestions([]);}} className='text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors ml-2 p-1'>
//                   <TbX className='text-xl'/>
//                 </button>
//               </form>

//               {/* MOBILE SUGGESTIONS */}
//               {suggestions.length > 0 && (
//                  <div className='mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto
//                                  bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border border-gray-200 dark:border-gray-800'>
//                     {suggestions.map((item) => (
//                         <div 
//                            key={item.id}
//                            // ✅ Pura item pass kiya
//                            onClick={() => handleSuggestionClick(item)}
//                            className='px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 active:bg-gray-100 dark:active:bg-gray-800'
//                         >
//                             <img src={item.image} alt="" className='w-8 h-8 object-contain'/>
//                             <span className='text-sm font-medium'>{item.name}</span>
//                         </div>
//                     ))}
//                  </div>
//               )}
//           </div>
//         )}

//       </div>
      
//       {/* Mobile Bottom Bar */}
//       <div className='fixed md:hidden py-1.5 border-t border-gray-200 dark:border-gray-800 bottom-0 w-full flex justify-between items-center bg-white dark:bg-gray-950 dark:text-white z-50 px-6'>
//          <Link to='/' className='flex flex-col gap-1 items-center'><BiHome className='text-xl' /><span className='text-[10px]'>Home</span></Link>
//          <Link to='/Category' className='flex flex-col gap-1 items-center'><BiCategory className='text-xl' /><span className='text-[10px]'>Category</span></Link>
//          <Link to='/Cart' className='flex flex-col gap-1 items-center relative'><FiShoppingCart className='text-xl' /><span className='text-[10px]'>Cart</span></Link>
//          <Link to='/Profile' className='flex flex-col gap-1 items-center'><CgProfile className='text-xl' /><span className='text-[10px]'>Profile</span></Link>
//       </div>
//     </>
//   )
// }

// export default Navbar

// import React, { useContext, useState, useEffect } from 'react'
// import { BiCategory, BiHome } from 'react-icons/bi'
// import { BsMoonStars, BsMoonStarsFill } from 'react-icons/bs'
// import { CgProfile } from 'react-icons/cg'
// import { FcLike } from 'react-icons/fc'
// import { FiShoppingCart } from 'react-icons/fi'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { ThemeData } from '../context/Themes/ThemeContex'
// import { TbSearch, TbX } from 'react-icons/tb'
// import { FaChevronDown } from 'react-icons/fa' 
// import { allProducts } from '../data/ProductsData'

// // --- CHANGE 1: Import CartContext ---
// import { CartContext } from '../context/cart/CartContex'; 

// function Navbar() {
//   const { theme, toggleTheme } = useContext(ThemeData);
  
//   // --- CHANGE 2: Get cartItems from Context ---
//   const { cartItems } = useContext(CartContext); 

//   const [showSearch, setShowSearch] = useState(false);
//   const navigate = useNavigate();

//   // --- STATES ---
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedTerm, setDebouncedTerm] = useState(""); 
//   const [suggestions, setSuggestions] = useState([]);

//   const categories = [
//     { name: "Mobiles", link: "/category/mobile" },
//     { name: "Laptops", link: "/category/laptop" },
//     { name: "Smartwatches", link: "/category/smartwatch" },
//     { name: "Headphones", link: "/category/headphone" },
//   ];

//   // --- LOGIC: DEBOUNCING ---
//   useEffect(() => {
//     const timerId = setTimeout(() => {
//         setDebouncedTerm(searchTerm); 
//     }, 300);

//     return () => {
//         clearTimeout(timerId);
//     };
//   }, [searchTerm]);

//   // --- LOGIC: FILTERING ---
//   useEffect(() => {
//     if (debouncedTerm.length > 0) {
//         const lowerTerm = debouncedTerm.toLowerCase();
        
//         const filtered = allProducts.filter((item) => {
//             const name = item.name ? item.name.toLowerCase() : "";
//             const category = item.category ? item.category.toLowerCase() : "";
            
//             return name.includes(lowerTerm) || category.includes(lowerTerm);
//         });
        
//         setSuggestions(filtered.slice(0, 5));
//     } else {
//         setSuggestions([]);
//     }
//   }, [debouncedTerm]);

//   // --- HANDLERS ---
//   const handleInput = (e) => {
//     setSearchTerm(e.target.value);
//   }

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//         navigate(`/search/${searchTerm}`);
//         setShowSearch(false);
//         setSuggestions([]);
//         setDebouncedTerm(searchTerm);
//     }
//   }

//   const handleSuggestionClick = (item) => {
//      const slug = item.name.toLowerCase().replace(/\s+/g, '-');
//      navigate(`/product/${slug}`);
//      setShowSearch(false);
//      setSearchTerm("");
//      setSuggestions([]);
//   }

//   return (
//     <>
//       <div className='sticky top-0 z-50 bg-white dark:bg-gray-950 dark:text-white shadow-md transition-colors duration-300'>
        
//         <div className='h-[10vh] flex justify-between items-center px-4 md:px-16 border-b dark:border-gray-800'>
          
//           {/* LOGO */}
//           <Link to='/'>
//             <h1 className='text-2xl font-bold text-orange-600 dark:text-orange-500 cursor-pointer'>
//               E-<span className='font-semibold text-xl '>Hub™ </span>
//             </h1>
//           </Link>

//           {/* DESKTOP MENU */}
//           <div className='hidden gap-6 md:flex font-medium items-center'>
//             <NavLink to='/' className={({isActive}) => isActive ? "text-orange-600" : "hover:text-orange-600"}>Home</NavLink>

//             {/* DROPDOWN */}
//             <div className="relative group cursor-pointer h-full flex items-center">
//                 <div className="flex items-center gap-1 hover:text-orange-600 transition-colors py-4">
//                   <span>Category</span>
//                   <FaChevronDown className="text-xs group-hover:rotate-180 transition-transform duration-300" />
//                 </div>
//                 <div className="absolute top-full -left-4 pt-5 w-48 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50">
//                   <div className='bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg shadow-xl overflow-hidden'>
//                       <div className="absolute -top-1 left-8 w-3 h-3 bg-white dark:bg-gray-900 rotate-45 border-t border-l dark:border-gray-800"></div>
//                       <div className="flex flex-col py-2">
//                         {categories.map((cat, index) => (
//                           <Link key={index} to={cat.link} className="px-5 py-3 text-sm hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-600 dark:text-gray-300 transition-colors">
//                             {cat.name}
//                           </Link>
//                         ))}
//                       </div>
//                   </div>
//                 </div>
//             </div>

//             <NavLink to='/Contact' className={({isActive}) => isActive ? "text-orange-600" : "hover:text-orange-600"}>Contact</NavLink>
//           </div>

//           {/* --- DESKTOP SEARCH BAR --- */}
//           <div className='relative hidden md:block'>
//               <form onSubmit={handleSearchSubmit} className='flex gap-1 border dark:border-gray-600 rounded-lg px-2 py-1 text-center'>
//                 <input 
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleInput}
//                   className='bg-transparent outline-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 w-48'
//                   placeholder='Search Products...' 
//                 />
//                 <button type="submit" className='cursor-pointer text-orange-600 dark:text-orange-500'> 
//                   <TbSearch className='text-xl'/>
//                 </button>
//               </form>

//               {/* DESKTOP SUGGESTIONS */}
//               {suggestions.length > 0 && (
//                  <div className='absolute top-full left-0 w-full mt-2 rounded-lg shadow-xl overflow-hidden z-50
//                                  bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-700'>
//                     {suggestions.map((item) => (
//                         <div 
//                            key={item.id}
//                            onClick={() => handleSuggestionClick(item)}
//                            className='px-4 py-2 hover:bg-orange-50/50 dark:hover:bg-gray-800/50 cursor-pointer text-sm flex items-center gap-2 border-b border-gray-100/50 dark:border-gray-700/50 last:border-none'
//                         >
//                             <img src={item.image} alt="" className='w-8 h-8 object-contain mix-blend-multiply dark:mix-blend-normal'/>
//                             <span className='truncate font-medium'>{item.name}</span>
//                         </div>
//                     ))}
//                  </div>
//               )}
//           </div>

//           {/* RIGHT ICONS */}
//           <div className='flex items-center gap-5'>
//             <button onClick={() => setShowSearch(!showSearch)} className='md:hidden cursor-pointer text-orange-600 dark:text-orange-500'> 
//               <TbSearch className='text-2xl'/>
//             </button>
//             <Link to='/watchList' className='flex md:hidden'><FcLike className='text-2xl' /></Link>
//             <button onClick={toggleTheme} className='text-xl active:scale-95 cursor-pointer'>
//               {theme === "light" ? <BsMoonStarsFill/> :<BsMoonStars/> }
//             </button>
            
//             {/* --- CHANGE 3a: Desktop Cart Icon with Badge --- */}
//             <Link to='/Cart' className='hidden md:flex relative'>
//               <FiShoppingCart className='text-xl' />
//               {cartItems.length > 0 && (
//                 <span className='absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce'>
//                   {cartItems.length}
//                 </span>
//               )}
//             </Link>

//             <Link to='/Profile' className='hidden md:flex text-center items-center gap-x-1'><CgProfile className='text-xl' /><span>Login</span></Link>
//           </div>
//         </div>

//         {/* --- MOBILE SEARCH BAR --- */}
//         {showSearch && (
//           <div className='md:hidden px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 animate-fade-in-down'>
              
//               <form onSubmit={handleSearchSubmit} className='flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-950'>
//                 <TbSearch className='text-gray-400 text-xl mr-2'/>
//                 <input 
//                   type="text"
//                   value={searchTerm}
//                   onChange={handleInput}
//                   className='flex-1 bg-transparent outline-none text-sm dark:text-white'
//                   placeholder='Search for products...' 
//                   autoFocus 
//                 />
//                 <button type="button" onClick={() => {setShowSearch(false); setSuggestions([]);}} className='text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors ml-2 p-1'>
//                   <TbX className='text-xl'/>
//                 </button>
//               </form>

//               {/* MOBILE SUGGESTIONS */}
//               {suggestions.length > 0 && (
//                  <div className='mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto
//                                  bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border border-gray-200 dark:border-gray-800'>
//                     {suggestions.map((item) => (
//                         <div 
//                            key={item.id}
//                            onClick={() => handleSuggestionClick(item)}
//                            className='px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 active:bg-gray-100 dark:active:bg-gray-800'
//                         >
//                             <img src={item.image} alt="" className='w-8 h-8 object-contain'/>
//                             <span className='text-sm font-medium'>{item.name}</span>
//                         </div>
//                     ))}
//                  </div>
//               )}
//           </div>
//         )}

//       </div>
      
//       {/* Mobile Bottom Bar */}
//       <div className='fixed md:hidden py-1.5 border-t border-gray-200 dark:border-gray-800 bottom-0 w-full flex justify-between items-center bg-white dark:bg-gray-950 dark:text-white z-50 px-6'>
//          <Link to='/' className='flex flex-col gap-1 items-center'><BiHome className='text-xl' /><span className='text-[10px]'>Home</span></Link>
//          <Link to='/Category' className='flex flex-col gap-1 items-center'><BiCategory className='text-xl' /><span className='text-[10px]'>Category</span></Link>
         
//          {/* --- CHANGE 3b: Mobile Cart Icon with Badge --- */}
//          <Link to='/Cart' className='flex flex-col gap-1 items-center relative'>
//             <div className='relative'>
//               <FiShoppingCart className='text-xl' />
//               {cartItems.length > 0 && (
//                 <span className='absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center'>
//                   {cartItems.length}
//                 </span>
//               )}
//             </div>
//             <span className='text-[10px]'>Cart</span>
//          </Link>

//          <Link to='/Profile' className='flex flex-col gap-1 items-center'><CgProfile className='text-xl' /><span className='text-[10px]'>Profile</span></Link>
//       </div>
//     </>
//   )
// }

// export default Navbar
import React, { useContext, useState, useEffect } from 'react'
import { BiCategory, BiHome } from 'react-icons/bi'
import { BsMoonStars, BsMoonStarsFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { FcLike } from 'react-icons/fc'
import { FiShoppingCart } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ThemeData } from '../context/Themes/ThemeContex'
import { TbSearch, TbX } from 'react-icons/tb'
import { FaChevronDown } from 'react-icons/fa' 
import { allProducts } from '../data/ProductsData'
import { CartContext } from '../context/cart/CartContex'; 

// --- CHANGE 1: Import Firebase Auth ---
// Make sure path is correct (e.g. '../firebaseConfig' or '../data/firebaseConfig')
import { auth } from '../firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeData);
  const { cartItems } = useContext(CartContext); 
  const context = useContext(CartContext);
  
  // Safe check for cartItems (fixes the previous error completely)
  const safeCartItems = context?.cartItems || [];

  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  // --- CHANGE 2: User State ---
  const [user, setUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(""); 
  const [suggestions, setSuggestions] = useState([]);

  const categories = [
    { name: "Mobiles", link: "/category/mobile" },
    { name: "Laptops", link: "/category/laptop" },
    { name: "Smartwatches", link: "/category/smartwatch" },
    { name: "Headphones", link: "/category/headphone" },
  ];

  // --- CHANGE 3: Listen for Login/Logout ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // --- DEBOUNCING & FILTERING LOGIC ---
  useEffect(() => {
    const timerId = setTimeout(() => {
        setDebouncedTerm(searchTerm); 
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm.length > 0) {
        const lowerTerm = debouncedTerm.toLowerCase();
        const filtered = allProducts.filter((item) => {
            const name = item.name ? item.name.toLowerCase() : "";
            const category = item.category ? item.category.toLowerCase() : "";
            return name.includes(lowerTerm) || category.includes(lowerTerm);
        });
        setSuggestions(filtered.slice(0, 5));
    } else {
        setSuggestions([]);
    }
  }, [debouncedTerm]);

  const handleInput = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
        navigate(`/search/${searchTerm}`);
        setShowSearch(false);
        setSuggestions([]);
        setDebouncedTerm(searchTerm);
    }
  }

  const handleSuggestionClick = (item) => {
     const slug = item.name.toLowerCase().replace(/\s+/g, '-');
     navigate(`/product/${slug}`);
     setShowSearch(false);
     setSearchTerm("");
     setSuggestions([]);
  }

  return (
    <>
      <div className='sticky top-0 z-50 bg-white dark:bg-gray-950 dark:text-white shadow-md transition-colors duration-300'>
        
        <div className='h-[10vh] flex justify-between items-center px-4 md:px-16 border-b dark:border-gray-800'>
          
          {/* LOGO */}
          <Link to='/'>
            <h1 className='text-2xl font-bold text-orange-600 dark:text-orange-500 cursor-pointer'>
              E-<span className='font-semibold text-xl '>Hub™ </span>
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <div className='hidden gap-6 md:flex font-medium items-center'>
            <NavLink to='/' className={({isActive}) => isActive ? "text-orange-600" : "hover:text-orange-600"}>Home</NavLink>
            <div className="relative group cursor-pointer h-full flex items-center">
                <div className="flex items-center gap-1 hover:text-orange-600 transition-colors py-4">
                  <span>Category</span>
                  <FaChevronDown className="text-xs group-hover:rotate-180 transition-transform duration-300" />
                </div>
                <div className="absolute top-full -left-4 pt-5 w-48 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50">
                  <div className='bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg shadow-xl overflow-hidden'>
                      <div className="absolute -top-1 left-8 w-3 h-3 bg-white dark:bg-gray-900 rotate-45 border-t border-l dark:border-gray-800"></div>
                      <div className="flex flex-col py-2">
                        {categories.map((cat, index) => (
                          <Link key={index} to={cat.link} className="px-5 py-3 text-sm hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-600 dark:text-gray-300 transition-colors">
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                  </div>
                </div>
            </div>
            <NavLink to='/Contact' className={({isActive}) => isActive ? "text-orange-600" : "hover:text-orange-600"}>Contact</NavLink>
          </div>

          {/* DESKTOP SEARCH BAR */}
          <div className='relative hidden md:block'>
              <form onSubmit={handleSearchSubmit} className='flex gap-1 border dark:border-gray-600 rounded-lg px-2 py-1 text-center'>
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={handleInput}
                  className='bg-transparent outline-0 placeholder:text-gray-500 dark:placeholder:text-gray-400 w-48'
                  placeholder='Search Products...' 
                />
                <button type="submit" className='cursor-pointer text-orange-600 dark:text-orange-500'> 
                  <TbSearch className='text-xl'/>
                </button>
              </form>
              {suggestions.length > 0 && (
                 <div className='absolute top-full left-0 w-full mt-2 rounded-lg shadow-xl overflow-hidden z-50
                                 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-700'>
                    {suggestions.map((item) => (
                        <div 
                           key={item.id}
                           onClick={() => handleSuggestionClick(item)}
                           className='px-4 py-2 hover:bg-orange-50/50 dark:hover:bg-gray-800/50 cursor-pointer text-sm flex items-center gap-2 border-b border-gray-100/50 dark:border-gray-700/50 last:border-none'
                        >
                            <img src={item.image} alt="" className='w-8 h-8 object-contain mix-blend-multiply dark:mix-blend-normal'/>
                            <span className='truncate font-medium'>{item.name}</span>
                        </div>
                    ))}
                 </div>
              )}
          </div>

          {/* RIGHT ICONS */}
          <div className='flex items-center gap-5'>
            <button onClick={() => setShowSearch(!showSearch)} className='md:hidden cursor-pointer text-orange-600 dark:text-orange-500'> 
              <TbSearch className='text-2xl'/>
            </button>
            <Link to='/watchList' className='flex md:hidden'><FcLike className='text-2xl' /></Link>
            <button onClick={toggleTheme} className='text-xl active:scale-95 cursor-pointer'>
              {theme === "light" ? <BsMoonStarsFill/> :<BsMoonStars/> }
            </button>
            
            <Link to='/Cart' className='hidden md:flex relative'>
              <FiShoppingCart className='text-xl' />
              {safeCartItems.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce'>
                  {safeCartItems.length}
                </span>
              )}
            </Link>

            {/* --- CHANGE 4: CONDITIONAL PROFILE DISPLAY (DESKTOP) --- */}
            <Link to='/Profile' className='hidden md:flex text-center items-center gap-x-2'>
              {user ? (
                // IF LOGGED IN: Show Image & Name
                <>
                  <img 
                    src={user.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                    alt="User" 
                    className="w-8 h-8 rounded-full border border-orange-500 object-cover"
                  />
                  {/* Show only first name to save space */}
                  <span className="font-medium text-sm">
                    {user.displayName ? user.displayName.split(" ")[0] : "User"}
                  </span>
                </>
              ) : (
                // IF LOGGED OUT: Show Login Icon
                <>
                  <CgProfile className='text-xl' />
                  <span>Login</span>
                </>
              )}
            </Link>

          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        {showSearch && (
          <div className='md:hidden px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 animate-fade-in-down'>
              <form onSubmit={handleSearchSubmit} className='flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-950'>
                <TbSearch className='text-gray-400 text-xl mr-2'/>
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={handleInput}
                  className='flex-1 bg-transparent outline-none text-sm dark:text-white'
                  placeholder='Search for products...' 
                  autoFocus 
                />
                <button type="button" onClick={() => {setShowSearch(false); setSuggestions([]);}} className='text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors ml-2 p-1'>
                  <TbX className='text-xl'/>
                </button>
              </form>
              {suggestions.length > 0 && (
                 <div className='mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border border-gray-200 dark:border-gray-800'>
                    {suggestions.map((item) => (
                        <div key={item.id} onClick={() => handleSuggestionClick(item)} className='px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 active:bg-gray-100 dark:active:bg-gray-800'>
                            <img src={item.image} alt="" className='w-8 h-8 object-contain'/>
                            <span className='text-sm font-medium'>{item.name}</span>
                        </div>
                    ))}
                 </div>
              )}
          </div>
        )}

      </div>
      
      {/* MOBILE BOTTOM BAR */}
      <div className='fixed md:hidden py-1.5 border-t border-gray-200 dark:border-gray-800 bottom-0 w-full flex justify-between items-center bg-white dark:bg-gray-950 dark:text-white z-50 px-6'>
         <Link to='/' className='flex flex-col gap-1 items-center'><BiHome className='text-xl' /><span className='text-[10px]'>Home</span></Link>
         <Link to='/Category' className='flex flex-col gap-1 items-center'><BiCategory className='text-xl' /><span className='text-[10px]'>Category</span></Link>
         
         <Link to='/Cart' className='flex flex-col gap-1 items-center relative'>
            <div className='relative'>
              <FiShoppingCart className='text-xl' />
              {safeCartItems.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center'>
                  {safeCartItems.length}
                </span>
              )}
            </div>
            <span className='text-[10px]'>Cart</span>
         </Link>

         {/* --- CHANGE 5: CONDITIONAL PROFILE ICON (MOBILE) --- */}
         <Link to='/Profile' className='flex flex-col gap-1 items-center'>
            {user && user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-6 h-6 rounded-full border border-orange-500 object-cover"
                />
            ) : (
                <CgProfile className='text-xl' />
            )}
            <span className='text-[10px]'>{user ? "Me" : "Profile"}</span>
         </Link>
      </div>
    </>
  )
}

export default Navbar