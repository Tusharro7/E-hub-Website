// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Contact from './pages/Contact'
// import Category from './pages/Category'
// import Error404 from './pages/Error404'
// import Profile from './pages/Profile'
// import Cart from './pages/Cart'
// import Footer from './components/Footer'
// import CategoryProducts from './components/productCategory/CategoryProducts'
// import ScrollToTop from './components/ScrollToTop'
// import ProductInformation from './components/productCategory/ProductInformation'
// import SearchResults from './pages/SerchResuts'


// function App() {
//   return (
//     <div 
//     className='w-full min-h-screen flex flex-col'
//     >
//       <ScrollToTop/>
//       <Navbar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='Contact' element={<Contact />} />
//         <Route path='Category' element={<Category />} />
//         <Route path="/search/:term" element={<SearchResults />} />
//         <Route path='/Category/:categoryName' element={<CategoryProducts/>} />
//         <Route path='/Product/:productName' element={<ProductInformation/>} />
//         <Route path='Profile' element={<Profile />} />
//         <Route path='Cart' element={<Cart />} />
//         <Route path='*' element={<Error404 />} />
//       </Routes>
//       <Footer/>
//     </div>
//   )
// }

// export default App
// import React, { useState, useEffect } from 'react' // 1. Hooks import kiye
// import Navbar from './components/Navbar'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Contact from './pages/Contact'
// import Category from './pages/Category'
// import Error404 from './pages/Error404'
// import Profile from './pages/Profile'
// import Cart from './pages/Cart'
// import Footer from './components/Footer'
// import CategoryProducts from './components/productCategory/CategoryProducts'
// import ScrollToTop from './components/ScrollToTop'
// import ProductInformation from './components/productCategory/ProductInformation'
// import SearchResults from './pages/SerchResuts'

// // 2. Loader aur Toastify import kiya
// import Loader from './components/Loader' 
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// function App() {
//   // 3. Loading State Banaya
//   const [isLoading, setIsLoading] = useState(true);

//   // 4. Fake Loading Timer (2 Seconds)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       {/* 5. Conditional Rendering: Agar loading hai to Loader dikhao, nahi to Website */}
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className='w-full min-h-screen flex flex-col'>
//           <ScrollToTop/>
          
//           <Navbar />
          
//           {/* 6. Toast Container yahan add kiya (Navbar ke baad) */}
//           <ToastContainer position="bottom-right" autoClose={1000} />

//           <Routes>
//             <Route path='/' element={<Home />} />
//             <Route path='Contact' element={<Contact />} />
//             <Route path='Category' element={<Category />} />
//             <Route path="/search/:term" element={<SearchResults />} />
//             <Route path='/Category/:categoryName' element={<CategoryProducts/>} />
//             <Route path='/Product/:productName' element={<ProductInformation/>} />
//             <Route path='Profile' element={<Profile />} />
//             <Route path='Cart' element={<Cart />} />
//             <Route path='*' element={<Error404 />} />
//           </Routes>
          
//           <Footer/>
//         </div>
//       )}
//     </>
//   )
// }

// export default App

import React, { useState } from 'react' // useEffect ki zaroorat nahi ab yahan
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Category from './pages/Category'
import Error404 from './pages/Error404'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import CategoryProducts from './components/productCategory/CategoryProducts'
import ScrollToTop from './components/ScrollToTop'
import ProductInformation from './components/productCategory/ProductInformation'
import SearchResults from './pages/SerchResuts'

import Loader from './components/Loader' 
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        // Humne Loader ko ek function pass kiya: "Jab khatam ho, to setIsLoading(false) kar dena"
        <Loader onFinish={() => setIsLoading(false)} />
      ) : (
        <div className='w-full min-h-screen flex flex-col'>
          <ScrollToTop/>
          <Navbar />
          <ToastContainer position="bottom-right" autoClose={2000} />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='Contact' element={<Contact />} />
            <Route path='Category' element={<Category />} />
            <Route path="/search/:term" element={<SearchResults />} />
            <Route path='/Category/:categoryName' element={<CategoryProducts/>} />
            <Route path='/Product/:productName' element={<ProductInformation/>} />
            <Route path='Profile' element={<Profile />} />
            <Route path='Cart' element={<Cart />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
          
          <Footer/>
        </div>
      )}
    </>
  )
}

export default App