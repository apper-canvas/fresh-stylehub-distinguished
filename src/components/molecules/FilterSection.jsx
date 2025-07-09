import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";

const FilterSection = ({ title, options, selectedOptions, onChange, type = "checkbox" }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOptionChange = (option) => {
    if (type === "checkbox") {
      const newSelected = selectedOptions.includes(option)
        ? selectedOptions.filter(item => item !== option)
        : [...selectedOptions, option];
      onChange(newSelected);
    } else {
      onChange([option]);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50"
      >
        <span className="font-medium text-secondary-700">{title}</span>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          className="w-4 h-4 text-gray-400"
        />
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 space-y-2"
          >
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                />
                <label 
                  className="text-sm text-secondary-600 cursor-pointer flex-1"
                  onClick={() => handleOptionChange(option)}
                >
                  {option}
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSection;