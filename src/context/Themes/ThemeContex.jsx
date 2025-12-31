import React, {  createContext, useEffect, useState } from 'react'

export const ThemeData = createContext() ;


const ThemeContex = ({children}) => {
const [theme , setTheme] = useState('light')
const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(()=>{
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      console.log(theme);
      
    } else {
      document.documentElement.classList.remove("dark");
      console.log(theme);
      
    }
  },[theme])

  return (
   <div>
  <ThemeData.Provider value={{theme , toggleTheme }} >
    {children}
  </ThemeData.Provider>
   </div>
  )
}

export default ThemeContex
