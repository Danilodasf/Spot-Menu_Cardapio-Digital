import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '@/application/contexts/CartContext';
import './Cart.css';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCartContext();
  const navigate = useNavigate();

  const handleQuantityChange = (productId: string, delta: number) => {
    const item = items.find(i => i.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + delta);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione alguns itens deliciosos do nosso cardápio!</p>
          <Link to="/" className="back-to-menu-btn">
            Ver Cardápio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Meu Carrinho</h1>
        <button className="clear-cart-btn" onClick={clearCart}>
          Limpar Carrinho
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.product.id} className="cart-item">
              <img 
                src={item.product.image} 
                alt={item.product.name}
                className="cart-item-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/100?text=Img';
                }}
              />
              
              <div className="cart-item-info">
                <h3>{item.product.name}</h3>
                <p className="cart-item-price">R$ {item.product.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button 
                    onClick={() => handleQuantityChange(item.product.id, -1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.product.id, 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="remove-btn"
                  title="Remover item"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumo do Pedido</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button 
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Finalizar Pedido
          </button>

          <Link to="/" className="continue-shopping">
            ← Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

