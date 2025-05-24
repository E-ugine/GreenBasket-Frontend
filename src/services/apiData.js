const API_URL = 'https://fakestoreapi.com';
const DEFAULT_TIMEOUT = 8000; 
const fetchApi = async (endpoint, options = {}, retries = 3) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || DEFAULT_TIMEOUT);

    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Handle non-2xx responses
      if (!response.ok) {
        // Special case for 404 - no point retrying
        if (response.status === 404) {
          return { error: `Resource not found: ${endpoint}` };
        }
        throw new Error(`HTTP ${response.status} for ${endpoint}`);
      }

      // Verify response has content
      const text = await response.text();
      if (!text.trim()) {
        throw new Error('Empty response received');
      }

      return JSON.parse(text);

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (attempt === retries) {
        console.error(`API call failed after ${retries} attempts: ${endpoint}`, error);
        return { error: error.message };
      }

      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};

// Transform API product to our frontend format
const transformProduct = (apiProduct) => {
  if (!apiProduct || typeof apiProduct !== 'object') {
    return null;
  }

  return {
    id: apiProduct.id,
    name: apiProduct.title,
    price: apiProduct.price,
    description: apiProduct.description,
    category: apiProduct.category,
    image: [apiProduct.image].filter(Boolean), 
    rating: apiProduct.rating,
    isNew: Math.random() > 0.7, // 30% chance of being "new"
    inStock: true, // Assume in stock unless API says otherwise
    colors: generateRandomColors(),
    memorySizes: generateRandomMemorySizes()
  };
};

const generateRandomColors = () => {
  const allColors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Gray'];
  return allColors.slice(0, Math.floor(Math.random() * allColors.length) + 1);
};

const generateRandomMemorySizes = () => {
  const allSizes = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  return allSizes.slice(0, Math.floor(Math.random() * 2) + 1); 
};

const createFallbackProduct = (productId) => ({
  id: productId || 'unknown',
  name: 'Product Not Available',
  price: 0,
  description: 'This product is currently unavailable.',
  category: 'unavailable',
  images: ['/placeholder-product.jpg'],
  rating: { rate: 0, count: 0 },
  isNew: false,
  inStock: false,
  colors: [],
  memorySizes: []
});


export const fetchProductDetails = async (productId) => {
  if (!productId) {
    console.warn('fetchProductDetails called without productId');
    return createFallbackProduct();
  }

  const result = await fetchApi(`products/${productId}`);

  if (result.error) {
    console.error(`Failed to fetch product ${productId}:`, result.error);
    return createFallbackProduct(productId);
  }

  const transformed = transformProduct(result);
  return transformed || createFallbackProduct(productId);
};

export const fetchProducts = async () => {
  const result = await fetchApi('products');
  
  if (result.error) {
    console.error('Failed to fetch products:', result.error);
    return [];
  }

  return Array.isArray(result) 
    ? result.map(p => transformProduct(p)).filter(Boolean)
    : [];
};

export const fetchCategories = async () => {
  const result = await fetchApi('products/categories');
  
  if (result.error) {
    console.error('Failed to fetch categories:', result.error);
    return [
      { id: 1, name: 'electronics' },
      { id: 2, name: 'jewelery' },
      { id: 3, name: "men's clothing" },
      { id: 4, name: "women's clothing" }
    ];
  }

  return Array.isArray(result)
    ? result.map((name, index) => ({ id: index + 1, name }))
    : [];
};
// Fetch frequently bought together items
export const fetchFrequentlyBoughtTogether = async (productId) => {
  try {
    const response = await fetchWithRetry(`${API_URL}/products`);
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
  } catch (error) {
    console.error('Error fetching frequently bought together items:', error);
    return [];
  }
};

// Fetch related products
export const fetchRelatedProducts = async (currentProductId, category) => {
  try {
    // First try to get products from the same category
    const response = await fetchWithRetry(
      `${API_URL}/products/category/${encodeURIComponent(category)}`
    );
    
    let products = await response.json();
    products = products.filter(product => product.id !== currentProductId);

    // If we don't have enough products, fetch some random ones
    if (products.length < 4) {
      const allResponse = await fetchWithRetry(`${API_URL}/products`);
      const allProducts = await allResponse.json();
      const additionalProducts = allProducts
        .filter(p => p.id !== currentProductId && !products.some(prod => prod.id === p.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 - products.length);
      
      products = [...products, ...additionalProducts];
    }

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
    return [];
  }
};