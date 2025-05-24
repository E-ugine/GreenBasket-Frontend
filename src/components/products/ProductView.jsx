import React from 'react';
import { Filter } from 'lucide-react';
import { useProductFilters } from '../../hooks/useProductFilters';
import { useApiData } from '../../hooks/useApiData';
import { ProductFilters } from './ProductFilters';
import { ProductGrid } from './ProductGrid';
import { ProductList } from './ProductList';
import { ProductPagination } from './ProductPagination';
import { ProductSortControls } from './ProductSortControls';
import { ProductBanner } from './ProductBanner'; 
import { PopularProducts } from './PopularProducts';

export const ProductView = () => {
  const { products, loading, error } = useApiData();
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

  if (loading) return (
    <div className="flex flex-col min-h-screen">
      <ProductBanner />
      <div className="flex flex-col lg:flex-row w-full bg-gray-50">
        <div className="lg:w-1/4 p-4 bg-gray-100 animate-pulse"></div>
        <div className="lg:w-3/4 p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col min-h-screen">
      <ProductBanner />
      <div className="flex justify-center items-center p-8 text-red-500">
        Error loading products: {error}
      </div>
    </div>
  );

  // Calculate paginated products
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <ProductBanner />
      <PopularProducts />

      <div className="flex flex-col lg:flex-row w-full bg-gray-50">
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
        
        <ProductFilters />
        
        <div className="lg:w-3/4 p-4">
          <div className="mb-6">
            <ProductPagination 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalResults={products.length}
            />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <ProductSortControls 
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                sortBy={sortBy}
                setSortBy={setSortBy}
                viewType={viewType}
              />
            </div>
          </div>
          
          {viewType === 'grid' ? (
  <ProductGrid 
    products={paginatedProducts} 
    isLoading={loading} 
    error={error} 
  />
) : (
  <ProductList 
    products={paginatedProducts} 
    isLoading={loading} 
    error={error} 
  />
)}
          
          <ProductPagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalResults={products.length}
          />
        </div>
      </div>
    </>
  );
};

export default ProductView;