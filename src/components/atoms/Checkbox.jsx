import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked,
  ...props 
}, ref) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            "w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center",
            checked
              ? "bg-primary border-primary"
              : "bg-white border-gray-300 hover:border-primary",
            className
          )}
        >
          {checked && (
            <ApperIcon name="Check" className="w-3 h-3 text-white" />
          )}
        </div>
      </div>
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;