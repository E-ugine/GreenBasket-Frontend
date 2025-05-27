import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';

const RelatedProducts = ({ currentProductId, category, onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();

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
            imageUrl: p.image,
            rating: p.rating?.rate || 0,
            reviewCount: p.rating?.count || 0,
            inStock: true,
            isOnSale: false,
            isNew: false,
            hasGift: false,
            shipping: null,
            colors: [],
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

  // Handle product navigation using React Router
  const handleProductNavigation = (productId) => {
    if (onProductClick) {
      // Use custom handler if provided
      onProductClick(productId);
    } else {
      // Default React Router navigation
      navigate(`/products/${productId}`);
    }
  };

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
            onNavigate={handleProductNavigation}
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
  category: PropTypes.string.isRequired,
  onProductClick: PropTypes.func, // Optional custom navigation handler
};

export default RelatedProducts;