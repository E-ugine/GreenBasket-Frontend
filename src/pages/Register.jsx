import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log('Registration attempted with:', { name, email, password, confirmPassword });
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
            <span className="text-gray-900">Register</span>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left side illustration */}
          <div className="w-full md:w-1/2">
            <img 
              src="https://i.pinimg.com/736x/aa/01/30/aa01306d3a0426c2125191caf2f955bd.jpg" 
              alt="Register illustration" 
              className="w-full max-w-lg mx-auto"
            />
          </div>
          
          {/* Right side registration form */}
          <div className="w-full md:w-1/2 max-w-md">
            <div className="text-center md:text-left mb-8">
              <h2 className="text-3xl font-bold text-green-500">Register</h2>
              <p className="mt-2 text-gray-500 uppercase tracking-wide text-sm">JOIN TO US</p>
            </div>
            
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jhon Deo"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Example@gmail.com"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="····"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 pr-10 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="····"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 pr-10 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Register Button */}
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  REGISTER
                </button>
              </div>
            </div>
            
            {/* Already have account link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                ALREADY USER ?{' '}
                <a href="/login" className="font-medium text-green-500 hover:text-green-600">
                  LOGIN
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}