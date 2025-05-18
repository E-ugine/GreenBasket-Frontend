import React from 'react';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function UserProfile() {
  const [firstName, setFirstName] = useState('Mark');
  const [lastName, setLastName] = useState('Cole');
  const [email, setEmail] = useState('swoo@gmail.com');
  const [phone, setPhone] = useState('+1 0231 4554 452');
  const [activeTab, setActiveTab] = useState('account-info');
  
  const handleSave = () => {
    console.log('Saving profile information:', { firstName, lastName, email, phone });
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation breadcrumb */}
      <div className="bg-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex text-sm">
            <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
            <span className="mx-2 text-gray-500">/</span>
            <a href="/pages" className="text-gray-500 hover:text-gray-700">pages</a>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900">profile</span>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-gray-200 rounded-lg w-52 h-52 mb-4 overflow-hidden">
                  <img 
                    src="/api/placeholder/200/200"
                    alt="Profile avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">Mark Cole</h3>
                <p className="text-gray-600 text-sm mt-1">swoo@gmail.com</p>
              </div>
              
              {/* Navigation */}
              <nav className="flex flex-col space-y-2">
                <a 
                  href="#account-info"
                  onClick={() => setActiveTab('account-info')}
                  className={`flex items-center justify-between px-4 py-3 rounded-md ${
                    activeTab === 'account-info' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span>Account info</span>
                  <ChevronRight size={20} />
                </a>
                
                <a 
                  href="#my-order"
                  onClick={() => setActiveTab('my-order')}
                  className={`flex items-center justify-between px-4 py-3 rounded-md ${
                    activeTab === 'my-order' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span>My order</span>
                  <ChevronRight size={20} />
                </a>
                
                <a 
                  href="#my-address"
                  onClick={() => setActiveTab('my-address')}
                  className={`flex items-center justify-between px-4 py-3 rounded-md ${
                    activeTab === 'my-address' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span>My address</span>
                  <ChevronRight size={20} />
                </a>
                
                <a 
                  href="#change-password"
                  onClick={() => setActiveTab('change-password')}
                  className={`flex items-center justify-between px-4 py-3 rounded-md ${
                    activeTab === 'change-password' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span>Change password</span>
                  <ChevronRight size={20} />
                </a>
              </nav>
            </div>
          </div>
          
          {/* Right content area */}
          <div className="w-full md:w-3/4">
            {activeTab === 'account-info' && (
              <div className="bg-white p-6">
                <h2 className="text-2xl font-bold mb-6">Account Info</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  {/* Last Name */}
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                {/* Email Address */}
                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                {/* Phone Number */}
                <div className="mt-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                {/* Save Button */}
                <div className="mt-8">
                  <button
                    onClick={handleSave}
                    className="inline-flex justify-center py-3 px-16 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'my-order' && (
              <div className="bg-white p-6">
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                <p className="text-gray-600">Your order history will appear here.</p>
              </div>
            )}
            
            {activeTab === 'my-address' && (
              <div className="bg-white p-6">
                <h2 className="text-2xl font-bold mb-6">My Addresses</h2>
                <p className="text-gray-600">Your saved addresses will appear here.</p>
              </div>
            )}
            
            {activeTab === 'change-password' && (
              <div className="bg-white p-6">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                <p className="text-gray-600">Password change form will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}