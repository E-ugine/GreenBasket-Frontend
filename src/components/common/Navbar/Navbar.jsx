import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, ChevronDown, User, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/', aria: 'Navigate to homepage' },
  { name: 'Products', path: '/products', aria: 'Browse all products' },
  { name: 'About', path: '/about', aria: 'Learn about our company' },
  { name: 'Contact', path: '/contact', aria: 'Contact our support team' }
];

const TopBarInfo = () => (
  <div className="hidden sm:flex items-center">
    <span className="bg-gray-100 rounded-md px-3 py-1 text-gray-700 mr-2 text-sm">
      Hotline 24/7
    </span>
    <span className="font-medium text-gray-700 text-sm">(+254) 797 783 251</span>
  </div>
);

const CurrencyLanguageSelector = () => (
  <div className="flex items-center space-x-4">
    <button 
      aria-label="Change currency"
      className="flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
    >
      <span className="text-gray-900 text-sm">Ksh</span>
      <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
    </button>
    <span className="w-px h-5 bg-gray-300" aria-hidden="true"></span>
    <button 
      aria-label="Change language"
      className="flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
    >
      <span className="sr-only">Language:</span>
      <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 mr-1 flex items-center justify-center">
        <span className="text-xs" aria-hidden="true">🇰🇪</span>
      </div>
      <span className="text-gray-900 text-sm">Eng</span>
      <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
    </button>
  </div>
);

const SearchBar = ({ searchText, setSearchText, onSubmit, isMobile = false }) => (
  <form 
    onSubmit={onSubmit}
    className={`${isMobile ? 'mb-4 w-full' : 'hidden md:flex flex-1 mx-4 lg:mx-6 max-w-xl'}`}
  >
    <label htmlFor="search" className="sr-only">Search products</label>
    <div className="relative w-full">
      <input
        id="search"
        type="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search for products..."
        className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base"
        aria-label="Search products"
      />
      {searchText && (
        <button
          type="button"
          onClick={() => setSearchText('')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
    <button
      type="submit"
      className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
      aria-label="Submit search"
    >
      <Search className="w-5 h-5" />
    </button>
  </form>
);

const Navbar = () => {
  const [searchText, setSearchText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    pages: false
  });
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen({ pages: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText)}`);
      setSearchText('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <div className="hidden sm:flex justify-between items-center py-2 px-4 sm:px-6 border-b border-gray-100">
          <TopBarInfo />
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link 
              to="/sell" 
              className="text-gray-600 hover:text-green-600 text-sm focus:outline-none focus:underline transition-colors"
            >
              Sell on GreenBasket
            </Link>
            <Link 
              to="/track-order" 
              className="text-gray-600 hover:text-green-600 text-sm focus:outline-none focus:underline transition-colors"
            >
              Order Tracking
            </Link>
            <CurrencyLanguageSelector />
          </div>
        </div>

        {/* Main navbar */}
        <div className="flex justify-between items-center py-3 px-4 sm:px-6">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
            aria-label="GreenBasket home"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-full flex items-center justify-center mr-2 md:mr-3">
              <span className="text-white text-xl md:text-2xl font-bold">GB</span>
            </div>
            <div>
              <div className="text-green-600 font-bold text-lg md:text-xl">GreenBasket</div>
              <div className="text-green-600 text-xs md:text-sm font-medium">TECH MART</div>
            </div>
          </Link>

          {/* Desktop Search */}
          <SearchBar 
            searchText={searchText}
            setSearchText={setSearchText}
            onSubmit={handleSearch}
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                aria-label={link.aria}
                className={({ isActive }) => 
                  `text-sm font-medium hover:text-green-600 focus:outline-none focus:underline transition-colors ${
                    isActive ? 'text-green-600 underline' : 'text-gray-800'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* User area */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <Link 
              to="/account" 
              aria-label="User account"
              className="hidden sm:flex w-10 h-10 bg-gray-100 rounded-full items-center justify-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
            </Link>
            
            <Link 
              to="/wishlist" 
              aria-label="Wishlist"
              className="hidden sm:flex w-10 h-10 bg-gray-100 rounded-full items-center justify-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-600" />
            </Link>
            
            <div className="hidden sm:block">
              <div className="text-xs text-gray-500">WELCOME</div>
              <div className="text-sm font-medium space-x-2">
                <Link 
                  to="/login" 
                  className="hover:underline text-gray-800 focus:outline-none focus:underline transition-colors"
                >
                  LOG IN
                </Link>
                <span className="text-gray-400">/</span>
                <Link 
                  to="/register" 
                  className="hover:underline text-gray-800 focus:outline-none focus:underline transition-colors"
                >
                  REGISTER
                </Link>
              </div>
            </div>
            
            <Link 
              to="/cart" 
              aria-label="Shopping cart"
              className="flex items-center hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full transition-opacity"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                </div>
                <div className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  5
                </div>
              </div>
              <div className="ml-2 hidden sm:block">
                <div className="text-xs text-gray-500">CART</div>
                <div className="text-sm text-gray-700 font-medium">Ksh.1,689.00</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden bg-white border-t border-gray-100 px-4 py-3 transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
          ref={dropdownRef}
        >
          <div className="flex justify-between items-center mb-4">
            <TopBarInfo />
            <CurrencyLanguageSelector />
          </div>
          
          <SearchBar 
            searchText={searchText}
            setSearchText={setSearchText}
            onSubmit={handleSearch}
            isMobile
          />
          
          <nav className="space-y-3 border-t border-gray-100 pt-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                aria-label={link.aria}
                className={({ isActive }) => 
                  `block py-2 text-sm font-medium ${
                    isActive ? 'text-green-600' : 'text-gray-800 hover:text-green-600'
                  } focus:outline-none focus:underline transition-colors`
                }
                onClick={toggleMobileMenu}
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="border-t border-gray-100 pt-3">
              <Link 
                to="/sell" 
                className="block py-2 text-sm text-gray-800 hover:text-green-600 focus:outline-none focus:underline transition-colors"
                onClick={toggleMobileMenu}
              >
                Sell on GreenBasket
              </Link>
              <Link 
                to="/track-order" 
                className="block py-2 text-sm text-gray-800 hover:text-green-600 focus:outline-none focus:underline transition-colors"
                onClick={toggleMobileMenu}
              >
                Order Tracking
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Navbar;