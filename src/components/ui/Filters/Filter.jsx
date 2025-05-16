import React, { useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";

export default function Filter() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full bg-green-500 p-3 sm:p-4 rounded-b-lg shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full px-3 py-1.5 space-x-2 w-full sm:w-auto sm:flex-1 max-w-xl">
          <div className="flex items-center min-w-fit">
            <span className="text-black text-sm font-medium">All Categories</span>
            <ChevronDown className="w-4 h-4 text-black ml-1" />
            <span className="hidden sm:block h-4 w-px bg-gray-300 mx-2"></span>
          </div>

          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none text-sm flex-grow placeholder-gray-400"
          />

          <div className="bg-green-500 p-1.5 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex justify-end w-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1 hover:bg-green-600 rounded-md transition-colors text-sm flex items-center"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="ml-1">Benefits</span>
          </button>
        </div>

        {/* Desktop Benefits */}
        <div className="hidden sm:flex items-center space-x-4 text-white text-xs font-medium">
          <span>FREE SHIPPING OVER $199</span>
          <span>30 DAYS MONEY BACK</span>
          <span>100% SECURE PAYMENT</span>
        </div>
      </div>

      {/* Mobile Benefits - Only visible when menu is open */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-green-600 mt-2 p-3 rounded-md text-white text-xs font-medium space-y-2">
          <div className="py-1 border-b border-green-500">
            FREE SHIPPING OVER $199
          </div>
          <div className="py-1 border-b border-green-500">
            30 DAYS MONEY BACK
          </div>
          <div className="py-1">100% SECURE PAYMENT</div>
        </div>
      )}
    </div>
  );
}
