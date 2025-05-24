import { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../services/apiData';

export const useApiData = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts().catch(e => { throw new Error(`Products: ${e.message}`) }),
          fetchCategories().catch(e => { throw new Error(`Categories: ${e.message}`) })
        ]);
        
        const transformedProducts = productsData.map(product => ({
          id: product.id,
          name: product.title,
          price: product.price,
          originalPrice: Math.round(product.price * 1.2), // Add 20% as "original" price
          image: product.image,
          stock: 1, // FakeStoreAPI doesn't provide stock info
          shipping: 'FREE SHIPPING',
          reviews: Math.floor(Math.random() * 100), // Fake reviews count
          isNew: Math.random() > 0.7, // 30% chance to be "new"
          gift: Math.random() > 0.8 // 20% chance to be a "gift"
        }));

        setProducts(transformedProducts);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        // Set fallback empty data
        setProducts([]);
        setCategories([{ id: 1, name: 'All Categories' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cancel any pending requests if component unmounts
    };
  }, []);

  return { products, categories, loading, error };
};