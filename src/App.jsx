import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/common/Navbar/Navbar';
import Home from './pages/Home';
import Footer from './components/common/Footer/Footer';
import ProductView from './components/products/ProductView';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Checkout from './components/forms/CheckoutForm/Checkout';
import Filter from './components/ui/Filters/Filter';

function App() {
  return (
    <Router>
      <div className="pt-20 md:pt-24">
        <Navbar />
        <Filter />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductView />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;