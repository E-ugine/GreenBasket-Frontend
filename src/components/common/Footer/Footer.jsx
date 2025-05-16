import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTwitter } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    categories: false,
    company: false,
    help: false,
    partner: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <footer className=" bg-white w-screen text-black px-6 py-12 mt-20 border-t text-sm">
      <div className=" mx-auto">
        {/* Mobile view - Accordion style */}
        <div className="md:hidden">
          {/* Left section */}
          <div className="mb-8">
            <h2 className="font-bold text-lg mb-2">GreenBasket - TECH ONLINE MARKET</h2>
            <p className="mb-1 text-xs">HOTLINE 24/7</p>
            <p className="text-green-500 text-2xl font-bold mb-4">(+254) 797 783 251</p>
            <p className="text-xs mb-1">254 Thika Road, Kahawa Wendani,Thika</p>
            <p className="text-xs mb-4">contact@GreenBaskettechmart.com</p>
            <div className="flex space-x-4 mb-6">
              <FaTwitter className="w-6 h-6 text-gray-600" />
              <FaFacebookF className="w-6 h-6 text-gray-600" />
              <FaInstagram className="w-6 h-6 text-gray-600" />
              <FaYoutube className="w-6 h-6 text-gray-600" />
              <FaPinterestP className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-zinc-100 border px-4 py-2 rounded flex items-center text-xs">
                KSH <IoIosArrowDown className="ml-1" />
              </button>
              <button className="bg-zinc-100 border px-4 py-2 rounded flex items-center text-xs">
                <span className="mr-1">🇰🇪</span> Eng <IoIosArrowDown className="ml-1" />
              </button>
            </div>
          </div>

          {/* Collapsible categories section */}
          <div className="border-b py-2">
            <div 
              className="font-bold text-sm flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('categories')}
            >
              <h3>TOP CATEGORIES</h3>
              {openSections.categories ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {openSections.categories && (
              <ul className="space-y-1 text-sm mt-2">
                <li>Laptops</li>
                <li>PC & Computers</li>
                <li>Cell Phones</li>
                <li>Tablets</li>
                <li>Gaming & VR</li>
                <li>Networks</li>
                <li>Cameras</li>
                <li>Sounds</li>
                <li>Office</li>
              </ul>
            )}
          </div>

          {/* Collapsible company section */}
          <div className="border-b py-2">
            <div 
              className="font-bold text-sm flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('company')}
            >
              <h3>COMPANY</h3>
              {openSections.company ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {openSections.company && (
              <ul className="space-y-1 text-sm mt-2">
                <li>About GreenBasket</li>
                <li>Contact</li>
                <li>Career</li>
                <li>Blog</li>
                <li>Sitemap</li>
                <li>Store Locations</li>
              </ul>
            )}
          </div>

          {/* Collapsible help center section */}
          <div className="border-b py-2">
            <div 
              className="font-bold text-sm flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('help')}
            >
              <h3>HELP CENTER</h3>
              {openSections.help ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {openSections.help && (
              <ul className="space-y-1 text-sm mt-2">
                <li>Customer Service</li>
                <li>Policy</li>
                <li>Terms & Conditions</li>
                <li>Trach Order</li>
                <li>FAQs</li>
                <li>My Account</li>
                <li>Product Support</li>
              </ul>
            )}
          </div>

          {/* Collapsible partner section */}
          <div className="border-b py-2">
            <div 
              className="font-bold text-sm flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('partner')}
            >
              <h3>PARTNER</h3>
              {openSections.partner ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {openSections.partner && (
              <ul className="space-y-1 text-sm mt-2">
                <li>Become Seller</li>
                <li>Affiliate</li>
                <li>Advertise</li>
                <li>Partnership</li>
              </ul>
            )}
          </div>
        </div>

        {/* Desktop view - Grid layout */}
        <div className="hidden md:grid md:grid-cols-5 md:gap-10 md:items-start md:text-left">
          {/* Left section */}
          <div className="col-span-1">
            <h2 className="font-bold text-lg mb-2">GreenBasket - TECH ONLINE MARKET</h2>
            <p className="mb-1 text-xs">HOTLINE 24/7</p>
            <p className="text-green-500 text-2xl font-bold mb-4">(+254) 797 783 251</p>
            <p className="text-xs mb-1">254 Thika Road, Kahawa Wendani,Thika</p>
            <p className="text-xs mb-4">contact@GreenBaskettechmart.com</p>
            <div className="flex space-x-4 mb-6">
              <FaTwitter className="w-6 h-6 text-gray-600" />
              <FaFacebookF className="w-6 h-6 text-gray-600" />
              <FaInstagram className="w-6 h-6 text-gray-600" />
              <FaYoutube className="w-6 h-6 text-gray-600" />
              <FaPinterestP className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-zinc-100 border px-4 py-2 rounded flex items-center text-xs">
                KSH <IoIosArrowDown className="ml-1" />
              </button>
              <button className="bg-zinc-100 border px-4 py-2 rounded flex items-center text-xs">
                <span className=" mr-1">🇰🇪 </span> Eng <IoIosArrowDown className="ml-1" />
              </button>
            </div>
          </div>

          {/* Top Categories */}
          <div>
            <h3 className="font-bold mb-2 text-sm">TOP CATEGORIES</h3>
            <ul className="space-y-1 text-sm">
              <li>Laptops</li>
              <li>PC & Computers</li>
              <li>Cell Phones</li>
              <li>Tablets</li>
              <li>Gaming & VR</li>
              <li>Networks</li>
              <li>Cameras</li>
              <li>Sounds</li>
              <li>Office</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-2 text-sm">COMPANY</h3>
            <ul className="space-y-1 text-sm">
              <li>About GreenBasket</li>
              <li>Contact</li>
              <li>Career</li>
              <li>Blog</li>
              <li>Sitemap</li>
              <li>Store Locations</li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h3 className="font-bold mb-2 text-sm">HELP CENTER</h3>
            <ul className="space-y-1 text-sm">
              <li>Customer Service</li>
              <li>Policy</li>
              <li>Terms & Conditions</li>
              <li>Trach Order</li>
              <li>FAQs</li>
              <li>My Account</li>
              <li>Product Support</li>
            </ul>
          </div>

          {/* Partner */}
          <div>
            <h3 className="font-bold mb-2 text-sm">PARTNER</h3>
            <ul className="space-y-1 text-sm">
              <li>Become Seller</li>
              <li>Affiliate</li>
              <li>Advertise</li>
              <li>Partnership</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Subscribe - responsive for all screens */}
      <div className="max-w-4xl mx-auto mt-16">
        <h3 className="font-bold text-sm mb-2">
          SUBSCRIBE & GET <span className="text-red-600 font-bold">10% OFF</span> FOR YOUR FIRST ORDER
        </h3>
        <div className="flex flex-col md:flex-row items-center border-b py-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 outline-none text-sm mb-2 md:mb-0 w-full md:w-auto"
          />
         <button className="text-green-500 text-xs font-semibold md:ml-4 px-4 py-2 border border-yellow-500 hover:bg-yellow-50 rounded w-full md:w-auto">
            SUBSCRIBE
          </button>
        </div>
        <p className="text-xs italic mt-1">
          By subscribing, you're accepted the our <span className="underline">Policy</span>
        </p>
      </div>

      {/* Bottom Footer - responsive for all screens */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-xs text-gray-600 border-t pt-6">
        <p className="mb-4 md:mb-0 text-center md:text-left">© 2025 <span className="font-bold text-black">GreenBasket</span>. All Rights Reserved</p>
        <div className="flex items-center justify-center flex-wrap gap-2 mb-4 md:mb-0">
          <img src="/src/assets/icons/mpesa.png" alt="mpesa" className="h-6" />
          <img src="/src/assets/icons/paypal.png" alt="paypal" className="h-6" />
          <img src="/src/assets/icons/mastercard.png" alt="mastercard" className="h-6" />
          <img src="/src/assets/icons/visa.png" alt="visa" className="h-6" />
          <img src="/src/assets/icons/stripe.png" alt="stripe" className="h-6" />
        </div>
        <a href="#" className="text-blue-500 underline">Mobile Site</a>
      </div>
    </footer>
  );
};

export default Footer;