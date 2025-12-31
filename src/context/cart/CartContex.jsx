import { createContext, useState, useEffect } from "react";
import { auth } from "../../firebaseConfig"; // Import Auth
import { onAuthStateChanged } from "firebase/auth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To prevent saving empty cart on load

  //Listen for Login/Logout ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Load cart specifically for this user
      if (currentUser) {
        const savedCart = localStorage.getItem(`cart_${currentUser.uid}`);
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      } else {
        // If guest, load guest cart
        const savedCart = localStorage.getItem("cart_guest");
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      }
      setLoading(false); // Data loaded, now we can allow saving
    });
    return () => unsubscribe();
  }, []);

  // Save Cart to LocalStorage (User Specific)
  useEffect(() => {
    if (loading) return; // Don't save if we are still loading the user

    if (user) {
      // Save with User ID
      localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cartItems));
    } else {
      // Save as Guest
      localStorage.setItem("cart_guest", JSON.stringify(cartItems));
    }
  }, [cartItems, user, loading]);

  // Add to Cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  //  Remove from Cart 
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  //  Decrease Quantity 
  const decrement = (id) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem.quantity === 1) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  //  Clear Cart
  const clearCart = () => {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decrement, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};