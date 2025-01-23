import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth();

  // Load cart from Firestore when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (currentUser) {
        const cartRef = doc(db, 'carts', currentUser.uid);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
          setCart(cartDoc.data().items || []);
        }
      } else {
        setCart([]);
      }
    };

    loadCart();
  }, [currentUser]);

  // Save cart to Firestore whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (currentUser) {
        const cartRef = doc(db, 'carts', currentUser.uid);
        await setDoc(cartRef, { items: cart }, { merge: true });
      }
    };

    if (cart.length > 0) {
      saveCart();
    }
  }, [cart, currentUser]);

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id ? { ...item, rentalDuration: book.rentalDuration, rentalPrice: book.rentalPrice } : item
        );
      }
      return [...prevCart, book];
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.rentalPrice, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    calculateTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
} 