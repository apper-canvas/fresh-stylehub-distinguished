import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductQuickView from "@/components/organisms/ProductQuickView";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import ProductCard from "@/components/molecules/ProductCard";

const ProductGrid = ({ 
  products, 
  loading, 
  error, 
  onAddToCart, 
  onAddToWishlist,
  wishlistItems = []
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

if (!products || products.length === 0) {
    return (
      <Empty 
        title="No products found"
        description="Try adjusting your filters or search terms"
        actionText="Clear Filters"
        onAction={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              onQuickView={handleQuickView}
              isInWishlist={wishlistItems.some(item => item.Id === product.Id)}
            />
          </motion.div>
        ))}
      </div>
      
      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
        onAddToCart={onAddToCart}
        onAddToWishlist={onAddToWishlist}
        isInWishlist={quickViewProduct ? wishlistItems.some(item => item.Id === quickViewProduct.Id) : false}
      />
</>
  );
};

export default ProductGrid;