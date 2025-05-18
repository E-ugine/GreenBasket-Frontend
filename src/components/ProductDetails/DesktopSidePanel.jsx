import React from "react";
import { Heart, Truck, CheckCircle } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";

export default function DesktopSidePanel({
  quantity,
  incrementQuantity,
  decrementQuantity,
}) {
  return (
    <div className="fixed top-20 right-4 lg:right-20 bg-gray-100 p-4 rounded-lg w-64 hidden lg:block">
      <div className="text-sm text-gray-500 mb-1">TOTAL PRICE:</div>
      <div className="text-3xl font-bold mb-4">$609.00</div>

      <div className="flex items-center gap-1 mb-4">
        <img
          src="/api/placeholder/60/20"
          alt="Affirm"
          className="h-5"
        />
        <span className="text-red-500">$49/m</span>
        <span className="text-sm">in 12 months.</span>
        <a href="#" className="text-blue-500 text-sm">See more</a>
      </div>

      <div className="flex items-center gap-2 text-green-600 mb-6">
        <CheckCircle size={16} />
        <span>In stock</span>
      </div>

      <QuantitySelector
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />

      <AddToCartButton />

      <button className="w-full bg-orange-400 text-white py-3 rounded-md font-bold mb-4 flex items-center justify-center gap-2">
        BUY WITH PayPal
      </button>

      <div className="flex items-center justify-between mb-4">
        <button className="flex items-center gap-1 text-gray-600">
          <Heart size={16} />
          <span>Wishlist added</span>
        </button>
        <button className="flex items-center gap-1 text-gray-600">
          <span>Compare</span>
        </button>
      </div>

      <div className="mb-4">
        <div className="text-sm mb-2">Guaranteed Safe Checkout</div>
        <div className="flex justify-between">
          {["visa", "mastercard", "amex", "discover"].map((card) => (
            <div key={card} className="w-10 h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 text-white p-2 rounded-md mb-2 text-center">
        Quick Order 24/7
      </div>

      <div className="text-center font-bold text-xl mb-4">
        (025) 3886 25 16
      </div>

      <div className="flex items-center gap-2">
        <Truck size={16} />
        <span>Ships from <span className="font-bold">United States</span></span>
      </div>
    </div>
  );
}
