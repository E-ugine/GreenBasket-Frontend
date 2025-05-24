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
          <ProductCard key={index} isLoading={true} />
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