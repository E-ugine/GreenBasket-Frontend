import React from "react";
import { ShoppingCart } from "lucide-react";

export default function MobileStickyBar({
  showSidePanel,
  setShowSidePanel,
}) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 z-50">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-500">TOTAL:</div>
          <div className="text-xl font-bold">$609.00</div>
        </div>
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-md font-bold flex items-center gap-2"
          onClick={() => setShowSidePanel(!showSidePanel)}
        >
          <ShoppingCart size={18} />
          {showSidePanel ? "HIDE OPTIONS" : "SHOW OPTIONS"}
        </button>
      </div>
    </div>
  );
}
