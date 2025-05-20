import React from 'react';

export default function BrandNew() {
  const products = [
    {
      id: 1,
      title: 'Zumac Steel Computer Case',
      subtitle: 'GREEN STEEL MID TOWER COMPUTER CASE',
      description: 'Premium case with excellent airflow and cable management',
      image: 'https://i.pinimg.com/736x/b4/33/37/b43337e415e07be57ea5abbec99dd1a9.jpg',
      backgroundColor: 'bg-gradient-to-br from-emerald-700 to-emerald-500',
      textColor: 'text-white',
      buttonText: 'SHOP NOW',
      badge: {
        text: 'NEW',
        color: 'bg-amber-400 text-gray-900'
      }
    },
    {
      id: 2,
      title: '200Hz Curved Gaming Monitor',
      subtitle: 'Ultra-smooth gaming experience',
      description: 'Limited time offer. Hurry up!',
      image: 'https://i.pinimg.com/736x/03/cc/a5/03cca58147d6cb2a44b6cde81fb574b6.jpg',
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      buttonText: 'SHOP NOW',
      badge: {
        text: 'BESTSELLER',
        color: 'bg-rose-600 text-white'
      }
    },
    {
      id: 3,
      title: 'Ergonomic Gaming Chair',
      subtitle: 'FANTASIX PRO SERIES',
      description: 'Premium comfort for long gaming sessions',
      image: 'https://i.pinimg.com/736x/f6/a5/a8/f6a5a862912619b80573216406f5186b.jpg',
      backgroundColor: 'bg-gray-50',
      textColor: 'text-gray-900',
      sale: {
        text: 'SALE',
        percentage: '50% OFF',
        backgroundColor: 'bg-gradient-to-br from-amber-400 to-amber-500',
        textColor: 'text-gray-900'
      },
      buttonText: 'SHOP NOW'
    },
    {
      id: 4,
      title: 'iPed Pro Mini 6',
      subtitle: 'Powerful performance in hand',
      description: 'From $19.99/month or $699.99',
      image: 'https://i.pinimg.com/736x/a5/97/f5/a597f5498af3cc632e4550e1b4ead9ad.jpg',
      backgroundColor: 'bg-gradient-to-br from-amber-300 to-amber-400',
      textColor: 'text-gray-900',
      buttonText: 'SHOP NOW',
      badge: {
        text: 'HOT',
        color: 'bg-rose-600 text-white'
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Section header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Brand New Arrivals</h2>
          <p className="text-gray-600 mt-2">Discover our latest products</p>
        </div>
        
        {/* Navigation dots - replaced with better controls */}
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className={`group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${product.backgroundColor}`}
          >
            {/* Product badge */}
            {product.badge && (
              <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full z-10 ${product.badge.color}`}>
                {product.badge.text}
              </div>
            )}
            
            {/* Sale badge */}
            {product.sale && (
              <div className={`absolute top-4 right-4 px-3 py-2 rounded-lg text-center z-10 ${product.sale.backgroundColor}`}>
                <div className="text-xs font-bold">{product.sale.text}</div>
                <div className="text-lg font-bold">{product.sale.percentage}</div>
              </div>
            )}
            
            {/* Product image */}
            <div className="relative pt-[100%] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="absolute top-0 left-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Product info */}
            <div className={`p-5 ${product.textColor}`}>
              {product.subtitle && (
                <p className="text-sm font-medium opacity-80 mb-1">{product.subtitle}</p>
              )}
              
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              
              <p className="text-sm opacity-80 mb-4">{product.description}</p>
              
              <button 
                className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                  product.textColor === 'text-white' 
                    ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {product.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* View all button */}
      <div className="mt-10 text-center">
        <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all">
          View All New Arrivals
          <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}