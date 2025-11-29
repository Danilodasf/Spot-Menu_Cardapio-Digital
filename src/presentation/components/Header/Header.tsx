import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartContext } from '@/application/contexts/CartContext';
import './Header.css';

export const Header: React.FC = () => {
  const { itemCount } = useCartContext();
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-spot">Spot</span>
          <span className="logo-menu">Menu</span>
        </Link>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Menu
          </Link>
          <Link 
            to="/carrinho" 
            className={`nav-link cart-link ${location.pathname === '/carrinho' ? 'active' : ''}`}
          >
            Carrinho
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

