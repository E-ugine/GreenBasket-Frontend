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
          description: product.description,
          originalPrice: Math.round(product.price * 1.2),
          image: product.image,
          stock: 1,
          shipping: 'FREE SHIPPING',
          reviews: Math.floor(Math.random() * 100),
          isNew: Math.random() > 0.7,
          gift: Math.random() > 0.3
        }));

        setProducts(transformedProducts);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setProducts([]);
        setCategories([{ id: 1, name: 'All Categories' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  return { products, categories, loading, error };
};