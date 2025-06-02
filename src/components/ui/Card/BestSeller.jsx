import React from 'react';
import { useState, useEffect } from 'react';

const API_URL = 'https://fakestoreapi.com';
const DEFAULT_TIMEOUT = 8000;

const fetchApi = async (endpoint, options = {}, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    let timeoutId;
    
    if (!options.signal) {
      timeoutId = setTimeout(() => controller.abort(), options.timeout || DEFAULT_TIMEOUT);
    }

    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        signal: options.signal || controller.signal
      });

      if (timeoutId) clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          return { error: `Resource not found: ${endpoint}`, status: 404 };
        }
        throw new Error(`HTTP ${response.status} for ${endpoint}`);
      }

      const text = await response.text();
      if (!text.trim()) {
        throw new Error('Empty response received');
      }

      return JSON.parse(text);
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
    
      if (error.name === 'AbortError' && options.signal) {
        if (process.env.NODE_ENV !== 'development') {
          console.log(`Request aborted for ${endpoint}`);
        }
        throw error; 
      }

      if (error.name === 'AbortError') {
        console.log(`Request timed out for ${endpoint}, attempt ${attempt}`);
      }
      
      if (attempt === retries) {
        console.error(`API call failed after ${retries} attempts: ${endpoint}`, error);
        return { error: error.message };
      }

      if (error.name === 'AbortError' && options.signal?.aborted) {
        return { error: error.message };
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};

const fetchProductsByCategory = async (category, options = {}) => {
  try {
    const result = await fetchApi(`products/category/${category}`, options);
    
    if (result.error) {
      console.error(`Failed to fetch ${category} products:`, result.error);
      return [];
    }

    return Array.isArray(result) ? result : [];
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error(`Error in fetchProductsByCategory for ${category}:`, error);
    return [];
  }
};

const transformProduct = (apiProduct) => {
  if (!apiProduct || typeof apiProduct !== 'object') {
    return null;
  }

  const originalPrice = apiProduct.price * 1.2;
  const save = originalPrice - apiProduct.price;

  return {
    id: apiProduct.id,
    name: apiProduct.title,
    price: apiProduct.price,
    originalPrice: Math.random() > 0.5 ? originalPrice : null,
    image: apiProduct.image,
    reviews: Math.floor(Math.random() * 200) + 1,
    inStock: Math.random() > 0.1, // 90% chance of being in stock
    freeShipping: Math.random() > 0.3, // 70% chance of free shipping
    freeGift: Math.random() > 0.7, // 30% chance of free gift
    save: Math.random() > 0.5 ? save : null,
    shipping: Math.random() > 0.8 ? (Math.random() * 5 + 1) : null, // 20% chance of shipping cost
    preOrder: Math.random() > 0.9, // 10% chance of pre-order
    maxPrice: Math.random() > 0.8 ? (apiProduct.price * 1.5) : null, // 20% chance of price range
    showContact: Math.random() > 0.95 // 5% chance of showing contact
  };
};

