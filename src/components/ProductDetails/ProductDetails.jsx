import React, { useState } from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import MobileStickyBar from "./MobileStickyBar";
import MobileSidePanel from "./MobileSidePanel";
import DesktopSidePanel from "./DesktopSidePanel";
import FrequentlyBoughtTogether from "./FrequentlyBoughtTogether";
import ProductTabs from "./ProductTabs";
import PromotionalBanners from "./PromotionalBanners";
import RelatedProducts from "./RelatedProducts";

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState("Midnight Blue");
  const [selectedMemory, setSelectedMemory] = useState("128GB");
  const [quantity, setQuantity] = useState(1);
  const [showSidePanel, setShowSidePanel] = useState(false);
  
  const productColors = [
    { name: "Midnight Blue", price: 569.00 },
    { name: "Deep Purple", price: 569.00 },
    { name: "Space Black", price: 569.00 }
  ];
  
  const memorySizes = ["64GB", "128GB", "256GB", "512GB"];
  
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white relative">
      <MobileStickyBar 
        showSidePanel={showSidePanel} 
        setShowSidePanel={setShowSidePanel} 
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImages />
        
        <ProductInfo 
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedMemory={selectedMemory}
          setSelectedMemory={setSelectedMemory}
          productColors={productColors}
          memorySizes={memorySizes}
        />
      </div>

      <MobileSidePanel 
        showSidePanel={showSidePanel}
        setShowSidePanel={setShowSidePanel}
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />

      <DesktopSidePanel 
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
      
      <FrequentlyBoughtTogether />
      
      <ProductTabs />
      
      <PromotionalBanners />
      
      <RelatedProducts />
    </div>
  );
}