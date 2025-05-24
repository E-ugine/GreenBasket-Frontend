import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductList = ({ 
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
      <div className="space-y-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex gap-4 p-4 border rounded-lg animate-pulse">
            <div className="w-24 h-24 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          viewType="list"
          isLoading={isLoading}
          onAddToCart={() => onAddToCart(product.id)}
          isAddingToCart={isAddingToCartId === product.id}
        />
      ))}
    </div>
  );
};