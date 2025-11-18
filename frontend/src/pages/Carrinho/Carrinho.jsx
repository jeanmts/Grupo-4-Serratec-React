import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as styles from "./Carrinho.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../../service/api";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
const Carrinho = () => {
  const { userName } = useContext(UserContext);
  const { carrinhoCont, setCarrinhoCont } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    const buscarCarrinho = async () => {
      try {
        const cart = await api.get("/carts");

        const id = localStorage.getItem("id");
        console.log("Cart aqui: ", cart);
        const carrinhoUsuario = cart.data.filter((cart) => cart.userId == id);

        setCarrinhoCont(carrinhoUsuario);
      } catch (error) {
        console.log(error);
      }
    };
    buscarCarrinho();
  }, []);

  const salvarCarrinho = async () => {
    console.log("CarrinhoCount aqui:", carrinhoCont);
    console.log("Carrinho normal aqui: ", carrinho);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const id = localStorage.getItem("id");

      if (!id) {
        console.log("Usuario nao encontrado ");
      }
      const carrinho = JSON.parse(localStorage.getItem("carrinho"));
      setCarrinhoCont(carrinho);
      const products = carrinhoCont;

      console.log("CarrinhoCont aqui: ", carrinhoCont);
      const post = {
        userId: id,
        products,
      };
      const response = await api.post(
        "/carts",
        { ...post },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function continuarComprando() {
    navigate("/produtos");
  }

  if (carrinhoCont?.length === 0) {
    return (
      <div className={styles.carrinhoVazio}>
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
          {carrinhoCont.map((item, index) => (
            <li key={index} className={styles.item}>
              <img src={item.image} alt={item.name} />
              <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <strong>R$ {item.price}</strong>
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
        <button onClick={salvarCarrinho}>Salvar Carrinho</button>
      </main>
      <Footer />
    </div>
  );
};

export default Carrinho;
