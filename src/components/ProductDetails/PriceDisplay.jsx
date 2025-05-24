import React from 'react';
export default function PriceDisplay({ 
  price, 
  originalPrice, 
  className = '' 
}) {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-bold text-gray-900">
        ${price.toFixed(2)}
      </span>
      
      {hasDiscount && (
        <>
          <span className="text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
            {Math.round((1 - price / originalPrice) * 100)}% OFF
          </span>
        </>
      )}
    </div>
  );
}