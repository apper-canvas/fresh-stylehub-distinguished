import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-error-50 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
        </div>
        
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-secondary-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            className="inline-flex items-center"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;