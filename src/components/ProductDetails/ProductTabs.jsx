import React, { useState } from "react";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-12 lg:mr-64">
      <div className="border-b mb-6 overflow-x-auto">
        <div className="flex gap-4 sm:gap-8 -mb-px min-w-max">
          <button 
            className={`py-3 px-4 border-b-2 ${activeTab === 'description' ? 'border-black font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('description')}
          >
            DESCRIPTION
          </button>
          <button 
            className={`py-3 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reviews')}
          >
            REVIEWS (5)
          </button>
          <button 
            className={`py-3 px-4 ${activeTab === 'info' ? 'border-b-2 border-black font-bold' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            ADDITIONAL INFORMATION
          </button>
        </div>
      </div>
      
      {activeTab === 'description' && (
        <div className="mb-6">
          <p className="mb-4">
            Built for ultra-fast performance, the thin and lightweight Somseng Galatero X6 Ultra goes anywhere you go. 
            Photos, movies and documents pop on a crisp, clear Super AMOLED display. Expandable memory lets you enjoy 
            more of your favorite content. And connecting and sharing between all your Somseng devices is easier than 
            ever. Welcome to life with the reimagined Somseng Galatero X6 Ultra.
          </p>
          <p className="mb-4">
            Watch the world come to life on your smartphone's <strong>Super AMOLED display</strong>. With deep contrast, 
            rich colors and crisp details, you won't miss a thing.
          </p>
          
          <div className="my-6">
            <img 
              src="/api/placeholder/800/400" 
              alt="Product in use" 
              className="w-full rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2">
              * The Galatero X6 Ultra's 4 : 3 ratio display provides you with an ideal environment for performing office tasks.
            </p>
          </div>
          
          <div className="border-t pt-8 mt-8">
            <h3 className="text-xl font-bold mb-4">From the manufacturer</h3>
            <p className="mb-4">
              Dive into the blockbuster movies you can't wait to see. Switch between your favorite apps quickly and easily. 
              The new and improved octa-core processor gives you the power and speed you need to see more and do more. 
              Expand your tablet's memory from 32GB to up to an additional 128GB and enjoy more of your favorite music, 
              photos, movies and games on the go with a microSD card. With Quick Connect, start a show on your Smart TV 
              and, with the touch of a button, take it with you by moving it to your Galaxy Tab S2.
            </p>
            <p className="mb-6">
              Or send videos and photos from your tablet <a href="#" className="text-blue-500">screen to your TV screen</a> to 
              share with everyone in the room. Work effortlessly between your Samsung tablet and Samsung smartphone with SideSync. 
              Quickly drag and drop photos between devices. And even respond to a call from your smartphone right on your tablet screen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <img 
                src="/api/placeholder/600/400" 
                alt="Person using device" 
                className="w-full rounded-lg"
              />
              <img 
                src="/api/placeholder/600/400" 
                alt="Device closeup" 
                className="w-full rounded-lg"
              />
            </div>
            
            <h3 className="text-xl font-bold mb-4">Somseng Galaxy Tab S2, 8-Inch, White</h3>
            <p className="mb-4">
              The Samsung Galaxy Tab S2 offers dual cameras: a rear-facing 8-megapixel camera with Auto Focus and 
              a 2.1-megapixel camera on the front. Take high-quality pictures and video or video chat with friends, 
              family, and colleagues. Customize your Galaxy Tab S2 with the apps you use most. The Samsung Galaxy 
              Essentials widget provides a collection of premium complimentary apps optimized for your tablet screen. 
              Select and download the apps you want to instantly upgrade your tablet experience.
            </p>
            
            <button className="text-blue-500 font-bold">SHOW MORE</button>
          </div>
        </div>
      )}
      
      {activeTab === 'reviews' && (
        <div className="mb-6">
          <p>Reviews content would go here</p>
        </div>
      )}
      
      {activeTab === 'info' && (
        <div className="mb-6">
          <p>Additional information would go here</p>
        </div>
      )}
    </div>
  );
}