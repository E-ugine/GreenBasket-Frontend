import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, ChevronDown, User } from 'lucide-react';

export default function Navbar() {
  const [searchText, setSearchText] = useState('');
  
  return (
    <div className="fixed top-0 left-0 w-full  bg-white shadow-sm">
      {/* Top bar*/}
      <div className="flex justify-between items-center py-2 px-4 text-sm border-b border-gray-100">
        <div className="flex items-center">
          <span className="bg-gray-100 rounded-md px-3 py-1 text-gray-700 mr-2">Hotline 24/7</span>
          <span className="font-medium text-gray-700">(+254) 797 783 251</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className=" hover:text-green-600">Sell on GreenBasket</a>
          <a href="#" className=" hover:text-green-600">Order Tracking</a>
          
          <div className="flex items-center cursor-pointer">
            <span className='text-black'>Ksh</span>
            <ChevronDown size={16} className="ml-1" />
          </div>
           <span className="w-px h-5 bg-gray-500">|</span>
          
          <div className="flex items-center cursor-pointer">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 mr-1 flex items-center justify-center">
              <span className="text-xs">🇰🇪 </span>
            </div>
            <span className='text-black'>Eng</span>
            <ChevronDown size={16} className="ml-1" />
          </div>
        </div>
      </div>
      
      {/* Main navbar with logo, navigation, etc */}
      <div className="flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-2xl">≡</span>
          </div>
          <div>
            <div className="text-black font-bold font-mono text-xl">GreenBasket</div>
            <div className="text-black text-sm font-medium">TECH MART</div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <div className=" text-black text-sm flex items-center font-medium cursor-pointer hover:text-green-600">
            HOMES <ChevronDown size={16} className="ml-1" />
          </div>
          <div className=" text-black text-sm flex items-center font-medium cursor-pointer hover:text-green-600">
            PAGES <ChevronDown size={16} className="ml-1" />
          </div>
          <div className=" text-black text-sm flex items-center font-medium cursor-pointer hover:text-green-600">
            PRODUCTS <ChevronDown size={16} className="ml-1" />
          </div>
          <div className=" text-black text-sm font-medium cursor-pointer hover:text-green-600">
            CONTACT
          </div>
        </nav>
        
        {/* User area */}
        <div className="flex items-center space-x-4">
          {/* User profile */}
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-400" />
          </div>
          
          {/* Wishlist */}
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Heart size={20} className="text-gray-400" />
          </div>
          
          {/* User info */}
          <div>
            <div className="text-xs text-gray-500">WELCOME</div>
            <div className="text-sm font-medium space-x-2">
          <a href="/login" className="hover:underline text-black">LOG IN</a>
          <span className="text-gray-500">/</span>
          <a href="/register" className="hover:underline text-black">REGISTER</a>
          </div>

          </div>
          
          {/* Cart */}
          <div className="flex items-center">
             <div className="relative">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart size={20} className="text-gray-400" />
              </div>
              <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                5
              </div>
            </div>
            <div className="mr-2">
              <div className="text-xs text-gray-500">CART</div>
              <div className="text-sm text-gray-500 font-medium">Ksh.1,689.00</div>
            </div>
          </div>
        </div>
      </div>
      
     
    </div>
  );
}