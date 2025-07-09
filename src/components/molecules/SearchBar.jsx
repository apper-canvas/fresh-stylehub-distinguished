import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";

const SearchBar = ({ onSearch, placeholder = "Search for products, brands and more...", className }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative flex-1 max-w-md", className)}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10 w-full"
        />
        {searchQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
          >
            <ApperIcon name="X" className="w-4 h-4" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;