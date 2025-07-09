import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const CategoryCard = ({ category, onClick, className }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={cn(
          "cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden",
          className
        )}
        onClick={onClick}
      >
        <div className="aspect-square bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden">
          {!imageError ? (
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ApperIcon name="Package" className="w-16 h-16 text-primary-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300" />
        </div>
        
        <div className="p-4 text-center">
          <h3 className="font-semibold text-secondary-700 text-lg mb-2">
            {category.name}
          </h3>
          <p className="text-secondary-500 text-sm">
            {category.subcategories.length} categories
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default CategoryCard;