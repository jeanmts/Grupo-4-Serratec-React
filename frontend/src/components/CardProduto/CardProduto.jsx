import React, { useEffect, useState } from "react";
import styles from "./CardProduto.module.css";
import api from "../../service/api";


function CardProduto({ produto, onVerDetalhes }) {
const [listaProduto, setListaProdutos] = useState({})

  const detalhesProduto = async () => {
    try {
      const response = await api.get(`/products/${produto.id}`);

      if (!response.data) {
        const card = document.getElementById("containerCard");
        card.append(<p>Nenhum produto encontrado.</p>);
      }
      setListaProdutos(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    detalhesProduto();
  }, []);

  return (
    <div id="containerCard" className={styles.cardProduto} tabIndex={0}>
      <img src={listaProduto.image} alt={listaProduto.title} className={styles.cardImagem} />

      <div className={styles.cardConteudo}>
        <span className={styles.cardCategoria} tabIndex={0} >{listaProduto.category}</span>
        <h3 className={styles.cardNome} tabIndex={0} >{listaProduto.title}</h3>

        <p className={styles.cardDescricao} tabIndex={0}>
          {listaProduto.description}...
        </p>
        <p className={styles.cardPreco} tabIndex={0} >R$ {listaProduto.price}</p>
        <button onClick={onVerDetalhes} className={styles.btnDetalhes}>
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}

export default CardProduto;