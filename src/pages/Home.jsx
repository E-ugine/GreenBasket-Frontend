import React from 'react';
import Hero from '../components/ui/Hero/Hero';
import FeaturedSection from '../components/ui/Card/FeaturedSection';
import Deals from '../components/ui/Card/Deals';
import BestSeller from '../components/ui/Card/BestSeller';
import BrandNew from '../components/ui/Card/BrandNew';
import Banner from '../components/ui/Banner/Banner';
import RecentlyViewedProducts from '../components/ui/Filters/RecentlyViewedProducts';
export default function Home() {
    return (
        <div className=" ">
        <div className="w-screen overflow-x-hidden">
           <Hero />
           <FeaturedSection />
              <Deals />
              <BestSeller />
                <BrandNew />
              <Banner />
              <RecentlyViewedProducts />


         <div className="bg-gray-100 p-6 rounded-md items-start text-left border border-blue-200 shadow-sm">
    <h1 className="text-xs font-serif text-neutral-900  mb-4 pl-0">GreenBasket– #1 Online Marketplace for technology</h1>
    
    <p className="text-gray-700 mb-4 pl-0 leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae posuere mi. Quisque iaculis dignissim scelerisque. Morbi condimentum sagittis leo vitae tempor. Suspendisse in dolor odio. Sed aliquet ac lacus ut luctus. Fusce mattis sollicitudin sem, id lobortis nibh ullamcorper a. Donec vehicula dolor et arcu consequat mattis. Fusce mattis nec nulla in scelerisque.
    </p>
    
    <p className="text-gray-700 pl-0 leading-relaxed">
      Morbi pharetra sem mauris, nec aliquet ipsum vestibulum suscipit. Curabitur non euismod dui. Proin eget justo eu erat luctus placerat. Nam rhoncus ipsum ac enim faucibus, at consequat ante maximus. Vestibulum at nibh ac odio ultrices varius. Duis vitae libero mollis, lobortis ligula id, varius erat. Sed id odio dictum, laoreet enim ac, commodo magna.
    </p>
  </div>


        </div>
        </div>

    );
}