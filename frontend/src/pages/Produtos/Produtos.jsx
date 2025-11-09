import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Produtos = () => {
  return (
    
  
    // confirmação da renderização
    <div className="flex flex-col items-center justify-center py-10">
      <Header/>
      <h1 className="text-3xl font-poppins font-bold" style={{ color: '#4F46E5' }}>
        Nossos Produtos
      </h1>
      <p className="mt-4 text-lg">
        Este é o placeholder para a Tela de Produtos. O layout está funcionando!
      </p>
      <Footer/>
    </div>
  );
};

export default Produtos;