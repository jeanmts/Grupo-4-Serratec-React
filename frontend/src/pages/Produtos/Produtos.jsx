import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CardProduto from "../../components/CardProduto/CardProduto";
import FiltroProdutos from "../../components/FiltroProdutos/FiltroProdutos";
import styles from "./Produto.module.css";
import api from "../../service/api";

const Produtos = () => {
  const [todosProdutos, setTodosProdutos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get("/products");
        setTodosProdutos(response.data);
        setErro(null);
      } catch (err) {
        setErro("Falha ao buscar produtos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  const produtosFiltrados = todosProdutos.filter((produto) => {
    const title = produto.title ? produto.title.toLowerCase() : "";
    const category = produto.category ? produto.category.toLowerCase() : "";
    return (
      title.includes(filtro.toLowerCase()) ||
      category.includes(filtro.toLowerCase())
    );
  });

  return (
    <div className={styles.produtosPagina}>
      <Header op1="Login" op3="Cadastro" />

      <section className={styles.produtosContainer}>
        <h1 className={styles.titulo}>Nossos Produtos</h1>

        <FiltroProdutos filtro={filtro} onFiltroChange={setFiltro} />

        {loading ? (
          <p className={styles.mensagem}>Carregando produtos...</p>
        ) : erro ? (
          <p className={styles.mensagemErro}>{erro}</p>
        ) : produtosFiltrados.length > 0 ? (
          <div className={styles.produtosGrid}>
            {produtosFiltrados.map((produto) => (
              <CardProduto
                key={produto.id}
                produto={produto}
                onVerDetalhes={() =>
                  navigate(`/products/${produto.id}`)
                }
              />
            ))}
          </div>
        ) : (
          <p className={styles.mensagem}>Nenhum produto encontrado.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Produtos;