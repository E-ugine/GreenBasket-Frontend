import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { CheckCircle, Star, ShoppingCart, Heart } from "lucide-react";

const getColorClass = (color) => {
  const colorMap = {
    black: "bg-gray-900",
    white: "bg-white border border-gray-300",
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };
  return colorMap[color.toLowerCase()] || "bg-gray-200";
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);
};

const ColorSwatch = React.memo(({ color, isSelected, onClick }) => (
  <button
    type="button"
    className={`w-6 h-6 rounded-full ${getColorClass(color)} ${
      isSelected ? "ring-2 ring-offset-1 ring-blue-500" : ""
    } transition-all duration-300 shadow-sm hover:scale-110`}
    aria-label={`Select color ${color}`}
    title={color}
    onClick={() => onClick(color)}
  />
));

ColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

ColorSwatch.defaultProps = {
  isSelected: false,
  onClick: () => {},
};

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${className} shadow-sm`}
  >
    {children}
  </span>
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const ProductCard = ({ product }) => {
  const {
    isOnSale,
    saleText,
    isNew,
    name,
    price,
    maxPrice,
    originalPrice,
    rating,
    reviewCount,
    shipping,
    hasGift,
    inStock,
    colors = [],
    imageUrl,
  } = product;

  const formattedPrice = useMemo(() => formatPrice(price), [price]);
  const formattedMaxPrice = useMemo(
    () => maxPrice && formatPrice(maxPrice),
    [maxPrice]
  );
  const formattedOriginalPrice = useMemo(
    () => originalPrice && formatPrice(originalPrice),
    [originalPrice]
  );

  const [selectedColor, setSelectedColor] = React.useState(colors[0] || "");

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-in-out hover:scale-[1.015] hover:shadow-lg hover:border-blue-300"
      aria-label={name}
    >
      <button
        className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 text-gray-400 shadow-md transition duration-200 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Add to wishlist"
      >
        <Heart size={20} fill="currentColor" />
      </button>

      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        {isOnSale && (
          <Badge className="bg-red-600 text-white animate-pulse">
            {saleText || "SALE!"}
          </Badge>
        )}
        {isNew && <Badge className="bg-blue-500 text-white">NEW</Badge>}
      </div>

      <div className="relative mb-4 aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={
            imageUrl ||
            "https://via.placeholder.com/300x300?text=Product+Image"
          }
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        {(rating > 0 || reviewCount > 0) && (
          <div className="mb-2 flex items-center text-sm text-gray-600">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.round(rating) ? "gold" : "gray"}
                  stroke={i < Math.round(rating) ? "gold" : "gray"}
                />
              ))}
            </div>
            {rating > 0 && (
              <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
            )}
            {reviewCount > 0 && (
              <span className="ml-2 text-gray-500">
                ({reviewCount} reviews)
              </span>
            )}
          </div>
        )}

        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
          <a
            href="#"
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            {name}
          </a>
        </h3>

        <div className="mb-3 flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">
            {formattedPrice}
            {formattedMaxPrice && ` - ${formattedMaxPrice}`}
          </span>
          {formattedOriginalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {shipping && (
            <Badge
              className={
                shipping.toLowerCase() === "free shipping"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }
            >
              {shipping}
            </Badge>
          )}
          {hasGift && (
            <Badge className="bg-purple-200 text-purple-800">FREE GIFT</Badge>
          )}
        </div>

        <div className="mt-auto text-sm">
          {inStock ? (
            <span className="flex items-center gap-1 text-green-600 font-medium">
              <CheckCircle size={16} aria-hidden="true" />
              <span>In stock</span>
            </span>
          ) : (
            <span className="text-red-500 font-medium">Out of stock</span>
          )}
        </div>

        {colors.length > 0 && (
          <div
            className="mt-4 flex items-center gap-2"
            aria-label="Available colors"
          >
            <span className="text-sm font-medium text-gray-700">Colors:</span>
            {colors.slice(0, 5).map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                isSelected={selectedColor === color}
                onClick={setSelectedColor}
              />
            ))}
            {colors.length > 5 && (
              <span className="text-xs text-gray-500">
                +{colors.length - 5} more
              </span>
            )}
          </div>
        )}

        <button className="mt-5 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </article>
  );
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
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    shipping: PropTypes.string,
    hasGift: PropTypes.bool,
    inStock: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string),
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default React.memo(ProductCard);
