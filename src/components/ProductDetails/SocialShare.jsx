import React from "react";

export default function SocialShare() {
  return (
    <div className="flex gap-2 mb-6">
      {["twitter", "facebook", "instagram", "youtube"].map((social) => (
        <button key={social} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-xs">{social[0].toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}