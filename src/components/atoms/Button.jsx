import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-600 active:bg-primary-700",
    secondary: "bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700",
    accent: "bg-accent text-white hover:bg-accent-600 active:bg-accent-700",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-700",
    link: "text-primary hover:text-primary-600 underline-offset-4 hover:underline"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;