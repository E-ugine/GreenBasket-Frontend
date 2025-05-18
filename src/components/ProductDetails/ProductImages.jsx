import React from "react";

export default function ProductImages() {
  return (
    <div className="lg:w-1/2">
      <div className="relative">
        <span className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
        <img 
          src="https://i.pinimg.com/736x/9c/52/70/9c527012fe3d0383d7415543a1d6cfdc.jpg" 
          alt="Somseng Galatero X6 Ultra" 
          className="w-full object-contain mb-4"
        />
      </div>
      <div className="flex gap-2 sm:gap-4 mt-4 overflow-x-auto pb-2">
        {[1, 2, 3].map((i) => (
          <img 
            key={i}
            src="https://i.pinimg.com/736x/9c/52/70/9c527012fe3d0383d7415543a1d6cfdc.jpg" 
            alt={`Thumbnail ${i}`} 
            className="w-16 h-16 object-cover border border-gray-200 rounded flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}