import React from "react";
import { useState } from "react";

const Banner = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setIsSubmitted(true);
      setPhoneNumber("");
      // Reset submission status after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 p-6 md:p-8 rounded-xl shadow-lg">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left section with logo and offer */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
          {/* Animated logo section */}
          <div className="relative h-36 w-56 group">
            <div className="absolute top-2 left-2 w-full h-full bg-blue-600 rounded-lg transform rotate-[-8deg] transition-transform duration-300 group-hover:rotate-[-12deg]"></div>
            <div className="absolute top-1 left-4 w-full h-full bg-emerald-400 rounded-lg transform rotate-[-4deg] transition-transform duration-300 group-hover:rotate-[-6deg]"></div>
            <div className="relative w-full h-full bg-emerald-500 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg">
              <span className="text-white font-bold text-xl tracking-wide">GreenBasket</span>
            </div>
          </div>
          
          {/* Offer text */}
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-amber-300 mb-2">10% Cashback</h2>
            <p className="text-white/90 max-w-md">
              Earn 10% cashback on your first purchase with GreenBasket. 
              <a href="#" className="text-white font-medium underline ml-1 hover:text-amber-200 transition-colors">
                Terms apply
              </a>
            </p>
          </div>
        </div>

        {/* Right section with app download */}
        <div className="w-full lg:w-auto bg-white/10 backdrop-blur-sm rounded-lg p-5 md:p-6 border border-white/20">
          {isSubmitted ? (
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-1">Download link sent!</h3>
              <p className="text-white/80">Check your messages for the app download link.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-white mb-2 text-center lg:text-right">Get Our Mobile App</h2>
              <p className="text-white/80 mb-4 text-center lg:text-right">
                Enter your phone number to receive download instructions.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="pl-10 w-full p-3 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Send Download Link
                </button>
              </form>
              <p className="text-white/60 text-xs mt-3 text-center lg:text-right">
                By continuing, you agree to our <a href="#" className="underline">Terms of Service</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;