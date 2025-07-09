import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FilterSection from "@/components/molecules/FilterSection";
import Select from "@/components/atoms/Select";

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  onSortChange,
  sortBy = "featured",
  isOpen = false,
  onClose
}) => {
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Customer Rating" }
  ];

  const filterOptions = {
    categories: ["Topwear", "Bottomwear", "Footwear", "Accessories"],
    brands: ["Nike", "Adidas", "Zara", "H&M", "Uniqlo", "Forever 21"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Blue", "Red", "Green", "Yellow", "Pink"],
    priceRanges: ["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹2000", "₹2000 - ₹5000", "Above ₹5000"]
  };

  const handleFilterChange = (filterType, values) => {
    onFiltersChange({
      ...filters,
      [filterType]: values
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRanges: []
    });
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden p-2"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-secondary-700">
            Sort By
          </label>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <FilterSection
          title="Category"
          options={filterOptions.categories}
          selectedOptions={filters.categories || []}
          onChange={(values) => handleFilterChange("categories", values)}
        />

        <FilterSection
          title="Brand"
          options={filterOptions.brands}
          selectedOptions={filters.brands || []}
          onChange={(values) => handleFilterChange("brands", values)}
        />

        <FilterSection
          title="Size"
          options={filterOptions.sizes}
          selectedOptions={filters.sizes || []}
          onChange={(values) => handleFilterChange("sizes", values)}
        />

        <FilterSection
          title="Color"
          options={filterOptions.colors}
          selectedOptions={filters.colors || []}
          onChange={(values) => handleFilterChange("colors", values)}
        />

        <FilterSection
          title="Price Range"
          options={filterOptions.priceRanges}
          selectedOptions={filters.priceRanges || []}
          onChange={(values) => handleFilterChange("priceRanges", values)}
        />
      </div>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-full">
        {sidebarContent}
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="w-80 bg-white h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FilterSidebar;