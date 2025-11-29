// Hook personalizado para gerenciar o carrinho de compras
import { useState, useCallback, useMemo } from 'react';
import { CartItem } from '@/domain/entities/CartItem';
import { Product } from '@/domain/entities/Product';

export const useCart = () => {
  // Estado que armazena os itens do carrinho
  const [items, setItems] = useState<CartItem[]>([]);

  // Adiciona um produto ao carrinho ou incrementa quantidade se já existir
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      // Se produto já existe, incrementa quantidade
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Se produto não existe, adiciona novo item
      return [...prevItems, { product, quantity }];
    });
  }, []);

  // Remove completamente um produto do carrinho
  const removeFromCart = useCallback((productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  }, []);

  // Atualiza a quantidade específica de um produto
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    // Remove se quantidade for zero ou negativa
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  // Limpa todos os itens do carrinho
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Calcula o valor total do carrinho
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  // Conta o número total de itens (soma das quantidades)
  const itemCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total,
    itemCount
  };
};
