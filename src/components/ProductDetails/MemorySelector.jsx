import React from "react";
export default function MemorySelector({
  selectedMemory,
  setSelectedMemory,
  memorySizes,
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold">MEMORY SIZE:</span>
        <span>{selectedMemory}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {memorySizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedMemory(size)}
            className={`px-3 sm:px-4 py-2 border rounded-md text-sm sm:text-base ${
              selectedMemory === size
                ? "border-green-500 bg-green-50"
                : "border-gray-200"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