export default function BestSeller() {
  const [activeTab, setActiveTab] = useState('BEST SELLER');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsForTab = async (tab) => {
    setLoading(true);
    try {
      let fetchedProducts = [];
      
      switch (tab) {
        case 'BEST SELLER':
          // Randomly fetch from electronics or jewelery
          const bestSellerCategories = ['electronics', 'jewelery'];
          const randomCategory = bestSellerCategories[Math.floor(Math.random() * bestSellerCategories.length)];
          const bestSellerData = await fetchProductsByCategory(randomCategory);
          fetchedProducts = bestSellerData.slice(0, 5); // Limit to 5 products
          break;
          
        case 'NEW IN':
          // Display only electronics
          const newInData = await fetchProductsByCategory('electronics');
          fetchedProducts = newInData.slice(0, 5);
          break;
          
        case 'POPULAR':
          // Display products from men's clothing and women's clothing
          const [mensClothing, womensClothing] = await Promise.all([
            fetchProductsByCategory("men's clothing"),
            fetchProductsByCategory("women's clothing")
          ]);
          const combinedClothing = [...mensClothing, ...womensClothing];
          // Shuffle and take 5 products
          fetchedProducts = combinedClothing.sort(() => 0.5 - Math.random()).slice(0, 5);
          break;
          
        default:
          fetchedProducts = [];
      }
      
      const transformedProducts = fetchedProducts.map(transformProduct).filter(Boolean);
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsForTab(activeTab);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProductClick = (productId) => {
    // Navigate to product details page
    window.location.href = `/products/${productId}`;
  };

  const handleProductKeyPress = (event, productId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleProductClick(productId);
    }
  };

  return (
    <div className="mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-6 overflow-x-auto">
        <div className="flex space-x-4 md:space-x-8">
          <a 
            href="#" 
            className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'BEST SELLER' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={(e) => {
              e.preventDefault();
              handleTabChange('BEST SELLER');
            }}
          >
            BEST SELLER
          </a>
          <a 
            href="#" 
            className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'NEW IN' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={(e) => {
              e.preventDefault();
              handleTabChange('NEW IN');
            }}
          >
            NEW IN
          </a>
          <a 
            href="#" 
            className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'POPULAR' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={(e) => {
              e.preventDefault();
              handleTabChange('POPULAR');
            }}
          >
            POPULAR
          </a>
        </div>
        <a href="#" className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">View All</a>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2 text-gray-600">Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div className="text-gray-400 mb-2">No products found</div>
            <button 
              onClick={() => fetchProductsForTab(activeTab)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Try again
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="relative flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300 rounded-lg p-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => handleProductClick(product.id)}
              onKeyPress={(e) => handleProductKeyPress(e, product.id)}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${product.name}`}
            >
              {product.save && (
                <div className="absolute top-1 sm:top-2 left-1 sm:left-2 z-10 bg-green-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-sm flex flex-col items-center">
                  <span className="text-xs">SAVE</span>
                  <span className="text-xs">${product.save.toFixed(2)}</span>
                </div>
              )}
              <div className="mb-2 sm:mb-4 relative">
                <div className="bg-white rounded-lg flex items-center justify-center p-2 sm:p-4 hover:bg-gray-50 transition-colors duration-200">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-contain" 
                  />
                </div>
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                  <div 
                    className="h-4 w-4 sm:h-6 sm:w-6 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Added to wishlist:', product.id);
                    }}
                    role="button"
                    aria-label="Add to wishlist"
                  ></div>
                </div>
              </div>
              
              {product.reviews && (
                <div className="text-xs text-gray-500 mb-0.5 sm:mb-1">({product.reviews})</div>
              )}
              
              <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">{product.name}</h3>
              
              <div className="flex items-baseline mb-1 sm:mb-2 flex-wrap">
                {product.maxPrice ? (
                  <span className="text-xs sm:text-sm font-bold">${product.price.toFixed(2)} - ${product.maxPrice.toFixed(2)}</span>
                ) : (
                  <>
                    <span className="text-xs sm:text-sm font-bold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through ml-1 sm:ml-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </>
                )}
              </div>
              
              <div className="mt-auto">
                {product.shipping && (
                  <div className="text-xs text-gray-500 mb-0.5 sm:mb-1">${product.shipping.toFixed(2)} SHIPPING</div>
                )}
                
                {product.preOrder && (
                  <div className="text-xs font-medium mb-0.5 sm:mb-1">PRE - ORDER</div>
                )}
                
                {product.showContact && (
                  <div className="text-xs mb-0.5 sm:mb-1">Contact</div>
                )}
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-1 sm:mb-2">
                  {product.freeShipping && (
                    <span className="text-xs text-green-500 uppercase">Free shipping</span>
                  )}
                  {product.freeGift && (
                    <span className="text-xs text-green-500 uppercase">Free gift</span>
                  )}
                </div>
                
                <div className="flex items-center">
                  {product.inStock ? (
                    <>
                      <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-xs">In stock</span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-xs text-red-500">Out of stock</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}