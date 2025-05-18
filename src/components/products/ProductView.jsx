import React from 'react';
import { useState } from 'react';
import { Filter, Menu } from 'lucide-react';
import { useProductFilters } from '../../hooks/useProductFilters';
import { products } from '../../data/products';
import { ProductFilters } from './ProductFilters';
import { ProductGrid } from './ProductGrid';
import { ProductList } from './ProductList';
import { ProductPagination } from './ProductPagination';
import { ProductSortControls } from './ProductSortControls';

export const ProductView = () => {
  const {
    viewType,
    showSidebar,
    setShowSidebar,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    sortBy,
    setSortBy
  } = useProductFilters();
  
  const totalResults = 120; // Mock total results

  return (
    <div className="flex flex-col lg:flex-row w-full bg-gray-50">
      {/* Mobile filter toggle */}
      <div className="lg:hidden p-4 bg-gray-800 text-white flex justify-between items-center">
        <h2 className="text-lg font-bold">Products</h2>
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-md"
        >
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>
      
      {/* Sidebar with filters */}
      <ProductFilters />
      
      {/* Main content */}
      <div className="lg:w-3/4 p-4">
        {/* Results header with pagination, sorting and view options */}
        <div className="mb-6">
          <ProductPagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalResults={totalResults}
          />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <ProductSortControls 
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewType={viewType}
            //   setViewType={setViewType}
            />
          </div>
        </div>
        
        {/* Product display */}
        {viewType === 'grid' ? (
          <ProductGrid products={products} />
        ) : (
          <ProductList products={products} />
        )}
        
        {/* Bottom pagination */}
        <ProductPagination 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalResults={totalResults}
        />
      </div>
    </div>
  );
};

export default ProductView;