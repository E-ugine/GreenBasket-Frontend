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

const createFallbackProduct = (productId = null) => {
  return {
    id: productId || 'fallback-product',
    name: 'Product Not Available',
    price: 0,
    originalPrice: 0,
    discount: 0,
    image: ['/placeholder-product-image.jpg'],
    colors: [],
    memorySizes: [],
    inStock: false,
    isNew: false,
    category: 'unavailable',
    description: 'This product is currently unavailable.',
    specifications: {
      Brand: 'Generic',
      Model: 'N/A'
    },
    reviews: [],
    rating: 0,
    ratingCount: 0,
    stockCount: 0
  };
};

// Error message component
const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-500 p-4">
    {message}
  </div>
);

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSidePanel, setShowSidePanel] = useState(false);
  
  const controllerRef = useRef(null);

  useEffect(() => {
    console.log("useEffect running for product Id:", id);
    
    if (!id) {
      setError('Product ID is required');
      setProduct(createFallbackProduct());
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
        
        if (!productData || productData.error) {
          throw new Error(productData?.error || 'Product not found');
        }

        setProduct(productData);
        setSelectedColor(productData.colors?.[0] || null);
        setSelectedMemory(productData.memorySizes?.[0] || null);
      } catch (err) {
        if (err.name !== 'AbortError' && !signal.aborted) {
          console.error('Error loading product:', err); 
          setError(err.message || 'Failed to load product details');
          setProduct(createFallbackProduct(id));
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

  if (loading) return <LoadingSpinner fullPage />;
  
  if (error && !product) {
    return <NotFoundPage />;
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
          image={product?.image || []} 
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
            <ErrorMessage message="Product information is unavailable" />
          </div>
        )}
      </div>

      {product && (
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
        </>
      )}
    </div>
  );
}