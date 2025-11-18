import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../service/api";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as styles from "./DetalhesProduto.module.css";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

const DetalhesProduto = () => {
  const { userName } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState({});
  const [carregando, setCarregando] = useState(true);
  const { carrinhoCont, setCarrinhoCont } = useContext(CartContext);
  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setProduto(response.data);
        setCarregando(false);
      })
      .catch(() => {
        console.error("Erro ao buscar produto");
        navigate("/notfound");
      });
  }, []);

  async function adicionarAoCarrinho() {
    const carrinho = [...carrinhoCont];
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${produto.title} foi adicionado ao carrinho!`);
    navigate("/carrinho");
  }


  if (carregando) return <p>Carregando produto...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;
  console.log("Produto aqui: ", produto);
  return (
    <div>
      <Header op1="Login" op2="Cadastrar" op3="Produtos" />
      <main className={styles.container}>
        <div className={styles.produto}>
          <img
            src={produto.image}
            alt={produto.name}
            className={styles.imagem}
          />

          <div className={styles.info}>
            <h1>{produto.name}</h1>
            <p>{produto.description}</p>
            <h2>R$ {produto.price}</h2>

            <button onClick={adicionarAoCarrinho}>Adicionar ao carrinho</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetalhesProduto;
