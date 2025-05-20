import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const RecentlyViewedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Xomie Remid 8 Sport Watch",
      price: 579.00,
      image: "https://i.pinimg.com/236x/71/42/60/7142602ef88872909fe456606842324f.jpg", // Reduced size
      isNew: true,
      rating: 4.5,
      reviews: 152,
      colors: ["#000000", "#3B82F6", "#EF4444"]
    },
    {
      id: 2,
      name: "Microte Surface 2.0 Laptop",
      price: 979.00,
      image: "https://i.pinimg.com/236x/6a/04/cc/6a04cc90980648b5bdda45d7c2be400c.jpg", // Reduced size
      isNew: true,
      rating: 4.8,
      colors: ["#000000", "#6B7280"]
    },
    {
      id: 3,
      name: "Ergonomic Gaming Chair",
      minPrice: 979.00,
      maxPrice: 1259.00,
      image: "https://i.pinimg.com/236x/03/cc/a5/03cca58147d6cb2a44b6cde81fb574b6.jpg", // Reduced size
      rating: 4.2,
      colors: ["#000000", "#10B981"]
    },
    {
      id: 4,
      name: "SROK Smart Phone 128GB",
      price: 579.00,
      originalPrice: 779.00,
      image: "https://i.pinimg.com/236x/33/af/ba/33afbafaaa77f8020298bf3bd2075798.jpg", // Reduced size
      discount: 200.00,
      rating: 4.7,
      reviews: 152,
      colors: ["#000000", "#F59E0B"]
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recently Viewed</h2>
        <a 
          href="#" 
          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Product Badges */}
            <div className="absolute top-2 left-2 z-10 space-y-1">
              {product.isNew && (
                <div className="bg-amber-400 text-gray-900 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  NEW
                </div>
              )}
              {product.discount && (
                <div className="bg-emerald-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  SAVE ${product.discount}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-2 right-2 z-10 p-1 sm:p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Product Image - Optimized Container */}
            <div className="relative pt-[100%] bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                loading="lazy" // Lazy loading
                width="200" // Explicit dimensions
                height="200"
              />
            </div>

            {/* Product Info */}
            <div className="p-2 sm:p-3">
              {/* Color Options */}
              {product.colors && product.colors.length > 1 && (
                <div className="flex space-x-1 mb-1 sm:mb-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index} 
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-200" 
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${star <= product.rating ? 'text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  {product.reviews && (
                    <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5">({product.reviews})</span>
                  )}
                </div>
              )}

              {/* Product Name */}
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2 line-clamp-2 hover:text-emerald-600 transition-colors leading-tight">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline">
                {product.minPrice ? (
                  <span className="text-sm sm:text-base font-bold text-gray-900">
                    ${product.minPrice.toFixed(2)}-${product.maxPrice.toFixed(2)}
                  </span>
                ) : (
                  <>
                    <span className={`text-sm sm:text-base font-bold ${product.originalPrice ? 'text-emerald-600' : 'text-gray-900'}`}>
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-1">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Add to Cart Button */}
              <button className="w-full mt-2 py-1 sm:py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium rounded transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;