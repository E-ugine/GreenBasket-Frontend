import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };
  
  return (
    <div className="min-h-screen bg-gray-50"> {/* Changed to softer background */}
      {/* Optional: Remove breadcrumb entirely for login pages */}
      {/* <div className="bg-gray-100 w-full">
        <div className="py-4 px-6 w-full">
          <nav className="flex text-sm">
            <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
            <span className="mx-2 text-gray-500">/</span>
            <a href="/pages" className="text-gray-500 hover:text-gray-700">pages</a>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900">login</span>
          </nav>
        </div>
      </div> */}
      
      {/* Main content - wider container */}
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-screen-2xl mx-auto">
          
          {/* Illustration - larger max width */}
          <div className="w-full md:w-1/2 lg:w-2/5">
            <img 
              src="https://i.pinimg.com/736x/aa/01/30/aa01306d3a0426c2125191caf2f955bd.jpg" 
              alt="Login illustration" 
              className="w-full max-w-2xl mx-auto rounded-lg shadow-sm" // Added subtle rounding
            />
          </div>
          
          {/* Form - wider container with better spacing */}
          <div className="w-full md:w-1/2 lg:w-2/5 max-w-xl bg-white p-8 rounded-lg shadow-sm"> 
            <div className="text-center md:text-left mb-8">
              <h2 className="text-3xl font-bold text-green-600">Welcome Back</h2> 
              <p className="mt-2 text-gray-500 uppercase tracking-wide text-sm">Login to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" 
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" /> 
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="mt-2 text-right">
                  <a href="/forgot-password" className="text-sm text-gray-600 hover:text-green-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200" 
                >
                  Sign In {/* Changed to more conventional label */}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                New user?{' '}
                <a href="/register" className="font-medium text-green-600 hover:text-green-700 hover:underline">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}