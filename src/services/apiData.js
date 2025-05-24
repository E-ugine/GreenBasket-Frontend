const API_URL = 'https://fakestoreapi.com';

// Fetch all products
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

// Fetch product details by ID
export const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Check if response has content
    const contentLength = response.headers.get('content-length');
    if (contentLength === '0') {
      throw new Error('Empty response from server');
    }
    
    const product = await response.json();
    
    if (!product) {
      throw new Error('No product data received');
    }
    
    // Transform the data to match the frontend requirements
    return {
      ...product,
      images: product.image ? [product.image] : ['/placeholder-image.jpg'],
      isNew: Math.random() > 0.5,
      inStock: true,
      colors: ['Black', 'White', 'Blue', 'Red'].slice(0, Math.floor(Math.random() * 4) + 1),
      memorySizes: ['64GB', '128GB', '256GB'].slice(0, Math.floor(Math.random() * 3) + 1)
    };
    
  } catch (error) {
    console.error('Error fetching product details:', error);
    // Return a fallback product if the API fails
    return {
      id: productId,
      name: 'Product Not Available',
      price: 0,
      description: 'This product is currently not available.',
      category: 'unknown',
      images: ['/placeholder-image.jpg'],
      isNew: false,
      inStock: false,
      colors: [],
      memorySizes: []
    };
  }
};

// categories
export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  const categories = await response.json();
  return categories.map((category, index) => ({
    id: index + 1,
    name: category
  }));
};

// Fetch frequently bought together items 
export const fetchFrequentlyBoughtTogether = async (productId) => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  const allProducts = await response.json();
  
  return allProducts
    .filter(product => product.id !== productId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image
    }));
};

// Fetch related products
export const fetchRelatedProducts = async (currentProductId, category) => {
  try {
    // First try to get products from the same category
    const response = await fetch(`${API_URL}/products/category/${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Failed to fetch category products');
    
    let products = await response.json();
    
    // Filter out the current product
    products = products.filter(product => product.id !== currentProductId);
    
    // If we don't have enough products, fetch some random ones
    if (products.length < 4) {
      const allResponse = await fetch(`${API_URL}/products`);
      if (!allResponse.ok) throw new Error('Failed to fetch all products');
      
      const allProducts = await allResponse.json();
      const additionalProducts = allProducts
        .filter(p => p.id !== currentProductId && !products.some(prod => prod.id === p.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 - products.length);
      
      products = [...products, ...additionalProducts];
    }
    
    // Return maximum 5 related products
    return products
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      }));
  } catch (error) {
    console.error('Error fetching related products:', error);
    // Fallback: return some random products
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw error; // Re-throw original error if this fails
    
    const allProducts = await response.json();
    return allProducts
      .filter(product => product.id !== currentProductId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      }));
  }
};