import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as styles from "./Carrinho.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Carrinho = () => {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const itens = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(itens);
    calcularTotal(itens);
  }, []);

  //  recalcular o total
  function calcularTotal(itens) {
    const soma = itens.reduce((acc, item) => acc + (item.price || 0), 0);
    setTotal(soma);
  }

  //  remover produto do carrinho
  function removerItem(index) {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    calcularTotal(novoCarrinho);
  }

  function continuarComprando() {
    navigate("/produtos");
  }

  if (carrinho.length === 0) {
    return (
      <div>
        <Header op1="Login" op2="Cadastrar" op3="Produtos" />
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
      <Header op1="Login" op2="Cadastrar" op3="Produtos" />
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

              {/* botão de remover */}
              <button
                className={styles.btnRemover}
                onClick={() => removerItem(index)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>

        {/* total das compras */}
        <div className={styles.totalContainer}>
          <h2>Total:</h2>
          <p className={styles.totalValor}>R$ {total.toFixed(2)}</p>
        </div>

        <button onClick={continuarComprando}>Continuar comprando</button>
      </main>
      <Footer />
    </div>
  );
};

export default Carrinho;
