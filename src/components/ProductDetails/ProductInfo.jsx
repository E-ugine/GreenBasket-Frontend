import React from "react";
import PropTypes from "prop-types";
import ProductMetadata from "./ProductMetadata";
import RatingStars from "./RatingStars";
import PriceDisplay from "./PriceDisplay";
import ColorSelector from "./ColorSelector";
import MemorySelector from "./MemorySelector";

export default function ProductInfo({
  product,
  selectedColor,
  onSelectColor,
  selectedMemory,
  onSelectMemory
}) {
  if (!product) {
    return (
      <div className="lg:w-1/2">
        <div className="text-center text-gray-500">
          Product information not available
        </div>
      </div>
    );
  }

  const {
    name,
    price,
    originalPrice,
    rating,
    ratingCount,
    description,
    colors = [],
    memorySizes = [],
    inStock
  } = product;

  return (
    <div className="lg:w-1/2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{name}</h1>
      
      <div className="flex items-center gap-2 mb-4">
        <RatingStars rating={rating || 0} size={16} />
        <span className="text-sm text-gray-500">
          {ratingCount || 0} {(ratingCount || 0) === 1 ? 'review' : 'reviews'}
        </span>
      </div>
      
      <PriceDisplay 
        price={price || 0} 
        originalPrice={originalPrice} 
        className="text-2xl mb-4"
      />
      
      {/* Pass the entire product object */}
      <ProductMetadata product={product} />
      
      <p className="mb-6 text-gray-700">{description || 'No description available'}</p>
      
      {colors.length > 0 && (
        <ColorSelector 
          colors={colors}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
          className="mb-6"
        />
      )}
      
      {memorySizes.length > 0 && (
        <MemorySelector 
          sizes={memorySizes}
          selectedSize={selectedMemory}
          onSelectSize={onSelectMemory}
          className="mb-6"
        />
      )}
      
      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${
            inStock ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span className={inStock ? 'text-green-600' : 'text-red-600'}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    rating: PropTypes.number,
    ratingCount: PropTypes.number,
    description: PropTypes.string,
    colors: PropTypes.array,
    memorySizes: PropTypes.array,
    inStock: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category: PropTypes.string,
    specifications: PropTypes.object
  }),
  selectedColor: PropTypes.string,
  onSelectColor: PropTypes.func,
  selectedMemory: PropTypes.string,
  onSelectMemory: PropTypes.func
};