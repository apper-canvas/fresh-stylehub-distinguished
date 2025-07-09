import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Select from "@/components/atoms/Select";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await productService.getById(parseInt(id));
      setProduct(data);
      setSelectedSize(data.sizes[0]);
      setSelectedColor(data.colors[0]);
    } catch (err) {
      setError("Failed to load product. Please try again.");
      console.error("Error loading product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    const cartItem = {
      productId: product.Id,
      name: product.name,
      brand: product.brand,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity
    };

    // In a real app, this would update global cart state
    console.log("Added to cart:", cartItem);
    toast.success("Added to cart successfully!");
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Error message={error} onRetry={loadProduct} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Error message="Product not found" />
        </div>
      </div>
    );
  }

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-secondary-600">
            <li>
              <button onClick={() => navigate("/")} className="hover:text-primary">
                Home
              </button>
            </li>
            <li><ApperIcon name="ChevronRight" className="w-4 h-4" /></li>
            <li>
              <button 
                onClick={() => navigate(`/category/${product.category.toLowerCase()}`)}
                className="hover:text-primary"
              >
                {product.category}
              </button>
            </li>
            <li><ApperIcon name="ChevronRight" className="w-4 h-4" /></li>
            <li className="text-secondary-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-colors",
                    selectedImageIndex === index 
                      ? "border-primary" 
                      : "border-transparent hover:border-gray-300"
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
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-secondary-600 mb-4">{product.brand}</p>
              
              <div className="flex items-center gap-2 mb-4">
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
                <span className="text-sm text-secondary-600">(4.2)</span>
                <span className="text-sm text-secondary-400">• 126 reviews</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-secondary-900">
                  ₹{(product.discountPrice || product.price).toLocaleString()}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <Badge variant="discount">
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-secondary-900 mb-3">
                Size
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-2 px-3 border rounded-md text-sm font-medium transition-colors",
                      selectedSize === size
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-secondary-900 mb-3">
                Color: {selectedColor}
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-colors",
                      selectedColor === color
                        ? "border-primary"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-secondary-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2"
                >
                  <ApperIcon name="Minus" className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2"
                >
                  <ApperIcon name="Plus" className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  <ApperIcon name="ShoppingCart" className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className="p-3"
                >
                  <ApperIcon 
                    name="Heart" 
                    className={cn(
                      "w-5 h-5",
                      isWishlisted && "fill-current text-primary"
                    )}
                  />
                </Button>
              </div>
              
              <Button
                variant="secondary"
                onClick={handleBuyNow}
                className="w-full"
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                Product Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="w-20 text-secondary-600">Brand:</span>
                  <span className="text-secondary-900">{product.brand}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-secondary-600">Category:</span>
                  <span className="text-secondary-900">{product.category}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-secondary-600">Stock:</span>
                  <span className={cn(
                    "font-medium",
                    product.inStock ? "text-success" : "text-error"
                  )}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;