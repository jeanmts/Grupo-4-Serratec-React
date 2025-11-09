import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    
    <div className="flex flex-col min-h-screen font-inter bg-gray-50"> 
      {}
      <Header /> 

      {}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> {}
      </main>

      {}
      <Footer />
    </div>
  );
};

export default Layout;