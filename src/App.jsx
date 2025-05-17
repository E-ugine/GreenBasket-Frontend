import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/common/Navbar/Navbar';
import Home from './pages/Home';
import Footer from './components/common/Footer/Footer';
import ProductView from './components/products/ProductView';



function App() {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <Home/> */}
      {/* <Footer/> */}
      <ProductView/>
    </div>
  );
}

export default App;
