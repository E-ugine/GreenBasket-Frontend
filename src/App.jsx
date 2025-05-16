import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';

function App() {
  return (
    <div className='w-full'>
      <Navbar/>
      <Footer/>
    </div>
  );
}

export default App;
