// Hook personalizado para gerenciar produtos e filtros
import { useState, useMemo } from 'react';
import { Product } from '@/domain/entities/Product';
import { products as initialProducts } from '@/infrastructure/data/products';

export type CategoryFilter = 'todos' | 'comida' | 'bebida';

export const useProducts = () => {
  // Estado do filtro de categoria selecionado
  const [filter, setFilter] = useState<CategoryFilter>('todos');

  // Filtra produtos baseado na categoria selecionada
  const filteredProducts = useMemo(() => {
    if (filter === 'todos') {
      return initialProducts;
    }
    return initialProducts.filter(product => product.category === filter);
  }, [filter]);

  return {
    products: filteredProducts,     // Produtos filtrados
    allProducts: initialProducts,   // Todos os produtos sem filtro
    filter,                         // Filtro atual
    setFilter                       // Função para alterar filtro
  };
};
