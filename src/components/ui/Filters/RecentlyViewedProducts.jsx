import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { fetchProducts, fetchProductDetails } from "../../../services/apiData";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RecentlyViewedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        setLoading(true)
        const allProducts = await fetchProducts();
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        const recentlyViewed = shuffled.slice(0, 4);
        setProducts(recentlyViewed);
      } catch (err) {
        console.error("Failed to fetch recently viewed products:", err);
        setError("Failed to load recently viewed products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyViewed();
  }, []);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  if (error) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recently Viewed</h2>
        </div>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recently Viewed</h2>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="group relative bg-white rounded-lg border border-gray-100 overflow-hidden">
              <div className="relative pt-[50%] bg-gray-50">
                <Skeleton className="absolute top-0 left-0 w-full h-full" />
              </div>
              <div className="p-2 sm:p-3">
                <Skeleton count={2} className="mb-2" />
                <Skeleton width="60%" className="mb-2" />
                <Skeleton height={30} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recently Viewed</h2>
        <Link 
          to="/products" 
          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center"
          aria-label="View all recently viewed products"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="group relative bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
            role="article"
            aria-labelledby={`product-${product.id}-title`}
          >
            {/* Product Badges */}
            <div className="absolute top-2 left-2 z-10 space-y-1">
              {product.isNew && (
                <div className="bg-amber-400 text-gray-900 text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  NEW
                </div>
              )}
              {product.discount > 0 && (
                <div className="bg-emerald-600 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button 
              className="absolute top-2 right-2 z-10 p-1 sm:p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              onClick={() => toggleWishlist(product.id)}
              aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlist.includes(product.id) ? (
                <HeartSolid className="h-4 w-4 text-rose-500" />
              ) : (
                <HeartOutline className="h-4 w-4 text-gray-400 hover:text-rose-500" />
              )}
            </button>

            {/* Product Image with Link */}
            <Link to={`/products/${product.id}`} className="block">
              <div className="relative pt-[50%] bg-gray-50">
                <img
                  src={product.image[0] || '/placeholder-product.jpg'}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width="200" 
                  height="200"
                  onError={(e) => {
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-2 sm:p-3">
              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex space-x-1 mb-1 sm:mb-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index} 
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-gray-200" 
                      style={{ backgroundColor: color }}
                      aria-label={color}
                    />
                  ))}
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center mb-1">
                <div className="flex" aria-label={`Rating: ${product.rating} out of 5`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${star <= product.rating ? 'text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                {product.reviews && product.reviews.length > 0 && (
                  <span className="text-[10px] sm:text-xs text-gray-500 ml-0.5">
                    ({product.reviews.length})
                  </span>
                )}
              </div>

              {/* Product Name with Link */}
              <Link to={`/products/${product.id}`}>
                <h3 
                  id={`product-${product.id}-title`}
                  className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2 line-clamp-2 hover:text-emerald-600 transition-colors leading-tight"
                >
                  {product.name}
                </h3>
              </Link>

              {/* Price */}
              <div className="flex items-baseline">
                {product.originalPrice > product.price ? (
                  <>
                    <span className="text-sm sm:text-base font-bold text-emerald-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500 line-through ml-1">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-sm sm:text-base font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button 
                className="w-full mt-2 py-1 sm:py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                aria-label={`Add ${product.name} to cart`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;