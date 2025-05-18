import React from 'react';
export const PriceDisplay = ({ price, originalPrice, priceRange }) => {
  if (priceRange) {
    return (
      <div className="flex items-baseline">
        <span className="text-lg font-bold">
          ${priceRange.min} - ${priceRange.max}
        </span>
      </div>
    );
  }
  
  return (
    <div className="flex items-baseline">
      <span className="text-lg font-bold text-red-500">${price}</span>
      {originalPrice && (
        <span className="ml-2 text-sm text-gray-500 line-through">
          ${originalPrice}
        </span>
      )}
    </div>
  );
};