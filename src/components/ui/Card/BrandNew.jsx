import React from 'react';

export default function BrandNew() {
  const products = [
    {
      id: 1,
      title: 'Zumac Steel Computer Case',
      subtitle: 'GREEN STEEL MID TOWER COMPUTER CASE',
      description: 'And an option to upgrade every three years',
      image: 'https://i.pinimg.com/736x/b4/33/37/b43337e415e07be57ea5abbec99dd1a9.jpg',
      backgroundColor: 'bg-green-600',
      textColor: 'text-white',
      buttonText: 'SHOP NOW'
    },
    {
      id: 2,
      title: 'Summer Sale with Sale up to 50% OFF for Foam Gaming Chair.',
      subtitle: '200Hz Curved Gaming Monitor',
      description: 'Limited time offer. Hurry up',
      image: 'https://i.pinimg.com/736x/03/cc/a5/03cca58147d6cb2a44b6cde81fb574b6.jpg',
      backgroundColor: 'bg-white',
      textColor: 'text-black',
      buttonText: 'SHOP NOW'
    },
    {
      id: 3,
      title: 'Summer Sale with Sale up to 50% OFF for Foam Gaming Chair.',
      subtitle: 'FANTASIX CHAIR',
      description: 'Limited time offer. Hurry up',
      image: 'https://i.pinimg.com/736x/f6/a5/a8/f6a5a862912619b80573216406f5186b.jpg',
      backgroundColor: 'bg-gray-100',
      textColor: 'text-black',
      sale: {
        text: 'SALE OFF',
        percentage: '50%',
        backgroundColor: 'bg-green-400'
      },
      buttonText: 'SHOP NOW'
    },
    {
      id: 4,
      title: 'iPed Pro Mini 6 - Powerful I in hand',
      description: 'From $19.99/month for 36 months. $280.35 final payment due in month 37',
      image: 'https://i.pinimg.com/736x/a5/97/f5/a597f5498af3cc632e4550e1b4ead9ad.jpg',
      backgroundColor: 'bg-yellow-400',
      textColor: 'text-black',
      buttonText: 'SHOP NOW'
    }
  ];

  return (
    <div className=" mx-auto px-4 py-6 bg-white rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">BRAND NEW FOR YOU</h2>
        <div className="h-8 w-16 bg-gray-100 rounded flex items-center justify-center">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg overflow-hidden border border-gray-100">
            <div className={`relative ${product.backgroundColor} h-48 sm:h-56 md:h-64 flex items-center justify-center`}>
              {product.id === 1 && (
                <div className="absolute top-4 left-4 text-white">
                  <div className="text-sm font-bold">Z•JMAX</div>
                  <div className="text-xs">{product.subtitle}</div>
                </div>
              )}
              
              {product.id === 2 && (
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-lg font-bold">{product.subtitle}</div>
                </div>
              )}
              
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              
              {product.sale && (
                <div className="absolute top-4 right-4">
                  <div className="bg-black/20 text-white p-2 rounded">
                    <div className="text-xs font-bold text-center">{product.sale.text}</div>
                    <div className="text-2xl font-bold text-center">{product.sale.percentage}</div>
                  </div>
                </div>
              )}
              
              {product.id === 3 && (
                <div className="absolute bottom-4 right-4 text-white">
                  <div className="text-sm font-bold">{product.subtitle}</div>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-1">{product.title}</h3>
              <p className="text-gray-600 text-xs mb-3">{product.description}</p>
              <a 
                href="#" 
                className="inline-block border border-green-500 text-green-500 px-6 py-1.5 rounded-md text-xs font-medium hover:bg-green-500 hover:text-white transition-colors"
              >
                {product.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}