import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, X } from "lucide-react";

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
        console.log(`Request aborted for ${endpoint}`);
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

const transformProduct = (apiProduct, index) => {
  if (!apiProduct || typeof apiProduct !== 'object') {
    return null;
  }

  return {
    id: apiProduct.id,
    title: apiProduct.title,
    subtitle: index === 0 ? "Premium Quality" : null,
    description: apiProduct.description?.length > 100 ? 
      apiProduct.description.substring(0, 100) + "..." : 
      apiProduct.description,
    price: `$${apiProduct.price}`,
    cta: index === 0 ? "BUY NOW" : (index < 3 ? "DISCOVER NOW" : "SHOP NOW"),
    image: apiProduct.image,
    featured: index === 0,
    category: apiProduct.category,
    rating: apiProduct.rating?.rate || 0
  };
};

const fetchProducts = async (options = {}) => {
  try {
    const result = await fetchApi('products?limit=5', options);
    
    if (result.error) {
      console.error('Failed to fetch products:', result.error);
      return [];
    }

    return Array.isArray(result) 
      ? result.map((p, index) => transformProduct(p, index)).filter(Boolean)
      : [];
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

const fetchCategories = async (options = {}) => {
  try {
    const result = await fetchApi('products/categories', options);
    
    if (result.error) {
      console.error('Failed to fetch categories:', result.error);
      return [
        'electronics',
        'jewelery',
        "men's clothing",
        "women's clothing"
      ];
    }

    return Array.isArray(result) ? result : [];
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error;
    }
    console.error('Error in fetchCategories:', error);
    return [];
  }
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  if (!product) return null;

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    handleProductClick();
  };

  if (product.featured) {
    return (
      <section 
        className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-lg p-4 md:p-6 items-center transition-all hover:shadow-xl duration-300 group cursor-pointer"
        onClick={handleProductClick}
        data-testid={`product-${product.id}`}
      >
        <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-xl md:text-3xl font-extrabold text-neutral-900">
            {product.title}
          </h2>
          {product.subtitle && (
            <h3 className="text-lg md:text-2xl font-semibold text-neutral-900 mt-1 md:mt-2">
              {product.subtitle}
            </h3>
          )}
          {product.description && (
            <p className="mt-2 md:mt-4 text-xs md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}
          {product.price && (
            <p className="mt-1 md:mt-2 text-lg md:text-xl font-bold text-green-600">
              {product.price}
            </p>
          )}
          {product.cta && (
            <button 
              className="mt-3 md:mt-6 bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-green-700 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 text-sm md:text-base"
              onClick={handleButtonClick}
            >
              {product.cta}
            </button>
          )}
        </div>
        <div className="w-full md:w-1/2 h-48 md:h-80 relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-lg transition-transform group-hover:scale-105 duration-500"
            loading="lazy"
          />
        </div>
      </section>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl p-3 md:p-5 flex items-center shadow-sm transition-all hover:shadow-md duration-300 group cursor-pointer"
      onClick={handleProductClick}
      data-testid={`product-${product.id}`}
    >
      <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 relative overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
          loading="lazy"
        />
      </div>
      <div className="ml-3 md:ml-4 flex-1 min-w-0">
        <h3 className="text-sm md:text-lg font-bold truncate">
          {product.title}{" "}
          {product.price && (
            <span className="text-green-600">{product.price}</span>
          )}
        </h3>
        {product.description && (
          <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        )}
        {product.cta && (
          <button 
            className="mt-1 md:mt-2 text-green-600 text-xs md:text-sm font-semibold hover:text-green-700 focus:outline-none focus:underline"
            onClick={handleButtonClick}
          >
            {product.cta}
          </button>
        )}
      </div>
    </div>
  );
};

export default function HeroComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts({ signal: controller.signal }),
          fetchCategories({ signal: controller.signal })
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load data. Please try again.');
          console.error('Error loading data:', err);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
    
    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-6 p-2 md:p-4 rounded-lg border-2 md:border-[3px] border-white py-4 md:py-8 lg:py-12 mt-16 md:mt-12 lg:mt-2 bg-gray-50">
      {/* Mobile Category Menu Toggle */}
      <div className="lg:hidden flex justify-between items-center mb-3 px-2">
        <h2 className="text-red-600 font-bold text-base md:text-lg">SALE 40% OFF</h2>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-3 py-1.5 md:px-4 md:py-2 bg-green-600 text-white rounded-md flex items-center gap-1 md:gap-2 hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 text-sm md:text-base"
          aria-expanded={menuOpen}
          aria-label="Toggle categories menu"
        >
          {menuOpen ? (
            <>
              <X className="w-3 h-3 md:w-4 md:h-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
              <span>Categories</span>
            </>
          )}
        </button>
      </div>

      {/* Left Sidebar */}
      <aside 
        className={`${menuOpen ? 'block' : 'hidden'} lg:block bg-white p-3 md:p-5 rounded-xl lg:w-1/4 w-full mb-4 md:mb-6 lg:mb-0 shadow-md`}
        aria-label="Product categories"
      >
        <h2 className="text-red-600 font-bold text-base md:text-lg mb-3 md:mb-4 hidden lg:block">SALE 40% OFF</h2>
        <ul className="space-y-2 md:space-y-3 items-start text-left">
          {categories.map((category, index) => (
            <li
              key={index}
              className="text-sm md:text-base text-gray-800 cursor-pointer hover:text-green-600 hover:font-semibold transition-colors py-1 md:py-2 px-1 rounded hover:bg-green-50 capitalize"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && console.log(`Selected ${category}`)}
              onClick={() => console.log(`Selected ${category}`)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Hero Banner */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {products.length > 0 ? (
          <>
            {/* Featured Product */}
            <div className="md:col-span-2">
              <ProductCard product={products.find(p => p.featured)} />
            </div>
            
            {/* Other Products */}
            <section className="grid grid-cols-1 gap-4 md:gap-6">
              {products.filter(p => !p.featured).slice(0, 2).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>

            {/* Bottom Row Products */}
            {products.filter(p => !p.featured).slice(2).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        ) : (
          <div className="col-span-2 text-center py-8">
            <p className="text-gray-600">No products available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}