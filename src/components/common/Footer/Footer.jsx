import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP, FaTwitter } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';


import mpesaIcon from '/public/images/mpesa.png';
import paypalIcon from '/public/images/paypal.png';
import mastercardIcon from '/public/images/mastercard.png';
import visaIcon from '/public/images/visa.png';
import stripeIcon from '/public/images/stripe.png';

const Footer = () => {
  const [openSections, setOpenSections] = useState({
    categories: false,
    company: false,
    help: false,
    partner: false
  });

  const [email, setEmail] = useState('');

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add subscription logic here
    console.log('Subscribed with:', email);
    setEmail('');
  };

  // Data for reusable sections
  const sections = {
    categories: {
      title: 'TOP CATEGORIES',
      items: ['Laptops', 'PC & Computers', 'Cell Phones', 'Tablets', 'Gaming & VR', 'Networks', 'Cameras', 'Sounds', 'Office']
    },
    company: {
      title: 'COMPANY',
      items: ['About GreenBasket', 'Contact', 'Career', 'Blog', 'Sitemap', 'Store Locations']
    },
    help: {
      title: 'HELP CENTER',
      items: ['Customer Service', 'Policy', 'Terms & Conditions', 'Track Order', 'FAQs', 'My Account', 'Product Support']
    },
    partner: {
      title: 'PARTNER',
      items: ['Become Seller', 'Affiliate', 'Advertise', 'Partnership']
    }
  };

  const paymentMethods = [
    { icon: mpesaIcon, alt: 'M-Pesa' },
    { icon: paypalIcon, alt: 'PayPal' },
    { icon: mastercardIcon, alt: 'Mastercard' },
    { icon: visaIcon, alt: 'Visa' },
    { icon: stripeIcon, alt: 'Stripe' }
  ];

  const renderAccordionSection = (sectionKey) => (
    <div className="border-b py-3" key={sectionKey}>
      <button
        className="font-bold text-sm flex justify-between items-center w-full"
        onClick={() => toggleSection(sectionKey)}
        aria-expanded={openSections[sectionKey]}
        aria-controls={`${sectionKey}-content`}
      >
        <h3>{sections[sectionKey].title}</h3>
        {openSections[sectionKey] ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {openSections[sectionKey] && (
        <ul id={`${sectionKey}-content`} className="space-y-2 mt-2">
          {sections[sectionKey].items.map((item, index) => (
            <li key={index} className="hover:text-green-500 cursor-pointer">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDesktopSection = (sectionKey) => (
    <div key={sectionKey}>
      <h3 className="font-bold mb-3 text-sm">{sections[sectionKey].title}</h3>
      <ul className="space-y-2 text-sm">
        {sections[sectionKey].items.map((item, index) => (
          <li key={index} className="hover:text-green-500 cursor-pointer">{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-white w-full text-black px-4 sm:px-6 py-12 mt-20 border-t text-sm">
      <div className="max-w-7xl mx-auto">
        {/* Mobile view - Accordion style */}
        <div className="md:hidden space-y-2">
          {/* Left section */}
          <div className="mb-8">
            <h2 className="font-bold text-lg mb-3">GreenBasket - TECH ONLINE MARKET</h2>
            <p className="mb-1 text-xs">HOTLINE 24/7</p>
            <p className="text-green-500 text-2xl font-bold mb-4">(+254) 797 783 251</p>
            <address className="text-xs mb-1 not-italic">254 Thika Road, Kahawa Wendani, Thika</address>
            <p className="text-xs mb-4">contact@GreenBaskettechmart.com</p>
            
            <div className="flex space-x-4 mb-6">
              <a href="#" aria-label="Twitter"><FaTwitter className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
              <a href="#" aria-label="Instagram"><FaInstagram className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
              <a href="#" aria-label="YouTube"><FaYoutube className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
              <a href="#" aria-label="Pinterest"><FaPinterestP className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="bg-zinc-100 border px-3 py-1.5 rounded flex items-center text-xs hover:bg-zinc-200">
                KSH <IoIosArrowDown className="ml-1" />
              </button>
              <button className="bg-zinc-100 border px-3 py-1.5 rounded flex items-center text-xs hover:bg-zinc-200">
                <span className="mr-1">🇰🇪</span> Eng <IoIosArrowDown className="ml-1" />
              </button>
            </div>
          </div>

          {/* Accordion sections */}
          {Object.keys(sections).map(renderAccordionSection)}
        </div>

        {/* Desktop view - Grid layout */}
        <div className="hidden md:grid md:grid-cols-5 md:gap-8 lg:gap-10">
          {/* Left section */}
          <div className="col-span-2">
            <h2 className="font-bold text-lg mb-3">GreenBasket - TECH ONLINE MARKET</h2>
            <p className="mb-1 text-xs">HOTLINE 24/7</p>
            <p className="text-green-500 text-2xl font-bold mb-4">(+254) 797 783 251</p>
            <address className="text-xs mb-1 not-italic">254 Thika Road, Kahawa Wendani, Thika</address>
            <p className="text-xs mb-6">contact@GreenBaskettechmart.com</p>
            
            <div className="flex space-x-4 mb-6">
              <a href="#" aria-label="Twitter"><FaTwitter className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
              <a href="#" aria-label="Instagram"><FaInstagram className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
              <a href="#" aria-label="YouTube"><FaYoutube className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
              <a href="#" aria-label="Pinterest"><FaPinterestP className="w-5 h-5 text-gray-600 hover:text-green-500" /></a>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="bg-zinc-100 border px-3 py-1.5 rounded flex items-center text-xs hover:bg-zinc-200">
                KSH <IoIosArrowDown className="ml-1" />
              </button>
              <button className="bg-zinc-100 border px-3 py-1.5 rounded flex items-center text-xs hover:bg-zinc-200">
                <span className="mr-1">🇰🇪</span> Eng <IoIosArrowDown className="ml-1" />
              </button>
            </div>
          </div>

          {/* Other sections */}
          {Object.keys(sections).map(renderDesktopSection)}
        </div>

        {/* Subscribe section */}
        <div className="max-w-4xl mx-auto mt-12 lg:mt-16">
          <h3 className="font-bold text-sm mb-3">
            SUBSCRIBE & GET <span className="text-red-600 font-bold">10% OFF</span> FOR YOUR FIRST ORDER
          </h3>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center border-b pb-2 gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 outline-none text-sm w-full px-2 py-1.5 border rounded-md focus:ring-1 focus:ring-green-500"
              required
            />
            <button 
              type="submit"
              className="text-green-500 text-xs font-semibold px-4 py-2 border border-yellow-500 hover:bg-yellow-50 rounded w-full md:w-auto whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
          <p className="text-xs italic mt-2">
            By subscribing, you're accepted to our <a href="#" className="underline hover:text-green-500">Policy</a>
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t text-xs text-gray-600">
          <p className="mb-4 md:mb-0 text-center md:text-left">
            © 2025 <span className="font-bold text-black">GreenBasket</span>. All Rights Reserved
          </p>
          
          <div className="flex items-center justify-center flex-wrap gap-3 mb-4 md:mb-0">
            {paymentMethods.map((method, index) => (
              <img 
                key={index} 
                src={method.icon} 
                alt={method.alt} 
                className="h-6 object-contain hover:scale-105 transition-transform" 
              />
            ))}
          </div>
          
          <a href="#" className="text-blue-500 underline hover:text-blue-700">Mobile Site</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;