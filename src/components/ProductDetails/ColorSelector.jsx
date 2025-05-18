import React from "react";

export default function ColorSelector({
  selectedColor,
  setSelectedColor,
  productColors,
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold">COLOR:</span>
        <span>{selectedColor}</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {productColors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelectedColor(color.name)}
            className={`border p-2 rounded-md flex-shrink-0 ${
              selectedColor === color.name ? "border-green-500" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gray-200 rounded"></div>
              <div>
                <div className="text-sm">{color.name}</div>
                <div className="font-bold">${color.price.toFixed(2)}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
