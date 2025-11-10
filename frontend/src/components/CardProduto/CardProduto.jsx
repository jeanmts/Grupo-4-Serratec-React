import React from 'react';
import styles from './CardProduto.module.css';

function CardProduto({ produto, onVerDetalhes }) {
  
  const { title, price, category, image, description } = produto;

  return (
    <div className={styles.cardProduto}> 
      <img src={image} alt={title} className={styles.cardImagem} />
      
      <div className={styles.cardConteudo}>
        <span className={styles.cardCategoria}>{category}</span>
        <h3 className={styles.cardNome}>{title}</h3>
        
        <p className={styles.cardDescricao}>
          {description.substring(0, 70)}...
        </p>
        <p className={styles.cardPreco}>R$ {price}</p>
        <button 
          onClick={onVerDetalhes} 
          className={styles.btnDetalhes}>
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}

export default CardProduto;