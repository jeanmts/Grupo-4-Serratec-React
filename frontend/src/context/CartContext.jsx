import { createContext, useState } from "react";

export const CartContext = createContext({});

function CartProvider({ children }) {

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []
  const [carrinhoCont, setCarrinhoCont] = useState(carrinho);
  return (
    <CartContext.Provider value={{ carrinhoCont, setCarrinhoCont}}>
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;