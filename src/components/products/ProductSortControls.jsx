import React from 'react';
import { ChevronDown, Grid, List } from 'lucide-react';

export const ProductSortControls = ({ 
  itemsPerPage, 
  setItemsPerPage, 
  sortBy, 
  setSortBy, 
  viewType, 
  setViewType 
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">Show item</span>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button 
            className={`px-3 py-1 text-sm ${itemsPerPage === 24 ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
            onClick={() => setItemsPerPage(24)}
          >
            24
          </button>
          <button 
            className={`px-3 py-1 text-sm ${itemsPerPage === 48 ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
            onClick={() => setItemsPerPage(48)}
          >
            48
          </button>
          <button 
            className={`px-3 py-1 text-sm ${itemsPerPage === 72 ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
            onClick={() => setItemsPerPage(72)}
          >
            72
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">Sort by</span>
        <div className="relative">
          <select 
            className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-4 py-1 pr-8"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Default</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 whitespace-nowrap">View As</span>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button 
            className={`p-2 ${viewType === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => setViewType('grid')}
          >
            <Grid size={16} />
          </button>
          <button 
            className={`p-2 ${viewType === 'list' ? 'bg-gray-200' : 'bg-white'}`}
            onClick={() => setViewType('list')}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};