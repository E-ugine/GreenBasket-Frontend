const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text(); 
    if (!data) {
      throw new Error('Empty response from server');
    }
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    if (!data) {
      throw new Error('Empty response from server');
    }

    const categories = JSON.parse(data);
    return [
      { id: 1, name: 'All Categories' },
      { 
        id: 2, 
        name: 'Categories',
        subcategories: ['All', ...categories]
      }
    ];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};