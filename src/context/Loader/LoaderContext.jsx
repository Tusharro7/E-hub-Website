import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader'; 


const LoaderContext = createContext();


export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      
   
      {isLoading && <Loader />}
      
      <div className={isLoading ? 'h-screen overflow-hidden' : ''}>
        {children}
      </div>

    </LoaderContext.Provider>
  );
};