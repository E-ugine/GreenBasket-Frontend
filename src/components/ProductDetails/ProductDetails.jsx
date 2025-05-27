import React, { useState, useEffect, useRef } from "react";
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
import NotFoundPage from "./NotFoundPage";

const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-500 p-4">
    {message}
  </div>
);

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSidePanel, setShowSidePanel] = useState(false);
  
  const controllerRef = useRef(null);

  useEffect(() => {
    console.log("useEffect running for product Id:", id);
    
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    if (controllerRef.current && !controllerRef.current.signal.aborted) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const { signal } = controller;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        
        console.log('Fetching product ID:', id); 
  
        await new Promise(resolve => setTimeout(resolve, 10));
        
        if (signal.aborted) {
          console.log('Request was aborted before fetch');
          return;
        }
        
        const productData = await fetchProductDetails(id, { signal });
        if (signal.aborted) {
          console.log('Request was aborted after fetch');
          return;
        }
        
        console.log('Fetched product data:', productData); 
        
        // Consistent handling for non-existent products
        if (!productData || 
            productData.error || 
            productData.id === null || 
            productData.id === undefined) {
          setNotFound(true);
          return;
        }

        setProduct(productData);
        setSelectedColor(productData.colors?.[0] || null);
        setSelectedMemory(productData.memorySizes?.[0] || null);
      } catch (err) {
        if (err.name !== 'AbortError' && !signal.aborted) {
          console.error('Error loading product:', err);
          
          // Treat 404-type errors as not found, others as system errors
          if (err.message?.includes('not found') || 
              err.message?.includes('404') ||
              err.status === 404) {
            setNotFound(true);
          } else {
            setError(err.message || 'Failed to load product details');
          }
        } else if (err.name === 'AbortError') {
          console.log('Request aborted, ignoring error');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    return () => {
      if (controllerRef.current && !controllerRef.current.signal.aborted) {
        controllerRef.current.abort();
      }
    };
  }, []);

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 99));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  // Loading state
  if (loading) return <LoadingSpinner fullPage />;
  
  // Product not found - let NotFoundPage handle this consistently
  if (notFound) {
    return <NotFoundPage type="product" productId={id} />;
  }
  
  // System error (network issues, server errors, etc.)
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 bg-white">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Product loaded successfully
  if (!product) {
    return <NotFoundPage type="product" productId={id} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      <MobileStickyBar 
        showSidePanel={showSidePanel} 
        setShowSidePanel={setShowSidePanel} 
        price={product.price}
      />
      
      <div className="flex flex-col lg:flex-row gap-8 relative">
        <ProductImages 
          image={product.image} 
          name={product.name} 
          isNew={product.isNew} 
        />
        
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
      </div>

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
      
      <FrequentlyBoughtTogether productId={id} />
      <ProductTabs 
        product={product} 
        description={product.description}
        specifications={product.specifications}
        reviews={product.reviews}
      />
      <PromotionalBanners />
      <RelatedProducts 
        currentProductId={parseInt(id)} 
        category={product.category} 
      />
    </div>
  );
}