import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardProduto from '../../components/CardProduto/CardProduto';
import FiltroProdutos from '../../components/FiltroProdutos/FiltroProdutos';
import styles from './Produtos.module.css';
import api from '../../services/api';


const Produtos = () => {
  
  // armazena a lista completa de produtos vinda da api começando vazia
  const [todosProdutos, setTodosProdutos] = useState([]);
  
  // guarda o texto que o usuário digita na pesquisa e omeça vazio
  const [filtro, setFiltro] = useState('');
  
  // controla o carregamento da pagina
  const [loading, setLoading] = useState(true);
  
  // mensagem de erro caso a api falhe
  const [erro, setErro] = useState(null);

  // aqui pra navegar entre as telas
  const navigate = useNavigate(); 
  
  useEffect(() => {
    async function fetchProdutos() {
      try {
        // tenta buscar os dados da api usando o axios
        const response = await api.get('/products');
        // se funcionar salva os dados no estado todosProdutos
        setTodosProdutos(response.data);
        setErro(null);
      } catch (err) {
        // e der errado algo na api, salva uma mensagem de erro 
        setErro('Falha ao buscar produtos.');
        console.error(err);
      } finally {
        // sempre executa dando certo ou errado 
        // passa loading pra falso quando termina
        setLoading(false);
      }
    }
    
    fetchProdutos();
  }, []);

  const produtosFiltrados = todosProdutos.filter(produto =>
    produto.title.toLowerCase().includes(filtro.toLowerCase()) ||
    produto.category.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <> 
      <Header /> 
      <section className={styles.produtosPagina}>
        <h1 className="text-3xl font-poppins font-bold" style={{ color: '#4F46E5' }}>
          Nossos Produtos
        </h1>
        {todosProdutos.map((produto) => {
          return (
            <CardProduto produto={produto} onVerDetalhes={onVerDetalhes}/>
          )
        } )}
        <FiltroProdutos filtro={filtro} onFiltroChange={setFiltro} />
        {loading ? (
          <p>Carregando produtos...</p>  
        ) : erro ? (
          <p>{erro}</p>
        ) : (
          <div className={styles.produtosGrid}>
            {produtosFiltrados.map(produto => (
              <CardProduto 
                key={produto.id}
                produto={produto}
                onVerDetalhes={() => navigate(`/produto/${produto.id}`)}/>
            ))}
          </div>
        )}
        {/* aqui exibe a mensagem caso o total de produtos seja 0 */}
        {!loading && !erro && produtosFiltrados.length === 0 && (
          <p>Nenhum produto encontrado.</p> // Mostra esta mensagem.
        )}
      </section>
      <Footer /> 

    </>
  );
};

export default Produtos;