import React from 'react';

export const ProductBanner = () => {
  return (
    <div className="w-full bg-gray-100 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">TOP CELL PHONES & TABLETS</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Headphone Banner */}
        <div className="flex-1 bg-gray-300 rounded-lg overflow-hidden relative flex items-center">
          <div className="p-4 sm:p-6 z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Noise Cancelling</h3>
            <h4 className="text-2xl sm:text-3xl text-white mb-4 sm:mb-6">Headphone</h4>
            
            <div className="text-white text-xs sm:text-sm">
              <p>Boso Over-Ear Headphone</p>
              <p>Wifi, Voice Assistant,</p>
              <p>Low Latency Game Mde</p>
            </div>
            
            <button className="bg-white text-black text-xs sm:text-sm font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-full mt-4 sm:mt-6 hover:bg-gray-100 transition-colors">
              BUY NOW
            </button>
          </div>
          
          <div className="absolute right-0 bottom-4 bg-white bg-opacity-80 rounded-full px-3 sm:px-4 py-0.5 sm:py-1 mr-3 sm:mr-4 text-xs">
            3 / 3
          </div>
          
          <img 
            src="https://i.pinimg.com/736x/f3/de/22/f3de223eb67eb7bc977225d949cb65aa.jpg" 
            alt="White Headphones" 
            className="absolute right-0 h-full object-contain"
          />
        </div>
        
        {/* Redmi Phone Banner */}
        <div className="flex-1 bg-gray-200 rounded-lg overflow-hidden relative flex items-center">
          <div className="p-4 sm:p-6 z-10">
            <h3 className="text-xl sm:text-2xl font-bold">redmi note 12 Pro+ 5g</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Rise to the challenge</p>
            
            <button className="bg-black text-white text-xs font-bold py-1 px-3 sm:px-4 rounded-lg mt-4 sm:mt-6 hover:bg-gray-800 transition-colors">
              SHOP NOW
            </button>
          </div>
          
          <img 
            src="https://i.pinimg.com/736x/d5/1b/0d/d51b0d8826063f245dc38e9ff6c5c263.jpg" 
            alt="Redmi Phones" 
            className="absolute right-0 h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
