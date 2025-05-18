import React from "react";

export default function PromotionBanner() {
  return (
    <div className="bg-green-50 p-4 rounded-md mb-6">
      <div className="flex items-start gap-4">
        <div className="text-green-600">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            🎁
          </div>
        </div>
        <div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Buy <span className="font-bold">02</span> boxes get a <span className="font-bold">Snack Tray</span></li>
            <li>Buy <span className="font-bold">04</span> boxes get a free <span className="font-bold">Block Toys</span></li>
          </ul>
          <div className="text-gray-500 text-sm mt-2">
            Promotion will expire in: 9h00pm, 25/5/2024
          </div>
        </div>
      </div>
    </div>
  );
}