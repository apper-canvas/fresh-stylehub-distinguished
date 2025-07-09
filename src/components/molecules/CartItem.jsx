import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { toast } from "react-toastify";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, item.quantity + change);
    onUpdateQuantity(item.productId, newQuantity);
  };

  const handleRemove = () => {
    onRemoveItem(item.productId);
    toast.success("Item removed from cart");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
    >
      <div className="w-16 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ApperIcon name="Image" className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-secondary-700 text-sm truncate">
          {item.brand}
        </h4>
        <p className="text-secondary-600 text-sm line-clamp-1 mb-1">
          {item.name}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Size: {item.size}</span>
          <span>•</span>
          <span>Color: {item.color}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(-1)}
          className="p-1 h-8 w-8"
          disabled={item.quantity <= 1}
        >
          <ApperIcon name="Minus" className="w-4 h-4" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQuantityChange(1)}
          className="p-1 h-8 w-8"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-bold text-secondary-900">
          ₹{(item.price * item.quantity).toLocaleString()}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-error hover:text-error-600 p-1 mt-1"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CartItem;