import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as styles from "./Carrinho.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Carrinho = () => {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(itens);
  }, []);

  function continuarComprando() {
    navigate("/produtos");
  }

  if (carrinho.length === 0) {
    return (
      <div>
        <Header op1= "Login" op2= "Cadastrar" op3= "Produtos"/>
        <main className={styles.container}>
          <h1>Seu carrinho está vazio 🛍️</h1>
          <p>Que tal dar uma olhada nos nossos produtos?</p>
          <button onClick={continuarComprando}>Continuar comprando</button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header op1= "Login" op2= "Cadastrar" op3= "Produtos"/>
      <main className={styles.container}>
        <h1>Seu Carrinho</h1>
        <ul className={styles.lista}>
          {carrinho.map((item, index) => (
            <li key={index} className={styles.item}>
              <img src={item.image} alt={item.name} />
              <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <strong>R$ {item.price.toFixed(2)}</strong>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={continuarComprando}>Continuar comprando</button>
      </main>
      <Footer />
    </div>
  );
};

export default Carrinho;
