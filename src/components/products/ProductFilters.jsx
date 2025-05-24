import React from 'react';
import { ChevronDown, Search, Star } from 'lucide-react';
import { useProductFilters } from '../../hooks/useProductFilters';
import { useApiData } from '../../hooks/useApiData';
import { brands, ratings, screenSizes } from '../../data/filters';

export const ProductFilters = () => {
  const { categories, loading, error } = useApiData();
  const {
    activeCategory,
    setActiveCategory,
    selectedBrands,
    toggleBrand,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedRatings,
    toggleRating,
    selectedScreenSizes,
    toggleScreenSize,
    showSidebar,
    setShowSidebar
  } = useProductFilters();

  if (loading) return (
    <div className={`${showSidebar ? 'block' : 'hidden'} lg:block lg:w-1/4 p-4 bg-gray-100`}>
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className={`${showSidebar ? 'block' : 'hidden'} lg:block lg:w-1/4 p-4 bg-gray-100 text-red-500`}>
      Error loading categories: {error}
    </div>
  );

  return (
    <div className={`${showSidebar ? 'block' : 'hidden'} lg:block lg:w-1/4 p-4 bg-gray-100`}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">CATEGORIES</h2>
          <button className="text-gray-500 text-sm hover:text-blue-600">Reset All</button>
        </div>
        
        <div className="space-y-2">
          {categories?.map((category) => (
            <div key={category.id} className="space-y-2">
              <button 
                className={`w-full px-4 py-2 text-left rounded-md ${
                  activeCategory === category.name ? 'bg-white shadow-sm' : 'hover:bg-white'
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                <div className="flex justify-between items-center">
                  <span>{category.name}</span>
                  {category.subcategories && (
                    <ChevronDown size={16} className="text-gray-500" />
                  )}
                </div>
              </button>
              
              {category.subcategories && activeCategory === category.name && (
                <div className="ml-2 space-y-1">
                  {category.subcategories.map((subcat, idx) => (
                    <div key={idx} className="flex items-center py-1 px-4 hover:bg-white cursor-pointer">
                      <span className="text-sm">{subcat}</span>
                      {subcat === 'Cell Phones' && (
                        <span className="ml-auto text-sm">$200</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">By Brands</h2>
        <div className="mb-4">
          <div className="relative">
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              placeholder="Search brands..." 
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {brands.map((brand, idx) => (
            <div key={idx} className="flex items-center">
              <input 
                type="checkbox" 
                id={`brand-${idx}`}
                checked={selectedBrands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
                className="mr-2"
              />
              <img src={brand.logo} alt={brand.name} className="w-5 h-5 mr-2" />
              <label htmlFor={`brand-${idx}`} className="text-sm cursor-pointer">
                {brand.name} ({brand.count})
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">By Price</h2>
        <div className="mb-4">
          <div className="relative pt-5">
            <div className="h-1 bg-green-500 rounded-full"></div>
            <div className="absolute left-0 -top-1 w-4 h-4 bg-white border-2 border-green-500 rounded-full"></div>
            <div className="absolute right-0 -top-1 w-4 h-4 bg-white border-2 border-green-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center border rounded-md bg-gray-200 px-2 py-1">
            <span className="text-sm mr-1">$</span>
            <input 
              type="number" 
              className="w-16 bg-transparent focus:outline-none"
              value={minPrice} 
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>
          <span>—</span>
          <div className="flex items-center border rounded-md bg-gray-200 px-2 py-1">
            <span className="text-sm mr-1">$</span>
            <input 
              type="number" 
              className="w-16 bg-transparent focus:outline-none"
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <button className="bg-green-500 text-white rounded-md px-4 py-1">
            Go
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">By Rating</h2>
        <div className="space-y-2">
          {ratings.map((rating, idx) => (
            <div key={idx} className="flex items-center">
              <input 
                type="checkbox" 
                id={`rating-${idx}`}
                checked={selectedRatings.includes(rating.stars)}
                onChange={() => toggleRating(rating.stars)}
                className="mr-2"
              />
              <label htmlFor={`rating-${idx}`} className="flex items-center text-sm cursor-pointer">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < rating.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-auto text-sm text-gray-600">({rating.count})</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">By Screen Size</h2>
        <div className="flex flex-wrap gap-2">
          {screenSizes.map((size, idx) => (
            <button 
              key={idx}
              onClick={() => toggleScreenSize(size)}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedScreenSizes.includes(size) 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-white text-gray-700'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      <div className="lg:hidden flex justify-center">
        <button 
          onClick={() => setShowSidebar(false)}
          className="px-6 py-2 bg-gray-800 text-white rounded-md"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};