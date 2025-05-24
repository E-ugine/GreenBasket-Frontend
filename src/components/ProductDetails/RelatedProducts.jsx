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
import NoteFoundPage from "./NotFoundPage";

const createFallbackProduct = (productId = null) => {
  return {
    id: productId || 'fallback-product',
    name: 'Product Not Available',
    price: 0,
    originalPrice: 0,
    discount: 0,
    images: [
      {
        url: '/placeholder-product-image.jpg',
        alt: 'Product image not available'
      }
    ],
    colors: [],
    memorySizes: [],
    inStock: false,
    isNew: false,
    category: '',
    description: 'This product is currently unavailable.',
    specifications: {},
    reviews: [],
    rating: 0,
    stockCount: 0
  };
};

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
    if (!productId) {
      setError('Product ID is required');
      setProduct(createFallbackProduct());
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await fetchProductDetails(productId, { signal });
        
        if (!productData) {
          throw new Error('Product not found');
        }

        setProduct(productData);
        setSelectedColor(productData.colors?.[0] || null);
        setSelectedMemory(productData.memorySizes?.[0] || null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load product details');
          setProduct(createFallbackProduct(productId));
        }
      } finally {
        setLoading(false);
      }
    };

    loadProduct();

    return () => controller.abort();
  }, [productId]);

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  if (loading) return <LoadingSpinner fullPage />;
  
  if (error && !product) {
    return <NoteFoundPage />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      <MobileStickyBar 
        showSidePanel={showSidePanel} 
        setShowSidePanel={setShowSidePanel} 
        price={product?.price || 0}
      />
      
      <div className="flex flex-col lg:flex-row gap-8 relative">
        <ProductImages 
          images={product?.images || []} 
          name={product?.name} 
          isNew={product?.isNew} 
        />
        
        {product ? (
          <>
            <ProductInfo 
              product={product}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              selectedMemory={selectedMemory}
              onSelectMemory={setSelectedMemory}
            />

            <DesktopSidePanel 
              quantity={quantity}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              price={product.price}
              originalPrice={product.originalPrice}
              inStock={product.inStock}
            />
          </>
        ) : (
          <div className="lg:w-1/2">
            <div className="text-red-500 p-4 text-center">Product information is unavailable</div>
          </div>
        )}
      </div>

      {product && productId && (
        <>
          <MobileSidePanel 
            showSidePanel={showSidePanel}
            setShowSidePanel={setShowSidePanel}
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            price={product.price}
            originalPrice={product.originalPrice}
            inStock={product.inStock}
          />
          
          <FrequentlyBoughtTogether productId={productId} />
          <ProductTabs 
            product={product} 
            description={product.description}
            specifications={product.specifications}
            reviews={product.reviews}
          />
          <PromotionalBanners />
          <RelatedProducts 
            currentProductId={productId} 
            category={product.category} 
          />
        </>
      )}
    </div>
  );
}