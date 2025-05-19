import React from 'react';

export const PopularProducts = () => {
  const categories = [
    { name: 'iPhone (iOS)', items: 74, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: 'Android', items: 35, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: '5G Support', items: 12, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: 'Apple Tablets', items: 22, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: 'Smartphone Chargers', items: 33, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: 'Gaming', items: 9, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: 'Xiaomi', items: 52, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: 'Accessories', items: 29, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: 'Samsung Tablets', items: 26, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
    { name: 'eReader', items: 5, image: 'https://i.pinimg.com/736x/f8/46/10/f846104e7d18021e0f6bb40f352c9ee7.jpg' },
  ];

  return (
    <div className="bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4 sm:mb-8">POPULAR CATEGORIES</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-4">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors">
              <div className="flex flex-col">
                <span className="font-medium text-sm sm:text-base truncate">{category.name}</span>
                <span className="text-xs sm:text-sm text-gray-500">{category.items} Items</span>
              </div>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain ml-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

