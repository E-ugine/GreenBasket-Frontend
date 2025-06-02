import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../../services/apiData';

export default function Deals() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 30,
    seconds: 0
  });
  const [dealOfTheDay, setDealOfTheDay] = useState(null);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const allProducts = await fetchProducts();
        
        const electronics = allProducts.filter(
          product => product.category === 'electronics'
        );
        
        if (electronics.length > 0) {
          const shuffled = [...electronics].sort(() => 0.5 - Math.random());
          setDealOfTheDay(shuffled[0]);
          
          setElectronicsProducts(shuffled.slice(1, 3));
        }
      } catch (error) {
        console.error('Error fetching deals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    );
  }

  if (!dealOfTheDay) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-xl font-bold text-gray-700">No deals available at the moment</h2>
          <p className="text-gray-500 mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

  // discount percentage
  const discountPercentage = Math.round(
    ((dealOfTheDay.originalPrice - dealOfTheDay.price) / dealOfTheDay.originalPrice) * 100
  );

  // amount saved
  const amountSaved = (dealOfTheDay.originalPrice - dealOfTheDay.price).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Product card */}
        <div className="w-full lg:w-3/4 bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-wide">DEALS OF THE DAY</h2>
              <div className="flex space-x-2">
                <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product section */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image gallery */}
              <div className="flex flex-row md:flex-col gap-4 order-2 md:order-1">
                {dealOfTheDay.image.map((img, index) => (
                  <div key={index} className="border-2 border-gray-200 hover:border-emerald-500 rounded-lg cursor-pointer p-2 transition-all duration-200">
                    <img 
                      src={img} 
                      alt={`${dealOfTheDay.name} view ${index + 1}`} 
                      className="w-16 h-16 object-contain" 
                    />
                  </div>
                ))}
              </div>

              {/* Main product image */}
              <div className="relative flex-1 order-1 md:order-2">
                <div className="absolute -top-4 -left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                  SAVE ${amountSaved}
                </div>
                <div className="flex justify-center">
                  <img 
                    src={dealOfTheDay.image[0]} 
                    alt={dealOfTheDay.name} 
                    className="w-64 h-64 object-contain" 
                  />
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    FREE SHIPPING
                  </div>
                  <div className="bg-rose-100 text-rose-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m-8-8v8m16-5v5M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    FREE GIFT
                  </div>
                </div>
              </div>

              {/* Product details */}
              <div className="flex-1 order-3">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-gray-500 text-sm">
                      {dealOfTheDay.rating} stars ({Math.floor(dealOfTheDay.rating * 10)} reviews)
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">
                      {dealOfTheDay.name}
                    </h2>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-bold text-rose-600">
                      ${dealOfTheDay.price.toFixed(2)}
                    </span>
                    <span className="text-gray-400 line-through">
                      ${dealOfTheDay.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-emerald-600 font-medium">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Features:</h3>
                  <ul className="space-y-2">
                    {dealOfTheDay.description.split('. ').slice(0, 3).map((feature, index) => (
                      feature.trim() && (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature.trim()}</span>
                        </li>
                      )
                    ))}
                  </ul>
                </div>

                {/* Countdown and progress */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Hurry up! Promotion expires in:
                    </h3>
                    <div className="flex justify-between">
                      {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="text-center">
                          <div className="bg-white rounded-lg shadow-sm p-3 w-16">
                            <div className="text-xl font-bold text-gray-900">
                              {value.toString().padStart(2, '0')}
                            </div>
                            <div className="text-xs text-gray-500 uppercase mt-1">{unit}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Sold: {dealOfTheDay.stockCount - 10}/{dealOfTheDay.stockCount}</span>
                      <span>
                        {Math.round(((dealOfTheDay.stockCount - 10) / dealOfTheDay.stockCount) * 100)}% sold
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2.5 rounded-full" 
                        style={{ 
                          width: `${((dealOfTheDay.stockCount - 10) / dealOfTheDay.stockCount) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>

                  <button 
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wide shadow-md hover:shadow-lg transition-all duration-200 mt-4"
                    onClick={() => handleProductClick(dealOfTheDay.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar offers */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          {electronicsProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden relative group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="absolute top-4 right-4 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full z-10">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice * 100))}% OFF
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.category}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.name}</p>
                <div className="flex justify-center h-32">
                  <img 
                    src={product.image[0]} 
                    alt={product.name} 
                    className="object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                    <span className="text-gray-400 line-through text-sm ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}