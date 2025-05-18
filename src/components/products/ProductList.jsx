import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductList = ({ products }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewType="list" />
      ))}
    </div>
  );
};