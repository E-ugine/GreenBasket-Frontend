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
          <ProductCard key={index} isLoading={true} viewType="list" />
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
          onAddToCart={() => onAddToCart(product.id)}
          isAddingToCart={isAddingToCartId === product.id}
        />
      ))}
    </div>
  );
};