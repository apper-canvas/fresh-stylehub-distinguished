import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No items found", 
  description = "Try adjusting your search or filters",
  actionText = "Browse Products",
  onAction,
  icon = "Package"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-50 to-accent-50 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
          {title}
        </h3>
        
        <p className="text-secondary-600 mb-6">
          {description}
        </p>
        
        {onAction && (
          <Button
            variant="primary"
            onClick={onAction}
            className="inline-flex items-center"
          >
            <ApperIcon name="ShoppingBag" className="w-4 h-4 mr-2" />
            {actionText}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;