export const products = [
  {
    id: 1,
    name: 'SROK Smart Phone 128GB, Oled Retina',
    price: 579.00,
    originalPrice: 859.00,
    image: '/api/placeholder/200/350',
    save: 199.00,
    stock: 1,
    shipping: 'FREE SHIPPING',
    reviews: 152,
    isNew: false,
    gift: false
  },
  {
    id: 2,
    name: 'aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB',
    priceRange: { min: 979.00, max: 1259.00 },
    image: '/api/placeholder/200/350',
    shipping: '$2.98 SHIPPING',
    stock: 1,
    reviews: 5,
    isNew: true,
    gift: false
  },
  {
    id: 3,
    name: 'Samsung Galaxy X6 Ultra LTE 4G/128 Gb, Black Smartphone',
    price: 659.00,
    image: '/api/placeholder/200/350',
    shipping: 'FREE SHIPPING',
    stock: 1,
    reviews: 5,
    isNew: true,
    gift: true
  },
  {
    id: 4,
    name: 'Xiaomi Redmi Note 5, 64GB',
    price: 1239.00,
    originalPrice: 1619.00,
    image: '/api/placeholder/200/350',
    save: 59.00,
    shipping: 'FREE SHIPPING',
    contact: true,
    reviews: 9,
    isNew: false,
    gift: false
  },
  {
    id: 5,
    name: 'Microsute Alpha Ultra S5 Surface 128GB 2022, Silver',
    price: 1729.00,
    image: '/api/placeholder/200/350',
    shipping: 'FREE SHIPPING',
    contact: true,
    reviews: 8,
    isNew: false,
    alternatives: [
      '/api/placeholder/50/50',
      '/api/placeholder/50/50'
    ]
  },
  {
    id: 6,
    name: 'OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS',
    price: 569.00,
    originalPrice: 759.00,
    image: '/api/placeholder/200/350',
    save: 199.00,
    stock: 1,
    shipping: 'FREE SHIPPING',
    reviews: 152,
    isNew: false
  },
  {
    id: 7,
    name: 'Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone',
    priceRange: { min: 59.00, max: 129.00 },
    image: '/api/placeholder/200/350',
    shipping: 'FREE SHIPPING',
    stock: 1,
    reviews: 2,
    isNew: false
  },
  {
    id: 8,
    name: 'aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular',
    price: 279.00,
    image: '/api/placeholder/200/350',
    shipping: '$2.98 SHIPPING',
    stock: 1,
    reviews: 0,
    isNew: false
  }
];

export const categories = [
  { id: 1, name: 'All Categories' },
  { 
    id: 2, 
    name: 'Cell Phones & Tablets',
    subcategories: [
      'All',
      'Iphone',
      'Samsung',
      'Xiaomi',
      'Asus',
      'Oppo',
      'Gaming Smartphone',
      'Ipad',
      'Window Tablets',
      'eReader',
      'Smartphone Chargers',
      '5G Support Smartphone',
      'Smartphone Accessories',
      'Tablets Accessories',
      'Cell Phones'
    ] 
  }
];