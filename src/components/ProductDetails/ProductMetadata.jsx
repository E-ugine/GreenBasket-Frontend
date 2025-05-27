import React from "react";
import PropTypes from "prop-types";

export default function ProductMetadata({ product }) {
  // Generate SKU from product ID if not provided
  const generateSKU = (id, category) => {
    if (!id) return 'GEN000000';
    const categoryCode = category ? category.substring(0, 3).toUpperCase() : 'GEN';
    return `${categoryCode}${String(id).padStart(6, '0')}`;
  };

  // Format category name for display
  const formatCategory = (category) => {
    if (!category) return 'General';
    
    // Convert to title case and handle specific categories
    const categoryMap = {
      "men's clothing": "Men's Clothing",
      "women's clothing": "Women's Clothing",
      "jewelery": "Jewelry",
      "electronics": "Electronics"
    };
    
    return categoryMap[category.toLowerCase()] || 
           category.split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
  };

  // Extract brand from specifications or generate from category
  const getBrand = (specifications, category) => {
    if (specifications?.Brand && specifications.Brand !== 'Generic') {
      return specifications.Brand;
    }
    
    // Generate brand based on category
    const brandMap = {
      "electronics": "TechPro",
      "men's clothing": "StyleCo",
      "women's clothing": "FashionHub", 
      "jewelery": "LuxeGems"
    };
    
    return brandMap[category?.toLowerCase()] || "Generic";
  };

  if (!product) {
    return (
      <div className="space-y-2 mb-6">
        <div className="flex gap-2 flex-wrap">
          <span className="font-bold">SKU:</span>
          <span className="text-gray-400">Not available</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="font-bold">CATEGORY:</span>
          <span className="text-gray-400">Not available</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <span className="font-bold">BRAND:</span>
          <span className="text-gray-400">Not available</span>
        </div>
      </div>
    );
  }

  const sku = product.specifications?.SKU || generateSKU(product.id, product.category);
  const category = formatCategory(product.category);
  const brand = getBrand(product.specifications, product.category);

  return (
    <div className="space-y-2 mb-6">
      <div className="flex gap-2 flex-wrap">
        <span className="font-bold">SKU:</span>
        <span>{sku}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="font-bold">CATEGORY:</span>
        <span>{category}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="font-bold">BRAND:</span>
        <span className="text-green-500">{brand}</span>
      </div>
      {/* Optional: Add more metadata if available */}
      {product.specifications?.Model && (
        <div className="flex gap-2 flex-wrap">
          <span className="font-bold">MODEL:</span>
          <span>{product.specifications.Model}</span>
        </div>
      )}
    </div>
  );
}

ProductMetadata.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    category: PropTypes.string,
    specifications: PropTypes.object
  })
};