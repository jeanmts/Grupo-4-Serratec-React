import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  const mainColor = '#4F46E5'; 

  return (
    <header className="bg-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Título ShopTech - Usando Poppins e a cor que escolhemos  */}
        <Link to="/produtos" 
          className="text-3xl font-poppins font-bold cursor-pointer" 
          style={{ color: mainColor }} 
        >
          ShopLayout
        </Link>

        {/* Links de Navegação  */}
        <nav className="flex space-x-4">
          <Link to="/produtos" className="px-3 py-2 text-gray-700 hover:text-indigo-700 font-semibold transition-colors">
            Produtos
          </Link>
          <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-indigo-700 font-semibold transition-colors">
            Login
          </Link>
          <Link 
            to="/cadastro" 
            className="px-4 py-2 text-white font-semibold rounded-lg transition-colors shadow-md"
            style={{ backgroundColor: mainColor, hover: '#3f3a9a' }} // Botão de Cadastro 
          >
            Cadastro
          </Link>
        </nav>

        {/* Carrinho de compras  */}
        <Link to="/carrinho" className="relative hover:text-indigo-700 text-gray-700 transition-colors ml-4">
          <span className="text-2xl">🛒</span>
          {/* Contador de itens */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span> 
        </Link>
      </div>
    </header>
  );
};

export default Header;