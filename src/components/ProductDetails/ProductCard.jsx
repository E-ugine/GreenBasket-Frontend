import React from "react";
import PropTypes from "prop-types";
import { CheckCircle } from "lucide-react";

const ProductCard = ({ product }) => {
  const {
    isOnSale,
    saleText,
    isNew,
    name,
    price,
    maxPrice,
    originalPrice,
    ratingCount,
    shipping,
    hasGift,
    inStock,
    colors = []
  } = product;

  return (
    <article 
      className="border rounded-lg p-2 sm:p-4 relative hover:shadow-md transition-shadow"
      aria-label={name}
    >
      {/* Badges - Sale & New */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-1 z-10">
        {isOnSale && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {saleText}
          </span>
        )}
        {isNew && !isOnSale && (
          <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="flex justify-center mb-2 sm:mb-4 relative aspect-[3/4]">
        <img
          src={product.imageUrl || "/placeholder-product.jpg"}
          alt={name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Rating Count */}
      {ratingCount > 0 && (
        <div className="text-xs text-gray-500 mb-1">
          {ratingCount} {ratingCount === 1 ? 'review' : 'reviews'}
        </div>
      )}

      {/* Product Name */}
      <h3 className="font-bold text-sm sm:text-base mb-1 line-clamp-2" title={name}>
        {name}
      </h3>

      {/* Pricing */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-sm sm:text-lg font-bold">
          ${price.toFixed(2)}
          {maxPrice && ` - $${maxPrice.toFixed(2)}`}
        </span>
        {originalPrice && (
          <span className="text-xs sm:text-sm text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Shipping & Promos */}
      <div className="flex flex-wrap gap-1 mb-2">
        {shipping && (
          <span
            className={`border ${
              shipping === "FREE SHIPPING"
                ? "text-green-500 border-green-500"
                : "text-gray-600 border-gray-300"
            } px-2 py-1 text-xs`}
          >
            {shipping}
          </span>
        )}
        {hasGift && (
          <span className="text-red-500 border border-red-500 px-2 py-1 text-xs">
            FREE GIFT
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="text-xs sm:text-sm">
        {inStock ? (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle size={12} aria-hidden="true" />
            <span>In stock</span>
          </span>
        ) : (
          <span className="text-gray-500">Contact for availability</span>
        )}
      </div>

      {/* Color Variants */}
      {colors.length > 0 && (
        <div className="flex gap-2 mt-2" aria-label="Available colors">
          {colors.slice(0, 5).map((color) => (
            <div
              key={color}
              className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full ${getColorClass(color)}`}
              aria-label={color}
            />
          ))}
          {colors.length > 5 && (
            <span className="text-xs self-center">+{colors.length - 5} more</span>
          )}
        </div>
      )}
    </article>
  );
};

const getColorClass = (color) => {
  const colorMap = {
    black: "bg-gray-900",
    white: "bg-white border border-gray-300",
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
  };
  return colorMap[color.toLowerCase()] || "bg-gray-200";
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    isOnSale: PropTypes.bool,
    saleText: PropTypes.string,
    isNew: PropTypes.bool,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    maxPrice: PropTypes.number,
    originalPrice: PropTypes.number,
    ratingCount: PropTypes.number,
    shipping: PropTypes.string,
    hasGift: PropTypes.bool,
    inStock: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string
  }).isRequired
};

export default React.memo(ProductCard);