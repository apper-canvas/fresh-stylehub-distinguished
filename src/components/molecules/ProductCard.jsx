import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);
  const [imageError, setImageError] = useState(false);

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success("Added to cart");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden bg-gray-100">
            {!imageError ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ApperIcon name="Image" className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          
          {discountPercentage > 0 && (
            <Badge 
              variant="discount" 
              className="absolute top-2 left-2 text-xs font-bold"
            >
              {discountPercentage}% OFF
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleWishlistToggle}
            className={cn(
              "absolute top-2 right-2 p-2 rounded-full transition-all duration-200",
              isWishlisted 
                ? "bg-white text-primary hover:bg-primary-50" 
                : "bg-white/80 text-gray-400 hover:text-primary hover:bg-white"
            )}
          >
            <ApperIcon 
              name={isWishlisted ? "Heart" : "Heart"} 
              className={cn("w-4 h-4", isWishlisted && "fill-current")}
            />
          </Button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-secondary-700 text-sm mb-1 line-clamp-1">
            {product.brand}
          </h3>
          <p className="text-secondary-600 text-sm mb-2 line-clamp-2 leading-relaxed">
            {product.name}
          </p>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-secondary-900">
              ₹{product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <ApperIcon 
                    key={i} 
                    name="Star" 
                    className={cn(
                      "w-3 h-3",
                      i < 4 ? "text-accent fill-current" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">(4.2)</span>
            </div>
            
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              className="text-xs px-3 py-1"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;