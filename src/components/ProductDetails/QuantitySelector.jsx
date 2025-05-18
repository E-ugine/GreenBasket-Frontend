import React from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  incrementQuantity,
  decrementQuantity,
}) {
  return (
    <div className="flex items-center border rounded-md mb-4">
      <button
        onClick={decrementQuantity}
        className="px-4 py-2 text-xl font-bold"
      >
        <Minus size={16} />
      </button>
      <div className="flex-1 text-center">{quantity}</div>
      <button
        onClick={incrementQuantity}
        className="px-4 py-2 text-xl font-bold"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
