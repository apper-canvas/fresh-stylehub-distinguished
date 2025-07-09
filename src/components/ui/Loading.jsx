import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full">
      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="aspect-[3/4] bg-gray-200 skeleton-shimmer" />
            
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 skeleton-shimmer rounded w-3/4" />
              <div className="h-4 bg-gray-200 skeleton-shimmer rounded w-full" />
              <div className="h-4 bg-gray-200 skeleton-shimmer rounded w-1/2" />
              
              <div className="flex items-center justify-between pt-2">
                <div className="h-4 bg-gray-200 skeleton-shimmer rounded w-16" />
                <div className="h-8 bg-gray-200 skeleton-shimmer rounded w-20" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;