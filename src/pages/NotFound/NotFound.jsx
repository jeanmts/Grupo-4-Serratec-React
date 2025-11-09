import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const mainColor = '#4F46E5'; 

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 p-6">
      <h1 className="text-9xl font-poppins font-extrabold text-gray-800">404</h1>
      <h2 className="text-3xl font-poppins font-semibold text-gray-600 mt-4 mb-6">
        Página Não Encontrada
      </h2>
      <p className="text-lg text-gray-500 mb-8">
        Ops! Parece que o endereço que você tentou acessar não existe.
      </p>
      
      {/* COLOCA O LINK PARA VOLTAR PRA HOME/PRODUTOS  */}
      <Link 
        to="/produtos" 
        className="px-6 py-3 rounded-lg font-inter font-semibold transition-all duration-300 shadow-md text-white hover:bg-indigo-700"
        style={{ backgroundColor: mainColor }} 
      >
        Voltar para a Home
      </Link>
    </div>
  );
};

export default NotFound;