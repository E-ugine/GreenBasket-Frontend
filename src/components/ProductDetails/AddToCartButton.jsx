import React from "react";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton() {
  return (
    <button className="w-full bg-green-500 text-white py-3 rounded-md font-bold mb-3 flex items-center justify-center gap-2">
      <ShoppingCart size={18} />
      ADD TO CART
    </button>
  );
}