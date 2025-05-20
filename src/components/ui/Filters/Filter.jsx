import React, { useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";

export default function Filter() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="w-full bg-green-600 p-4 rounded-b-lg shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 space-x-3 w-full sm:w-auto sm:flex-1 max-w-xl focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-opacity-50 transition-all">
          <button
            className="flex items-center min-w-fit group"
            aria-label="Select category"
            aria-haspopup="listbox"
          >
            <span className="text-black text-sm font-medium group-hover:text-green-600 transition-colors">
              All Categories
            </span>
            <ChevronDown className="w-4 h-4 text-black ml-2 group-hover:text-green-600 transition-colors" />
            <span className="hidden sm:block h-4 w-px bg-gray-300 mx-3"></span>
          </button>

          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            className="bg-green-700 p-2 rounded-full hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex justify-center w-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 hover:bg-green-700 rounded-md transition-colors text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-600"
            aria-label="Toggle benefits menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="ml-2">Benefits</span>
          </button>
        </div>

        {/* Desktop Benefits */}
        <div className="hidden sm:flex items-center space-x-6 text-white text-sm font-medium">
          <span className="hover:text-green-200 transition-colors cursor-default">
            FREE SHIPPING OVER $199
          </span>
          <span className="hover:text-green-200 transition-colors cursor-default">
            30 DAYS MONEY BACK
          </span>
          <span className="hover:text-green-200 transition-colors cursor-default">
            100% SECURE PAYMENT
          </span>
        </div>
      </div>

      {/* Mobile Benefits - Animated */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-green-700 p-3 rounded-md text-white text-sm font-medium space-y-3">
          <div className="py-1 border-b border-green-600">
            FREE SHIPPING OVER $199
          </div>
          <div className="py-1 border-b border-green-600">
            30 DAYS MONEY BACK
          </div>
          <div className="py-1">100% SECURE PAYMENT</div>
        </div>
      </div>
    </div>
  );
}