import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onQuickView, isInWishlist }) => {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);
  const [imageError, setImageError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  useEffect(() => {
    if (product.saleEndTime) {
      const calculateTimeRemaining = () => {
        const now = new Date().getTime();
        const endTime = new Date(product.saleEndTime).getTime();
        const difference = endTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeRemaining({ days, hours, minutes, seconds, total: difference });
        } else {
          setTimeRemaining(null);
        }
      };

      calculateTimeRemaining();
      const interval = setInterval(calculateTimeRemaining, 1000);

      return () => clearInterval(interval);
    }
  }, [product.saleEndTime]);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(product);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success("Added to cart");
  };

  const formatTime = (value) => String(value).padStart(2, '0');

  const isUrgent = timeRemaining && timeRemaining.total < 24 * 60 * 60 * 1000; // Less than 24 hours
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
          
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.saleEndTime && timeRemaining && (
              <Badge 
                variant="sale" 
                className="text-xs font-bold"
              >
                SALE
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge 
                variant="discount" 
                className="text-xs font-bold"
              >
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {timeRemaining && (
            <div className="absolute bottom-2 left-2 right-2">
              <div className={cn(
                "bg-white/95 backdrop-blur-sm rounded-lg p-2 text-center border",
                isUrgent ? "border-error/20" : "border-gray-200"
              )}>
                <div className={cn(
                  "text-xs font-semibold mb-1",
                  isUrgent ? "text-error" : "text-secondary-600"
                )}>
                  {isUrgent ? "HURRY!" : "Sale ends in"}
                </div>
                <div className="flex justify-center gap-1 text-xs">
                  {timeRemaining.days > 0 && (
                    <span className={cn(
                      "font-mono font-bold",
                      isUrgent ? "text-error" : "text-secondary-700"
                    )}>
                      {timeRemaining.days}d
                    </span>
                  )}
                  <span className={cn(
                    "font-mono font-bold",
                    isUrgent ? "text-error" : "text-secondary-700"
                  )}>
                    {formatTime(timeRemaining.hours)}:{formatTime(timeRemaining.minutes)}:{formatTime(timeRemaining.seconds)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onQuickView(product)}
              className="p-2 rounded-full bg-white/80 text-gray-400 hover:text-primary hover:bg-white transition-all duration-200"
            >
              <ApperIcon name="Eye" className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleWishlistToggle}
              className={cn(
                "p-2 rounded-full transition-all duration-200",
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