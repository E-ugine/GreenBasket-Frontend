import React from "react";

const RecentlyViewedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Xomie Remid 8 Sport Water Resistance Watch",
      price: "$579.00",
      image: "https://i.pinimg.com/736x/71/42/60/7142602ef88872909fe456606842324f.jpg",
      isNew: true,
      reviews: 152,
    },
    {
      id: 2,
      name: "Microte Surface 2.0 Laptop",
      price: "$979.00",
      image: "https://i.pinimg.com/736x/6a/04/cc/6a04cc90980648b5bdda45d7c2be400c.jpg",
      isNew: true,
    },
    {
      id: 3,
      name: "Summer Sale with Sale up to 50% OFF for Foam Gaming Chair",
      price: "$979.00 - $1,259.00",
      image: "https://i.pinimg.com/736x/03/cc/a5/03cca58147d6cb2a44b6cde81fb574b6.jpg",
    },
    {
      id: 4,
      name: "SROK Smart Phone 128GB, Oled Retina",
      price: "$579.00",
      originalPrice: "$779.00",
      image: "https://i.pinimg.com/736x/33/af/ba/33afbafaaa77f8020298bf3bd2075798.jpg",
      discount: "$192.00",
      reviews: 152,
    }
  ];

  return (
    <div className="bg-white p-4 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">YOUR RECENTLY VIEWED</h2>
        <a href="#" className="text-blue-500 text-sm">View All</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="relative bg-white p-3 rounded-lg shadow-sm">
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.discount && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                SAVE {product.discount}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-28 h-28 object-contain mb-2 mx-auto"
            />
            <h3 className="text-sm font-medium leading-tight text-center mb-1">{product.name}</h3>
            {product.reviews && (
              <p className="text-xs text-gray-500 text-center">({product.reviews})</p>
            )}
            <p className="text-lg font-semibold mt-1 text-center">
              <span className={product.originalPrice ? "text-red-500" : ""}>
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="line-through text-gray-500 ml-2">
                  {product.originalPrice}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;
