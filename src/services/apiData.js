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

      if (!response.ok) {
        if (response.status === 404) {
          return { error: `Resource not found: ${endpoint}` };
        }
        throw new Error(`HTTP ${response.status} for ${endpoint}`);
      }

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
    isNew: Math.random() > 0.7,
    inStock: true,
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

const createFallbackProduct = (productId = 'unknown') => ({
  id: productId,
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
}
export const fetchFrequentlyBoughtTogether = async (productId) => {
  try {
    // First get the current product's category
    const product = await fetchProductDetails(productId);
    
    // Then get all products in the same category
    const allProducts = await fetchProducts();
    const sameCategoryProducts = allProducts.filter(
      p => p.category === product.category && p.id !== productId
    );
    
    // Return 3-5 random products from the same category
    const shuffled = sameCategoryProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3 + Math.floor(Math.random() * 2)).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.images?.[0] || '/placeholder-product.jpg'
    }));
  } catch (error) {
    console.error('Error fetching frequently bought together items:', error);
    
    // Fallback: return some default products if the API fails
    return [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 59.99,
        image: '/placeholder-product.jpg'
      },
      {
        id: 2,
        name: 'Phone Case',
        price: 12.99,
        image: '/placeholder-product.jpg'
      },
      {
        id: 3,
        name: 'Screen Protector',
        price: 8.99,
        image: '/placeholder-product.jpg'
      }
    ];
  }
}
export const fetchRelatedProducts = async (productId) => {
  try {
    // First get the current product's category
    const product = await fetchProductDetails(productId);
    
    // Then get all products in the same category
    const allProducts = await fetchProducts();
    const sameCategoryProducts = allProducts.filter(
      p => p.category === product.category && p.id !== productId
    );
    
    // Return 4-6 random products from the same category
    const shuffled = sameCategoryProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4 + Math.floor(Math.random() * 2)).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.images?.[0] || '/placeholder-product.jpg',
      rating: item.rating
    }));
  } catch (error) {
    console.error('Error fetching related products:', error);
    
    // Fallback: return some default products if the API fails
    return [
      {
        id: 1,
        name: 'Wireless Earbuds',
        price: 79.99,
        image: '/placeholder-product.jpg',
        rating: { rate: 4.5, count: 120 }
      },
      {
        id: 2,
        name: 'Bluetooth Speaker',
        price: 49.99,
        image: '/placeholder-product.jpg',
        rating: { rate: 4.2, count: 85 }
      },
      {
        id: 3,
        name: 'Smart Watch',
        price: 129.99,
        image: '/placeholder-product.jpg',
        rating: { rate: 4.7, count: 210 }
      },
      {
        id: 4,
        name: 'Tablet Stand',
        price: 19.99,
        image: '/placeholder-product.jpg',
        rating: { rate: 4.0, count: 65 }
      }
    ];
  }
};