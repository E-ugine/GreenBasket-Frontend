import { useState } from 'react';

export const useProductFilters = () => {
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('Default');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedScreenSizes, setSelectedScreenSizes] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };
  
  const toggleRating = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  const toggleScreenSize = (size) => {
    setSelectedScreenSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  return {
    activeCategory,
    setActiveCategory,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    viewType,
    setViewType,
    sortBy,
    setSortBy,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedBrands,
    setSelectedBrands,
    selectedRatings,
    setSelectedRatings,
    selectedScreenSizes,
    setSelectedScreenSizes,
    showSidebar,
    setShowSidebar,
    toggleBrand,
    toggleRating,
    toggleScreenSize
  };
};