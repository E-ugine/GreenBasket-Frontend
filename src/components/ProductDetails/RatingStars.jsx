import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function RatingStars({ rating, size = 20 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <StarIcon
          key={`full-${i}`}
          className="text-yellow-400"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ))}
      
      {hasHalfStar && (
        <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
          <StarIcon className="text-gray-300 absolute inset-0" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
            <StarIcon className="text-yellow-400" />
          </div>
        </div>
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <StarIcon
          key={`empty-${i}`}
          className="text-gray-300"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ))}
    </div>
  );
}