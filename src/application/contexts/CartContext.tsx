// Context que fornece estado global do carrinho para toda aplicação
import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '@/application/hooks/useCart';
import { CartItem } from '@/domain/entities/CartItem';
import { Product } from '@/domain/entities/Product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

// Criação do contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider que envolve a aplicação e fornece o estado do carrinho
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para consumir o contexto do carrinho
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  return context;
};
