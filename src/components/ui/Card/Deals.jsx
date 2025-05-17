import React from 'react';
import { useState, useEffect } from 'react';

export default function Deals() {
  const [timeLeft, setTimeLeft] = useState({
    days: 9,
    hours: 2,
    minutes: 3,
    seconds: 4
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row mx-auto px-4">
      {/* Main content area */}
      <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-md p-2 sm:p-4 mb-4 lg:mb-0">
        {/* Header */}
        <div className="bg-green-500 text-white p-2 rounded-md mb-4 relative">
          <div className="text-lg sm:text-xl font-bold">DEALS OF THE DAY</div>
          <div className="absolute right-2 top-2 text-sm font-medium">
            <div>e</div>
            <div>w</div>
            <div>A</div>
          </div>
        </div>

        {/* Product section */}
        <div className="flex flex-col md:flex-row">
          {/* Left sidebar with thumbnail images - Hidden on small screens */}
          <div className="hidden md:block w-16 mr-4 space-y-4">
            <div className="border border-gray-300 hover:border-green-500 cursor-pointer p-1">
              <img src="https://i.pinimg.com/736x/9c/52/70/9c527012fe3d0383d7415543a1d6cfdc.jpg" alt="Phone front" className="w-full" />
            </div>
            <div className="border border-gray-300 hover:border-green-500 cursor-pointer p-1">
              <img src="https://i.pinimg.com/736x/9c/52/70/9c527012fe3d0383d7415543a1d6cfdc.jpg" alt="Phone display" className="w-full" />
            </div>
            <div className="border border-gray-300 hover:border-green-500 cursor-pointer p-1">
              <img src="https://i.pinimg.com/736x/9c/52/70/9c527012fe3d0383d7415543a1d6cfdc.jpg" alt="Phone back" className="w-full" />
            </div>
            <div className="h-16 border-l border-gray-300 ml-8"></div>
          </div>

          {/* Main product image - adjusted positioning */}
          <div className="w-full md:w-1/3 flex items-start mb-4 md:mb-0">
            <div className="relative">
              <div className="absolute -top-2 left-0 bg-green-500 text-white px-3 py-1 rounded-md font-bold text-sm sm:text-base z-10">
                SAVE<br />
                $199.00
              </div>
              <img src="https://i.pinimg.com/736x/9c/52/70/9c527012fe3d0383d7415543a1d6cfdc.jpg" alt="Xioma Redmi Note 13 Pro" className="w-full max-w-xs mx-auto" />
              <div className="w-full h-0.5 bg-gray-300 mt-2"></div>
            </div>
          </div>

          {/* Product details */}
          <div className="w-full md:w-1/2 md:pl-4 lg:pl-8">
            <div className="text-gray-500 text-right mb-1">(12)</div>
            <h2 className="text-sm sm:text-2xl font-bold mb-4 text-center md:text-left">
              Xioma Redmi
              Note 11 Pro
              256GB 2023,
              Black
              Smartphone
            </h2>
            
            <div className="mb-6">
              <span className="text-red-500 text-2xl sm:text-3xl font-bold">$569.00</span>
              <span className="text-gray-500 line-through ml-2">$759.00</span>
            </div>

            <ul className="list-none mb-6 space-y-2 text-base text-gray-700">
              <li className="flex items-center">
                <span className="mr-2 text-xs">•</span>
                <span className="text-center md:text-left">Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-xs">•</span>
                <span className="text-center md:text-left">DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-xs">•</span>
                <span className="text-center md:text-left">Commanding Power Design: Twin 16+1+2 Phases Digital VRM</span>
              </li>
            </ul>

            <div className="flex mb-8">
              <div className="bg-green-50 text-green-600 px-3 py-1 mr-4 text-sm">FREE SHIPPING</div>
              <div className="bg-red-50 text-red-600 px-3 py-1 text-sm">FREE GIFT</div>
            </div>

            <div className="mb-4 text-center md:text-left">
              <div className="uppercase font-bold text-base text-gray-800">
                HURRY UP!<br />
                PROMOTION<br />
                EXPIRES IN
              </div>
            </div>

            {/* Countdown timer */}
            <div className="flex justify-between mb-8">
              <div className="text-center">
                <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center">
                  <div>
                    <div className="text-lg font-bold">-{timeLeft.days}</div>
                    <div className="text-xs text-gray-500">d</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center">
                  <div>
                    <div className="text-lg font-bold">-{timeLeft.hours}</div>
                    <div className="text-xs text-gray-500">h</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center">
                  <div>
                    <div className="text-lg font-bold">-{timeLeft.minutes}</div>
                    <div className="text-xs text-gray-500">m</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-md w-16 h-16 flex items-center justify-center">
                  <div>
                    <div className="text-lg font-bold">-{timeLeft.seconds}</div>
                    <div className="text-xs text-gray-500">s</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-green-500 h-2 rounded-full w-1/3"></div>
              </div>
            </div>
            <div className="text-sm text-gray-600">Sold: 26/75</div>
          </div>
        </div>
      </div>

      {/* Right sidebar with additional offers */}
      <div className="w-full lg:w-1/4 lg:pl-4 flex flex-col sm:flex-row lg:flex-col space-y-0 sm:space-y-0 lg:space-y-4 sm:space-x-4 lg:space-x-0">
        {/* Xbox controller offer */}
        <div className="relative bg-white rounded-lg overflow-hidden mb-4 sm:mb-0 lg:mb-0 w-full sm:w-1/2 lg:w-full h-40 sm:h-44 lg:h-40">
          <div className="absolute top-0 right-0 bg-yellow-400 text-black text-sm font-bold px-2 py-1">50%</div>
          <div className="text-gray-300 text-2xl sm:text-3xl lg:text-4xl font-bold p-2 opacity-30">SALE</div>
          <div className="flex justify-center items-center h-24">
            <img src="https://i.pinimg.com/736x/e4/ca/8e/e4ca8ebb44d61a5922e4393f53f85a1d.jpg" alt="Xbox controllers" className="max-w-full h-auto object-contain" />
          </div>
        </div>
        
        {/* Tablets and laptops offer */}
        <div className="bg-white rounded-lg overflow-hidden w-full sm:w-1/2 lg:w-full h-40 sm:h-44 lg:h-40">
          <img src="https://i.pinimg.com/736x/8d/19/df/8d19df0f1d0347d9dec351afa2554106.jpg" alt="Tablets and laptops" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}