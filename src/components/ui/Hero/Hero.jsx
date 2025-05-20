import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const CATEGORIES = [
  "Laptops",
  "PC & Computers",
  "Cell Phones",
  "Tablets",
  "Gaming & VR",
  "Networking",
  "Cameras",
  "Sounds",
  "Office",
  "Storage, USB",
  "Accessories",
  "Clearance",
];

const PRODUCTS = [
  {
    id: 1,
    title: "Noise Cancelling",
    subtitle: "Headphone",
    description: "Boso Over-Ear Headphone\nWifi, Voice Assistant\nLow Latency Game Mode",
    price: null,
    cta: "BUY NOW",
    image: "https://i.pinimg.com/736x/f3/de/22/f3de223eb67eb7bc977225d949cb65aa.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Sono Playgo 5",
    price: "$569",
    cta: "DISCOVER NOW",
    image: "https://i.pinimg.com/736x/c7/89/d3/c789d37621dfee361a81c8742738b7ad.jpg"
  },
  {
    id: 3,
    title: "Logitek Bluetooth Keyboard",
    description: "Best for all device",
    image: "https://i.pinimg.com/736x/70/89/0d/70890d81dcbba45c3f49d38b049c3751.jpg"
  },
  {
    id: 4,
    title: "XOMIA Sport Water Resistance Watch",
    cta: "SHOP NOW",
    image: "https://i.pinimg.com/736x/50/40/78/504078fd7161c76afac4e93b6630bf58.jpg"
  },
  {
    id: 5,
    title: "OKODO HERO 11+ BLACK",
    price: "From $169",
    image: "https://i.pinimg.com/736x/98/7f/1d/987f1d5b23c69e41864cfdbf0ec13952.jpg"
  }
];

const ProductCard = ({ product }) => {
  if (product.featured) {
    return (
      <section className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-lg p-6 items-center transition-all hover:shadow-xl duration-300 group">
        <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-6 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
            {product.title}
          </h2>
          {product.subtitle && (
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mt-2">
              {product.subtitle}
            </h3>
          )}
          {product.description && (
            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          )}
          {product.cta && (
            <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              {product.cta}
            </button>
          )}
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-80 relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain rounded-lg transition-transform group-hover:scale-105 duration-500"
            loading="lazy"
          />
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 flex items-center shadow-sm transition-all hover:shadow-md duration-300 group">
      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 relative overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
          loading="lazy"
        />
      </div>
      <div className="ml-4 flex-1 min-w-0">
        <h3 className="text-base md:text-lg font-bold truncate">
          {product.title}{" "}
          {product.price && (
            <span className="text-green-600">{product.price}</span>
          )}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        )}
        {product.cta && (
          <button className="mt-2 text-green-600 text-sm font-semibold hover:text-green-700 focus:outline-none focus:underline">
            {product.cta}
          </button>
        )}
      </div>
    </div>
  );
};

export default function HeroComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-6 p-4 rounded-lg border-2 md:border-[3px] border-white py-8 md:py-12 mt-8 md:mt-12 lg:mt-2 bg-gray-50">
      {/* Mobile Category Menu Toggle */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h2 className="text-red-600 font-bold text-lg">SALE 40% OFF</h2>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          aria-expanded={menuOpen}
          aria-label="Toggle categories menu"
        >
          {menuOpen ? (
            <>
              <X className="w-4 h-4" />
              <span>Close</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Categories</span>
            </>
          )}
        </button>
      </div>

      {/* Left Sidebar */}
      <aside 
        className={`${menuOpen ? 'block' : 'hidden'} lg:block bg-white p-5 rounded-xl lg:w-1/4 w-full mb-6 lg:mb-0 shadow-md`}
        aria-label="Product categories"
      >
        <h2 className="text-red-600 font-bold text-lg mb-4 hidden lg:block">SALE 40% OFF</h2>
        <ul className="space-y-3 items-start text-left">
          {CATEGORIES.map((item) => (
            <li
              key={item}
              className="text-gray-800 cursor-pointer hover:text-green-600 hover:font-semibold transition-colors py-2 px-1 rounded hover:bg-green-50"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && console.log(`Selected ${item}`)}
              onClick={() => console.log(`Selected ${item}`)}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Hero Banner */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Product */}
        <ProductCard product={PRODUCTS.find(p => p.featured)} />
        
        {/* Other Products */}
        <section className="grid grid-cols-1 gap-6">
          {PRODUCTS.filter(p => !p.featured).slice(0, 2).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>

        {/* Bottom Row Products */}
        {PRODUCTS.filter(p => !p.featured).slice(2).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}