import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../../../services/apiData";

const brands = [
  { name: "JamX", logo: "https://i.pinimg.com/736x/31/9f/da/319fda923f6b2a516cd2c98ebd6d1eb6.jpg" },
  { name: "Digitek", logo: "https://i.pinimg.com/736x/9f/43/fa/9f43fa1148ff1012af531f4481f96a5b.jpg" },
  { name: "Tek React JS", logo: "https://i.pinimg.com/736x/c8/4e/fa/c84efa20e4c3007a987623d62b2f1de1.jpg" },
  { name: "Huawei", logo: "https://i.pinimg.com/736x/67/fc/36/67fc36325ec4ca932b90cfa481d41283.jpg" },
  { name: "Microsoft", logo: "https://i.pinimg.com/736x/a4/98/42/a49842edb398c1477cdbc454a14f3e47.jpg" },
  { name: "Ohbear", logo: "https://static.thenounproject.com/png/621848-200.png" },
  { name: "Samsung", logo: "https://i.pinimg.com/736x/f3/1e/04/f31e042d016da67ec981a44005f40fd1.jpg" },
  { name: "Iphone", logo: "https://i.pinimg.com/736x/d8/8f/32/d88f3243954f744b4b212ef93581a124.jpg" },
  { name: "Lenovo", logo: "https://i.pinimg.com/736x/3e/9b/fa/3e9bfac2721c276ed4940c046d82ba38.jpg" },
  { name: "TCL", logo: "https://i.pinimg.com/736x/95/de/e0/95dee01866366a10b748a324c3f4f1af.jpg" },
];

const FeaturedSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  const handleViewAllCategories = () => {
    navigate('/products');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await fetchCategories();
  
        const categoriesWithProducts = await Promise.all(
          fetchedCategories.map(async (category) => {
            const products = await fetchProducts();
            const categoryProducts = products.filter(
              (product) => product.category === category.name
            );

            const randomProduct = categoryProducts.length > 0
              ? categoryProducts[Math.floor(Math.random() * categoryProducts.length)]
              : null;
            
            return {
              ...category,
              image: randomProduct?.image?.[0] || '/placeholder-product.jpg',
            };
          })
        );
        
        setCategories(categoriesWithProducts);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-6 md:px-8 lg:px-16 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="animate-pulse">
              <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-2">
                    <div className="h-14 w-14 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-6 md:px-8 lg:px-16 bg-gray-50">
        <div className="bg-white p-5 rounded-lg shadow-sm text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6 md:px-8 lg:px-16 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Featured Brands */}
        <div className="bg-white p-5 rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">FEATURED BRANDS</h2>
            <button 
              className="text-sm text-gray-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1"
              aria-label="View all brands"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 items-center justify-items-center">
            {brands.map((brand, index) => (
              <img
                key={index}
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-8 object-contain max-w-[80px] transition-transform duration-300 ease-in-out hover:scale-110"
                style={{ transitionDelay: `${index * 50}ms` }}
                loading="lazy"
                width={80}
                height={32}
              />
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white p-5 rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">TOP CATEGORIES</h2>
            <button 
              onClick={handleViewAllCategories}
              className="text-sm text-gray-500 hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-1"
              aria-label="View all categories"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center justify-items-center">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center space-y-2 group cursor-pointer"
                onClick={() => handleCategoryClick(cat.name)}
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} category`}
                  className="h-14 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
                  style={{ transitionDelay: `${index * 80}ms` }}
                  loading="lazy"
                  width={56}
                  height={56}
                />
                <span className="text-sm font-medium text-gray-700 text-center capitalize">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;