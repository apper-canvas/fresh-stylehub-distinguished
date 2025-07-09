import { useState, useEffect } from "react";

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Load wishlist from localStorage on mount
    const savedWishlist = localStorage.getItem("styleHub_wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem("styleHub_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.Id === product.Id);
      if (!exists) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.Id !== productId));
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.Id === product.Id);
      if (exists) {
        return prev.filter(item => item.Id !== product.Id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.Id === productId);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getWishlistCount
  };
};