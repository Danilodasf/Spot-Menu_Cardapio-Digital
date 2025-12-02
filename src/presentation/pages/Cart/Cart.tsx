import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '@/application/contexts/CartContext';
import './Cart.css';

type CartItemProps = {
  item: ReturnType<typeof useCartContext>['items'][number];
  onQuantityChange: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
};

const CartItemRow: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const slug = useMemo(() => {
    const s = item.product.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/--+/g, '-');
    return s;
  }, [item.product.name]);

  const imageCandidates = useMemo(() => {
    const arr: string[] = [];
    if (item.product.image) arr.push(item.product.image);
    const underslug = slug.replace(/-/g, '_');
    arr.push(`/images/${slug}.webp`);
    arr.push(`/images/${slug}.jpg`);
    arr.push(`/images/${slug}.jpeg`);
    arr.push(`/images/${slug}.png`);
    arr.push(`/images/${underslug}.webp`);
    arr.push(`/images/${underslug}.jpg`);
    arr.push(`/images/${underslug}.jpeg`);
    arr.push(`/images/${underslug}.png`);
    return arr;
  }, [item.product.image, slug]);

  return (
    <div className="cart-item">
      <img 
        src={imageCandidates[imgIndex]}
        alt={item.product.name}
        className="cart-item-image"
        onError={(e) => {
          const next = imgIndex + 1;
          if (next < imageCandidates.length) {
            setImgIndex(next);
            return;
          }
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
            onClick={() => onQuantityChange(item.product.id, -1)}
            className="qty-btn"
          >
            -
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button 
            onClick={() => onQuantityChange(item.product.id, 1)}
            className="qty-btn"
          >
            +
          </button>
        </div>

        <div className="cart-item-total">
          R$ {(item.product.price * item.quantity).toFixed(2)}
        </div>

        <button 
          onClick={() => onRemove(item.product.id)}
          className="remove-btn"
          title="Remover item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

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
            <CartItemRow
              key={item.product.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={removeFromCart}
            />
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

