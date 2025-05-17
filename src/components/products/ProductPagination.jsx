import React from 'react';
export const ProductPagination = ({ 
  currentPage, 
  setCurrentPage, 
  itemsPerPage, 
  totalResults 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="text-sm">
        <span className="text-gray-600">{startItem} - {endItem} of {totalResults} results</span>
      </div>
      
      <div className="flex justify-center">
        <div className="flex items-center gap-1">
          <button 
            className="px-3 py-1 border rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button 
            className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'bg-gray-800 text-white' : ''}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button 
            className={`px-3 py-1 border rounded-md ${currentPage === 2 ? 'bg-gray-800 text-white' : ''}`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button 
            className={`px-3 py-1 border rounded-md ${currentPage === 3 ? 'bg-gray-800 text-white' : ''}`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>
          <span className="px-2">...</span>
          <button 
            className={`px-3 py-1 border rounded-md ${currentPage === 8 ? 'bg-gray-800 text-white' : ''}`}
            onClick={() => setCurrentPage(8)}
          >
            8
          </button>
          <button 
            className="px-3 py-1 border rounded-md"
            disabled={currentPage === 8}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};