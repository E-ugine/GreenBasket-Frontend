import React from "react";
import { useState } from "react";

const Banner = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 md:p-6 rounded-xl gap-6">
      {/* Left section with logo and offer */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        {/* Logo section */}
        <div className="relative h-32 w-full sm:w-52 max-w-xs">
          <div className="absolute top-2 left-2 w-full sm:w-52 h-32 bg-blue-700 rounded-md transform rotate-[-15deg]"></div>
          <div className="absolute top-0 left-6 w-full sm:w-52 h-32 bg-green-600 rounded-md transform rotate-[-10deg]"></div>
          <div className="relative w-full sm:w-52 h-32 bg-green-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">GreenBasket</span>
          </div>
        </div>
        
        {/* Offer text */}
        <div className="text-center sm:text-left mt-4 sm:mt-0 sm:ml-4">
          <h2 className="text-2xl font-bold text-yellow-400">10% Back</h2>
          <p className="text-gray-700">
            Earn 10% Cash back on GreenBasket. <a href="#" className="text-blue-500 underline">Learn How</a>
          </p>
        </div>
      </div>

      {/* Right section with app download */}
      <div className="flex flex-col items-center md:items-end mt-6 md:mt-0 w-full md:w-auto">
        <h2 className="text-xl font-semibold text-gray-800">Download our app</h2>
        <p className="text-gray-600 text-center md:text-right">Enter your phone number and we'll send you a download link.</p>
        <div className="flex mt-2 w-full max-w-xs">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="(+xx) xxx..."
            className="p-2 rounded-l-md border border-gray-300 focus:outline-none w-full"
          />
          <button className="bg-green-500 text-white px-4 rounded-r-md whitespace-nowrap">SEND LINK</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;