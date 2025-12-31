import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jaise hi URL (pathname) badlega, ye page ko TOP (0,0) par bhej dega
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}