import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { Badge } from '../ui/Input/Badge';
import { PriceDisplay } from '../ui/Input/PriceDisplay';
import { RatingStars } from '../ui/Input/RatingStars';

export const ProductCard = ({ 
  product, 
  viewType = 'grid',
  isLoading = false,
  onAddToCart = () => {},
  isAddingToCart = false
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't navigate if clicking on the add to cart button or its children
    if (!e.target.closest('.add-to-cart') && product?.id) {
      navigate(`/products/${product.id}`);
    }
  };

  if (isLoading) {
    return (
      <div className={`${
        viewType === 'grid' 
          ? 'flex flex-col bg-white rounded-md shadow-sm relative'
          : 'flex flex-col sm:flex-row bg-white rounded-md shadow-sm relative'
      } animate-pulse`}>
        <div className={`${
          viewType === 'grid' ? 'p-4 flex justify-center' : 'sm:w-1/3 p-4 flex justify-center'
        }`}>
          <div className="h-36 w-full bg-gray-200 rounded"></div>
        </div>
        
        <div className={`${
          viewType === 'grid' ? 'p-4 flex flex-col' : 'sm:w-2/3 p-4 flex flex-col'
        } space-y-3`}>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded mt-4"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`${
        viewType === 'grid' 
          ? 'flex flex-col bg-white rounded-md shadow-sm relative'
          : 'flex flex-col sm:flex-row bg-white rounded-md shadow-sm relative'
      } items-center justify-center p-8 text-gray-500`}>
        Product not available
      </div>
    );
  }

  return (
    <div 
      className={`${
        viewType === 'grid' 
          ? 'flex flex-col bg-white rounded-md shadow-sm relative hover:shadow-md transition-shadow'
          : 'flex flex-col sm:flex-row bg-white rounded-md shadow-sm relative hover:shadow-md transition-shadow'
      } cursor-pointer`}
      onClick={handleCardClick}
    >
      {/* Sale badge or New badge */}
      {product.save ? (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium py-1 px-2 rounded">
          SAVE<br />${product.save}
        </div>
      ) : product.isNew ? (
        <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-medium py-1 px-2 rounded">
          NEW
        </div>
      ) : null}
      
      {/* Gift badge */}
      {product.gift && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium py-1 px-2 rounded">
          GIFT
        </div>
      )}
      
      {/* Product image */}
      <div className={`${
        viewType === 'grid' ? 'p-4 flex justify-center' : 'sm:w-1/3 p-4 flex justify-center'
      }`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="h-36 w-auto object-contain"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/150?text=No+Image';
          }}
        />
      </div>
      
      {/* Product details */}
      <div className={`${
        viewType === 'grid' ? 'p-4 flex flex-col flex-grow' : 'sm:w-2/3 p-4 flex flex-col flex-grow'
      }`}>
        {/* Review count */}
        {product.reviews > 0 && (
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <RatingStars 
              rating={4} 
              size={12} 
              showCount 
              count={product.reviews} 
            />
          </div>
        )}
        
        <h3 className="text-sm font-medium mb-2 flex-grow line-clamp-2">
          {product.name}
        </h3>
        
        {/* Price display */}
        <div className="mb-2">
          <PriceDisplay 
            price={product.price} 
            originalPrice={product.originalPrice} 
            priceRange={product.priceRange} 
          />
        </div>
        
        {/* Shipping and gift information */}
        <div className="flex flex-wrap gap-2 mb-1">
          <div className={`text-xs ${
            product.shipping === 'FREE SHIPPING' 
              ? 'text-green-500' 
              : 'text-gray-600'
          }`}>
            {product.shipping}
          </div>
          
          {product.gift && (
            <div className="text-xs text-red-500">
              FREE GIFT
            </div>
          )}
        </div>
        
        {/* Stock or contact status */}
        {product.stock ? (
          <Badge type="success" text="In stock" />
        ) : product.contact ? (
          <Badge type="info" text="Contact" />
        ) : (
          <Badge type="error" text="Out of stock" />
        )}
        
        {/* Alternative options */}
        {product.alternatives && product.alternatives.length > 0 && (
          <div className="mt-2 flex gap-2">
            {product.alternatives.slice(0, 3).map((alt, idx) => (
              <img 
                key={idx}
                src={alt}
                alt="Product variant"
                className="w-8 h-8 border border-gray-300 rounded-sm object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/32?text=Alt';
                }}
              />
            ))}
            {product.alternatives.length > 3 && (
              <div className="w-8 h-8 border border-gray-300 rounded-sm flex items-center justify-center text-xs bg-gray-100">
                +{product.alternatives.length - 3}
              </div>
            )}
          </div>
        )}
        
        {/* Add to cart button */}
        <button 
          className={`add-to-cart mt-4 w-full ${
            product.stock 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gray-400 cursor-not-allowed'
          } text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          disabled={!product.stock || isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              <span>{product.stock ? 'Add to Cart' : 'Out of Stock'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};