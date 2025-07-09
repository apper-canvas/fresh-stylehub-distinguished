import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Home from "@/components/pages/Home";
import CategoryPage from "@/components/pages/CategoryPage";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import SearchPage from "@/components/pages/SearchPage";
import CartPage from "@/components/pages/CartPage";
import WishlistPage from "@/components/pages/WishlistPage";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

function App() {
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={getCartCount()} wishlistCount={getWishlistCount()} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;