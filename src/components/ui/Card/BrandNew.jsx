import React, { useState } from 'react';
const StarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default function BrandNew() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      title: 'Zumac Steel Computer Case',
      subtitle: 'GREEN STEEL MID TOWER COMPUTER CASE',
      description: 'Premium case with excellent airflow and cable management',
      price: 129.99,
      salePrice: 99.99,
      image: 'https://i.pinimg.com/736x/b4/33/37/b43337e415e07be57ea5abbec99dd1a9.jpg',
      backgroundColor: 'bg-gradient-to-br from-emerald-700 to-emerald-500',
      textColor: 'text-white',
      buttonText: 'SHOP NOW',
      badge: {
        text: 'NEW',
        color: 'bg-amber-400 text-gray-900'
      },
      rating: 4,
      reviewCount: 128,
      isNew: true
    },
    {
      id: 2,
      title: '200Hz Curved Gaming Monitor',
      subtitle: 'Ultra-smooth gaming experience',
      description: 'Limited time offer. Hurry up!',
      price: 499.99,
      image: 'https://i.pinimg.com/736x/03/cc/a5/03cca58147d6cb2a44b6cde81fb574b6.jpg',
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      buttonText: 'SHOP NOW',
      badge: {
        text: 'BESTSELLER',
        color: 'bg-rose-600 text-white'
      },
      rating: 5,
      reviewCount: 342
    },
    {
      id: 3,
      title: 'Ergonomic Gaming Chair',
      subtitle: 'FANTASIX PRO SERIES',
      description: 'Premium comfort for long gaming sessions',
      price: 349.99,
      salePrice: 174.99,
      image: 'https://i.pinimg.com/736x/f6/a5/a8/f6a5a862912619b80573216406f5186b.jpg',
      backgroundColor: 'bg-gray-50',
      textColor: 'text-gray-900',
      sale: {
        text: 'SALE',
        percentage: '50% OFF',
        backgroundColor: 'bg-gradient-to-br from-amber-400 to-amber-500',
        textColor: 'text-gray-900'
      },
      buttonText: 'SHOP NOW',
      rating: 4,
      reviewCount: 87
    },
    {
      id: 4,
      title: 'iPed Pro Mini 6',
      subtitle: 'Powerful performance in hand',
      description: 'From $19.99/month or $699.99',
      price: 699.99,
      image: 'https://i.pinimg.com/736x/a5/97/f5/a597f5498af3cc632e4550e1b4ead9ad.jpg',
      backgroundColor: 'bg-gradient-to-br from-amber-300 to-amber-400',
      textColor: 'text-gray-900',
      buttonText: 'SHOP NOW',
      badge: {
        text: 'HOT',
        color: 'bg-rose-600 text-white'
      },
      rating: 3,
      reviewCount: 56
    },
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleViewAllClick = () => {
    setCurrentPage('products');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const ProductCard = ({ product, onClick }) => {
    return (
      <div 
        className={`group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${product.backgroundColor} hover:-translate-y-1 cursor-pointer`}
        onClick={() => onClick(product)}
      >
        <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
          {product.badge && (
            <div className={`px-3 py-1 text-xs font-bold rounded-full ${product.badge.color}`}>
              {product.badge.text}
            </div>
          )}
          {product.isNew && (
            <div className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500 text-white">
              NEW
            </div>
          )}
        </div>
        
        {product.sale && (
          <div className={`absolute top-4 right-4 px-3 py-2 rounded-lg text-center z-10 ${product.sale.backgroundColor}`}>
            <div className="text-xs font-bold">{product.sale.text}</div>
            <div className="text-lg font-bold">{product.sale.percentage}</div>
          </div>
        )}
        
        <div className="relative pt-[100%] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        
        <div className={`p-5 ${product.textColor}`}>
          {product.subtitle && (
            <p className="text-sm font-medium opacity-80 mb-1">{product.subtitle}</p>
          )}
          <h3 className="text-lg font-bold mb-2">{product.title}</h3>
          
          <div className="flex items-center mb-2">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold mr-2">${product.salePrice}</span>
                <span className="text-sm line-through opacity-70">${product.price}</span>
              </>
            ) : (
              <span className="text-lg font-bold">${product.price}</span>
            )}
          </div>
          
          <p className="text-sm opacity-80 mb-3">{product.description}</p>
          
          {product.rating && (
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? 'text-amber-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-xs ml-1 opacity-70">({product.reviewCount})</span>
            </div>
          )}
          
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                product.textColor === 'text-white' 
                  ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30' 
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              Add to Cart
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
            >
              <HeartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (currentPage === 'product-detail' && selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <button
          onClick={handleBackToHome}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.title}</h1>
            {selectedProduct.subtitle && (
              <p className="text-lg text-gray-600 mb-4">{selectedProduct.subtitle}</p>
            )}
            
            <div className="flex items-center mb-4">
              {selectedProduct.rating && (
                <>
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < selectedProduct.rating ? 'text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({selectedProduct.reviewCount} reviews)</span>
                </>
              )}
            </div>
            
            <div className="mb-6">
              {selectedProduct.salePrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 mr-3">${selectedProduct.salePrice}</span>
                  <span className="text-xl line-through text-gray-500">${selectedProduct.price}</span>
                  {selectedProduct.sale && (
                    <span className="ml-3 px-2 py-1 bg-amber-100 text-amber-800 text-sm font-bold rounded">
                      {selectedProduct.sale.percentage}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">${selectedProduct.price}</span>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
            
            <div className="flex space-x-4">
              <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                Add to Cart
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <HeartIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'products') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-600 mt-2">Browse our complete collection</p>
          </div>
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Section header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Brand New Arrivals</h2>
          <p className="text-gray-600 mt-2">Discover our latest products</p>
        </div>
        
        {/* Navigation arrows - now functional */}
        <div className="flex space-x-2">
          <button 
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Product grid - now showing a subset for carousel effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(currentIndex, currentIndex + 4).map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onClick={handleProductClick}
          />
        ))}
      </div>
      
      {/* View all button */}
      <div className="mt-10 text-center">
        <button 
          onClick={handleViewAllClick}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all"
        >
          View All New Arrivals
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}