import { useState, useEffect } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem("styleHub_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("styleHub_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1) => {
    const cartItem = {
      productId: product.Id,
      name: product.name,
      brand: product.brand,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size,
      color,
      quantity
    };

    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.productId === cartItem.productId && 
        item.size === cartItem.size && 
        item.color === cartItem.color
      );

      if (existingItem) {
        return prev.map(item =>
          item.productId === cartItem.productId && 
          item.size === cartItem.size && 
          item.color === cartItem.color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, cartItem];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  };
};