import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '@/application/contexts/CartContext';
import { useFormValidation } from '@/application/hooks/useFormValidation';
import './Checkout.css';

export const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCartContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    complement: '',
    paymentMethod: 'dinheiro'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { errors, validateField, validateAll } = useFormValidation({
    name: {
      required: true,
      minLength: 3,
      message: 'Nome deve ter pelo menos 3 caracteres'
    },
    phone: {
      required: true,
      pattern: /^\(?[1-9]{2}\)?\s?9?[0-9]{4}-?[0-9]{4}$/,
      message: 'Telefone inválido (ex: 11999999999)'
    },
    address: {
      required: true,
      minLength: 10,
      message: 'Endereço deve ter pelo menos 10 caracteres'
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll(formData)) {
      return;
    }

    setIsSubmitting(true);

    // Simular envio do pedido
    await new Promise(resolve => setTimeout(resolve, 1500));

    setShowSuccess(true);
    clearCart();

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (items.length === 0 && !showSuccess) {
    navigate('/carrinho');
    return null;
  }

  if (showSuccess) {
    return (
      <div className="checkout-page">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Pedido Realizado com Sucesso!</h2>
          <p>Seu pedido foi confirmado e já está sendo preparado.</p>
          <p className="success-order-number">Número do pedido: #{Math.floor(Math.random() * 10000)}</p>
          <p className="redirect-message">Redirecionando para o menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-content">
        <div className="checkout-form-section">
          <h1>Finalizar Pedido</h1>
          
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Dados de Entrega</h2>
              
              <div className="form-group">
                <label htmlFor="name">Nome Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.name ? 'error' : ''}
                  placeholder="Seu nome completo"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.phone ? 'error' : ''}
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Endereço *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={errors.address ? 'error' : ''}
                  placeholder="Rua, número, bairro"
                  rows={3}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="complement">Complemento</label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={formData.complement}
                  onChange={handleInputChange}
                  placeholder="Apto, bloco, ponto de referência (opcional)"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Pagamento</h2>
              
              <div className="form-group">
                <label htmlFor="paymentMethod">Forma de Pagamento</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartao">Cartão de Crédito/Débito</option>
                  <option value="pix">PIX</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : `Confirmar Pedido - R$ ${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="order-summary-section">
          <h2>Resumo do Pedido</h2>
          
          <div className="order-items">
            {items.map(item => (
              <div key={item.product.id} className="order-item">
                <div className="order-item-info">
                  <span className="order-item-name">{item.product.name}</span>
                  <span className="order-item-qty">x{item.quantity}</span>
                </div>
                <span className="order-item-price">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="order-total">
            <span>Total</span>
            <span className="total-value">R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

