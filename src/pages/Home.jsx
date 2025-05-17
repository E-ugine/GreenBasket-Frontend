import React from 'react';
import Hero from '../components/ui/Hero/Hero';
import FeaturedSection from '../components/ui/Card/FeaturedSection';
import Deals from '../components/ui/Card/Deals';
import BestSeller from '../components/ui/Card/BestSeller';
export default function Home() {
    return (
        <div className=" ">
        <div className="w-screen overflow-x-hidden">
           <Hero />
           <FeaturedSection />
              <Deals />
              <BestSeller />
        </div>
        </div>
    );
}