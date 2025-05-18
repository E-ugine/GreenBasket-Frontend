import React from "react";
import { Heart } from "lucide-react";

export default function FrequentlyBoughtTogether() {
  return (
    <div className="mt-12 mb-8 lg:mr-64">
      <h2 className="text-xl font-bold mb-6">FREQUENTLY BOUGHT TOGETHER</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gray-100 rounded"></div>
            <div className="text-xl">+</div>
            <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gray-100 rounded"></div>
            <div className="text-xl">+</div>
            <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gray-100 rounded"></div>
          </div>
          
          <div className="mt-6 space-y-3">
            <div className="flex gap-2">
              <input type="checkbox" className="mt-1" checked readOnly />
              <div>
                <div className="text-sm sm:text-base">This item: Somseng Galatero X6 Ultra LTE 4G/128 Gb, Black Smartphone</div>
                <div className="font-bold">$569.00</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <input type="checkbox" className="mt-1" checked readOnly />
              <div>
                <div className="text-sm sm:text-base">BOSO 2 Wireless On Ear Headphone</div>
                <div className="font-bold">$369.00</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <input type="checkbox" className="mt-1" checked readOnly />
              <div>
                <div className="text-sm sm:text-base">Opplo Watch Series 8 GPS + Cellular Stainless Stell Case with Milanese Loop</div>
                <div className="font-bold">$129.00</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-64">
          <div className="text-sm text-gray-500 mb-1">TOTAL PRICE:</div>
          <div className="text-2xl sm:text-3xl font-bold mb-4">$609.00</div>
          
          <button className="w-full bg-green-500 text-white py-3 rounded-md font-bold mb-4">
            ADD TO CART
          </button>
          
          <button className="flex items-center gap-2 text-gray-600">
            <Heart size={16} />
            <span>Ad all to Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  );
}