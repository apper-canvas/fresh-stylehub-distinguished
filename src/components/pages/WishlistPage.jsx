import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "@/components/organisms/ProductGrid";
import Empty from "@/components/ui/Empty";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([
    {
      Id: 1,
      name: "Casual Cotton T-Shirt",
      brand: "Nike",
      price: 1299,
      discountPrice: 899,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop"],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black", "White"],
      category: "men",
      subcategory: "Topwear",
      inStock: true
    },
    {
      Id: 2,
      name: "Slim Fit Jeans",
      brand: "Zara",
      price: 2499,
      discountPrice: null,
      images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"],
      sizes: ["28", "30", "32", "34"],
      colors: ["Black", "Blue", "Grey"],
      category: "men",
      subcategory: "Bottomwear",
      inStock: true
    }
  ]);

  const handleAddToCart = (product) => {
    const cartItem = {
      productId: product.Id,
      name: product.name,
      brand: product.brand,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1
    };
    
    // In a real app, this would update global cart state
    console.log("Added to cart:", cartItem);
    toast.success("Added to cart successfully!");
  };

  const handleRemoveFromWishlist = (product) => {
    setWishlistItems(prev => prev.filter(item => item.Id !== product.Id));
    toast.success("Removed from wishlist");
  };

  const handleAddToWishlist = (product) => {
    // This is called when the heart icon is clicked
    handleRemoveFromWishlist(product);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Empty
              title="Your wishlist is empty"
              description="Save items you love to your wishlist and shop them later"
              actionText="Start Shopping"
              onAction={() => navigate("/")}
              icon="Heart"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-secondary-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        <ProductGrid
          products={wishlistItems}
          loading={false}
          error=""
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          wishlistItems={wishlistItems}
        />
      </div>
    </div>
  );
};

export default WishlistPage;