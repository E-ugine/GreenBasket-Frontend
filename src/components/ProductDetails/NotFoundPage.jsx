import React from 'react';

export default function NotFoundPage({ type = 'page', productId = null }) {
  const handleGoHome = () => {
    window.location.href = '/'; // Navigate to your app's home page
  };

  const handleGoToProducts = () => {
    window.location.href = '/products'; // Navigate to products page
  };

  const handleContact = () => {
    window.location.href = 'https://cybasoft.com';
  };

  // Different content based on type
  const getContent = () => {
    if (type === 'product') {
      return {
        title: 'Product Not Found',
        message: productId 
          ? `Sorry, we could not find product #${productId}. It may have been discontinued or the link might be incorrect.`
          : 'Sorry, we could not find the product you are looking for.',
        primaryAction: {
          text: 'Browse Products',
          handler: handleGoToProducts
        },
        secondaryAction: {
          text: 'Go Home',
          handler: handleGoHome
        }
      };
    }
    
    // Default 404 page content
    return {
      title: 'Page Not Found',
      message: 'Oh no! Either we missed something or you cannot type!',
      primaryAction: {
        text: 'Go Home',
        handler: handleGoHome
      },
      secondaryAction: {
        text: 'Contact us',
        handler: handleContact
      }
    };
  };

  const content = getContent();

  return (
    <div className="md:flex min-h-screen font-sans antialiased">
      {/* Left side - Content */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <div className="max-w-sm m-8">
          {/* 404 Text */}
          <div className="text-pink-600 text-5xl md:text-9xl font-black">
            {type === 'product' ? '404' : '404'}
          </div>

          {/* Purple divider line */}
          <div className="w-16 h-1 bg-purple-400 my-3 md:my-6"></div>

          {/* Title */}
          <h1 className="text-gray-800 text-2xl md:text-3xl font-bold mb-4">
            {content.title}
          </h1>

          {/* Error message */}
          <p className="text-gray-600 text-lg md:text-xl font-light mb-8 leading-normal">
            {content.message}
          </p>

          {/* Product ID display for product not found */}
          {type === 'product' && productId && (
            <div className="bg-gray-100 p-3 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Product ID:</span> {productId}
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={content.primaryAction.handler}
              className="bg-indigo-400 text-white font-bold uppercase tracking-wide py-3 px-6 border-2 border-gray-300 hover:border-gray-400 hover:bg-indigo-500 rounded-lg transition-colors duration-200 block w-full md:w-auto"
            >
              {content.primaryAction.text}
            </button>
            
            <button
              onClick={content.secondaryAction.handler}
              className="bg-transparent text-gray-700 font-bold uppercase tracking-wide py-3 px-6 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors duration-200 block w-full md:w-auto ml-0 md:ml-2"
            >
              {content.secondaryAction.text}
            </button>
          </div>

          {/* Additional helpful links for product not found */}
          {type === 'product' && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">You might also want to:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check the product ID in your URL</li>
                <li>• Browse our latest products</li>
                <li>• Use the search feature to find similar items</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="relative pb-full md:flex md:pb-0 md:min-h-screen w-full md:w-1/2">
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat md:bg-left lg:bg-center"
          style={{
            backgroundImage: 'url(https://snag.gy/fkJWca.jpg)'
          }}
        >
        </div>
      </div>
    </div>
  );
}