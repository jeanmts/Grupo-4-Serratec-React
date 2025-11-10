import React from 'react';
import styles from './FiltroProdutos.module.css';

// o componente recebe as props filtro e onFiltroChange 
function FiltroProdutos({ filtro, onFiltroChange }) {
  return (
    <div className={styles.filtroContainer}>
      <input
        type="text"
        className={styles.filtroInput}
        placeholder="Filtrar por nome ou categoria..."
        value={filtro} 
        onChange={(e) => onFiltroChange(e.target.value)}/>
    </div>
  );
}

export default FiltroProdutos;
