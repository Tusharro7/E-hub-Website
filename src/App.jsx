import React from 'react'
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
import ProductInformation from './components/productCategory/ProductInformation'
import SearchResults from './pages/SerchResuts'
import ScrollToTop from './components/ScrollToTop'
import { LoaderProvider } from './context/Loader/LoaderContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <LoaderProvider>
      
      <div className='w-full min-h-screen flex flex-col relative'>
        
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
          <Route path='/Profile' element={<Profile />} />
          <Route path='Cart' element={<Cart />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
        
        <Footer/>
      </div>

    </LoaderProvider>
  )
}

export default App