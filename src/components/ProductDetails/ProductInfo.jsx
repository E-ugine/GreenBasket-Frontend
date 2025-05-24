import React from "react";
import ProductMetadata from "./ProductMetadata";
import RatingStars from "./RatingStars";
import PriceDisplay from "./PriceDisplay";
import ColorSelector from "./ColorSelector";
import MemorySelector from "./MemorySelector";

export default function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedMemory,
  setSelectedMemory,
  quantity
}) {
  const {
    name,
    price,
    originalPrice,
    rating,
    ratingCount,
    description,
    colors,
    memorySizes,
    sku,
    category,
    brand,
    inStock
  } = product;

  return (
    <div className="lg:w-1/2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{name}</h1>
      
      <div className="flex items-center gap-2 mb-4">
        <RatingStars rating={rating} size={16} />
        <span className="text-sm text-gray-500">
          {ratingCount} {ratingCount === 1 ? 'review' : 'reviews'}
        </span>
      </div>
      
      <PriceDisplay 
        price={price} 
        originalPrice={originalPrice} 
        className="text-2xl mb-4"
      />
      
      <ProductMetadata 
        sku={sku}
        category={category}
        brand={brand}
      />
      
      <p className="mb-6">{description}</p>
      
      {colors && colors.length > 0 && (
        <ColorSelector 
          colors={colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          className="mb-6"
        />
      )}
      
      {memorySizes && memorySizes.length > 0 && (
        <MemorySelector 
          sizes={memorySizes}
          selectedSize={selectedMemory}
          onSelectSize={setSelectedMemory}
          className="mb-6"
        />
      )}
      
      <div className="border-t border-b border-gray-200 py-4 mb-6">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${
            inStock ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          <span>{inStock ? 'In Stock' : 'Out of Stock'}</span>
        </div>
      </div>
    </div>
  );
}