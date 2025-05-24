import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ 
  products, 
  isLoading = false, 
  error = null,
  onAddToCart = () => {},
  isAddingToCartId = null
}) => {
  if (error) {
    return (
      <div className="flex justify-center items-center p-8 text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="border rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          viewType="grid"
          onAddToCart={() => onAddToCart(product.id)}
          isAddingToCart={isAddingToCartId === product.id}
        />
      ))}
    </div>
  );
};