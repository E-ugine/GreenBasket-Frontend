import React from "react";

export default function ProductMetadata() {
  return (
    <div className="space-y-2 mb-6">
      <div className="flex gap-2 flex-wrap">
        <span className="font-bold">SKU:</span>
        <span>ABC025168</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="font-bold">CATEGORY:</span>
        <span>Cell Phones & Tablets</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="font-bold">BRAND:</span>
        <span className="text-green-500">sumsong</span>
      </div>
    </div>
  );
}