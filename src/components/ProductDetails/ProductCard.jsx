import React from "react";
import { CheckCircle } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-2 sm:p-4 relative">
      {product.isOnSale && (
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-green-500 text-white text-xs font-bold px-1 sm:px-2 py-1 rounded whitespace-pre-line">
          {product.saleText}
        </div>
      )}
      {product.isNew && (
        <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-1 sm:px-2 py-1 rounded">NEW</div>
      )}

      <div className="flex justify-center mb-2 sm:mb-4">
        <img
          src="/api/placeholder/150/200"
          alt={product.name}
          className="h-24 sm:h-40 object-contain"
        />
      </div>

      {product.ratingCount && (
        <div className="text-xs text-gray-500 mb-1">({product.ratingCount})</div>
      )}

      <h3 className="font-bold text-sm sm:text-base mb-1">{product.name}</h3>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm sm:text-lg font-bold">
          ${product.price.toFixed(2)}
          {product.maxPrice && ` - $${product.maxPrice.toFixed(2)}`}
        </span>
        {product.originalPrice && (
          <span className="text-xs sm:text-sm text-gray-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs mb-2">
        <span
          className={`border ${
            product.shipping === "FREE SHIPPING"
              ? "text-green-500 border-green-500"
              : "text-gray-600"
          } px-1 sm:px-2 py-1`}
        >
          {product.shipping}
        </span>
        {product.hasGift && (
          <span className="text-red-500 border border-red-500 px-1 sm:px-2 py-1">
            FREE GIFT
          </span>
        )}
      </div>

      {product.inStock ? (
        <div className="flex items-center gap-1 text-green-600 text-xs sm:text-sm">
          <CheckCircle size={12} />
          <span>In stock</span>
        </div>
      ) : (
        <div className="text-xs sm:text-sm">Contact</div>
      )}

      {product.colors && product.colors.length > 0 && (
        <div className="flex gap-2 mt-2">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full ${
                color === "gray"
                  ? "bg-gray-200"
                  : color === "blue"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
