import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Estruturais
// import Layout from './components/Layout/Layout'; // O componente que tem Header e Footer

// de Página

import Produtos from "./pages/Produtos/Produtos"; // Isa
import Login from "./pages/Login/Login"; // Jean
import Signup from "./pages/Signup/Signup"; // Jean
import DetalhesProduto from "./pages/DetalhesProduto/DetalhesProduto"; // Pedro
import NotFound from "./pages/NotFound/NotFound"; // Rota 404 eu

const App = () => {
  return (
    <Routes>
      {/* ROTA PAI*/}
      {/* <Route path="/" element={<Layout />}> */}
      {/* Index */}
      <Route path="/" element={<Produtos />}>
        {/* secundárias*/}
        <Route path="/produtos" element={<Produtos />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} /> {/* 'Signup' aqui */}
      <Route path="/detalhes/:id" element={<DetalhesProduto />} />{" "}
      {/* id parâmetro dinâmico */}
      {/* adicionar outras rotas que precisam do layout aqui, carrinho */}
      {/* <Route path="/carrinho" element={<Carrinho />} />*/}
      {/* </Route> */}
      {/* ROTA 404*/}
      {/* NÃO usa o <Layout /> página independente */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
