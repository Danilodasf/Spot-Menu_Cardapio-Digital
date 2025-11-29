# Spot Menu - Cardápio Digital

Aplicativo web de cardápio digital para hamburgueria, desenvolvido com React, TypeScript e Clean Architecture.

## Tecnologias

- React 18
- TypeScript
- Vite
- React Router DOM
- Context API

## Funcionalidades Implementadas

**1. Interface de Menu**
- Exibição de produtos com imagem, descrição e preço
- Filtros por categoria (Todos, Comidas, Bebidas)
- Seleção de quantidade antes de adicionar ao carrinho

**2. Carrinho de Compras**
- Visualização de itens adicionados
- Ajuste de quantidade de cada produto
- Remoção individual de itens
- Cálculo automático do total
- Opção de limpar carrinho completo

**3. Checkout**
- Formulário de dados do cliente
- Validação em tempo real dos campos
- Resumo do pedido
- Confirmação de pedido realizado

**4. Gerenciamento de Estado**
- Context API para estado global do carrinho
- Hooks personalizados (useCart, useProducts, useFormValidation)
- useState para estados locais

**5. Navegação**
- React Router com 3 rotas principais
- Navegação fluida entre páginas
- Indicador visual de itens no carrinho

**6. Design Responsivo**
- Layout adaptável para desktop, tablet e mobile
- Breakpoints: 480px, 768px, 968px, 1200px
- Otimizado para touch em dispositivos móveis

## Arquitetura

Projeto estruturado seguindo Clean Architecture:

```
src/
├── domain/         # Entidades de negócio
├── application/    # Casos de uso e hooks
├── infrastructure/ # Implementações e dados
└── presentation/   # Componentes React
```

## Instalação e Uso

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura de Pastas

```
src/
├── domain/entities/
│   ├── Product.ts
│   ├── CartItem.ts
│   └── Order.ts
├── application/
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   └── useFormValidation.ts
│   └── contexts/
│       └── CartContext.tsx
├── infrastructure/data/
│   └── products.ts
└── presentation/
    ├── components/
    │   ├── Header/
    │   └── ProductCard/
    ├── pages/
    │   ├── Menu/
    │   ├── Cart/
    │   └── Checkout/
    └── styles/
        └── global.css
```

