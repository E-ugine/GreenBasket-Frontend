import React, { useState } from "react";

export default function ProductImages({ image, name, isNew }) {
  const [mainImage, setMainImage] = useState(image?.[0] || '');

  if (!image || image.length === 0) {
    return (
      <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div className="lg:w-1/2">
      <div className="relative">
        {isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
        <img 
          src={mainImage} 
          alt={name} 
          className="w-full h-96 object-contain mb-4"
        />
      </div>
      <div className="flex gap-2 sm:gap-4 mt-4 overflow-x-auto pb-2">
        {image.map((img, i) => (
          <img 
            key={i}
            src={img} 
            alt={`Thumbnail ${i + 1}`} 
            className={`w-16 h-16 object-cover border rounded flex-shrink-0 cursor-pointer ${
              mainImage === img ? 'border-blue-500' : 'border-gray-200'
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
}