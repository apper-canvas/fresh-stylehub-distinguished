import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";
import { toast } from "react-toastify";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      productId: 1,
      name: "Casual Cotton T-Shirt",
      brand: "Nike",
      price: 899,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
      size: "M",
      color: "Blue",
      quantity: 2
    },
    {
      productId: 2,
      name: "Slim Fit Jeans",
      brand: "Zara",
      price: 2499,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
      size: "32",
      color: "Black",
      quantity: 1
    }
  ]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Empty
              title="Your cart is empty"
              description="Looks like you haven't added any items to your cart yet"
              actionText="Continue Shopping"
              onAction={() => navigate("/")}
              icon="ShoppingCart"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-secondary-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-secondary-900">
                  Items in Cart
                </h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-secondary-900 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-600">Tax (18%)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-lg font-semibold text-secondary-900">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button
                  variant="primary"
                  onClick={handleCheckout}
                  className="w-full"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
              
              {shipping > 0 && (
                <div className="mt-4 p-3 bg-accent-50 rounded-md">
                  <p className="text-sm text-accent-700">
                    <ApperIcon name="Truck" className="w-4 h-4 inline mr-1" />
                    Add ₹{(1000 - subtotal).toLocaleString()} more for free shipping
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;