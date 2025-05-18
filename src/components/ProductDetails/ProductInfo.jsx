import React from "react";
import ColorSelector from "./ColorSelector";
import MemorySelector from "./MemorySelector";
import PromotionBanner from "./PromotionBanner";
import ProductMetadata from "./ProductMetadata";
import SocialShare from "./SocialShare";

export default function ProductInfo({
  selectedColor,
  setSelectedColor,
  selectedMemory,
  setSelectedMemory,
  productColors,
  memorySizes,
}) {
  return (
    <div className="lg:w-1/2">
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>(5)</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          Somseng Galatero X6 Ultra LTE 4G/128GB, Black Smartphone
        </h1>
        <div className="text-xl sm:text-2xl font-bold mb-4">$569.00 - $609.00</div>

        <ul className="space-y-2 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-gray-500 mt-1">•</span>
            <span>Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-500 mt-1">•</span>
            <span>DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-500 mt-1">•</span>
            <span>Commanding Power Design: Twin 16+1+2 Phases Digital VRM</span>
          </li>
        </ul>

        <div className="flex gap-2 sm:gap-4 my-4 flex-wrap">
          <span className="bg-green-100 text-green-600 px-3 py-1 text-sm rounded">
            FREE SHIPPING
          </span>
          <span className="bg-red-100 text-red-600 px-3 py-1 text-sm rounded">
            FREE GIFT
          </span>
        </div>
      </div>

      <ColorSelector
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        productColors={productColors}
      />

      <MemorySelector
        selectedMemory={selectedMemory}
        setSelectedMemory={setSelectedMemory}
        memorySizes={memorySizes}
      />

      <PromotionBanner />
      <ProductMetadata />
      <SocialShare />
    </div>
  );
}
