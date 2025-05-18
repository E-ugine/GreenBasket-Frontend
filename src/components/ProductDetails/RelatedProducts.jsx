import React from "react";
import ProductCard from "./ProductCard";

export default function RelatedProducts() {
  const products = [
    {
      id: 1,
      name: "SROK Smart Phone 128GB, Oled Retina",
      price: 579.00,
      originalPrice: 859.00,
      ratingCount: 152,
      isNew: false,
      isOnSale: true,
      saleText: "SAVE\n$199.00",
      shipping: "FREE SHIPPING",
      inStock: true,
      colors: []
    },
    {
      id: 2,
      name: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
      price: 979.00,
      maxPrice: 1259.00,
      isNew: true,
      shipping: "$2.98 SHIPPING",
      inStock: true
    },
    {
      id: 3,
      name: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
      price: 659.00,
      ratingCount: 5,
      shipping: "FREE SHIPPING",
      hasGift: true,
      inStock: true,
      colors: ["gray", "blue", "green"]
    },
    {
      id: 4,
      name: "Xiamoi Redmi Note 5, 64GB",
      price: 1239.00,
      originalPrice: 1619.00,
      ratingCount: 9,
      isOnSale: true,
      saleText: "SAVE\n$59.00",
      shipping: "FREE SHIPPING",
      inStock: false
    },
    {
      id: 5,
      name: "Microsute Alpha Ultra S5 Surface 128GB 2022, Silver",
      price: 1729.00,
      ratingCount: 8,
      shipping: "FREE SHIPPING",
      inStock: false,
      colors: ["gray", "blue"]
    }
  ];

  return (
    <div className="mt-12 mb-20 lg:mb-10 lg:mr-64">
      <h2 className="text-xl font-bold mb-6">RELATED PRODUCTS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}