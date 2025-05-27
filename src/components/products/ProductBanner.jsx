import React, { useState } from 'react';

export const ProductBanner = () => {
  const [hoveredHeadphone, setHoveredHeadphone] = useState(false);
  const [hoveredPhone, setHoveredPhone] = useState(false);

  return (
    <div className="w-full bg-gray-50 p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">TOP CELL PHONES & TABLETS</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Headphone Banner */}
        <div 
          className={`flex-1 bg-gradient-to-r from-green-600 to-indigo-200 rounded-xl overflow-hidden relative flex items-center min-h-[300px] transition-all duration-300 ${hoveredHeadphone ? 'shadow-xl' : 'shadow-md'}`}
          onMouseEnter={() => setHoveredHeadphone(true)}
          onMouseLeave={() => setHoveredHeadphone(false)}
        >
          <div className="p-6 sm:p-8 z-10 w-1/2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Noise Cancelling</h3>
            <h4 className="text-2xl sm:text-3xl text-white mb-4 sm:mb-6">Headphone</h4>
            
            <div className="text-white text-sm sm:text-base space-y-1">
              <p>Boso Over-Ear Headphone</p>
              <p>Wifi, Voice Assistant,</p>
              <p>Low Latency Game Mode</p>
            </div>
            
            <button className="bg-white text-indigo-700 text-sm sm:text-base font-bold py-2 sm:py-3 px-5 sm:px-6 rounded-full mt-6 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
              BUY NOW
            </button>
          </div>
          
          <div className="absolute right-4 bottom-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs font-medium shadow-sm">
            3 / 3
          </div>
          
          <img 
            src="https://i.pinimg.com/736x/f3/de/22/f3de223eb67eb7bc977225d949cb65aa.jpg" 
            alt="White Headphones" 
            className={`absolute right-0 h-[90%] object-contain transition-transform duration-500 ${hoveredHeadphone ? 'scale-110' : 'scale-100'}`}
          />
        </div>
        
        {/* Phone Banner */}
        <div 
          className={`flex-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl overflow-hidden relative flex items-center min-h-[300px] transition-all duration-300 ${hoveredPhone ? 'shadow-xl' : 'shadow-md'}`}
          onMouseEnter={() => setHoveredPhone(true)}
          onMouseLeave={() => setHoveredPhone(false)}
        >
          <div className="p-6 sm:p-8 z-10 w-1/2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Redmi Note 12 Pro+ 5G</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Rise to the challenge</p>
            
            <div className="mt-4 space-y-2 hidden sm:block">
              <p className="text-xs text-gray-500">200MP Pro-grade camera</p>
              <p className="text-xs text-gray-500">120W HyperCharge</p>
              <p className="text-xs text-gray-500">MediaTek Dimensity 1080</p>
            </div>
            
            <button className="bg-green-500 text-white text-sm sm:text-base font-bold py-2 sm:py-3 px-5 sm:px-6 rounded-lg mt-6 hover:bg-green-200 hover:scale-105 transition-all duration-300">
              SHOP NOW
            </button>
          </div>
          
          <img 
            src="https://i.pinimg.com/736x/d5/1b/0d/d51b0d8826063f245dc38e9ff6c5c263.jpg" 
            alt="Redmi Phones" 
            className={`absolute right-0 h-[90%] object-contain transition-transform duration-500 ${hoveredPhone ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      </div>
    </div>
  );
};