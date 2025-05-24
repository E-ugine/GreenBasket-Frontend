import React, { useEffect, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { fetchFrequentlyBoughtTogether } from "../../services/apiData";
import LoadingSpinner from "./LoadingSpinner";

export default function FrequentlyBoughtTogether({ productId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // Memoize the calculation to prevent unnecessary recalculations
  const calculateTotal = useCallback(() => {
    return items
      .filter(item => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0)
      .toFixed(2);
  }, [items, selectedItems]);

  useEffect(() => {
    // Don't fetch if productId is not available
    if (!productId) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFrequentlyBoughtTogether(productId);
        setItems(data);
        // Select all items by default
        setSelectedItems(data.map(item => item.id));
      } catch (err) {
        console.error('Failed to load frequently bought items:', err);
        setError('Failed to load recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId]);

  const toggleItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddToCart = () => {
    // Implement your add to cart logic here
    console.log('Adding items to cart:', selectedItems);
    alert(`Added ${selectedItems.length} items to cart (Total: $${calculateTotal()})`);
  };

  const handleAddToWishlist = () => {
    // Implement your wishlist logic here
    console.log('Adding items to wishlist:', selectedItems);
    alert(`Added ${selectedItems.length} items to wishlist`);
  };

  // Don't render anything if no productId
  if (!productId) return null;
  
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;
  if (items.length === 0) return null;

  return (
    <div className="mt-12 mb-8 lg:mr-64">
      <h2 className="text-xl font-bold mb-6">FREQUENTLY BOUGHT TOGETHER</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 flex-wrap mb-4">
            {items.slice(0, 3).map((item, index) => (
              <div key={item.id} className="relative group">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 sm:w-24 h-16 sm:h-24 object-cover rounded border border-gray-200"
                />
                {index === 2 && items.length > 3 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded">
                    +{items.length - 3}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex gap-3 items-start">
                <input 
                  type="checkbox" 
                  id={`item-${item.id}`}
                  className="mt-1 h-4 w-4"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                />
                <label htmlFor={`item-${item.id}`} className="flex-1 cursor-pointer">
                  <div className="text-sm sm:text-base">{item.name}</div>
                  <div className="font-bold">${item.price.toFixed(2)}</div>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-64 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="text-sm text-gray-500 mb-1">TOTAL PRICE:</div>
          <div className="text-2xl sm:text-3xl font-bold mb-4">${calculateTotal()}</div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-bold mb-4 transition-colors"
            disabled={selectedItems.length === 0}
          >
            ADD TO CART ({selectedItems.length})
          </button>
          
          <button 
            onClick={handleAddToWishlist}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-full justify-center"
            disabled={selectedItems.length === 0}
          >
            <Heart size={16} />
            <span>Add to Wishlist</span>
          </button>
        </div>
      </div>
    </div>
  );
}