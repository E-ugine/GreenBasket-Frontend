import React, { useState } from 'react';

export const PopularProducts = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    { name: 'iPhone (iOS)', items: 74, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: 'Android', items: 35, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: '5G Support', items: 12, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: 'Apple Tablets', items: 22, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: 'Smartphone Chargers', items: 33, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: 'Gaming', items: 9, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: 'Xiaomi', items: 52, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: 'Accessories', items: 29, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: 'Samsung Tablets', items: 26, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
    { name: 'eReader', items: 5, image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg' },
  ];

  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-md">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Popular Categories</h2>
          <button className="text-sm font-medium text-green-200 hover:text-green-200 transition-colors">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`relative flex items-center justify-between p-4 rounded-lg border border-gray-100 cursor-pointer transition-all duration-300 hover:border-green-200 hover:shadow-md ${hoveredItem === index ? 'bg-green-50 border-green-200' : 'bg-white'}`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800 text-sm sm:text-base">{category.name}</span>
                <span className="text-xs text-gray-500 mt-1">{category.items} items</span>
              </div>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ml-3 rounded-lg overflow-hidden transition-transform duration-300 ${hoveredItem === index ? 'transform scale-110' : ''}`}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {hoveredItem === index && (
                <div className="absolute top-0 left-0 w-full h-full bg-green-20 opacity-75 rounded-lg"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};