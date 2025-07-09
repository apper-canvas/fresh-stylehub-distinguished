import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout
}) => {
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-secondary-900">
                  Shopping Cart ({totalItems})
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <Empty
                      title="Your cart is empty"
                      description="Add some items to get started"
                      actionText="Continue Shopping"
                      onAction={onClose}
                    />
                  </div>
                ) : (
                  <div>
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.productId}
                        item={item}
                        onUpdateQuantity={onUpdateQuantity}
                        onRemoveItem={onRemoveItem}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-secondary-900">
                      Total: ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      variant="primary"
                      onClick={onCheckout}
                      className="w-full"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="w-full"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;