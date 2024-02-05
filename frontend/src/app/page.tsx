"use client"
import React from 'react';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import UserProducts from '@/components/UserProducts'; // Adjust the path as needed
import DynamicProducts from '../components/products';
import "../components/Navigation.scss"
import "../components/Products.scss";
import logo from '../assets/flat-shopping-center-twitch-banner_23-2149330484.avif'; // Import your logo image

const Home: React.FC = () => {
  return (
    <main>
      <Provider store={store}>
        <Router>
          <div>
            {/* Render the logo */}
            <img src='/SHOPIFY-removebg-preview.png' alt="Logo" className="logo" style={{height:"65px",width:"100px"}} />

            {/* Render links for navigation */}
            <button className='nav'><Link to="/user/products" >User Products</Link></button>
            <button className='nav'><Link to="/admin/products">Admin Products</Link></button>
          </div>
          
          <Routes>
            {/* Define routes */}
            <Route path="/user/products" Component={UserProducts} />
            <Route path="/admin/products" Component={DynamicProducts} />
          </Routes>
        </Router>
      </Provider>
    </main>
  );
};

export default Home;
