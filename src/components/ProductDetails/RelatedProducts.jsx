import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchRelatedProducts } from "../../services/apiData";
import LoadingSpinner from "./LoadingSpinner";

export default function RelatedProducts({ currentProductId, category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const relatedProducts = await fetchRelatedProducts(currentProductId, category);
        setProducts(relatedProducts);
      } catch (err) {
        console.error('Error loading related products:', err);
        setError('Failed to load related products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadRelatedProducts();
  }, [currentProductId, category]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;
  if (products.length === 0) return null;

  return (
    <div className="mt-12 mb-20 lg:mb-10 lg:mr-64">
      <h2 className="text-xl font-bold mb-6">RELATED PRODUCTS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={{
              ...product,
              // Add any additional transformations needed for  ProductCard
              originalPrice: Math.round(product.price * 1.2), 
              shipping: 'FREE SHIPPING',
              reviews: Math.floor(Math.random() * 100),
              isNew: Math.random() > 0.7
            }} 
          />
        ))}
      </div>
    </div>
  );
}