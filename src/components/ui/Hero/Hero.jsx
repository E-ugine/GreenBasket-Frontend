import React, { useState } from "react";

export default function HeroComponent() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const categories = [
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

  return (
    <div className="w-full flex flex-col lg:flex-row lg:space-x-6 p-4 rounded-lg border-2 md:border-4 py-6 md:py-12 mt-6 md:mt-12 lg:mt-34 border-red-500">
      {/* Mobile Category Menu Toggle */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <h2 className="text-red-500 font-bold">SALE 40% OFF</h2>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {menuOpen ? "Close Menu" : "Categories"}
        </button>
      </div>

      {/* Left Sidebar */}
      <aside className={`${menuOpen ? 'block' : 'hidden'} lg:block bg-white p-4 rounded-xl lg:w-1/4 w-full mb-6 lg:mb-0 space-y-4 text-sm font-semibold text-left shadow-sm`}>
        <h2 className="text-red-500 hidden lg:block">SALE 40% OFF</h2>
        <ul className="space-y-2">
          {categories.map((item) => (
            <li
              key={item}
              className="text-gray-800 cursor-pointer hover:text-green-600 hover:font-semibold transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Hero Banner */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Large Hero Card */}
        <section className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-lg p-4 md:p-6 items-center transition-transform hover:scale-[1.01] md:hover:scale-[1.03] duration-200">
          {/* Text Section */}
          <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900">
              Noise Cancelling
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mt-2">Headphone</h3>
            <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed">
              Boso Over-Ear Headphone <br />
              Wifi, Voice Assistant, <br />
              Low Latency Game Mode
            </p>
            <button className="mt-5 bg-green-500 text-white px-4 md:px-6 py-2 rounded-full font-semibold hover:bg-green-600 shadow-md transition">
              BUY NOW
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="https://i.pinimg.com/736x/f3/de/22/f3de223eb67eb7bc977225d949cb65aa.jpg"
              alt="Noise Cancelling Headphone"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </section>

        {/* Right Side Cards - Will stack on mobile */}
        <section className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl p-4 flex items-center shadow-sm transition-transform hover:scale-[1.01] md:hover:scale-[1.03] duration-200">
            <img
              src="https://i.pinimg.com/736x/c7/89/d3/c789d37621dfee361a81c8742738b7ad.jpg"
              alt="Playgo"
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
            />
            <div className="ml-4">
              <h3 className="text-base md:text-lg font-bold">
                Sono Playgo 5 from{" "}
                <span className="text-green-500">$569</span>
              </h3>
              <button className="text-green-500 text-sm font-semibol">
                DISCOVER NOW
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-center shadow-sm transition-transform hover:scale-[1.01] md:hover:scale-[1.03] duration-200">
            <img
              src="https://i.pinimg.com/736x/70/89/0d/70890d81dcbba45c3f49d38b049c3751.jpg"
              alt="Keyboard"
              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
            />
            <div className="ml-4">
              <h3 className="text-base md:text-lg font-bold">Logitek Bluetooth Keyboard</h3>
              <p className="text-sm text-gray-500">Best for all device</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm transition-transform hover:scale-[1.01] md:hover:scale-[1.03] duration-200">
          <h3 className="text-base md:text-lg font-bold text-center sm:text-left">XOMIA Sport Water Resistance Watch</h3>
          <img
            src="https://i.pinimg.com/736x/50/40/78/504078fd7161c76afac4e93b6630bf58.jpg"
            alt="Watch"
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
          />
          <button className="bg-black text-white px-4 md:px-5 py-2 rounded-full hover:bg-gray-800 transition font-semibold shadow-md">
            SHOP NOW
          </button>
        </section>

        <section className="bg-white rounded-xl p-4 flex items-center shadow-sm transition-transform hover:scale-[1.01] md:hover:scale-[1.03] duration-200">
          <img
            src="https://i.pinimg.com/736x/98/7f/1d/987f1d5b23c69e41864cfdbf0ec13952.jpg"
            alt="GoPro"
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
          />
          <div className="ml-4">
            <h3 className="text-base md:text-lg font-bold">OKODO HERO 11+ BLACK</h3>
            <p className="text-green-500 text-base md:text-lg font-semibold">From $169</p>
          </div>
        </section>
      </main>
    </div>
  );
}