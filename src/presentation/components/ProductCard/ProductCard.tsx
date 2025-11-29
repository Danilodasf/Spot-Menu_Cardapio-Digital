import React, { useState } from 'react';
import { Product } from '@/domain/entities/Product';
import { useCartContext } from '@/application/contexts/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    setQuantity(1);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Imagem+em+breve';
          }}
        />
        <div className="product-category">
          {product.category === 'comida' ? '🍴 Comida' : '🥤 Bebida'}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <span className="product-price">
            R$ {product.price.toFixed(2)}
          </span>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              {showSuccess ? '✓ Adicionado!' : 'Adicionar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

