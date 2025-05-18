import React from "react";

export default function PromotionalBanners() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12 lg:mr-64">
      <div className="bg-gray-800 p-4 rounded-lg text-white relative overflow-hidden h-48">
        <div className="absolute top-4 right-4 bg-green-400 text-black px-2 py-1 font-bold rounded">50%</div>
        <div className="text-4xl font-bold opacity-20">SALE</div>
        <div className="mt-12">
          <img 
            src="/api/placeholder/120/60" 
            alt="Game controllers" 
            className="absolute bottom-4 right-4 w-32"
          />
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg relative overflow-hidden h-48">
        <div className="text-2xl font-bold">oPad Pro Mini 5</div>
        <div className="text-sm text-gray-500 mt-1">FROM</div>
        <div className="text-2xl text-green-500 font-bold">$169</div>
        <img 
          src="/api/placeholder/120/120" 
          alt="Tablet" 
          className="absolute bottom-4 right-4 w-32"
        />
      </div>
    </div>
  );
}