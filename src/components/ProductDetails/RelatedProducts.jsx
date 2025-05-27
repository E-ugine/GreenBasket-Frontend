import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const RelatedProducts = ({ currentProductId, category }) => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('idle'); 

  useEffect(() => {
    if (!currentProductId || !category) return;

    const controller = new AbortController();
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setStatus('loading');
        
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
          { signal: controller.signal }
        );

        if (!isMounted) return;
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const filtered = data
          .filter(p => p.id !== currentProductId)
          .slice(0, 4)
          .map(p => ({
            id: p.id,
            name: p.title,
            price: p.price,
            // Fix: Use imageUrl property name that ProductCard expects
            imageUrl: p.image,
            rating: p.rating?.rate,
            // Add other properties that ProductCard might expect
            inStock: true,
            ratingCount: p.rating?.count || 0
          }));

        setProducts(filtered);
        setStatus('success');
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          console.error('Failed to load related products:', error);
          setStatus('error');
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [currentProductId, category]);

  if (status === 'idle') return null;
  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <div className="text-red-500">Failed to load suggestions</div>;

  return (
    <section className="my-8" data-testid="related-products">
      <h2 className="text-xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

RelatedProducts.propTypes = {
  currentProductId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  category: PropTypes.string.isRequired
};

export default RelatedProducts;