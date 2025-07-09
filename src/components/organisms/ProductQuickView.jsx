import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Select from "@/components/atoms/Select";
import { toast } from "react-toastify";

const ProductQuickView = ({ product, isOpen, onClose, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);

  if (!product) return null;

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const cartItem = {
        ...product,
        size: selectedSize,
        color: selectedColor,
        quantity: 1
      };
      onAddToCart(cartItem);
      toast.success("Added to cart");
      onClose();
    } else {
      toast.error("Please select a size");
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="relative md:w-1/2">
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {discountPercentage > 0 && (
                    <Badge 
                      variant="discount" 
                      className="absolute top-4 left-4 text-xs font-bold"
                    >
                      {discountPercentage}% OFF
                    </Badge>
                  )}

                  {product.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                      >
                        <ApperIcon name="ChevronLeft" className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
                      >
                        <ApperIcon name="ChevronRight" className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Image thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                          index === currentImageIndex 
                            ? "border-primary" 
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details Section */}
              <div className="md:w-1/2 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-700 mb-1">
                      {product.brand}
                    </h2>
                    <h3 className="text-lg text-secondary-600 mb-3">
                      {product.name}
                    </h3>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleWishlistToggle}
                      className={cn(
                        "p-2 rounded-full transition-all duration-200",
                        isWishlisted 
                          ? "bg-primary-50 text-primary" 
                          : "text-gray-400 hover:text-primary hover:bg-primary-50"
                      )}
                    >
                      <ApperIcon 
                        name="Heart" 
                        className={cn("w-5 h-5", isWishlisted && "fill-current")}
                      />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="p-2 rounded-full text-gray-400 hover:text-gray-600"
                    >
                      <ApperIcon name="X" className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl font-bold text-secondary-900">
                    ₹{product.discountPrice || product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <ApperIcon 
                        key={i} 
                        name="Star" 
                        className={cn(
                          "w-4 h-4",
                          i < 4 ? "text-accent fill-current" : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(4.2)</span>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Size
                  </label>
                  <Select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full"
                  >
                    <option value="">Select Size</option>
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Color Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Color
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "px-3 py-1 text-sm border rounded-md transition-all",
                          selectedColor === color
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 hover:border-gray-400"
                        )}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full mb-4"
                  disabled={!selectedSize}
                >
                  <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>

                {/* Stock Status */}
                <div className="flex items-center gap-2 text-sm">
                  <ApperIcon 
                    name={product.inStock ? "CheckCircle" : "XCircle"} 
                    className={cn(
                      "w-4 h-4",
                      product.inStock ? "text-success" : "text-error"
                    )}
                  />
                  <span className={cn(
                    product.inStock ? "text-success" : "text-error"
                  )}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;