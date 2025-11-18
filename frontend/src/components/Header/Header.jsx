import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";

/**
 * Componente Header
 * @param {object} props
 * @param {string} [props.mainCodocker compose up --buildlor='#4F46E5']
 * @param {number} [props.cartItemCount=0]
 */
const Header = ({ op1, op2, op3 }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  //const logoStyle = { color: mainColor };
  // const buttonStyle = { backgroundColor: mainColor };

 if (token) {
    op1 = "Produtos";
    op2 = "Carrinho";
    op3 = "Sair";
  }

  const logout = () => {
    if (op3 == "Sair") {
      if (token) {
        localStorage.clear();
        navigate("/login");
      }
    }
    return;
  };

  return (
    <header className="header-container">
      <div className="header-content">
        {}
        <Link to="/produtos" className="header-logo">
          ShopSerra
        </Link>

        {}
        <nav className="nav-links">
          <Link to={`/${op1}`} className="nav-link">
            {op1}
          </Link>
          <Link to={`/${op2}`} className="nav-link">
            {op2}
          </Link>

          {}
          {op3 != "Sair" ? (
            <Link to={`/${op3}`} className="signup-button">
              {op3}
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
              }}
              className="signup-button"
            >
              Sair
            </button>
          )}
        </nav>

        {}
        <div className="cart-container">
          <Link to="/carrinho" className="cart-icon">
            <span className="cart-emoji">🛒</span>
            {}
          </Link>

          {}
          <button className="mobile-menu-button">
            {}
            <svg
              className="menu-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
