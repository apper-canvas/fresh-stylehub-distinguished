import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductGrid from "@/components/organisms/ProductGrid";
import FilterSidebar from "@/components/organisms/FilterSidebar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    priceRanges: []
  });

  useEffect(() => {
    loadProducts();
  }, [category]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filters, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await productService.getAll();
      const categoryProducts = data.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
      
      setProducts(categoryProducts);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Apply filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.subcategory)
      );
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => filters.colors.includes(color))
      );
    }

    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return filters.priceRanges.some(range => {
          switch (range) {
            case "Under ₹500":
              return price < 500;
            case "₹500 - ₹1000":
              return price >= 500 && price <= 1000;
            case "₹1000 - ₹2000":
              return price >= 1000 && price <= 2000;
            case "₹2000 - ₹5000":
              return price >= 2000 && price <= 5000;
            case "Above ₹5000":
              return price > 5000;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case "newest":
        filtered.sort((a, b) => b.Id - a.Id);
        break;
      case "rating":
        filtered.sort((a, b) => 4.5 - 4.2); // Mock rating sort
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
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

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-2">
              {categoryTitle}
            </h1>
            <p className="text-secondary-600">
              {filteredProducts.length} products found
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden inline-flex items-center"
          >
            <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            onSortChange={setSortBy}
            sortBy={sortBy}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              error={error}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              wishlistItems={wishlistItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;