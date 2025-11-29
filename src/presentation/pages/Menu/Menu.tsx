import React from 'react';
import { useProducts, CategoryFilter } from '@/application/hooks/useProducts';
import { ProductCard } from '@/presentation/components/ProductCard/ProductCard';
import './Menu.css';

export const Menu: React.FC = () => {
  const { products, filter, setFilter } = useProducts();

  const categories: { value: CategoryFilter; label: string; icon: string }[] = [
    { value: 'todos', label: 'Todos', icon: '🍽️' },
    { value: 'comida', label: 'Comidas', icon: '🍴' },
    { value: 'bebida', label: 'Bebidas', icon: '🥤' }
  ];

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1 className="menu-title">Nosso Cardápio</h1>
        <p className="menu-subtitle">Sabores autênticos da culinária brasileira</p>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.value}
            className={`category-btn ${filter === category.value ? 'active' : ''}`}
            onClick={() => setFilter(category.value)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          <p>Nenhum produto encontrado nesta categoria</p>
        </div>
      )}
    </div>
  );
};

