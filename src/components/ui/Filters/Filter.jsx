import React, { useState } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";

export default function Filter() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="left-0 w-full bg-green-500 p-4 sm:p-6 rounded-b-lg shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search bar - Full width on mobile */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 space-x-2 w-full sm:w-auto sm:flex-1 max-w-xl">
          <div className="flex items-center min-w-fit">
            <span className="text-black text-sm font-medium">All Categories</span>
            <ChevronDown className="w-4 h-4 text-black ml-1" />
            <span className="hidden sm:block h-5 w-px bg-gray-300 mx-3"></span>
          </div>
          
         <input
         type="text"
        placeholder="Search anything..."
       className="bg-transparent outline-none text-sm flex-grow placeholder-gray-400"
       />

          <div className="bg-green-500 p-2 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
            <Search className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="sm:hidden flex justify-end w-full">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 hover:bg-green-600 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="ml-2">Benefits</span>
          </button>
        </div>

        {/* Benefits section - Desktop */}
        <div className="hidden sm:flex items-center space-x-6 text-white text-sm font-medium">
          <div className="flex items-center">
            <span>FREE SHIPPING OVER $199</span>
          </div>
          <div className="flex items-center">
            <span>30 DAYS MONEY BACK</span>
          </div>
          <div className="flex items-center">
            <span>100% SECURE PAYMENT</span>
          </div>
        </div>
      </div>

      {/* Mobile benefits menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-green-600 mt-4 p-4 rounded-lg text-white text-sm font-medium space-y-4">
          <div className="flex items-center py-2 border-b border-green-500">
            <span>FREE SHIPPING OVER $199</span>
          </div>
          <div className="flex items-center py-2 border-b border-green-500">
            <span>30 DAYS MONEY BACK</span>
          </div>
          <div className="flex items-center py-2">
            <span>100% SECURE PAYMENT</span>
          </div>
        </div>
      )}
    </div>
  );
}