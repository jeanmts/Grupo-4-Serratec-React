import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

/**
 * Componente Header
 * @param {object} props
 * @param {string} [props.mainCodocker compose up --buildlor='#4F46E5'] 
 * @param {number} [props.cartItemCount=0] 
 */
const Header = ({op1, op2, op3}) => {

  
  //const logoStyle = { color: mainColor };
 // const buttonStyle = { backgroundColor: mainColor };

  return (
    <header className="header-container">
      <div className="header-content">
        
        {}
        <Link 
          to="/produtos" 
          className="header-logo" 
          
        >
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
          <Link to={`/${op3}`}
            className="signup-button"
           
          >
            {op3}
          </Link>
        </nav>

        {}
        <div className="cart-container">
            <Link to="/carrinho" className="cart-icon">
              <span className="cart-emoji">🛒</span>
              {}
              {/* {cartItemCount > 0 && (
                <span className="cart-counter">
                  {cartItemCount}
                </span> 
              )} */}
            </Link>

            {}
            <button className="mobile-menu-button">
              {}
              <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;