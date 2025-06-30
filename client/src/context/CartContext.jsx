import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart`, { 
        withCredentials: true 
      });
      setCartItems(response.data.items || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cart. Please try again later.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart, isAuthenticated]);

  // our proud add item to cart
  const addToCart = async (item) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/cart/add`,
        item,
        { withCredentials: true }
      );
      setCartItems(response.data.items);
      toast.success('Item added to cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${API_URL}/cart/update`,
        { productId, quantity },
        { withCredentials: true }
      );
      setCartItems(response.data.items);
    } catch (error) {
      toast.error('Failed to update cart');
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // remove item from cart,, this is to changed as user can remove custom builds
  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/cart/delete/${productId}`,
        { withCredentials: true }
      );
      setCartItems(response.data.items);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item from cart');
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_URL}/cart/delete/all`,
        { withCredentials: true }
      );
      setCartItems(response.data.items);
    } catch (error) {
      toast.error('Failed to clear cart');
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price
  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getTotalPrice,
    cartCount: cartItems.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
