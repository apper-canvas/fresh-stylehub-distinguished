import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "@/components/organisms/HeroSection";
import CategoryCard from "@/components/molecules/CategoryCard";
import ProductGrid from "@/components/organisms/ProductGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { categoryService } from "@/services/api/categoryService";
import { productService } from "@/services/api/productService";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [categoriesData, productsData] = await Promise.all([
        categoryService.getAll(),
        productService.getAll()
      ]);
      
      setCategories(categoriesData);
      setFeaturedProducts(productsData.slice(0, 8));
    } catch (err) {
      setError("Failed to load data. Please try again.");
      console.error("Error loading data:", err);
    } finally {
      setLoading(false);
    }
  };

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
    setCartItems(prev => [...prev, cartItem]);
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.Id === product.Id);
      if (exists) {
        return prev.filter(item => item.Id !== product.Id);
      }
      return [...prev, product];
    });
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover our curated collections across different categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard
                  category={category}
                  onClick={() => handleCategoryClick(category)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Handpicked items from our latest collections
            </p>
          </div>

          <ProductGrid
            products={featuredProducts}
            loading={loading}
            error={error}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            wishlistItems={wishlistItems}
          />

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/category/women")}
              className="inline-flex items-center"
            >
              View All Products
              <ApperIcon name="ArrowRight" className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Stay Updated with Latest Trends
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Subscribe to our newsletter and never miss out on new arrivals and exclusive deals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button
              variant="secondary"
              size="lg"
              className="whitespace-nowrap"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;