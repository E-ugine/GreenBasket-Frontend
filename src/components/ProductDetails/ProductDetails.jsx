import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import MobileStickyBar from "./MobileStickyBar";
import MobileSidePanel from "./MobileSidePanel";
import DesktopSidePanel from "./DesktopSidePanel";
import FrequentlyBoughtTogether from "./FrequentlyBoughtTogether";
import ProductTabs from "./ProductTabs";
import PromotionalBanners from "./PromotionalBanners";
import RelatedProducts from "./RelatedProducts";
import { fetchProductDetails } from "../../services/apiData";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSidePanel, setShowSidePanel] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await fetchProductDetails(productId);
        setProduct(productData);
        if (productData.colors?.length) {
          setSelectedColor(productData.colors[0]);
        }
        if (productData.memorySizes?.length) {
          setSelectedMemory(productData.memorySizes[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <div className="text-red-500 p-8 text-center">{error}</div>;
  if (!product || product.name === 'Product Not Available') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Product not found</h2>
        <p>We're sorry, but the product you're looking for is not available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white relative">
      <MobileStickyBar 
        showSidePanel={showSidePanel} 
        setShowSidePanel={setShowSidePanel} 
        price={product.price}
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <ProductImages images={product.images} name={product.name} isNew={product.isNew} />
        
        <ProductInfo 
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedMemory={selectedMemory}
          setSelectedMemory={setSelectedMemory}
          quantity={quantity}
        />
      </div>

      <MobileSidePanel 
        showSidePanel={showSidePanel}
        setShowSidePanel={setShowSidePanel}
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        price={product.price}
        inStock={product.inStock}
      />

      <DesktopSidePanel 
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        price={product.price}
        inStock={product.inStock}
      />
      
      <FrequentlyBoughtTogether productId={productId} />
      
      <ProductTabs product={product} />
      
      <PromotionalBanners />
      
      <RelatedProducts currentProductId={productId} category={product.category} />
    </div>
  );
}