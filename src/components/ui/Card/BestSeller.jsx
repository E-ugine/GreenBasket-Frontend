import React from 'react';
import { useState } from 'react';

export default function BestSeller() {
  const [activeTab, setActiveTab] = useState('BEST SELLER');

  const products = [
    {
      id: 1,
      name: 'BOSO 2 Wireless On Ear Headphone',
      price: 359.00,
      originalPrice: null,
      image: 'https://i.pinimg.com/736x/74/b6/7e/74b67e5decba529aeb0eacc342d435e6.jpg',
      reviews: 152,
      inStock: true,
      freeShipping: true,
      freeGift: true,
      save: null
    },
    {
      id: 2,
      name: 'OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS',
      price: 569.00,
      originalPrice: 759.00,
      image: 'https://i.pinimg.com/736x/4a/64/3b/4a643b2e59cc4a0adfcf0a5a95f4885b.jpg',
      reviews: 152,
      inStock: true,
      freeShipping: true,
      freeGift: false,
      save: 199.00
    },
    {
      id: 3,
      name: 'uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB',
      price: 1729.00,
      originalPrice: 2119.00,
      image: 'https://i.pinimg.com/736x/9c/c3/98/9cc398f8a2714b7da1af70aeed08db7b.jpg',
      reviews: 8,
      inStock: false,
      freeShipping: true,
      freeGift: false,
      save: 59.00
    },
    {
      id: 4,
      name: 'Opplo Watch Series 8 GPS + Cellular Stainless Steel Case with Milanese Loop',
      price: 979.00,
      maxPrice: 1259.00,
      originalPrice: null,
      image: 'https://i.pinimg.com/736x/2c/4c/4c/2c4c4c3cfc94b5969c4034804bb800f4.jpg',
      reviews: 9,
      inStock: true,
      preOrder: true,
      shipping: 2.98,
      save: null
    },
    {
      id: 5,
      name: 'iSmart 24V Charger',
      price: 9.00,
      originalPrice: 12.00,
      image: 'https://i.pinimg.com/736x/0e/72/8e/0e728e496a69cff4f14ea90609415650.jpg',
      reviews: null,
      inStock: true,
      shipping: 3.98,
      showContact: true,
      save: 3.00
    }
  ];

  return (
    <div className=" mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <div className="flex items-center justify-between mb-6 overflow-x-auto">
        <div className="flex space-x-4 md:space-x-8">
          <a 
            href="#" 
            className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'BEST SELLER' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('BEST SELLER');
            }}
          >
            BEST SELLER
          </a>
          <a 
            href="#" 
            className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'NEW IN' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('NEW IN');
            }}
          >
            NEW IN
          </a>
          <a 
            href="#" 
            className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'POPULAR' ? 'border-b-2 border-black' : 'text-gray-500'}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('POPULAR');
            }}
          >
            POPULAR
          </a>
        </div>
        <a href="#" className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">View All</a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative flex flex-col">
            {product.save && (
              <div className="absolute top-1 sm:top-2 left-1 sm:left-2 z-10 bg-green-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded-sm flex flex-col items-center">
                <span className="text-xs">SAVE</span>
                <span className="text-xs">${product.save.toFixed(2)}</span>
              </div>
            )}
            <div className="mb-2 sm:mb-4 relative">
              <div className="bg-white rounded-lg flex items-center justify-center p-2 sm:p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-contain" 
                />
              </div>
              <div className="absolute top-1 sm:top-2 right-1 sm:right-2">
                <div className="h-4 w-4 sm:h-6 sm:w-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            
            {product.reviews && (
              <div className="text-xs text-gray-500 mb-0.5 sm:mb-1">({product.reviews})</div>
            )}
            
            <h3 className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
            
            <div className="flex items-baseline mb-1 sm:mb-2 flex-wrap">
              {product.maxPrice ? (
                <span className="text-xs sm:text-sm font-bold">${product.price.toFixed(2)} - ${product.maxPrice.toFixed(2)}</span>
              ) : (
                <>
                  <span className="text-xs sm:text-sm font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-gray-500 line-through ml-1 sm:ml-2">${product.originalPrice.toFixed(2)}</span>
                  )}
                </>
              )}
            </div>
            
            <div className="mt-auto">
              {product.shipping && (
                <div className="text-xs text-gray-500 mb-0.5 sm:mb-1">${product.shipping.toFixed(2)} SHIPPING</div>
              )}
              
              {product.preOrder && (
                <div className="text-xs font-medium mb-0.5 sm:mb-1">PRE - ORDER</div>
              )}
              
              {product.showContact && (
                <div className="text-xs mb-0.5 sm:mb-1">Contact</div>
              )}
              
              <div className="flex flex-wrap gap-1 sm:gap-2 mb-1 sm:mb-2">
                {product.freeShipping && (
                  <span className="text-xs text-green-500 uppercase">Free shipping</span>
                )}
                {product.freeGift && (
                  <span className="text-xs text-green-500 uppercase">Free gift</span>
                )}
              </div>
              
              <div className="flex items-center">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs">In stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-red-500">Out of stock</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}