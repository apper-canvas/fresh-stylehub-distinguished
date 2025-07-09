import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductGrid from "@/components/organisms/ProductGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { recentlyViewedService } from "@/services/api/recentlyViewedService";

const RecentlyViewedSection = ({ onAddToCart, onAddToWishlist, wishlistItems = [] }) => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRecentProducts();
  }, []);

  const loadRecentProducts = async () => {
    try {
      setLoading(true);
      const products = await recentlyViewedService.getAll();
      setRecentProducts(products);
    } catch (error) {
      console.error('Error loading recently viewed products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    recentlyViewedService.clear();
    setRecentProducts([]);
  };

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-secondary-900 mb-2">
              Recently Viewed
            </h2>
            <p className="text-secondary-600">
              Continue shopping from where you left off
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="inline-flex items-center"
          >
            <ApperIcon name="X" className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        <ProductGrid
          products={recentProducts}
          loading={loading}
          error=""
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          wishlistItems={wishlistItems}
        />
      </div>
    </motion.section>
  );
};

export default RecentlyViewedSection;