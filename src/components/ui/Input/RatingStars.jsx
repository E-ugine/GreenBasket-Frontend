import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating, size = 14, showCount = false, count = 0 }) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={size} 
            className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      {showCount && (
        <span className="ml-1 text-xs text-gray-500">({count})</span>
      )}
    </div>
  );
};